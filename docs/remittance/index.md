---
id: index
title: Remittance Overview
sidebar_label: Overview
sidebar_position: 1
---

# Remittance

> **TSD Reference:** PSL Ref. IS-ITS-0621-03 | Version 1.5 | Last Modified: 29th April 2026

The Remittance module enables **inbound international remittance payments** to Pakistani bank accounts via the RAAST network. Foreign Currency (FCY) amounts are converted to PKR and credited to beneficiary accounts.

---

## Overview

Remittance payments flow from overseas **Money Transfer Operators (MTOs)** like Western Union, MoneyGram, etc., through the bank's system into RAAST for final credit to the beneficiary's account.

- Uses **RAAST P2P infrastructure** with remittance-specific fields
- Differentiated from P2P by `ttc = "005"` (vs `"001"` for P2P)
- Supports FCY → PKR conversion with exchange rate recording

---

## Solution Architecture

```
MTO / Sending Institution (Overseas)
    │
    │ (Bank's proprietary channel)
    ▼
Bank System / Channel
    │
    │ REST APIs
    ▼
OpenConnect
    │
    ├─ Debit/Direct Posting ──────────────► SBP MPG (RAAST)
    │
    └─ Debit Request ─────────────────────► Core Banking
```

---

## Integration Interfaces

### MPG Interface

| S.No | Source | Destination | Description | Format |
|------|--------|-------------|-------------|--------|
| 1 | MPG | Open Connect | Receipt of instant payment requests | REST APIs |
| 2 | Open Connect | MPG | Reply messages | PACS.002/AUTH, PACS.002/NAUT |
| 3 | Channel | Open Connect | Alias management, outbound payments, title fetch | REST |
| 4 | Open Connect | Core Banking | Pre-Validation, Credit Request, Debit/Hold, Reversal | REST |

### Bank System Interface

| Service | Description |
|---------|-------------|
| Account Information Inquiry | For title fetch |
| Credit Posting | Incoming credit |
| Status of Payment | Payment status check |
| Debit / Hold Request | Debit customer or hold amount |
| Debit / Hold Confirmation | Acknowledge debit completion |
| Debit Release | Release on RAAST rejection |
| Debit Reversal | Reverse debit on rejection |

---

## Key Differentiators from P2P

| Field | P2P | Remittance |
|-------|-----|------------|
| `ttc` | `001` | `005` |
| `remitting_institute` | Optional | Required |
| `country` / `country_code` | N/A | Required |
| `currency_FCY` | N/A | Required |
| `amount_in_FCY` | N/A | Required |
| `rate_of_conversion` | N/A | Required |

---

## API Summary

| API | Method | Endpoint |
|-----|--------|----------|
| [Get Institutions List](/remittance/inquiry-apis#institutions-list) | GET | `/api/v1/paysyslabs/banklist` |
| [Title Fetch](/remittance/inquiry-apis#title-fetch) | POST | `/api/v1/paysyslabs/titlefetch` |
| [Payment Inquiry](/remittance/payment-apis#payment-inquiry) | GET | `/api/v1/paysyslabs/creditinquiry` |
| [Remittance Payment (Debit Account)](/remittance/payment-apis#debit-account) | POST | `/api/v3/paysyslabs/remittance/payment` |
| [Remittance Payment (Direct Posting)](/remittance/payment-apis#direct-posting) | POST | `/api/v3/paysyslabs/remittance/directposting` |
| [Payment Inquiry V3](/remittance/payment-apis#inquiry-v3) | GET | `/api/v1/paysyslabs/creditinquiryv3` |
