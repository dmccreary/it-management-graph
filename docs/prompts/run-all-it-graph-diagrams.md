# IT Graph Generator - All Graph-Model Diagrams

This document contains prompts for generating all 10 graph-model visualizations identified in the details-analysis.md file.

## Summary

- **Total graph-model instances:** 10
- **Priority score:** 6.67 (highest ROI)
- **Status:** Ready for generation using it-graph-generator skill

## Implementation Checklist

- [ ] 1. IT Asset Relationship Graph Interactive Model
- [ ] 2. IT Infrastructure Nodes Interactive Visualization
- [ ] 3. IT Infrastructure Graph with Nodes and Relationships
- [ ] 4. Deployment Dependencies as a Directed Acyclic Graph (DAG)
- [ ] 5. Dependency Graph with Cycle Detection Visualization
- [ ] 6. Cypher Pattern Matching Interactive Visualization
- [ ] 7. Bidirectional Dependency Tracing Visualization
- [ ] 8. Multi-Layer Dependency Map Visualization
- [ ] 9. Business Service Mapping Visualization
- [ ] 10. RBAC Permission Graph Visualization

---

## 1. IT Asset Relationship Graph Interactive Model

**Chapter:** IT Asset Management Fundamentals

**Purpose:** Demonstrate the relationship types connecting IT assets in a management graph, showing how asset, application, and service layers interconnect

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "it-asset-relationships" that demonstrates
relationship types connecting IT assets in a management graph.

Include these node types:
- Hardware Assets (servers, laptops, network devices) - Gray, server/laptop icons
- Software Assets (applications, databases) - Light blue, application icons
- Services (business services, technical services) - Pink, service icons
- Users - Amber, user icons

Show these relationship types with labeled edges:
- HOSTS (hardware → software)
- RUNS_ON (software → hardware)
- DEPENDS_ON (service → application)
- PROVIDES (application → service)
- ASSIGNED_TO (hardware → user)
- USES (user → service)

Include 10-12 nodes showing all three layers (asset, application, service) interconnected.

Educational focus: Demonstrate how different asset types connect through various
relationship types to create a comprehensive IT management graph.

Custom educational notes:
1. "Notice how a single business service depends on multiple applications and infrastructure components"
2. "Hardware-software relationships flow both ways: HOSTS and RUNS_ON provide bidirectional context"
3. "User assignments create accountability chains through the entire technology stack"
```

---

## 2. IT Infrastructure Nodes Interactive Visualization

**Chapter:** Graph Theory and Graph Database Foundations

**Purpose:** Demonstrate how different IT infrastructure entities are represented as nodes in a graph database, showing node labels, properties, and visual styling

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "it-infrastructure-nodes" that demonstrates
how IT infrastructure entities are represented as nodes in a graph database. This should
be a NODES-ONLY visualization (no edges).

Include these node types with rich, heterogeneous properties:
- Server (3 nodes) - hostname, IP, OS, CPU, memory, location
- Database (2 nodes) - name, type, version, size, backup_schedule
- Application (2 nodes) - name, technology, version, environment
- Network Device (2 nodes) - name, type, IP, ports, throughput
- Storage (1 node) - name, type, capacity, RAID_level

Total: 10 nodes with different properties per type to demonstrate schema flexibility.

Educational focus: Show how graph databases allow heterogeneous node properties without
rigid schema constraints.

Custom callouts:
1. "Each node type has completely different properties - no rigid schema required!"
2. "Properties are stored directly with each node, not in separate attribute tables"
3. "Node types (labels) help organize and query entities efficiently"
4. "In the next section, we'll connect these nodes with relationships"

Custom educational notes:
1. "Notice how Server nodes have infrastructure properties (IP, OS) while Database nodes have data management properties (version, backup schedule)"
2. "This property flexibility eliminates the need for EAV (Entity-Attribute-Value) tables or sparse columns common in relational databases"
3. "Graph databases embrace heterogeneous data naturally - each node stores exactly the properties it needs"
```

