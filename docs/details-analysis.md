# Details Tag Content Analysis

This report analyzes all `<details>` tags in the textbook chapters to categorize visualization types and prioritize skill development.

<iframe src="../sims/skill-impact-chart/main.html" width="100%" height="900" scrolling="no"></iframe>
[View Chart Fullscreen](../sims/skill-impact-chart/main.html)


## Summary Statistics

- **Total `<details>` tags:** 57
- **Unique visualization types:** 10

## Visualization Type Distribution

| Type | Count | Percentage |
|------|-------|------------|
| diagram | 15 | 26.3% |
| graph-model | 10 | 17.5% |
| chart | 9 | 15.8% |
| workflow | 7 | 12.3% |
| infographic | 5 | 8.8% |
| microsim | 5 | 8.8% |
| timeline | 3 | 5.3% |
| portfolio-quadrant-chart | 1 | 1.8% |
| map | 1 | 1.8% |
| markdown-table | 1 | 1.8% |

## Priority Matrix for Skill Development

Prioritization based on **Impact** (frequency of use) vs. **Effort** (similarity to existing MicroSims).

### Priority Scores

| Rank | Type | Count | Impact (0-10) | Effort (0-10) | Priority Score | Status |
|------|------|-------|---------------|---------------|----------------|--------|
| 1 | **graph-model** | 10 | 6.7 | 1 | 6.67 | 🔨 Build |
| 2 | **microsim** | 5 | 3.3 | 0 | 3.33 | ✅ Exists |
| 3 | **diagram** | 15 | 10 | 4 | 2.5 | 🔨 Build |
| 4 | **infographic** | 5 | 3.3 | 2 | 1.67 | 🔨 Build |
| 5 | **chart** | 9 | 6.0 | 5 | 1.2 | 🔨 Build |
| 6 | **workflow** | 7 | 4.7 | 6 | 0.78 | 🔨 Build |
| 7 | **timeline** | 3 | 2.0 | 7 | 0.29 | 🔨 Build |
| 8 | **map** | 1 | 0.7 | 5 | 0.13 | 🔨 Build |
| 9 | **markdown-table** | 1 | 0.7 | 5 | 0.13 | 🔨 Build |
| 10 | **portfolio-quadrant-chart** | 1 | 0.7 | 5 | 0.13 | 🔨 Build |

### Interpretation

- **Impact**: Higher values indicate more instances of this visualization type across chapters
- **Effort**: Higher values indicate more development effort required (less similar to existing MicroSims)
- **Priority Score**: Impact/Effort ratio - higher scores suggest better ROI for skill development

## Visual Priority Matrix


### Quadrant Analysis

**High Impact, Low Effort (Priority 1):**
- **graph-model** (Impact: 6.7, Effort: 1, Count: 10)
- **diagram** (Impact: 10, Effort: 4, Count: 15)
- **chart** (Impact: 6.0, Effort: 5, Count: 9)

**High Impact, High Effort (Priority 2):**
- None

**Low Impact, Low Effort (Priority 3):**
- **microsim** (Impact: 3.3, Effort: 0, Count: 5)
- **infographic** (Impact: 3.3, Effort: 2, Count: 5)
- **map** (Impact: 0.7, Effort: 5, Count: 1)
- **markdown-table** (Impact: 0.7, Effort: 5, Count: 1)
- **portfolio-quadrant-chart** (Impact: 0.7, Effort: 5, Count: 1)

**Low Impact, High Effort (Priority 4):**
- **workflow** (Impact: 4.7, Effort: 6, Count: 7)
- **timeline** (Impact: 2.0, Effort: 7, Count: 3)

## Detailed Breakdown by Type

### Diagram (15 instances)

**Chapter:** Introduction to ITIL and Configuration Management

**Summary:** ITIL Framework Structure Diagram

**Purpose:** Illustrate the hierarchical structure of ITIL v1-v3 showing the relationship between Service Support, Service Delivery, and Configuration Management

---

**Chapter:** Introduction to ITIL and Configuration Management

**Summary:** Traditional CMDB Data Flow and Integration Architecture

**Purpose:** Illustrate the complex integration challenges of traditional CMDB implementations showing data flows from multiple sources

---

**Chapter:** IT Asset Management Fundamentals

**Summary:** Hardware vs. Software Asset Management Architecture Diagram

