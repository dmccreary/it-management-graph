---
title: eBPF Network Connection Discovery Interactive MicroSim
description: eBPF Network Connection Discovery Interactive MicroSim
status: scaffold
library: TBD
bloom_level: TBD
---

# eBPF Network Connection Discovery Interactive MicroSim

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md).

```text
Type: microsim

    Learning objective: Demonstrate how eBPF monitors kernel-level network events to automatically discover service dependencies without application instrumentation

    Canvas layout (900x700px):
    - Top section (900x150): Title and explanation area
    - Left side (550x550): Main visualization area showing network activity
    - Right side (350x550): Control panel and discovered connections list

    Visual elements in main visualization area:

    1. Kernel space layer (top half, semi-transparent gray background):
       - Large box labeled "Linux Kernel" with subtle grid pattern
       - Small gold squares floating in this space representing "eBPF Programs"
       - Network stack visualization: layers showing "Application Layer", "Transport Layer", "Network Layer"
       - Events flowing through these layers visualized as small colored dots moving downward

    2. User space layer (bottom half, white background):
       - Multiple process boxes representing running applications:
         * "Web App" (blue box, left side)
         * "API Service" (green box, center)
         * "Database" (orange box, right side)
         * "Cache Service" (purple box, top right)
       - Each process has a small icon indicating its type

    3. Network connections (animated):
       - Colored lines (connections) that appear and pulse between processes
       - Each connection passes through the kernel layer where eBPF programs "intercept" them
       - When a connection is intercepted, a small gold glow appears and the connection data is captured
       - Different colors for different protocols: HTTP (green), Database (blue), Cache (red)

    4. eBPF capture visualization:
       - When a connection is detected, show a small "capture event" animation
       - Data packet icon appears at interception point
       - Dotted line from packet to right panel showing it's being recorded

    Interactive controls (right panel from top to bottom):

    1. Simulation control section:
       - Button: "Start Discovery" (green) / "Pause" (yellow)
       - Button: "Reset Simulation"
       - Checkbox: "Show eBPF Programs" (toggles visibility of gold squares in kernel)
       - Checkbox: "Animate Packets" (toggles the moving dots)

    2. Speed control:
       - Slider: "Discovery Speed" (100ms - 2000ms between events)
       - Label showing current speed in ms

    3. Filter section:
       - Checkboxes for connection types:
         * "HTTP Connections" (green checkbox)
         * "Database Queries" (blue checkbox)
         * "Cache Operations" (red checkbox)
       - Label: "Filter by Protocol"

    4. Discovered connections display:
       - Scrollable list area showing discovered connections in real-time
       - Each entry shows:
         * Timestamp (relative: "2s ago")
         * Source → Destination
         * Protocol and port
         * Connection count
       - Example entries:
         * "3s ago: Web App → API Service (HTTP:8080) [5 connections]"
         * "5s ago: API Service → Database (PostgreSQL:5432) [12 connections]"
         * "7s ago: API Service → Cache (Redis:6379) [8 connections]"

    5. Statistics panel (bottom):
       - Total Connections Discovered: [number]
       - Unique Services: [number]
       - eBPF Events Processed: [number]
       - Graph Edges Created: [number]

    Default parameters:
    - Discovery speed: 800ms between connection events
    - All connection types enabled (all checkboxes checked)
    - Show eBPF Programs: enabled
    - Animate Packets: enabled
    - Simulation: paused initially

    Behavior when "Start Discovery" is clicked:
    1. eBPF programs in kernel space begin "scanning" (subtle pulsing gold glow)
    2. Random network connections are initiated between processes
    3. As each connection passes through kernel, eBPF program intercepts it
    4. Capture animation plays (gold glow, data packet icon)
    5. Connection details appear in "Discovered connections" list
    6. Visual connection line appears between the two processes
    7. Statistics counters increment
    8. After several connections, a "dependency graph" begins to form showing the relationships

    Special visual effects:
    - When a new connection type is discovered for the first time, highlight it with a brief glow
    - Connection lines increase in thickness based on frequency (more frequent = thicker line)
    - Processes with more connections grow slightly larger
    - Hover over any connection line to see detailed stats in a tooltip

    Educational annotations (appear as info icons with hover tooltips):
    - Info icon near kernel layer: "eBPF programs run safely in kernel space with verified security"
    - Info icon near interception point: "Zero overhead monitoring - no application changes needed"
    - Info icon near discovered list: "This data automatically populates IT management graph"

    Implementation notes:
    - Use p5.js for rendering and animation
    - Store processes as objects with x, y coordinates and connection lists
    - Implement simple physics for connection line animations (pulse effect)
    - Use setTimeout/setInterval controlled by speed slider for event timing
    - Maintain array of discovered connections with timestamps
    - Calculate statistics from connection data in real-time
    - Use alpha blending for layered kernel/user space effect
    - Implement smooth transitions when processes grow or connection lines thicken

    Color palette:
    - Kernel space background: rgba(200, 200, 200, 0.3)
    - eBPF programs: Gold (#FFD700)
    - Web App: Blue (#2196F3)
    - API Service: Green (#4CAF50)
    - Database: Orange (#FF9800)
    - Cache Service: Purple (#9C27B0)
    - HTTP connections: Green (#7ED321)
    - Database connections: Blue (#4A90E2)
    - Cache connections: Red (#E74C3C)
    - Text: Dark gray (#333333)
    - Background: White

    Additional features:
    - Export button to save discovered connections as JSON (simulating graph update)
    - "View as Graph" button that transforms the visualization into a network graph layout
    - Progress indicator showing "Discovery in progress..." when running
```

## Related Resources

- [Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md)