---

## 3. IT Infrastructure Graph with Nodes and Relationships

**Chapter:** Graph Theory and Graph Database Foundations

**Purpose:** Extend the previous nodes visualization by adding directed relationships, demonstrating how edges connect IT infrastructure entities to create a meaningful dependency graph

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "it-infrastructure-graph" that extends
the nodes-only visualization by adding directed relationships to show dependencies.

Use similar nodes as the previous microsim but add directed edges:
- Application → Database (QUERIES)
- Application → Server (RUNS_ON)
- Database → Storage (STORES_ON)
- Network Device → Server (ROUTES_TO)
- Server → Network Device (CONNECTS_VIA)

Include 10-12 nodes with 12-15 edges showing a realistic dependency structure.

Educational focus: Demonstrate how directed relationships create meaningful dependency
graphs for IT infrastructure management.

Custom callouts:
1. "Directed edges show the flow of dependencies - arrows indicate direction"
2. "Relationship types (labels) describe HOW entities are connected"
3. "The same nodes can have multiple relationship types to other nodes"
4. "This graph structure enables powerful traversal queries like 'find all dependencies'"

Custom educational notes:
1. "Notice how applications QUERY databases but RUN_ON servers - different relationship semantics"
2. "Following arrows upstream shows what a component depends on; downstream shows what depends on it"
3. "Graph traversal can answer questions like 'What infrastructure does this application need?' in a single query"
```

---

## 4. Deployment Dependencies as a Directed Acyclic Graph (DAG)

**Chapter:** Graph Theory and Graph Database Foundations

**Purpose:** Demonstrate how IT component dependencies naturally form a DAG structure, showing deployment order requirements and illustrating how topological sorting determines safe deployment sequences

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Use the it-graph-generator skill to create an interactive IT graph microsim called "deployment-dag" that demonstrates
deployment dependencies as a Directed Acyclic Graph (DAG).

Include these components in deployment order layers:
- Infrastructure layer: Database Server, Application Server, Load Balancer
- Data layer: Database Schema, Configuration Service
- Application layer: API Service, Web Frontend
- Integration layer: Monitoring Agent, Log Collector

Show DEPENDS_ON relationships that create a valid DAG (no cycles).

Node properties should include:
- deployment_order (number)
- deployment_time (minutes)
- criticality (high/medium/low)

Educational focus: Show how topological sorting of the DAG determines safe deployment order.

FEATURE REQUEST: Add a "Show Deployment Path" button that highlights nodes in
topological order and displays the deployment sequence in the sidebar.

Custom callouts:
1. "DAG structure ensures no circular dependencies - deployment order is always possible"
2. "Arrows point from dependent to dependency - follow backwards to find deployment order"
3. "Topological sorting produces a safe deployment sequence"
4. "Any valid topological sort respects all dependency constraints"

Custom educational notes:
1. "Notice how infrastructure components (database, servers) have no dependencies - they deploy first"
2. "Applications can only deploy after their dependencies are ready - the graph enforces this constraint"
3. "A deployment cycle would make it impossible to determine order - DAG structure prevents this"
```

---

## 5. Dependency Graph with Cycle Detection Visualization

**Chapter:** Graph Database Technologies and Query Languages

**Purpose:** Demonstrate cycle detection in an IT dependency graph, showing both healthy DAG structures and problematic circular dependencies that need architectural attention

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "dependency-cycle-detection" that
demonstrates cycle detection in dependency graphs.

Include two separate component groups:
1. Healthy DAG (6 nodes): Frontend → API → Database → Storage (no cycles)
2. Problematic cycle (4 nodes): ServiceA → ServiceB → ServiceC → ServiceA (circular dependency)

Use different edge colors:
- Green edges for healthy dependencies (DAG)
- Red edges for circular dependencies (cycle)

Node types:
- Application
- Service
- Database
- Storage

