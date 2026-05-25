---
id: host-message-spec
title: Host Message Specification
sidebar_position: 4
---

# Remittance — Host Message Specification

These are the messages OpenConnect sends to the bank's **Core Banking System (CBS)** or middleware. All remittance-specific fields are included beyond the standard P2P parameters.

---

## Debit / Hold Request

Sent by OpenConnect to the bank CBS to debit or hold the sender's account before forwarding the credit to RAAST.

### Request Parameters

| Field | Description |
|-------|-------------|
| Date/Time | Transaction timestamp |
| Sender IBAN | Sender account IBAN |
| Receiver IBAN | Beneficiary account IBAN |
| Receiver Name | Beneficiary name |
| Amount | Transaction amount |
| Receiving Institution ID | Beneficiary bank BIC |
| Narration | Payment narration |
| Amount-Fee | Fee amount (currently 0) |
| STAN | System trace audit number |
| RRN | Reference number |
| Payment Purpose Code | Transaction type code |
| Correlation Id | OpenConnect correlation ID |
| `receiver_idtype` | Beneficiary ID type |
| `receiver_idvalue` | Beneficiary ID value |
| `remitting_institute` | MTO name (e.g., WesternUnion) |
| `country` | ISO 3166-1 alpha-2 country code |
| `country_code` | ITRS country code |
| `currency_FCY` | Foreign currency code |
| `amount_in_FCY` | FCY amount |
| `rate_of_conversion` | FCY→PKR conversion rate |
| `transaction_reference` | Original MTO reference |
| `ttc` | `005` for Remittance |
| Reserve Field 1–4 | Reserved for future use |

### Response Parameters

| Field | Description |
|-------|-------------|
| STAN | Echo back |
| RRN | Echo back |
| Correlation Id | Echo back |
| Date/Time | Response timestamp |
| IBAN | Echo back |
| Host Response Code | Bank's response code |
| Host Response Description | Bank's response description |

---

## Debit / Hold Confirmation

Sent after RAAST confirms receipt of the credit message. Bank acknowledges debit completion.

### Request Parameters

| Field | Description |
|-------|-------------|
| Date/Time | Transaction timestamp |
| Sender IBAN | Original sender IBAN |
| STAN | Echo back |
| RRN | Echo back |
| Correlation Id | Current correlation ID |
| Original transaction correlation id | Reference to original debit |
| `receiver_idtype` | Beneficiary ID type |
| `receiver_idvalue` | Beneficiary ID value |
| `remitting_institute` | MTO name |
| `country` | Country code |
| `country_code` | ITRS code |
| `currency_FCY` | FCY currency |
| `amount_in_FCY` | FCY amount |
| `rate_of_conversion` | Conversion rate |
| `transaction_reference` | MTO reference |
| `ttc` | `005` |
| Reserve Field 1–4 | Reserved |

### Response Parameters

| Field | Description |
|-------|-------------|
| STAN | Echo back |
| RRN | Echo back |
| Correlation Id | Echo back |
| Date/Time | Response timestamp |
| IBAN | Echo back |
| Host Response Code | Bank response code |
| Host Response Description | Bank response description |

---

## Debit / Hold Release or Reversal

Sent when RAAST rejects the transaction. OpenConnect sends either a Release (if bank held funds) or a Reversal (if bank immediately debited).

### Request Parameters

| Field | Description |
|-------|-------------|
| Date/Time | Transaction timestamp |
| Sender IBAN | Original sender IBAN |
| STAN | Echo back |
| RRN | Echo back |
| Correlation Id | Current correlation ID |
| Original transaction correlation id | Reference to original debit |
| `receiver_idtype` | Beneficiary ID type |
| `receiver_idvalue` | Beneficiary ID value |
| `remitting_institute` | MTO name |
| `country` | Country code |
| `country_code` | ITRS code |
| `currency_FCY` | FCY currency |
| `amount_in_FCY` | FCY amount |
| `rate_of_conversion` | Conversion rate |
| `transaction_reference` | MTO reference |
| `ttc` | `005` |
| Reserve Field 1–4 | Reserved |

### Response Parameters

