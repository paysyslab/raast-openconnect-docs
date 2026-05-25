---
id: index
title: P2P Overview
sidebar_label: Overview
sidebar_position: 1
---

# P2P — Person to Person

> **TSD Reference:** PSL Ref. IS-ITS-0521-03 | Version 3.5 | Last Modified: 11th May 2026

P2P enables **real-time instant fund transfers** between individuals using RAAST. Payments can be initiated via IBAN or through **CAS aliases** (CNIC, mobile number, email).

---

## About CAS (Central Addressing Scheme)

SBP introduced CAS for **customer alias management**. CAS allows:
- Payments using easy-to-remember identifiers instead of full IBANs
- Aliases: **CNIC**, **Mobile Number**, **Email**, **TXT (free text)**
- Centralized storage of IBAN and customer name at SBP

If CAS is unavailable, the sender can use **Title Fetch** to directly query the receiving bank.

---

## Solution Architecture

```
Bank Digital Channel (IB/MB/ATM)
    │
    │ REST APIs
    ▼
OpenConnect
    │
    ├─ CAS Requests ──────────────────────► SBP CAS (Alias Lookup)
    │
    ├─ ISO 20022 (PACS.008) ──────────────► SBP MPG
    │                                            │
    │   ◄── PACS.002/ACSP (Confirmation) ────────┘
    │   ◄── PACS.002/RJCT (Rejection)
    │
    ├─ Debit/Hold Request ───────────────► Core Banking (CBS)
    ├─ Credit Posting ───────────────────► Core Banking (CBS)
    └─ Title Fetch ──────────────────────► Core Banking (CBS)
```

---

## Integration Interfaces

### MPG Interface Messages

| Direction | Messages |
|-----------|---------|
| MPG → OC | PACS.008 (incoming payment), PACS.002/ACSP, PACS.002/RJCT |
| OC → MPG | PACS.002/AUTH, PACS.002/NAUT, CATM.028, ADMI.002 |

### Bank System Interface (CBS)

| Service | Description |
|---------|-------------|
| Account Information Inquiry | Pre-validation and title fetch |
| Credit Posting | Post incoming credit transactions |
| Status of Payment | Check payment status |
| Debit / Hold Request | Debit customer account or hold amount |
| Debit / Hold Confirmation | Acknowledge debit completion |
| Debit Release | Release held amount (on RAAST rejection) |
| Debit Reversal | Reverse debit if RAAST rejects (when account was debited at request time) |
| Heartbeat / Echo | Connectivity keepalive |

---

## Transaction Flow

```
Channel ──[Title Fetch / CAS Lookup]──► OC ──► MPG/CAS
        ◄──[Beneficiary Details]──      OC

Channel ──[Payment Request]────────────► OC
        ◄──[HTTP 200 ACK]───────────     OC
                                         │
                                         ├─[Debit Request]────► CBS
                                         │  ◄─[Debit ACK]
                                         │
                                         ├─[PACS.008]─────────► MPG
                                         │  ◄─[PACS.002/ACSP]
                                         │
                                         └─[Credit Confirmation]────► Channel
```

---

## API Summary

### CAS — Customer & Alias Management

| API | Method | Endpoint |
|-----|--------|----------|
| One-step Registration | POST | `/api/v1/paysyslabs/customers/one-step` |
| Customer Registration | POST | `/api/v1/paysyslabs/customers/registerCustomer` |
| Register CAA | POST | `/api/v1/paysyslabs/customers/registerCaa` |
| Sync Customer | POST | `/api/v1/paysyslabs/customers/syncCustomer` |
| Change Customer Status | POST | `/api/v1/paysyslabs/customers/status` |
| Update Customer Info | POST | `/api/v1/paysyslabs/customers/update` |
| Un-Register Customer | POST | `/api/v1/paysyslabs/customers/delete` |
| Change Alias Status | POST | `/api/v1/paysyslabs/alias/status` |
| Update Alias | POST | `/api/v1/paysyslabs/alias/update` |
| Link Alias to Account | POST | `/api/v1/paysyslabs/alias/link` |
| Unlink Alias from Account | POST | `/api/v1/paysyslabs/alias/unlink` |
| Register Alias | POST | `/api/v1/paysyslabs/alias/register` |
| Update Alias Validity Date | POST | `/api/v1/paysyslabs/alias/validitydate` |

### Inquiry APIs

| API | Method | Endpoint |
|-----|--------|----------|
| Get Institutions List | GET | `/api/v1/paysyslabs/banklist` |
| Title Fetch | POST | `/api/v1/paysyslabs/titlefetch` |
| Get Default Account by Alias | POST | `/api/v1/paysyslabs/alias/defaultaccount` |
| Get Customer Aliases & Accounts | GET | `/api/v1/paysyslabs/customers/aliasaccounts` |
| Get Customer Info | GET | `/api/v1/paysyslabs/customers/info` |

### Payment APIs

| API | Method | Endpoint |
|-----|--------|----------|
| Payment (Debit Account) v1 | POST | `/api/v1/paysyslabs/payment` |
| Payment (Direct Posting) v1 | POST | `/api/v1/paysyslabs/directposting` |
| Payment (Debit Account) v2 | POST | `/api/v2/paysyslabs/payment` |
| Payment (Direct Posting) v2 | POST | `/api/v2/paysyslabs/directposting` |
| Payment (Direct Posting Async) | POST | `/api/v3/paysyslabs/p2p/directposting` |
| Payment (Debit Account) v4 | POST | `/api/v4/paysyslabs/p2p/payment` |
| Payment (Direct Posting) v4 | POST | `/api/v4/paysyslabs/p2p/directposting` |
| Payment Inquiry v1 | POST | `/api/v1/paysyslabs/creditinquiry` |
| Payment Inquiry v2 | POST | `/api/v2/paysyslabs/creditinquiry` |
| Payment Inquiry v3 | GET | `/api/v1/paysyslabs/creditinquiryv3` |

### Limits APIs

| API | Method | Endpoint |
|-----|--------|----------|
| Get Limit | GET | `/api/v1/paysyslabs/limits` |
| Set Limit | POST | `/api/v1/paysyslabs/limits/set` |
