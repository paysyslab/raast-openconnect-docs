---
id: response-codes
title: Response Codes
sidebar_position: 6
---

# P2M — Response Codes

---

## CAS Response Codes

| Code | Description |
|------|-------------|
| `00` | Success |
| `01` | Transaction amount exceeds per-transaction limit |
| `02` | Transaction amount exceeds daily transaction limit |
| `03` | Number of transactions exhausted for allowed daily transactions |
| `04` | Insufficient balance |
| `05` | Beneficiary account is invalid |
| `06` | Beneficiary account is inactive |
| `07` | Customer account is inactive |
| `08` | Customer account is closed |
| `09` | Host link down |
| `10` | Raast link down |
| `11` | No transaction found |
| `12` | Transaction failed at Raast |
| `100` | Request Timeout — SBP returned timeout on this request. Retry using Transaction Inquiry |
| `500` | Internal server error / Technical problem |
| `501` | Connection timeout / Request timeout |
| `502` | Socket timeout |
| `503` | Unable to process |
| `504` | Channel not allowed |

---

## STPG / Host Response Codes

| SBP Code | Description |
|----------|-------------|
| `IncorrectAccountNumber` | Account number invalid or missing |
| `InvalidCreditorAccountNumber` | Creditor account invalid |
| `ClosedAccountNumber` | Account is closed |
| `BlockedAccount` | Account is blocked |
| `InvalidAccountCurrency` | Currency invalid |
| `TransactionNotSupported` | Transaction type not supported on this account |
| `NotAllowedAmount` | Amount exceeds maximum |
| `InsufficientFunds` | Insufficient funds |
| `Duplication` | Duplicate transaction |
| `InvalidAmount` | Amount invalid |
| `AlreadyReturnedTransaction` | Already returned |
| `DuplicatePayment` | Duplicate payment |
| `RequestedByCustomer` | Cancellation by debtor |
| `TransactionForbidden` | Transaction forbidden |
| `NoOriginalTransactionReceived` | Original never received |
| `MissingDebtorAccountOrIdentification` | Debtor ID insufficient |
| `MissingDebtorNameOrAddress` | Debtor name/address missing |
| `NoAnswerFromCustomer` | No beneficiary response |
| `NotSpecifiedReasonAgentGenerated` | Reason not specified by agent |
| `NotSpecifiedReasonCustomerGenerated` | Reason not specified by customer |
| `TechnicalProblem` | Technical problem |

---

## Purpose Codes

| Code | Description |
|------|-------------|
| `001` | Fund transfer |
| `021` | Salary payment |
| `022` | Generic bill payment |
| `027` | Dividends |
| `031` | Charity payments |
| `033` | Government payment |
| `034` | Pension payment |