**Purpose:** Illustrate the parallel yet distinct data flows for hardware and software asset management within an IT management graph

---

**Chapter:** IT Asset Management Fundamentals

**Summary:** IT Asset Lifecycle State Machine Diagram

**Purpose:** Illustrate the complete lifecycle states of an IT asset from acquisition through disposition, including state transitions and governance triggers

---

**Chapter:** Relational Database Fundamentals

**Summary:** Relational Database Schema Visualization

**Purpose:** Illustrate the schema structure for an IT asset management database showing tables, columns, data types, and foreign key relationships

---

**Chapter:** Relational Database Fundamentals

**Summary:** Primary Key and Foreign Key Relationship Diagram

**Purpose:** Visually demonstrate how primary keys and foreign keys establish relationships between tables, showing data flow through key references

---

**Chapter:** Relational Database Fundamentals

**Summary:** B-Tree Index Structure and Search Visualization

**Purpose:** Illustrate how a B-tree index accelerates data lookup compared to sequential table scanning, showing tree structure and search path

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** The Three Pillars of Observability Diagram

**Purpose:** Illustrate how logs, metrics, and traces work together to provide complete observability of IT systems

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** OpenTelemetry Data Flow Architecture

**Purpose:** Show how OpenTelemetry collects telemetry from applications and sends it to observability backends, enabling automated IT graph updates

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** Automated Discovery Architecture Diagram

**Purpose:** Show the complete architecture of a modern automated discovery system that populates an IT management graph from multiple data sources

---

**Chapter:** Compliance, Risk Management, and Security

**Summary:** HIPAA Data Flow Tracing Diagram

**Purpose:** Illustrate how graph traversal identifies all systems processing ePHI in a healthcare organization

---

**Chapter:** Compliance, Risk Management, and Security

**Summary:** Compliance Audit Evidence Generation Flow Diagram

**Purpose:** Illustrate how IT management graphs enable rapid, comprehensive audit evidence generation compared to traditional manual processes

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Digital Transformation Maturity Model for IT Management

**Purpose:** Illustrate the progression from traditional IT management to fully transformed graph-based approaches

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** AI-Enhanced IT Management Graph Architecture Diagram

**Purpose:** Show how AI/ML components integrate with the core IT management graph to provide intelligent capabilities

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Exception Reporting Dashboard Mockup

**Purpose:** Show a realistic IT governance dashboard displaying business rule exceptions

---

### Graph-Model (10 instances)

**Chapter:** IT Asset Management Fundamentals

**Summary:** IT Asset Relationship Graph Interactive Model

**Purpose:** Demonstrate the relationship types connecting IT assets in a management graph, showing how asset, application, and service layers interconnect

---

**Chapter:** Graph Theory and Graph Database Foundations

**Summary:** IT Infrastructure Nodes Interactive Visualization

**Purpose:** Demonstrate how different IT infrastructure entities are represented as nodes in a graph database, showing node labels, properties, and visual styling

---

**Chapter:** Graph Theory and Graph Database Foundations

**Summary:** IT Infrastructure Graph with Nodes and Relationships

**Purpose:** Extend the previous nodes visualization by adding directed relationships, demonstrating how edges connect IT infrastructure entities to create a meaningful dependency graph

---

**Chapter:** Graph Theory and Graph Database Foundations

**Summary:** Deployment Dependencies as a Directed Acyclic Graph (DAG)

**Purpose:** Demonstrate how IT component dependencies naturally form a DAG structure, showing deployment order requirements and illustrating how topological sorting determines safe deployment sequences

---

**Chapter:** Graph Database Technologies and Query Languages

**Summary:** Dependency Graph with Cycle Detection Visualization

**Purpose:** Demonstrate cycle detection in an IT dependency graph, showing both healthy DAG structures and problematic circular dependencies that need architectural attention

---

**Chapter:** Graph Database Technologies and Query Languages

**Summary:** Cypher Pattern Matching Interactive Visualization

**Purpose:** Demonstrate how Cypher pattern matching works by showing a query pattern (template) and highlighting all matching subgraphs in a larger IT infrastructure graph

---

**Chapter:** Graph Traversal and Dependency Analysis

**Summary:** Bidirectional Dependency Tracing Visualization

**Purpose:** Demonstrate upstream and downstream dependency tracing from a central component, showing how direction affects the scope of analysis

