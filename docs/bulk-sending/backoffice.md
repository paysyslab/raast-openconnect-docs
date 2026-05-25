---
id: backoffice
title: OpenConnect Backoffice
sidebar_position: 6
---

# Bulk Sending — OpenConnect Backoffice

---

## Batch View

Backoffice provides a **Batch View** feature for operational management of bulk batches.

### Available Operations

| Operation | Description |
|-----------|-------------|
| View Batches | List all batches with current status (most recent first) |
| View Summary | Summary stats for a selected batch |
| View Batch Details | Per-record details for a selected batch |
| Batch Reposting | Re-initiate failed batches |

---

## View Summary

Clicking on a batch shows:

| Field | Description |
|-------|-------------|
| Batch ID | Unique batch identifier |
| Batch Receiving DateTime | When OC received the batch |
| Batch Response DateTime | When OC responded |
| Batch Status | Current status |
| No. of Transactions | Total count |
| No. of Successful Transactions | Credited successfully |
| No. of Rejected Transactions | Failed/returned |
| No. of Timeout Transactions | Shown separately for analysis |

---

## View Batch Details

Per-record view includes:

| Field |
|-------|
| Batch ID |
| Batch Receiving DateTime |
| Batch Response DateTime |
| IBAN |
| Amount |
| STAN |
| RRN |
| Response Code |
| Response Description |
| Current Status |

---

## Batch Reposting

### Use Cases

**Case 1 — Batch failed to reach MPG (SBP)**  
If OpenConnect received HTTP 400 or non-200 from MPG, backoffice user can repost. On HTTP 200 from SBP, batch status updates.

**Case 2 — Reply failed to reach Bank**  
If pre-validation reply, payment reply, or return payment failed to reach the bank, backoffice user can repost from OC.

### Reposting Workflow (Maker-Checker)

**Maker:**
1. Access backoffice with pending batch view rights
2. View list of failed batches
3. Select batch → see batch detail with failed status
4. Click "Repost"
5. Request forwarded to Checker

**Checker:**
1. Access backoffice with checker rights
2. View pending batches for approval
3. Review and Approve / Reject
4. On approval:
   - System verifies transaction is within processing date (must match transaction date)
   - Updates OC database

### Rules
- Reprocessing is available **once only** per failed batch — hidden permanently after action
- All activities logged in audit trail
