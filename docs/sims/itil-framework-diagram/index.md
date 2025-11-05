# ITIL Framework Structure Diagram

<iframe src="./main.html" width="100%" height="820px" scrolling="no"></iframe>

An interactive hierarchical block diagram illustrating the structure of ITIL (Information Technology Infrastructure Library) versions 1-3, showing the relationship between Service Support, Service Delivery, and Configuration Management processes with the CMDB as the authoritative source of truth.

## Features

- **Interactive Hover**: Detailed descriptions appear when hovering over any process box or the CMDB
- **Hierarchical Organization**: Clear visual hierarchy showing the framework structure
- **Color-Coded Processes**: Blue for Service Support (operational), Green for Service Delivery (strategic)
- **Highlighted Configuration Management**: Gold color emphasizes Configuration Management's central role
- **Visual Relationships**:
  - Solid arrows show dependencies from CMDB to Service Support processes
  - Dashed arrows show informational relationships to Service Delivery processes
  - Bidirectional arrows highlight the two-way data flow with Configuration Management
- **Responsive Design**: Automatically adapts to different screen sizes

## ITIL Framework Components

### Service Support (Operational Processes)

The left column shows operational processes focused on day-to-day IT service delivery:

1. **Incident Management** - Restores normal service operation as quickly as possible
2. **Problem Management** - Minimizes adverse impact of incidents and problems
3. **Change Management** - Ensures standardized methods for handling changes
4. **Release Management** - Takes a holistic view of changes to IT services
5. **Configuration Management** - Maintains information about Configuration Items (highlighted in gold)

### Service Delivery (Strategic Processes)

The right column shows strategic processes focused on long-term planning:

1. **Service Level Management** - Negotiates and monitors SLAs
2. **Capacity Management** - Ensures infrastructure capabilities meet targets
3. **Availability Management** - Defines and improves service availability
4. **IT Service Continuity Management** - Supports business continuity
5. **Financial Management** - Provides cost-effective stewardship of IT assets

### Configuration Management Database (CMDB)

The foundation layer shows the CMDB as the central repository and authoritative source of truth that:

- Stores information about all Configuration Items (CIs) and their relationships
- Provides data to all operational and strategic processes
- Has a special bidirectional relationship with Configuration Management
- Serves as the single source of truth for IT infrastructure information

## Visual Elements

- **Banner**: "ITIL Framework" header spans the top
- **Process Labels**: "Operational Processes" (left) and "Strategic Processes" (right)
- **Color Scheme**:
  - Blue (#4A90E2) for Service Support processes
  - Green (#5CB85C) for Service Delivery processes
  - Gold (#FFD700) for Configuration Management (highlighting its centrality)
  - Orange (#FF8C42) for CMDB
  - White background with dark text for readability
- **Arrow Types**:
  - Solid gray arrows: Dependencies (CMDB → Service Support)
  - Dashed gray arrows: Informational (CMDB → Service Delivery)
  - Gold bidirectional arrows: Two-way data flow (Configuration Management ↔ CMDB)

## Learning Objectives

This diagram helps students understand:

1. **ITIL Architecture**: The overall structure and organization of ITIL processes
2. **Process Relationships**: How processes depend on and interact with each other
3. **CMDB Centrality**: Why the CMDB is fundamental to all ITIL processes
4. **Operational vs Strategic**: The distinction between day-to-day operations and long-term planning
5. **Configuration Management Role**: How Configuration Management serves as the bridge between processes and the CMDB
6. **Data Dependencies**: Which processes have strong dependencies vs informational relationships with the CMDB

## Historical Context

This diagram represents ITIL versions 1-3, which organized processes into Service Support and Service Delivery. ITIL v4 (2019) reorganized these concepts into service value chains and practices, but understanding this traditional structure remains important for:

- Working with legacy ITIL implementations
- Understanding the evolution to modern frameworks
- Recognizing the foundational role of configuration management
- Grasping the transition from process-centric to value-centric thinking

## Use Cases

This visualization is valuable for:

- **ITIL Training**: Teaching the traditional ITIL framework structure
- **IT Operations**: Understanding how operational processes relate to the CMDB
- **Configuration Management**: Explaining why configuration data is central
- **System Design**: Planning IT service management tool implementations
- **Evolution Studies**: Comparing traditional ITIL to modern graph-based approaches

## Technical Details

- Built with [p5.js](https://p5js.org/) v1.11.1
- Data-driven from `data.json` configuration file
- Interactive hover detection for process descriptions
- Responsive canvas that adapts to window size
- Accessible with ARIA labels

## File Structure

```
itil-framework-diagram/
├── data.json       - Process definitions and colors
├── script.js       - P5.js visualization logic
├── main.html       - HTML wrapper
└── index.md        - Documentation (this file)
```

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Related Topics

- [Configuration Management Database (CMDB)](#) - Deep dive into CMDB concepts
- [ITIL Evolution](#) - From ITIL v1 to v4 and beyond
- [Graph Databases in IT Management](#) - Modern approaches replacing traditional CMDBs
- [Service Support Processes](#) - Detailed exploration of operational processes
- [Service Delivery Processes](#) - Detailed exploration of strategic processes
