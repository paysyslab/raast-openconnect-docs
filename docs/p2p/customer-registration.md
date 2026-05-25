---
id: customer-registration
title: Customer Registration
sidebar_position: 2
---

# P2P — Customer Registration

---

## One-Step Registration

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/one-step`

Registers a new customer in CAS along with their alias and account in a single call.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "4230146389021" },
  "documentType": "CNIC",
  "documentNumber": "4230146389021",
  "name": "ANIL",
  "surname": "KUMAR",
  "gender": "MALE",
  "birthDate": "1987-01-28",
  "rrn": "000000000005",
  "stan": "000005",
  "startDate": "2021-05-15",
  "expirationDate": "2025-05-15",
  "aliases": [
    {
      "type": "MOBILE",
      "value": "03222507423",
      "status": "active",
      "accounts": [
        {
          "id": { "iban": "PK79NBPA0002004137343952" },
          "currency": "PKR",
          "isDefault": true
        }
      ]
    }
  ]
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `uid.type` | String(35) | Yes | `CNIC`, `NICOP`, `POC`, `REG_NO`, `NTN` |
| `uid.value` | String(64) | Yes | Customer UID value |
| `documentType` | String(35) | Yes | For individuals: `CNIC`, `NICOP`, `POC`. For non-individuals: `REG_NO`, `NTN` |
| `documentNumber` | String(80) | Yes | Customer's document number |
| `name` | String(140) | Yes | First name |
| `surname` | String(80) | Yes | Surname |
| `gender` | String | Yes | `MALE`, `FEMA` (female), `TRNS` (transgender) |
| `birthDate` | String | Yes | Format: `yyyy-MM-dd` |
| `rrn` | String | Yes | 12-digit unique reference number |
| `stan` | String | Yes | System trace audit number |
| `startDate` | String | No | `yyyy-mm-dd` |
| `expirationDate` | String | No | `yyyy-mm-dd` |
| `aliases` | Array | Yes | List of aliases with accounts |
| `aliases[].type` | String | — | `MOBILE`, `CNIC`, `EMAIL`, `TXT` |
| `aliases[].status` | String | — | `active` |
| `accounts[].isDefault` | Boolean | Yes | True if this is the default account for the alias |

### Response (Success)

```json
{
  "response": {
    "response_code": "00",
    "one-step-customers": {
      "documentValidityDate": "2030-07-25",
      "gender": "MALE",
      "documentType": "CNIC",
      "documentNumber": "4230146389999",
      "nickName": "ANIL",
      "aliases_wrapper": [
        {
          "recordId": "449",
          "type": "MOBILE",
          "accounts_wrapper": [
            {
              "recordId": "335",
              "isDefault": "true",
              "servicer": { "memberId": "NBPBPKKA" },
              "currency": "PKR",
              "id": { "iban": "PK79NBPA0002004137349999" },
              "type": "DFLT"
            }
          ],
          "value": "03222507444",
          "status": "active"
        }
      ],
      "birthDate": "1987-01-28",
      "recordId": "367",
      "uid": { "type": "CNIC", "value": "4230146389999" },
      "surname": "KUMAR",
      "name": "ANIL",
      "status": "active"
    },
    "response_desc": "SUCCESS"
  },
  "stan": "000005",
  "rrn": "000000000005"
}
```

---

## Customer Registration

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/registerCustomer`

Registers only the customer profile (no alias/account in same call).

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "documentType": "CNIC",
  "documentNumber": "1234567890125",
  "name": "Name",
  "surname": "Surname",
  "gender": "MALE",
  "birthDate": "1990-01-01",
  "rrn": "000000000010",
  "stan": "000010"
}
```

---

## Register CAA

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/registerCaa`

Registers a CAA (Customer Account Alias) after customer registration. Links an IBAN to an alias.

---

## Sync Customer

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/syncCustomer`

Syncs existing customer data with CAS. Used when customer information needs to be updated in RAAST.

---

## Change Customer Status

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/status`

Updates the status of a registered customer (e.g., suspend, reactivate).

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "status": "suspended",
  "rrn": "000000000020",
  "stan": "000020"
}
```

| Status | Description |
|--------|-------------|
| `active` | Customer active |
| `suspended` | Customer temporarily suspended |
| `inactive` | Customer inactive |

---

## Update Customer Information

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/update`

Updates customer profile details (name, document info).

---

## Un-Register Customer (One-Step Delete)

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/customers/delete`

Removes the customer relationship — deregisters customer along with all linked aliases and accounts from CAS.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "rrn": "000000000030",
  "stan": "000030"
}
```
