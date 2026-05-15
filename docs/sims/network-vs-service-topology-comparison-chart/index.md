---
title: Network vs. Service Topology Comparison Chart
description: Network vs. Service Topology Comparison Chart
status: scaffold
library: TBD
bloom_level: TBD
---

# Network vs. Service Topology Comparison Chart

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md).

```text
Type: chart

    Purpose: Illustrate the differences in discovery methods, data sources, and use cases between network topology and service topology mapping

    Chart type: Grouped horizontal bar chart with two groups (Network Topology and Service Topology) comparing multiple attributes

    Canvas size: 800x600px

    Y-axis categories (from top to bottom):
    1. "Discovery Speed"
    2. "Change Frequency"
    3. "Dependency Accuracy"
    4. "Business Relevance"
    5. "Automation Level"

    X-axis: Percentage scale from 0% to 100% in increments of 20%
    - Grid lines at each 20% increment (light gray, thin lines)
    - Axis label: "Capability Level (%)"

    Visual structure:
    For each Y-axis category, show two horizontal bars side by side:
    - Top bar (orange): Network Topology
    - Bottom bar (gold): Service Topology

    Data values and bar lengths:

    1. Discovery Speed:
       - Network Topology: 70% (orange bar extending to 70% mark)
       - Service Topology: 85% (gold bar extending to 85% mark)
       - Annotation: Small icon of a stopwatch next to this category

    2. Change Frequency:
       - Network Topology: 30% (orange bar extending to 30% mark)
       - Service Topology: 90% (gold bar extending to 90% mark)
       - Annotation: Small icon of a refresh/cycle symbol

    3. Dependency Accuracy:
       - Network Topology: 60% (orange bar extending to 60% mark)
       - Service Topology: 95% (gold bar extending to 95% mark)
       - Annotation: Small icon of a target/bullseye

    4. Business Relevance:
       - Network Topology: 45% (orange bar extending to 45% mark)
       - Service Topology: 88% (gold bar extending to 88% mark)
       - Annotation: Small icon of a briefcase

    5. Automation Level:
       - Network Topology: 75% (orange bar extending to 75% mark)
       - Service Topology: 92% (gold bar extending to 92% mark)
       - Annotation: Small icon of a gear/cog

    Bar styling:
    - Network Topology bars: Solid orange fill (#FF9800) with subtle gradient to lighter orange at right edge
    - Service Topology bars: Solid gold fill (#FFD700) with subtle gradient to lighter gold at right edge
    - Each bar has a thin dark border (1px, #666666)
    - Bar height: 30px each
    - Spacing between bars in same category: 5px
    - Spacing between categories: 20px

    Value labels:
    - Display percentage value at the end of each bar (inside the bar if >50%, outside if <50%)
    - Font: Bold, 14px, dark gray (#333333) for outside labels, white for inside labels
    - Example: "70%" appears at the end of Network Topology Discovery Speed bar

    Title and legend:
    - Chart title (top, centered, 20px font, bold): "Network Topology vs. Service Topology: Comparative Capabilities"
    - Subtitle (below title, 14px font, gray): "Higher percentages indicate better performance in each category"
    - Legend (top right corner):
      * Orange rectangle: "Network Topology"
      * Gold rectangle: "Service Topology"

    Annotations and callouts:
    - Arrow pointing to Service Topology "Change Frequency" bar with text: "Services change frequently with deployments"
    - Arrow pointing to Network Topology "Discovery Speed" bar with text: "SNMP/LLDP provide fast device discovery"
    - Arrow pointing to Service Topology "Business Relevance" bar with text: "Directly maps to business services"

    Additional visual elements:
    - Light gray horizontal reference line at 50% mark (dashed line)
    - Label on reference line: "Baseline" (small, gray font)
    - Subtle shadow effect beneath each bar for depth (2px blur, 20% opacity black)

    Background:
    - Main chart area: White
    - Border: Thin light gray border around entire chart (1px, #CCCCCC)
    - Grid: Very light gray vertical lines at each 20% increment (#F0F0F0)

    Contextual data table (below chart):
    Small table showing the key technologies for each topology type:

    | Topology Type | Key Discovery Technologies |
    |---------------|---------------------------|
    | Network | SNMP, LLDP, CDP, NetFlow, BGP analysis |
    | Service | OpenTelemetry, Service Mesh, Distributed Tracing, eBPF |

    Implementation: Chart.js, D3.js, or similar JavaScript charting library with custom styling
    Export format: Interactive HTML/JavaScript that allows hovering over bars to see additional details
```

## Related Resources

- [Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md)
