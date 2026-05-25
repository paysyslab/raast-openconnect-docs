---
id: response-codes
title: Response Codes
sidebar_position: 6
---

# Bulk Sending — Response Codes

---

## OpenConnect Response Codes

| Code | Description |
|------|-------------|
| `00` | Success |
| `068` | Invalid Request (incorrect parameter or value — e.g., IBAN not 24 chars, BIC < 8 chars) |
| `100` | Request Timeout |
| `101` | End-point service is not available |
| `102` | Invalid response received from endpoint |
| `306` | Batch not found |
| `500` | Internal error |
| `501` | Connection timeout |
| `502` | Timeout |
| `504` | Channel not allowed |
| `2001` | Transaction amount exceeds per-transaction limit |
| `2002` | Transaction amount exceeds daily transaction limit |
| `2003` | Number of transactions exhausted for allowed daily transactions |
| `2004` | Insufficient balance |
| `2005` | Beneficiary account is invalid |
| `2006` | Beneficiary account is inactive |
| `2007` | Customer account is inactive |
| `2008` | Customer account is closed |
| `2009` | Host link down |
| `2010` | Raast link down |
| `2011` | No transaction found |
| `2012` | Transaction failed at Raast |

---

## STPG (SBP) Response Codes

| SBP Code | OC Code | Description |
|----------|---------|-------------|
| `IncorrectAccountNumber` | `1001` | Account number is invalid or missing |
| `InvalidCreditorAccountNumber` | `1002` | Creditor account number invalid or missing |
| `ClosedAccountNumber` | `1003` | Account number has been closed |
| `BlockedAccount` | `1004` | Account is blocked |
| `InvalidAccountCurrency` | `1005` | Account currency is invalid or missing |
| `TransactionNotSupported` | `1006` | Transaction type not supported on this account |
| `NotAllowedAmount` | `1007` | Amount exceeds allowed maximum |
| `InsufficientFunds` | `1008` | Insufficient funds |
| `Duplication` | `1009` | Duplicate transaction |
| `InvalidAmount` | `1010` | Amount is invalid or missing |
| `AlreadyReturnedTransaction` | `1011` | Already returned original SCT |
| `DuplicatePayment` | `1012` | Payment is a duplicate |
| `RequestedByCustomer` | `1013` | Cancellation requested by debtor |
| `TransactionForbidden` | `1014` | Transaction forbidden on this account type |
| `NoOriginalTransactionReceived` | `1015` | Original credit transfer never received |
| `MissingDebtorAccountOrIdentification` | `1016` | Debtor account/ID insufficient or missing |
| `MissingDebtorNameOrAddress` | `1017` | Debtor name/address insufficient or missing |
| `NoAnswerFromCustomer` | `1018` | No response from beneficiary |
| `NotSpecifiedReasonAgentGenerated` | `1019` | Reason not specified by agent |
| `NotSpecifiedReasonCustomerGenerated` | `1020` | Reason not specified by end customer |
| `TechnicalProblem` | `1021` | Technical problem causing erroneous transaction |
