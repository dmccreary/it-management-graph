---
title: Configuration Drift Detection Workflow
description: Configuration Drift Detection Workflow
status: scaffold
library: TBD
bloom_level: TBD
---

# Configuration Drift Detection Workflow

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md).

```text
Type: workflow

    Purpose: Illustrate the process of detecting, alerting, and remediating configuration drift using automated discovery and graph comparison

    Visual style: Flowchart with swimlanes for different systems/roles

    Canvas size: 1000x800px

    Swimlanes (horizontal, from top to bottom):
    1. "Automated Discovery System" (light blue background)
    2. "IT Management Graph" (light gold background)
    3. "Drift Detection Engine" (light orange background)
    4. "Alerting & Remediation" (light green background)

    Workflow steps (left to right):

    Step 1 (Swimlane 1 - Automated Discovery):
    - Shape: Rounded rectangle (start state)
    - Label: "Continuous Discovery Running"
    - Icon: Radar/scanning symbol
    - Hover text: "Discovery agents continuously monitor infrastructure state every 30 seconds"
    - Color: Blue

    Step 2 (Swimlane 1 - Automated Discovery):
    - Shape: Process rectangle
    - Label: "Detect Infrastructure Change"
    - Icon: Alert symbol with exclamation
    - Hover text: "eBPF agent detects new network connection from Web Server to unknown database on port 3306"
    - Color: Blue
    - Arrow from Step 1 with label: "Change event detected"

    Step 3 (Swimlane 2 - IT Management Graph):
    - Shape: Process rectangle
    - Label: "Update Graph with Discovered State"
    - Icon: Graph nodes with plus symbol
    - Hover text: "New edge added to graph: WebServer-01 → MySQL-Unknown (port 3306)"
    - Color: Gold
    - Arrow from Step 2 (diagonal down) with label: "Graph update event"

    Step 4 (Swimlane 2 - IT Management Graph):
    - Shape: Database cylinder
    - Label: "Current State Graph"
    - Icon: Database with network nodes
    - Hover text: "Graph now contains: 247 nodes, 1,834 edges, updated 15:42:33"
    - Color: Gold
    - Arrow from Step 3 with label: "State stored"

    Step 5 (Swimlane 3 - Drift Detection Engine):
    - Shape: Process rectangle
    - Label: "Fetch Approved Baseline Configuration"
    - Icon: Document with checkmark
    - Hover text: "Load infrastructure-as-code definitions from Git repository (main branch)"
    - Color: Orange
    - Arrow from Step 4 (diagonal down) with label: "Trigger drift check"

    Step 6 (Swimlane 3 - Drift Detection Engine):
    - Shape: Database cylinder
    - Label: "Baseline State Graph"
    - Icon: Document graph
    - Hover text: "Expected configuration from Terraform, Ansible, and approved architecture diagrams"
    - Color: Orange
    - Arrow from Step 5 with label: "Baseline loaded"

    Step 7 (Swimlane 3 - Drift Detection Engine):
    - Shape: Process rectangle with dual input
    - Label: "Compare Current vs. Baseline"
    - Icon: Balance/scale symbol
    - Hover text: "Graph diff algorithm identifies nodes/edges in current state but not in baseline"
    - Color: Orange
    - Two arrows entering: one from Step 4 (Current State) and one from Step 6 (Baseline State)
    - Labels on arrows: "Actual state" and "Expected state"

    Step 8 (Swimlane 3 - Drift Detection Engine):
    - Shape: Decision diamond
    - Label: "Drift Detected?"
    - Icon: Question mark
    - Hover text: "Found 1 unauthorized connection: WebServer-01 → MySQL-Unknown not in baseline"
    - Color: Yellow (decision point)
    - Arrow from Step 7

    Step 8a (from "No" branch):
    - Shape: Rounded rectangle (end state)
    - Label: "No Action Required"
    - Icon: Green checkmark
    - Hover text: "Configuration matches baseline; continue monitoring"
    - Color: Green
    - Arrow from Step 8 with label: "No drift found"
    - Arrow loops back to Step 1 (dashed line) with label: "Continue monitoring"

    Step 8b (from "Yes" branch):
    - Shape: Process rectangle
    - Label: "Calculate Drift Severity"
    - Icon: Thermometer/severity gauge
    - Hover text: "Severity: HIGH - Unapproved database connection from production web server"
    - Color: Orange
    - Arrow from Step 8 with label: "Drift found"

    Step 9 (Swimlane 4 - Alerting & Remediation):
    - Shape: Process rectangle
    - Label: "Generate Drift Alert"
    - Icon: Bell/alert symbol
    - Hover text: "Alert created: 'HIGH: Unauthorized database connection detected on WebServer-01'"
    - Color: Light green
    - Arrow from Step 8b (diagonal down) with label: "Drift details"

    Step 10 (Swimlane 4 - Alerting & Remediation):
    - Shape: Decision diamond
    - Label: "Auto-Remediation Enabled?"
    - Icon: Gear with question mark
    - Hover text: "Check policy: Is automatic remediation allowed for this drift type?"
    - Color: Yellow
    - Arrow from Step 9

    Step 10a (from "Yes" branch):
    - Shape: Process rectangle
    - Label: "Execute Auto-Remediation"
    - Icon: Robot/automation symbol
    - Hover text: "Automatically block unauthorized connection via firewall rule update"
    - Color: Light green
    - Arrow from Step 10 with label: "Auto-fix enabled"

    Step 10b (from "No" branch):
    - Shape: Process rectangle
    - Label: "Notify On-Call Engineer"
    - Icon: Person with notification
    - Hover text: "Page sent to on-call SRE: 'Manual investigation required for drift on WebServer-01'"
    - Color: Light green
    - Arrow from Step 10 with label: "Manual intervention required"

    Step 11 (Swimlane 4 - Alerting & Remediation):
    - Shape: Process rectangle (merge point)
    - Label: "Log Drift Incident"
    - Icon: Document with pencil
    - Hover text: "Record incident in change management system with full drift details and remediation taken"
    - Color: Light green
    - Arrows from both Step 10a and Step 10b converge here

    Step 12 (Swimlane 4 - Alerting & Remediation):
    - Shape: Process rectangle
    - Label: "Update Baseline if Approved"
    - Icon: Document with refresh arrow
    - Hover text: "If drift represents an approved change, update baseline to reflect new desired state"
    - Color: Light green
    - Arrow from Step 11
    - Dashed arrow from this step back to Step 6 (Baseline State Graph) labeled: "Baseline updated"

    Step 13 (Swimlane 4 - Alerting & Remediation):
    - Shape: Rounded rectangle (end state)
    - Label: "Drift Remediated"
    - Icon: Green checkmark with shield
    - Hover text: "Configuration restored to approved baseline; monitoring continues"
    - Color: Green
    - Arrow from Step 12
    - Dashed arrow from this step back to Step 1 labeled: "Resume continuous monitoring"

    Additional visual elements:

    1. Timing annotations:
    - Near Step 2: "Detection latency: <30 sec"
    - Near Step 7: "Comparison time: <5 sec"
    - Near Step 10a: "Auto-remediation: <2 min"
    - Near Step 10b: "Human response: 5-30 min"

    2. Color-coded severity indicator:
    - Small legend showing drift severity levels:
      * Green: "Informational" (minor drift)
      * Yellow: "Warning" (moderate drift)
      * Orange: "High" (significant drift)
      * Red: "Critical" (security/compliance drift)

    3. Feedback loops:
    - Dashed purple arrow from Step 12 to Step 6: "Baseline update"
    - Dashed purple arrow from Step 13 to Step 1: "Continuous monitoring loop"
    - Dashed purple arrow from Step 8a to Step 1: "No drift - continue monitoring"

    4. Metrics dashboard (side panel on right):
    - Small panel showing example metrics:
      * "Drift checks today: 1,247"
      * "Drifts detected: 23"
      * "Auto-remediated: 18"
      * "Manual intervention: 5"
      * "Average detection time: 22 sec"

    Arrow styling:
    - Normal flow: Solid black arrows with arrowheads
    - Loop/feedback: Dashed purple arrows
    - Data transfer: Blue arrows with data icon
    - Decision branches: Labeled with decision result ("Yes"/"No")

    Color scheme:
    - Swimlane 1 (Discovery): Light blue (#E3F2FD)
    - Swimlane 2 (Graph): Light gold (#FFF9E6)
    - Swimlane 3 (Drift Detection): Light orange (#FFE0B2)
    - Swimlane 4 (Remediation): Light green (#E8F5E9)
    - Process boxes: Slightly darker versions of swimlane colors
    - Decision diamonds: Yellow (#FFF59D)
    - Start/End states: Green (#81C784) / Green with checkmark
    - Arrows: Dark gray (#424242)
    - Text: Dark gray (#212121)

    Title (top, centered):
    - Main: "Configuration Drift Detection and Remediation Workflow"
    - Subtitle: "Automated Compliance Through Continuous Discovery"

    Legend (bottom left):
    - Process: Rectangle
    - Decision: Diamond
    - Data Store: Cylinder
    - Start/End: Rounded rectangle
    - Flow: Solid arrow
    - Feedback: Dashed arrow

    Implementation: Draw.io, Lucidchart, or BPMN workflow tool with hover text capability (HTML/JavaScript overlay)
```

## Related Resources

- [Chapter 10: Observability And Automated Discovery](../../chapters/10-observability-and-automated-discovery/index.md)
