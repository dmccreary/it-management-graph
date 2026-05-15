---
title: Graph RAG Query Flow Interactive Diagram
description: Graph RAG Query Flow Interactive Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# Graph RAG Query Flow Interactive Diagram

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md).

```text
Type: workflow

    Purpose: Show the step-by-step process of how a natural language question flows through a Graph RAG system to produce an answer

    Visual style: Horizontal workflow diagram with swim lanes and decision points

    Swim lanes (top to bottom):
    1. User Interface
    2. Natural Language Processing
    3. Graph Query Layer
    4. IT Management Graph
    5. LLM Response Generation

    Workflow steps (left to right):

    **Step 1: User Question (Lane 1 - User Interface)**
    - Box: "User asks natural language question"
    - Example: "What will be affected if we upgrade database cluster 3?"
    - Icon: User with speech bubble
    - Color: Light blue
    - Hover text: "User interacts with chatbot or Q&A interface"

    **Step 2: Intent Classification (Lane 2 - NLP)**
    - Box: "Parse and classify question intent"
    - Sub-steps:
      - Entity extraction: "database cluster 3"
      - Intent: "Impact analysis / dependency query"
      - Action type: "Upgrade"
    - Icon: Brain or AI symbol
    - Color: Purple
    - Hover text: "NLP identifies key entities and determines query type"
    - Arrow from Step 1

    **Step 3: Query Pattern Selection (Lane 2 - NLP)**
    - Box: "Select appropriate graph query pattern"
    - Shows template: "MATCH (n:Asset {name: $entity}) -[:DEPENDS_ON*]-> (downstream) RETURN downstream"
    - Icon: Template/pattern icon
    - Color: Purple
    - Hover text: "System selects predefined query pattern for impact analysis"
    - Arrow from Step 2

    **Step 4: Query Generation (Lane 3 - Graph Query)**
    - Box: "Generate specific graph query"
    - Shows: Cypher query with actual parameters filled in
    - Icon: Code brackets
    - Color: Orange
    - Hover text: "Template is filled with specific entities from user question"
    - Arrow from Step 3

    **Step 5: Graph Execution (Lane 4 - Graph Database)**
    - Box: "Execute query against IT management graph"
    - Visual: Small graph visualization showing traversal
    - Icon: Database with graph
    - Color: Gold
    - Hover text: "Query traverses graph following DEPENDS_ON relationships"
    - Arrow from Step 4

    **Step 6: Results Retrieval (Lane 4 - Graph Database)**
    - Box: "Return query results with metadata"
    - Shows: List of affected nodes with properties
    - Results example:
      - "Customer API (critical)"
      - "Billing Service (high)"
      - "Analytics Service (medium)"
    - Icon: Document with list
    - Color: Gold
    - Hover text: "Graph returns all downstream dependencies with metadata"
    - Arrow from Step 5

    **Step 7: Context Assembly (Lane 5 - LLM)**
    - Box: "Assemble context for LLM"
    - Components:
      - Graph query results
      - Node metadata (criticality, owners, SLAs)
      - Historical context (past upgrades, incidents)
      - Current status (are systems healthy?)
    - Icon: Puzzle pieces coming together
    - Color: Green
    - Hover text: "Combine graph data with additional context for rich LLM prompt"
    - Arrow from Step 6

    **Step 8: LLM Prompt Construction (Lane 5 - LLM)**
    - Box: "Construct prompt for LLM"
    - Shows prompt template:
      "Based on the following graph query results about database cluster 3 upgrade impact: [results]. Generate a comprehensive answer explaining which services will be affected, their criticality, and recommendations."
    - Icon: Document with AI symbol
    - Color: Green
    - Hover text: "Structured prompt ensures LLM stays grounded in graph data"
    - Arrow from Step 7

    **Step 9: LLM Generation (Lane 5 - LLM)**
    - Box: "LLM generates natural language response"
    - Icon: AI/robot generating text
    - Color: Green
    - Hover text: "LLM produces human-readable explanation based on graph context"
    - Arrow from Step 8

    **Step 10: Response Formatting (Lane 1 - User Interface)**
    - Box: "Format and display response to user"
    - Shows formatted response with:
      - Summary paragraph
      - Bullet list of affected services
      - Recommendations section
      - Follow-up question suggestions
    - Icon: Formatted document
    - Color: Light blue
    - Hover text: "Response presented with formatting, links, and conversation context"
    - Arrow from Step 9

    **Step 11: Follow-up Capability (Lane 1 - User Interface)**
    - Box: "User can ask follow-up questions"
    - Examples: "What if we do this during off-peak hours?" or "Who should we notify?"
    - Icon: Circular arrow (conversation continues)
    - Color: Light blue
    - Hover text: "System maintains conversation context for follow-up questions"
    - Dotted arrow looping back to Step 1

    **Decision Points:**

    Decision 1 (after Step 2):
    - Diamond: "Is this a graph-queryable question?"
    - Yes path → Continue to Step 3
    - No path → "Use traditional RAG" (text search) - exits to alternate flow
    - Hover text: "Not all questions require graph queries; some are answered from documentation"

    Decision 2 (after Step 6):
    - Diamond: "Results found?"
    - Yes path → Continue to Step 7
    - No path → "Generate 'no results' explanation" - skip to Step 9 with different context
    - Hover text: "If query returns empty, LLM explains why and suggests alternatives"

    **Timing Indicators:**
    - Small clocks showing approximate duration:
      - Steps 2-4 (NLP + Query Gen): ~200ms
      - Step 5-6 (Graph execution): ~50-500ms depending on complexity
      - Steps 7-9 (LLM): ~2-5 seconds
      - Total: ~3-6 seconds typical

    **Color coding:**
    - Light blue: User interaction
    - Purple: Natural language processing
    - Orange: Query generation
    - Gold: Graph database operations
    - Green: LLM operations

    **Visual elements:**
    - Arrows showing data flow between steps
    - Icons for each step type
    - Dotted arrows for feedback loops
    - Decision diamonds in yellow
    - Timing indicators (small clock icons with ms/sec labels)

    **Interactive hover text for entire diagram:**
    - Each box expands on hover to show more technical detail
    - Example responses visible on hover
    - Arrows show data format at each transition

    Layout dimensions: 1400px wide × 800px tall

    Implementation: HTML/CSS/JavaScript with SVG for shapes and arrows, interactive hover effects using JavaScript

    Educational value:
    - Shows complete end-to-end flow
    - Makes abstract "Graph RAG" concept concrete
    - Demonstrates why latency occurs (multiple processing steps)
    - Shows decision points where logic branches
    - Illustrates the human-AI-database collaboration
```

## Related Resources

- [Chapter 12: Digital Transformation And Advanced Topics](../../chapters/12-digital-transformation-and-advanced-topics/index.md)
