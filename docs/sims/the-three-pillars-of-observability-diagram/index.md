---
title: The Three Pillars of Observability Diagram
description: The Three Pillars of Observability Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# The Three Pillars of Observability Diagram

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md).

```text
Type: diagram

    Purpose: Illustrate how logs, metrics, and traces work together to provide complete observability of IT systems

    Components to show:
    - Central hexagon labeled "Complete Observability"
    - Three equal-sized circles surrounding the hexagon, one for each pillar
    - Circle 1 (top): "Logs" with icon of document/file lines
    - Circle 2 (bottom-left): "Metrics" with icon of line chart
    - Circle 3 (bottom-right): "Traces" with icon of connected nodes/flowchart

    Visual details for each pillar:
    - Logs circle (blue): Shows example log entry "2025-01-15 14:32:10 ERROR: Connection timeout to DB server"
    - Metrics circle (green): Shows small line graph trending upward with label "Request Rate"
    - Traces circle (orange): Shows simple service flow diagram "API → Auth → Database"

    Connections:
    - Bidirectional arrows connecting each pillar circle to the central hexagon
    - Arrow labels showing the value each pillar provides:
      * Logs → Center: "What happened?"
      * Metrics → Center: "How much/many?"
      * Traces → Center: "Where in the flow?"

    Additional visual elements:
    - Light gray dashed lines connecting the three pillar circles to each other, forming a triangle
    - Labels on these connecting lines: "Correlated insights"
    - Small icons around the central hexagon: magnifying glass, lightbulb, shield (representing investigation, insights, and reliability)

    Style: Modern, clean diagram with rounded shapes

    Color scheme:
    - Central hexagon: Gold with white text
    - Logs circle: Blue (#4A90E2)
    - Metrics circle: Green (#7ED321)
    - Traces circle: Orange (#F5A623)
    - Background: White or very light gray
    - Arrows: Dark gray (#4A4A4A)

    Labels and annotations:
    - Title at top: "The Three Pillars of Observability"
    - Subtitle below each circle briefly describing its purpose:
      * Logs: "Event-level detail"
      * Metrics: "Aggregated measurements"
      * Traces: "Request journey"

    Implementation: SVG diagram or tool like draw.io, Lucidchart
```

## Related Resources

- [Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md)
