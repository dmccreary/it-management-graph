---
title: Build vs Buy Decision Matrix Interactive Tool
description: Build vs Buy Decision Matrix Interactive Tool
status: scaffold
library: TBD
bloom_level: TBD
---

# Build vs Buy Decision Matrix Interactive Tool

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md).

```text
Type: microsim

    Learning objective: Help students understand the multi-dimensional nature of build vs buy decisions by exploring how different factors influence the recommendation

    Canvas layout (1000x700px):
    - Top section (1000x100px): Title and instructions
    - Left section (700x600px): Interactive radar chart showing evaluation dimensions
    - Right section (300x600px): Control panel with sliders and recommendation display

    Visual elements in radar chart area:

    Radar chart with 8 axes (spokes):
    1. Time Pressure (center = low urgency, edge = high urgency)
    2. Budget Availability (center = limited, edge = substantial)
    3. Internal Expertise (center = none, edge = expert)
    4. Customization Needs (center = standard, edge = highly custom)
    5. Vendor Trust (center = low, edge = high)
    6. Control Requirements (center = low, edge = must control)
    7. Support Needs (center = self-sufficient, edge = need support)
    8. Scale & Complexity (center = simple, edge = enterprise-scale)

    Visual representation:
    - Blue shaded area: Current organization's profile
    - Green dotted line: "Build" favorable zone
    - Orange dotted line: "Buy" favorable zone
    - Purple dotted line: "Hybrid" favorable zone
    - Interactive markers on each axis (draggable)

    Control panel (right side):

    Sliders for each dimension (0-100%):
    - "Time Pressure" slider (default: 50%)
    - "Budget Availability" slider (default: 60%)
    - "Internal Expertise" slider (default: 40%)
    - "Customization Needs" slider (default: 50%)
    - "Vendor Trust" slider (default: 70%)
    - "Control Requirements" slider (default: 60%)
    - "Support Needs" slider (default: 50%)
    - "Scale & Complexity" slider (default: 55%)

    Recommendation display (below sliders):
    - Large text showing current recommendation: "BUY", "BUILD", or "HYBRID"
    - Color-coded background (green for build, orange for buy, purple for hybrid)
    - Confidence meter (0-100%) showing how strongly factors favor this option
    - Short explanation text (2-3 sentences)

    Example calculation display:
    - "BUILD score: 35%"
    - "BUY score: 58%"
    - "HYBRID score: 45%"
    - Small note: "Scores can sum to >100% as hybrid borrows from both approaches"

    Preset scenarios (buttons):
    - "Startup" button: Loads values favoring buy
    - "Enterprise" button: Loads values favoring hybrid
    - "Tech Company" button: Loads values favoring build
    - "Government" button: Loads values favoring buy with high control
    - "Reset" button: Returns all sliders to default

    Interactive behavior:
    - Moving any slider updates the radar chart in real-time
    - Radar chart updates recommendation and confidence score
    - Hovering over any radar axis shows its contribution to each option
    - Clicking preset scenarios animates sliders to new values
    - Recommendation text updates dynamically based on scores

    Scoring algorithm (implemented in JavaScript):
    - Build score favored by: High internal expertise, high customization needs, high control requirements, low time pressure
    - Buy score favored by: High time pressure, high support needs, high vendor trust, low internal expertise
    - Hybrid score favored by: Medium-high on most dimensions, high scale & complexity
    - Confidence = (max_score - second_highest_score) / max_score * 100

    Default parameter values:
    - All sliders start at 40-60% (neutral zone)
    - Recommendation starts as "HYBRID" (most common real-world answer)
    - Confidence starts around 35% (ambiguous scenario)

    Visual styling:
    - Clean, professional interface
    - Smooth animations on slider changes (300ms transitions)
    - Color-coded zones on radar chart (subtle shading)
    - Responsive feedback to all interactions

    Educational value:
    - Students can explore how changing one factor affects the recommendation
    - Preset scenarios show realistic organizational profiles
    - No single "right answer" - demonstrates nuanced decision-making
    - Confidence score teaches that some decisions are more clear-cut than others

    Implementation notes:
    - Use p5.js for radar chart rendering
    - HTML sliders for input controls
    - JavaScript for scoring algorithm and real-time updates
    - CSS for styling and layout
```

## Related Resources

- [Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md)
