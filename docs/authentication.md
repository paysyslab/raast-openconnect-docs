---
id: authentication
title: Authentication
sidebar_position: 3
---

# Authentication

OpenConnect supports two authentication versions. All APIs require a valid **Bearer JWT token** passed in the `Authorization` header.

---

## Version 1 — Proprietary Token

This is the original authentication method. It is **deprecated** in modules that support Version 2 and will be removed once banks migrate.

**Endpoint:** `POST /authenticate`

### Request

```json
{
  "username": "test",
  "password": "test@1234",
  "channel": "IB"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | String | Yes | Channel username configured in OpenConnect |
| `password` | String | Yes | Channel password |
| `channel` | String | Yes | Channel identifier (e.g. `IB`, `MB`, `ATM`) |

### Response

```json
{
  "expiry": "1625912767",
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6b25lcmF8aWIiLCJleHAiOjE2MjU5MTI3NjcsImlhdCI6MTYy..."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `token` | String | JWT Bearer token |
| `expiry` | String | Token expiry in UNIX EPOCH |

### HTTP Response Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `400` | Bad request |
| `401` | Unauthorized — wrong credentials |
| `504` | Request timeout |

### Usage
Pass the token in every subsequent API call:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

---

## Version 2 — KeyCloak / OpenID Connect {#version-2}

This is the **current recommended** authentication method. It is centralized across all OpenConnect APIs (P2P, P2M, PISP, Remittance) and provides more robust security.

**Endpoint:** `POST /realms/paysys-raast-realm/protocol/openid-connect/token`

### Request Headers
```
Content-Type: application/x-www-form-urlencoded
```

### Request Body
```
grant_type=client_credentials
client_id=<CLIENT_ID>
client_secret=<CLIENT_SECRET>
```

> **Note:** `client_id` and `client_secret` are provided by the PSL team per channel.

### Response

```json
{
  "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6b25lcmEi...",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0,
  "scope": "profile email"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | String | JWT Bearer token |
| `expires_in` | Integer | Token validity in seconds (300 = 5 minutes) |
| `token_type` | String | Always `Bearer` |

### HTTP Response Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `400` | Bad request |
| `401` | Unauthorized — wrong credentials |
| `504` | Request timeout |

---

## Multi-Channel Configuration

OpenConnect supports multiple channels per bank (e.g. Internet Banking, Mobile App, ATM, Cash Management). Each channel gets its own credentials and independent token lifecycle.

**Recommendation:** Each channel should maintain its own token. If the bank uses a middleware, configure the middleware as a single channel in OpenConnect and manage sub-channels internally.

---

## Token Usage Pattern

```
1. Call /authenticate (v1) or KeyCloak token endpoint (v2)
2. Store token and expiry
3. Include in all API requests:
   Authorization: Bearer <token>
4. Refresh token before expiry (V2 expires in 300 seconds)
```

---

## PISP Channel Token (OC → Bank)

For APIs that OpenConnect calls **on the bank's channel** (e.g., GetAuthorization, GetCustomerDetails), the bank channel must also expose a token endpoint. OpenConnect will first obtain a token from the bank's channel before calling the channel APIs.

This is documented in the [PISP OC-Initiated Messages](/pisp/oc-initiated) section.
