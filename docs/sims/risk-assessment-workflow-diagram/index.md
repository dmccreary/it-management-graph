---
title: Risk Assessment Workflow Diagram
description: Risk Assessment Workflow Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# Risk Assessment Workflow Diagram

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md).

```text
Type: workflow

    Purpose: Illustrate the continuous risk assessment process using graph-based IT management data

    Visual style: Flowchart with process rectangles, decision diamonds, and data shapes, organized in vertical swimlanes

    Swimlanes:
    - Risk Manager
    - IT Management Graph System
    - Control Owners
    - Executive Leadership

    Steps:

    1. Start: "New Risk Identified" (Risk Manager lane)
       Hover text: "Risk identified through threat intelligence, incident review, or compliance assessment"

    2. Process: "Create Risk Node in Graph" (Risk Manager lane)
       Hover text: "Risk documented with properties: description, category, regulatory_framework, date_identified"

    3. Process: "Query Related Assets" (IT Management Graph System lane)
       Hover text: "Graph traversal identifies all systems, applications, and data stores related to the risk"

    4. Process: "Identify Existing Controls" (IT Management Graph System lane)
       Hover text: "Query finds all controls protecting related assets (e.g., PROTECTS_AGAINST relationships)"

    5. Decision: "Controls Adequate?" (Risk Manager lane)
       Hover text: "Assessment based on control maturity, coverage completeness, and effectiveness metrics"

    6a. Process: "Document Accepted Risk" (if Yes - Risk Manager lane)
        Hover text: "Risk accepted with executive approval, linked to acceptance decision node"

    6b. Process: "Calculate Residual Risk" (if No - continues flow)
        Hover text: "Risk = (Inherent Risk) × (1 - Control Effectiveness), formula applied automatically"

    7. Decision: "Residual Risk Level?" (Risk Manager lane)
       Hover text: "Low (<25): accept, Medium (25-75): monitor with remediation plan, High (>75): escalate"

    8a. Process: "Assign to Control Owner" (if Medium - Control Owners lane)
        Hover text: "Create RESPONSIBLE_FOR relationship between control owner and risk remediation task"

    8b. Process: "Escalate to Executive" (if High - Executive Leadership lane)
        Hover text: "High risks requiring investment decisions or strategy changes escalated immediately"

    9. Process: "Create Remediation Tasks" (Control Owners lane)
       Hover text: "Tasks created as nodes with MITIGATES relationships to risk, target dates assigned"

    10. Process: "Update Control Effectiveness" (IT Management Graph System lane)
        Hover text: "As controls are implemented, effectiveness properties updated, triggering risk recalculation"

    11. Decision: "Risk Below Threshold?" (Risk Manager lane)
        Hover text: "Periodic reassessment checks if risk has been reduced to acceptable levels"

    12a. End: "Close Risk" (if Yes)
         Hover text: "Risk status changed to 'Closed', audit trail preserved in graph history"

    12b. Loop back to "Calculate Residual Risk" (if No)
         Hover text: "Continue monitoring and remediation until risk is adequately controlled"

    Color coding:
    - Blue: Data query and calculation steps (IT Management Graph System lane)
    - Yellow: Decision points requiring judgment
    - Green: Successful risk acceptance or closure
    - Orange: Remediation and monitoring steps
    - Red: High-risk escalation path

    Additional visual elements:
    - Data store symbol next to "IT Management Graph System" lane header showing graph database icon
    - Clock icons on remediation tasks indicating time-bound activities
    - Dashboard icon next to step 10 showing continuous monitoring

    Implementation: BPMN-style workflow diagram using bpmn.io library or similar, with interactive hover states providing detailed explanations, exportable to PDF for process documentation
```

## Related Resources

- [Chapter 11: Compliance Risk And Security](../../chapters/11-compliance-risk-and-security/index.md)
