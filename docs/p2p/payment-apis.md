---
id: payment-apis
title: Payment APIs
sidebar_position: 5
---

# P2P — Payment APIs

---

## Payment Request v1 — Debit Customer Account

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/payment`

Debits the sender's account and initiates a P2P transfer to the beneficiary via RAAST.

### Request Body

```json
{
  "sender_iban": "PK56AIIN1234567890000001",
  "sender_name": "Ghulam Ali",
  "receiver_iban": "PK56AIIN1234567890000999",
  "receiver_name": "Daniyal Shaikh",
  "receiver_participant_code": "BICS1201",
  "amount": 5600.00,
  "fee": 0,
  "payment_purpose": "001",
  "narration": "Fund Transfer",
  "ttc": "001",
  "transaction_date": "2021-05-26",
  "transaction_time": "122550",
  "rrn": "000000123456",
  "stan": "123456"
}
```

### Response (Success)

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "stan": "010123",
  "rrn": "010123010123",
  "correlationId": "axxansayyysaii965sa2asasannsas",
  "messageId": "JJHHK1222333665",
  "instructionId": "JJHHK1222333665",
  "transactionId": "JJHHK1222333665"
}
```

:::tip
Store the `correlationId` returned by OpenConnect. This ID correlates with the `Message Id` in RAAST transaction reports for reconciliation.
:::

---

## Payment Request v1 — Direct Posting

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/directposting`

Sends the credit request directly to MPG **without** OpenConnect calling the bank's debit API. The bank's system handles debit internally.

### Request Body

Same as Debit Account v1, but without debit-related fields. OpenConnect will not call the bank's Debit/Hold API.

---

## Payment Request v2 — Debit Customer Account

<span className="http-method method-post">POST</span> `/api/v2/paysyslabs/payment`

Updated version with improved fields.

---

## Payment Request v2 — Direct Posting

<span className="http-method method-post">POST</span> `/api/v2/paysyslabs/directposting`

---

## Payment Request — Direct Posting Async (v3)

<span className="http-method method-post">POST</span> `/api/v3/paysyslabs/p2p/directposting`

Asynchronous direct posting. OC returns immediately with acknowledgement; the final payment result is delivered via callback.

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "correlationId": "axxansayyysaii965sa2asasannsas"
}
```

---

## Payment Request v4 — Debit Customer Account

<span className="http-method method-post">POST</span> `/api/v4/paysyslabs/p2p/payment`

Latest payment version with full remittance field support and improved validation.

### Request Body

```json
{
  "sender_iban": "PK56AIIN1234567890000001",
  "sender_idtype": "CNIC",
  "sender_idvalue": "1234567890123",
  "sender_name": "Ghulam Ali",
  "receiver_iban": "PK56AIIN1234567890000999",
  "receiver_idtype": "CNIC",
  "receiver_idvalue": "1234567890123",
  "receiver_name": "Daniyal Shaikh",
  "receiver_participant_code": "BICS1201",
  "amount": 5600.00,
  "fee": 0,
  "payment_purpose": "001",
  "narration": "Fund Transfer",
  "ttc": "001",
  "transaction_date": "2021-05-26",
  "transaction_time": "122550",
  "rrn": "000000123456",
  "stan": "123456",
  "reserve_field_1": "",
  "reserve_field_2": "",
  "reserve_field_3": "",
  "reserve_field_4": "",
  "reserve_field_5": ""
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sender_iban` | String(24) | Yes | Sender IBAN |
| `sender_idtype` | String(32) | Yes | `CNIC`, `NICOP`, `POC`, `REG_NO`, `NTN`, `PASSPORT`, `POR`, `SCNIC`, `SNIC`, `Form-B`, `ARC`, `AC` |
| `sender_idvalue` | String(64) | Yes | ID value |
| `sender_name` | String(140) | Yes | Sender name |
| `receiver_iban` | String(24) | Yes | Beneficiary IBAN |
| `receiver_idtype` | String(32) | No | Beneficiary ID type |
| `receiver_idvalue` | String(64) | No | Beneficiary ID value |
| `receiver_name` | String(140) | Yes | Beneficiary name |
| `receiver_participant_code` | String(12) | Yes | Beneficiary bank BIC (min 8, max 12) |
| `amount` | Float(15) | Yes | Transaction amount. Max 12 integer, 2 decimal |
| `fee` | Float | Yes | Fee deducted from sender |
| `payment_purpose` | String(3) | Yes | 3-digit purpose code |
| `ttc` | String(3) | Yes | `001` for P2P, `005` for Remittance |
| `transaction_date` | String | Yes | `yyyy-mm-dd` |
| `transaction_time` | String | Yes | `HHmmss` |
| `rrn` | String(12) | Yes | 12-digit unique reference |
| `stan` | String(6) | Yes | 6-digit trace number |

### Failure Response (Rejected by Counterparty)

```json
{
  "response": {
    "response_code": "99",
    "response_desc": "Document was rejected by counterparty"
  },
  "rrn": "488070018776",
  "stan": "349972",
  "orgRejectCode": "EL201",
  "orgRejectReason": "Cancellation requested following technical problems..."
}
```

---

## Payment Request v4 — Direct Posting

<span className="http-method method-post">POST</span> `/api/v4/paysyslabs/p2p/directposting`

Same as v4 Debit Account but OC does not call bank's debit API.

---

## Payment Inquiry v1

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/creditinquiry`

Check status of an outward payment transaction.

### Request Body

```json
{
  "iban": "PK56AIIN1234567890000001",
  "Original_STAN": "12345",
  "Original_RRN": "1234567890123",
  "amount": "150",
  "transaction_date": "2021-05-26",
  "transaction_time": "122550",
  "rrn": "000000123457",
  "stan": "123456"
}
```

---

## Payment Inquiry v3

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/creditinquiryv3`

Enhanced inquiry returning 4 additional fields (`correlationId`, `messageId`, `instructionId`, `transactionId`) on success.

### Request Body

```json
{
  "iban": "PK56AIIN1234567890000001",
  "Original_STAN": "12345",
  "Original_RRN": "1234567890123",
  "amount": "150",
  "transaction_date": "2021-05-26",
  "transaction_time": "122550",
  "rrn": "000000123457",
  "stan": "123456"
}
```

### Response (Success)

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "stan": "010123",
  "rrn": "010123010123",
  "correlationId": "axxansayyysaii965sa2asasannsas",
  "messageId": "JJHHK1222333665",
  "instructionId": "JJHHK1222333665",
  "transactionId": "JJHHK1222333665"
}
```

---

## TTC / Transaction Type Codes

| TTC | Description |
|-----|-------------|
| `001` | P2P Fund Transfer |
| `005` | Remittance Transfer |
