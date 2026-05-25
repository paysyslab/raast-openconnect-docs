---
id: channel-integration
title: Channel Integration Messages
sidebar_position: 3
---

# PISP — Channel Integration Messages

These APIs are **exposed by OpenConnect** and called by the **bank channel**.

All require `Authorization: Bearer <token>` — use the KeyCloak token from `/realms/paysys-raast-realm/protocol/openid-connect/token`.

---

## Customer Consent Notification Status {#consent-status}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/pisp/consent/status`

The bank channel calls this after the customer approves or rejects a consent request.

### Request Body

```json
{
  "status": "00",
  "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "accounts": ["PKABPKA80299910920312", "PKABPKA80299910920313"],
  "senderParticipantCode": "HABLPKKA",
  "info": {
    "rrn": "112233445566",
    "stan": "010123"
  }
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | String(6) | Yes | `00` = Approved, `01` = Rejected/Declined |
| `consentId` | String(36) | Yes | ConsentID from `GetAuthorization` call |
| `accounts` | Array(24) | Yes | List of approved/rejected account IBANs |
| `senderParticipantCode` | String(11) | Yes | Sender participant BIC |
| `info.rrn` | String(12) | Yes | 12-digit RRN |
| `info.stan` | String(6) | Yes | Last 6 digits of RRN |

### Response

```json
{
  "responseCode": "00",
  "responseDesc": "SUCCESS"
}
```

---

## Get Consent Authorization Details {#consent-details}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/pisp/consentDetails`

Channel calls this to **fetch pending consent details** for a customer (Pull Flow). Used when the customer navigates to the PISP section in the app.

### Request Body

```json
{
  "info": {
    "rrn": "112233445566",
    "stan": "010123"
  },
  "idType": "mobile",
  "idValue": "03001234567"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `idType` | String(10) | Yes | `mobile` |
| `idValue` | String(24) | Yes | 11-digit customer mobile number |
| `info.rrn` | String(12) | Yes | 12-digit RRN |
| `info.stan` | String(6) | Yes | Last 6 digits of RRN |

### Response (Success)

```json
{
  "responseCode": "00",
  "responseDesc": "SUCCESS",
  "accounts": [
    {
      "account": "PKABPKA80299910920312",
      "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
      "scopes": ["inquiry", "account_transfer", "bill_payment"],
      "accountTitle": "Muhammad Waqas",
      "status": "APPROVED",
      "senderParticipantCode": "HABLPKKA",
      "issuedDateTime": "20241106120149",
      "approvedDateTime": "20241106120149"
    },
    {
      "account": "PKABPKA80299910920313",
      "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
      "scopes": ["inquiry", "account_transfer"],
      "accountTitle": "Muhammad Waqas",
      "status": "ISSUED",
      "senderParticipantCode": "HABLPKKA",
      "issuedDateTime": "20241106120149",
      "approvedDateTime": ""
    }
  ],
  "receiverParticipantCode": "ABPAPKKA"
}
```

### Consent Status Values

| Status | Description |
|--------|-------------|
| `APPROVED` | Customer has approved the consent |
| `ISSUED` | Consent issued, awaiting customer action |
| `REJECTED` | Customer rejected the consent |
| `REVOKED` | Consent was revoked |

---

## Customer Consent Revocation {#consent-revocation}

<span className="http-method method-post">POST</span> `/api/v1/paysyslabs/pisp/consentRevoked`

Channel calls this when the customer wants to **revoke an existing consent**. OC will revoke it in the system and notify SBP/PISP acquirer.

:::info
Revoking one consent revokes **all IBANs linked to that consentID**, as per CMA document.
:::

### Request Body

```json
{
  "info": {
    "rrn": "112233445566",
    "stan": "010123"
  },
  "consentId": "d01b5fd6-8276-4f88-b672-cb1040245caa",
  "senderParticipantCode": "HABLPKKA"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `consentId` | String(36) | Yes | RAAST consent ID to revoke |
| `senderParticipantCode` | String(11) | Yes | Sender bank BIC |
| `info.rrn` | String(12) | Yes | 12-digit RRN |
| `info.stan` | String(6) | Yes | Last 6 digits of RRN |

### Response

```json
{
  "responseCode": "00",
  "responseDesc": "SUCCESS"
}
```

### Failure Response

```json
{
  "responseCode": "99",
  "responseDesc": "No details found"
}
```

---

## Consent Scopes

| Scope | Description |
|-------|-------------|
| `inquiry` | Allow balance/transaction inquiry |
| `account_transfer` | Allow fund transfers |
| `bill_payment` | Allow bill payments |
