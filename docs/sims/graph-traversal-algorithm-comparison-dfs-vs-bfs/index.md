---
title: Graph Traversal Algorithm Comparison: DFS vs BFS
description: Graph Traversal Algorithm Comparison: DFS vs BFS
status: scaffold
library: TBD
bloom_level: TBD
---

# Graph Traversal Algorithm Comparison: DFS vs BFS

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Graph Theory And Database Foundations](../../chapters/04-graph-theory-and-database-foundations/index.md).

```text
Type: microsim

    Learning objective: Demonstrate the differences between Depth-First Search and Breadth-First Search traversal algorithms through interactive animation, showing how each algorithm explores a dependency graph

    Canvas layout (1000x700px):
    - Left side (650x700): Drawing area showing application dependency graph
    - Right side (350x700): Control panel and explanation panel

    Visual elements in drawing area:
    - 15 application nodes arranged in a multi-layered dependency structure
    - Directed edges showing dependencies (arrows pointing from dependent to dependency)
    - Color coding for nodes based on traversal state
    - Animation showing traversal order with numbered labels

    Sample dependency network:
    - Root: "Customer Portal" (starting point)
      ├─ "API Gateway"
      │  ├─ "Auth Service"
      │  │  ├─ "User Database"
      │  │  └─ "LDAP Service"
      │  └─ "Rate Limiter"
      │     └─ "Redis Cache"
      ├─ "Web Server"
      │  ├─ "Static Assets CDN"
      │  └─ "Session Store"
      │     └─ "Redis Cache" (shared dependency)
      └─ "Monitoring Agent"
         └─ "Metrics Database"

    Interactive controls (right panel top section):
    - Radio buttons: Select algorithm
      ○ Depth-First Search (DFS)
      ○ Breadth-First Search (BFS)
    - Button: "Start Traversal" (begins animation)
    - Button: "Reset" (clears animation state)
    - Button: "Step Forward" (manual step-through)
    - Button: "Step Backward" (undo last step)
    - Slider: Animation speed (100ms to 2000ms per step)
    - Checkbox: "Show visit order numbers" (display sequence labels on nodes)
    - Checkbox: "Highlight current path" (show path from root to current node)

    Traversal behavior:

    DFS Animation:
    1. Start at "Customer Portal" (highlight green)
    2. Visit first neighbor "API Gateway" (highlight yellow)
    3. Continue to "Auth Service" (going deeper before exploring siblings)
    4. Visit "User Database" (deepest point on this branch)
    5. Backtrack to "Auth Service"
    6. Visit "LDAP Service"
    7. Backtrack to "API Gateway"
    8. Visit "Rate Limiter"
    9. Continue to "Redis Cache"
    10. Backtrack completely, explore "Web Server" branch
    11. Continue until all nodes visited

    BFS Animation:
    1. Start at "Customer Portal" (highlight green, depth 0)
    2. Visit ALL depth-1 neighbors: "API Gateway", "Web Server", "Monitoring Agent" (all highlighted yellow)
    3. Visit ALL depth-2 neighbors: "Auth Service", "Rate Limiter", "Static Assets CDN", "Session Store", "Metrics Database"
    4. Visit ALL depth-3 neighbors: "User Database", "LDAP Service", "Redis Cache"
    5. Continue until all nodes visited

    Visual styling during traversal:
    - Node colors:
      - White/Gray: Not yet visited
      - Green: Current node being visited
      - Yellow: Currently in queue/stack (BFS: all at current depth, DFS: current path)
      - Blue: Fully visited and processed
      - Light blue: Visited but neighbors not yet explored
    - Visit order numbers: Small badges showing sequence (1, 2, 3...)
    - Edges: Highlight edges being traversed in green
    - Path highlighting: Show route from root to current node in thick orange line
    - Animation: Smooth transitions between nodes with 500ms fade effects

    Explanation panel (right panel middle section):
    Dynamically updates based on selected algorithm:

    DFS Explanation:
    - "Depth-First Search explores deeply before broadly"
    - "Follows one path to its end, then backtracks"
    - "Uses a stack data structure (LIFO - Last In, First Out)"
    - "Good for: Finding paths, detecting cycles, exploring trees"
    - "Memory usage: Lower (only stores current path)"
    - Current statistics:
      - Nodes visited: X
      - Current depth: Y
      - Stack size: Z

    BFS Explanation:
    - "Breadth-First Search explores all neighbors at current depth first"
    - "Guarantees shortest path discovery"
    - "Uses a queue data structure (FIFO - First In, First Out)"
    - "Good for: Finding shortest paths, blast radius calculation, level-order processing"
    - "Memory usage: Higher (stores all nodes at current depth)"
    - Current statistics:
      - Nodes visited: X
      - Current depth: Y
      - Queue size: Z

    Statistics panel (right panel bottom section):
    Real-time metrics comparing algorithms:
    - Total nodes: 15
    - Nodes visited: X / 15
    - Edges traversed: Y
    - Average depth: Z
    - Visit order comparison: [visual timeline showing order differences]

    Default parameters:
    - Algorithm: BFS (selected by default)
    - Animation speed: 800ms per step
    - Show visit order: enabled
    - Highlight path: enabled
    - Starting node: "Customer Portal"

    Interactive learning features:
    - Pause at any step and hover nodes to see their traversal state
    - Click any node to see when it was visited in sequence
    - Toggle between algorithms mid-traversal to see different exploration patterns
    - "Compare" button: Run both algorithms side-by-side in split view

    Educational insights displayed:
    - "Notice how BFS discovers all immediate dependencies before going deeper"
    - "DFS follows one dependency chain completely before exploring alternatives"
    - "BFS guarantees shortest path—always finds closest nodes first"
    - "DFS uses less memory but might find longer paths first"
    - "Both algorithms visit all reachable nodes, just in different orders!"

    Implementation notes:
    - Use p5.js for canvas rendering and animation
    - Store graph as adjacency list for efficient traversal
    - Implement DFS with recursive call stack (or explicit stack)
    - Implement BFS with queue data structure
    - Use frameCount and state machine for animation control
    - Color interpolation for smooth state transitions
    - Replay capability: Store traversal history for backward stepping

    Canvas size: 1000x700px total (650px graph + 350px control panel)

    Color scheme:
    - Node states: White→Green→Yellow→Light blue→Blue (traversal progression)
    - Edges: Gray (default), Green (currently traversing), Light gray (already traversed)
    - Highlights: Orange for path, cyan for current depth level (BFS)
    - UI controls: Standard button and slider styling
```

## Related Resources

- [Chapter 4: Graph Theory And Database Foundations](../../chapters/04-graph-theory-and-database-foundations/index.md)
