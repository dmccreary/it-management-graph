// CANVAS_HEIGHT: 600
// Cypher Pattern Matching Interactive Visualization
// Shows how Cypher queries find subgraph patterns in IT infrastructure data

const queries = [
  `MATCH (bs:BusinessService)-[:SUPPORTS]->(app:Application)
      -[:DEPENDS_ON]->(db:Database)
WHERE db.last_backup < datetime() - duration({days: 7})
RETURN bs.name, app.name, db.name`,
  `MATCH (app:Application)-[:DEPENDS_ON]->(db1:Database),
      (app)-[:DEPENDS_ON]->(db2:Database)
WHERE id(db1) <> id(db2)
RETURN app.name, db1.name, db2.name`,
  `MATCH (bs:BusinessService)-[:SUPPORTS]->(app:Application)
      -[:DEPENDS_ON]->(db:Database)
RETURN bs.name, app.name, db.name`
];

// Define IT infrastructure nodes
const nodeData = [
  // Business Services
  { id: 1,  label: 'Online Banking',      group: 'bs',  title: 'BusinessService: Online Banking' },
  { id: 2,  label: 'Mobile App',          group: 'bs',  title: 'BusinessService: Mobile App' },
  { id: 3,  label: 'Admin Portal',        group: 'bs',  title: 'BusinessService: Admin Portal' },
  { id: 4,  label: 'Customer Service',    group: 'bs',  title: 'BusinessService: Customer Service' },
  // Applications
  { id: 5,  label: 'Web Frontend',        group: 'app', title: 'Application: Web Frontend' },
  { id: 6,  label: 'Payment Service',     group: 'app', title: 'Application: Payment Service' },
  { id: 7,  label: 'Auth Service',        group: 'app', title: 'Application: Auth Service' },
  { id: 8,  label: 'Order Service',       group: 'app', title: 'Application: Order Service' },
  { id: 9,  label: 'User Service',        group: 'app', title: 'Application: User Service' },
  { id: 10, label: 'Chat Service',        group: 'app', title: 'Application: Chat Service' },
  // Databases
  { id: 11, label: 'CustomerDB',  group: 'db', backup: 2,  title: 'Database: CustomerDB | Last backup: 2 days ago ✅' },
  { id: 12, label: 'PaymentDB',   group: 'db', backup: 10, title: 'Database: PaymentDB | Last backup: 10 days ago ⚠️ MATCH' },
  { id: 13, label: 'OrderDB',     group: 'db', backup: 1,  title: 'Database: OrderDB | Last backup: 1 day ago ✅' },
  { id: 14, label: 'UserDB',      group: 'db', backup: 15, title: 'Database: UserDB | Last backup: 15 days ago 🔴 MATCH' },
  { id: 15, label: 'AuditDB',     group: 'db', backup: 20, title: 'Database: AuditDB | Last backup: 20 days ago 🔴 MATCH' },
  { id: 16, label: 'SessionStore',group: 'db', backup: 1,  title: 'Database: SessionStore | Last backup: 1 day ago ✅' },
];

