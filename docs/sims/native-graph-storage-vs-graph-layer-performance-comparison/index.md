---
title: Native Graph Storage vs Graph Layer Performance Comparison
description: Native Graph Storage vs Graph Layer Performance Comparison
status: scaffold
library: TBD
bloom_level: TBD
---

# Native Graph Storage vs Graph Layer Performance Comparison

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Graph Database Technologies](../../chapters/05-graph-database-technologies/index.md).

```text
Type: chart

    Chart type: Line chart with logarithmic Y-axis

    Purpose: Visually demonstrate the performance difference between native graph storage and graph layers as traversal depth increases, showing why native architecture matters for deep graph queries

    X-axis: Number of hops (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    Y-axis: Query response time (milliseconds, logarithmic scale: 1, 10, 100, 1000, 10000, 60000+)

    Data series:

    1. "Native Graph Database (Neo4j)" (green line, solid, thick)
       - 1 hop: 4ms
       - 2 hops: 7ms
       - 3 hops: 11ms
       - 4 hops: 14ms
       - 5 hops: 18ms
       - 6 hops: 21ms
       - 7 hops: 25ms
       - 8 hops: 28ms
       - 9 hops: 32ms
       - 10 hops: 35ms

    2. "Graph Layer on RDBMS (PostgreSQL + AGE)" (orange line, dashed, medium)
       - 1 hop: 12ms
       - 2 hops: 145ms
       - 3 hops: 1,400ms
       - 4 hops: 8,500ms
       - 5 hops: 35,000ms
       - 6 hops: 58,000ms (near timeout)
       - 7 hops: timeout
       - 8 hops: timeout
       - 9 hops: timeout
       - 10 hops: timeout

    3. "Graph Layer on Document Store (MongoDB + graph plugin)" (blue line, dotted, medium)
       - 1 hop: 18ms
       - 2 hops: 210ms
       - 3 hops: 2,100ms
       - 4 hops: 12,000ms
       - 5 hops: 48,000ms
       - 6 hops: timeout
       - 7 hops: timeout
       - 8 hops: timeout
       - 9 hops: timeout
       - 10 hops: timeout

    Title: "Graph Traversal Performance: Native Storage vs Graph Layers"
    Subtitle: "Why architectural decisions matter for deep dependency queries"

    Legend: Position top-left, with line style indicators and performance characteristics

    Annotations:
    - Horizontal line at 1000ms (1 second) with label: "Acceptable response time for interactive queries"
    - Horizontal line at 60000ms (1 minute) with label: "Typical query timeout threshold"
    - Callout arrow pointing to native graph line at 10 hops: "Still under 40ms—ready for real-time use!"
    - Callout arrow pointing to graph layer at 5 hops: "Already exceeding acceptable response time"
    - Shaded "timeout region" above 60,000ms with label: "Queries fail—unusable for this depth"
    - Annotation: "Native graph maintains near-linear growth—each hop adds ~3-4ms"
    - Annotation: "Graph layers show exponential degradation—each hop multiplies query time"

    Performance summary table below chart:
    | Hops | Native Graph | Graph Layer (RDBMS) | Graph Layer (Document) | Performance Gap |
    |------|--------------|---------------------|------------------------|-----------------|
    | 1 | 4ms | 12ms | 18ms | 3-4.5x |
    | 3 | 11ms | 1,400ms | 2,100ms | 127-191x |
    | 5 | 18ms | 35,000ms | 48,000ms | 1,944-2,667x |
    | 10 | 35ms | timeout | timeout | >1,700x (estimated) |

    Interactive features:
    - Hover over data points to see exact query times and context
    - Click legend items to show/hide specific series
    - Toggle button: "Show as linear scale" vs "Show as logarithmic scale"
    - Zoom controls for examining specific hop ranges
    - Tooltip on hover: "At X hops, native graph is Y times faster than graph layer"

    Visual style: Professional line chart with clear contrast between series, grid lines for readability

    Color scheme:
    - Green (Native): Success/optimal performance
    - Orange (RDBMS graph layer): Warning/degrading performance
    - Blue (Document graph layer): Info/alternative approach
    - Red shaded region: Timeout/failure zone
    - Gray grid lines with logarithmic spacing

    Implementation: Chart.js or D3.js with logarithmic Y-axis scale, interactive legend, and dynamic tooltips

    Educational note at bottom:
    "Benchmark conditions: 500,000 nodes, average 4 connections per node, Intel Xeon processor, 32GB RAM, SSD storage. Results representative of typical enterprise workloads. Native graph database (Neo4j 5.x) vs Apache AGE on PostgreSQL 15 vs MongoDB with graph capabilities."

    Key insight callout:
    "For IT dependency management requiring 5-10 hop traversals in real-time (incident response, change impact analysis), native graph storage isn't just faster—it's the only architecturally viable option!"
```

## Related Resources

- [Chapter 5: Graph Database Technologies](../../chapters/05-graph-database-technologies/index.md)
