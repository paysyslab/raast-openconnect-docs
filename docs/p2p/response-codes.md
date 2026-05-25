---
id: response-codes
title: Response Codes
sidebar_position: 10
---

# P2P — Response Codes

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
| `045` | Customer has no accounts serviced by |
| `046` | Invalid email format |
| `050` | Invalid servicer |
| `052` | UID does not match the pattern |
| `053` | UID mask is invalid |
| `054` | Default account is not specified |
| `068` | Invalid request |
| `99` | Unable to process / Response received by SBP |
| `100` | Request Timeout |
| `101` | Unable to process / Invalid Request |
| `401` | Invalid Token |
| `500` | Internal server error / Technical problem |
| `501` | Connect Timeout / Request processed Successfully / Request Timeout |
| `502` | Socket Timeout |
| `503` | Unable to process |
| `504` | Channel not allowed |

### Payment-Specific Codes

| Code | Description |
|------|-------------|
| `01` | Transaction amount exceeds per-transaction limit |
| `02` | Transaction amount exceeds daily limit |
| `03` | Daily transaction count exhausted |
| `04` | Insufficient balance |
| `05` | Beneficiary account is invalid |
| `06` | Beneficiary account is inactive |
| `07` | Customer account is inactive |
| `08` | Customer account is closed |
| `09` | Host link down |
| `10` | Raast link down |
| `11` | No transaction found |
| `12` | Transaction failed at Raast |

---

## Transaction Type Codes

| S# | Code | Description |
|----|------|-------------|
| 1 | `000` | System Operation |
| 2 | `001` | Fund transfer |
| 3 | `020` | Fee payment |
| 4 | `021` | Salary payment |
| 5 | `022` | Generic bill payment |
| 6 | `023` | Top-up of pre-paid account |
| 7 | `024` | Transfer from Prepaid Account to Bank Account |
| 8 | `025` | Credit card settlement |
| 9 | `026` | Coupon |
| 10 | `027` | Dividends |
| 11 | `028` | Interest received |
| 12 | `029` | Loan Instalment |
| 13 | `030` | Rental |
| 14 | `031` | Charity payments |
| 15 | `032` | Bonus payment |
| 16 | `033` | Government payment |
| 17 | `034` | Pension payment |
| 18 | `035` | Securities |
| 19 | `036` | Social security benefit |
| 20 | `037` | Treasury payment |
| 21 | `300` | Unknown Error |
| 22 | `110` | Multiple default profile exists |
| 23 | `111` | No default profile exists |
| 24 | `112` | Limit Exceeded |
| 25 | `113` | Channel not found |
| 26 | `114` | Invalid profile configuration |
| 27 | `115` | Transaction count exceeded |
| 28 | `116` | Per transaction limit exceeded |
| 29 | `117` | No limit configuration found |
| 30 | `118` | Invalid request parameters |
| 31 | `119` | Invalid participant |
| 32 | `120` | No configuration found for channel/participant |
| 33 | `121` | Invalid limit type |
