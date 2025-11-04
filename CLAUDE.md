# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **IT Management Graph educational website** built with MkDocs Material. It documents a graduate-level course (ISMG 620) on the evolution from legacy CMDB (Configuration Management Database) systems to modern graph-based IT management solutions. The site includes learning graphs, interactive visualizations (MicroSims), and educational content about graph databases in IT operations.

**Live Site**: https://dmccreary.github.io/it-management-graph/

## Key Commands

### Build and Preview
```bash
# Serve locally with live reload (default: http://127.0.0.1:8000)
mkdocs serve

# Build static site to ./site directory
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

### Learning Graph Management
```bash
# Validate learning graph JSON against schema
cd docs/learning-graph
./validate-learning-graph.sh learning-graph.json

# Convert CSV to JSON format for visualization
python3 csv-to-json.py

# Analyze graph quality (DAG verification, orphans, dependencies)
python3 analyze-graph.py

# Generate taxonomy distribution report
python3 taxonomy-distribution.py

# Add taxonomy classifications to concepts
python3 add-taxonomy.py
```

## Architecture

### Learning Graph Data Flow

The learning graph system follows this architecture:

1. **Source Data**: `docs/learning-graph/learning-graph.csv` - Concepts with dependencies and taxonomy IDs
2. **Conversion**: `csv-to-json.py` transforms CSV into vis.js format with groups/colors
3. **Output**: `docs/learning-graph/learning-graph.json` - JSON file with metadata, nodes, edges, and group styling
4. **Visualization**: `docs/sims/graph-viewer/` - Interactive vis.js network viewer
5. **Validation**: `validate-learning-graph.py` checks JSON against schema

### Learning Graph JSON Structure

The JSON file has three key sections:

- **metadata**: Course title, description, creator, version, schema URL, license
- **groups**: Taxonomy categories (e.g., ITIL, RDBMS, GRAPH) with `classifierName`, `color`, and `font` properties
- **nodes**: Concepts with `id`, `label`, `group`, `title` (hover text)
- **edges**: Dependencies with `from`, `to`, `arrows` configuration

The `classifierName` in groups is used for display in the legend (e.g., "RDBMS" → "Relational Database").

### Graph Viewer (MicroSim)

Location: `docs/sims/graph-viewer/`

Key files:
- `main.html`: Minimal wrapper that loads the viewer
- `combined-viewer.html`: Full-featured standalone version
- `script.js`: Core vis.js implementation with search, filtering, and statistics
- `local.css`: Styling for sidebar, legend, and controls
- `index.md`: Documentation and use cases

Features:
- **Search**: Type-ahead search with autocomplete for visible nodes
- **Taxonomy Filtering**: Checkboxes to toggle visibility by category
- **Statistics**: Real-time counts of nodes, edges, and orphans
- **Legend**: Uses `classifierName` from groups data for display labels

### MkDocs Configuration

- `mkdocs.yml`: Site structure, theme (Material), plugins (search, social), navigation tree
- Theme customizations: `docs/css/extra.css`, `docs/js/extra.js`
- Navigation includes: Course description, learning graph, MicroSims, prompts, glossary, references

### Python Scripts

All learning graph scripts are in `docs/learning-graph/`:

- Scripts use type hints and docstrings
- Color configuration is in `color-config.json` (maps taxonomy IDs to colors)
- Metadata configuration is in `metadata.json` (course info, creator, license)
- Reports are generated as Markdown files (e.g., `quality-metrics.md`, `taxonomy-distribution.md`)

## Development Workflow

### Modifying the Learning Graph

1. Edit `docs/learning-graph/learning-graph.csv` (or regenerate from source)
2. Run `python3 csv-to-json.py` to update the JSON file
3. Run `python3 analyze-graph.py` to check quality metrics
4. Run `./validate-learning-graph.sh learning-graph.json` to validate
5. Preview changes with `mkdocs serve`
6. The graph viewer at `/sims/graph-viewer/` will automatically use the updated JSON

### Modifying the Graph Viewer

- Edit `docs/sims/graph-viewer/script.js` for functionality changes
- Edit `docs/sims/graph-viewer/local.css` for styling changes
- The viewer loads data from `../../learning-graph/learning-graph.json` (relative path)
- Test by opening `main.html` in a browser or via MkDocs serve

### Content Organization

- `docs/`: All content (Markdown, scripts, visualizations)
- `docs/learning-graph/`: Learning graph data and Python tooling
- `docs/sims/`: Interactive visualizations (MicroSims)
- `docs/prompts/`: AI prompts for generating course content
- `site/`: Generated static site (gitignored, created by `mkdocs build`)

## Important Patterns

### Group/Taxonomy System

When working with the learning graph visualization:

- Groups are defined in the JSON `groups` object with keys like "ITIL", "RDBMS", "GRAPH"
- Each group has a `classifierName` (display name), `color`, and `font` settings
- The graph viewer legend should display `classifierName` instead of the group key
- Example: Group key "RDBMS" has `classifierName: "Relational Database"`

### Vis.js Network Integration

The graph viewer uses vis.js DataSets:
- `nodes`: vis.DataSet with `hidden` property for filtering
- `edges`: vis.DataSet filtered by node visibility
- Network options include `groups` object from JSON for styling
- Focus on a node: `network.focus(nodeId, {animation, scale})`

### File Paths in MicroSims

MicroSims are embedded in MkDocs pages via iframes:
- Index page: `docs/sims/<sim-name>/index.md` with link to `main.html`
- Main HTML: `docs/sims/<sim-name>/main.html` (minimal wrapper)
- Relative paths are used to reference learning graph data: `../../learning-graph/learning-graph.json`

## License

Content is licensed under **Creative Commons ShareAlike Attribution Noncommercial (CC BY-NC-SA 4.0)**.