---

**Chapter:** Graph Traversal and Dependency Analysis

**Summary:** Multi-Layer Dependency Map Visualization

**Purpose:** Demonstrate how different dependency types (business service, technical service, application, infrastructure) form layers in an IT management graph, showing cross-layer dependencies

---

**Chapter:** Business Services and IT Portfolio Management

**Summary:** Business Service Mapping Visualization: End-to-End Dependencies

**Purpose:** Demonstrate complete business service mapping from customer-facing business service through technical services and applications down to infrastructure, showing the value chain

---

**Chapter:** Compliance, Risk Management, and Security

**Summary:** RBAC Permission Graph Visualization

**Purpose:** Demonstrate how Role-Based Access Control is modeled in an IT management graph, showing users, roles, resources, and permission flows

---

### Chart (9 instances)

**Chapter:** Relational Database Fundamentals

**Summary:** Query Performance Comparison Chart: RDBMS JOIN Performance by Hop Count

**Purpose:** Demonstrate exponential performance degradation in RDBMS multi-hop queries compared to constant-time graph database traversal

---

**Chapter:** Graph Database Technologies and Query Languages

**Summary:** Native Graph Storage vs Graph Layer Performance Comparison

**Purpose:** Visually demonstrate the performance difference between native graph storage and graph layers as traversal depth increases, showing why native architecture matters for deep graph queries

---

**Chapter:** Data Quality and Data Management Excellence

**Summary:** No summary

**Purpose:** Visualize data quality across multiple dimensions for an IT management graph, showing strengths and areas needing improvement in a clear, intuitive format that enables quick assessment and tracking over time

---

**Chapter:** Query Performance and Real-Time Operations

**Summary:** Query Performance Comparison: Graph vs Relational Databases

**Purpose:** Demonstrate the dramatic performance difference between graph and relational databases as query complexity increases

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** Network vs. Service Topology Comparison Chart

**Purpose:** Illustrate the differences in discovery methods, data sources, and use cases between network topology and service topology mapping

---

**Chapter:** Compliance, Risk Management, and Security

**Summary:** Compliance Dashboard Overview Chart

**Purpose:** Provide executive-level overview of compliance status across multiple regulatory frameworks

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Migration Timeline with Risk and Value Curves

**Purpose:** Show the four-phase migration journey with overlaid risk and value curves, demonstrating how risk decreases and value increases over time

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** TCO Comparison Chart: Three Options Over Five Years

**Purpose:** Compare total cost of ownership across three solution options (ServiceNow, Atlassian, Custom Build) over a 5-year period, showing cost breakdown by category

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** ROI Waterfall Chart: From Costs to Net Value

**Purpose:** Visually show how an initial investment of $647K transforms into net value of $2.336M through various benefit categories, making the ROI calculation intuitive and compelling

---

### Workflow (7 instances)

**Chapter:** Relational Database Fundamentals

**Summary:** SQL Query Execution Visualization

**Purpose:** Show the step-by-step process of how an SQL query is parsed, optimized, and executed by an RDBMS

---

**Chapter:** Relational Database Fundamentals

**Summary:** Schema Evolution Timeline: Adding Heterogeneous Device Types

**Purpose:** Demonstrate the challenges of evolving a relational schema when adding new, heterogeneous entity types with different attributes

---

**Chapter:** Query Performance and Real-Time Operations

**Summary:** Performance Monitoring Dashboard Workflow

**Purpose:** Illustrate the continuous improvement cycle for IT management graph performance monitoring and optimization

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** Configuration Drift Detection Workflow

**Purpose:** Illustrate the process of detecting, alerting, and remediating configuration drift using automated discovery and graph comparison

---

**Chapter:** Compliance, Risk Management, and Security

**Summary:** Risk Assessment Workflow Diagram

**Purpose:** Illustrate the continuous risk assessment process using graph-based IT management data

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Technology Selection Workflow with Decision Gates

**Purpose:** Illustrate the structured process for evaluating and selecting IT management graph technology, with decision gates at key points

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Graph RAG Query Flow Interactive Diagram

**Purpose:** Show the step-by-step process of how a natural language question flows through a Graph RAG system to produce an answer

---

### Infographic (5 instances)

**Chapter:** Introduction to ITIL and Configuration Management

**Summary:** IT Asset Hierarchy Infographic

