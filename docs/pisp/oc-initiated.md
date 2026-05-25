---
id: oc-initiated
title: OC Initiated Messages
sidebar_position: 2
---

# PISP — OC Initiated Messages

These are APIs that **OpenConnect calls on the bank's channel/CBS**.

---

## Get Access Token {#get-access-token}

OC obtains a token from the bank channel before calling channel APIs.

**Method:** `POST`  
**URL:** `TBD (provided by bank)`  
**Content-Type:** `application/x-www-form-urlencoded`

### Request Body

```
grant_type=password&username=NRBLNPKAXOM1&password=qwerty
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `grant_type` | String | Yes | `password` |
| `username` | String | Yes | Channel username |
| `password` | String | Yes | Channel password |

### Response (Success)

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJSUzI1NiJ9...",
  "refresh_expires_in": 86400
}
```

---

## GetCustomerDetails {#get-customer-details}

OC calls this to verify the customer exists at the bank and retrieve their accounts.

**Method:** `POST`  
**URL:** `TBD`

### Request Body

```json
{
  "idType": "CNIC",
  "idValue": "4130334100824",
  "consentRequestID": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "rrn": "112233445566"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `idType` | String(10) | Yes | `CNIC` |
| `idValue` | String(24) | Yes | CNIC (13 digits), NTN (7 digits), or IBAN (24 chars) |
| `consentRequestID` | String(36) | Yes | RAAST-generated UUID |
| `rrn` | String(12) | Yes | 12-digit RRN (format: YDDD-HH-STAN) |

### Response (Success)

```json
{
  "responseCode": "00",
  "responseDesc": "SUCCESS",
  "customerData": {
    "name": "RAHIM",
    "mobileNo": "03478432617",
    "accounts": [
      {
        "title": "RAHIM NOUSHAD",
        "accountNo": "PKABPKA80299910920312"
      }
    ]
  }
}
```

---

## SendOTP {#send-otp}

OC calls this to send an OTP to the customer's mobile number for consent authentication.

**Method:** `POST`  
**URL:** `TBD`

### Request Body

```json
{
  "otp": "294839",
  "participantCode": "ABPAPKKA",
  "consentRequestID": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "rrn": "112233445566",
  "mobileNo": "03478345718"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `otp` | String(6) | Yes | Generated OTP value |
| `participantCode` | String(11) | Yes | Source participant code |
| `consentRequestID` | String(36) | Yes | RAAST-generated UUID |
| `rrn` | String(12) | Yes | 12-digit RRN |
| `mobileNo` | String(11) | Yes | Customer mobile number |

---

## GetAuthorization {#get-authorization}

OC calls this to push consent details to the bank channel as a push notification.

**Method:** `POST`  
**URL:** `TBD`

### Request Body

```json
{
  "accounts": ["PKABPKA80299910920312"],
  "receiverParticipantCode": "ABPAPKKA",
  "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "rrn": "112233445566",
  "senderParticipantCode": "HABLPKKA"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `accounts` | Array | Yes | List of account IBANs |
| `receiverParticipantCode` | String(8) | Yes | Receiver bank BIC |
| `consentId` | String(36) | Yes | RAAST-generated consent ID |
| `rrn` | String(12) | Yes | 12-digit RRN |
| `senderParticipantCode` | String(11) | Yes | Sender bank BIC |

---

## GetAuthorization V2 {#get-authorization-v2}

Enhanced version of GetAuthorization that includes **consent expiry** per account.

**Method:** `POST`  
**URL:** `TBD`

### Request Body

```json
{
  "accounts": [
    {
      "iban": "PKABPKA80299910920312",
      "consentExpiration": "2025-12-31T23:59:59Z"
    },
    {
      "iban": "PK29HABL000000123456789",
      "consentExpiration": "2025-12-31T23:59:59Z"
    }
  ],
  "receiverParticipantCode": "ABPAPKKA",
  "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "rrn": "112233445566",
  "senderParticipantCode": "HABLPKKA",
  "reserveField1": "",
  "reserveField2": "",
  "reserveField3": "",
  "reserveField4": "",
  "reserveField5": ""
}
```

### Additional Parameters (vs V1)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `consentExpiration` | String(25) | No | Consent expiry date and time per account |
| `reserveField1–5` | String(100) | No | Reserved for future use |

---

## Notify Channel For Consent Revocation {#notify-revocation}

OC calls this to notify the bank channel when a consent is **revoked by the PISP acquirer**.

:::info
Once a consent is revoked, **all associated IBANs linked to the consentID** are also revoked.
:::

**Method:** `POST`  
**URL:** `TBD`

### Request Body

```json
{
  "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "rrn": "112233445566",
  "revokedAt": "2022-06-20T13:00:00.000",
  "status": "REVOKED"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `consentId` | String(36) | Yes | RAAST consent ID |
| `rrn` | String(12) | Yes | 12-digit RRN |
| `revokedAt` | String(25) | Yes | Revocation datetime |
| `status` | String(10) | Yes | `REVOKED` |
