// CANVAS_HEIGHT: 580
// Dependency Graph with Cycle Detection Visualization
// Demonstrates DFS-based cycle detection in an IT service dependency graph

const nodeData = [
  // Applications - frontend
  { id: 1,  label: 'Web UI',              group: 'app', level: 0, title: 'Application: Web UI (frontend tier)' },
  { id: 2,  label: 'API Gateway',         group: 'app', level: 1, title: 'Application: API Gateway (frontend tier)' },
  // Applications - business
  { id: 3,  label: 'Order Service',       group: 'app', level: 2, title: 'Application: Order Service (business tier) — IN CYCLE 1' },
  { id: 4,  label: 'Payment Service',     group: 'app', level: 2, title: 'Application: Payment Service (business tier) — IN CYCLE 1' },
  { id: 5,  label: 'Inventory Service',   group: 'app', level: 2, title: 'Application: Inventory Service (business tier) — IN CYCLE 1' },
  // Applications - platform
  { id: 6,  label: 'Auth Service',        group: 'app', level: 3, title: 'Application: Auth Service (platform tier)' },
  { id: 7,  label: 'Notification Svc',    group: 'app', level: 3, title: 'Application: Notification Service (platform tier)' },
  { id: 8,  label: 'Audit Logger',        group: 'app', level: 3, title: 'Application: Audit Logger (platform tier) — IN CYCLE 2' },
  { id: 9,  label: 'Config Service',      group: 'app', level: 3, title: 'Application: Config Service (platform tier) — IN CYCLE 2' },
  // Applications - infrastructure
  { id: 10, label: 'Cache Manager',       group: 'app', level: 4, title: 'Application: Cache Manager (infrastructure tier)' },
  { id: 11, label: 'Session Manager',     group: 'app', level: 4, title: 'Application: Session Manager (infrastructure tier)' },
  // Databases
  { id: 12, label: 'OrderDB',             group: 'db',  level: 5, title: 'Database: OrderDB' },
  { id: 13, label: 'PaymentDB',           group: 'db',  level: 5, title: 'Database: PaymentDB' },
  { id: 14, label: 'UserDB',              group: 'db',  level: 5, title: 'Database: UserDB' },
  { id: 15, label: 'InventoryDB',         group: 'db',  level: 5, title: 'Database: InventoryDB' },
  { id: 16, label: 'ConfigDB',            group: 'db',  level: 5, title: 'Database: ConfigDB' },
  { id: 17, label: 'AuditDB',             group: 'db',  level: 5, title: 'Database: AuditDB' },
  { id: 18, label: 'SessionStore',        group: 'db',  level: 5, title: 'Database: SessionStore' },
];

// Edges — includes deliberate cycles
const edgeData = [
  // Healthy DAG
  { from: 1, to: 2,   id: 'e1',  label: 'DEPENDS_ON' },
  { from: 2, to: 6,   id: 'e2',  label: 'DEPENDS_ON' },
  { from: 2, to: 11,  id: 'e3',  label: 'DEPENDS_ON' },
  { from: 6, to: 14,  id: 'e4',  label: 'DEPENDS_ON' },
  { from: 11, to: 18, id: 'e5',  label: 'DEPENDS_ON' },
  { from: 3, to: 12,  id: 'e6',  label: 'DEPENDS_ON' },
  { from: 4, to: 13,  id: 'e7',  label: 'DEPENDS_ON' },
  { from: 5, to: 15,  id: 'e8',  label: 'DEPENDS_ON' },
  { from: 7, to: 16,  id: 'e9',  label: 'DEPENDS_ON' },
  { from: 8, to: 17,  id: 'e10', label: 'DEPENDS_ON' },
  { from: 9, to: 16,  id: 'e11', label: 'DEPENDS_ON' },
  { from: 10, to: 9,  id: 'e12', label: 'DEPENDS_ON' },
  { from: 3, to: 7,   id: 'e13', label: 'DEPENDS_ON' },
  { from: 4, to: 8,   id: 'e14', label: 'DEPENDS_ON' },
  // Cycle 1: Order Service → Payment Service → Inventory Service → Order Service
  { from: 3, to: 4,   id: 'ec1', label: 'DEPENDS_ON', inCycle: 1 },
  { from: 4, to: 5,   id: 'ec2', label: 'DEPENDS_ON', inCycle: 1 },
  { from: 5, to: 3,   id: 'ec3', label: 'DEPENDS_ON', inCycle: 1 },
  // Cycle 2: Audit Logger → Config Service → Audit Logger
  { from: 8, to: 9,   id: 'ec4', label: 'DEPENDS_ON', inCycle: 2 },
  { from: 9, to: 8,   id: 'ec5', label: 'DEPENDS_ON', inCycle: 2 },
];

// Nodes in each cycle
const cycle1Nodes = new Set([3, 4, 5]);
const cycle2Nodes = new Set([8, 9]);
const cycleEdges1 = new Set(['ec1', 'ec2', 'ec3']);
const cycleEdges2 = new Set(['ec4', 'ec5']);

let network, nodes, edges;

