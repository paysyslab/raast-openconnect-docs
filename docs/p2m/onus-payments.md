---
id: onus-payments
title: Onus Payment APIs
sidebar_position: 4
---

# P2M — Onus Payment APIs

Onus payments are for scenarios where both the **payer and merchant have accounts at the same bank** (same institution). These flows bypass MPG for the fund transfer while still going through OpenConnect for processing.

---

## Onus Static QRC Payment — Direct Posting {#onus-sqrc-direct}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/onus/payment/SQRC/direct`

Handles static QRC payment when payer and merchant are at the same bank. Bank handles debit/credit internally.

### Request Body

```json
{
  "info": { "rrn": "010123010123", "stan": "010123" },
  "senderIdentification": { "idType": "CNIC", "idValue": "4120321466271" },
  "senderInfo": { "iban": "PKBALH000093133192132", "accountTitle": "Abdul Rasheed" },
  "merchantInfo": {
    "merchantId": "MERCHANT001",
    "terminalId": "TERM001",
    "merchantIban": "PKBALH000093133192200",
    "merchantName": "ABC Store",
    "merchantCategory": "5411",
    "referenceLabel": "INV-ONUS-001"
  },
  "amount": 1500.00,
  "currency": "PKR",
  "paymentPurpose": "022",
  "fee": 0,
  "transaction_date": "2024-01-15",
  "transaction_time": "100000"
}
```

---

## Onus Static QRC Payment — Non-Direct Posting {#onus-sqrc-non-direct}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/onus/payment/SQRC`

OC calls bank's Debit and Credit APIs for the fund transfer.

---

## Onus Dynamic QRC Payment — Direct Posting {#onus-dqrc-direct}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/onus/payment/DQRC/direct`

Handles dynamic QRC when payer and merchant are at same bank. Bank handles funds internally.

---

## Onus Dynamic QRC Payment — Non-Direct Posting {#onus-dqrc-non-direct}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/onus/payment/DQRC`

OC calls bank's Debit and Credit APIs for DQRC onus flow.

---

## Onus Return Payment {#onus-return}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/merchant/onus/payment/return`

Initiates a return/refund for an onus payment.

### Request Body

```json
{
  "info": { "rrn": "010123010200", "stan": "010200" },
  "originalRrn": "010123010123",
  "originalStan": "010123",
  "senderIban": "PKBALH000093133192200",
  "receiverIban": "PKBALH000093133192132",
  "amount": 1500.00,
  "currency": "PKR",
  "returnReason": "Customer request"
}
```
