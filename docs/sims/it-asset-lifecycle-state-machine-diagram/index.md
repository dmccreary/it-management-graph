---
title: IT Asset Lifecycle State Machine Diagram
description: IT Asset Lifecycle State Machine Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# IT Asset Lifecycle State Machine Diagram

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md).

```text
Type: diagram

    Purpose: Illustrate the complete lifecycle states of an IT asset from acquisition through disposition, including state transitions and governance triggers

    Visual style: State machine diagram with rounded rectangle states and labeled transition arrows

    States (rounded rectangles):
    1. ORDERED - Asset ordered from vendor, PO issued
    2. IN_TRANSIT - Asset shipped, awaiting delivery
    3. RECEIVED - Asset physically received, inspected
    4. IN_STOCK - Asset in inventory, not yet deployed
    5. IN_DEPLOYMENT - Asset being configured and integrated
    6. ACTIVE - Asset in production use
    7. IN_MAINTENANCE - Asset temporarily offline for repairs/upgrades
    8. STANDBY - Asset configured but not actively used (hot spare)
    9. DEGRADED - Asset operational but with known issues
    10. RETIRED - Asset decommissioned from production
    11. DISPOSED - Asset physically removed, data destroyed

    Transitions (arrows with labels):
    - ORDERED → IN_TRANSIT: "Shipment tracking updated"
    - IN_TRANSIT → RECEIVED: "Delivery confirmed, inspection passed"
    - RECEIVED → IN_STOCK: "Added to inventory system"
    - IN_STOCK → IN_DEPLOYMENT: "Deployment work order created"
    - IN_DEPLOYMENT → ACTIVE: "Deployment completed, monitoring active"
    - ACTIVE → IN_MAINTENANCE: "Maintenance window scheduled"
    - IN_MAINTENANCE → ACTIVE: "Maintenance completed, service restored"
    - ACTIVE → DEGRADED: "Issue detected, functionality limited"
    - DEGRADED → IN_MAINTENANCE: "Repair scheduled"
    - DEGRADED → ACTIVE: "Issue auto-resolved"
    - ACTIVE → STANDBY: "Workload migrated, kept as backup"
    - STANDBY → ACTIVE: "Failover triggered or capacity needed"
    - ACTIVE → RETIRED: "End of life reached, replacement deployed"
    - STANDBY → RETIRED: "No longer needed, approved for disposal"
    - RETIRED → DISPOSED: "Data wiped, physical disposal completed"

    Governance triggers (shown as annotations on states):
    - ORDERED: Financial commitment created, budget allocated
    - RECEIVED: Acceptance testing, vendor invoice matched to PO
    - ACTIVE: Depreciation begins, maintenance contracts activated
    - DEGRADED: Incident tickets created, SLA compliance checked
    - RETIRED: Depreciation ends, asset value written off
    - DISPOSED: Certificate of data destruction, compliance documentation

    Color coding:
    - Green: Productive states (ACTIVE, STANDBY)
    - Yellow: Transitional states (IN_DEPLOYMENT, IN_MAINTENANCE)
    - Blue: Inventory states (ORDERED, IN_TRANSIT, RECEIVED, IN_STOCK)
    - Orange: Problematic states (DEGRADED)
    - Red: End-of-life states (RETIRED, DISPOSED)

    Special paths highlighted:
    - Happy path (green highlighted arrows): ORDERED → IN_TRANSIT → RECEIVED → IN_STOCK → IN_DEPLOYMENT → ACTIVE
    - Emergency disposal path (red highlighted): ACTIVE → RETIRED → DISPOSED (for security incidents requiring immediate removal)

    Implementation: Graphviz or draw.io state machine diagram with clear state labels and transition conditions
```

## Related Resources

- [Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md)
