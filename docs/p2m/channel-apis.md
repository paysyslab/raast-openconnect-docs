---
id: channel-apis
title: Channel APIs
sidebar_position: 5
---

# P2M — Channel APIs

These include both APIs **called by the channel** to OC, and APIs that **OC calls on the bank's channel**.

---

## Payment Inquiry {#payment-inquiry}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/inquiry`

Query the status of a P2M payment transaction.

### Request Body

```json
{
  "info": { "rrn": "010123010125", "stan": "010125" },
  "originalRrn": "010123010123",
  "originalStan": "010123",
  "senderIban": "PKBALH000093133192132",
  "amount": 1500.00,
  "transaction_date": "2024-01-15",
  "transaction_time": "143000"
}
```

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "transactionStatus": "PROCESSED",
  "correlationId": "axxansayyysaii965sa2asasannsas"
}
```

---

## Request for Return {#request-for-return}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/payment/return`

Channel initiates a return for a completed P2M payment. Triggers RAAST return flow.

### Request Body

```json
{
  "info": { "rrn": "010123010200", "stan": "010200" },
  "originalRrn": "010123010123",
  "originalStan": "010123",
  "originalCorrelationId": "axxansayyysaii965sa2asasannsas",
  "returnReason": "Customer requested reversal",
  "amount": 1500.00,
  "currency": "PKR"
}
```

### Request for Return Accept / Reject

When the return request is received by the merchant bank, the merchant channel can accept or reject:

```json
{
  "info": { "rrn": "010123010201", "stan": "010201" },
  "returnRequestId": "RET-2024-001",
  "decision": "ACCEPT"
}
```

---

## RTP Request (OC → Bank Channel) {#rtp-request}

<span className="http-method method-post">POST</span> `<bank-channel-endpoint>`

OpenConnect calls this bank channel endpoint to push an RTP notification to the customer.

### Request Body

```json
{
  "info": { "rrn": "010123010126", "stan": "010126" },
  "rtpId": "RTP-2024-002",
  "merchantName": "ABC Store",
  "merchantIban": "PKBALH000093133192200",
  "amount": 3500.00,
  "currency": "PKR",
  "rtpType": "LATER",
  "expiry": "2024-01-16T23:59:59",
  "paymentPurpose": "022",
  "referenceLabel": "INV-RTP-002",
  "merchantIdAlias": "TILL001",
  "memberId": "BAHLPKKA",
  "rejectReason": ""
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rtpId` | String | Yes | Unique RTP identifier |
| `merchantName` | String | Yes | Merchant name |
| `amount` | Float | Yes | Payment amount |
| `rtpType` | String | Yes | `LATER` or `NOW` |
| `expiry` | String | Conditional | Required for `LATER` type |
| `referenceLabel` | String | No | Invoice or reference label |
| `merchantIdAlias` | String | Conditional | Merchant alias (may be mandatory based on merchant type) |
| `memberId` | String | Yes | Sending institution MemberId |
| `rejectReason` | String | No | Reject reason if applicable |

---

## Notify Channel for Return Payment (OC → Bank Channel) {#notify-return}

<span className="http-method method-post">POST</span> `<bank-channel-endpoint>`

OpenConnect calls the bank channel to notify about a payment return request from the acquiring bank.

### Request Body

```json
{
  "info": { "rrn": "010123010202", "stan": "010202" },
  "returnRequestId": "RET-2024-001",
  "originalRrn": "010123010123",
  "amount": 1500.00,
  "currency": "PKR",
  "merchantName": "ABC Store",
  "returnReason": "Merchant initiated return"
}
```