| Field | Description |
|-------|-------------|
| STAN | Echo back |
| RRN | Echo back |
| Correlation Id | Echo back |
| Date/Time | Response timestamp |
| IBAN | Echo back |
| Host Response Code | Bank response code |
| Host Response Description | Bank response description |

---

## Credit Posting

Sent when OpenConnect receives an inbound remittance credit from RAAST MPG to credit the beneficiary's account.

### Request Parameters

| Field | Source | Description |
|-------|--------|-------------|
| Date/Time | — | Transaction timestamp |
| Receiver IBAN | SBP | Beneficiary IBAN |
| Amount | SBP | Credit amount in PKR |
| Sender Institution ID | SBP | Sending bank BIC |
| Narration | SBP | Payment narration |
| Amount-Fee | Recommended | Fee (currently 0) |
| Tracking Id | SBP | RAAST tracking ID |
| Instruction Id | SBP | RAAST instruction ID |
| Batch ID | SBP | Batch identifier |
| STAN | — | System trace number |
| RRN | — | Reference number |
| Payment Purpose Code | SBP | Transaction type |
| Sender IBAN | SBP | Sender account IBAN |
| Sender Name | SBP | Sender full name |
| `receiver_idtype` | — | Beneficiary ID type |
| `receiver_idvalue` | — | Beneficiary ID value |
| `remitting_institute` | — | MTO name |
| `country` | — | Country code |
| `country_code` | — | ITRS code |
| `currency_FCY` | — | FCY currency |
| `amount_in_FCY` | — | FCY amount |
| `rate_of_conversion` | — | Conversion rate |
| `transaction_reference` | — | MTO reference |
| `ttc` | — | `005` |
| Reserve Field 1–4 | — | Reserved |

### Response Parameters

| Field | Description |
|-------|-------------|
| STAN | Echo back |
| RRN | Echo back |
| Date/Time | Response timestamp |
| IBAN | Echo back |
| Host Response Code | Bank response code |
| Host Response Description | Bank response description |

---

## Title Fetch

Sent during pre-validation or when an incoming PACS.008 message requires account verification.

### Request Parameters (OpenConnect → Bank)

| Field | Required | Description |
|-------|----------|-------------|
| Unique Request ID | Yes | Per-request unique identifier |
| Date/Time | Yes | Request timestamp |
| Account Number (IBAN) | Yes | Account to validate |
| Amount | Yes | Transaction amount |
| ID Type | No | Optional customer ID type |
| ID Value | No | Optional customer ID value |
| Sender Institution ID | No | Sending bank BIC |

### Response Parameters (Bank → OpenConnect)

| Field | Description |
|-------|-------------|
| Unique ID | Echo back |
| Date/Time | Response timestamp |
| Account Number (IBAN) | Echo back |
| Host Response | Bank response code |
| Account Title | Full account holder name |
| ID Type | ID type on which account is opened |
| ID Value | Customer ID value (for joint accounts, multiple IDs) |
| Account Status | `Active`, `Block`, `Dormant`, etc. |
| Credit Block | `Y` / `N` |
| Credit Available Limit | Applicable for Asaan Accounts |

**Supported ID Types:** `CNIC`, `NIC`, `NICOP`, `POC`, `NTN`, `PASSPORT`, `REGNUM`

:::info
Account Status codes and Credit Block indicator should be agreed upon during bank integration. Fields 5–10 are only returned when the account is found.
:::

---

## Credit Inquiry

Sent when OpenConnect needs to verify whether the bank has already processed a credit transaction.

### Request Parameters

| Field | Description |
|-------|-------------|
| Unique Request ID | Per-request unique identifier |
| Transaction reference | Reference of the credit transaction to look up |

### Response Parameters

| Field | Description |
|-------|-------------|
| Unique Request ID | Echo back |
| Transaction ID | ID of the original transaction |
| Host Response | `Approved`, `Transaction Not Found`, etc. |
| Host Auth ID | Authorization ID (returned only if original was approved) |

:::note
If the bank has not received the transaction, it returns `Transaction Not Found`. If found, it returns the original response code and Auth ID.
:::
