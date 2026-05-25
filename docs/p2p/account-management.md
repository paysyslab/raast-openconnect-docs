---
id: account-management
title: Account Management
sidebar_position: 4
---

# P2P — Account Management

---

## Define Default Account for Alias

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/alias/defaultaccount/set`

Sets a specific IBAN as the default account for an alias.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "alias": { "type": "MOBILE", "value": "03001234567" },
  "account": { "id": { "iban": "PK26AIIN1234567890000056" } },
  "rrn": "000000000050",
  "stan": "000050"
}
```

---

## Delete Account

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/accounts/delete`

Removes an account from CAS (delinks from all aliases).

---

## Link Account to Alias

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/accounts/link`

Links an IBAN to an existing alias.

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
  "rrn": "000000000051",
  "stan": "000051"
}
```

---

## Unlink Account from Alias

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/accounts/unlink`

Removes the association between an IBAN and an alias.

---

## Register Accounts

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/accounts/register`

Registers a new account in CAS and optionally links it to an existing alias.

### Request Body

```json
{
  "uid": { "type": "CNIC", "value": "1234567890125" },
  "aliases": [
    {
      "type": "MOBILE",
      "value": "03001234567",
      "accounts": [
        {
          "id": { "iban": "PK26AIIN1234567890000056" },
          "currency": "PKR",
          "isDefault": true
        }
      ]
    }
  ],
  "rrn": "000000000052",
  "stan": "000052"
}
```
