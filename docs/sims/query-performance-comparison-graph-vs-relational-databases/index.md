---
title: Query Performance Comparison: Graph vs Relational Databases
description: Query Performance Comparison: Graph vs Relational Databases
status: scaffold
library: TBD
bloom_level: TBD
---

# Query Performance Comparison: Graph vs Relational Databases

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Query Performance And Real Time Ops](../../chapters/09-query-performance-and-real-time-ops/index.md).

```text
Type: chart

    Chart type: Bar chart with logarithmic scale

    Purpose: Demonstrate the dramatic performance difference between graph and relational databases as query complexity increases

    Visual Description:
    This chart displays two sets of vertical bars side by side for each hop count, creating a striking visual comparison. The X-axis shows the number of relationship hops (1, 2, 3, 4, and 5 hops), while the Y-axis uses a logarithmic scale to show query response time in milliseconds, ranging from 1ms to 1,000,000ms (16.7 minutes).

    The orange bars representing RDBMS performance start relatively small at 1 hop but grow exponentially taller with each additional hop, creating a dramatic ascending pattern. By 5 hops, the orange bar extends nearly to the top of the chart, representing catastrophic performance degradation.

    In sharp contrast, the gold bars representing graph database performance remain remarkably consistent and short across all hop counts, staying near the bottom of the chart even at 5 hops. This creates a powerful visual message: while relational database performance degrades exponentially, graph database performance remains nearly constant.

    Data series:
    1. RDBMS Multi-Hop Queries (orange bars):
       - 1 hop: 12ms
       - 2 hops: 180ms
       - 3 hops: 3,200ms (3.2 seconds)
       - 4 hops: 58,000ms (58 seconds)
       - 5 hops: 920,000ms (15.3 minutes - many queries time out)

    2. Graph Database Traversals (gold bars):
       - 1 hop: 4ms
       - 2 hops: 6ms
       - 3 hops: 9ms
       - 4 hops: 12ms
       - 5 hops: 15ms

    Chart title: "Multi-Hop Query Performance: Exponential RDBMS Degradation vs Constant Graph Traversal"

    Axis labels:
    - X-axis: "Number of Relationship Hops"
    - Y-axis: "Query Response Time (milliseconds, log scale)"

    Legend:
    Position top-right, showing:
    - Orange square: "RDBMS with JOIN operations"
    - Gold square: "Graph Database with native traversal"

    Annotations:
    - Orange arrow pointing to RDBMS 5-hop bar: "Query timeout! Many systems give up after 2-5 minutes"
    - Gold callout box near graph series: "Index-free adjacency enables constant-time traversals"
    - Green checkmark next to 1-hop comparison: "Both perform well for simple queries"
    - Red warning icon next to 4-hop and 5-hop RDBMS bars: "Unusable for real-time operations"

    Grid lines: Horizontal grid lines at 10ms, 100ms, 1,000ms, 10,000ms, 100,000ms, 1,000,000ms to help readers identify values on the logarithmic scale

    Implementation: Chart.js or D3.js with custom annotations and logarithmic Y-axis scaling
```

## Related Resources

- [Chapter 9: Query Performance And Real Time Ops](../../chapters/09-query-performance-and-real-time-ops/index.md)
