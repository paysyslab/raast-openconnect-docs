---
id: product-feature
title: Product Features
sidebar_position: 2
---

# Product Features

> Core capabilities, transaction routing logic, and functional architecture of the OpenConnect RAAST integration platform.

---

## Core Logic & Routing

OpenConnect operates as a **stateful, rule-based routing engine** between bank channels and SBP RAAST. Its core logic includes:

### Request Validation
Every inbound API request is subjected to:
1. **Channel Authorization** — JWT token validation
2. **Schema Validation** — Request structure and field constraints
3. **Business Rule Validation** — Limits, allowed transaction types, BIC validation
4. **Duplicate Detection** — RRN/STAN uniqueness checks

### Routing Intelligence
OpenConnect routes outbound messages based on:
- Sender and Receiver **BIC codes**
- **Transaction type** (Bulk, P2P, P2M, PISP)
- **Message format** (REST vs ISO 20022)
- **Async vs Sync** mode (most RAAST messages are asynchronous)

### Message Transformation
OpenConnect converts:
- Bank channel REST/JSON → SBP MPG ISO 20022 XML
- SBP MPG ISO 20022 → Bank channel REST/JSON

---

## Transaction Processing Modes

### Asynchronous (Primary Mode)
Most RAAST transactions are **asynchronous**:
1. Channel sends request → OpenConnect acknowledges with `HTTP 200`
2. OpenConnect processes and forwards to MPG
3. MPG responds asynchronously via callback
4. OpenConnect delivers result to bank channel endpoint

### Synchronous (Limited APIs)
A few APIs operate synchronously (e.g., Title Fetch, Bank List). Response is returned directly.

---

## Supported Transaction Flows

### Bulk Sending Flow

```
Bank Channel ──[Pre-Validation Request]──► OpenConnect ──► MPG ──► Receiving Bank
             ◄──[Pre-Validation Reply]──   OpenConnect ◄── MPG ◄── Receiving Bank

Bank Channel ──[Payment Request]──────────► OpenConnect ──► MPG ──► Receiving Bank
             ◄──[Return Payment]────────    OpenConnect ◄── MPG ◄── Receiving Bank (PACS.004)
             ◄──[E2E Reconciliation]──      OpenConnect ◄── MPG ◄── Receiving Bank
```

### P2P Payment Flow

```
Bank Channel ──[Title Fetch / CAS Lookup]──► OpenConnect ──► MPG/CAS
             ◄──[Account Title]────────────  OpenConnect ◄── MPG/CAS

Bank Channel ──[Payment Request]────────────► OpenConnect
             ◄──[HTTP 200 ACK]──────────────  OpenConnect
                                              ↓ [Debit Request] → Core Banking
                                              ↓ [PACS.008] → MPG → Receiving Bank
                                              ↓ [PACS.002/ACSP] ← MPG
             ◄──[Credit Confirmation]──────   OpenConnect
```

### P2M Flow (Static QRC)
```
Customer scans QR ──► Channel ──[SQRC Payment]──► OpenConnect
                                                    ↓ [Validate QR]
                                                    ↓ [Debit Check]
                                                    ↓ [PACS.008] ──► MPG
                                    Channel ◄──── [Payment Confirmation]
```

### PISP Consent Flow
```
PISP App ──[Consent Request]──► MPG ──► OpenConnect ──[GetAuthorization]──► Bank Channel
                                                                             ↓ [Customer Approves]
                                                         OpenConnect ◄──── [ConsentStatus]
Bank Channel ◄──────────────────────────────────────────[Consent Finalized]
```

---

## Batch Processing Architecture

### Pre-Validation

OpenConnect manages bulk batch state through the following stages:

| Stage | Batch Status | Description |
|-------|-------------|-------------|
| Received from Bank | `Received` | Batch stored locally |
| Processing | `In Process` | Preparing ISO 20022 message |
| Sent to MPG | `Pre-Validation Sent` | Forwarded to SBP |
| Response Received | `Pre-Validation Response Received` | MPG response parsed |
| Sent to Bank | `Pre-Validation Response Sent` | Failures forwarded to bank |

### Payment Batch

| Stage | Batch Status |
|-------|-------------|
| Received | `Received` |
| Processing | `In Process` |
| Sent to MPG | `Payment Sent` |
| MPG ACK | `Payment ACK` |
| E2E Received | `Completed` |

---

## Security Architecture

### Token-Based Channel Authentication
```
Channel ──[POST /authenticate]──► OpenConnect
         ◄──[JWT Bearer Token]──  OpenConnect

Channel ──[API Request + Authorization: Bearer <token>]──► OpenConnect
```

### KeyCloak (Version 2)
```
Channel ──[POST /realms/paysys-raast-realm/protocol/openid-connect/token]──► KeyCloak
         ◄──[access_token (expires in 300s)]────────────────────────────────  KeyCloak
```

### Multi-Channel Support
OpenConnect supports multiple channel configurations. Each channel has:
- Independent credentials
- Separate JWT token lifecycle
- Configurable transaction limits

---

## SAF (Store and Forward)

OpenConnect uses SAF for reliable message delivery:
- Outbound messages are stored before forwarding
- Duplicate message detection at SAF level
- Retry logic for failed deliveries
- Duplicate E2E / PACS004 messages are identified and logged without double-processing

---

## OpenConnect Backoffice

The backoffice portal provides operational visibility:

| Feature | Description |
|---------|-------------|
| Batch View | List all batches with status |
| Batch Summary | Stats per batch (total, success, rejected, timeout) |
| Batch Details | Per-record IBAN, amount, response code |
| Batch Reposting | Repost failed batches (maker-checker workflow) |
| Exception Reports | E2E exceptions, missing PACS004, orphan PACS002 |

### Batch Reposting Rules
- **Batch failed to reach MPG**: Repost from backoffice
- **Reply failed to reach Bank**: Repost pre-validation reply, payment reply, or return payment
- Reprocessing is available **once only** per failed batch
- All actions logged in audit trail
- Maker-checker approval required

---

## Exception Handling

| Case | Description | Action |
|------|-------------|--------|
| E2E not received same day | Funds stuck in RAAST settlement | Use Transaction Inquiry; check Participant Portal |
| OC did not receive E2E | SBP delivered but OC missed it | Query IPSE2EMS from OC UI |
| E2E received multiple times | Duplicate processing risk | SAF handles; 2nd E2E logged and rejected |
| RETURN not received but E2E shows RETURNED | Anomaly | E2E Exception report highlights it |
| Duplicate RETURN payment | — | SAF passes all; OC logs duplicate |
| PACS.008 sent, no HTTP 200 | Batch not acknowledged | Repeat with same MSGID until HTTP 200 |
| PACS.002/ACSP not received | Payment not confirmed | Log; visible in backoffice screen |

---

## Integration Interface Summary

| Direction | Source | Destination | Protocol |
|-----------|--------|-------------|----------|
| Outbound | Bank Channel | OpenConnect | REST/JSON |
| Outbound | OpenConnect | SBP MPG | REST / ISO 20022 |
| Inbound | SBP MPG | OpenConnect | REST / ISO 20022 |
| Callback | OpenConnect | Bank Channel | REST/JSON |
| Internal | OpenConnect | Core Banking | REST / SOAP / ISO 8583 |
