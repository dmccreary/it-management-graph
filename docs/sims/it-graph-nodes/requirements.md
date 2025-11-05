# MicroSim Requirements

**Path:** /docs/sims/it-graph-nodes

**Title:** IT Infrastructure Nodes Interactive Visualization

**Type:** graph-model

**Suggested Library:** vis-network

**Icons:** /docs/it-icons

These are all MIT License (Bootstrap Icons) - Free for commercial use in SVG format

    Purpose: Demonstrate how different IT infrastructure entities are represented as nodes in a graph database, showing node labels, properties, and visual styling

    Node types:

    1. Business Service (:BusinessService - pink circles, large size)
       - Properties: name, SLA_tier, business_owner, revenue_impact_annual
       - Example: "Online Banking Portal" (SLA: Tier 1, Owner: "Jane Smith", Impact: $45M)

    2. Application (:Application - light blue rounded squares, medium size)
       - Properties: name, version, language, deployment_env, health_status
       - Example: "Customer API v2.3" (Language: Java, Env: Production, Status: Healthy)

    3. Database (:Database - orange cylinders, medium size)
       - Properties: name, db_type, size_gb, backup_frequency, last_backup
       - Example: "CustomerDB" (Type: PostgreSQL, Size: 2,400 GB, Backup: Daily)
       - Icon: /docs/it-icons/database.svg

    4. Server (:Server - gray rectangles, medium size)
       - Properties: hostname, ip_address, os, cpu_cores, ram_gb, status
       - Example: "web-prod-01" (IP: 10.0.1.50, OS: Ubuntu 22.04, CPU: 16, RAM: 64, Status: Running)
       - Icon: /docs/it-icons/server.svg

    5. Location (:Location - green triangles, small size)
       - Properties: name, city, region, facility_type, power_redundancy
       - Example: "DC-EAST-1" (City: New York, Region: US-EAST, Type: Tier 3, Redundancy: N+1)
       - Icon: /docs/it-icons/office-building.svg

    6. Team (:Team - purple hexagons, small size)
       - Properties: name, department, team_lead, on_call_rotation
       - Example: "Platform Engineering" (Dept: Engineering, Lead: "Alex Johnson", Rotation: 24/7)
       - Icon: /docs/it-icons/users.svg
    
    7. User
        - Properties: name, department, role, supervisor, on_call_calendar_id
        - Example: "Sue Smith", "Helpdesk", "Developer", "Peg Anderson", "CAL34568"
    
    8. Desktop
        - Properties: type, asset_tag, RAM, purchased_date, last_virus_scan_datetime, list_of_Apps
        - Example: "MacBook Pro", "C4762531", "16GB", "2024-04-17", "2024-04-17T2:47:07", "Chrome, VSCode, 

    Sample data with 8-10 nodes (no edges yet—we'll add those in the next section):

    - BusinessService: "Online Banking Portal"
    - Application: "Customer API v2.3"
    - Application: "Auth Service v1.8"
    - Database: "CustomerDB"
    - Database: "SessionStore"
    - Server: "web-prod-01"
    - Server: "db-prod-01"
    - Location: "DC-EAST-1"
    - Team: "Platform Engineering"
    - User: "Sue Smith"

    Layout: Force-directed layout with nodes spread evenly, no connections yet

    Interactive features:
    - Hover node: Display tooltip showing all properties in key-value format
    - Click node: Highlight and display full property panel in sidebar
    - Search box: Type node name or property value to locate and zoom to node
    - Filter by label: Checkboxes to show/hide specific node types
    - Color coding toggle: Switch between label-based colors and status-based colors (e.g., health_status: healthy=green, warning=yellow, critical=red)

    Visual styling:
    - Node shapes vary by label (circles, squares, cylinders, triangles, hexagons)
    - Node sizes reflect importance or connection count (larger = more important)
    - Node colors match label types (consistent with color scheme below)
    - Node borders: Solid 2px border, thicker when selected
    - Node labels: Name property displayed inside or below node

    Legend (positioned top-right):
    - Node label types with shape and color indicators
    - Property count indicator (e.g., "5 properties" badge on node)
    - Status color coding if enabled

    Annotations:
    - Callout: "Each node represents a unique entity in your IT infrastructure"
    - Callout: "Nodes can have different properties—no rigid schema required!"
    - Callout: "Labels help categorize and filter nodes efficiently"
    - Callout: "In the next section, we'll connect these nodes with relationships"

    Canvas size: 900x600px with right sidebar (200px) for selected node details

    Color scheme:
    - Pink: Business services (customer-facing layer)
    - Light blue: Applications (software layer)
    - Orange: Databases (data layer)
    - Gray: Servers (infrastructure layer)
    - Green: Locations (physical layer)
    - Purple: Teams (organizational layer)

    Implementation: vis-network JavaScript library with custom node shapes, loading node data from JSON array format. No edges included in this visualization—focus entirely on nodes and their properties.

    Educational notes displayed:
    - "Notice how different node types have completely different properties"
    - "This flexibility would require multiple tables or sparse schemas in relational databases"
    - "Graph databases embrace heterogeneous data naturally"