const edgeData = [
  // Business Service SUPPORTS Application
  { from: 1, to: 5, label: 'SUPPORTS', arrows: 'to', font: { size: 9 } },
  { from: 1, to: 6, label: 'SUPPORTS', arrows: 'to', font: { size: 9 } },
  { from: 2, to: 7, label: 'SUPPORTS', arrows: 'to', font: { size: 9 } },
  { from: 3, to: 7, label: 'SUPPORTS', arrows: 'to', font: { size: 9 } },
  { from: 4, to: 9, label: 'SUPPORTS', arrows: 'to', font: { size: 9 } },
  { from: 4, to: 10, label: 'SUPPORTS', arrows: 'to', font: { size: 9 } },
  // Application DEPENDS_ON Database
  { from: 5, to: 11, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
  { from: 6, to: 12, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
  { from: 7, to: 14, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
  { from: 8, to: 13, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
  { from: 9, to: 11, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
  { from: 9, to: 16, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
  { from: 10, to: 15, label: 'DEPENDS_ON', arrows: 'to', font: { size: 9 } },
];

// Pattern match definitions: array of [bsId, appId, dbId] triples
const patterns = [
  // Pattern 0: backup > 7 days
  [
    { bs: 1, app: 6, db: 12, label: 'Online Banking → Payment Service → PaymentDB (10 days)', sev: 'WARNING' },
    { bs: 3, app: 7, db: 14, label: 'Admin Portal → Auth Service → UserDB (15 days)', sev: 'CRITICAL' },
    { bs: 4, app: 10, db: 15, label: 'Customer Service → Chat Service → AuditDB (20 days)', sev: 'CRITICAL' },
  ],
  // Pattern 1: apps with multiple DB dependencies
  [
    { bs: 4, app: 9, db: 11, label: 'User Service → CustomerDB + SessionStore', sev: 'INFO', extra: 16 },
    { bs: 4, app: 9, db: 16, label: 'User Service → SessionStore (2nd dep)', sev: 'INFO' },
  ],
  // Pattern 2: all service→app→db paths
  [
    { bs: 1, app: 5, db: 11, label: 'Online Banking → Web Frontend → CustomerDB', sev: 'OK' },
    { bs: 1, app: 6, db: 12, label: 'Online Banking → Payment Service → PaymentDB', sev: 'OK' },
    { bs: 4, app: 9, db: 11, label: 'Customer Service → User Service → CustomerDB', sev: 'OK' },
  ],
];

const matchColors = ['#f9a825', '#0097a7', '#c2185b'];
const matchBg    = ['#fff9c4', '#e0f7fa', '#fce4ec'];

let network, nodes, edges;

function buildGraph() {
  const colorMap = { bs: '#e91e63', app: '#1976d2', db: '#f57c00' };
  const shapeMap = { bs: 'ellipse', app: 'box', db: 'database' };

  nodes = new vis.DataSet(nodeData.map(n => ({
    id: n.id, label: n.label, title: n.title,
    color: { background: colorMap[n.group], border: '#333', highlight: { background: colorMap[n.group] } },
    font: { color: 'white', size: 12 },
    shape: shapeMap[n.group],
  })));

  edges = new vis.DataSet(edgeData.map((e, i) => ({ ...e, id: i })));

  const container = document.getElementById('network');
  network = new vis.Network(container, { nodes, edges }, {
    physics: { enabled: true, stabilization: { iterations: 200 } },
    layout: { randomSeed: 42 },
    edges: { color: { color: '#888' }, smooth: { type: 'dynamic' } },
    interaction: { tooltipDelay: 100 },
  });
}

function updateQuery() {
  const idx = parseInt(document.getElementById('pattern-select').value);
  document.getElementById('query-display').textContent = queries[idx];
}

function clearHighlight() {
  const colorMap = { bs: '#e91e63', app: '#1976d2', db: '#f57c00' };
  nodes.update(nodeData.map(n => ({
    id: n.id,
    color: { background: colorMap[n.group], border: '#333' },
    opacity: 1,
  })));
  edges.update(edgeData.map((e, i) => ({ id: i, color: { color: '#888' }, width: 1 })));
  document.getElementById('match-list').innerHTML = '<p style="font-size:11px;color:#999">No matches yet</p>';
  document.getElementById('status').textContent = 'Click "Find Matches" to run query';
}

function findMatches() {
  const idx = parseInt(document.getElementById('pattern-select').value);
  const matches = patterns[idx];
  const matchedNodeIds = new Set();
  const matchedEdgeIds = new Set();

  // Collect matched nodes and edges
  matches.forEach((m, mi) => {
    matchedNodeIds.add(m.bs);
    matchedNodeIds.add(m.app);
    matchedNodeIds.add(m.db);
    // Find edges
    edgeData.forEach((e, ei) => {
      if ((e.from === m.bs && e.to === m.app) ||
          (e.from === m.app && e.to === m.db) ||
          (m.extra && e.from === m.app && e.to === m.extra)) {
        matchedEdgeIds.add(ei);
      }
    });
  });

  // Fade unmatched, highlight matched with per-match color
  const nodeUpdates = nodeData.map(n => {
    if (!matchedNodeIds.has(n.id)) {
      return { id: n.id, color: { background: '#ccc', border: '#bbb' }, opacity: 0.3 };
    }
    // Find which match this node belongs to
    let matchIdx = 0;
    matches.forEach((m, mi) => {
      if (m.bs === n.id || m.app === n.id || m.db === n.id) matchIdx = mi;
    });
    return { id: n.id, color: { background: matchColors[matchIdx], border: '#333' }, opacity: 1 };
  });
  nodes.update(nodeUpdates);

  const edgeUpdates = edgeData.map((e, i) => {
    if (!matchedEdgeIds.has(i)) return { id: i, color: { color: '#ddd' }, width: 1 };
    return { id: i, color: { color: '#333' }, width: 3 };
  });
  edges.update(edgeUpdates);

  // Build match list HTML
  const matchHtml = matches.map((m, mi) => `
    <div class="match-item match-${mi+1}">
      <strong>Match ${mi+1}</strong>
      ${m.label}<br>
      <span style="font-weight:600;color:${mi===0?'#e65100':mi===1?'#0097a7':'#c2185b'}">${m.sev}</span>
    </div>`).join('');
  document.getElementById('match-list').innerHTML = matchHtml;
  document.getElementById('status').textContent = `${matches.length} match${matches.length!==1?'es':''} found`;
}

buildGraph();