FEATURE REQUEST: Add a "Detect Cycles" button that highlights all nodes participating
in cycles with a red border and displays cycle paths in the sidebar.

Custom callouts:
1. "Cycles in dependency graphs indicate architectural problems"
2. "Healthy systems form DAGs - deployment order is always determinable"
3. "Circular dependencies create deadlock scenarios during deployment or recovery"
4. "Graph algorithms can automatically detect these problematic patterns"

Custom educational notes:
1. "Notice the green subgraph has a clear flow from frontend to storage - this is deployable"
2. "The red cycle shows services that depend on each other - which deploys first?"
3. "Cycle detection algorithms like DFS can identify these problems automatically during CI/CD"
```

---

## 6. Cypher Pattern Matching Interactive Visualization

**Chapter:** Graph Database Technologies and Query Languages

**Purpose:** Demonstrate how Cypher pattern matching works by showing a query pattern (template) and highlighting all matching subgraphs in a larger IT infrastructure graph

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "cypher-pattern-matching" that demonstrates
Cypher pattern matching by showing matching subgraphs.

Create a larger graph (12-15 nodes) with multiple instances of common patterns:
- Pattern 1: (App)-[USES]->(Database) - appears 3 times
- Pattern 2: (User)-[ACCESSES]->(App)-[QUERIES]->(Database) - appears 2 times
- Pattern 3: (Server)-[HOSTS]->(App) - appears 3 times

Node types: User, Application, Database, Server

FEATURE REQUEST: Add pattern selection buttons that highlight all subgraphs matching
the selected pattern. When a pattern is selected, highlight matching nodes and edges
with a distinctive color and show the Cypher query in the sidebar:

Pattern 1: MATCH (a:App)-[:USES]->(d:Database) RETURN a, d
Pattern 2: MATCH (u:User)-[:ACCESSES]->(a:App)-[:QUERIES]->(d:Database) RETURN u, a, d
Pattern 3: MATCH (s:Server)-[:HOSTS]->(a:App) RETURN s, a

Custom callouts:
1. "Cypher queries describe graph patterns using ASCII art syntax"
2. "The database finds all subgraphs matching the pattern"
3. "Pattern matching is declarative - you describe what you want, not how to find it"
4. "Complex queries can match multi-hop patterns in a single statement"

Custom educational notes:
1. "Notice how the same node can participate in multiple pattern matches"
2. "Pattern matching is much more intuitive than multi-table JOINs in SQL"
3. "This single pattern query would require complex JOIN logic in relational databases"
```

---

## 7. Bidirectional Dependency Tracing Visualization

**Chapter:** Graph Traversal and Dependency Analysis

**Purpose:** Demonstrate upstream and downstream dependency tracing from a central component, showing how direction affects the scope of analysis

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "bidirectional-dependency-tracing" that
demonstrates upstream (what this depends on) and downstream (what depends on this)
dependency analysis.

Create a graph centered on a "Payment API" node (marked as the central node with
larger size and distinct color):

Upstream dependencies (what Payment API depends on):
- Payment Database
- Auth Service
- Config Service
- Message Queue

Downstream dependents (what depends on Payment API):
- Web Frontend
- Mobile App
- Partner Integration
- Admin Dashboard

Use edge colors:
- Blue edges for upstream dependencies (incoming to Payment API)
- Orange edges for downstream dependencies (outgoing from Payment API)

FEATURE REQUEST: Add three radio buttons:
1. "Show All Dependencies" - show entire graph
2. "Show Upstream Only" - highlight only upstream dependencies and dim downstream
3. "Show Downstream Only" - highlight only downstream dependencies and dim upstream

Display the dependency count in the sidebar for each mode.

Custom callouts:
1. "Upstream analysis shows what this component needs to function"
2. "Downstream analysis shows blast radius - what breaks if this fails"
3. "Direction matters - dependencies flow differently than impact"
4. "Impact analysis follows edges backward from the traversal direction"

