---
title: Dependency Graph with Cycle Detection Visualization
description: Dependency Graph with Cycle Detection Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# Dependency Graph with Cycle Detection Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Graph Database Technologies](../../chapters/05-graph-database-technologies/index.md).

```text
Type: graph-model

    Purpose: Demonstrate cycle detection in an IT dependency graph, showing both healthy DAG structures and problematic circular dependencies that need architectural attention

    Node types:

    1. Application (:Application - light blue rounded squares, medium size)
       - Properties: name, tier, health_status, team
       - Examples: "Payment Service", "Auth Service", "Order Service", "Inventory Service", "Notification Service"

    2. Database (:Database - orange cylinders, medium size)
       - Properties: name, db_type, size_gb
       - Examples: "PaymentDB", "UserDB", "OrderDB"

    Sample data (18 nodes total):

    Applications:
    - "API Gateway" (tier: frontend)
    - "Web UI" (tier: frontend)
    - "Order Service" (tier: business)
    - "Payment Service" (tier: business)
    - "Inventory Service" (tier: business)
    - "Auth Service" (tier: platform)
    - "Notification Service" (tier: platform)
    - "Audit Logger" (tier: platform)
    - "Config Service" (tier: platform)
    - "Cache Manager" (tier: infrastructure)
    - "Session Manager" (tier: infrastructure)

    Databases:
    - "OrderDB"
    - "PaymentDB"
    - "UserDB"
    - "InventoryDB"
    - "ConfigDB"
    - "AuditDB"
    - "SessionStore"

    Edge type:
    - DEPENDS_ON (blue directed arrows)
    - Properties: dependency_type, criticality

    Dependency structure with intentional cycles:

    Healthy DAG portion:
    - "Web UI" → "API Gateway"
    - "API Gateway" → "Auth Service" → "UserDB"
    - "API Gateway" → "Session Manager" → "SessionStore"
    - "Order Service" → "OrderDB"
    - "Payment Service" → "PaymentDB"
    - "Inventory Service" → "InventoryDB"
    - "Notification Service" → "ConfigDB"
    - "Audit Logger" → "AuditDB"
    - "Config Service" → "ConfigDB"

    Cycle 1 (Problematic tight coupling):
    - "Order Service" → "Payment Service"
    - "Payment Service" → "Inventory Service"
    - "Inventory Service" → "Order Service" ← CYCLE!

    Cycle 2 (Platform service mutual dependency):
    - "Audit Logger" → "Config Service"
    - "Config Service" → "Audit Logger" ← CYCLE!

    Additional dependencies completing the graph:
    - "Order Service" → "Notification Service"
    - "Payment Service" → "Audit Logger"
    - "Cache Manager" → "Config Service"

    Layout algorithm: Hierarchical layout with tier-based positioning
    - Frontend tier at top
    - Business tier in middle
    - Platform tier below
    - Infrastructure tier at bottom
    - Databases positioned near their consuming services

    Interactive features:
    - Button: "Detect Cycles" - Runs cycle detection algorithm
      - Highlights all nodes involved in cycles in red
      - Highlights edges participating in cycles in thick red
      - Shows cycle count and lists cycle paths
    - Button: "Show Cycle 1" - Isolates and highlights first detected cycle
    - Button: "Show Cycle 2" - Isolates and highlights second detected cycle
    - Button: "Show DAG Portion" - Highlights only nodes/edges NOT involved in cycles (green)
    - Button: "Reset Highlighting" - Returns to default visualization
    - Toggle: "Show topological sort" - Attempts to order nodes, indicates where cycles prevent proper ordering
    - Hover node: Display all incoming and outgoing dependencies
    - Click node: Trace all paths to/from this node, highlighting cycles if encountered
    - Right panel: Cycle detection results
      - Cycle count
      - List of cycles with node paths
      - Severity assessment (tight coupling vs mutual dependency)
      - Remediation suggestions

    Visual styling:
    - Default state: Blue nodes, blue edges, hierarchical layout
    - After "Detect Cycles":
      - Nodes in cycles: Red background, thick red border
      - Edges in cycles: Thick red arrows
      - Nodes NOT in cycles: Green tint
      - Edges NOT in cycles: Remain blue
    - Cycle path highlighting: Animated flow along cycle path showing direction
    - Node size: Larger for nodes with more dependencies (higher degree)
    - Edge thickness: Thicker for critical dependencies

    Cycle detection panel (right sidebar when cycle detected):

    Cycle 1 Analysis:
    - Path: Order Service → Payment Service → Inventory Service → Order Service
    - Type: Business logic tight coupling
    - Severity: HIGH
    - Impact: Deployment complexity, unclear failure boundaries
    - Remediation:
      - Introduce event-driven architecture with message queue
      - Break synchronous dependency chain
      - Consider service mesh or API gateway pattern

    Cycle 2 Analysis:
    - Path: Audit Logger → Config Service → Audit Logger
    - Type: Platform service mutual dependency
    - Severity: MEDIUM
    - Impact: Bootstrap complexity, coordination required
    - Remediation:
      - Deploy as unit (coordinated deployment)
      - Extract shared bootstrap configuration
      - Consider sidecar pattern for config

    Educational callouts:
    - "Notice: Most of the graph is a healthy DAG (green portion)"
    - "Cycles appear in red—these need architectural review"
    - "Cycle 1 spans multiple business services—problematic tight coupling"
    - "Cycle 2 is a simple mutual dependency—can be managed with deployment coordination"
    - "Graph databases detect these patterns instantly across thousands of nodes!"

    Statistics panel (bottom):
    - Total nodes: 18
    - Total edges: 25
    - Cycles detected: 2
    - Nodes in cycles: 5 (27.8%)
    - Edges in cycles: 4 (16%)
    - Largest cycle length: 3 hops
    - DAG portion size: 13 nodes (72.2%)

    Legend (top-right):
    - Node colors: Default (blue), In cycle (red), DAG portion (green)
    - Edge styles: Normal (solid), In cycle (thick red), Critical path (dashed)
    - Tier indicators: Frontend, Business, Platform, Infrastructure

    Implementation: vis-network JavaScript library with custom cycle detection algorithm (DFS-based), interactive highlighting, dynamic layout with tier positioning, animated cycle path visualization

    Canvas size: 1100x800px with right sidebar (250px) for cycle analysis and bottom panel (150px) for statistics

    Color scheme:
    - Blue: Default application nodes and edges
    - Orange: Database nodes
    - Red: Cycle highlighting
    - Green: DAG portion (healthy architecture)
    - Gray: Infrastructure tier
```

## Related Resources

- [Chapter 5: Graph Database Technologies](../../chapters/05-graph-database-technologies/index.md)
