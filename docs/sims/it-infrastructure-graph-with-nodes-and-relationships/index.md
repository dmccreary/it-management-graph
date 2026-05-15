---
title: IT Infrastructure Graph with Nodes and Relationships
description: IT Infrastructure Graph with Nodes and Relationships
status: scaffold
library: TBD
bloom_level: TBD
---

# IT Infrastructure Graph with Nodes and Relationships

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Graph Theory And Database Foundations](../../chapters/04-graph-theory-and-database-foundations/index.md).

```text
Type: graph-model

    Purpose: Extend the previous nodes visualization by adding directed relationships, demonstrating how edges connect IT infrastructure entities to create a meaningful dependency graph

    Node types: Same as previous visualization (BusinessService, Application, Database, Server, Location, Team)

    Sample data (same nodes as before, now connected):

    Nodes:
    - :BusinessService "Online Banking Portal"
    - :Application "Customer API v2.3"
    - :Application "Auth Service v1.8"
    - :Database "CustomerDB"
    - :Database "SessionStore"
    - :Server "web-prod-01"
    - :Server "db-prod-01"
    - :Location "DC-EAST-1"
    - :Team "Platform Engineering"

    Edge types (with properties and visual styling):

    1. SUPPORTS (pink solid arrows, thick)
       - Direction: BusinessService → Application
       - Properties: criticality (HIGH/MEDIUM/LOW), SLA_requirement
       - Example: "Online Banking Portal" SUPPORTS → "Customer API v2.3" {criticality: HIGH, SLA: 99.99%}

    2. DEPENDS_ON (blue solid arrows, medium)
       - Direction: Application → Application OR Application → Database
       - Properties: dependency_type, failover_available, retry_policy
       - Examples:
         - "Customer API" DEPENDS_ON → "Auth Service" {type: synchronous, failover: true}
         - "Customer API" DEPENDS_ON → "CustomerDB" {type: data, failover: false}
         - "Auth Service" DEPENDS_ON → "SessionStore" {type: cache, failover: true}

    3. HOSTED_ON (gray solid arrows, medium)
       - Direction: Application OR Database → Server
       - Properties: deployment_method, container_count, resource_limits
       - Examples:
         - "Customer API" HOSTED_ON → "web-prod-01" {method: Docker, containers: 3}
         - "CustomerDB" HOSTED_ON → "db-prod-01" {method: Bare metal}

    4. LOCATED_IN (green solid arrows, thin)
       - Direction: Server → Location
       - Properties: rack_position, power_circuit, network_zone
       - Examples:
         - "web-prod-01" LOCATED_IN → "DC-EAST-1" {rack: "R42-U15", circuit: "PDU-A3"}
         - "db-prod-01" LOCATED_IN → "DC-EAST-1" {rack: "R42-U20", circuit: "PDU-A3"}

    5. MANAGED_BY (purple dashed arrows, thin)
       - Direction: Application OR Server → Team
       - Properties: responsibility_type, escalation_priority
       - Examples:
         - "Customer API" MANAGED_BY → "Platform Engineering" {type: primary, priority: P1}
         - "web-prod-01" MANAGED_BY → "Platform Engineering" {type: infrastructure}

    Complete graph structure:

    "Online Banking Portal" (BusinessService)
      └─ SUPPORTS → "Customer API v2.3" (Application)
          ├─ DEPENDS_ON → "Auth Service v1.8" (Application)
          │   └─ DEPENDS_ON → "SessionStore" (Database)
          │       └─ HOSTED_ON → "web-prod-01" (Server)
          │           ├─ LOCATED_IN → "DC-EAST-1" (Location)
          │           └─ MANAGED_BY → "Platform Engineering" (Team)
          ├─ DEPENDS_ON → "CustomerDB" (Database)
          │   └─ HOSTED_ON → "db-prod-01" (Server)
          │       ├─ LOCATED_IN → "DC-EAST-1" (Location)
          │       └─ MANAGED_BY → "Platform Engineering" (Team)
          ├─ HOSTED_ON → "web-prod-01" (Server) [already connected above]
          └─ MANAGED_BY → "Platform Engineering" (Team) [already connected above]

    Layout algorithm: Hierarchical layout with business services at top, applications in middle tier, databases and servers in lower tier, and location/team nodes on sides

    Interactive features:
    - Hover node: Highlight node and all directly connected edges and neighbor nodes
    - Click node: Show all edges and neighbors within 2 hops with distance-based opacity
    - Hover edge: Display tooltip with relationship type and all properties
    - Right-click edge: Open edge property panel in sidebar
    - Search box: Find nodes by name or property values
    - Query buttons (educational):
      - "Show dependency chain": Click a business service to highlight full downstream dependency path
      - "Calculate blast radius": Click a server to show all upstream services affected if it fails
      - "Find single points of failure": Highlight nodes with multiple inbound critical dependencies
    - Filter controls:
      - Checkboxes to show/hide specific edge types
      - Slider to limit visible relationship depth (1-5 hops from selected node)
      - Toggle: "Show only critical dependencies" (filter by edge criticality property)

    Visual styling:
    - Edge colors match relationship types (defined above)
    - Edge thickness reflects criticality or importance (thicker = more critical)
    - Edge arrows clearly show directionality
    - Animated flow effect on edges (optional): Small particles flowing along edges to reinforce direction
    - Selected paths highlighted in bright color (yellow or cyan) with increased thickness
    - Hover effect: Edge becomes brighter with white border
    - Edge labels: Relationship type displayed at midpoint when zoomed in

    Legend (positioned top-right):
    - Node types with shapes and colors
    - Edge types with line styles and colors
    - Criticality indicators (line thickness meanings)
    - Interaction guide ("Hover to highlight", "Click to explore")

    Annotations and educational callouts:
    - "Follow the arrows to understand dependency flow"
    - "Notice how one server failure (web-prod-01) could affect multiple components!"
    - "Edge properties add context: criticality, deployment methods, failover capabilities"
    - "This is a simple graph—real IT estates have thousands of nodes and relationships"
    - "Graph traversal follows these edges in milliseconds, even at scale"

    Canvas size: 1000x700px with right sidebar (250px) for node/edge property display and query controls

    Color scheme: Same as previous visualization for nodes, with edge colors as specified above

    Implementation: vis-network JavaScript library with directed edges, custom edge styling, hierarchical layout algorithm, interactive highlighting and filtering capabilities

    Educational insights displayed at bottom:
    - "Relationships are stored as direct connections—no JOINs needed!"
    - "Traversing from 'Online Banking Portal' to 'DC-EAST-1' requires 4 hops—fast in graph DBs!"
    - "Try clicking 'Show dependency chain' to see how relationships flow through the graph"
```

## Related Resources

- [Chapter 4: Graph Theory And Database Foundations](../../chapters/04-graph-theory-and-database-foundations/index.md)
