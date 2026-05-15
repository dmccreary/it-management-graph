---
title: Hardware vs. Software Asset Management Architecture
description: Hardware vs. Software Asset Management Architecture
status: scaffold
library: SVG or draw.io style diagram with clear separation of concerns
bloom_level: TBD
---

# Hardware vs. Software Asset Management Architecture

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md).

```text
**Type:** infographic

**Purpose:** Illustrate the parallel yet distinct data flows for hardware and software asset management within an IT management graph

Components to show:
- Top layer: Financial Systems (ERP, procurement, accounts payable)
- Middle layer: IT Management Graph (central)
- Bottom layer: Discovery Sources (network scanners, software metering, cloud APIs)

Left side (Hardware Asset Flow):
- Procurement → Hardware Asset node (with serial number, purchase order, cost)
- Network discovery → Device CI node (with IP, hostname, specifications)
- Relationship: FINANCIALLY_REPRESENTS (Hardware Asset → Device CI)
- Relationship: INSTALLED_IN (Device CI → Physical Location)

Right side (Software Asset Flow):
- Procurement → License Entitlement node (with SKU, quantity, contract)
- Software discovery → Software Instance node (with version, installation path)
- Relationship: CONSUMES_LICENSE (Software Instance → License Entitlement)
- Relationship: DEPLOYED_ON (Software Instance → Hardware/Virtual Host)

Connections between sides:
- Bidirectional relationship: RUNS_ON (Software Instance → Device CI)
- Aggregation query path (shown with dotted line): "Compliance Check" traversal from License Entitlement through all consuming instances

Style: Layered architecture diagram with directional arrows showing data flow and relationship types

Labels:
- "Financial Domain" on procurement systems
- "Operational Domain" on discovery sources
- "IT Management Graph" in center with node type examples
- Relationship labels on all edges

Color scheme:
- Blue for hardware-related elements
- Orange for software-related elements
- Green for the central IT Management Graph
- Purple for cross-domain relationships

Implementation: SVG or draw.io style diagram with clear separation of concerns
```

## Related Resources

- [Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md)