const defaultNodeColor = { app: '#1976d2', db: '#f57c00' };

function buildGraph() {
  nodes = new vis.DataSet(nodeData.map(n => ({
    id: n.id,
    label: n.label,
    title: n.title,
    color: { background: defaultNodeColor[n.group], border: '#333', highlight: { background: defaultNodeColor[n.group] } },
    font: { color: 'white', size: 12 },
    shape: n.group === 'db' ? 'database' : 'box',
    level: n.level,
  })));

  edges = new vis.DataSet(edgeData.map(e => ({
    id: e.id,
    from: e.from,
    to: e.to,
    label: e.label,
    arrows: 'to',
    font: { size: 8, align: 'middle' },
    color: { color: '#888' },
    width: 1,
  })));

  const container = document.getElementById('network');
  network = new vis.Network(container, { nodes, edges }, {
    layout: { hierarchical: { enabled: true, direction: 'UD', sortMethod: 'directed', levelSeparation: 80, nodeSpacing: 100 } },
    physics: { enabled: false },
    edges: { smooth: { type: 'curvedCW', roundness: 0.2 } },
    interaction: { tooltipDelay: 100 },
  });
}

function resetGraph() {
  nodes.update(nodeData.map(n => ({
    id: n.id,
    color: { background: defaultNodeColor[n.group], border: '#333' },
    opacity: 1,
    borderWidth: 1,
  })));
  edges.update(edgeData.map(e => ({ id: e.id, color: { color: '#888' }, width: 1 })));
  document.getElementById('cycle-info').innerHTML = '<p style="font-size:11px;color:#999">Click "Detect All Cycles" to analyze</p>';
  document.getElementById('cycle-count').innerHTML = '<b>—</b>';
  document.getElementById('nodes-in-cycles').innerHTML = '<b>—</b>';
}

function detectCycles() {
  // Highlight all cycle nodes red, healthy nodes green
  nodes.update(nodeData.map(n => {
    const inC1 = cycle1Nodes.has(n.id);
    const inC2 = cycle2Nodes.has(n.id);
    const inCycle = inC1 || inC2;
    return {
      id: n.id,
      color: { background: inCycle ? '#e53935' : '#43a047', border: inCycle ? '#b71c1c' : '#2e7d32' },
      borderWidth: inCycle ? 3 : 1,
      opacity: 1,
    };
  }));
  edges.update(edgeData.map(e => ({
    id: e.id,
    color: { color: cycleEdges1.has(e.id) ? '#ff5722' : cycleEdges2.has(e.id) ? '#ffa726' : '#aaa' },
    width: (cycleEdges1.has(e.id) || cycleEdges2.has(e.id)) ? 4 : 1,
  })));

  document.getElementById('cycle-count').innerHTML = '<b>2</b>';
  document.getElementById('nodes-in-cycles').innerHTML = '<b>5 (27.8%)</b>';

  document.getElementById('cycle-info').innerHTML = `
    <div class="cycle-box cycle-1">
      <strong>Cycle 1 — HIGH Severity</strong>
      Order Service → Payment Service → Inventory Service → Order Service<br>
      <b>Type:</b> Business logic tight coupling<br>
      <b>Fix:</b> Introduce event-driven messaging between services
    </div>
    <div class="cycle-box cycle-2">
      <strong>Cycle 2 — MEDIUM Severity</strong>
      Audit Logger ↔ Config Service<br>
      <b>Type:</b> Mutual platform dependency<br>
      <b>Fix:</b> Extract shared bootstrap config or sidecar pattern
    </div>`;
}

function showCycle(cycleIdx) {
  const cycleNodes = cycleIdx === 0 ? cycle1Nodes : cycle2Nodes;
  const cycleEdgeIds = cycleIdx === 0 ? cycleEdges1 : cycleEdges2;
  const cycleColor = cycleIdx === 0 ? '#ff5722' : '#ffa726';

  nodes.update(nodeData.map(n => ({
    id: n.id,
    color: { background: cycleNodes.has(n.id) ? cycleColor : '#ccc', border: '#bbb' },
    opacity: cycleNodes.has(n.id) ? 1 : 0.3,
  })));
  edges.update(edgeData.map(e => ({
    id: e.id,
    color: { color: cycleEdgeIds.has(e.id) ? cycleColor : '#eee' },
    width: cycleEdgeIds.has(e.id) ? 4 : 1,
  })));
}

function showDAG() {
  nodes.update(nodeData.map(n => {
    const inCycle = cycle1Nodes.has(n.id) || cycle2Nodes.has(n.id);
    return {
      id: n.id,
      color: { background: inCycle ? '#ccc' : '#43a047', border: '#bbb' },
      opacity: inCycle ? 0.25 : 1,
    };
  }));
  edges.update(edgeData.map(e => ({
    id: e.id,
    color: { color: (cycleEdges1.has(e.id) || cycleEdges2.has(e.id)) ? '#eee' : '#43a047' },
    width: (cycleEdges1.has(e.id) || cycleEdges2.has(e.id)) ? 1 : 2,
  })));
}

buildGraph();
