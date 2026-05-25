---
id: api-reference
title: API Reference
sidebar_position: 4
---

# Bulk Sending — API Reference

All APIs require `Authorization: Bearer <token>` in the header. See [Authentication](/authentication).

---

## Pre-Validation

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/preval`

Sends a batch for account pre-validation to the beneficiary bank via RAAST.

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": {
    "DateTime": "20210830155620",
    "PaymentPurpose": "027",
    "RRN": "155620198520",
    "STAN": "198520",
    "Additional_data1": "PK36ASCM0000011001001141",
    "Additional_data2": "ACDESC_0011001001141"
  },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "SwapsId": "1234567820249687746871",
    "TotalTxns": 2,
    "BatchDetail": [
      {
        "TrackingId": "NBPB|PROFIT|0821|02|0001",
        "IBAN": "PK97BAHL0044009503097201",
        "Name": "Waqas Nizam",
        "IdType": "CNIC",
        "IdValue": "1234512345671",
        "Narration": "Salary Payment",
        "Amount": 25000,
        "Currency": "PKR",
        "STAN": "000012",
        "RRN": "155620000012",
        "reserver_field1": "",
        "reserver_field2": ""
      }
    ]
  }
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `SenderBic` | String(…16) | Yes | Sending institution BIC. Min 8, max 16 |
| `ReceiverBic` | String(…16) | Yes | Receiving institution BIC. Min 8, max 16 |
| **TransactionInfo** | | | |
| `DateTime` | String(14) | Yes | Format: `yyyyMMddHHmmss` |
| `PaymentPurpose` | String(3) | Yes | SBP purpose code |
| `RRN` | String(12) | Yes | Unique reference number |
| `STAN` | String(6) | Yes | System trace audit number |
| `Additional_data1` | String(…200) | No | IBAN of Debtor/Corporate account |
| `Additional_data2` | String(…200) | No | Title of Debtor/Corporate account |
| **BatchInformation** | | | |
| `BatchId` | String(30) | Yes | Unique batch ID. Min 24, max 30 |
| `SwapsId` | String(22) | No | SWAPS ID from SWAPS Inquiry response |
| `TotalTxns` | Integer | Yes | Number of transactions |
| **BatchDetail[]** | | | |
| `TrackingId` | String(30) | Yes | Record unique ID. Min 24, max 30 |
| `IBAN` | String(24) | Yes | Beneficiary IBAN |
| `Name` | String(40) | Yes | Beneficiary name |
| `IdType` | String(…15) | No | `CNIC`, `NICOP`, `POC`, `REGNUM`, `Passport`, `NTN` |
| `IdValue` | String(…30) | No | ID value |
| `Narration` | String(…140) | Yes | Transaction narration (max 140 chars) |
| `Amount` | Float | Yes | Transaction amount |
| `Currency` | String(3) | Yes | `PKR` |
| `STAN` | String(6) | Yes | Per-record STAN |
| `RRN` | String(12) | Yes | Per-record RRN |
| `reserver_field1` | String(…200) | No | Reserved |
| `reserver_field2` | String(…200) | No | Reserved |

### Response

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "Success"
  },
  "rrn": "155620198520",
  "stan": "198520"
}
```

:::note
Batch ID and Tracking ID must be the same for both pre-validation and payment requests.
:::

---

## Pre-Validation Reply

<span className="http-method method-post">POST</span> `<bank-disclosed-endpoint>`

OpenConnect calls this bank endpoint to deliver pre-validation results. Only **failed records** are included. If no records, the batch passed completely.

