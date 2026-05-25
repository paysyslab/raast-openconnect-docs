---
id: customer-initiated
title: Customer Initiated Payments
sidebar_position: 2
---

# P2M — Customer Initiated Payments

---

## Static QRC Payment {#static-qrc-payment}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/SQRC`

Customer scans a **Static QRC** (with or without amount) on the merchant's display.

**Applicable scenarios:**
- Single-use QRC with/without amount
- Multi-use QRC with/without amount

### Request Body

```json
{
  "info": {
    "rrn": "010123010123",
    "stan": "010123"
  },
  "senderIdentification": {
    "idType": "CNIC",
    "idValue": "4120321466271"
  },
  "senderInfo": {
    "iban": "PKBALH000093133192132",
    "accountTitle": "Abdul Rasheed"
  },
  "merchantInfo": {
    "merchantId": "MERCHANT001",
    "terminalId": "TERM001",
    "merchantName": "ABC Store",
    "merchantCategory": "5411",
    "dba": "ABC Grocery",
    "merchantIdAlias": "TILL001",
    "referenceLabel": "INV-2024-001"
  },
  "amount": 1500.00,
  "currency": "PKR",
  "paymentPurpose": "022",
  "narration": "Grocery purchase",
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "143000"
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `info.rrn` | String(12) | Yes | 12-digit reference number |
| `info.stan` | String(6) | Yes | Trace number |
| `senderIdentification.idType` | String | Yes | `CNIC`, `NICOP` etc. |
| `senderIdentification.idValue` | String | Yes | ID value |
| `senderInfo.iban` | String(24) | Yes | Sender IBAN |
| `senderInfo.accountTitle` | String | Yes | Sender account title |
| `merchantInfo.merchantId` | String | Yes | Merchant ID |
| `merchantInfo.terminalId` | String | Yes | Terminal ID |
| `merchantInfo.merchantName` | String | Yes | Merchant name |
| `merchantInfo.merchantCategory` | String | Yes | Merchant Category Code (MCC) |
| `merchantInfo.dba` | String | No | Doing Business As name |
| `merchantInfo.merchantIdAlias` | String | Conditional | Merchant alias (TILL code, MID, VPA) |
| `merchantInfo.referenceLabel` | String | No | Reference label from QRC |
| `amount` | Float | Yes | Transaction amount |
| `currency` | String(3) | Yes | `PKR` |
| `paymentPurpose` | String(3) | Yes | SBP purpose code |
| `fee` | Float | Yes | Fee amount (0 if no fee) |

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "rrn": "010123010123",
  "stan": "010123",
  "correlationId": "axxansayyysaii965sa2asasannsas"
}
```

---

## Pay to Alias (Merchant RAAST ID) {#pay-to-alias}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/alias`

Customer pays a merchant using the merchant's RAAST Alias (CNIC or similar).

### Request Body

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
  "senderInfo": {
    "iban": "PKBALH000093133192132",
    "accountTitle": "Abdul Rasheed",
    "idType": "CNIC",
    "idValue": "4120321466271"
  },
  "merchantAlias": {
    "type": "CNIC",
    "value": "1234567890123"
  },
  "amount": 2500.00,
  "currency": "PKR",
  "paymentPurpose": "022",
  "dba": "XYZ Merchants",
  "merchantIdAlias": "TILL002",
  "referenceLabel": "REF-2024-002",
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "150000"
}
```

---

## Merchant Alias Inquiry {#merchant-alias-inquiry}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/alias/inquiry`

Resolves merchant account and details using a merchant alias (TILL_CODE, MID, or VPA).

### Request Body

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
  "merchantIdAlias": "TILL001",
  "aliasType": "TILL_CODE"
}
```

| Alias Type | Description |
|------------|-------------|
| `TILL_CODE` | Terminal/Till code |
| `MID` | Merchant ID |
| `VPA` | Virtual Payment Address (future) |

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "merchantInfo": {
    "merchantId": "MERCHANT001",
    "merchantName": "ABC Store",
    "iban": "PK26AIIN1234567890000056",
    "acquiringInstitution": "BAHLPKKA",
    "mcc": "5411",
    "dba": "ABC Grocery"
  }
}
```
