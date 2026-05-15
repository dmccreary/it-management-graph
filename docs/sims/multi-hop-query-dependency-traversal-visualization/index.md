---
title: Multi-Hop Query Dependency Traversal Visualization
description: Multi-Hop Query Dependency Traversal Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# Multi-Hop Query Dependency Traversal Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: microsim

    Learning objective: Demonstrate how multi-hop queries traverse dependency chains in relational databases, showing the increasing complexity and intermediate result sets as hop count increases

    Canvas layout (900x700px):
    - Left side (600x700): Drawing area showing application dependency network
    - Right side (300x700): Control panel and statistics

    Visual elements in drawing area:
    - 12 application nodes arranged in a directed acyclic graph structure
    - Each node labeled with application name
    - Directed edges showing dependencies (arrows point from dependent to dependency)
    - Color coding for nodes based on hop distance from selected root application

    Sample application dependency network:
    - Customer Portal (root) → [Auth Service, API Gateway, Session Store]
    - Auth Service → [User Database, LDAP Service]
    - API Gateway → [Payment Service, Inventory Service]
    - Payment Service → [Payment Database, Fraud Detection]
    - Inventory Service → [Inventory Database]
    - Fraud Detection → [ML Model Service]

    Interactive controls (right panel):
    - Dropdown: "Select root application" (default: Customer Portal)
    - Button: "Reset visualization"
    - Slider: "Hop limit" (1-5 hops, default: 3)
    - Button: "Traverse 1 hop" (manual step-through)
    - Button: "Traverse all hops" (animated traversal)
    - Checkbox: "Show SQL query" (display equivalent SQL)
    - Display panel: Statistics updated in real-time

    Behavior:
    When user clicks "Traverse all hops":
    1. Start at selected root application (highlight in green)
    2. Animate traversal to 1-hop neighbors (highlight in yellow)
    3. Show intermediate result count
    4. Continue to 2-hop neighbors (highlight in orange)
    5. Show growing intermediate result count
    6. Continue up to hop limit
    7. Final nodes highlighted in red

    When "Show SQL query" checked:
    Display the equivalent SQL JOIN query for current hop level
    - 1-hop: Single JOIN
    - 2-hop: Double JOIN
    - 3-hop: Triple JOIN
    - Show query complexity growing with hop count

    Statistics display:
    - Current hop level: X
    - Applications discovered: Y
    - Intermediate result set size: Z rows
    - Query complexity: "N table JOINs required"
    - Estimated RDBMS query time: (calculated based on hop count)

    Example stats after 3-hop traversal from Customer Portal:
    - Hop level: 3
    - Applications discovered: 11
    - Intermediate results: 847 rows (showing join explosion)
    - Query complexity: 4 table JOINs
    - Estimated time: 450ms

    Visual styling:
    - Node colors by hop distance:
      - Green: Root (0 hops)
      - Light green: 1 hop
      - Yellow: 2 hops
      - Orange: 3 hops
      - Red: 4-5 hops
      - Gray: Not yet discovered
    - Edge thickness: Thin, uniform
    - Edges highlight during traversal animation
    - Smooth animation transitions between hops (500ms duration)

    Educational insights displayed:
    - "Notice how intermediate result set size grows exponentially"
    - "Each JOIN multiplies potential result rows"
    - "At 5 hops, query may scan thousands of intermediate rows to find final results"
    - "Graph databases avoid this explosion with direct pointer traversal"

    Default parameters:
    - Root application: Customer Portal
    - Hop limit: 3
    - Animation speed: 500ms per hop
    - Show SQL: enabled

    Implementation notes:
    - Use p5.js for canvas rendering
    - Store dependency graph as adjacency list
    - Implement breadth-first search for hop-based traversal
    - Calculate intermediate result set size by multiplying average fan-out per hop
    - Generate SQL text dynamically based on hop count
    - Use color interpolation for smooth hop distance visualization
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
