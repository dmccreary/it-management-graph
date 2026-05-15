---
title: Application Portfolio Strategic Quadrant with Dependency Visualization
description: Application Portfolio Strategic Quadrant with Dependency Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# Application Portfolio Strategic Quadrant with Dependency Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md).

```text
Type: infographic

    Purpose: Create an interactive application portfolio quadrant (business value vs. technical quality) where clicking applications reveals their dependency networks, demonstrating why portfolio decisions cannot be made in isolation

    Layout: 800x700px canvas divided into two sections

    Section 1 (800x500px): Portfolio quadrant chart
    - X-axis: Technical Quality (0-10, left to right)
    - Y-axis: Business Value (0-10, bottom to top)
    - Four quadrants with labels:
      - Top-right (high value, high quality): "Invest" (green)
      - Top-left (high value, low quality): "Migrate" (yellow)
      - Bottom-right (low value, high quality): "Maintain" (blue)
      - Bottom-left (low value, low quality): "Retire" (red)

    Section 2 (800x200px): Dependency detail panel (initially hidden)

    Sample applications plotted as bubbles (size = user count):
    - "Customer Portal" (9,8) - Invest quadrant - 5,000 users
    - "Legacy Billing System" (2,9) - Migrate quadrant - 800 users
    - "Internal Tools Suite" (7,3) - Maintain quadrant - 200 users
    - "Old Reporting Engine" (3,2) - Retire quadrant - 50 users
    - "ERP Core" (6,8) - Invest quadrant - 2,000 users
    - "Spreadsheet Automation Tool" (4,2) - Retire quadrant - 30 users

    Interactive elements:
    - Hover over bubble: Show application name, value score, quality score, user count
    - Click bubble: Expand dependency panel showing:
      - Upstream dependencies: "Depends on X applications"
      - Downstream dependencies: "Supports Y applications and Z business services"
      - Mini graph visualization showing clicked app and immediate neighbors
      - Dependency complexity score (calculated from graph metrics)
    - Hover over quadrant: Highlight all applications in that quadrant
    - Toggle button: Show/hide dependency complexity as bubble color intensity

    Example insight for "Old Reporting Engine" (Retire quadrant):
    - When clicked, dependency panel reveals:
      - "Depends on: Legacy Billing System, ERP Core"
      - "Supports: 3 regulatory reporting business services (CRITICAL)"
      - "Cannot retire until replacement reporting capability deployed"
      - Dependency complexity: HIGH (blocks critical business functions)

    Visual style: Modern scatter plot with translucent bubbles, grid lines, and professional color scheme

    Color scheme:
    - Quadrant backgrounds: Light tints of green/yellow/blue/red
    - Application bubbles: Solid colors based on quadrant or gradient based on dependency complexity
    - Dependency panel: White background with graph visualization in navy blue

    Implementation: D3.js for interactive quadrant chart with click handlers to reveal dependency analysis pulled from IT management graph data
```

## Related Resources

- [Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md)
