---
id: merchant-initiated
title: Merchant Initiated Payments
sidebar_position: 3
---

# P2M — Merchant Initiated Payments

---

## Dynamic QRC Payment (DQRC) {#dqrc-payment}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/DQRC`

Merchant generates a **Dynamic QRC** with a specific amount. Customer scans and pays.

### Request Body

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
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
    "referenceLabel": "INV-DYN-001",
    "categoryCode": "5411"
  },
  "amount": 3500.00,
  "currency": "PKR",
  "paymentPurpose": "022",
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "160000"
}
```

:::note
`categoryCode` was added in v1.8.2 in the `merchantInfo` object for DQRC payments.
:::

---

## Request to Pay Later (RTPL) {#rtp-later}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/RTPL`

Merchant sends a payment request that the customer will pay **at a later time**.

### Request Body

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
  "senderInfo": {
    "iban": "PKBALH000093133192132",
    "idType": "CNIC",
    "idValue": "4120321466271"
  },
  "merchantInfo": {
    "merchantId": "MERCHANT001",
    "merchantName": "ABC Store",
    "merchantCategory": "5411",
    "categoryCode": "5411",
    "referenceLabel": "INV-RTPL-001",
    "merchantIdAlias": "TILL001"
  },
  "additionalInfo": {
    "rtpId": "RTP-2024-001"
  },
  "amount": 5000.00,
  "currency": "PKR",
  "paymentPurpose": "022",
  "rtpType": "LATER",
  "expiry": "2024-01-16T23:59:59",
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "170000"
}
```

### Parameters (RTPL-specific)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rtpType` | String | Yes | `LATER` |
| `expiry` | String | Yes | RTP expiry datetime |
| `additionalInfo.rtpId` | String | Yes | RTP identifier |
| `categoryCode` | String | Yes | Merchant category code (from v1.8.2) |

:::note
`categoryCode` was added in v1.8.2 for RTPL payments.
:::

---

## Request to Pay Now (RTPN) {#rtp-now}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/RTPN`

Merchant sends an immediate payment request. Customer must respond quickly.

### Request Body

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
  "senderInfo": {
    "iban": "PKBALH000093133192132",
    "idType": "CNIC",
    "idValue": "4120321466271"
  },
  "merchantInfo": {
    "merchantId": "MERCHANT001",
    "merchantName": "ABC Store",
    "merchantCategory": "5411",
    "categoryCode": "5411",
    "referenceLabel": "INV-RTPN-001"
  },
  "additionalInfo": {
    "rtpId": "RTP-NOW-2024-001"
  },
  "amount": 2000.00,
  "currency": "PKR",
  "paymentPurpose": "022",
  "rtpType": "NOW",
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "180000"
}
```

:::note
`categoryCode` was added in v1.8.2 for RTPN payments.
:::

---

## RTP Acceptance {#rtp-acceptance}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/rtp/acceptance`

Customer accepts or rejects an RTP request.

### Request Body (Accept)

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
  "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "rtpId": "RTP-2024-001",
  "senderInfo": {
    "iban": "PKBALH000093133192132",
    "idType": "CNIC",
    "idValue": "4120321466271"
  },
  "decision": "ACCEPT",
  "amount": 5000.00,
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "190000"
}
```

### Request Body (Reject)

```json
{
  "info": { "rrn": "010123010124", "stan": "010124" },
  "rtpId": "RTP-2024-001",
  "decision": "REJECT",
  "rejectReason": "Insufficient funds"
}
```

### RTP Rejection Codes

| Code | Description |
|------|-------------|
| `01` | Insufficient funds |
| `02` | Account not active |
| `03` | Limit exceeded |
| `04` | Customer declined |
| `05` | Expired RTP |