Custom educational notes:
1. "Notice upstream dependencies are things the Payment API calls - these must be available first"
2. "Downstream dependents are consumers - these break if Payment API fails (blast radius)"
3. "Change impact analysis requires downstream traversal; deployment planning needs upstream"
```

---

## 8. Multi-Layer Dependency Map Visualization

**Chapter:** Graph Traversal and Dependency Analysis

**Purpose:** Demonstrate how different dependency types (business service, technical service, application, infrastructure) form layers in an IT management graph, showing cross-layer dependencies

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "multi-layer-dependency-map" that
demonstrates how IT dependencies span multiple architectural layers.

Include these layers with distinct node colors:
1. Business Service Layer (Pink) - 2 nodes: "Customer Portal", "Payment Processing"
2. Technical Service Layer (Purple) - 3 nodes: "Auth Service", "Payment API", "User Profile API"
3. Application Layer (Light Blue) - 3 nodes: "Frontend App", "API Gateway", "Background Jobs"
4. Infrastructure Layer (Gray) - 4 nodes: "Web Server", "App Server", "Database", "Message Queue"

Show cross-layer dependencies:
- Business → Technical
- Technical → Application
- Application → Infrastructure

Use different edge styles for each layer transition:
- Solid for same-layer dependencies
- Dashed for cross-layer dependencies

FEATURE REQUEST: Add layer filter checkboxes that allow showing/hiding entire layers
and their dependencies. Add a "Show Layer View" toggle that rearranges nodes into
horizontal bands by layer.

Custom callouts:
1. "IT dependencies span multiple architectural layers"
2. "Business services depend on technical services, which depend on infrastructure"
3. "Cross-layer dependencies show the full technology stack"
4. "Each layer has different operational concerns and ownership"

Custom educational notes:
1. "Notice how a single business service depends on components across all layers"
2. "Layer isolation helps with separation of concerns but creates vertical dependency chains"
3. "Impact analysis must traverse all layers to understand business service risk"
```

---

## 9. Business Service Mapping Visualization

**Chapter:** Business Services and IT Portfolio Management

**Purpose:** Demonstrate complete business service mapping from customer-facing business service through technical services and applications down to infrastructure, showing the value chain

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "business-service-mapping" that demonstrates
end-to-end business service mapping showing the complete value chain.

Start with a customer-facing business service and trace through all layers:

Business Service (Pink, Large):
- "Online Shopping"

Technical Services (Purple, Medium):
- Product Catalog Service
- Shopping Cart Service
- Payment Service
- Order Management Service

Applications (Light Blue, Medium):
- Web Frontend
- Mobile App
- API Gateway
- Inventory System

Databases (Orange, Medium):
- Product DB
- User DB
- Order DB

Infrastructure (Gray, Small):
- Web Servers (2 nodes)
- App Servers (2 nodes)
- Database Servers (2 nodes)

Show the complete dependency chain with labeled edges (PROVIDES, USES, RUNS_ON, QUERIES).

FEATURE REQUEST: Add a "Trace Service Path" button that allows clicking on the business
service to highlight the complete end-to-end path showing all supporting components.
Display the path depth and component count in the sidebar.

Custom callouts:
1. "Business services depend on a complex web of technical components"
2. "Service mapping reveals the true cost and complexity of business capabilities"
3. "End-to-end visibility enables better capacity planning and risk management"
4. "Each layer adds dependencies that must be managed and maintained"

Custom educational notes:
1. "Notice how a single business service requires 15+ technical components across 4 layers"
2. "Traditional IT management often loses this end-to-end visibility in siloed systems"
3. "Graph models make this value chain explicit and queryable for impact analysis"
```

---

## 10. RBAC Permission Graph Visualization

**Chapter:** Compliance, Risk Management, and Security

**Purpose:** Demonstrate how Role-Based Access Control is modeled in an IT management graph, showing users, roles, resources, and permission flows

**TODO:** Run the it-graph-generator skill on this diagram.

**Suggested Prompt:**

```
Create an interactive IT graph microsim called "rbac-permission-graph" that demonstrates
Role-Based Access Control modeling in a graph database.

