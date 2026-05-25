---
id: inquiry-apis
title: Inquiry APIs
sidebar_position: 2
---

# Remittance — Inquiry APIs

---

## Get Institutions List {#institutions-list}

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/banklist`

Returns the list of all RAAST participant institutions with their BIC codes.

### Request

**Headers:**

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |

No request body required.

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS",
    "participants": [
      {
        "bic": "ABPAPKKA",
        "participant_name": "Allied Bank Limited"
      },
      {
        "bic": "ALFHPKKA",
        "participant_name": "Bank Alfalah Limited"
      },
      {
        "bic": "ASCMPKKA",
        "participant_name": "Askari Bank Limited"
      },
      {
        "bic": "BAHLPKKA",
        "participant_name": "Bank Al Habib Limited"
      },
      {
        "bic": "UNILPKKARTG",
        "participant_name": "United Bank Limited"
      }
    ]
  },
  "rrn": "001013342715",
  "stan": "342715"
}
```

### Response Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `response_code` | String | Yes | Response code |
| `response_desc` | String | Yes | Response description |
| `rrn` | String | Yes | Echo back |
| `stan` | String | Yes | Echo back |
| `participants` | Array | Yes | Bank code list assigned by MPG |
| `participants[].bic` | String(11) | Yes | BIC of participant |
| `participants[].participant_name` | String(40) | Yes | Participant name |

---

## Title Fetch {#title-fetch}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/titlefetch`

Used when CAS cannot be used for retrieving customer information. Queries the receiving institution directly for account title and type using an IBAN.

### Request

**Headers:**

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |
| `Content-Type` | `application/json` |

### Request Body

```json
{
  "memberid": "SONEPKKA",
  "iban": "PK13SONE0001201021813320",
  "idType": "CNIC",
  "idValue": "",
  "amount": 15420.2,
  "rrn": "012365012365",
  "stan": "012365"
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `memberid` | String(24) | Yes | Receiving participant BIC |
| `iban` | String(24) | Yes | Customer account in IBAN format |
| `idType` | String(32) | No | Type of customer ID |
| `idValue` | String(64) | No | Value of customer ID |
| `amount` | Float | Yes | Transaction amount |
| `rrn` | String(12) | Yes | 12-digit unique reference number |
| `stan` | String(6) | Yes | System trace audit number |

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "account-information": {
      "acctitle": "Waqas Nizam",
      "acctype": "Account"
    },
    "response_desc": "SUCCESS",
    "fee": 0
  },
  "stan": "012012",
  "rrn": "012012012012"
}
```

### Response (Failure)

```json
{
  "response": {
    "response_code": "01",
    "response_desc": "Invalid Request"
  },
  "stan": "000010",
  "rrn": "000000000010"
}
```

### Response Parameters

| Field | Type | Description |
|-------|------|-------------|
| `response_code` | String | `00` = Success, see [Response Codes](/remittance/response-codes) |
| `response_desc` | String | Human-readable description |
| `account-information.acctitle` | String | Account holder name |
| `account-information.acctype` | String | `Account` or `Wallet` |
| `fee` | Float | Fee (currently 0) |
| `rrn` | String | Echo back |
| `stan` | String | Echo back |
