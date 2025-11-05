---
hide:
  toc
---
# IT Assets Hierarchy - Interactive Infographic

<iframe src="main.html" width="100%" height="700" style="border: 1px solid #ccc; border-radius: 8px;"></iframe>

An interactive radial visualization showing the hierarchical relationships between different types of IT assets, with detailed information about management considerations, lifecycle, and CMDB integration.

## Features

- **Radial Layout**: Central "IT Assets" hub with three primary branches radiating outward
- **Color-Coded Categories**: Hardware (orange), Software (gold), Digital Services (green)
- **Interactive Exploration**:
  - Hover over nodes to see definitions
  - Click on nodes to view detailed information panels
- **Comprehensive Details**: Each category includes:
  - Typical lifecycle stages
  - Key management challenges
  - CMDB integration points
  - Example items
  - Primary stakeholders
  - Management focus areas

## Categories

### Hardware Assets (Orange)
Physical computing infrastructure including servers, network equipment, end-user devices, and storage systems.

### Software Assets (Gold)
Licensed software applications including applications, operating systems, middleware, and licenses.

### Digital Services (Green)
Cloud-based services and digital resources including SaaS subscriptions, cloud resources, data assets, and APIs/integrations.

## Use Cases

1. **Onboarding**: Introduce new IT staff to the breadth of IT asset types
2. **CMDB Planning**: Understand what asset types need to be tracked and their key attributes
3. **Asset Management Training**: Teach the differences between asset categories and their management needs
4. **Strategic Planning**: Visualize the IT portfolio composition and identify focus areas

## How to Use

1. **Explore the hierarchy**: Click on any category circle to see detailed information
2. **View definitions**: Hover over nodes to see quick definitions
3. **Learn management details**: Click to open the detail panel showing:
   - Lifecycle stages (procurement → deployment → operation → retirement)
   - Management challenges specific to each category
   - How to integrate with CMDB systems
   - Real-world examples
   - Stakeholder responsibilities

## Technical Details

- Built with [D3.js](https://d3js.org/) v7
- Radial tree layout using `d3.tree()` with polar coordinates
- Responsive design that adapts to window size
- Structured hierarchical data with three levels of depth



## Learning Objectives

After interacting with this visualization, you should be able to:

1. Identify the three main categories of IT assets
2. Explain the key differences in how hardware, software, and digital services are managed
3. Describe the typical lifecycle for each asset category
4. Understand what attributes should be tracked in a CMDB for each type
5. Recognize the shift from traditional hardware/software assets to cloud-based digital services

## Related Topics

- [CMDB Fundamentals](../../concepts/cmdb.md)
- [IT Service Management](../../concepts/itsm.md)
- [Asset Lifecycle Management](../../concepts/lifecycle.md)
- [Cloud vs. On-Premise Assets](../../concepts/cloud-comparison.md)
