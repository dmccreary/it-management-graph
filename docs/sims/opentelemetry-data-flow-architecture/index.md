---
title: OpenTelemetry Data Flow Architecture
description: OpenTelemetry Data Flow Architecture
status: scaffold
library: TBD
bloom_level: TBD
---

# OpenTelemetry Data Flow Architecture

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

    Purpose: Show how OpenTelemetry collects telemetry from applications and sends it to observability backends, enabling automated IT graph updates

    Components to show (left to right flow):

    Layer 1 - Applications (left side):
    - Three application boxes stacked vertically:
      * "Web Application" (light blue box)
      * "API Service" (light blue box)
      * "Background Worker" (light blue box)
    - Each box contains small icon: "{}" representing code
    - Label above: "Instrumented Applications"

    Layer 2 - OpenTelemetry SDK (middle-left):
    - Three small boxes attached to each application box:
      * "OTel SDK" (gold boxes)
    - Arrows showing data flowing from applications into SDK boxes
    - Label: "Automatic instrumentation captures logs, metrics, traces"

    Layer 3 - OpenTelemetry Collector (center):
    - Large central box labeled "OpenTelemetry Collector"
    - Three sections inside:
      * Top: "Receivers" (receives from SDKs)
      * Middle: "Processors" (enriches, filters, batches)
      * Bottom: "Exporters" (sends to backends)
    - Color: Orange with white text
    - Arrows from SDK boxes pointing into Receivers section

    Layer 4 - Backend Systems (right side):
    - Three destination boxes stacked vertically:
      * "Observability Platform" (green box) with chart icon
      * "IT Management Graph" (pink box) with network icon
      * "SIEM / Analytics" (purple box) with dashboard icon
    - Arrows from Exporters section pointing to each backend

    Visual details:
    - All arrows should be solid lines with arrowheads
    - Flow direction: strictly left to right
    - Include small data icons on arrows (log lines, metric points, trace spans)

    Annotations:
    - Above arrows from apps to SDKs: "Telemetry generated"
    - Above arrows from SDKs to Collector: "OTLP protocol"
    - Above arrows from Collector to backends: "Exported to multiple destinations"
    - Below IT Management Graph box: "Dependencies auto-discovered from traces"

    Additional visual elements:
    - Dashed border around entire left side (apps + SDKs) labeled "Your Infrastructure"
    - Dashed border around Collector labeled "Telemetry Pipeline"
    - Dashed border around right side labeled "Observability Backends"

    Style: Clean, modern architecture diagram with clear directional flow

    Color scheme:
    - Applications: Light blue (#E3F2FD)
    - OTel SDKs: Gold (#FFD54F)
    - Collector: Orange (#FF9800)
    - Observability Platform: Green (#4CAF50)
    - IT Management Graph: Pink (#E91E63)
    - SIEM: Purple (#9C27B0)
    - Arrows: Dark gray (#424242)
    - Background: White
    - Border boxes: Dashed light gray

    Labels:
    - Clear, readable font
    - Each component should have a name and brief description

    Implementation: Draw.io, Lucidchart, or SVG diagram
```

## Related Resources

- [Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md)
