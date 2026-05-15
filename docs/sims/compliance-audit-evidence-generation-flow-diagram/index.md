---
title: Compliance Audit Evidence Generation Flow Diagram
description: Compliance Audit Evidence Generation Flow Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# Compliance Audit Evidence Generation Flow Diagram

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md).

```text
Type: diagram

    Purpose: Illustrate how IT management graphs enable rapid, comprehensive audit evidence generation compared to traditional manual processes

    Visual style: Split diagram showing "Traditional Process" (left side, grayscale) vs "Graph-Based Process" (right side, color)

    Traditional Process (left side):

    1. Auditor Question (top)
       - Icon: Person with question mark
       - Text: "Show all systems processing credit card data"

    2. IT Team Actions (middle, stacked vertically):
       - Box 1: "Search SharePoint for system inventory" (3-5 days)
       - Box 2: "Email application owners for current architecture" (1-2 weeks)
       - Box 3: "Manually trace data flows in network diagrams" (2-3 days)
       - Box 4: "Compile spreadsheet of findings" (2-3 days)
       - Box 5: "Review and validate with stakeholders" (1 week)
       - Arrows connecting boxes vertically showing sequential process

    3. Evidence Delivery (bottom)
       - Icon: Document with "?" indicating uncertainty
       - Text: "Potentially outdated evidence delivered after 3-4 weeks"
       - Warning icon: "Risk of missing systems or incorrect data"

    Graph-Based Process (right side):

    1. Auditor Question (top)
       - Icon: Person with question mark
       - Text: "Show all systems processing credit card data"

    2. Query Execution (middle):
       - Box: "Graph Traversal Query" (bright blue)
       - Code snippet shown:
         ```
         MATCH (data:DataStore {contains: 'credit_card'})
         -[:CONNECTS_TO*]-(system:System)
         -[:PROTECTED_BY]->(control:Control)
         RETURN system, control
         ```
       - Clock icon: "15 milliseconds"

    3. Automated Report Generation (middle-bottom):
       - Box: "Generate Evidence Report" (green)
       - Includes: System list, data flows, security controls, audit trails
       - Clock icon: "2 seconds"

    4. Evidence Delivery (bottom)
       - Icon: Document with checkmark
       - Text: "Current, comprehensive evidence delivered in <1 minute"
       - Checkmark icon: "All systems identified, controls verified"

    Comparison metrics (center, connecting the two sides):
    - Time: 3-4 weeks vs <1 minute (arrow showing 99.99% reduction)
    - Accuracy: "Uncertain" vs "Verified current state"
    - Coverage: "Manual search, potential gaps" vs "Automated traversal, complete coverage"
    - Cost: "$5,000-$10,000 in labor" vs "<$1 in compute"

    Visual styling:
    - Traditional process boxes in grayscale with red clock icons showing time delays
    - Graph-based process boxes in vibrant colors (blue, green) with green checkmarks
    - Large arrow in center showing dramatic improvement
    - Timeline bars under each process showing duration (traditional = long bar spanning weeks, graph = tiny bar <1 minute)

    Annotations:
    - Traditional side: "Manual, error-prone, expensive, slow"
    - Graph side: "Automated, accurate, cost-effective, instant"
    - Bottom: "Graph-based compliance evidence generation reduces audit preparation time by >99% while improving accuracy"

    Implementation: SVG diagram with clear visual hierarchy, could be animated to show the flow of activities, exportable for audit documentation or executive presentations
```

## Related Resources

- [Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md)
