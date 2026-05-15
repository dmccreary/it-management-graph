---
title: Multi-Source Asset Discovery Integration Timeline
description: Multi-Source Asset Discovery Integration Timeline
status: scaffold
library: TBD
bloom_level: TBD
---

# Multi-Source Asset Discovery Integration Timeline

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md).

```text
Type: timeline

    Time period: 1990-2025

    Orientation: Horizontal

    Purpose: Show the evolution of IT asset discovery techniques from manual inventory through modern automated telemetry integration

    Events:
    - 1990: Manual inventory spreadsheets
      Detail: IT staff physically inventory equipment with serial numbers recorded in Excel. Update frequency: annually or when problems arise.

    - 1995: Barcode scanning and asset tags
      Detail: Physical asset tags with barcodes enable faster inventory counts. Still manual but more systematic. CMDB databases emerge to store asset records.

    - 2000: Network discovery tools (Nmap, enterprise scanners)
      Detail: Automated network scanning identifies active devices by IP address. Detects hardware but limited software visibility. Discovery frequency: weekly.

    - 2005: Agent-based inventory solutions
      Detail: Software agents installed on endpoints report hardware specs, installed software, and configuration to central servers. Real-time updates for managed devices.

    - 2010: Agentless discovery and WMI/SSH
      Detail: Tools leverage Windows Management Instrumentation and SSH to remotely inventory devices without agent installation. Reduces deployment complexity.

    - 2012: Cloud API integration begins
      Detail: Early AWS/Azure API connectors pull virtual machine and storage inventory into asset databases. Cloud resources become visible alongside on-premises.

    - 2015: SaaS discovery through SSO logs
      Detail: Organizations discover shadow SaaS usage by analyzing SSO authentication logs and network traffic patterns. Reveals unsanctioned applications.

    - 2018: Observability tool integration (OpenTelemetry precursors)
      Detail: APM and observability platforms map application dependencies through distributed tracing. Asset discovery merges with dependency mapping.

    - 2020: eBPF and kernel-level telemetry
      Detail: Extended Berkeley Packet Filter enables deep visibility into system calls, network connections, and process execution without traditional agents.

    - 2023: Graph-based multi-source reconciliation
      Detail: IT management graphs integrate network discovery, cloud APIs, software metering, financial systems, and observability into unified asset inventory with automated entity resolution.

    - 2025: AI-assisted discovery and classification
      Detail: Machine learning models automatically classify discovered assets, predict relationships, and identify anomalies. Continuous real-time inventory becomes standard practice.

    Visual style: Horizontal timeline with nodes above and below alternating, connected by a central timeline bar

    Color coding:
    - Red (1990-2000): Manual and semi-automated era
    - Orange (2000-2010): Network discovery and agent deployment
    - Gold (2010-2018): Cloud integration and agentless methods
    - Green (2018-2025): Observability integration and graph-based reconciliation

    Interactive features:
    - Hover to see detailed description and example tools from that era
    - Click to expand with screenshots or diagrams of discovery architecture
    - Visual indicators showing cumulative capabilities (earlier techniques remain relevant alongside newer methods)

    Implementation: HTML/CSS/JavaScript with SVG timeline rendering and expandable detail panels
```

## Related Resources

- [Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md)
