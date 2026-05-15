---
title: SQL Query Execution Visualization
description: SQL Query Execution Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# SQL Query Execution Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: workflow

    Purpose: Show the step-by-step process of how an SQL query is parsed, optimized, and executed by an RDBMS

    Visual style: Flowchart with process boxes and data flow

    Steps:

    1. Start: "Developer writes SQL query"
       Hover text: "Example: SELECT hostname FROM Servers WHERE status = 'active'"
       Input: SQL text string

    2. Process: "Parser validates syntax"
       Hover text: "Checks SQL grammar, table and column names exist, data types match. Builds parse tree."
       Output: Parse tree or syntax error

    3. Decision: "Syntax valid?"
       Hover text: "If syntax errors found, return error to user. Otherwise continue."
       Paths: Yes → continue, No → return error

    4. Process: "Query optimizer generates execution plans"
       Hover text: "Creates multiple possible ways to execute query: which indexes to use, join order, access methods. Estimates cost of each plan based on table statistics."
       Output: Multiple candidate execution plans with cost estimates

    5. Process: "Select lowest-cost execution plan"
       Hover text: "Chooses plan with minimum estimated I/O operations, CPU usage, and memory. Common optimizations: index seeks vs. table scans, join algorithms (nested loop, hash, merge)."
       Output: Optimal execution plan

    6. Process: "Execute plan: Access storage layer"
       Hover text: "Reads data pages from disk or buffer cache. Uses indexes if beneficial. Applies filters and joins according to plan."
       Output: Intermediate result set

    7. Process: "Apply sorting, aggregation, limits"
       Hover text: "Performs ORDER BY, GROUP BY, HAVING, LIMIT operations on result set. May require temporary storage for large sorts."
       Output: Final result set

    8. End: "Return results to user"
       Hover text: "Results formatted as rows and columns, returned to application or displayed to user"
       Output: Query results

    Side panel: "Query statistics"
    - Execution time: 45ms
    - Rows scanned: 10,000
    - Rows returned: 127
    - Index used: idx_servers_status
    - Query cost: 312 units

    Annotations:
    - Note at optimizer step: "Optimization is where RDBMS 'intelligence' lives. Good indexes and statistics dramatically improve performance."
    - Note at execution step: "This is where actual I/O happens. Disk access is slowest part."
    - Highlight showing feedback loop: "Statistics collector updates table stats based on query execution, improving future optimizations"

    Color coding:
    - Blue: Parsing and validation
    - Orange: Optimization (most complex step)
    - Green: Execution and results
    - Red: Error paths

    Swimlanes:
    - User/Application layer
    - SQL Engine (parser, optimizer)
    - Storage Engine (data access)

    Implementation: Flowchart with interactive hover text, possibly using D3.js or Mermaid.js for web-based rendering
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
