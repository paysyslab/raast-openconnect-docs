---
id: limits-api
title: Limits APIs
sidebar_position: 7
---

# P2P — Limits APIs

---

## Get Limit

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/limits`

Retrieves the configured transaction limits for a channel or customer.

### Request Parameters (Query String)

| Parameter | Required | Description |
|-----------|----------|-------------|
| `channel` | Yes | Channel identifier |
| `uid_type` | No | Customer UID type |
| `uid_value` | No | Customer UID value |

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "limits": {
    "perTransactionLimit": 500000,
    "dailyTransactionLimit": 2000000,
    "dailyTransactionCount": 50
  }
}
```

---

## Set Limit

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/limits/set`

Configures transaction limits for a customer or channel.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "limits": {
    "perTransactionLimit": 250000,
    "dailyTransactionLimit": 1000000,
    "dailyTransactionCount": 25
  },
  "rrn": "000000000060",
  "stan": "000060"
}
```

---

## Limit Error Codes

| Code | Description |
|------|-------------|
| `110` | Multiple default profile exists |
| `111` | No default profile exists |
| `112` | Limit exceeded |
| `113` | Channel not found |
| `114` | Invalid profile configuration |
| `115` | Transaction count exceeded |
| `116` | Per transaction limit exceeded |
| `117` | No limit configuration found for customer |
| `119` | Invalid participant |
| `120` | No configuration found for all channel and participant |
| `121` | Invalid limit type |
