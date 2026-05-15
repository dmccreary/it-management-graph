---
title: Migration Timeline with Risk and Value Curves
description: Migration Timeline with Risk and Value Curves
status: scaffold
library: TBD
bloom_level: TBD
---

# Migration Timeline with Risk and Value Curves

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md).

```text
Type: chart

    Chart type: Combination chart (line chart + area chart + timeline)

    Purpose: Show the four-phase migration journey with overlaid risk and value curves, demonstrating how risk decreases and value increases over time

    X-axis: Time (months 0-24), divided into four phases
    Phase boundaries marked with vertical dotted lines:
    - Phase 1: Months 0-6 (Parallel Operation)
    - Phase 2: Months 6-14 (Selective Process Migration)
    - Phase 3: Months 14-20 (Critical Process Migration)
    - Phase 4: Months 20-24 (Legacy Decommissioning)

    Y-axis (left): Risk Level (0-100%, labeled as Low/Medium/High)
    Y-axis (right): Business Value Realized (0-100%)

    Data series:

    1. Risk Level (red line with area fill, decreasing over time):
       - Month 0: 75% (High - starting migration)
       - Month 3: 80% (Highest - running two systems)
       - Month 6: 65% (Decreasing - validation complete)
       - Month 10: 50% (Medium - early wins)
       - Month 14: 55% (Slight increase - critical migration begins)
       - Month 17: 35% (Decreasing)
       - Month 20: 20% (Low - stable operation)
       - Month 24: 10% (Very low - legacy decommissioned)

    2. Business Value (green line with area fill, increasing over time):
       - Month 0: 5% (baseline legacy value)
       - Month 6: 15% (learning phase)
       - Month 10: 40% (early process wins)
       - Month 14: 60% (significant adoption)
       - Month 17: 75% (critical processes migrated)
       - Month 20: 90% (full operational value)
       - Month 24: 100% (maximum value realized)

    3. System Usage indicators (stacked bar chart, background):
       - Legacy CMDB usage (red bars, decreasing)
       - Graph system usage (green bars, increasing)
       - Shows the crossover point around month 12

    Phase labels with icons:
    - Phase 1: Parallel Operation icon (two parallel lines)
    - Phase 2: Selective Migration icon (partial arrow)
    - Phase 3: Critical Migration icon (lightning bolt)
    - Phase 4: Decommission icon (power off symbol)

    Key milestones (marked with circular markers on timeline):
    - Month 3: "Data Validation Complete"
    - Month 8: "First Critical Process Migrated"
    - Month 14: "Legacy No Longer Primary System"
    - Month 20: "Legacy Read-Only Mode"
    - Month 24: "Legacy Decommissioned"

    Annotations:
    - Arrow pointing to month 14: "Crossover point - Graph becomes primary system"
    - Shaded region months 10-16: "Highest activity period"
    - Text box at month 12: "Risk stabilizes as confidence grows"

    Title: "IT Management Graph Migration: Risk, Value, and Timeline"

    Legend (top right):
    - Red line: Project Risk Level
    - Green line: Business Value Realized
    - Red bars: Legacy CMDB Usage
    - Green bars: Graph System Usage
    - Dotted vertical lines: Phase boundaries

    Visual styling:
    - Semi-transparent area fills under risk and value curves
    - Grid lines for easier reading
    - Professional color palette (red for risk, green for value)
    - Clean, modern chart design

    Implementation: Chart.js with custom plugins for phase labels and annotations
    Canvas size: 1000x600px

    Educational notes:
    - Notice how risk temporarily increases at phase boundaries (change is risky)
    - Value follows an S-curve (slow start, rapid growth, plateau)
    - The crossover point (month 14) is critical decision moment
    - Risk never reaches zero—ongoing management always required
```

## Related Resources

- [Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md)
