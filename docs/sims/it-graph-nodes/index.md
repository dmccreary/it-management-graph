# IT Infrastructure Graph Nodes

[View IT Infrastructure Nodes Fullscreen](main.html){ .md-button .md-button--primary }

This interactive visualization demonstrates how different IT infrastructure entities are represented as nodes in a graph database, showcasing node labels, properties, and visual styling.

## Overview

Graph databases store data as nodes and relationships. This MicroSim focuses exclusively on **nodes** - the entities in your IT infrastructure - before introducing relationships in later visualizations.

## Features

### Node Types

The visualization includes 10 sample nodes across 6 different types:

1. **BusinessService** (pink circles, large)
   - Represents customer-facing services
   - Properties: name, SLA tier, business owner, revenue impact
   - Example: "Online Banking Portal"

2. **Application** (light blue rounded squares, medium)
   - Software applications in the stack
   - Properties: name, version, language, deployment environment, health status
   - Examples: "Customer API v2.3", "Auth Service v1.8"

3. **Database** (orange database shapes, medium)
   - Data storage systems
   - Properties: name, database type, size, backup frequency, last backup
   - Examples: "CustomerDB" (PostgreSQL), "SessionStore" (Redis)

4. **Server** (gray rectangles, medium)
   - Physical or virtual servers
   - Properties: hostname, IP address, OS, CPU cores, RAM, status
   - Examples: "web-prod-01", "db-prod-01"

5. **Location** (green triangles, small)
   - Physical data center locations
   - Properties: name, city, region, facility type, power redundancy
   - Example: "DC-EAST-1" (New York)

6. **Team** (purple hexagons, small)
   - Organizational teams managing infrastructure
   - Properties: name, department, team lead, on-call rotation
   - Example: "Platform Engineering"

7. **User** (orange dots, small)
   - Individual users in the organization
   - Properties: name, department, role, supervisor, on-call calendar
   - Example: "Sue Smith"

### Interactive Features

- **Hover Tooltips**: Hover over any node to see all properties in a formatted tooltip
- **Click for Details**: Click a node to display full property panel in the right sidebar
- **Search**: Type a node name or property value to locate and zoom to matching nodes
- **Filter by Type**: Use checkboxes to show/hide specific node types
- **Force-Directed Layout**: Nodes automatically spread out using physics simulation

### Visual Styling

- **Shapes**: Different shapes for each node type (circles, squares, databases, triangles, hexagons, dots)
- **Colors**: Color-coded by type (pink, light blue, orange, gray, green, purple)
- **Sizes**: Vary by importance (larger = more important)
- **Borders**: 2px solid borders, 4px when selected

## Educational Insights

This visualization highlights three key advantages of graph databases:

1. **Schema Flexibility**: Notice how each node type has completely different properties. A BusinessService has "revenue_impact_annual" while a Server has "cpu_cores" - no rigid schema required.

2. **Heterogeneous Data**: Traditional relational databases would require multiple tables or sparse schemas with many NULL values. Graph databases embrace this heterogeneity naturally.

3. **Label-Based Organization**: Node labels (`:BusinessService`, `:Server`, etc.) provide flexible categorization without requiring inheritance hierarchies or complex joins.

## Data Structure

Nodes are loaded from `nodes-data.json` with this structure:

```json
{
  "id": 1,
  "label": "Online Banking Portal",
  "type": "BusinessService",
  "properties": {
    "name": "Online Banking Portal",
    "SLA_tier": "Tier 1",
    "business_owner": "Jane Smith",
    "revenue_impact_annual": "$45M"
  },
  "shape": "circle",
  "color": "#ec4899",
  "size": 40
}
```

## Implementation Notes

- **Library**: vis-network JavaScript library
- **Layout**: Force-directed using Barnes-Hut algorithm
- **No Edges**: This visualization focuses solely on nodes (relationships added in next section)
- **Icons**: IT infrastructure icons from `/docs/it-icons/` (MIT License)

## Usage Tips

1. **Explore Node Types**: Use the filter checkboxes to isolate specific node types
2. **Examine Properties**: Click nodes to see how different entities have unique property sets
3. **Search**: Find nodes quickly by typing any property value (e.g., "PostgreSQL", "Production")
4. **Zoom and Pan**: Use mouse wheel to zoom, drag to pan around the network

## Next Steps

In the next visualization, we'll add **relationships** (edges) between these nodes to show how they're connected - for example, which Applications run on which Servers, or which Teams manage which Services.

## Color Scheme

- **Pink** (#ec4899): Business services (customer-facing layer)
- **Light Blue** (#7dd3fc): Applications (software layer)
- **Orange** (#fb923c): Databases (data layer)
- **Gray** (#94a3b8): Servers (infrastructure layer)
- **Green** (#4ade80): Locations (physical layer)
- **Purple** (#a78bfa): Teams (organizational layer)
