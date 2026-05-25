---
id: index
title: Bulk Sending Overview
sidebar_label: Overview
sidebar_position: 1
---

# Bulk Sending <span className="version-badge">v1.10</span>

> **TSD Reference:** PSL Ref. IS-ITS-0821-04 | Version 1.10 | Last Modified: 26th March 2026

Bulk Sending enables banks to act as **sending institutions** for high-volume batch payments on the RAAST network. Use cases include salary disbursements, dividends, pensions, corporate payouts, and government payments.

---

## Solution Architecture

```
Bank Channel / Middleware
        │
        │ REST APIs
        ▼
┌─────────────────────┐
│    OpenConnect      │
│  (Participant-side) │
└────────┬────────────┘
         │ REST + ISO 20022
         ▼
┌─────────────────────┐     ┌──────────────────────┐
│    SBP MPG          │────►│  Receiving Bank      │
│    (RAAST)          │◄────│  (Beneficiary Bank)  │
└─────────────────────┘     └──────────────────────┘
```

---

## Integration Overview

### MPG Interface

| No. | Source | Destination | Description | Format |
|----|--------|-------------|-------------|--------|
| 1 | Bank Channel/MW | OpenConnect | Pre-Validation, Payment, Transaction Inquiry | REST APIs |
| 2 | OpenConnect | MPG | Pre-Validation, Payment, Transaction Inquiry | REST APIs |
| 3 | MPG | OpenConnect | Status Reply, Return Payment (PACS004), E2E | REST APIs |
| 4 | OpenConnect | Bank Channel/MW | Pre-Validation Reply, Payment Reply, E2E, Return | REST APIs |

### Bank System Interface

OpenConnect exposes to bank:
- **Pre-Validation** — Batch title fetch before payment
- **Payment** — Actual batch payment initiation
- **Transaction Inquiry** — Per-batch or per-record status check

OpenConnect calls on bank:
- **Pre-Validation Reply** — Failure records from beneficiary bank
- **Return Payment (PACS004)** — Failed credits at destination
- **E2E Reconciliation** — Final batch status for all transactions

---

## Accounting Model (Recommended)

When initiating a bulk payment:

1. **Before Pre-Validation**: Debit Company A/C → Credit Internal Sundry A/C (total batch amount)
2. **On Pre-Validation Reply**: Debit Sundry → Credit RAAST Bulk Sending Settlement (validated amount only)
3. **On E2E Receipt**: Debit RAAST Bulk Sending Settlement → Credit RAAST Main Settlement A/C
4. **On Return Payment (PACS004)**: Debit RAAST Bulk Sending Settlement → Credit Sundry A/C (returned amount)

:::caution Important
Only make financial entries based on **PACS004/Return Payment** — not on E2E alone. E2E is for reconciliation only.
:::

---

## Key Rules

- **Batch ID and Tracking ID must be identical** between pre-validation and payment requests — this ensures traceability in OC and SBP reports
- Each batch is for a **single receiving institution** — if there are multiple receiving banks, create separate batches per bank
- Pre-validation is **mandatory** before payment — failed records from pre-validation cannot be included in payment
- Financial GL entries must be done **before** sending payment to OpenConnect

---

## API Summary

| API | Method | Endpoint | Direction |
|-----|--------|----------|-----------|
| [Pre-Validation](/bulk-sending/api-reference#pre-validation) | POST | `/api/v1/paysyslabs/bulksending/preval` | Bank → OC |
| [Pre-Validation Reply](/bulk-sending/api-reference#pre-validation-reply) | POST | `<bank endpoint>` | OC → Bank |
| [Batch Payment Request](/bulk-sending/api-reference#batch-payment-request) | POST | `/api/v1/paysyslabs/bulksending/payment` | Bank → OC |
| [Return Payment (PACS004)](/bulk-sending/api-reference#return-payment) | POST | `<bank endpoint>` | OC → Bank |
| [E2E Reconciliation](/bulk-sending/api-reference#e2e-reconciliation) | POST | `<bank endpoint>` | OC → Bank |
| [Transaction Inquiry](/bulk-sending/api-reference#transaction-inquiry) | POST | `/api/v1/paysyslabs/bulksending/paymentinquiry` | Bank → OC |
| [Prevalidation Inquiry](/bulk-sending/api-reference#prevalidation-inquiry) | POST | `/api/v1/paysyslabs/bulksending/prevalinquiry` | Bank → OC |
| [Transaction Inquiry V2](/bulk-sending/api-reference#transaction-inquiry-v2) | POST | `/api/v1/paysyslabs/bulksending/paymentinquiryV2` | Bank → OC |
| [SWAPS Inquiry](/bulk-sending/api-reference#swaps-inquiry) | POST | `/api/v1/paysyslabs/bulksending/swaps/inquiry` | Bank → OC |
| [Batch Status to SWAPS](/bulk-sending/api-reference#batch-status-to-swaps) | POST | `/api/v1/paysyslabs/bulksending/swaps/batchstatus` | Bank → OC |
| [Tax Batch Payment](/bulk-sending/api-reference#tax-batch-payment-request) | POST | `/api/v1/paysyslabs/bulksending/tax/payment` | Bank → OC |
| [Tax Batch Payment Reply](/bulk-sending/api-reference#tax-batch-payment-reply) | POST | `<bank endpoint>` | OC → Bank |
