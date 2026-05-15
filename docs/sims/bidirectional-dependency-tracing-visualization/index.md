---
title: Bidirectional Dependency Tracing Visualization
description: Bidirectional Dependency Tracing Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# Bidirectional Dependency Tracing Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Graph Traversal And Dependency Analysis](../../chapters/06-graph-traversal-and-dependency-analysis/index.md).

```text
Type: graph-model

    Purpose: Demonstrate upstream and downstream dependency tracing from a central component, showing how direction affects the scope of analysis

    Node types:

    1. Business Service (:BusinessService - pink circles, large)
       - Properties: name, SLA_tier, criticality
       - Examples: "Online Banking", "Mobile App"

    2. Application (:Application - light blue rounded squares, medium)
       - Properties: name, version, health_status
       - Examples: "Customer Portal", "API Gateway", "Auth Service"

    3. Database (:Database - orange cylinders, medium)
       - Properties: name, db_type, size_gb
       - Examples: "CustomerDB", "SessionStore", "ConfigDB"

    4. Server (:Server - gray rectangles, small)
       - Properties: hostname, ip_address, status
       - Examples: "web-prod-01", "db-prod-01"

    Sample graph structure (20 nodes):

    Central component: "Customer Portal" (Application)

    Upstream dependencies (what Customer Portal needs):
    - "Customer Portal" → DEPENDS_ON → "Auth Service"
    - "Customer Portal" → DEPENDS_ON → "API Gateway"
    - "Customer Portal" → DEPENDS_ON → "CustomerDB"
    - "Customer Portal" → DEPENDS_ON → "SessionStore"
    - "Auth Service" → DEPENDS_ON → "UserDB"
    - "Auth Service" → DEPENDS_ON → "ConfigDB"
    - "API Gateway" → DEPENDS_ON → "Rate Limiter"
    - "CustomerDB" → HOSTED_ON → "db-prod-01"
    - "SessionStore" → HOSTED_ON → "cache-prod-01"

    Downstream dependencies (what depends on Customer Portal):
    - "Online Banking" (BusinessService) → SUPPORTS → "Customer Portal"
    - "Mobile App" (BusinessService) → SUPPORTS → "Customer Portal"
    - "Admin Dashboard" → INTEGRATES_WITH → "Customer Portal"
    - "Reporting Service" → DEPENDS_ON → "Customer Portal"

    Additional context nodes for complete picture

    Layout algorithm: Radial layout with "Customer Portal" at center
    - Upstream dependencies positioned to the left
    - Downstream dependencies positioned to the right
    - Multiple hops arranged in concentric circles

    Interactive features:

    - Radio buttons: Select trace direction
      ○ Upstream (what this needs)
      ○ Downstream (what needs this)
      ○ Both directions

    - Slider: Maximum hops (1-5)

    - Button: "Trace Upstream" - Highlights upstream dependencies
      - Starting from "Customer Portal", follow outgoing DEPENDS_ON edges
      - Color upstream nodes in blue gradient (darker = closer)
      - Show hop count badges on each node
      - Dim downstream nodes to 20% opacity

    - Button: "Trace Downstream" - Highlights downstream dependencies
      - Starting from "Customer Portal", follow incoming DEPENDS_ON/SUPPORTS edges
      - Color downstream nodes in red gradient (darker = closer)
      - Show hop count badges on each node
      - Dim upstream nodes to 20% opacity

    - Button: "Show Both" - Highlights complete dependency context
      - Upstream in blue, downstream in red
      - Central node in green
      - Shows full blast radius

    - Hover node: Display direction and hop count from center
      - "2 hops upstream" or "1 hop downstream"
      - Show all properties

    - Click node: Re-center analysis on this node
      - Makes clicked node the new center
      - Recalculates upstream/downstream from new perspective

    Statistics panel (right sidebar):
    - Upstream dependencies: X nodes, Y relationships
    - Downstream dependents: Z nodes, W relationships
    - Total blast radius: Combined count
    - Deepest path: Maximum hops in either direction
    - Critical path: Highlight longest dependency chain

    Visual styling:
    - Central node (Customer Portal): Large, green, pulsing glow
    - Upstream nodes: Blue gradient (dark blue = 1 hop, light blue = 5 hops)
    - Downstream nodes: Red gradient (dark red = 1 hop, light red = 5 hops)
    - Edges in trace path: Thick, highlighted
    - Edges not in trace: Thin, gray, 30% opacity
    - Hop count badges: Small circles in top-right of nodes showing distance

    Educational callouts:
    - "Upstream = What this component NEEDS (trace outgoing edges)"
    - "Downstream = What NEEDS this component (trace incoming edges)"
    - "Blue gradient shows upstream dependencies getting lighter as distance increases"
    - "Red gradient shows downstream impact spreading outward"
    - "Try clicking different nodes to change perspective!"

    Legend (top-right):
    - Node types with shapes
    - Upstream direction (blue)
    - Downstream direction (red)
    - Hop count indicators
    - Relationship types

    Canvas size: 1000x700px with right sidebar (200px)

    Color scheme:
    - Green: Central/selected node
    - Blue gradient: Upstream dependencies
    - Red gradient: Downstream dependents
    - Gray: Inactive/dimmed nodes
    - Node type colors for context (pink=business service, light blue=app, orange=database, gray=server)

    Implementation: vis-network JavaScript library with radial layout, bidirectional traversal algorithm (BFS), gradient color calculation based on hop distance, interactive re-centering

    Advanced feature: "Critical Path Analysis"
    - Button: "Find Critical Paths"
    - Identifies longest dependency chains upstream and downstream
    - Highlights these paths in bright yellow
    - Shows deployment order based on upstream critical path
    - Shows maximum impact scope based on downstream critical path
```

## Related Resources

- [Chapter 6: Graph Traversal And Dependency Analysis](../../chapters/06-graph-traversal-and-dependency-analysis/index.md)
