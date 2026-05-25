---
id: index
title: PISP Overview
sidebar_label: Overview
sidebar_position: 1
---

# PISP — Payment Initiation Service Provider <span className="version-badge">v1.9</span>

> **TSD Reference:** PSL Ref. IS-ITS-1222-04 | Version 1.9 | Last Modified: 10th March 2026

PISP enables **third-party applications** to initiate payments on behalf of customers with their **explicit consent**. The bank acts as the Payer Financial Institution (FI), verifying and honoring consent records.

---

## Glossary

| Term | Description | Owner |
|------|-------------|-------|
| OC | Open Connect | Paysys Labs |
| PISP | Payment Initiation Service Provider | SBP |
| CAS | Central Addressing Scheme | SBP |
| CBS / Host | Core Banking System | Bank |
| Channel | Mobile App, Internet Banking, OTC | Bank |

---

## About PISP

The PISP flow requires:
1. **Explicit customer consent** for the PISP to initiate payments
2. Consent management: issuance and revocation
3. Two authentication methods: **Web** and **OTP (One-Time Password)**

FIDO (Fast Identity Online) is used in some consent flows — all FIDO references imply **FIDO 2**.

---

## Solution Architecture

```
PISP Acquirer App
    │
    │ [Consent Request]
    ▼
SBP (RAAST)
    │
    │ Consent notification
    ▼
OpenConnect
    │
    ├─ GetCustomerDetails ──────────────────► Bank CBS
    ├─ SendOTP ─────────────────────────────► Bank Channel
    ├─ GetAuthorization ────────────────────► Bank Channel
    │
    ▼
Bank Channel (Mobile App)
    │
    │ Customer approves/rejects consent
    ▼
OpenConnect ◄── [ConsentStatus] ── Bank Channel
    │
    │ [Consent confirmation]
    ▼
SBP (RAAST)
```

---

## Consent Flow Overview

### Method 1 — Push Notification Flow

1. OC receives consent request from SBP
2. OC calls `GetAuthorization` to push consent to bank channel
3. Customer approves/rejects on mobile app
4. Channel calls `CustomerConsentNotificationStatus` to OC

### Method 2 — Pull Flow

1. Customer logs in to mobile app and opens PISP section
2. Channel calls `GetConsentDetails` to fetch pending consents
3. Customer approves/rejects
4. Channel calls `CustomerConsentNotificationStatus` to OC

---

## Authentication

PISP uses **KeyCloak (Version 2)** authentication exclusively.

**Token Endpoint:** `POST /realms/paysys-raast-realm/protocol/openid-connect/token`

See [Authentication](/authentication#version-2) for details.

---

## API Summary

### OC-Initiated (OC → Bank Channel)

| API | Description |
|-----|-------------|
| [Get Access Token](/pisp/oc-initiated#get-access-token) | OC obtains token from bank channel |
| [GetCustomerDetails](/pisp/oc-initiated#get-customer-details) | Validate customer exists at bank |
| [SendOTP](/pisp/oc-initiated#send-otp) | Send OTP to customer for consent |
| [GetAuthorization](/pisp/oc-initiated#get-authorization) | Push consent to bank channel |
| [GetAuthorization V2](/pisp/oc-initiated#get-authorization-v2) | V2 with consent expiry support |
| [NotifyConsentRevocation](/pisp/oc-initiated#notify-revocation) | Notify channel when consent is revoked |

### Channel Integration (Bank Channel → OC)

| API | Method | Endpoint |
|-----|--------|----------|
| [Customer Consent Status](/pisp/channel-integration#consent-status) | POST | `/api/v1/paysyslabs/pisp/consent/status` |
| [Get Consent Details](/pisp/channel-integration#consent-details) | POST | `/api/v1/paysyslabs/pisp/consentDetails` |
| [Consent Revocation](/pisp/channel-integration#consent-revocation) | POST | `/api/v1/paysyslabs/pisp/consentRevoked` |
