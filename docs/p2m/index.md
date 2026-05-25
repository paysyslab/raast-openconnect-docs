---
id: index
title: P2M Overview
sidebar_label: Overview
sidebar_position: 1
---

# P2M — Person to Merchant <span className="version-badge">v1.8.2</span>

> **TSD Reference:** PSL Ref. IS-ITS-1222-03 | Version 1.8.2 | Last Modified: 26th Nov 2025

P2M (Person-to-Merchant) enables **cashless merchant payments** through multiple QRC-based flows and Request-to-Pay (RTP) mechanisms.

---

## Transaction Types

| Initiator | SBP Use Case | PSL API |
|-----------|-------------|---------|
| Customer | Static QRC Payment | `merchantPaymentRequestSQRC` |
| Customer | Dynamic QRC Payment | `merchantPaymentRequestDPQRC` |
| Customer | Pay to Merchant Alias | `getMerchantaliasInfo` + Payment |
| Merchant | RTP Later | `rtpAcceptance` + `merchantPaymentRequestRTPL` |
| Merchant | RTP Now | `rtpAcceptance` + `merchantPaymentRequestRTPN` |

---

## Solution Architecture

```
Customer App (Mobile)
    │
    │ Scans QRC / Receives RTP
    ▼
Bank Channel
    │
    │ REST APIs
    ▼
OpenConnect
    │
    ├─ Validation & Routing
    │
    ├─ PACS.008 ──────────────────────────────► SBP MPG
    │   ◄── PACS.002/ACSP (Confirmation)
    │
    ├─ Merchant Alias Inquiry ──────────────► SBP CAS
    │
    └─ Debit/Credit ─────────────────────────► Core Banking
```

---

## Integration Overview

### Core Banking Interface
- REST Web Services
- CBS provides: Credit/Debit posting, Account inquiry, Heartbeat

### Channel Integration
- Channels receive payment confirmations
- For RTP flows, channel exposes an **RTP Request API** for OC to push RTP notifications

---

## API Summary

### Customer Initiated Payments

| API | Method | Endpoint |
|-----|--------|----------|
| [Static QRC Payment](/p2m/customer-initiated#static-qrc-payment) | POST | `/api/v1/paysyslabs/merchant/payment/SQRC` |
| [Pay to Alias (Merchant RAAST ID)](/p2m/customer-initiated#pay-to-alias) | POST | `/api/v1/paysyslabs/merchant/payment/alias` |
| [Merchant Alias Inquiry](/p2m/customer-initiated#merchant-alias-inquiry) | POST | `/api/v1/paysyslabs/merchant/alias/inquiry` |

### Merchant Initiated Payments

| API | Method | Endpoint |
|-----|--------|----------|
| [Dynamic QRC Payment (DQRC)](/p2m/merchant-initiated#dqrc-payment) | POST | `/api/v1/paysyslabs/merchant/payment/DQRC` |
| [Request to Pay Later (RTPL)](/p2m/merchant-initiated#rtp-later) | POST | `/api/v1/paysyslabs/merchant/payment/RTPL` |
| [Request to Pay Now (RTPN)](/p2m/merchant-initiated#rtp-now) | POST | `/api/v1/paysyslabs/merchant/payment/RTPN` |
| [RTP Acceptance](/p2m/merchant-initiated#rtp-acceptance) | POST | `/api/v1/paysyslabs/merchant/rtp/acceptance` |

### Channel Initiated

| API | Method | Endpoint |
|-----|--------|----------|
| [Payment Inquiry](/p2m/channel-apis#payment-inquiry) | POST | `/api/v1/paysyslabs/merchant/payment/inquiry` |
| [Request for Return](/p2m/channel-apis#request-for-return) | POST | `/api/v1/paysyslabs/merchant/payment/return` |

### Onus Payment APIs

| API | Method | Endpoint |
|-----|--------|----------|
| [Onus SQRC Direct Posting](/p2m/onus-payments#onus-sqrc-direct) | POST | `/api/v1/paysyslabs/merchant/onus/payment/SQRC/direct` |
| [Onus SQRC Non-Direct](/p2m/onus-payments#onus-sqrc-non-direct) | POST | `/api/v1/paysyslabs/merchant/onus/payment/SQRC` |
| [Onus DQRC Direct Posting](/p2m/onus-payments#onus-dqrc-direct) | POST | `/api/v1/paysyslabs/merchant/onus/payment/DQRC/direct` |
| [Onus DQRC Non-Direct](/p2m/onus-payments#onus-dqrc-non-direct) | POST | `/api/v1/paysyslabs/merchant/onus/payment/DQRC` |
| [Onus Return Payment](/p2m/onus-payments#onus-return) | POST | `/api/v1/paysyslabs/merchant/onus/payment/return` |

### Channel Integration (Bank Exposes)

| API | Method | Endpoint |
|-----|--------|----------|
| Generate Access Token | POST | `<bank-endpoint>` |
| [RTP Request](/p2m/channel-apis#rtp-request) | POST | `<bank-channel-endpoint>` |
| [Notify Channel for Return](/p2m/channel-apis#notify-return) | POST | `<bank-channel-endpoint>` |
