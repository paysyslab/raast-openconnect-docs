---
id: alias-management
title: Alias Management
sidebar_position: 3
---

# P2P — Alias Management

Alias management allows customers to associate payment identifiers (CNIC, mobile, email) with their accounts. All alias operations sync with SBP CAS.

---

## Change Alias Status

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/status`

Suspends, activates, or deactivates an alias.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "alias": { "type": "MOBILE", "value": "03001234567" },
  "status": "suspended",
  "rrn": "000000000040",
  "stan": "000040"
}
```

---

## Update Alias

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/update`

Updates an alias value (e.g., change mobile number linked to CAS).

---

## Link Alias to Account

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/link`

Links an existing alias to an IBAN account.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "alias": { "type": "MOBILE", "value": "03001234567" },
  "account": {
    "id": { "iban": "PK26AIIN1234567890000056" },
    "currency": "PKR",
    "isDefault": false
  },
  "rrn": "000000000041",
  "stan": "000041"
}
```

---

## Unlink Alias from Account

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/unlink`

Removes the link between an alias and an IBAN.

---

## Register Alias

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/register`

Registers a new alias for an existing customer in CAS.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "alias": {
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
  },
  "rrn": "000000000042",
  "stan": "000042"
}
```

---

## Update Alias Validity Date

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/validitydate`

Updates the start or expiry date for an alias.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "alias": { "type": "MOBILE", "value": "03001234567" },
  "startDate": "2024-01-01",
  "expirationDate": "2025-12-31",
  "rrn": "000000000043",
  "stan": "000043"
}
```
