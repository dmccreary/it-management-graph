---
title: Compliance Dashboard Overview Chart
description: Compliance Dashboard Overview Chart
status: scaffold
library: TBD
bloom_level: TBD
---

# Compliance Dashboard Overview Chart

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md).

```text
Type: chart

    Chart type: Multi-panel dashboard with several sub-charts

    Purpose: Provide executive-level overview of compliance status across multiple regulatory frameworks

    Panel 1 - Compliance Score Gauge (top-left):
    - Gauge chart showing overall compliance score: 87/100
    - Color zones: Red (0-59), Yellow (60-79), Green (80-100)
    - Current needle position in green zone at 87
    - Label: "Overall Compliance Health Score"

    Panel 2 - Regulation-Specific Compliance (top-right):
    - Horizontal stacked bar chart with three bars:
      * HIPAA: 92% compliant (green), 5% remediation in progress (yellow), 3% non-compliant (red)
      * GDPR: 85% compliant (green), 10% remediation in progress (yellow), 5% non-compliant (red)
      * DORA: 84% compliant (green), 12% remediation in progress (yellow), 4% non-compliant (red)
    - X-axis: Percentage (0-100%)
    - Y-axis: Regulation names
    - Title: "Compliance Status by Regulation"

    Panel 3 - Control Effectiveness Trend (middle-left):
    - Line chart showing trend over 12 months (January through December)
    - Two lines:
      * Blue line: "Technical Controls" - starts at 78%, ends at 91%, showing steady improvement
      * Orange line: "Administrative Controls" - starts at 82%, ends at 88%, more gradual improvement
    - Y-axis: Control Effectiveness (0-100%)
    - X-axis: Months
    - Grid lines for easier reading
    - Title: "Control Effectiveness Over Time"
    - Annotation: Arrow pointing to June showing "Major remediation project completed"

    Panel 4 - Open Findings by Severity (middle-right):
    - Donut chart showing breakdown of open compliance findings:
      * Critical (red): 3 findings (5%)
      * High (orange): 12 findings (20%)
      * Medium (yellow): 28 findings (47%)
      * Low (green): 17 findings (28%)
    - Center displays total: "60 Open Findings"
    - Title: "Open Compliance Findings by Severity"

    Panel 5 - Audit Coverage (bottom-left):
    - Bar chart showing percentage of systems audited by category:
      * ePHI Systems: 98% (dark blue bar)
      * Personal Data Systems: 94% (blue bar)
      * Financial Systems: 96% (medium blue bar)
      * Critical Infrastructure: 92% (light blue bar)
      * Other Systems: 67% (very light blue bar)
    - Target line at 95% (red dashed horizontal line)
    - X-axis: System categories
    - Y-axis: Audit coverage percentage (0-100%)
    - Title: "Audit Coverage by System Category"

    Panel 6 - Risk Heat Map (bottom-right):
    - 5x5 grid heat map showing risk assessment:
      * X-axis: Impact (Negligible, Low, Medium, High, Critical)
      * Y-axis: Likelihood (Rare, Unlikely, Possible, Likely, Almost Certain)
      * Cells colored by risk level: Green (low risk), Yellow (medium risk), Orange (high risk), Red (critical risk)
      * Numbered dots in cells indicating number of identified risks in that category
      * Most risks concentrated in "Medium Impact / Possible" (yellow, 12 risks) and "High Impact / Unlikely" (orange, 8 risks)
      * One critical risk: "Critical Impact / Possible" (red, 1 risk)
    - Title: "Compliance Risk Heat Map"
    - Legend: Color coding for risk levels

    Overall dashboard styling:
    - Clean white background with light gray panel borders
    - Consistent color scheme across all panels
    - Each panel has clear title and appropriate legends
    - "Last Updated" timestamp in top-right corner: "2024-11-04 09:30:00 UTC"
    - Refresh button for real-time updates

    Implementation: Dashboard built with Chart.js or D3.js, responsive design for various screen sizes, automated data refresh from graph database queries, drill-down capability on each panel to see detailed reports
```

## Related Resources

- [Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md)
