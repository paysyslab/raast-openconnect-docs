---
id: inquiry-apis
title: Inquiry APIs
sidebar_position: 6
---

# P2P — Inquiry APIs

---

## Get Institutions List

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/banklist`

Returns the list of all RAAST participant banks with their BIC codes.

### Response

```json
{
  "response": {
    "response_code": "00",
    "response_desc": "SUCCESS",
    "participants": [
      { "bic": "ABPAPKKA", "participant_name": "Allied Bank Limited" },
      { "bic": "ALFHPKKA", "participant_name": "Bank Alfalah Limited" },
      { "bic": "ASCMPKKA", "participant_name": "Askari Bank Limited" },
      { "bic": "BAHLPKKA", "participant_name": "Bank Al Habib Limited" },
      { "bic": "UNILPKKARTG", "participant_name": "United Bank Limited" }
    ]
  },
  "rrn": "001013342715",
  "stan": "342715"
}
```

---

## Title Fetch

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/titlefetch`

Used when CAS is unavailable or IBAN is known. Directly queries the account-holding bank for account title and type.

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

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `memberid` | String(24) | Yes | Receiving participant BIC |
| `iban` | String(24) | Yes | Customer IBAN |
| `idType` | String(32) | No | Customer ID type |
| `idValue` | String(64) | No | Customer ID value |
| `amount` | Float | Yes | Transaction amount |
| `rrn` | String | Yes | 12-digit unique reference |
| `stan` | String | Yes | System trace audit number |

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

---

## Get Default Account by Alias

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/defaultaccount`

Resolves the default IBAN linked to a customer's CAS alias.

### Request Body

```json
{
  "type": "MOBILE",
  "value": "03001234567",
  "rrn": "000000000001",
  "stan": "000001"
}
```

### Response

```json
{
  "response": { "response_code": "00", "response_desc": "SUCCESS" },
  "accounts": [
    {
      "id": { "iban": "PK26AIIN1234567890000056" },
      "currency": "PKR",
      "isDefault": true
    }
  ]
}
```

---

## Get Customer Aliases & Accounts

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/customers/aliasaccounts`

Returns all aliases and linked accounts for a customer.

### Request Parameters (Query String)

| Field | Required | Description |
|-------|----------|-------------|
| `uid_type` | Yes | Customer UID type (e.g., `CNIC`) |
| `uid_value` | Yes | Customer UID value |

---

## Get Customer Info

<span className="http-method method-get">GET</span> `/api/v1/paysyslabs/customers/info`

Returns customer profile from CAS.

---

## API Models

### MPGID Object

```json
{ "type": "CNIC", "value": "1234567890125" }
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | String(32) | Yes | UID type |
| `value` | String(64) | Yes | UID value |

### Aliases Object

```json
{
  "type": "MOBILE",
  "value": "03001234567",
  "status": "active",
  "accounts": [
    {
      "id": { "iban": "PK26AIIN1234567890000056" },
      "currency": "PKR",
      "isDefault": true
    }
  ]
}
```

| Alias Type | Format |
|------------|--------|
| `CNIC` | 13 digits |
| `MOBILE` | 11 digits |
| `EMAIL` | Valid email |
| `TXT` | Free text |

### Alias Status Values

| Status | Description |
|--------|-------------|
| `active` | Alias is active |
| `suspended` | Alias is suspended |
| `inactive` | Alias is inactive |
| `deleted` | Alias is deleted |

### Participants List

```json
{
  "participants": [
    { "bic": "FAYSPKKA", "participant_name": "Faysal" },
    { "bic": "SONEPKKA", "participant_name": "Soneri" }
  ]
}
```
