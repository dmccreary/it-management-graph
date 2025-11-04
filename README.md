# IT Management Graph

![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue.svg)
![MkDocs](https://img.shields.io/badge/Built%20with-MkDocs-526CFE?logo=materialformkdocs)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)

**Live Site**: [https://dmccreary.github.io/it-management-graph/](https://dmccreary.github.io/it-management-graph/)

## About

This repository contains educational materials for **ISMG 620: IT Management Graphs - From Legacy CMDB to Modern Graph-Based Solutions**, a graduate-level course examining the evolution of IT configuration management from traditional relational database approaches to modern graph-based solutions.

The site explores why legacy Configuration Management Database (CMDB) implementations have consistently failed despite decades of investment, and how graph databases are revolutionizing IT management through real-time multi-hop transitive dependency analysis.

## Features

- **Learning Graph Visualization**: Interactive network visualization of 200+ IT management concepts with dependencies
- **MicroSims**: Web-based interactive simulations using vis.js for exploring concept relationships
- **Taxonomy System**: Categorization across 12+ domains (ITIL, Graph Databases, Query Performance, etc.)
- **Python Toolchain**: Scripts for validating, analyzing, and transforming learning graph data
- **Comprehensive Documentation**: Course materials, glossary, references, and prompts for AI-assisted learning

## Content Structure

- **Course Description**: Graduate-level learning outcomes across Bloom's Taxonomy levels
- **Learning Graph**: 200+ concepts with dependencies, taxonomy classifications, and quality metrics
- **Interactive Viewer**: Search, filter by taxonomy, view statistics, and explore concept relationships
- **Python Scripts**: CSV-to-JSON conversion, graph validation, quality analysis, taxonomy distribution
- **Educational Prompts**: AI prompts for generating course content and assessments

## Quick Start

### Prerequisites

- Python 3.11+
- MkDocs and MkDocs Material theme

### Installation

```bash
# Clone the repository
git clone https://github.com/dmccreary/it-management-graph.git
cd it-management-graph

# Install MkDocs (if not already installed)
pip install mkdocs mkdocs-material

# Serve locally
mkdocs serve
```

Visit [http://127.0.0.1:8000](http://127.0.0.1:8000) to view the site.

### Building

```bash
# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Acknowledgements

This project is built with open source software:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator for project documentation
- **[MkDocs Material](https://squidfunk.github.io/mkdocs-material/)** - Material Design theme for MkDocs
- **[vis.js](https://visjs.org/)** - Dynamic, browser-based network visualization library
- **[Python](https://www.python.org/)** - Data processing and validation scripts
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the open source community for making educational content creation accessible and collaborative.

## License

All content is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

You are free to:
- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

Under the following terms:
- Attribution — You must give appropriate credit
- NonCommercial — You may not use the material for commercial purposes
- ShareAlike — If you remix or build upon the material, you must distribute under the same license

## Author

**Dan McCreary** - Creator and Course Developer

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
