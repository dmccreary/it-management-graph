---
title: IT Asset Relationship Graph Interactive Model
description: IT Asset Relationship Graph Interactive Model
status: scaffold
library: TBD
bloom_level: TBD
---

# IT Asset Relationship Graph Interactive Model

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md).

```text
Type: graph-model

    Purpose: Demonstrate the relationship types connecting IT assets in a management graph, showing how asset, application, and service layers interconnect

    Node types:
    1. Business Service (pink circles, size: large)
       - Properties: name, SLA_tier, business_owner, revenue_impact
       - Examples: "Customer Online Banking", "Internal HR Portal"

    2. Application (light blue rounded squares, size: medium)
       - Properties: name, version, technology_stack, lifecycle_stage
       - Examples: "Banking Web App v3.2", "Employee Directory Service"

    3. Software Asset (orange hexagons, size: small)
       - Properties: license_type, quantity_owned, quantity_deployed, vendor, annual_cost
       - Examples: "Oracle Database Enterprise License", "Windows Server Standard"

    4. Hardware Asset (gray rectangles, size: medium)
       - Properties: serial_number, purchase_date, warranty_expiration, acquisition_cost, location
       - Examples: "Server Asset #12847", "Switch Asset #9203"

    5. Infrastructure CI (dark gray diamonds, size: medium)
       - Properties: hostname, IP_address, OS_version, CPU, RAM, status
       - Examples: "db-prod-01", "web-lb-03"

    6. Data Store (orange cylinders, size: medium)
       - Properties: database_type, size_GB, classification, backup_frequency
       - Examples: "CustomerDB", "EmployeeRecordsDB"

    7. Physical Location (green triangles, size: small)
       - Properties: facility_name, address, region, risk_zone
       - Examples: "DC-East-1", "Office-Seattle"

    Edge types (with properties and visual styling):
    1. SUPPORTS (pink solid arrows, thick)
       - Direction: Business Service → Application
       - Properties: criticality (HIGH/MEDIUM/LOW)
       - Example: "Customer Online Banking" SUPPORTS → "Banking Web App"

    2. DEPENDS_ON (blue solid arrows, medium)
       - Direction: Application → Application or Application → Data Store
       - Properties: dependency_type, failover_available
       - Example: "Banking Web App" DEPENDS_ON → "CustomerDB"

    3. CONSUMES_LICENSE (orange dashed arrows, thin)
       - Direction: Infrastructure CI → Software Asset
       - Properties: license_count, compliance_status
       - Example: "db-prod-01" CONSUMES_LICENSE → "Oracle Database Enterprise License"

    4. FINANCIALLY_REPRESENTS (purple dotted arrows, thin)
       - Direction: Hardware Asset → Infrastructure CI
       - Properties: asset_tag, serial_match_confidence
       - Example: "Server Asset #12847" FINANCIALLY_REPRESENTS → "db-prod-01"

    5. HOSTS (gray solid arrows, medium)
       - Direction: Infrastructure CI → Infrastructure CI or Application
       - Properties: virtualization_type
       - Example: Physical server HOSTS → Virtual machine

    6. LOCATED_IN (green solid arrows, thin)
       - Direction: Hardware Asset or Infrastructure CI → Physical Location
       - Properties: rack_position, power_circuit
       - Example: "Server Asset #12847" LOCATED_IN → "DC-East-1 Rack 42"

    Sample data (concrete example to visualize):

    Business Service: "Customer Online Banking" (SLA: Tier 1 - 99.99%)
      ├─ SUPPORTS → Application: "Banking Web App v3.2" (Java Spring Boot)
      │   ├─ DEPENDS_ON → Application: "Auth Service v2.1"
      │   │   ├─ DEPENDS_ON → Data Store: "UserAuthDB"
      │   │   │   └─ HOSTED_BY → Infrastructure: "db-prod-01" (VM)
      │   │   │       ├─ CONSUMES_LICENSE → Software Asset: "Oracle DB Enterprise License" (1 of 50 consumed)
      │   │   │       ├─ HOSTED_BY → Infrastructure: "esx-host-05" (Physical server)
      │   │   │       │   ├─ FINANCIALLY_REPRESENTS ← Hardware Asset: "Server #12847" ($18,500, purchased 2022-03-15)
      │   │   │       │   └─ LOCATED_IN → Location: "DC-East-1 Rack 42"
      │   │   │       └─ RUNS_ON → Software Asset: "Oracle Linux 8"
      │   │   └─ HOSTED_BY → Infrastructure: "k8s-auth-cluster"
      │   └─ DEPENDS_ON → Data Store: "CustomerDB"
      │       └─ HOSTED_BY → Infrastructure: "rds-prod-customers" (AWS RDS)
      └─ SUPPORTS → Application: "Banking Mobile App v1.8"

    Layout algorithm: Hierarchical with business services at top, applications in middle, infrastructure at bottom, and supporting assets (licenses, hardware, locations) arranged on sides

    Interactive features:
    - Hover node: Display tooltip with all properties
    - Click node: Highlight all connected nodes within 2 hops with fading opacity for distance
    - Double-click node: Expand/collapse hidden related nodes (for managing visual complexity)
    - Right-click edge: Show edge properties in sidebar panel
    - Search box: Type node name to locate and zoom to that node
    - Filter controls:
      - Checkboxes to show/hide node types
      - Slider to limit relationship depth shown
      - Toggle to show only critical paths (criticality=HIGH)
    - Query buttons:
      - "Show license compliance" - Highlight nodes where consumed licenses exceed purchased
      - "Show end-of-life risk" - Highlight infrastructure with OS versions past end-of-support
      - "Calculate blast radius" - Select a node, show all dependent business services

    Visual styling:
    - Node size: Based on number of connections (degree centrality)
    - Node border: Thick red border for nodes with compliance or lifecycle issues
    - Edge thickness: Based on criticality or dependency strength
    - Edge color: Matches edge type colors defined above
    - Highlight mode: When node selected, connected nodes at full opacity, others at 20% opacity

    Legend (positioned top-right):
    - Node types with shape/color key
    - Edge types with line style key
    - Status indicators (normal, warning, critical)
    - Interaction hints ("Click to select", "Double-click to expand")

    Canvas size: 1000x700px with sidebar (200px) for filters and property display

    Implementation: vis-network JavaScript library with custom styling, loading data from IT management graph JSON export format
```

## Related Resources

- [Chapter 2: It Asset Management](../../chapters/02-it-asset-management/index.md)