### Request Body (Failed Records)

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": {
    "DateTime": "20210830155620",
    "PaymentPurpose": "027",
    "RRN": "155620198520",
    "STAN": "198520",
    "Additional_data1": "",
    "Additional_data2": "",
    "SrcTransactionInfo": {
      "STAN": "155620198520",
      "RRN": "198520"
    }
  },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "TotalTxns": 2,
    "RejectedTxns": 1,
    "BatchDetail": [
      {
        "TrackingId": "NBPB|PROFIT|0821|02|0001",
        "IBAN": "PK97BAHL0044009503097201",
        "Name": "Waqas Nizam",
        "Narration": "Salary Payment",
        "Amount": 25000,
        "Currency": "PKR",
        "STAN": "000012",
        "RRN": "155620000012",
        "response_code": "01",
        "response_desc": "Invalid account number"
      }
    ]
  }
}
```

### Request Body (All Success)

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": { "..." : "..." },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "TotalTxns": 2,
    "RejectedTxns": 0
  }
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `SenderBic` | String(…16) | Yes | Echo back |
| `ReceiverBic` | String(…16) | Yes | Echo back |
| `DateTime` | String(14) | Yes | Original datetime (echo back) |
| `ResponseDateTime` | String(14) | Yes | Response datetime |
| `RRN` | String(12) | Yes | Original RRN |
| `STAN` | String(6) | Yes | Original STAN |
| `BatchId` | String(30) | Yes | Echo back |
| `TotalTxns` | Integer | Yes | Total transaction count |
| `RejectedTxns` | Integer | Yes | Failed transaction count |
| `response_code` | String(4) | Yes (per failed record) | Failure reason code |
| `response_desc` | String(…200) | Yes (per failed record) | Failure reason description |

---

## Batch Payment Request

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/payment`

Sends the payment batch to RAAST for credit posting. Only include records that passed pre-validation.

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": {
    "DateTime": "20210830155620",
    "PaymentPurpose": "027",
    "RRN": "155620198520",
    "STAN": "198520",
    "Additional_data1": "PK36ASCM0000011001001141",
    "Additional_data2": "ACDESC_0011001001141"
  },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "SwapsId": "1234567820249687746871",
    "TotalTxns": 2,
    "Debit": "0",
    "BatchDetail": [ { "...": "..." } ]
  }
}
```

### Additional Parameters (vs Pre-Validation)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Debit` | Integer | Yes | Fixed value: `0` |
| `SwapsId` | String(22) | No | SWAPS ID from SWAPS Inquiry |

All other fields are identical to [Pre-Validation](#pre-validation).

---

## Return Payment (PACS004) {#return-payment}

<span className="http-method method-post">POST</span> `<bank-disclosed-endpoint>`

OpenConnect sends this to the bank when a payment fails at the receiving bank.

:::warning Financial Decision
Only return/refund the corporate account upon receiving this PACS004 message — not based on E2E alone.
:::

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": {
    "DateTime": "20210830155620",
    "SrcTransactionInfo": { "STAN": "155620198520", "RRN": "198520" }
  },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "TotalTxns": 2,
    "RejectedTxns": 1,
    "BatchDetail": [
      {
        "TrackingId": "NBPB|PROFIT|0821|02|0001",
        "IBAN": "PK97BAHL0044009503097201",
        "Amount": 25000,
        "response_code": "03",
        "response_desc": "Payment failed due to credit block on beneficiary account"
      }
    ]
  }
}
```

---

## E2E Reconciliation

<span className="http-method method-post">POST</span> `<bank-disclosed-endpoint>`

OpenConnect sends the end-to-end reconciliation message once the receiving bank finalizes all batch transactions.

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": { "...": "..." },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "TotalTxns": 2,
    "RejectedTxns": 1,
    "Suspend": 0,
    "BatchDetail": [
      {
        "TrackingId": "NBPB|PROFIT|0821|02|0001",
        "IBAN": "PK97BAHL0044009503097222",
        "Amount": 25000,
        "status": "Processed"
      },
      {
        "TrackingId": "NBPB|PROFIT|0821|02|0002",
        "IBAN": "PK97BAHL0044009503097201",
        "Amount": 25000,
        "status": "Returned"
      }
    ]
  }
}
```

### Transaction Status Values

