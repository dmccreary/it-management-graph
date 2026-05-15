---
title: JOIN Types Comparison Interactive Visualization
description: JOIN Types Comparison Interactive Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# JOIN Types Comparison Interactive Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: infographic

    Purpose: Create an interactive visualization demonstrating different JOIN types using Venn diagrams and sample data, showing how each JOIN type affects which rows appear in results

    Layout: 1000x800px canvas with three sections

    Section 1 (1000x150px): Table data display
    Show two small sample tables side by side:

    Servers Table:
    | server_id | hostname |
    |-----------|----------|
    | 1 | web-prod-01 |
    | 2 | db-prod-01 |
    | 3 | app-dev-01 |

    Applications Table:
    | app_id | app_name | server_id |
    |--------|----------|-----------|
    | 501 | Customer Portal | 1 |
    | 502 | Payment API | 1 |
    | 503 | Inventory System | 2 |
    | 504 | Orphan App | 99 |

    Note: Server 3 has no applications. Application 504 references non-existent server 99.

    Section 2 (1000x400px): Interactive JOIN type selector with Venn diagrams

    Five buttons arranged horizontally:
    [INNER JOIN] [LEFT JOIN] [RIGHT JOIN] [FULL OUTER JOIN] [CROSS JOIN]

    When button clicked, display:
    - Venn diagram showing which portions of tables are included (shaded regions)
    - SQL syntax example
    - Result table with actual rows

    INNER JOIN visualization:
    - Venn diagram: Only intersection shaded
    - SQL: `SELECT * FROM Servers s INNER JOIN Applications a ON s.server_id = a.server_id`
    - Results: 3 rows (server 1 appears twice for its two apps, server 2 once, server 3 excluded, orphan app excluded)

    LEFT JOIN visualization:
    - Venn diagram: Entire left circle + intersection shaded
    - SQL: `SELECT * FROM Servers s LEFT JOIN Applications a ON s.server_id = a.server_id`
    - Results: 4 rows (includes server 3 with NULL for app columns, excludes orphan app)

    FULL OUTER JOIN visualization:
    - Venn diagram: Both circles entirely shaded
    - SQL: `SELECT * FROM Servers s FULL OUTER JOIN Applications a ON s.server_id = a.server_id`
    - Results: 5 rows (includes server 3 with NULL app columns, includes orphan app with NULL server columns)

    Section 3 (1000x250px): Result interpretation panel

    Displays explanation based on selected JOIN type:
    - Row count and composition
    - Which entities are included/excluded and why
    - NULL handling explanation
    - Common use cases for this JOIN type

    Interactive elements:
    - Click JOIN type button to switch visualization
    - Hover over Venn diagram regions to highlight corresponding rows in result table
    - Toggle switch: "Show NULL values explicitly" vs "Hide NULL cells"
    - Highlight button: "Show orphan rows" (rows with no matching counterpart)

    Visual style: Clean, modern design with clear typography and color coding

    Color scheme:
    - Left Venn circle (Servers): Blue
    - Right Venn circle (Applications): Orange
    - Intersection: Purple (blend of blue and orange)
    - Result table: Alternate row shading for readability
    - NULL values: Gray italic text or empty with dashed border
    - Orphan rows: Light red background highlight

    Implementation: HTML/CSS/JavaScript with SVG for Venn diagrams, dynamic table rendering based on JOIN type selection

    Educational notes included in hover text:
    - "INNER JOIN most common in practice (80%+ of queries)"
    - "LEFT JOIN useful for finding missing relationships"
    - "FULL OUTER JOIN rare, often indicates data quality issues"
    - "CROSS JOIN creates row count = Table A rows × Table B rows (use with caution!)"
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
