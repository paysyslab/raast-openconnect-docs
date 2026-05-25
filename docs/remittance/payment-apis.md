---
id: payment-apis
title: Payment APIs
sidebar_position: 3
---

# Remittance — Payment APIs

---

## Payment Inquiry {#payment-inquiry}

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/creditinquiry`

Used to check the status of an outward remittance payment. Returns the updated transaction status.

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

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `iban` | String(24) | Yes | Customer account in IBAN format |
| `Original_STAN` | String | Yes | STAN of the original transaction |
| `Original_RRN` | String | Yes | RRN of the original transaction |
| `amount` | Float | Yes | Transaction amount |
| `transaction_date` | String | Yes | Format: `yyyy-mm-dd` |
| `transaction_time` | String | Yes | Format: `HHmmss` |
| `rrn` | String(12) | Yes | 12-digit unique reference number |
| `stan` | String | Yes | System trace audit number |

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS"
  },
  "stan": "010123",
  "rrn": "010123010123"
}
```

---

## Remittance Payment (Debit Account) {#debit-account}

<span className="http-method method-post">POST</span> `/api/v3/paysyslabs/remittance/payment`

Initiates a remittance payment by debiting the sender's account and forwarding a credit request to RAAST. Use `ttc = "005"` to differentiate from P2P (`ttc = "001"`).

OpenConnect sends a debit request to the bank middleware/CBS, then forwards the credit to RAAST MPG.

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
  "remitting_institute": "WesternUnion",
  "country": "US",
  "country_code": "2100",
  "currency_FCY": "USD",
  "amount_in_FCY": 20.00,
  "amount": 5600.00,
  "rate_of_conversion": 280.78,
  "payment_purpose": "001",
  "transaction_reference": "010000223333111",
  "fee": 0,
  "transaction_date": "2021-05-26",
  "transaction_time": "122550",
  "narration": "9471",
  "ttc": "005",
  "rrn": "000000123456",
  "stan": "123456",
  "reserve_field_1": "",
  "reserve_field_2": "",
  "reserve_field_3": "",
  "reserve_field_4": "",
  "reserve_field_5": ""
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sender_iban` | String(24) | Yes | Sender account in IBAN format |
| `sender_idtype` | String(32) | Yes | Sender ID type (see [ID Types](#id-types)) |
| `sender_idvalue` | String(64) | Yes | Sender ID value |
| `sender_name` | String(140) | Yes | Sender full name |
| `receiver_iban` | String(24) | Yes | Beneficiary account in IBAN format |
| `receiver_idtype` | String(32) | No | Beneficiary ID type |
| `receiver_idvalue` | String(64) | No | Beneficiary ID value |
| `receiver_name` | String(140) | Yes | Beneficiary full name |
| `receiver_participant_code` | String(12) | Yes | Beneficiary bank BIC (min 8, max 12) |
| `remitting_institute` | String(35) | No | Name of MTO (e.g., WesternUnion, MoneyGram) |
| `country` | String(2) | No | ISO 3166-1 alpha-2 origin country code |
| `country_code` | String(4) | No | ITRS country code (up to 4 digits) |
| `currency_FCY` | String(3) | No | Foreign currency code (e.g., `USD`, `GBP`) |
| `amount_in_FCY` | Float(15) | No | FCY amount (max 12 integer, 2 decimal) |
| `amount` | Float(15) | Yes | PKR amount to transfer (max 12 integer, 2 decimal) |
| `rate_of_conversion` | Float(12) | No | FCY→PKR conversion rate applied (max 9 integer, 2 decimal) |
| `payment_purpose` | String(3) | Yes | 3-digit transaction type code (see [Response Codes](/remittance/response-codes#transaction-type-codes)) |
| `transaction_reference` | String(35) | No | Original MTO transaction reference |
| `fee` | Float | Yes | Fee to deduct from sender (currently 0) |
| `transaction_date` | String | Yes | Format: `yyyy-mm-dd` |
| `transaction_time` | String | Yes | Format: `HHmmss` |
| `narration` | String(35) | Yes | Remittance purpose code per SBP Code List No. 5 |
| `ttc` | String(3) | Yes | `005` for Remittance (vs `001` for P2P) |
| `rrn` | String(12) | Yes | 12-digit unique reference number |
| `stan` | String(6) | Yes | 6-digit system trace audit number |
| `reserve_field_1–5` | String | Conditional | Reserved for future use |

### ID Types {#id-types}

| ID Type | Format |
|---------|--------|
| `CNIC`, `SCNIC`, `POC`, `SNIC`, `Form-B`, `NICOP` | Numeric only |
| `PASSPORT`, `Passport`, `POR`, `ARC`, `AC` | Alphanumeric |
| `NTN`, `REG_NO` | Alphanumeric with special chars (`/ - : , &`) |

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS"
  },
  "stan": "010123",
  "rrn": "010123010123",
  "correlationId": "axxansayyysaii965sa2asasannsas",
  "messageId": "JJHHK1222333665",
  "instructionId": "JJHHK1222333665",
  "transactionId": "JJHHK1222333665"
}
```

