---
id: integration-interfaces
title: Integration Interfaces
sidebar_position: 2
---

# Bulk Sending — Integration Interfaces

---

## MPG Interface

Interfaces with the SBP MPG system consist of 3 separate logical interfaces:
1. **REST APIs** (all APIs are asynchronous except Federated request)
2. **REST APIs for ISO 20022 messages**
3. **LDAP** — for connecting with SBP's LDAP server

### Message Flow Table

| No. | Source | Destination | Description | Format |
|----|--------|-------------|-------------|--------|
| 1 | Bank Channel/MW | OpenConnect | Pre-Validation, Payment, Transaction Inquiry | REST APIs |
| 2 | OpenConnect | MPG | Pre-Validation, Payment, Transaction Inquiry | REST APIs |
| 3 | MPG | OpenConnect | Status Reply, PACS.004 (Return Payment), E2E | REST APIs |
| 4 | OpenConnect | Bank Channel/MW | Pre-Validation Reply, Payment Reply, E2E, Return Payment | REST APIs |

---

## Bank System Interface

Integration with the bank is done using the bank's front-end channel or middleware via **REST APIs**.

### Services Exposed by OpenConnect to Bank

| Service | Description |
|---------|-------------|
| **Pre-Validation** | Send title fetch requests in bulk for a bank |
| **Payment** | Send payment for accounts that passed pre-validation |
| **Transaction Inquiry** | End-to-end inquiry for specific transactions or batches |

### Services Exposed by Bank to OpenConnect

| Service | Description |
|---------|-------------|
| **Pre-Validation Reply / Status Reply** | Bank receives failure records from beneficiary bank |
| **Return Payment (PACS004)** | Reversal notification for failed credits |
| **E2E Reconciliation** | Final status for every account in the batch |

---

## Recommended Bank-Side Handling

### Multiple Receiving Institutions

If a batch contains transactions for multiple receiving banks:
- Bank channel must create **separate batches per receiving institution**
- Example: 100 transactions where 20 are for Bank A and 80 for Bank B → Send 2 separate batches

### Batch Processing Workflow

```
1. Perform 1 CBS financial transaction:
   - Debit Company A/C by total batch amount
   - Credit Internal Sundry A/C

2. Run Pre-Validation Batches (one per receiving bank)

3. On Pre-Validation Reply received:
   - Debit Sundry by validated amount (e.g., Rs 1.8M)
   - Credit RAAST Bulk Sending Settlement (Rs 1.8M)

4. Run Payment Batches (one per receiving bank)

5. On E2E received:
   - Debit RAAST Bulk Sending Settlement
   - Credit RAAST Main Settlement A/C

6. On Return Payment (PACS004) received:
   - Debit RAAST Bulk Sending Settlement (returned amount)
   - Credit Sundry A/C

7. Failed amounts remaining in Sundry can be:
   - Routed through 1LINK IBFT
   - Returned to Corporate Account
```
