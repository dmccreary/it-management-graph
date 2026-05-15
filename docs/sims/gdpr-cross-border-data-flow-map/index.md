---
title: GDPR Cross-Border Data Flow Map
description: GDPR Cross-Border Data Flow Map
status: scaffold
library: TBD
bloom_level: TBD
---

# GDPR Cross-Border Data Flow Map

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md).

```text
Type: map

    Geographic scope: World map with emphasis on European Union, United Kingdom, United States, and Asia-Pacific regions

    Purpose: Visualize data flows subject to GDPR restrictions, showing which transfers require additional safeguards

    Locations:
    - European Union (highlighted in green with "GDPR Protected Territory" label)
    - United Kingdom (highlighted in yellow with "Adequacy Decision" label)
    - United States (highlighted in orange with "SCC Required" label)
    - Switzerland (highlighted in yellow with "Adequacy Decision" label)
    - Japan (highlighted in yellow with "Adequacy Decision" label)
    - Data center icons: Frankfurt (2 icons), Dublin (1 icon), London (2 icons), Virginia (3 icons), Singapore (1 icon), Sydney (1 icon)

    Data flows (arrows with animation):
    - Thick green arrows: Internal EU data flows (Frankfurt ↔ Dublin) - labeled "Unrestricted"
    - Yellow arrows with checkmark: EU to UK (Dublin → London) - labeled "Adequacy Decision, No Additional Safeguards"
    - Orange arrows with document icon: EU to US (Frankfurt → Virginia) - labeled "SCCs Required"
    - Red dashed arrows with warning icon: EU to Singapore (Dublin → Singapore) - labeled "Restricted, BCR or SCC Required"
    - Blue dotted arrows: Backup replication routes (between all data centers)

    Labels and callouts:
    - "27 EU Member States + EEA"
    - "628 million data subjects protected"
    - "Data transfer impact assessment required for high-risk transfers"
    - "Article 45: Adequacy Decisions (11 countries)"
    - "Article 46: Appropriate Safeguards (SCCs, BCRs)"

    Legend (bottom right):
    - Arrow colors and their meanings (green = unrestricted, yellow = adequacy decision, orange = SCCs required, red = high-risk transfer)
    - Icon explanations: data center icon, warning icon, checkmark icon, document icon
    - Transfer volume indicators: arrow thickness represents data volume

    Interactive features:
    - Hover over arrows to see: transfer type, legal basis, data categories, frequency
    - Click on data centers to see: applications hosted, data residency compliance status, backup locations
    - Click on countries to see: adequacy decision status, date of most recent assessment, key requirements
    - Toggle layer: "Show only regulated data transfers" vs "Show all data flows"

    Visual styling:
    - Modern flat design with soft shadows for data center icons
    - Animated arrows showing directionality of flow
    - Color intensity indicates data volume (darker = higher volume)

    Implementation: Leaflet.js or Mapbox GL for base map, custom SVG overlay for data centers and flows, D3.js for interactive elements and animations
```

## Related Resources

- [Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md)