| Status | Description |
|--------|-------------|
| `Processed` | Successfully credited |
| `Returned` | Payment returned |
| `Suspended` | Transaction suspended |

:::info
E2E can arrive before PACS004. Do **not** make financial entries based on E2E alone. Mark batch as completed after E2E is received.
:::

---

## Transaction Inquiry

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/paymentinquiry`

Query the status of a payment batch or individual transaction.

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "BatchId": "NBPB|PROFIT|0821|02",
  "BatchDateTime": "20210829155620",
  "DateTime": "20210830155620",
  "TrackingId": "",
  "RRN": "155620198520",
  "STAN": "198520"
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `SenderBic` | String(…16) | Yes | Sending institution BIC |
| `ReceiverBic` | String(…16) | Yes | Receiving institution BIC |
| `BatchId` | String(30) | Conditional | Required if `TrackingId` is blank |
| `BatchDateTime` | String(14) | Yes | Batch initiation datetime |
| `DateTime` | String(14) | Yes | Request datetime |
| `TrackingId` | String(30) | Conditional | Required if `BatchId` is blank |
| `RRN` | String(12) | Yes | Reference number |
| `STAN` | String(6) | Yes | System trace audit number |

### Response

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS",
    "RRN": "985632985632",
    "STAN": "985632",
    "replyInstructions": [
      {
        "batchInitiator": "HHHHAAXX",
        "batchId": "98765131",
        "valueDate": "2020-03-10",
        "instructions": [
          {
            "instructionId": "1231564981334",
            "reportedStatus": {
              "name": "Processed",
              "modificationDateTime": "2020-03-10T10:22:28Z"
            }
          }
        ]
      }
    ]
  }
}
```

:::note
Transaction inquiry is only for **payment batches**. Pre-validation has no inquiry endpoint — use Prevalidation Inquiry instead.
:::

---

