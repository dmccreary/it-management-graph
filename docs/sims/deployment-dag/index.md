# Deployment Dependencies DAG

[View Deployment Dependencies DAG Fullscreen](main.html){ .md-button .md-button--primary }

An interactive visualization demonstrating how deployment dependencies form a Directed Acyclic Graph (DAG). This microsim shows how topological sorting of the DAG determines the safe deployment order for IT infrastructure components, ensuring that all dependencies are satisfied before each component is deployed.

## Overview

In modern IT infrastructure, components have dependencies on each other. A web application depends on a database, which depends on a database server. The Directed Acyclic Graph (DAG) structure is fundamental to ensuring valid deployment ordering because it:

1. **Prevents circular dependencies**: The "acyclic" property ensures no component can depend on itself through a chain of dependencies
2. **Enables topological sorting**: Any valid topological sort of the DAG provides a safe deployment order
3. **Guarantees feasibility**: If the dependency graph is a DAG, a valid deployment order always exists

This visualization demonstrates these concepts with realistic IT infrastructure components organized into four deployment layers.

## Features

### Node Types

The deployment graph includes four types of components, each representing a different layer in the deployment sequence:

- **InfrastructureComponent** (Gray, Box): Core infrastructure servers with no dependencies
  - Properties: name, deployment_order, deployment_time, criticality, layer
  - Examples: Database Server, Application Server, Load Balancer
  - Deployment characteristics: These deploy first as they have no dependencies

- **DataComponent** (Orange, Database): Data services that depend on infrastructure
  - Properties: name, deployment_order, deployment_time, criticality, layer
  - Examples: Database Schema, Configuration Service
  - Deployment characteristics: Depend on specific infrastructure components being available

- **ApplicationComponent** (Light Blue, Circle): Application services that depend on data and infrastructure
  - Properties: name, deployment_order, deployment_time, criticality, layer
  - Examples: API Service, Web Frontend
  - Deployment characteristics: Require both infrastructure and data components to be ready

- **IntegrationComponent** (Purple, Hexagon): Integration and monitoring tools that depend on applications
  - Properties: name, deployment_order, deployment_time, criticality, layer
  - Examples: Monitoring Agent, Log Collector
  - Deployment characteristics: Deploy last, after applications are running

### Interactive Features

- **Hover Tooltips**: Hover over any node to see its type and properties in a tooltip
- **Click for Details**: Click on a node to display full details in the right sidebar
- **Search**: Use the search box to find nodes by name or property values
- **Filter by Type**: Toggle checkboxes to show or hide specific node types
- **Select All/Unselect All**: Bulk controls to quickly filter all node types
- **Force-Directed Layout**: Automatic node positioning using physics simulation
- **Show Deployment Path** 🚀: Click this button to:
  - Perform a topological sort of the DAG
  - Animate highlighting of nodes in deployment order
  - Display the complete deployment sequence in the sidebar
  - Show total deployment time across all components

### Understanding the Arrows

In this visualization, arrows point **from dependent to dependency**. This means:
- An arrow from "API Service" to "Database Schema" means API Service **depends on** Database Schema
- To find deployment order, follow arrows **backwards** from any component to find what must be deployed first
- The topological sort reverses these dependencies to produce the correct deployment sequence

## Educational Insights

This microsim teaches several key concepts about DAGs in IT management:

1. **DAG Structure Guarantees Valid Ordering**: Because the graph has no cycles, we can always determine a valid deployment sequence. If there were a cycle (A depends on B, B depends on C, C depends on A), deployment would be impossible.

2. **Multiple Valid Topological Sorts**: A DAG can have multiple valid topological orderings. For example, if Database Server and Application Server have no dependencies on each other, they can be deployed in either order. The "Show Deployment Path" feature demonstrates one valid ordering.

3. **Dependency Layers Emerge Naturally**: Notice how the deployment_order property (1, 2, 3, 4) emerges from the dependency structure. Infrastructure components with no dependencies have order 1, components that depend only on infrastructure have order 2, and so on.

4. **Criticality and Deployment Time**: Each component has heterogeneous properties including criticality (high/medium/low) and deployment_time (in minutes). These properties help with deployment planning but don't affect the fundamental ordering constraints imposed by the DAG.

5. **Real-World Application**: This pattern is used in:
   - Build systems (make, gradle, webpack)
   - Package managers (npm, pip, maven)
   - Infrastructure as Code (Terraform, CloudFormation)
   - CI/CD pipelines
   - Microservices orchestration

## Data Structure

The visualization uses a JSON data structure with nodes and edges forming a DAG:

```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Database Server",
      "type": "InfrastructureComponent",
      "properties": {
        "name": "Database Server",
        "deployment_order": 1,
        "deployment_time": 15,
        "criticality": "high",
        "layer": "Infrastructure"
      },
      "shape": "box",
      "color": "#94a3b8",
      "size": 40
    }
  ],
  "edges": [
    {
      "from": 4,
      "to": 1,
      "label": "DEPENDS_ON",
      "arrows": "to"
    }
  ]
}
```

## Implementation Notes

- **Library**: vis-network JavaScript library for graph visualization
- **Layout**: Force-directed using Barnes-Hut algorithm
- **Algorithm**: Kahn's algorithm for topological sorting
- **Animation**: Sequential node highlighting with 1-second intervals
- **Data File**: `deployment-dag-data.json`

## Next Steps

### For Students

1. **Explore the Graph**: Use the filter controls to view each layer independently
2. **Understand Dependencies**: Click on nodes to see their properties and identify their dependencies
3. **Watch the Deployment**: Click "Show Deployment Path" to see the topological sort in action
4. **Experiment**: Consider what would happen if you added a dependency from a lower-layer component to a higher-layer one

### For Instructors

1. **Modify the Graph**: Edit `deployment-dag-data.json` to add new components or dependencies
2. **Introduce Complexity**: Add more components to demonstrate larger-scale deployment scenarios
3. **Test Understanding**: Ask students to manually perform a topological sort before using the visualization
4. **Create Exercises**: Have students identify the critical path (longest deployment sequence)

### For Developers

1. **Extend the Visualization**: Add features like critical path highlighting or parallel deployment grouping
2. **Add Validation**: Implement cycle detection to warn if a non-DAG structure is provided
3. **Export Functionality**: Add ability to export the deployment sequence to a deployment script
4. **Time Simulation**: Animate deployment with real-time progression based on deployment_time values

## References

- Kahn, A. B. (1962). "Topological sorting of large networks". *Communications of the ACM*, 5(11), 558-562.
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press. Chapter 22: Elementary Graph Algorithms.
- [Vis.js Network Documentation](https://visjs.github.io/vis-network/docs/network/)
