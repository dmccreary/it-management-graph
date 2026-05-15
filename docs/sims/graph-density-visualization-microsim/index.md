---
title: Graph Density Visualization MicroSim
description: Graph Density Visualization MicroSim
status: scaffold
library: TBD
bloom_level: TBD
---

# Graph Density Visualization MicroSim

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Query Performance And Real Time Ops](../../chapters/09-query-performance-and-real-time-ops/index.md).

```text
Type: microsim

    Learning objective: Help students understand how graph density affects traversal performance and query complexity

    Canvas layout (900x600px):
    - Left side (600x600): Main drawing area showing an interactive graph network
    - Right side (300x600): Control panel with sliders, buttons, and statistics display

    Visual elements in main drawing area:
    - Nodes represented as circles (20px diameter)
    - Edges represented as lines with arrow heads
    - Color coding:
      - Starting node: Bright green with glow effect
      - Nodes at 1 hop away: Light green
      - Nodes at 2 hops away: Yellow
      - Nodes at 3+ hops away: Orange
      - Unconnected nodes: Light gray
    - Layout: Force-directed with moderate repulsion to prevent overlap

    Interactive controls in right panel:

    1. "Number of Nodes" slider:
       - Range: 10 to 100 nodes
       - Default: 30 nodes
       - Step: 5
       - Display current value above slider

    2. "Graph Density" slider:
       - Range: 1% to 50%
       - Default: 5%
       - Step: 1%
       - Display current value as percentage
       - Color indicator: Green (1-10%), Yellow (11-25%), Red (26-50%)

    3. "Regenerate Graph" button:
       - Large blue button
       - Creates new random graph with current parameters
       - Animates nodes flying in from random positions

    4. "Start Traversal" button:
       - Large green button (disabled until graph generated)
       - Click to begin breadth-first traversal animation from random starting node

    5. "Reset Colors" button:
       - Orange button
       - Returns all nodes to default gray color

    6. "Animation Speed" slider:
       - Range: 100ms to 2000ms per step
       - Default: 500ms
       - Label: "Traversal speed"

    Statistics display panel (below controls):
    - Current Statistics (updated in real-time):
      - "Total Nodes: [N]"
      - "Total Edges: [E]"
      - "Actual Density: [X.XX]%"
      - "Max Possible Edges: [N*(N-1)/2]"
      - "Average Node Degree: [X.X]"
      - "Nodes Reachable from Start: [N] ([X]%)"

    - After traversal completes:
      - "Traversal Depth: [N] hops"
      - "Nodes Visited: [N]"
      - "Edges Traversed: [N]"
      - "Time Elapsed: [X.XX] seconds (simulated)"

    Default parameters:
    - Nodes: 30
    - Density: 5%
    - Animation speed: 500ms
    - Layout: Force-directed with Barnes-Hut optimization

    Behavior and interactions:

    1. When page loads:
       - Display empty canvas with message: "Click 'Regenerate Graph' to begin"
       - All buttons except "Regenerate Graph" are disabled

    2. When "Regenerate Graph" clicked:
       - Calculate number of edges needed: edges = density * (nodes * (nodes-1) / 2)
       - Create nodes at random positions
       - Create edges randomly ensuring no duplicate edges
       - Animate nodes settling into force-directed layout
       - Enable "Start Traversal" button
       - Update statistics panel

    3. When density slider changed:
       - Update color indicator (green/yellow/red)
       - Display warning if density > 25%: "Warning: High density may slow traversal"

    4. When "Start Traversal" clicked:
       - Select random starting node
       - Animate breadth-first traversal:
         - Color starting node green
         - For each hop level:
           - Highlight edges being traversed (thicken and pulse)
           - Color discovered nodes based on hop distance
           - Wait for animation delay
           - Update "Nodes Visited" counter
       - When complete:
         - Display completion message: "Traversal complete! Reachable: [N] of [Total] nodes"
         - Show any unreachable nodes in dark gray with dashed outline

    5. Hover interactions:
       - Hovering over node shows tooltip with:
         - Node ID
         - Degree (number of connections)
         - Distance from starting node (if traversal run)
       - Hovering over edge shows tooltip with:
         - From node → To node
         - Edge index

    6. Click interactions:
       - Clicking a node makes it the new starting node for next traversal
       - Node gets green outline to indicate selection
       - Status message: "Node [ID] selected as new start"

    Educational callouts:
    - Below graph: "Notice how higher density creates more paths to explore but also more connections to traverse"
    - After first traversal: "In IT graphs, typical density is 2-5%. Most components don't connect to most others!"
    - When density > 20%: "Real IT graphs rarely exceed 10% density. This would indicate unusual architecture."

    Implementation notes:
    - Use p5.js for rendering and animation
    - Use simple physics for force-directed layout (not full d3-force)
    - Store graph as adjacency list for efficient traversal
    - Implement BFS using queue data structure
    - Use frameCount and modulo for animation timing
    - Limit frame rate to 30fps for smooth animation
    - Add "pause/resume" functionality if traversal is too fast

    Code structure suggestions:
    - Class Graph: manages nodes, edges, density calculation
    - Class Node: position, velocity, connections, display state
    - Class Edge: from, to, display state
    - Function generateGraph(numNodes, density)
    - Function runBFS(startNode)
    - Function updatePhysics() for force-directed layout
    - Function drawGraph() for rendering
```

## Related Resources

- [Chapter 9: Query Performance And Real Time Ops](../../chapters/09-query-performance-and-real-time-ops/index.md)
