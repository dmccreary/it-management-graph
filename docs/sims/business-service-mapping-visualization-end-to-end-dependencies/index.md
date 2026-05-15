---
title: Business Service Mapping Visualization: End-to-End Dependencies
description: Business Service Mapping Visualization: End-to-End Dependencies
status: scaffold
library: TBD
bloom_level: TBD
---

# Business Service Mapping Visualization: End-to-End Dependencies

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Business Services And Portfolio](../../chapters/07-business-services-and-portfolio/index.md).

```text
Type: graph-model

    Purpose: Demonstrate complete business service mapping from customer-facing business service through technical services and applications down to infrastructure, showing the value chain

    Node types (6 layers):

    1. Business Service (:BusinessService - pink circles, extra large)
       - Layer: Top (customer value)
       - Properties: name, revenue_impact_per_hour, customer_count, SLA_tier
       - Example: "Online Order Processing"

    2. Technical Service (:TechnicalService - purple hexagons, large)
       - Layer: Service tier
       - Properties: name, api_version, availability
       - Examples: "Authentication Service", "Payment Gateway", "Notification Hub"

    3. Application (:Application - light blue rounded squares, medium)
       - Layer: Application tier
       - Properties: name, version, language
       - Examples: "Order API", "Web Frontend", "Payment Service"

    4. Database (:Database - orange cylinders, medium)
       - Layer: Data tier
       - Properties: name, db_type, size_gb
       - Examples: "OrderDB", "CustomerDB", "SessionStore"

    5. Server (:Server - gray rectangles, small)
       - Layer: Infrastructure tier
       - Properties: hostname, cpu_cores, ram_gb
       - Examples: "web-prod-01", "api-prod-01", "db-prod-01"

    6. Datacenter (:Datacenter - green triangles, small)
       - Layer: Physical tier
       - Properties: name, city, region, tier_level
       - Example: "DC-East-1 (New York, Tier 3)"

    Sample graph structure:

    Business Service (1 node at top):
    - "Online Order Processing" (revenue: $150K/hour, customers: 50K, SLA: 99.95%)

    Technical Services (3 nodes):
    - "Authentication Service" (API v2.1, 99.99% availability)
    - "Payment Gateway" (API v3.0, 99.95% availability)
    - "Notification Hub" (API v1.5, 99.9% availability)

    Applications (5 nodes):
    - "Web Frontend" (React v18, Node.js)
    - "Order API" (Java Spring Boot v3.1)
    - "Payment Service" (Python FastAPI v0.95)
    - "Auth API Server" (Go v1.21)
    - "Notification Worker" (Python Celery v5.2)

    Databases (4 nodes):
    - "OrderDB" (PostgreSQL 15, 500GB)
    - "CustomerDB" (PostgreSQL 15, 1.2TB)
    - "SessionStore" (Redis 7, 50GB)
    - "NotificationQueue" (RabbitMQ 3.12)

    Servers (6 nodes):
    - "web-prod-01" (32 cores, 128GB)
    - "web-prod-02" (32 cores, 128GB)
    - "api-prod-01" (64 cores, 256GB)
    - "db-prod-01" (96 cores, 512GB)
    - "db-prod-02" (96 cores, 512GB)
    - "cache-prod-01" (32 cores, 256GB)

    Datacenter (1 node at bottom):
    - "DC-East-1" (New York, US-EAST region, Tier 3)

    Relationships showing complete dependency chain:

    Business Service connections:
    - "Online Order Processing" -[:DEPENDS_ON {criticality: "HIGH"}]-> "Authentication Service"
    - "Online Order Processing" -[:DEPENDS_ON {criticality: "CRITICAL"}]-> "Payment Gateway"
    - "Online Order Processing" -[:DEPENDS_ON {criticality: "MEDIUM"}]-> "Notification Hub"

    Technical Service to Application:
    - "Authentication Service" -[:IMPLEMENTED_BY]-> "Auth API Server"
    - "Payment Gateway" -[:IMPLEMENTED_BY]-> "Payment Service"
    - "Notification Hub" -[:IMPLEMENTED_BY]-> "Notification Worker"

    Business Service to Application (direct):
    - "Online Order Processing" -[:SUPPORTS]-> "Web Frontend"
    - "Online Order Processing" -[:SUPPORTS]-> "Order API"

    Application dependencies:
    - "Web Frontend" -[:DEPENDS_ON]-> "Order API"
    - "Web Frontend" -[:DEPENDS_ON]-> "SessionStore"
    - "Order API" -[:DEPENDS_ON]-> "OrderDB"
    - "Order API" -[:DEPENDS_ON]-> "CustomerDB"
    - "Payment Service" -[:DEPENDS_ON]-> "OrderDB"
    - "Auth API Server" -[:DEPENDS_ON]-> "CustomerDB"
    - "Notification Worker" -[:DEPENDS_ON]-> "NotificationQueue"

    Application to Infrastructure:
    - "Web Frontend" -[:HOSTED_ON]-> "web-prod-01", "web-prod-02"
    - "Order API" -[:HOSTED_ON]-> "api-prod-01"
    - "Payment Service" -[:HOSTED_ON]-> "api-prod-01"
    - "Auth API Server" -[:HOSTED_ON]-> "api-prod-01"
    - "OrderDB" -[:HOSTED_ON]-> "db-prod-01"
    - "CustomerDB" -[:HOSTED_ON]-> "db-prod-01"
    - "SessionStore" -[:HOSTED_ON]-> "cache-prod-01"

    Infrastructure to Datacenter:
    - All servers -[:LOCATED_IN]-> "DC-East-1"

    Layout algorithm: Strict hierarchical layout
    - Layers clearly separated with horizontal spacing
    - Within each layer, nodes arranged horizontally with equal spacing
    - All edges flow downward showing dependency direction
    - No edge crossings where possible for clarity

    Interactive features:

    - Click Business Service node (top): Lights up ENTIRE dependency tree
      - All connected nodes highlighted in gradient (pink → purple → blue → orange → gray → green)
      - All edges in dependency path highlighted in bright colors
      - Shows complete "stack" from business value to physical infrastructure
      - Statistics panel updates: "42 total dependencies across 6 layers"

    - Hover any node: Display immediate connections
      - Show upstream dependencies (what this needs)
      - Show downstream dependents (what needs this)
      - Display node properties in tooltip
      - Highlight direct connections only (one hop)

    - Button: "Calculate Business Impact"
      - Click any infrastructure node (server, database)
      - Traces upstream to all affected business services
      - Displays impact metrics:
        - Business services affected: X
        - Total revenue impact: $Y/hour
        - Customer count affected: Z
        - Highest SLA tier affected: Tier N
      - Results displayed in prominent panel with red warning styling

    - Button: "Show Critical Path"
      - Identifies longest dependency chain from business service to datacenter
      - Highlights path in bright yellow/orange
      - Shows hop count and cumulative criticality
      - Displays: "7 hops: Business Service → Tech Service → App → DB → Server → DC"

    - Button: "Cost Rollup"
      - Aggregates infrastructure costs up to business service
      - Shows cost per layer:
        - Datacenter: $X/month
        - Servers: $Y/month
        - Databases: $Z/month
        - Applications: $W/month (licensing + dev)
        - Total business service cost: $TOTAL/month
      - Enables business capability costing

    - Slider: "Show layers 1-N" (1-6)
      - Dynamically hide/show layers for focused analysis
      - Layer 1-3: Business and service tiers only
      - Layers 1-6: Complete stack view

    - Filter by criticality:
      - Checkbox: Show only CRITICAL dependencies
      - Checkbox: Show CRITICAL + HIGH dependencies
      - Checkbox: Show all dependencies
      - Dims non-matching edges to 20% opacity

    Visual styling:

    - Layer backgrounds: Subtle alternating shading (helps distinguish layers)
    - Layer labels on left: "Business Tier", "Service Tier", "Application Tier", etc.
    - Layer separators: Thin dashed horizontal lines
    - Node sizes: Progressively smaller from top to bottom (business services largest)
    - Node colors: As specified by type (pink/purple/blue/orange/gray/green)
    - Edge colors based on relationship type:
      - Pink/magenta: DEPENDS_ON from business service (business dependencies)
      - Purple: IMPLEMENTED_BY (service implementation)
      - Blue: DEPENDS_ON between apps/services (technical dependencies)
      - Gray: HOSTED_ON, LOCATED_IN (infrastructure)
    - Edge thickness: Based on criticality property
      - CRITICAL: Very thick (4px)
      - HIGH: Thick (3px)
      - MEDIUM: Medium (2px)
      - LOW: Thin (1px)
    - Revenue impact badge: On business service node showing "$150K/hour"
    - SLA badge: On business service showing "99.95% SLA"
    - Customer count badge: Showing "50K customers"

    Statistics panel (right sidebar, always visible):
    - Total nodes: 20
    - Total edges: 35
    - Layers: 6
    - Business services: 1
    - Technical services: 3
    - Applications: 5
    - Databases: 4
    - Servers: 6
    - Datacenters: 1
    - Longest dependency chain: 7 hops
    - Critical dependencies: 15
    - High dependencies: 12
    - Medium dependencies: 8

    Business Impact Panel (activated by clicking infrastructure):
    When "db-prod-01" clicked, shows:
    - "DATABASE SERVER FAILURE IMPACT ANALYSIS"
    - Affected Business Services:
      - Online Order Processing ($150K/hour, 50K customers, 99.95% SLA) [CRITICAL]
    - Affected Technical Services:
      - Payment Gateway [HIGH]
      - Authentication Service [HIGH]
    - Affected Applications:
      - Order API [CRITICAL]
      - Payment Service [HIGH]
      - Auth API Server [MEDIUM]
    - Total Revenue Impact: $150,000 per hour
    - Total Customers Affected: 50,000
    - SLA Status: BREACHED (Tier 1 critical service)
    - Recommendation: "IMMEDIATE RESPONSE - Tier 1 escalation required"

    Educational callouts:
    - "Business service at top represents customer-facing value"
    - "Each layer depends on layers below it"
    - "Single infrastructure failure can impact multiple business services"
    - "Graph traversal instantly calculates business impact from technical failures"
    - "This mapping enables speaking 'business language' to executives!"

    Legend (bottom-right):
    - Node shapes and colors by type
    - Edge colors by relationship type
    - Edge thickness by criticality
    - Layer indicators
    - Business impact metrics explained

    Canvas size: 1400x1000px with right sidebar (300px) for statistics and business impact analysis

    Color scheme:
    - Pink: Business services (customer value)
    - Purple: Technical services (reusable capabilities)
    - Light blue: Applications (running software)
    - Orange: Databases (data layer)
    - Gray: Servers (compute infrastructure)
    - Green: Datacenters (physical foundation)
    - Edge colors: Pink (business dep), Purple (implementation), Blue (technical dep), Gray (infrastructure)

    Implementation: vis-network JavaScript library with hierarchical layout enforcing strict layering, upstream/downstream traversal for impact analysis, cost rollup calculation, criticality-based filtering, interactive business impact panel with financial calculations

    Advanced feature: "What-If Analysis"
    - Button: "Simulate Failure"
    - Click any node to simulate its failure
    - Instantly shows all affected components upstream
    - Calculates business impact metrics
    - Suggests mitigation: "Failover to db-prod-02 reduces impact to zero"
```

## Related Resources

- [Chapter 7: Business Services And Portfolio](../../chapters/07-business-services-and-portfolio/index.md)