Include these node types:
1. Users (Amber, user icon) - 4 nodes: "Alice (Admin)", "Bob (Developer)", "Carol (Analyst)", "Dave (Viewer)"
2. Roles (Purple, hexagon) - 4 nodes: "Admin", "Developer", "Analyst", "Viewer"
3. Permissions (Green, key icon) - 5 nodes: "READ", "WRITE", "DELETE", "DEPLOY", "CONFIGURE"
4. Resources (Light Blue, database/server icons) - 4 nodes: "Production DB", "Staging DB", "Code Repo", "Monitoring System"

Show these relationship types:
- User → Role (HAS_ROLE)
- Role → Permission (HAS_PERMISSION)
- Permission → Resource (GRANTS_ACCESS_TO)

Create realistic RBAC scenarios:
- Admin: all permissions on all resources
- Developer: READ, WRITE on Code Repo; READ on Staging DB
- Analyst: READ on Production DB, Monitoring System
- Viewer: READ on Monitoring System only

FEATURE REQUEST: Add a "Check Access" mode where clicking a user shows all resources
they can access (following the user→role→permission→resource path). Display the access
matrix in the sidebar showing which resources the user can read/write/delete.

Custom callouts:
1. "RBAC uses graph relationships to model permission inheritance"
2. "Users gain permissions through role membership - indirect access"
3. "Permission graphs enable complex access control queries"
4. "Graph traversal answers 'What can this user access?' instantly"

Custom educational notes:
1. "Notice how permissions are granted to roles, not users directly - this is the RBAC model"
2. "A single query can find all resources a user can access by traversing user→role→permission→resource"
3. "This graph model makes audit questions like 'Who can access production data?' trivial to answer"
```

---

## Implementation Notes

### Order of Implementation

Recommended order based on complexity and dependencies:

1. **IT Infrastructure Nodes** (nodes only, simplest)
2. **IT Infrastructure Graph** (builds on #1, adds edges)
3. **IT Asset Relationship Graph** (similar to #2, different domain)
4. **Deployment DAG** (introduces deployment concepts)
5. **Dependency Cycle Detection** (builds on DAG concepts)
6. **Bidirectional Tracing** (introduces directional analysis)
7. **Multi-Layer Dependency Map** (introduces layer concept)
8. **Business Service Mapping** (complex multi-layer)
9. **Cypher Pattern Matching** (introduces pattern concepts)
10. **RBAC Permission Graph** (complex access control model)

### Feature Requests Summary

Additional features needed beyond basic it-graph-generator:

1. **Deployment Path Highlighting** (Diagram #4)
2. **Cycle Detection Button** (Diagram #5)
3. **Pattern Selection Buttons** (Diagram #6)
4. **Bidirectional Filtering** (Diagram #7)
5. **Layer View Toggle** (Diagram #8)
6. **Trace Service Path** (Diagram #9)
7. **Check Access Mode** (Diagram #10)

### Testing Checklist

For each generated microsim, verify:
- [ ] All nodes display correctly with proper icons
- [ ] Edges show correct directionality and labels
- [ ] Filter controls work on single row
- [ ] Search finds nodes by properties
- [ ] Educational notes are contextually relevant
- [ ] Hover tooltips show all properties
- [ ] Click displays full details in sidebar
- [ ] Any custom features work correctly
- [ ] Embedded in appropriate chapter with iframe
- [ ] Documentation in index.md is complete

---

## Next Steps

1. Generate each microsim in the recommended order
2. Test each microsim thoroughly
3. Embed in appropriate chapters
4. Update mkdocs.yml navigation
5. Consider extending it-graph-generator skill to support advanced features
6. Document any patterns or techniques for future microsims
