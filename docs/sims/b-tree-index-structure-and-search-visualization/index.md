---
title: B-Tree Index Structure and Search Visualization
description: B-Tree Index Structure and Search Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# B-Tree Index Structure and Search Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: diagram

    Purpose: Illustrate how a B-tree index accelerates data lookup compared to sequential table scanning, showing tree structure and search path

    Visual layout: Split view comparing indexed vs. non-indexed search

    Left side: "Without Index - Full Table Scan"
    - Show table representation with 15 visible rows (indicating larger table extends beyond view)
    - Visual representation of sequential scan from top to bottom
    - Highlight rows being examined one by one
    - Row structure: [server_id | hostname | ip_address | status]
    - Target: Finding server_id = 847
    - Show counter: "Rows scanned: 847 of 10,000"
    - Time indicator: "Search time: ~850ms"

    Right side: "With B-Tree Index on server_id"
    - Show B-tree structure with 3 levels:

      Level 0 (Root node):
      [500, 2500, 7500]

      Level 1 (Internal nodes):
      [100, 250, 400] | [750, 1000, 2000] | [3000, 5000, 6500] | [8000, 9000, 9500]

      Level 2 (Leaf nodes):
      [1,5,12,47...] | [101,105,112...] | [251,255,262...] | ... | [847,851,855...] ← Target found here

    - Show search path highlighted in green:
      1. Start at root: Compare 847 with [500, 2500, 7500] → Go to child 2 (500 < 847 < 2500)
      2. Internal node: Compare 847 with [750, 1000, 2000] → Go to child 2 (750 < 847 < 1000)
      3. Leaf node: Find 847 in sorted leaf entries

    - Leaf node contains pointer to actual table row
    - Arrow from leaf node to actual data row in table (at bottom)

    - Show counter: "Nodes visited: 3"
    - Show comparison count: "Comparisons: 7"
    - Time indicator: "Search time: ~5ms"

    Performance comparison callout:
    "Without index: O(n) - must scan all rows
     With B-tree index: O(log n) - tree height determines search steps
     For 10,000 rows: 10,000 scans vs. ~4 tree levels
     Performance improvement: 170x faster"

    Additional annotations:
    - "B-tree stays balanced: all paths root-to-leaf are same length"
    - "Leaf nodes link to next leaf (dotted arrows) for range scans"
    - "Each node typically contains 100s of entries (simplified here for clarity)"
    - "Index stored separately from table data"

    Example range query illustration (smaller inset):
    Query: "WHERE server_id BETWEEN 840 AND 860"
    Shows how tree navigates to first leaf node (840-860 range), then follows leaf links to scan consecutive entries—much faster than full table scan

    Style: Technical diagram with tree structure, clear node boundaries, and annotated search path

    Color scheme:
    - Green: Search path nodes being traversed
    - Blue: Tree nodes not visited
    - Gold: Target node/value found
    - Gray: Table rows
    - Red: Sequential scan path (for contrast with green index path)

    Implementation: SVG-based diagram with labeled nodes, connecting edges, and annotations. Could be made interactive with step-through animation showing search progression.
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
