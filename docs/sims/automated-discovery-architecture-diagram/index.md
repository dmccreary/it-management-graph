---
title: Automated Discovery Architecture Diagram
description: Automated Discovery Architecture Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# Automated Discovery Architecture Diagram

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

    Purpose: Show the complete architecture of a modern automated discovery system that populates an IT management graph from multiple data sources

    Canvas size: 1200x900px

    Layout: Layered architecture from bottom to top

    Layer 1 - Data Sources (bottom, 1200x150px):
    Background: Light gray (#F5F5F5)
    Label: "Data Sources Layer"

    Components (left to right):
    1. Box: "Infrastructure" (blue)
       - Icons inside: Servers, containers, VMs
       - Label below: "SNMP, SSH, WMI"

    2. Box: "Applications" (green)
       - Icons inside: Code brackets, app windows
       - Label below: "OpenTelemetry, Logs"

    3. Box: "Network Devices" (orange)
       - Icons inside: Switches, routers, firewalls
       - Label below: "LLDP, NetFlow, BGP"

    4. Box: "Cloud Platforms" (purple)
       - Icons inside: AWS, Azure, GCP logos
       - Label below: "Cloud APIs, Events"

    5. Box: "Service Meshes" (teal)
       - Icons inside: Mesh network icon
       - Label below: "Istio, Linkerd APIs"

    Layer 2 - Collection Layer (middle-bottom, 1200x180px):
    Background: Light gold (#FFF9E6)
    Label: "Telemetry Collection & Discovery Agents"

    Components:
    1. Large box: "OpenTelemetry Collector" (gold, left side)
       - Receives arrows from Applications and Service Meshes boxes
       - Icons: Log, metric, trace symbols
       - Size: 250x150px

    2. Box: "eBPF Agents" (gold, center-left)
       - Receives arrows from Infrastructure and Network boxes
       - Icon: Linux kernel symbol
       - Size: 200x150px

    3. Box: "Network Scanners" (gold, center)
       - Receives arrows from Network Devices
       - Icon: Radar/scan symbol
       - Size: 200x150px

    4. Box: "Cloud Discovery" (gold, center-right)
       - Receives arrows from Cloud Platforms
       - Icon: Cloud with magnifying glass
       - Size: 200x150px

    5. Box: "Agent Framework" (gold, right side)
       - Receives arrows from Infrastructure
       - Icon: Software agent icon
       - Size: 200x150px

    Arrows from Layer 1 to Layer 2:
    - Multiple arrows showing data flow from each source to appropriate collectors
    - Labeled with data types: "Metrics", "Traces", "Events", "Scans"
    - Color-coded to match source components

    Layer 3 - Processing Layer (middle-top, 1200x180px):
    Background: Light pink (#FFE6F0)
    Label: "Data Processing & Correlation"

    Components (single large processing box spanning width):
    Box: "Discovery Engine" (pink, 1100x150px, centered)

    Inside Discovery Engine, show 4 sub-components side by side:
    1. "Correlation Engine"
       - Icon: Interconnected nodes
       - Function: "Match entities across sources"

    2. "Dependency Mapper"
       - Icon: Arrow network
       - Function: "Infer relationships from telemetry"

    3. "Change Detector"
       - Icon: Delta symbol
       - Function: "Identify topology changes"

    4. "Enrichment Service"
       - Icon: Plus symbol with data
       - Function: "Add business context"

    Arrows from Layer 2 to Layer 3:
    - All collector boxes send data upward to Discovery Engine
    - Thick arrows indicating high data volume
    - Labeled: "Raw telemetry & discovery data"

    Layer 4 - Storage & Graph (top, 1200x200px):
    Background: Light green (#E8F5E9)
    Label: "IT Management Graph Storage"

    Components:
    1. Large central component: "Graph Database" (green, 500x180px)
       - Icon: Network graph with nodes and edges
       - Internal label: "Neo4j / JanusGraph"
       - Show sample mini-graph with labeled nodes:
         * "Services" (blue nodes)
         * "Infrastructure" (gray nodes)
         * "Applications" (green nodes)
         * "Dependencies" (arrows between nodes)

    2. Side component (right): "Graph API" (green, 250x180px)
       - Icon: API endpoints symbol
       - Labels: "Query API", "Update API", "Subscribe API"

    3. Side component (left): "Change Stream" (green, 250x180px)
       - Icon: River/stream flowing
       - Label: "Real-time graph updates"
       - Shows small timeline with events

    Arrows from Layer 3 to Layer 4:
    - Large arrow from Discovery Engine to Graph Database
    - Labeled: "Graph updates (nodes & edges)"
    - Bidirectional arrow between Discovery Engine and Graph API
    - Label: "Validation queries"

    Layer 5 - Consumers (top overlay, spanning entire width):
    Background: Transparent with dashed border
    Label: "Graph Consumers"

    Components (small boxes across top):
    1. "Impact Analysis Tools" (connected to Graph API)
    2. "Service Catalog" (connected to Graph API)
    3. "Monitoring Dashboards" (connected to Change Stream)
    4. "Automation Systems" (connected to Graph API)
    5. "Compliance Tools" (connected to Graph API)

    Arrows: From Graph API and Change Stream to respective consumers

    Additional visual elements:

    1. Feedback loop:
       - Dashed arrow from Consumers back to Discovery Engine
       - Label: "Manual enrichment & validation"
       - Color: Dotted purple

    2. Timing annotations:
       - Near Layer 2: "Collection interval: 10-60 seconds"
       - Near Layer 3: "Processing latency: <5 seconds"
       - Near Layer 4: "Graph update: Real-time"
       - Near Consumers: "Query latency: <100ms"

    3. Data volume indicators:
       - Small charts next to arrows showing relative data volume
       - Wider arrows = higher volume

    4. Security boundary:
       - Dashed red border around Layers 1-3
       - Label: "Trusted collection zone"
       - Padlock icon

    Legend (bottom right corner):
    - Arrow types: Data flow, API calls, Events
    - Component colors and their meanings
    - Data type symbols (metrics, traces, logs, events)

    Title (top center):
    - Main: "Automated Discovery System Architecture"
    - Subtitle: "Multi-Source IT Management Graph Population"

    Annotations (callout boxes):
    1. Near Layer 2: "Multiple complementary discovery techniques ensure complete coverage"
    2. Near Layer 3: "Correlation engine deduplicates entities discovered from multiple sources"
    3. Near Layer 4: "Graph structure enables real-time dependency queries"

    Color scheme:
    - Layer 1 (Sources): Blues, greens, oranges, purples (varied)
    - Layer 2 (Collection): Gold (#FFD700)
    - Layer 3 (Processing): Pink (#FF69B4)
    - Layer 4 (Storage): Green (#4CAF50)
    - Layer 5 (Consumers): Grays (#9E9E9E)
    - Arrows: Dark gray (#424242)
    - Text: Dark gray (#212121)
    - Backgrounds: Light, desaturated versions of layer colors

    Implementation: Lucidchart, Draw.io, or custom SVG with detailed layering
```

## Related Resources

- [Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md)
