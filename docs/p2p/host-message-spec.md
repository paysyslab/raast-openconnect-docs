---
id: host-message-spec
title: Host Message Specification
sidebar_position: 8
---

# P2P — Host (CBS) Message Specification

OpenConnect interfaces with the bank's Core Banking System (CBS) for debit/credit operations. These are internal callbacks from OC to the bank's host.

---

## Debit / Hold Request

OpenConnect calls the bank's CBS to debit the sender's account or place a hold.

### Request Parameters

| Parameter | Description |
|-----------|-------------|
| Date/Time | Transaction timestamp |
| Sender IBAN | Customer account |
| Receiver IBAN | Beneficiary account |
| Receiver Name | Beneficiary name |
| Amount | Transaction amount |
| Receiving Institution ID | Destination bank BIC |
| Narration | Transaction description |
| Amount-Fee | Fee (currently 0) |
| STAN | Trace number |
| RRN | Reference number |
| Payment Purpose Code | Purpose code |
| Correlation Id | OC correlation reference |
| receiver_idtype | Beneficiary ID type |
| receiver_idvalue | Beneficiary ID value |
| ttc | Transaction type code |
| Reserve Field 1–4 | Future use |

### Response Parameters

| Parameter | Description |
|-----------|-------------|
| STAN (echo back) | Original trace number |
| RRN (echo back) | Original reference number |
| Correlation Id | |
| Date/Time | |
| IBAN (echo back) | |
| Host Response Code | Bank's response code |
| Host Response Description | Bank's response description |

---

## Debit / Hold Confirmation

Called after MPG confirms the payment. Bank finalizes the debit.

### Request Parameters

| Parameter | Description |
|-----------|-------------|
| Date/Time | |
| Sender IBAN | |
| STAN | |
| RRN | |
| Correlation Id | |
| Original transaction correlation id | |
| ttc | |
| Reserve Field 1–4 | |

---

## Debit / Hold Release or Reversal

Called when RAAST rejects the transaction. Releases the hold or reverses the debit.

### Request Parameters

| Parameter | Description |
|-----------|-------------|
| Date/Time | |
| Sender IBAN | |
| STAN | |
| RRN | |
| Correlation Id | |
| Original transaction correlation id | |
| ttc | |
| Reserve Field 1–4 | |

---

## Credit Posting

OpenConnect calls the bank's CBS to credit an incoming RAAST payment.

### Request Parameters

| Parameter | Description |
|-----------|-------------|
| Date/Time | |
| Receiver IBAN (from SBP) | |
| Amount (from SBP) | |
| Sender Institution ID | |
| Narration | |
| Tracking Id (SBP) | |
| Instruction Id (SBP) | |
| Batch ID (SBP) | |
| STAN | |
| RRN | |
| Payment Purpose Code | |
| Sender IBAN (SBP) | |
| Sender Name (SBP) | |
| ttc | |
| Reserve Field 1–4 | |

---

## Title Fetch

Used during pre-validation of incoming payments. OC queries CBS for account title.

### Request Parameters

| Parameter | Description |
|-----------|-------------|
| Unique ID | Per-request identifier |
| Date/Time | |
| Account Number (IBAN) | |
| Amount | |

### Optional Parameters
- ID Type, ID Value, Sender Institution ID

### Response Parameters

| Parameter | Description |
|-----------|-------------|
| Unique ID (echo back) | |
| Date/Time | |
| Account Number (IBAN) | |
| Host Response | |
| Account Title | |
| ID Type | CNIC, NIC, NICOP, POC, NTN, PASSPORT, REGNUM |
| ID Value | For joint accounts: list of CNICs |
| Account Status | Active, Block, Dormant, etc. |
| Credit Block | `Y` / `N` |
| Credit Available Limit | For Asaan Account types |

---

## Credit Inquiry

OC queries CBS for the status of a previously posted credit transaction.

### Request Parameters

| Parameter | Description |
|-----------|-------------|
| Unique Request ID | |
| Transaction reference | Of the original credit transaction |

### Response Parameters

| Parameter | Description |
|-----------|-------------|
| Unique Request ID (echo back) | |
| Transaction ID | Of the previous transaction |
| Host Response | `Transaction Not Found` if not received |
| Host Auth ID | If original response code was "Approved" |

---

## Direct Posting Callback API

<span className="http-method method-post">POST</span> `<bank-channel-endpoint>`

Used in the async direct posting flow. After OC processes the async payment request and receives a response from SBP, it calls this bank endpoint with the final status.

### Request Body

```json
{
  "correlationId": "axxansayyysaii965sa2asasannsas",
  "response_code": "00",
  "response_desc": "SUCCESS",
  "rrn": "010123010123",
  "stan": "010123"
}
```
