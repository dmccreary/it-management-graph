# Course Description: 

**Title:** IT Management Graphs - From Legacy CMDB to Modern Graph-Based Solutions

**Course Code:** ISMG 620 - Advanced IT Management Information Systems

### Course Overview

This undergraduate-level course examines the evolution of IT configuration management from traditional relational database approaches to modern graph-based solutions. Students will explore why legacy Configuration Management Database (CMDB) implementations, built on RDBMS technology, have consistently failed to meet organizational needs despite decades of investment. The course emphasizes how graph databases and real-time graph queries are revolutionizing IT management, providing the multi-hop transitive dependency analysis essential for understanding modern digital estates.

Through case studies, hands-on exercises, and industry examples, students will learn to architect, implement, and govern IT management graphs that support critical business decisions around technical debt, regulatory compliance (HIPAA, DORA, GDPR), and digital transformation initiatives.

### Prerequisites

- ISMG 510: Database Management Systems
- ISMG 520: Enterprise Architecture Fundamentals

### Learning Outcomes

After taking this class, students will be able to:

#### Remember (Knowledge Level)

- Identify the historical evolution from ITIL v1 (1990) configuration management to modern IT management graphs
- Recall key terminology differences between traditional CMDB concepts and graph-based data management
- List the core limitations of RDBMS systems for managing IT configuration data

#### Understand (Comprehension Level)

- Explain why relational databases fail to efficiently handle multi-hop transitive dependencies in IT infrastructure
- Describe the distinction between "element configuration management" and IT asset relationship management
- Compare ITIL's process-centric approach with modern data management principles from DMBOK

#### Apply (Application Level)

- Implement real-time graph queries to trace dependencies from technical resources to business capabilities
- Utilize graph traversal algorithms to calculate blast radius and impact analysis
- Deploy OpenTelemetry and eBPF-based telemetry for automated dependency discovery

#### Analyze (Analysis Level)

- Evaluate the performance differences between RDBMS joins and graph traversals for complex IT dependency queries
- Assess data quality requirements for fit-for-purpose IT management graphs
- Examine the role of AI and graph RAG in enhancing IT data curation and management

#### Evaluate (Evaluation Level)

- Critique legacy CMDB implementations and identify root causes of failure
- Judge the appropriateness of graph vs. relational solutions for specific IT management use cases
- Appraise vendor solutions (ServiceNow, Dynatrace, Atlassian) against graph-centric best practices

#### Create (Synthesis Level)

- Design comprehensive IT management graph architectures that support real-time operational decisions
- Develop data governance frameworks specific to graph-based IT management systems
- Construct integration strategies connecting observability tools, asset management, and business service mapping

### Key Topics

1. **The CMDB Legacy Problem**

   - Why military-spec configuration management failed in dynamic IT environments
   - The costly confusion between configuration parameters and relationship management

2. **RDBMS Limitations for IT Management**

   - Performance degradation with complex JOIN operations
   - Schema rigidity vs. IT estate volatility
   - The impossibility of efficient multi-hop queries in relational models

3. **Graph Database Fundamentals for IT**

   - Nodes, edges, and properties in IT context
   - Native graph storage vs. graph layers on RDBMS
   - Real-time traversal algorithms and their computational advantages

4. **Real-Time Graph Queries in Practice**

   - Sub-second dependency tracing across thousands of nodes
   - Dynamic impact analysis during incidents
   - Continuous compliance checking against regulatory requirements

5. **Data Management Excellence**

   - Moving from ITIL process focus to DMBOK data principles
   - Quality metrics and exception reporting
   - AI-assisted data curation and validation

6. **Industry Implementation**

   - Case studies from financial services, healthcare, and technology sectors
   - Vendor ecosystem analysis
   - Migration strategies from CMDB to IT management graphs

### Topics NOT Covered

This course does NOT cover:

- Basic database design principles (covered in prerequisite ISMG 510)
- Network infrastructure management and monitoring tools
- Software development lifecycle management
- Project management methodologies (PMBOK, Agile, etc.)
- General-purpose graph analytics for non-IT domains
- Detailed programming of graph database applications
- Cloud infrastructure provisioning and management

### Assessment Methods

- Individual case analysis (25%)
- Group project: Design and prototype an IT management graph (35%)
- Real-time query performance lab exercises (20%)
- Final examination (20%)

### Required Resources

- Primary text: "Graph Databases for IT Management" (https://dmccreary.github.io/it-management-graph/)
- Access to graph database sandbox environment (Neo4j or similar)
- Industry reports from Forrester, Gartner on IT management evolution

### Industry Relevance

With IT consuming 3% of corporate budgets and underpinning most revenue streams, effective IT management information systems are critical for organizational success. This course prepares students to lead the transformation from failed CMDB initiatives to successful graph-based solutions that enable real-time decision-making, regulatory compliance, and technical debt management in today's complex digital ecosystems.