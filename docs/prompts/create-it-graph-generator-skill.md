# Specification: IT Graph Generator Skill

## Executive Summary

Create a Claude skill that generates interactive graph-model visualizations using vis-network library for IT management educational content. These microsims will be embedded in chapter content via iframes and follow the established pattern from [docs/sims/it-graph-nodes](vscode-webview://1811g1adu5d4a6d2td0ev05h357cd74c7pusfacjenslc0jddeis/docs/sims/it-graph-nodes/main.html).

**Skill Name** - it-graph-generator

## Business Context

- **Problem**: 10 graph-model visualizations are needed across the textbook (17.5% of all visualizations)
- **Highest ROI**: Priority score 6.67 (best effort-to-impact ratio)
- **Low effort**: Similar to existing microsims (effort rating: 1/10)
- **Target audience**: Graduate students (ISMG 620) learning IT management graphs

# Technical Architecture

**Definition;** A MicroSim is an educational program that run in a web browser with no dependency on backend databases.

### File Structure

Each microsim resides in `/docs/sims/<microsim-name>/` with:

```
/docs/it-icons            # over 70 SVG icons for network components
/docs/sims/<microsim-name>/
├── index.md              # Documentation and iframe link
├── main.html             # Main visualization page
├── script.js             # Core JavaScript logic
├── style.css             # Styling
├── <data-file>.json      # Graph data (nodes and optionally edges)
└── requirements.md       # Original specification (optional)


```

### Core Technology Stack

- **Library**: vis-network (<https://unpkg.com/vis-network/standalone/umd/vis-network.min.js>)
- **Data Format**: JSON with nodes array and optional edges array
- **Layout Engine**: Force-directed (Barnes-Hut physics)
- **Icons**: MIT-licensed SVG icons from `/docs/it-icons/` (optional)

## Data Schema

### Node Schema

```
{
  "id": <number>,
  "label": "<display text>",
  "type": "<NodeType>",
  "properties": {
    "<key>": "<value>",
    ...
  },
  "shape": "circle|box|database|triangle|hexagon|dot",
  "color": "#hexcode",
  "size": <number>,
  "icon": "../../it-icons/<icon-name>.svg" (optional)
}

```

### Edge Schema (optional)

```
{
  "from": <node_id>,
  "to": <node_id>,
  "label": "<relationship_type>",
  "arrows": "to|from|to,from",
  "color": "#hexcode" (optional),
  "dashes": <boolean> (optional)
}

```

## Required Features

### 1. Core Interactive Features

- **Hover tooltips**: Display node type and all properties
- **Click for details**: Show full property panel in right sidebar
- **Search functionality**: Type-ahead search by node name or property value
- **Filter by type**: Checkboxes to show/hide specific node types
- **Select All/Unselect All**: Bulk filter controls
- **Force-directed layout**: Automatic node positioning with physics

### 2. Visual Elements

#### Canvas Container

- Dimensions: Flexible width × 600px height
- Background: Light gray (#f8fafc)
- Border: 2px solid (#e2e8f0)
- Border radius: 8px

#### Legend (top-left overlay)

- White background with border
- Shows node types with icons/shapes and colors
- Title: "Node Types"
- Icons (if available) or colored shapes
- Always look in /docs/it-icons first and only use shapes if an icon is not available

#### Callouts (bottom-left overlay)

- Blue background with white text
- Dismissible with "OK" button
- 3-4 educational messages
- Fade out when dismissed

#### Sidebar (right panel)

- Width: 280px
- Height: 600px (matches canvas)
- Shows selected node details
- Displays node type (e.g., `:BusinessService`)
- Lists all properties with formatted key-value pairs
- Property count badge at bottom

#### Educational Notes (below canvas)

- Green background (#f0fdf4)
- Left border: 4px solid green
- 3 notes with emoji icons
- Explains educational insights

### 3. Layout and Controls

#### Header

- Title (h1) and subtitle
- Search box (right-aligned)
    - Input field with placeholder
    - Blue search button

#### Filter Controls

- Horizontal layout with checkboxes
- One checkbox per node type
- "Select All" and "Unselect All" buttons
- Gray background panel

#### Main Content Area

- Two-column layout: canvas (flex) + sidebar (280px fixed)
- Gap: 20px

## User Interface Patterns

### Color Scheme

```
// Standard color palette
const nodeColors = {
  BusinessService: "#ec4899",  // Pink
  Application: "#7dd3fc",       // Light blue
  Database: "#fb923c",          // Orange
  Server: "#94a3b8",            // Gray
  Location: "#4ade80",          // Green
  Team: "#a78bfa",              // Purple
  User: "#f59e0b"               // Amber
};

```

### Shape Mappings

Use icons from /docs/

```
const nodeShapes = {
  BusinessService: "circle",
  Application: "box",
  Database: "database",
  Server: "box",
  Location: "triangle",
  Team: "hexagon",
  User: "dot"
};

```

### Size Guidelines

- **Large** (40px): High-level business entities
- **Medium** (30px): Applications, databases, servers
- **Small** (25px): Supporting entities (teams, users, locations)

### Vis-Network Configuration

### Physics Options

```
physics: {
  enabled: true,
  stabilization: {
    iterations: 200
  },
  barnesHut: {
    gravitationalConstant: -4000,
    centralGravity: 0.3,
    springLength: 150,
    springConstant: 0.04,
    damping: 0.09,
    avoidOverlap: 0.5
  }
}

```

### Interaction Options

```
interaction: {
  hover: true,
  tooltipDelay: 100
}

```

### Node Styling

```
nodes: {
  font: { size: 14, color: '#1e293b' },
  borderWidth: 2,
  borderWidthSelected: 4
}

```

## Educational Components

### Callout Messages (4 standard messages)

1.  "Each node represents a unique entity in your IT infrastructure"
2.  "Nodes can have different properties---no rigid schema required!"
3.  "Labels help categorize and filter nodes efficiently"
4.  "In the next section, we'll connect these nodes with relationships"

### Educational Notes (3 standard notes)

1.  "📌 Notice how different node types have completely different properties"
2.  "💡 This flexibility would require multiple tables or sparse schemas in relational databases"
3.  "🎯 Graph databases embrace heterogeneous data naturally"

## Implementation Requirements

### index.md Template

```
# <Title>

[View <Title> Fullscreen](main.html){ .md-button .md-button--primary }

<Description paragraph>

## Overview

<Explain the concept being demonstrated>

## Features

### Node Types

<List each node type with properties>

### Interactive Features

- **Hover Tooltips**: ...
- **Click for Details**: ...
- **Search**: ...
- **Filter by Type**: ...

## Educational Insights

<3 key learning points>

## Data Structure

<Show sample JSON>

## Implementation Notes

- **Library**: vis-network JavaScript library
- **Layout**: Force-directed using Barnes-Hut algorithm
- **Icons**: IT infrastructure icons from `/docs/it-icons/` (MIT License)

```

### main.html Structure

- HTML5 doctype
- Viewport meta tag for responsiveness
- Link to style.css
- CDN link to vis-network
- Container with header, controls, main-content, sidebar
- Script tag loading script.js

### script.js Core Functions

```
// Required global functions
async function init()
function initializeFilterCheckboxes()
function initializeLegend()
function initializeNetwork()
function createTooltip(node)
function displayNodeDetails(nodeData)
function applyFilters()
function searchNodes()
function selectAllFilters()
function unselectAllFilters()
function setupEventListeners()

```

### style.css Key Classes

- `.container` \- Main wrapper
- `.header-content` \- Flex header with title and search
- `.search-box` \- Search input and button
- `.filter-box` \- Filter controls panel
- `.main-content` \- Two-column layout
- `.canvas-container` \- Visualization area
- `#network` \- Vis-network canvas
- `.legend` \- Overlay legend
- `.callouts` \- Educational callouts
- `.sidebar` \- Node details panel
- `.educational-notes` \- Bottom notes section

## Skill Input Parameters

The skill should accept:

1.  **microsim\_name** (required): Directory name (kebab-case)
2.  **title** (required): Human-readable title
3.  **description** (required): One-paragraph description
4.  **purpose** (required): Educational purpose statement
5.  **node\_types** (required): Array of node type objects:
    ```
    {
      type: "BusinessService",
      shape: "circle",
      color: "#ec4899",
      size: 40,
      icon: "../../it-icons/service.svg" (optional),
      properties: ["name", "SLA_tier", "owner", ...]
    }

    ```

6.  **sample\_nodes** (required): Array of sample node data (8-10 nodes)
7.  **include\_edges** (optional): Boolean (default: false)
8.  **edges** (optional): Array of edge data if include\_edges is true
9.  **educational\_insights** (required): Array of 3 key learning points
10.  **custom\_callouts** (optional): Override default callout messages
11.  **custom\_notes** (optional): Override default educational notes

## Skill Output

The skill will:

1.  **Create directory**: `/docs/sims/<microsim-name>/`
2.  **Generate files**:
    - `index.md` \- Documentation with iframe link
    - `main.html` \- Complete visualization page
    - `script.js` \- JavaScript implementation
    - `style.css` \- Complete stylesheet
    - `<microsim-name>-data.json` \- Graph data
3.  **Update navigation**: Add link to `/docs/sims/index.md` (optional)
4.  **Report**: Summary of created files with file paths

## Quality Assurance Checklist

-  All node IDs are unique integers
-  All node types have consistent color/shape mappings
-  Properties are heterogeneous (different per node type)
-  Legend displays all node types correctly
-  Search finds nodes by label and property values
-  Filter checkboxes work for all node types
-  Sidebar displays selected node details
-  Callouts are dismissible
-  Force-directed layout stabilizes within 5 seconds
-  Hover tooltips show formatted properties
-  Educational notes are contextually relevant
-  Icons load correctly (if used)
-  Responsive design works on 1400px+ screens

## Example Use Cases (from details-analysis.md)

1.  **IT Asset Relationship Graph** (Chapter: IT Asset Management Fundamentals)
2.  **IT Infrastructure Nodes** (Chapter: Graph Theory)
3.  **Deployment Dependencies DAG** (Chapter: Graph Theory)
4.  **Dependency Graph with Cycle Detection** (Chapter: Graph Database Technologies)
5.  **Cypher Pattern Matching** (Chapter: Query Languages)
6.  **Bidirectional Dependency Tracing** (Chapter: Graph Traversal)
7.  **Multi-Layer Dependency Map** (Chapter: Graph Traversal)
8.  **Business Service Mapping** (Chapter: Business Services)
9.  **RBAC Permission Graph** (Chapter: Compliance)

## Integration with Intelligent Textbook


### Embedding in Chapter Content

```
## Section Title

<explanation text>

<iframe src="../../sims/<microsim-name>/main.html" width="100%" height="700px"
        style="border: 2px solid #e2e8f0; border-radius: 8px;">
</iframe>

[View Fullscreen](../../sims/<microsim-name>/main.html){ .md-button }

<followup text>

```

### MkDocs Configuration

Add to `mkdocs.yml` navigation:

```
nav:
  - MicroSims:
    - sims/index.md
    - <Title>: sims/<microsim-name>/index.md

```

## Skill Behavior Guidelines

### When to Generate Icons vs Shapes

- **Use icons**: If icon path is provided and file exists
- **Use shapes**: As default or fallback
- **Icon sources**: `/docs/it-icons/` directory (MIT-licensed Bootstrap icons)

### Data Validation

- Validate node IDs are unique
- Validate edge references point to existing nodes
- Validate colors are valid hex codes
- Validate shapes are supported vis-network shapes
- Warn if properties are missing or malformed

### Error Handling

- Graceful fallback if icons don't load
- Display error message if JSON fails to load
- Console warnings for data validation issues

### Performance Considerations

- Optimal node count: 8-20 nodes
- Physics stabilization timeout: 5 seconds
- Disable physics after stabilization for better performance

## Success Metrics

A successful it-graph microsim should:

1.  Load and render within 2 seconds
2.  Be interactive immediately after stabilization
3.  Clearly demonstrate the intended concept
4.  Match the visual style of existing it-graph microsims
5.  Work on screens 1280px+ wide
6.  Be embeddable in chapter content via iframe

## Skill Storage

When finished, the skill will be written to /skills/it-graph-generator in the current repository.

## Next Steps to Create the Skill

1.  **Use the skill-creator skill** to generate this new skill
2.  **Test with one example** (e.g., IT Asset Relationship Graph)
3.  **Validate output** against this specification
4.  **Iterate** based on quality assurance checklist
5.  **Document skill usage** in skill's README

Would you like me to now invoke the `skill-creator` skill to build this `it-graph-generator` generator skill using this specification?