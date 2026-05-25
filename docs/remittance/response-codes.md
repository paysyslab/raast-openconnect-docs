---
id: response-codes
title: Response Codes
sidebar_position: 5
---

# Remittance — Response Codes

---

## CAS Response Codes

| Code | Description |
|------|-------------|
| `00` | Success |
| `001` | Cannot find country |
| `002` | Cannot find alias type |
| `003` | Cannot find account type |
| `004` | Cannot find UID type |
| `005` | Cannot find customer |
| `006` | Customer already exists |
| `007` | Customer is suspended |
| `008` | Cannot find participant |
| `009` | Cannot find currency |
| `010` | Account is already default |
| `011` | Cannot find account |
| `012` | Cannot find alias |
| `013` | Account is already suspended |
| `014` | Account is already active |
| `015` | Duplicated UID |
| `016` | Duplicated account |
| `017` | Customer is already suspended |
| `018` | Customer is already active |
| `019` | Multiple default accounts |
| `021` | Alias already exists |
| `022` | Alias has expired |
| `023` | Account has expired |
| `024` | Customer is duplicated in the message |
| `027` | Alias has already expired |
| `028` | Alias already exists |
| `029` | The account is not linked to the alias |
| `030` | The account is already linked to the alias |
| `031` | Alias is suspended |
| `033` | Alias mask is invalid |
| `036` | Customer is inactive |
| `038` | Alias start date is later than expiration date |
| `039` | Account opening date is later than closing date |
| `040` | Cannot link alias to account |
| `041` | Cannot link account to alias |
| `042` | Only servicer can register its accounts |
| `043` | Invalid mobile number format |
| `044` | Operation is not allowed |
| `045` | Customer has no accounts serviced by participant |
| `046` | Invalid email format |
| `050` | Invalid servicer |
| `052` | UID does not match the pattern |
| `053` | UID mask is invalid |
| `054` | Default account is not specified |
| `068` | Invalid request (definition varies by context) |
| `99` | Unable to process / Response received by SBP |
| `100` | Request Timeout — retry using Payment Inquiry |
| `101` | Unable to process / Invalid Request |
| `401` | Invalid Token |
| `500` | Internal server error / Technical problem |
| `501` | Connect Timeout Exception / Request processed successfully / Request Timeout |
| `502` | Socket Timeout Exception |
| `503` | Unable to process |
| `504` | Channel not allowed |

### Payment-Specific Codes

| Code | Description |
|------|-------------|
| `01` | Transaction amount exceeds per-transaction limit |
| `02` | Transaction amount exceeds daily transaction limit |
| `03` | Number of daily transactions exhausted |
| `04` | Insufficient balance |
| `05` | Beneficiary account is invalid |
| `06` | Beneficiary account is inactive |
| `07` | Customer account is inactive |
| `08` | Customer account is closed |
| `09` | Host link down |
| `10` | RAAST link down |
| `11` | No transaction found |
| `12` | Transaction failed at RAAST |

---

## STPG / Host Response Codes

| SBP Code | Description |
|----------|-------------|
| `IncorrectAccountNumber` | Account number is invalid or missing |
| `InvalidCreditorAccountNumber` | Creditor account number invalid or missing |
| `ClosedAccountNumber` | Account number has been closed |
| `BlockedAccount` | Account is blocked, prohibiting transactions |
| `InvalidAccountCurrency` | Account currency is invalid or missing |
| `TransactionNotSupported` | Transaction type not supported/authorized on this account |
| `NotAllowedAmount` | Transaction amount exceeds allowed maximum |
| `InsufficientFunds` | Insufficient funds to cover transaction |
| `Duplication` | Duplicate transaction detected |
| `InvalidAmount` | Amount is invalid or missing |
| `AlreadyReturnedTransaction` | Original SCT already returned |
| `DuplicatePayment` | Payment is a duplicate of another |
| `RequestedByCustomer` | Cancellation requested by debtor |
| `TransactionForbidden` | Transaction forbidden on this account type |
| `NoOriginalTransactionReceived` | Original credit transfer never received |
| `MissingDebtorAccountOrIdentification` | Debtor account/ID specification insufficient |
| `MissingDebtorNameOrAddress` | Debtor name/address insufficient for regulatory requirements |
| `NoAnswerFromCustomer` | No response from beneficiary |
| `NotSpecifiedReasonAgentGenerated` | Reason not specified by agent |
| `NotSpecifiedReasonCustomerGenerated` | Reason not specified by end customer |
| `TechnicalProblem` | Cancellation due to technical problems causing erroneous transaction |

---

## Transaction Type Codes {#transaction-type-codes}

| Code | Description |
|------|-------------|
| `000` | System Operation |
| `001` | Fund transfer |
| `020` | Fee payment |
| `021` | Salary payment |
| `022` | Generic bill payment |
| `023` | Top-up of pre-paid account |
| `024` | Transfer from Prepaid Account to Bank Account |
| `025` | Credit card settlement |
| `026` | Coupon |
| `027` | Dividends |
| `028` | Interest received |
| `029` | Loan instalment |
| `030` | Rental |
| `031` | Charity payments |
| `032` | Bonus payment |
| `033` | Government payment |
| `034` | Pension payment |
| `035` | Securities |
| `036` | Social security benefit |
| `037` | Treasury payment |
| `110` | Multiple default profile exists |
| `111` | No default profile exists |
| `112` | Limit exceed |
| `113` | Channel not found |
| `114` | Invalid profile configuration |
| `115` | Transaction count exceed |
| `116` | Per transaction limit exceed |
| `117` | No limit configuration found for customer |
| `118` | Invalid request parameters |
| `119` | Invalid participant |
| `120` | No configuration found for all channel and participant |
| `121` | Invalid limit type |
| `300` | Unknown error occurred |
