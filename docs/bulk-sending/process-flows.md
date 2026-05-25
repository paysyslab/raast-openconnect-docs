---
id: process-flows
title: Transaction Process Flows
sidebar_position: 3
---

# Bulk Sending — Transaction Process Flows

---

## Pre-Validation Flow

Pre-validation fetches account titles in bulk from the beneficiary bank before initiating payment. Only accounts that pass pre-validation are included in the payment batch.

### Functional Steps

| Actor | Action |
|-------|--------|
| **Bank System** | Calls OC Pre-Validation API with batch details (sender BIC, receiver BIC, batch ID, tracking IDs, IBANs, amounts) |
| **OpenConnect** | Validates channel authorization → Responds HTTP 200 → Stores batch as `Received` → Prepares ISO 20022 message (`In Process`) → Sends to MPG (`Pre-Validation Sent`) |
| **MPG** | Validates JWT → Validates request → Forwards to receiving bank |
| **Receiving Bank** | Validates request → Extracts records → Performs per-record pre-validation → Replies to MPG |
| **MPG** | Validates response → Calls OC status reply endpoint |
| **OpenConnect** | Marks status `Pre-Validation Response Received` → Calls bank endpoint with **failed records only** → Marks `Pre-Validation Response Sent` |
| **Bank** | Marks failed records — these cannot be included in payment |

### Pre-Validation Flow Diagram

```
Bank Channel
    │
    │ POST /api/v1/paysyslabs/bulksending/preval
    ▼
OpenConnect ──────────── HTTP 200 ACK ──────────► Bank Channel
    │
    │ Pre-Validation Request (ISO 20022)
    ▼
SBP MPG
    │
    │ Forward to Receiving Bank
    ▼
Receiving Bank
    │
    │ Pre-Validation Response
    ▼
SBP MPG ──► OpenConnect ──► Bank Channel (failed records only)
```

---

## Payment Flow

After pre-validation, the bank initiates a payment batch for the accounts that passed validation.

### Functional Steps

| Actor | Action |
|-------|--------|
| **Bank System** | Removes failed pre-validation accounts → Calculates total batch value → Posts GL entry → Calls OC Payment API |
| **OpenConnect** | Validates auth → HTTP 200 → Stores batch `Received` → Prepares PACS.008 → Sends to MPG (`Payment Sent`) |
| **MPG** | Validates + Acknowledges OC |
| **OpenConnect** | Marks batch `Payment ACK` |
| **MPG** | Decreases sender position limit → Increases receiver limit → Sends PACS.008 to receiving bank |
| **Receiving Bank** | Acknowledges MPG → Receives PACS.002 confirmation → Posts credits → Sends PACS.004 (failures) + E2E |
| **MPG** | On PACS.004: Reverts position accounts → Sends PACS.002 to both banks |
| **OpenConnect** | Receives PACS.002 for return → Sends Return Payment to bank |
| **Bank** | Reverts account for returns → Marks as Failed |
| **OpenConnect** | Receives E2E → Stores → ACKs MPG → Updates all transaction statuses → Sends E2E to bank |
| **Bank** | Updates all transaction statuses → Marks batch as Reconciled |

### Payment Flow Diagram

```
Bank Channel
    │ POST /api/v1/paysyslabs/bulksending/payment
    ▼
OpenConnect ──── HTTP 200 ──► Bank Channel
    │
    │ PACS.008 Payment
    ▼
SBP MPG ──► Receiving Bank
               │
               ├─ PACS.002 (Confirmation)
               ├─ PACS.004 (Return — for failures)
               └─ E2E (End-to-End Reconciliation)
    ▼
SBP MPG ──► OpenConnect
               │
               ├─ Return Payment ──► Bank Channel
               └─ E2E Message ─────► Bank Channel
```

---

## Batch State Machine

```
[Received] → [In Process] → [Pre-Validation Sent]
                                    ↓
                     [Pre-Validation Response Received]
                                    ↓
                     [Pre-Validation Response Sent]
                                    ↓ (Bank initiates payment)
[Received] → [In Process] → [Payment Sent]
                                    ↓
                             [Payment ACK]
                                    ↓
                          [E2E Received = Completed]
```