### Response (Failure)

```json
{
  "response": {
    "response_code": "99",
    "response_desc": "FAILURE"
  },
  "stan": "010123",
  "rrn": "010123010123"
}
```

### Response (Failure with Reject Details)

```json
{
  "response": {
    "response_code": "99",
    "response_desc": "Document was rejected by counterparty"
  },
  "rrn": "488070018776",
  "stan": "349972",
  "orgRejectCode": "EL201",
  "orgRejectReason": "Cancellation requested following technical problems resulting in an erroneous transaction"
}
```

---

## Remittance Payment (Direct Posting) {#direct-posting}

<span className="http-method method-post">POST</span> `/api/v3/paysyslabs/remittance/directposting`

Sends the credit request directly to RAAST MPG without sending a debit request to the bank. Use this when the bank's own system has already debited the customer account.

OpenConnect returns a `correlationId` on success — the channel must store this alongside the host transaction. This ID maps to `Message Id` in RAAST transaction reports.

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
  "remitting_institute": "WesternUnion",
  "country": "US",
  "country_code": "2100",
  "currency_FCY": "USD",
  "amount_in_FCY": 20.00,
  "amount": 5600.00,
  "rate_of_conversion": 280.78,
  "payment_purpose": "001",
  "transaction_reference": "010000223333111",
  "transaction_date": "2021-05-26",
  "transaction_time": "122550",
  "narration": "9471",
  "ttc": "005",
  "rrn": "000000123456",
  "stan": "123456",
  "reserve_field_1": "",
  "reserve_field_2": "",
  "reserve_field_3": "",
  "reserve_field_4": "",
  "reserve_field_5": ""
}
```

:::info Note
The Direct Posting request uses the same parameters as [Debit Account](#debit-account) **except** `fee` is not required (no bank debit step).
:::

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS"
  },
  "stan": "010123",
  "rrn": "010123010123",
  "correlationId": "axxansayyysaii965sa2asasannsas",
  "messageId": "JJHHK1222333665",
  "instructionId": "JJHHK1222333665",
  "transactionId": "JJHHK1222333665"
}
```

### Response (Failure)

```json
{
  "response": {
    "response_code": "99",
    "response_desc": "FAILURE"
  },
  "stan": "010123",
  "rrn": "010123010123"
}
```

---

## Payment Inquiry V3 {#inquiry-v3}

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/creditinquiryv3`

Enhanced version of [Payment Inquiry](#payment-inquiry). Returns the same status information plus 4 additional fields (`correlationId`, `messageId`, `instructionId`, `transactionId`) on success.

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

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `iban` | String(24) | Yes | Sender account IBAN from original transaction |
| `Original_STAN` | String | Yes | STAN of the original transaction |
| `Original_RRN` | String | Yes | RRN of the original transaction |
| `amount` | Float | Yes | Original transaction amount |
| `transaction_date` | String | Yes | Original date (`yyyy-mm-dd`) |
| `transaction_time` | String | Yes | Original time (`HHmmss`) |
| `rrn` | String(12) | Yes | 12-digit unique reference number |
| `stan` | String(6) | Yes | 6-digit system trace audit number |

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS"
  },
  "stan": "010123",
  "rrn": "010123010123",
  "correlationId": "axxansayyysaii965sa2asasannsas",
  "messageId": "JJHHK1222333665",
  "instructionId": "JJHHK1222333665",
  "transactionId": "JJHHK1222333665"
}
```

### Response (Failure)

```json
{
  "response": {
    "response_code": "99",
    "response_desc": "FAILURE"
  },
  "stan": "010123",
  "rrn": "010123010123"
}
```
