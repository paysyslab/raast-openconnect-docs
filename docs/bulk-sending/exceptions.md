---
id: exceptions
title: Exceptions & Edge Cases
sidebar_position: 5
---

# Bulk Sending — Exceptions & Edge Cases

---

## Exception Handling Table

| Case | Scenario | Action | OC Feature |
|------|----------|--------|------------|
| 1 | **E2E not received same day** | Funds remain in RAAST Bulk Sending Settlement | OC report shows transactions where PACS.002/ACSP received but E2E pending |
| 2 | **SBP delivered E2E but OC did not receive it** | Query IPSE2EMS as destination from OC UI | OC UI inquiry |
| 3 | **E2E received multiple times** | OC responds to first E2E; SAF delivers to bank. 2nd E2E: log "Duplicate" + reply HTTP 200 without double entry | SAF duplicate handling |
| 4 | **RETURN not received but E2E shows RETURNED** | E2E Exception report highlights anomaly | Exception report |
| 5 | **RETURN arrived after E2E with PROCESSED OK** | OC always passes RETURN via SAF to bank | SAF monitoring view |
| 6 | **Duplicate RETURN payment** | OC passes via SAF; logs duplicate | SAF |
| 7 | **PACS.008 sent, no HTTP 200** | Repeat with same MSGID and all elements identical | — |
| 8 | **PACS.008 sent, PACS.002/ACSP not received** | Log reason; visible in backoffice | OC backoffice screen |
| 9 | **PACS.002/ACSP not received but E2E received** | Reject E2E — do not take financial action without PACS.002/ACSP | — |

---

## Key Principles

:::danger Critical
**Never make financial entries based on E2E alone.** E2E is a reconciliation message — financial actions must be triggered by PACS.004/Return Payment.
:::

:::info E2E Timing
It is possible to receive E2E **before** PACS.004. Wait for PACS.004 before processing returns.
:::

:::note Rare Cases
In rare cases, E2E may not arrive (receiver bank system issues). Use **Transaction Inquiry** or raise a complaint with SBP.
:::