**Purpose:** Show the hierarchical relationships between different types of IT assets with examples and clickable details

---

**Chapter:** IT Asset Management Fundamentals

**Summary:** Application Portfolio Strategic Quadrant with Dependency Visualization

**Purpose:** Create an interactive application portfolio quadrant (business value vs. technical quality) where clicking applications reveals their dependency networks, demonstrating why portfolio decisions cannot be made in isolation

---

**Chapter:** Relational Database Fundamentals

**Summary:** JOIN Types Comparison Interactive Visualization

**Purpose:** Create an interactive visualization demonstrating different JOIN types using Venn diagrams and sample data, showing how each JOIN type affects which rows appear in results

---

**Chapter:** Query Performance and Real-Time Operations

**Summary:** Scaling Strategies Comparison Infographic

**Purpose:** Provide an interactive visual comparison of vertical vs horizontal scaling with clear pros, cons, and use cases

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** IT Modernization Interconnected Domains Infographic

**Purpose:** Show how different modernization streams interconnect and reinforce each other, with IT Management Graph at the center

---

### Microsim (5 instances)

**Chapter:** Relational Database Fundamentals

**Summary:** Multi-Hop Query Dependency Traversal Visualization

**Learning Objective:** Demonstrate how multi-hop queries traverse dependency chains in relational databases, showing the increasing complexity and intermediate result sets as hop count increases

---

**Chapter:** Graph Theory and Graph Database Foundations

**Summary:** Graph Traversal Algorithm Comparison: DFS vs BFS

**Learning Objective:** Demonstrate the differences between Depth-First Search and Breadth-First Search traversal algorithms through interactive animation, showing how each algorithm explores a dependency graph

---

**Chapter:** Query Performance and Real-Time Operations

**Summary:** Graph Density Visualization MicroSim

**Learning Objective:** Help students understand how graph density affects traversal performance and query complexity

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** eBPF Network Connection Discovery Interactive MicroSim

**Learning Objective:** Demonstrate how eBPF monitors kernel-level network events to automatically discover service dependencies without application instrumentation

---

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Build vs Buy Decision Matrix Interactive Tool

**Learning Objective:** Help students understand the multi-dimensional nature of build vs buy decisions by exploring how different factors influence the recommendation

---

### Timeline (3 instances)

**Chapter:** IT Asset Management Fundamentals

**Summary:** Multi-Source Asset Discovery Integration Timeline

**Purpose:** Show the evolution of IT asset discovery techniques from manual inventory through modern automated telemetry integration

---

**Chapter:** Observability, Monitoring, and Automated Discovery

**Summary:** Dynamic Topology Update Timeline Visualization

**Purpose:** Illustrate how dynamic topology discovery responds to infrastructure changes over a 10-minute period in a cloud-native environment

---

**Chapter:** Compliance, Risk Management, and Security

**Summary:** Regulatory Framework Timeline

**Purpose:** Illustrate the evolution of major IT compliance regulations from 1990 to present, showing the increasing sophistication and scope of regulatory requirements

---

### Portfolio-Quadrant-Chart (1 instances)

**Chapter:** Business Services and IT Portfolio Management

**Summary:** No summary

**Purpose:** Visualize applications positioned across TIME (Time-Invested-Money-Eliminate) quadrants based on strategic value and technical quality, with bubble sizes representing cost and colors indicating dependency complexity

---

### Map (1 instances)

**Chapter:** Compliance, Risk Management, and Security

**Summary:** GDPR Cross-Border Data Flow Map

**Purpose:** Visualize data flows subject to GDPR restrictions, showing which transfers require additional safeguards

---

### Markdown-Table (1 instances)

**Chapter:** Digital Transformation and Advanced Topics

**Summary:** Vendor Comparison Table: ServiceNow vs Dynatrace vs Atlassian

---

## Recommendations

Based on the priority analysis, focus on developing skills for:

1. **graph-model** - 10 instances, priority score 6.67
   - Example: IT Asset Relationship Graph Interactive Model
2. **diagram** - 15 instances, priority score 2.5
   - Example: ITIL Framework Structure Diagram
3. **infographic** - 5 instances, priority score 1.67
   - Example: IT Asset Hierarchy Infographic
4. **chart** - 9 instances, priority score 1.2
   - Example: Query Performance Comparison Chart: RDBMS JOIN Performance by Hop Count

