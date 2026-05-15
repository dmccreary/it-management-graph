---
title: Deployment Dependencies as a Directed Acyclic Graph (DAG)
description: Deployment Dependencies as a Directed Acyclic Graph (DAG)
status: scaffold
library: TBD
bloom_level: TBD
---

# Deployment Dependencies as a Directed Acyclic Graph (DAG)

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

    Purpose: Demonstrate how IT component dependencies naturally form a DAG structure, showing deployment order requirements and illustrating how topological sorting determines safe deployment sequences

    Node types:

    1. Infrastructure (:Infrastructure - dark gray rectangles, large)
       - Properties: name, type, deployment_time_mins
       - Examples: "Container Orchestrator" (Kubernetes), "Message Queue" (RabbitMQ)

    2. Database (:Database - orange cylinders, large)
       - Properties: name, db_type, deployment_time_mins, schema_version
       - Examples: "User Database" (PostgreSQL), "Session Store" (Redis)

    3. Service (:Service - light blue rounded squares, medium)
       - Properties: name, type, deployment_time_mins, version
       - Examples: "Auth Service", "API Gateway", "Notification Service"

    4. Application (:Application - blue rounded squares, medium)
       - Properties: name, deployment_time_mins, version, language
       - Examples: "Web Frontend", "Mobile API", "Admin Dashboard"

    Sample DAG structure (15 nodes, clear layers):

    Layer 0 (Infrastructure - no dependencies):
    - "Container Orchestrator" (K8s)
    - "Message Queue" (RabbitMQ)

    Layer 1 (Databases - depend on infrastructure):
    - "User Database" → depends on "Container Orchestrator"
    - "Session Store" → depends on "Container Orchestrator"
    - "Metrics Database" → depends on "Container Orchestrator"

    Layer 2 (Core services - depend on infrastructure + databases):
    - "Auth Service" → depends on "User Database", "Session Store"
    - "User Service" → depends on "User Database"
    - "Logging Service" → depends on "Message Queue"

    Layer 3 (Mid-tier services - depend on core services):
    - "API Gateway" → depends on "Auth Service", "User Service"
    - "Notification Service" → depends on "Message Queue", "User Service"
    - "Analytics Service" → depends on "Metrics Database"

    Layer 4 (Applications - depend on services):
    - "Web Frontend" → depends on "API Gateway", "Session Store"
    - "Mobile API" → depends on "API Gateway", "Notification Service"
    - "Admin Dashboard" → depends on "API Gateway", "Analytics Service", "User Service"

    Edge type:
    - DEPENDS_ON (blue directed arrows, medium thickness)
    - Properties: deployment_order, criticality, allowed_lag_mins
    - All edges flow downward (from dependent to dependency)

    Layout algorithm: Hierarchical layout with strict layering
    - Layer 0 at top (can deploy immediately)
    - Each subsequent layer below previous
    - Nodes within layer spread horizontally
    - All edges point downward (respecting DAG structure)

    Interactive features:
    - Hover node: Highlight node and show:
      - All direct dependencies (outgoing edges)
      - All dependents (incoming edges)
      - Deployment layer number
      - Estimated deployment time
    - Click node: Calculate and display:
      - Complete dependency subtree (everything this node needs)
      - Complete dependent tree (everything that needs this node)
      - Critical path to this node (longest deployment chain)
    - Query buttons:
      - "Show topological sort": Animate deployment order layer by layer with numbering
      - "Calculate critical path": Highlight longest deployment chain determining minimum total time
      - "Find parallelizable components": Show which nodes at each layer can deploy simultaneously
      - "Detect cycles": Run cycle detection (should find none in proper DAG)
    - Filter controls:
      - Slider: "Show only layers 0-N" (limit depth displayed)
      - Checkboxes: Filter by node type (Infrastructure, Database, Service, Application)
      - Toggle: "Show deployment times" (display time badges on nodes)

    Visual styling:
    - Node colors by type (as specified above)
    - Node size reflects deployment complexity or dependency count
    - Node badges: Show layer number in top-right corner
    - Edge colors: Blue for normal dependencies, red for critical path
    - Edge thickness: Thicker for critical dependencies
    - Layer separators: Horizontal dashed lines between layers
    - Animated deployment simulation: When "Show topological sort" clicked, nodes light up green in deployment order

    Topological sort animation:
    1. Highlight Layer 0 nodes green (deployment order 1-2)
    2. After 500ms, show Layer 0 as "deployed" (darker green)
    3. Highlight Layer 1 nodes green (deployment order 3-5)
    4. Continue until all nodes deployed
    5. Display total deployment time based on serial vs parallel strategies

    Legend (positioned top-right):
    - Node types with shapes and colors
    - Layer numbers and their meaning
    - Deployment states (waiting, deploying, deployed)
    - Edge properties (dependency strength)

    Annotations and educational callouts:
    - "Notice: All edges point downward—this is a DAG!"
    - "Each layer can only depend on previous layers, never future layers"
    - "Layer 0 has no dependencies—deploy these first"
    - "Within each layer, nodes can deploy in parallel (no interdependencies)"
    - "Total deployment time = sum of layer times (if sequential) or max within layers (if parallel)"
    - "Critical path shown in red determines minimum deployment time"

    Deployment strategy panel (bottom):
    Compare deployment approaches:
    - Sequential (one at a time): Total time = sum of all deployment times (~185 mins)
    - Layer-based parallel: Total time = sum of longest node per layer (~62 mins)
    - Maximum parallel: Total time = critical path length (~45 mins)

    Educational insights:
    - "DAG structure enables topological sorting for safe deployment order"
    - "No cycles means no deployment deadlocks!"
    - "Parallel deployment dramatically reduces total time (3x speedup in this example)"
    - "Critical path identifies bottleneck determining minimum possible deployment time"
    - "This is why dependency management matters: poor architecture creates long critical paths"

    Canvas size: 1100x800px with bottom panel (200px) for deployment strategy comparison

    Color scheme:
    - Dark gray: Infrastructure (foundation layer)
    - Orange: Databases (data layer)
    - Light blue: Services (logic layer)
    - Blue: Applications (presentation layer)
    - Green: Deployed/ready state
    - Red: Critical path highlighting
    - Blue: Standard dependency edges

    Implementation: vis-network JavaScript library with hierarchical layout algorithm enforcing layering, custom node badges for layer numbers, animation system for deployment simulation, topological sort implementation, critical path calculation (longest path in weighted DAG)

    Additional interactive feature: "Test deployment order"
    - User can click nodes in sequence to simulate deployment
    - System validates whether dependencies are satisfied (all prerequisites already "deployed")
    - If user violates dependency order, system shows error and highlights unsatisfied dependencies
    - Successful complete deployment shows congratulations message with comparison to optimal order
```

## Related Resources

- [Chapter 4: Graph Theory And Database Foundations](../../chapters/04-graph-theory-and-database-foundations/index.md)
