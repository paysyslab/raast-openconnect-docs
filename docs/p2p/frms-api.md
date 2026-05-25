---
id: frms-api
title: FRMS API
sidebar_position: 9
---

# P2P — FRMS API Specification

> FRMS = Fraud Risk Management System

---

## FRMS Hybrid Incremental Fetch Strategy (Post-Facto API)

This API implements an incremental fetch strategy for FRMS integration. It provides historical transaction data in hybrid batches for fraud analysis and monitoring.

### Purpose

- Allows the bank's FRMS system to fetch transaction records incrementally
- Supports post-facto fraud analysis without impacting real-time payment processing
- Provides enriched transaction data for risk scoring

### Endpoint

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/frms/fetch`

### Request Body

```json
{
  "fromDateTime": "2024-01-01T00:00:00",
  "toDateTime": "2024-01-01T23:59:59",
  "pageSize": 100,
  "pageNumber": 1,
  "rrn": "000000000070",
  "stan": "000070"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fromDateTime` | String | Yes | Start of fetch window (`yyyy-MM-ddTHH:mm:ss`) |
| `toDateTime` | String | Yes | End of fetch window |
| `pageSize` | Integer | Yes | Records per page |
| `pageNumber` | Integer | Yes | Page number (1-based) |
| `rrn` | String(12) | Yes | Reference number |
| `stan` | String(6) | Yes | Trace number |

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "totalRecords": 250,
  "pageSize": 100,
  "pageNumber": 1,
  "transactions": [
    {
      "correlationId": "axxansayyysaii965sa2asasannsas",
      "senderIban": "PK56AIIN1234567890000001",
      "receiverIban": "PK56AIIN1234567890000999",
      "amount": 5600.00,
      "currency": "PKR",
      "status": "SUCCESS",
      "transactionDateTime": "2024-01-01T10:22:28Z",
      "ttc": "001",
      "paymentPurpose": "001"
    }
  ]
}
```
