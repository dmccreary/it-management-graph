---
title: Exception Reporting Dashboard Mockup
description: Exception Reporting Dashboard Mockup
status: scaffold
library: TBD
bloom_level: TBD
---

# Exception Reporting Dashboard Mockup

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md).

```text
Type: diagram

    Purpose: Show a realistic IT governance dashboard displaying business rule exceptions

    Visual style: Modern web dashboard interface mockup

    Layout: Full dashboard view (1600x1000px)

    **Header Section (top, 1600x80px):**

    Left side:
    - Company logo placeholder
    - Title: "IT Management Graph - Governance Dashboard"
    - Subtitle: "Business Rule Exception Report"

    Right side:
    - Date selector: "As of: December 15, 2024"
    - Export button: "Export Report (PDF)"
    - Settings icon

    Color: Navy blue background, white text

    **Summary Cards Section (1600x150px, below header):**

    Four cards in a row (400px wide each):

    Card 1 - Total Exceptions:
    - Large number: "247"
    - Trend indicator: "↓ 8% from last month" (green, positive)
    - Small line graph showing downward trend
    - Background: Light blue

    Card 2 - Critical Exceptions:
    - Large number: "12"
    - Trend: "↓ 6 from last month" (green, good news)
    - Icon: Red warning triangle
    - Background: Light red/pink

    Card 3 - Average Age:
    - Large number: "42 days"
    - Trend: "↑ 3 days from last month" (yellow, concerning)
    - Icon: Calendar/clock
    - Background: Light yellow

    Card 4 - Remediation Rate:
    - Large number: "18/month"
    - Trend: "↑ 22% from last month" (green, positive)
    - Icon: Checkmark
    - Background: Light green

    **Main Content Area (1600x770px, split into two columns):**

    **Left Column (1000x770px):**

    Section 1 - Severity Distribution (1000x250px):
    - Title: "Exception Distribution by Severity"
    - Pie chart (350px diameter) showing:
      - Critical (red): 12 (5%)
      - High (orange): 63 (26%)
      - Medium (yellow): 142 (57%)
      - Low (gray): 30 (12%)
    - Legend on right side of pie
    - Hover: Show exact count and percentage

    Section 2 - Top Violated Rules (1000x250px):
    - Title: "Top 10 Business Rules with Most Violations"
    - Horizontal bar chart:
      1. "Servers without monitoring agents" - 45 violations (orange bar)
      2. "Applications with single-point-of-failure" - 38 violations (orange bar)
      3. "End-of-life software in production" - 27 violations (red bar)
      4. "Unencrypted production databases" - 22 violations (red bar)
      5. "Public apps connecting directly to DB" - 18 violations (red bar)
      6. "Missing business service ownership" - 16 violations (yellow bar)
      7. "Servers unpatched >30 days" - 15 violations (yellow bar)
      8. "No redundancy for critical services" - 14 violations (orange bar)
      9. "Dev/prod logical separation violation" - 11 violations (yellow bar)
      10. "GDPR data outside EU region" - 8 violations (red bar)
    - Bars colored by severity of rule
    - Click to drill down to specific violations

    Section 3 - Exception Trend (1000x270px):
    - Title: "12-Month Exception Trend by Severity"
    - Stacked area chart showing:
      - X-axis: Last 12 months (Jan 2024 - Dec 2024)
      - Y-axis: Exception count (0-350)
      - Four colored areas stacked:
        - Critical (red, bottom)
        - High (orange)
        - Medium (yellow)
        - Low (gray, top)
    - Shows overall downward trend from ~310 exceptions in January to 247 in December
    - Annotation: "Governance initiative launched" at April mark where decline begins

    **Right Column (600x770px):**

    Section 1 - Recent Critical Exceptions (600x300px):
    - Title: "Critical Exceptions Requiring Immediate Action"
    - Table with columns:
      - Asset Name
      - Rule Violated
      - Owner
      - Age (days)
      - Action

    Rows (truncated for display):
    1. "prod-db-07" | "Unencrypted database" | "T. Anderson" | "8" | [View] button
    2. "payment-api" | "EOL software (log4j 1.x)" | "M. Johnson" | "14" | [View] button
    3. "customer-portal" | "Direct DB connection" | "S. Williams" | "21" | [View] button
    4. "server-142" | "GDPR data outside EU" | "R. Martinez" | "5" | [View] button
    5. "billing-svc" | "Single point of failure" | "A. Thompson" | "31" | [View] button

    "View All (12)" link at bottom

    Section 2 - Remediation Progress (600x220px):
    - Title: "Exception Remediation Progress - Q4 2024"
    - Burn-down chart:
      - X-axis: Weeks (Oct 1 - Dec 31)
      - Y-axis: Open exceptions (0-350)
      - Blue line: "Planned remediation" (straight diagonal line from 310 to 200)
      - Green line: "Actual remediation" (stepped line, currently at 247)
      - Shaded area between lines
    - Status indicator: "On track to meet Q4 goal of <250 exceptions"
    - Color: Green (positive)

    Section 3 - Ownership Distribution (600x250px):
    - Title: "Exceptions by Responsible Team"
    - Horizontal bar chart showing:
      - "Infrastructure Team" - 87 exceptions
      - "Application Team" - 64 exceptions
      - "Database Team" - 42 exceptions
      - "Security Team" - 31 exceptions
      - "Unassigned" - 23 exceptions (highlighted in red as problematic)
    - Note: "23 exceptions need ownership assignment"

    **Interactive Elements:**

    Hover effects:
    - Charts show detailed tooltips with exact values
    - Table rows highlight on hover
    - Cards show additional detail on hover

    Click actions:
    - [View] buttons: Open modal with exception details and graph visualization
    - Chart elements: Drill down to filtered exception list
    - Trend lines: Show monthly detail breakdown
    - Export: Generate PDF report

    **Color Palette:**

    - Navy blue (#1E3A5F): Header
    - Red (#E74C3C): Critical severity
    - Orange (#E67E22): High severity
    - Yellow (#F39C12): Medium severity
    - Gray (#95A5A6): Low severity
    - Green (#27AE60): Positive trends/success
    - Light blue (#EBF4F6): Summary cards background
    - White (#FFFFFF): Main background

    **Typography:**

    - Header: 24px bold
    - Section titles: 18px semi-bold
    - Card large numbers: 48px bold
    - Body text: 14px regular
    - Trend indicators: 12px with arrows

    Implementation notes:
    - Responsive dashboard design
    - Real-time updates via WebSocket or polling
    - Drill-down modals show graph visualization of specific violations
    - Export functionality generates formatted PDF reports
    - Role-based access control (different views for different roles)

    Educational value:
    - Shows realistic governance dashboard
    - Demonstrates how business rules translate to actionable metrics
    - Illustrates the value of trend analysis
    - Shows importance of ownership assignment
    - Makes abstract "exception reporting" concept concrete
```

## Related Resources

- [Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md)
