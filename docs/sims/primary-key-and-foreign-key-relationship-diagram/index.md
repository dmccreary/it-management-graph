---
title: Primary Key and Foreign Key Relationship Diagram
description: Primary Key and Foreign Key Relationship Diagram
status: scaffold
library: TBD
bloom_level: TBD
---

# Primary Key and Foreign Key Relationship Diagram

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

    Purpose: Visually demonstrate how primary keys and foreign keys establish relationships between tables, showing data flow through key references

    Tables to show (with sample data):

    Servers Table:
    | server_id (PK) | hostname | ip_address | location_id (FK) |
    |----------------|----------|------------|------------------|
    | 1 | web-prod-01 | 10.0.1.50 | 101 |
    | 2 | db-prod-01 | 10.0.1.51 | 101 |
    | 3 | app-dev-01 | 10.0.2.20 | 102 |

    Applications Table:
    | app_id (PK) | app_name | server_id (FK) |
    |-------------|----------|----------------|
    | 501 | Customer Portal | 1 |
    | 502 | Payment API | 1 |
    | 503 | Inventory System | 2 |
    | 504 | Dev Test App | 3 |

    Locations Table:
    | location_id (PK) | data_center | city |
    |------------------|-------------|------|
    | 101 | DC-EAST-1 | New York |
    | 102 | DC-WEST-1 | San Francisco |

    Visual elements:
    - Arrows connecting foreign key values to matching primary key values
    - Arrow from Applications.server_id = 1 to Servers.server_id = 1 (highlighting that "Customer Portal" and "Payment API" both reference the same server)
    - Arrow from Servers.location_id = 101 to Locations.location_id = 101
    - Color coding: Primary keys in gold background, Foreign keys in light blue background

    Annotations:
    - "Primary Key: Unique identifier for each row" with arrow pointing to server_id in Servers
    - "Foreign Key: References another table's primary key" with arrow pointing to server_id in Applications
    - "Multiple applications can reference the same server (many-to-one)" showing the two arrows from Applications to Servers row 1
    - "Referential Integrity: FK values must match existing PK values"

    Special callout showing what happens with invalid reference:
    - Attempted insert: app_id = 505, app_name = "Invalid App", server_id = 999
    - Red X symbol with text: "ERROR: Foreign key constraint violation. Server ID 999 does not exist."

    Style: Table-based diagram with actual data rows and connecting arrows between foreign key and primary key values

    Color scheme:
    - Gold background for primary key columns
    - Light blue background for foreign key columns
    - Green arrows for valid references
    - Red X for constraint violation example
    - Tables in standard row/column format with borders

    Implementation: HTML table styling with SVG arrows overlaid, or draw.io diagram with table shapes
```

## Related Resources

- [Chapter 3: Relational Database Fundamentals](../../chapters/03-relational-database-fundamentals/index.md)
