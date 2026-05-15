// Schema Evolution Timeline - vis-timeline
// CANVAS_HEIGHT: 500

const events = [
  {
    id: 1,
    content: 'Servers Only',
    start: '2020-01-01',
    end:   '2020-06-01',
    className: 'clean',
    group: 1,
    detail: {
      title: 'Stage 1 (Jan 2020): Initial Schema — Servers Only',
      bg: '#e3f2fd', border: '#1565c0',
      sql: `CREATE TABLE Servers (
  server_id    INTEGER PRIMARY KEY,
  hostname     VARCHAR(255),
  ip_address   VARCHAR(15),
  cpu_count    INTEGER,
  ram_gb       INTEGER,
  os_version   VARCHAR(100)
);`,
      notes: `<p><strong>Status:</strong> Clean, simple schema for a homogeneous entity type.<br>
All columns are relevant to every row. Zero NULLs. Fast queries.<br>
This is the ideal relational starting point.</p>`
    }
  },
  {
    id: 2,
    content: 'Add Switches (NULLs begin)',
    start: '2020-06-01',
    end:   '2020-12-01',
    className: 'warning',
    group: 1,
    detail: {
      title: 'Stage 2 (Jun 2020): Add Network Switches — NULLs Begin',
      bg: '#fffde7', border: '#f9a825',
      sql: `ALTER TABLE Servers RENAME TO Infrastructure;
ALTER TABLE Infrastructure ADD COLUMN device_type VARCHAR(20);
ALTER TABLE Infrastructure ADD COLUMN port_count  INTEGER;   -- NULL for servers
ALTER TABLE Infrastructure ADD COLUMN vlan_support BOOLEAN;  -- NULL for servers
ALTER TABLE Infrastructure ADD COLUMN switch_type  VARCHAR(50); -- NULL for servers
-- Also: cpu_count, ram_gb, os_version now NULL for switches`,
      notes: `<p><strong>Problem:</strong> Switches have different attributes than servers.<br>
Chose "single table with NULLs" approach. Now ~30% of cells are NULL.<br>
Queries need <code>WHERE device_type = 'server'</code> everywhere.<br>
Application code must handle NULL values for device-type-specific columns.</p>`
    }
  },
  {
    id: 3,
    content: 'Add Storage Arrays (~60% NULLs)',
    start: '2020-12-01',
    end:   '2021-06-01',
    className: 'warning',
    group: 1,
    detail: {
      title: 'Stage 3 (Dec 2020): Add Storage Arrays — 60% NULLs',
      bg: '#fff8e1', border: '#ff8f00',
      sql: `ALTER TABLE Infrastructure ADD COLUMN storage_capacity_tb INTEGER; -- NULL for servers, switches
ALTER TABLE Infrastructure ADD COLUMN raid_level     VARCHAR(20); -- NULL for servers, switches
ALTER TABLE Infrastructure ADD COLUMN disk_count     INTEGER;     -- NULL for servers, switches

-- 4-hour maintenance window required (ALTER TABLE on 100K rows)`,
      notes: `<p><strong>Problem escalating:</strong> Table now has ~60% NULL values.<br>
Every ALTER TABLE requires a maintenance window (4+ hours for 100K rows).<br>
Indexes on device-specific columns are becoming ineffective due to NULL density.<br>
Storage waste increases. Query optimizer struggles with sparse tables.</p>`
    }
  },
  {
    id: 4,
    content: 'Add IoT Sensors (~75% NULLs)',
    start: '2021-06-01',
    end:   '2022-01-01',
    className: 'crisis',
    group: 1,
    detail: {
      title: 'Stage 4 (Jun 2021): Add IoT Sensors — 75% NULLs',
      bg: '#fce4ec', border: '#c62828',
      sql: `ALTER TABLE Infrastructure ADD COLUMN sensor_type         VARCHAR(50);  -- NULL for all others
ALTER TABLE Infrastructure ADD COLUMN battery_level        INTEGER;      -- NULL for all others
ALTER TABLE Infrastructure ADD COLUMN last_reading_ts      TIMESTAMP;    -- NULL for all others
ALTER TABLE Infrastructure ADD COLUMN firmware_version     VARCHAR(50);  -- NULL for all others

-- Deployment: 8-hour maintenance window, 3 application releases required`,
      notes: `<p><strong>Crisis approaching:</strong> 75% of table cells are now NULL.<br>
Adding IoT required coordinated changes across DB schema + 3 application deployments.<br>
Queries like "find all active sensors with low battery" require full table scans.<br>
Performance dashboard shows 5x slowdown vs. 2020 baseline.</p>`
    }
  },
  {
    id: 5,
    content: 'Performance Crisis',
    start: '2022-01-01',
    end:   '2022-06-01',
    className: 'crisis',
    group: 1,
    detail: {
      title: 'Stage 5 (Jan 2022): Performance Crisis',
      bg: '#ffcdd2', border: '#b71c1c',
      sql: `-- Typical impact analysis query (now painfully slow):
SELECT s.hostname, a.app_name, a.owner_team
FROM Infrastructure s
JOIN Applications a ON a.server_id = s.server_id
WHERE s.device_type = 'server'
  AND s.status = 'active'
  AND s.location_id IN (
      SELECT location_id FROM Infrastructure
      WHERE device_type = 'switch' AND vlan_support = true
  );
-- Query time: 45+ seconds (was 0.2s in 2020)`,
      notes: `<p><strong>Breaking point:</strong> Query performance degraded 200x from baseline.<br>
Business impact: Incident response teams wait 2+ minutes for impact analysis results.<br>
DBA team reports table size grown 8x despite only 4x more devices (NULL padding).<br>
Decision made: evaluate alternative architectures including graph databases.</p>`
    }
  },
  {
    id: 6,
    content: 'Graph DB Migration',
    start: '2022-06-01',
    end:   '2023-01-01',
    className: 'solution',
    group: 1,
    detail: {
      title: 'Stage 6 (Jun 2022): Solution — Graph Database Migration',
      bg: '#e8f5e9', border: '#2e7d32',
      sql: `// Graph model - no NULLs, schema-free per node type:
CREATE (:Server {
  id: 'srv-001', hostname: 'web-prod-01',
  cpu_count: 32, ram_gb: 128, os_version: 'RHEL 8'
})
CREATE (:Switch {
  id: 'sw-001', hostname: 'core-sw-01',
  port_count: 48, vlan_support: true, switch_type: 'L3'
})
CREATE (:IoTSensor {
  id: 'iot-001', sensor_type: 'temperature',
  battery_level: 87, last_reading_ts: datetime()
})
// Adding a new device type requires NO schema migration!`,
      notes: `<p><strong>Results after migration:</strong><br>
75% reduction in storage (zero NULL padding).<br>
Impact analysis queries: 45 seconds → 0.3 seconds (150x faster).<br>
New device types deployable in minutes with no maintenance windows.<br>
Schema flexibility preserved while keeping type safety via node labels.</p>`
    }
  }
];

