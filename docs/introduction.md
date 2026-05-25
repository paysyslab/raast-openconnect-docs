---
id: introduction
title: Introduction
sidebar_position: 1
---

# OpenConnect — RAAST Integration Middleware

> **Technical Specification Reference** for Raast Bulk Sending, P2P, P2M, PISP & Remittance integration via the OpenConnect middleware platform.

---

## What is OpenConnect?

**OpenConnect** is an enterprise-grade, highly scalable **payment integration middleware** built on a message-oriented architecture. It acts as the participant-side orchestration layer between a bank's internal systems and **SBP's RAAST instant payment infrastructure**.

OpenConnect is developed by **Paysys Labs (PSL)** and is deployed at participant banks to abstract away the complexity of scheme-specific messaging (ISO 20022, PACS, PAIN) and provide clean REST APIs to bank channels and middleware.

### Core Technology
- Message-oriented middleware based on **RabbitMQ** queue manager
- Supports horizontal scaling across machine clusters
- Deployable on virtual or containerized environments
- Developed in **Java**, cross-platform

### Supported Integration Methods

| Method | Description |
|--------|-------------|
| REST APIs (JSON) | Synchronous and asynchronous |
| ISO 20022 (XML) | PACS.008, PACS.002, PACS.004, PAIN.013, ADMI |
| ISO 8583 | For legacy core banking |
| SOAP / XML | Web services |
| MQ-based | Queue integration |
| LDAP | SBP LDAP connectivity |

---

## RAAST Overview

**RAAST** (Rah-e-Raast) is Pakistan's national **Instant Payment System (IPS)**, developed by the **State Bank of Pakistan (SBP)**. It enables real-time, 24/7 digital payments across all financial institutions.

### RAAST Phases

| Phase | Description | Status |
|-------|-------------|--------|
| Phase I | Bulk Receiving (Banks as receiving institution) | Live |
| Phase IIa | P2P Instant Payments (Person-to-Person) | Live |
| Phase IIb | Bulk Sending (Banks as sending institution) | Live |
| Phase III | Merchant Payments (P2M) | Live |

---

## Module Coverage

This documentation covers the following RAAST + OpenConnect integration modules:

### 1. [Bulk Sending](/bulk-sending/)
High-volume batch payment disbursements — salaries, dividends, pensions, corporate payouts.
- Pre-validation, Batch Payment, Return Payment, E2E Reconciliation
- SWAPS integration (FBR tax payments)
- Backoffice batch management

### 2. [P2P — Person to Person](/p2p/)
Instant peer-to-peer fund transfers using IBAN or CAS aliases.
- Customer registration, alias management, account management
- Multiple payment API versions (v1 through v4)
- FRMS (Fraud Risk Management) integration

### 3. [P2M — Person to Merchant](/p2m/)
Customer and merchant-initiated merchant payments.
- Static QRC, Dynamic QRC payments
- Request to Pay (RTP) Now and Later flows
- Onus payment APIs

### 4. [PISP — Payment Initiation Service Provider](/pisp/)
Consent-based payment initiation by third-party applications.
- Consent issuance and revocation
- OTP-based customer authentication
- Consent lifecycle management

### 5. [Remittance](/remittance/)
International inbound remittance payments via RAAST.
- FCY to PKR conversion support
- Debit Customer Account and Direct Posting flows

---

## Key Concepts

### Authentication
All API calls require a **Bearer JWT token** obtained via the authentication endpoint. OpenConnect supports two token mechanisms:
- **Version 1** — Proprietary token endpoint (`/authenticate`)
- **Version 2** — KeyCloak / OpenID Connect (`/realms/paysys-raast-realm/protocol/openid-connect/token`)

See the [Authentication](/authentication) page for full details.

### Common Fields

| Field | Description | Format |
|-------|-------------|--------|
| `RRN` | Retrieval Reference Number — unique per transaction | 12-digit numeric |
| `STAN` | System Trace Audit Number | 6-digit numeric |
| `BIC` | Bank Identifier Code | 8–16 characters |
| `IBAN` | International Bank Account Number (Pakistan format) | 24 characters, starts with `PK` |

### Response Structure
All APIs return a standard response wrapper:
```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS"
  },
  "rrn": "155620198520",
  "stan": "198520"
}
```

---

## Architecture Overview

![OpenConnect System Architecture](/img/OC-system.png)
