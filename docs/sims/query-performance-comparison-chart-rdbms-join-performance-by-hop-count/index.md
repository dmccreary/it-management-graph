---
title: Query Performance Comparison Chart: RDBMS JOIN Performance by Hop Count
description: Query Performance Comparison Chart: RDBMS JOIN Performance by Hop Count
status: scaffold
library: TBD
bloom_level: TBD
---

# Query Performance Comparison Chart: RDBMS JOIN Performance by Hop Count

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: chart

    Chart type: Line chart with logarithmic Y-axis

    Purpose: Demonstrate exponential performance degradation in RDBMS multi-hop queries compared to constant-time graph database traversal

    X-axis: Number of hops (1, 2, 3, 4, 5, 6)
    Y-axis: Query response time (milliseconds, logarithmic scale: 1, 10, 100, 1000, 10000, 60000+)

    Data series:

    1. "RDBMS without indexes" (red line, dashed):
       - 1 hop: 50ms
       - 2 hops: 800ms
       - 3 hops: 8,500ms
       - 4 hops: 45,000ms
       - 5 hops: 180,000ms (timeout indicator)
       - 6 hops: N/A (query timeout)

    2. "RDBMS with optimal indexes" (orange line, solid):
       - 1 hop: 8ms
       - 2 hops: 95ms
       - 3 hops: 1,200ms
       - 4 hops: 12,000ms
       - 5 hops: 65,000ms (timeout warning)
       - 6 hops: N/A (query timeout)

    3. "Graph database (for comparison)" (green line, solid):
       - 1 hop: 5ms
       - 2 hops: 9ms
       - 3 hops: 13ms
       - 4 hops: 17ms
       - 5 hops: 21ms
       - 6 hops: 25ms

    Title: "Multi-Hop Query Performance: RDBMS vs Graph Database"
    Subtitle: "Why relational databases struggle with transitive dependencies"

    Legend: Position top-right, with line style indicators

    Annotations:
    - Horizontal line at 1000ms (1 second) with label: "Acceptable user experience threshold"
    - Horizontal line at 60000ms (1 minute) with label: "Typical query timeout"
    - Arrow pointing to RDBMS 4-hop: "Enterprise CMDBs often require 5-10 hops for impact analysis"
    - Annotation on graph database line: "Nearly constant time per hop (index-free adjacency)"
    - Shaded region above 10,000ms labeled: "Unusable for real-time queries"

    Data table below chart showing exact values:
    | Hops | RDBMS (no index) | RDBMS (indexed) | Graph DB |
    |------|------------------|-----------------|----------|
    | 1 | 50ms | 8ms | 5ms |
    | 2 | 800ms | 95ms | 9ms |
    | 3 | 8,500ms | 1,200ms | 13ms |
    | 4 | 45,000ms | 12,000ms | 17ms |
    | 5 | 180,000ms (timeout) | 65,000ms | 21ms |
    | 6 | N/A | N/A | 25ms |

    Interactive features:
    - Hover over data points to see exact values and context
    - Click legend items to show/hide series
    - Tooltip on hover showing: "At 4 hops, RDBMS requires 4 JOIN operations scanning intermediate result sets. Graph DB follows direct pointers."

    Visual style: Professional line chart with clear axis labels, grid lines, and contrasting colors

    Color scheme:
    - Red (RDBMS no index): Danger/slow
    - Orange (RDBMS indexed): Warning/moderate
    - Green (Graph DB): Success/fast
    - Gray grid lines
    - Logarithmic scale clearly labeled on Y-axis

    Implementation: Chart.js, D3.js, or similar JavaScript charting library with interactive tooltips and legend controls

    Note at bottom: "Data based on benchmarks with 100,000 node dataset, average fan-out of 3 dependencies per node, PostgreSQL vs Neo4j"
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