const groups = new vis.DataSet([
  { id: 1, content: 'CMDB Schema Version' }
]);

const items = new vis.DataSet(events.map(e => ({
  id: e.id,
  content: e.content,
  start: e.start,
  end: e.end,
  group: e.group,
  className: e.className
})));

const options = {
  start: '2019-09-01',
  end: '2023-04-01',
  height: '100%',
  groupOrder: 'id',
  orientation: { axis: 'bottom' },
  zoomMin: 1000 * 60 * 60 * 24 * 30,
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 5,
  selectable: true,
  moveable: true,
  zoomable: true,
  margin: { item: { horizontal: 4, vertical: 4 } }
};

const container = document.getElementById('timeline');
const timeline = new vis.Timeline(container, items, groups, options);

const detailPanel = document.getElementById('detail-panel');

timeline.on('select', (props) => {
  if (props.items.length === 0) return;
  const id = props.items[0];
  const ev = events.find(e => e.id === id);
  if (!ev) return;
  detailPanel.style.background = ev.detail.bg;
  detailPanel.style.borderColor = ev.detail.border;
  detailPanel.innerHTML = `
    <h3 style="color:${ev.detail.border}">${ev.detail.title}</h3>
    ${ev.detail.notes}
    <pre>${ev.detail.sql}</pre>
  `;
});