## Prevalidation Inquiry

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/prevalinquiry`

Check pre-validation status. If execution time exceeds 30 minutes, the RAAST service will trigger the channel's status reply endpoint.

### Request Body

```json
{
  "ReceiverBic": "BAHLPKKA",
  "BatchId": "NBPB|PROFIT|0822|002026565",
  "DateTime": "2024-08-23",
  "RRN": "117450325020",
  "STAN": "123456"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ReceiverBic` | String(…16) | Yes | Receiving institution BIC |
| `BatchId` | String(30) | Conditional | Required if TrackingId blank |
| `DateTime` | String(10) | Yes | Format: `yyyy-MM-dd` |
| `RRN` | String(12) | Yes | Reference number |
| `STAN` | String(6) | Yes | Trace number |

### Response Codes

| Code | Description | Action |
|------|-------------|--------|
| `00` | Success | Continue to hit if time < 30 min |
| `306` | Batch not found | Mark batch as failed — did not reach RAAST |

:::warning
If `response_code = "306"`, mark the batch as **failed**. For any other code, continue polling.
:::

---

## Transaction Inquiry V2

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/paymentinquiryV2`

Enhanced payment inquiry with SBP Federated Call integration. Checks for existing E2E reply before calling SBP.

### Request Body
Same as [Prevalidation Inquiry](#prevalidation-inquiry).

### Response Codes

| Code | Description | Action |
|------|-------------|--------|
| `00` | Success — E2E will be delivered to status reply endpoint | — |
| `306` | Batch not found | Mark batch as failed |
| `101` | Endpoint service not available | Hit Transaction Inquiry again |
| `102` | Invalid response from endpoint | Hit Transaction Inquiry again |

---

## SWAPS Inquiry

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/swaps/inquiry`

Fetches transaction details against a SWAPS ID issued by FBR (for tax-related payments).

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "RRN": "155620198520",
  "STAN": "198520",
  "SwapsId": "1234567820249687746871",
  "PaymentMode": "Internet Banking"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `SwapsId` | String(22) | Yes | SWAPS ID from FBR portal |
| `PaymentMode` | String(…16) | Yes | `Internet Banking`, `Mobile App`, `ATM`, `Over the Counter` |

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "Success" },
  "swap_inquiry": {
    "result": {
      "swapsId": "1234567820243343999162",
      "swap_Agent_NTN": "1234567",
      "agent_Name": "Test Business 44",
      "total_Transactions": 1,
      "detail": [
        {
          "swap_Transaction_Id": 281,
          "identificationType": "CNIC",
          "identificationNo": "1000000000001",
          "receiver_IBAN": "PK53HABB0018537901579103",
          "receiverAmount": 13.6,
          "taxDetails": [
            {
              "tax_Settlement_Account": "FBRSPKKA",
              "tax_Amount": 1.4
            }
          ]
        }
      ]
    }
  }
}
```

---

## Batch Status to SWAPS

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/swaps/batchstatus`

Submits the payment batch outcome back to SWAPS/FBR.

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "RRN": "155620198520",
  "STAN": "198520",
  "SwapsBatchInfo": {
    "SwapsId": "1234567820243343999162",
    "TotalAmountPaid": 13.6,
    "TotalTaxPaid": 21.4,
    "PaidTransactionsCount": 1,
    "FailedTransactionsCount": 0,
    "BankCode": "",
    "PaymentMode": "Internet Banking",
    "PaymentDate": "2024-10-02T06:47:59.772Z",
    "PaidTransactions": [
      {
        "SwapTranactionId": 281,
        "Amount": 13.6,
        "BankReferenceNo": "",
        "TaxDetails": [
          {
            "TaxSettlementAccount": "FBRSPKKA",
            "TaxAmount": 1.4,
            "TaxPaymentDate": "2024-10-02T06:47:59.773Z",
            "TaxRtgsRefNo": ""
          }
        ]
      }
    ],
    "FailedTransactions": []
  }
}
```

---

## Tax Batch Payment Request

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/bulksending/tax/payment`

Initiates tax payment batch to FBR settlement account. `PaymentPurpose` must be `045`.

### Request Body

```json
{
  "SenderBic": "NBPBPKKA",
  "ReceiverBic": "BAHLPKKA",
  "TransactionInfo": {
    "DateTime": "20210830155620",
    "PaymentPurpose": "045",
    "RRN": "155620198520",
    "STAN": "198520"
  },
  "BatchInformation": {
    "BatchId": "NBPB|PROFIT|0821|02",
    "TotalTxns": 1,
    "BatchDetail": [
      {
        "SwapTransactionId": 281,
        "OriginalPaymentBatchId": "NBPB|TAX|0821|02",
        "DebtorIBAN": "PK97BAHL0044009503097201",
        "DebtorName": "Waqas Nizam",
        "SwapsId": "1234567820249687746871",
        "CreditorIBAN": "PK97BAHL0044009503097201",
        "Narration": "Tax Payment",
        "Amount": 25000,
        "Currency": "PKR",
        "TaxSettlementAccount": "FBRSPKKA",
        "STAN": "000012",
        "RRN": "155620000012"
      }
    ]
  }
}
```

---

## Tax Batch Payment Reply

<span className="http-method method-post">POST</span> `<bank-disclosed-endpoint>`

OpenConnect calls this bank endpoint with the SBP response for the tax batch.

### Request Body

```json
{
  "SbpResponseCode": "ACS",
  "SbpResponseDesc": "SUCCESS",
  "TaxRtgsRefNo": "",
  "BatchId": "NBPB|TAX|0821|02",
  "RRN": "155620198520",
  "STAN": "198520",
  "SwapsId": "1234567820249687746871"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `SbpResponseCode` | String(…6) | Yes | SBP response code |
| `SbpResponseDesc` | String(…200) | Yes | SBP response description |
| `TaxRtgsRefNo` | String(…50) | No | RTGS Reference from SBP |
| `BatchId` | String(30) | Yes | Original batch ID |
| `SwapsId` | String(22) | Yes | Original SWAPS ID |
