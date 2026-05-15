---
title: TCO Comparison Chart: Three Options Over Five Years
description: TCO Comparison Chart: Three Options Over Five Years
status: scaffold
library: TBD
bloom_level: TBD
---

# TCO Comparison Chart: Three Options Over Five Years

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

    Chart type: Stacked bar chart with line overlay

    Purpose: Compare total cost of ownership across three solution options (ServiceNow, Atlassian, Custom Build) over a 5-year period, showing cost breakdown by category

    X-axis: Year (Year 1, Year 2, Year 3, Year 4, Year 5)
    Y-axis: Cost (USD, $0 - $350,000), with gridlines every $50,000

    Three grouped bar sets per year (one for each option):

    Option 1: ServiceNow (Blue bars)
    Option 2: Atlassian (Green bars)
    Option 3: Custom Build (Orange bars)

    Cost categories (stacked within each bar, bottom to top):

    1. Licenses/Subscriptions (darkest shade of bar color)
    2. Infrastructure (medium-dark shade)
    3. Personnel (medium shade)
    4. Implementation/Enhancement (medium-light shade)
    5. Training & Support (lightest shade)

    Data for each option:

    **ServiceNow (Blue bars):**
    - Year 1: Licenses $20K, Infrastructure $12K, Personnel $180K, Implementation $150K, Training $25K → Total $387K
    - Year 2: Licenses $22K, Infrastructure $13K, Personnel $60K, Enhancement $30K, Training $5K → Total $130K
    - Year 3: Licenses $24K, Infrastructure $14K, Personnel $60K, Enhancement $30K, Training $5K → Total $133K
    - Year 4: Licenses $26K, Infrastructure $15K, Personnel $65K, Enhancement $35K, Training $5K → Total $146K
    - Year 5: Licenses $29K, Infrastructure $16K, Personnel $65K, Enhancement $35K, Training $5K → Total $150K

    **Atlassian (Green bars):**
    - Year 1: Licenses $10K, Infrastructure $6K, Personnel $80K, Implementation $80K, Training $15K → Total $191K
    - Year 2: Licenses $11K, Infrastructure $7K, Personnel $36K, Enhancement $20K, Training $3K → Total $77K
    - Year 3: Licenses $12K, Infrastructure $8K, Personnel $36K, Enhancement $20K, Training $3K → Total $79K
    - Year 4: Licenses $13K, Infrastructure $9K, Personnel $40K, Enhancement $25K, Training $3K → Total $90K
    - Year 5: Licenses $14K, Infrastructure $10K, Personnel $40K, Enhancement $25K, Training $3K → Total $92K

    **Custom Build (Orange bars):**
    - Year 1: Licenses $75K, Infrastructure $20K, Personnel $360K, Implementation (dev) $0 (in personnel), Training $10K → Total $505K
    - Year 2: Licenses $80K, Infrastructure $22K, Personnel $120K, Enhancement $40K, Training $5K → Total $267K
    - Year 3: Licenses $85K, Infrastructure $24K, Personnel $120K, Enhancement $40K, Training $5K → Total $274K
    - Year 4: Licenses $90K, Infrastructure $26K, Personnel $130K, Enhancement $45K, Training $5K → Total $296K
    - Year 5: Licenses $95K, Infrastructure $28K, Personnel $130K, Enhancement $45K, Training $5K → Total $303K

    Line overlay (cumulative TCO):
    Three lines showing cumulative total cost over time:
    - ServiceNow cumulative (blue line with circle markers): Y1=$387K, Y2=$517K, Y3=$650K, Y4=$796K, Y5=$946K
    - Atlassian cumulative (green line with square markers): Y1=$191K, Y2=$268K, Y3=$347K, Y4=$437K, Y5=$529K
    - Custom Build cumulative (orange line with triangle markers): Y1=$505K, Y2=$772K, Y3=$1,046K, Y4=$1,342K, Y5=$1,645K

    Legend (top right):
    Stacked components:
    - Darkest: Licenses/Subscriptions
    - Dark: Infrastructure
    - Medium: Personnel
    - Light: Implementation/Enhancement
    - Lightest: Training & Support

    Lines:
    - Blue line: ServiceNow Cumulative TCO
    - Green line: Atlassian Cumulative TCO
    - Orange line: Custom Build Cumulative TCO

    Annotations:
    - Arrow pointing to Year 1 Custom Build bar: "Highest first-year cost due to development"
    - Arrow pointing to ServiceNow cumulative line at Y5: "5-Year TCO: $946K"
    - Arrow pointing to Atlassian cumulative line at Y5: "5-Year TCO: $529K (44% lower than ServiceNow)"
    - Arrow pointing to Custom Build cumulative line at Y5: "5-Year TCO: $1.645M (74% higher than ServiceNow)"
    - Text box near Y2: "Note: Personnel costs are often 50-60% of total TCO"

    Title: "Total Cost of Ownership Comparison: ServiceNow vs Atlassian vs Custom Build (5-Year Period)"
    Subtitle: "Stacked bars show annual cost breakdown; lines show cumulative TCO"

    Visual styling:
    - Professional color palette with sufficient contrast
    - Gridlines for easier value reading
    - Clear legend with all categories
    - Bar width: 80px per option, 20px spacing between groups
    - Cumulative line thickness: 3px
    - Markers on lines: 8px diameter

    Educational insights visible in chart:
    - Year 1 costs highest for all options (implementation)
    - Custom build has highest ongoing costs (personnel)
    - Atlassian shows lowest TCO but may have capability trade-offs
    - Personnel costs (medium shade) dominate in all options
    - License costs (darkest shade) increase over time
    - Custom build has high upfront cost but then steady high recurring

    Implementation: Chart.js with stacked bar and line combo chart
    Canvas size: 1200x700px
```

## Related Resources

- [Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md)
