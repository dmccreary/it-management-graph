---
title: HIPAA Data Flow Tracing Diagram
description: HIPAA Data Flow Tracing Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# HIPAA Data Flow Tracing Diagram

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md).

```text
Type: diagram

    Purpose: Illustrate how graph traversal identifies all systems processing ePHI in a healthcare organization

    Components to show:
    - Central database node (cylinder shape, blue): "Patient Records DB" with label "Contains ePHI"
    - API layer node (rectangle, light blue): "FHIR API Gateway"
    - Application nodes (rectangles, green): "Patient Portal", "Clinical Dashboard", "Billing System"
    - Infrastructure nodes (diamonds, gray): "VM-Host-01", "VM-Host-02", "Storage Array"
    - Network nodes (hexagons, purple): "Load Balancer", "Firewall"
    - External system node (dashed rectangle, orange): "Insurance Claims Processor"

    Connections:
    - "CONNECTS_TO" arrows from API Gateway to Patient Records DB
    - "DEPENDS_ON" arrows from each application to API Gateway
    - "HOSTS" arrows from VM hosts to applications
    - "CONNECTS_TO" arrows from applications to load balancer
    - "ROUTES_THROUGH" arrows showing network path through firewall
    - "SHARES_TO" arrow to external claims processor

    Highlighting:
    - All nodes and edges highlighted in yellow to show "ePHI compliance scope"
    - Starting node (Patient Records DB) highlighted in bright blue
    - Arrows showing traversal direction with animated flow

    Style: Network diagram with hierarchical layout (data at bottom, infrastructure in middle, applications at top)

    Labels:
    - Each node labeled with name and type
    - Each edge labeled with relationship type
    - Annotation: "Graph traversal identifies all systems in 15ms"
    - Annotation: "Traditional SQL query: 3.4 seconds with 6-way JOIN"

    Color scheme: Blue for data layer, gray for infrastructure, green for applications, purple for networking

    Implementation: SVG diagram with clear hierarchy and relationship labels, could be generated from vis-network library
```

## Related Resources

- [Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md)
