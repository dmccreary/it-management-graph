---
title: Schema Evolution Timeline: Adding Heterogeneous Device Types
description: Schema Evolution Timeline: Adding Heterogeneous Device Types
status: scaffold
library: TBD
bloom_level: TBD
---

# Schema Evolution Timeline: Adding Heterogeneous Device Types

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: workflow

    Purpose: Demonstrate the challenges of evolving a relational schema when adding new, heterogeneous entity types with different attributes

    Scenario: An IT asset database initially tracks only servers. Business requirements expand to include network switches, storage arrays, and IoT devices—each with unique attributes.

    Visual style: Horizontal timeline with schema diagrams at each stage, showing table structures evolving

    Stage 1: "Initial schema - Servers only"
    Date: January 2020

    Servers table:
    - server_id (PK)
    - hostname
    - ip_address
    - cpu_count
    - ram_gb
    - os_version

    Note: Clean, simple schema for homogeneous entity type

    Stage 2: "Requirement: Add network switches"
    Date: June 2020

    Problem: Switches have different attributes (port_count, vlan_support, switch_type) that don't apply to servers

    Two possible approaches shown as decision branches:

    Approach A: "Single table with NULLs" (selected)

    Infrastructure table:
    - device_id (PK)
    - device_type (server|switch)
    - hostname
    - ip_address
    - cpu_count (NULL for switches)
    - ram_gb (NULL for switches)
    - os_version (NULL for switches)
    - port_count (NULL for servers)
    - vlan_support (NULL for servers)
    - switch_type (NULL for servers)

    Issues: Many NULL values, sparse table, unclear which columns apply to which device types

    Approach B: "Separate tables" (not chosen)

    Servers table (original) + Switches table (new)
    Issues: Querying all infrastructure requires UNION, can't easily add shared attributes

    Stage 3: "Requirement: Add storage arrays"
    Date: December 2020

    Infrastructure table grows:
    - ... (all previous columns)
    - storage_capacity_tb (NULL for servers and switches)
    - raid_level (NULL for servers and switches)
    - disk_count (NULL for servers and switches)

    Note: Table becoming increasingly sparse, with ~60% NULL values across all rows

    Stage 4: "Requirement: Add IoT sensors"
    Date: June 2021

    Infrastructure table grows further:
    - ... (all previous columns)
    - sensor_type (NULL for servers, switches, storage)
    - battery_level (NULL for servers, switches, storage)
    - last_reading_timestamp (NULL for servers, switches, storage)

    Migration challenge: ALTER TABLE on 100,000-row table takes 4 hours, requires maintenance window

    Note: NULL values now 75% of table content, queries becoming complex with device_type filtering

    Stage 5: "Crisis: Performance degradation"
    Date: January 2022

    Problems identified:
    - Query performance declining due to table size and sparsity
    - Indexes on device-type-specific columns ineffective (too many NULLs)
    - Application logic complicated with device type conditionals
    - Adding new device types requires coordinated schema changes and application deployments

    Decision: Consider alternative architectures

    Stage 6: "Solution: Refactor to graph database"
    Date: June 2022

    Graph model:
    - Device nodes with common properties (id, hostname, ip_address)
    - Node labels by type: :Server, :Switch, :StorageArray, :IoTSensor
    - Type-specific properties stored directly on nodes without NULL padding
    - New device types added without schema migration

    Result:
    - 75% reduction in NULL values
    - Query performance improvement (type-specific queries faster)
    - New device types deployable without database migrations
    - Schema flexibility maintained while keeping type safety

    Interactive elements:
    - Hover over each stage to see code examples (CREATE TABLE, ALTER TABLE statements)
    - Click decision points to see detailed pros/cons analysis
    - Toggle view: "Show actual queries" displays SQL at each stage, showing increasing complexity
    - Metrics panel: Shows NULL percentage, query times, schema change deployment time at each stage

    Annotations:
    - "Each ALTER TABLE requires testing, migration scripts, coordination with application teams"
    - "EAV (Entity-Attribute-Value) pattern could help but sacrifices query performance"
    - "This is why heterogeneous IT infrastructure struggles in relational schemas"
    - "Graph databases excel at heterogeneous, evolving schemas"

    Color coding:
    - Blue: Clean schema stages
    - Yellow: Growing complexity warnings
    - Red: Crisis/performance problems
    - Green: Solution stage

    Swimlanes:
    - Database schema layer
    - Application impact layer
    - Operations/deployment layer

    Implementation: Horizontal timeline with expandable stages, interactive SQL code examples, metrics visualization showing degradation over time
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
