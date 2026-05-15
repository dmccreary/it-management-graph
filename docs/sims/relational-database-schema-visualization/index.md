---
title: Relational Database Schema Visualization
description: Relational Database Schema Visualization
status: scaffold
library: TBD
bloom_level: TBD
---

# Relational Database Schema Visualization

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md).

```text
Type: diagram

    Purpose: Illustrate the schema structure for an IT asset management database showing tables, columns, data types, and foreign key relationships

    Components to show:
    Three tables represented as boxes with table name as header:

    1. Locations table (green box, left side)
       - location_id (PK) - INTEGER
       - data_center - VARCHAR(100)
       - city - VARCHAR(100)
       - region - VARCHAR(50)

    2. Servers table (blue box, center)
       - server_id (PK) - INTEGER
       - hostname - VARCHAR(255)
       - ip_address - VARCHAR(15)
       - location_id (FK) - INTEGER
       - purchase_date - DATE
       - status - VARCHAR(20)

    3. Applications table (orange box, right side)
       - app_id (PK) - INTEGER
       - app_name - VARCHAR(255)
       - version - VARCHAR(50)
       - server_id (FK) - INTEGER
       - owner_team - VARCHAR(100)

    Relationships (arrows):
    - Arrow from Servers.location_id to Locations.location_id
      Label: "LOCATED_IN" (many-to-one)
    - Arrow from Applications.server_id to Servers.server_id
      Label: "HOSTED_ON" (many-to-one)

    Visual conventions:
    - Primary keys marked with "PK" and shown in bold
    - Foreign keys marked with "FK" and shown in italic
    - Arrows point from foreign key to primary key
    - Crow's foot notation: single line at PK end (one), crow's foot at FK end (many)

    Annotations:
    - Note near Applications table: "Each application hosted on exactly one server"
    - Note near Servers table: "Each server located in exactly one data center"
    - Note showing potential limitation: "What if applications depend on other applications?" (shown with dotted line and question mark)

    Style: Classic entity-relationship diagram with rectangular tables and connecting arrows

    Color scheme:
    - Green for Locations (physical infrastructure)
    - Blue for Servers (compute infrastructure)
    - Orange for Applications (software layer)
    - Black arrows with labels

    Implementation: Draw.io, Lucidchart, or SVG-based ER diagram
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
