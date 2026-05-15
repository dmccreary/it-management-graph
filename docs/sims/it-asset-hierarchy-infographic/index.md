---
title: IT Asset Hierarchy Infographic
description: IT Asset Hierarchy Infographic
status: scaffold
library: TBD
bloom_level: TBD
---

# IT Asset Hierarchy Infographic

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Intro To Itil And Config Mgmt](../../chapters/01-intro-to-itil-and-config-mgmt/index.md).

```text
Type: infographic

    Purpose: Show the hierarchical relationships between different types of IT assets with examples and clickable details

    Layout: Circular/radial design with "IT Assets" at center, three major categories radiating outward

    Center: "IT Assets" (large circle, blue)

    Primary Branches (from center):
    1. Hardware Assets (orange segment, top)
    2. Software Assets (gold segment, right)
    3. Digital Services/Information Assets (green segment, left)

    Secondary Level - Hardware Assets:
    - Servers (with icon)
    - Network Equipment (with icon)
    - End-User Devices (with icon)
    - Storage Systems (with icon)

    Secondary Level - Software Assets:
    - Applications (with icon)
    - Operating Systems (with icon)
    - Middleware (with icon)
    - Licenses (with icon)

    Secondary Level - Digital Services:
    - SaaS Subscriptions (with icon)
    - Cloud Resources (with icon)
    - Data Assets (with icon)
    - APIs/Integrations (with icon)

    Interactive elements:
    - Hover over any category: Show definition and management considerations
    - Click on category: Expand panel showing:
      - Typical lifecycle (procurement → deployment → operation → retirement)
      - Key management challenges
      - Integration with CMDB
      - Example items
    - Size of segments proportional to typical percentage of IT portfolio

    Visual styling:
    - Modern flat design with subtle gradients
    - Clear icons for each asset type
    - Connecting lines from center to categories
    - Color coding: Orange (hardware), Gold (software), Green (digital services)

    Additional details panel (shown on click):
    For each category, show:
    - Management focus (financial vs. operational)
    - Update frequency (stable vs. dynamic)
    - Primary stakeholders
    - Typical tracking attributes

    Implementation: HTML/CSS/JavaScript with SVG for radial layout, JSON data for content
```

## Related Resources

- [Chapter 1: Intro To Itil And Config Mgmt](../../chapters/01-intro-to-itil-and-config-mgmt/index.md)
