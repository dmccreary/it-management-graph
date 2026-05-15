// CANVAS_HEIGHT: 560
// Deployment Dependencies DAG
// Shows software deployment dependencies as a DAG with topological sort and critical path

const nodeData = [
  // Layer 0 — Infrastructure (no dependencies)
  { id: 1,  label: 'Container\nOrchestrator', group: 'infra',  level: 0, time: 15, title: 'Container Orchestrator (Kubernetes) | Deploy time: 15 min | Layer 0 — no dependencies' },
  { id: 2,  label: 'Message Queue',           group: 'infra',  level: 0, time: 10, title: 'Message Queue (RabbitMQ) | Deploy time: 10 min | Layer 0 — no dependencies' },
  // Layer 1 — Databases
  { id: 3,  label: 'User DB',                 group: 'db',     level: 1, time: 12, title: 'User Database (PostgreSQL) | Deploy time: 12 min | Needs: Container Orchestrator' },
  { id: 4,  label: 'Session Store',           group: 'db',     level: 1, time: 8,  title: 'Session Store (Redis) | Deploy time: 8 min | Needs: Container Orchestrator' },
  { id: 5,  label: 'Metrics DB',              group: 'db',     level: 1, time: 10, title: 'Metrics Database | Deploy time: 10 min | Needs: Container Orchestrator' },
  // Layer 2 — Core Services
  { id: 6,  label: 'Auth Service',            group: 'svc',    level: 2, time: 8,  title: 'Auth Service | Deploy time: 8 min | Needs: User DB + Session Store' },
  { id: 7,  label: 'User Service',            group: 'svc',    level: 2, time: 6,  title: 'User Service | Deploy time: 6 min | Needs: User DB' },
  { id: 8,  label: 'Logging Service',         group: 'svc',    level: 2, time: 5,  title: 'Logging Service | Deploy time: 5 min | Needs: Message Queue' },
  // Layer 3 — Mid-tier Services
  { id: 9,  label: 'API Gateway',             group: 'svc',    level: 3, time: 7,  title: 'API Gateway | Deploy time: 7 min | Needs: Auth Service + User Service' },
  { id: 10, label: 'Notification Svc',        group: 'svc',    level: 3, time: 6,  title: 'Notification Service | Deploy time: 6 min | Needs: Message Queue + User Service' },
  { id: 11, label: 'Analytics Svc',           group: 'svc',    level: 3, time: 8,  title: 'Analytics Service | Deploy time: 8 min | Needs: Metrics DB' },
  // Layer 4 — Applications
  { id: 12, label: 'Web Frontend',            group: 'app',    level: 4, time: 5,  title: 'Web Frontend | Deploy time: 5 min | Needs: API Gateway + Session Store' },
  { id: 13, label: 'Mobile API',              group: 'app',    level: 4, time: 5,  title: 'Mobile API | Deploy time: 5 min | Needs: API Gateway + Notification Svc' },
  { id: 14, label: 'Admin Dashboard',         group: 'app',    level: 4, time: 6,  title: 'Admin Dashboard | Deploy time: 6 min | Needs: API Gateway + Analytics Svc + User Service' },
];

const edgeData = [
  // Infra → Databases
  { from: 3,  to: 1,  id: 'e1' },
  { from: 4,  to: 1,  id: 'e2' },
  { from: 5,  to: 1,  id: 'e3' },
  // Infra → Services
  { from: 8,  to: 2,  id: 'e4' },
  // Databases → Services
  { from: 6,  to: 3,  id: 'e5' },
  { from: 6,  to: 4,  id: 'e6' },
  { from: 7,  to: 3,  id: 'e7' },
  { from: 11, to: 5,  id: 'e8' },
  // Services → Mid-tier
  { from: 9,  to: 6,  id: 'e9' },
  { from: 9,  to: 7,  id: 'e10' },
  { from: 10, to: 2,  id: 'e11' },
  { from: 10, to: 7,  id: 'e12' },
  // Mid-tier → Applications
  { from: 12, to: 9,  id: 'e13' },
  { from: 12, to: 4,  id: 'e14' },
  { from: 13, to: 9,  id: 'e15' },
  { from: 13, to: 10, id: 'e16' },
  { from: 14, to: 9,  id: 'e17' },
  { from: 14, to: 11, id: 'e18' },
  { from: 14, to: 7,  id: 'e19' },
];

// Critical path: Infra → UserDB → AuthService → APIGateway → WebFrontend
const criticalPath = new Set([1, 3, 6, 9, 12]);
const criticalEdges = new Set(['e1', 'e5', 'e6', 'e9', 'e13']);

const colorMap = { infra: '#546e7a', db: '#f57c00', svc: '#42a5f5', app: '#1976d2' };

// Topological deployment order (by layer)
const deployOrder = [
  [1, 2],           // Layer 0
  [3, 4, 5],        // Layer 1
  [6, 7, 8],        // Layer 2
  [9, 10, 11],      // Layer 3
  [12, 13, 14],     // Layer 4
];

let network, nodes, edges, deployTimeout;

function buildGraph() {
  nodes = new vis.DataSet(nodeData.map(n => ({
    id: n.id, label: n.label, title: n.title, level: n.level,
    color: { background: colorMap[n.group], border: '#333' },
    font: { color: 'white', size: 11 }, shape: 'box',
  })));

  edges = new vis.DataSet(edgeData.map(e => ({
    id: e.id, from: e.from, to: e.to,
    arrows: 'to', label: 'DEPENDS_ON',
    font: { size: 8, align: 'middle' },
    color: { color: '#888' }, width: 1,
  })));

  const container = document.getElementById('network');
  network = new vis.Network(container, { nodes, edges }, {
    layout: { hierarchical: { enabled: true, direction: 'UD', sortMethod: 'hubsize', levelSeparation: 90, nodeSpacing: 110 } },
    physics: { enabled: false },
    edges: { smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 } },
    interaction: { tooltipDelay: 100 },
  });
}

function resetGraph() {
  if (deployTimeout) clearTimeout(deployTimeout);
  nodes.update(nodeData.map(n => ({
    id: n.id,
    color: { background: colorMap[n.group], border: '#333' },
    label: nodeData.find(x => x.id === n.id).label,
  })));
  edges.update(edgeData.map(e => ({ id: e.id, color: { color: '#888' }, width: 1 })));
  document.getElementById('deploy-msg').textContent = '';
}

function animateDeploy() {
  resetGraph();
  let layerIdx = 0;
  const msg = document.getElementById('deploy-msg');

  function deployLayer() {
    if (layerIdx >= deployOrder.length) {
      msg.textContent = 'Deployment complete! All layers deployed.';
      return;
    }
    const layer = deployOrder[layerIdx];
    msg.textContent = `Deploying Layer ${layerIdx}... (${layer.length} nodes in parallel)`;
    nodes.update(layer.map(id => ({
      id, color: { background: '#66bb6a', border: '#2e7d32' },
    })));
    layerIdx++;
    deployTimeout = setTimeout(deployLayer, 900);
  }
  deployLayer();
}

function showCriticalPath() {
  resetGraph();
  setTimeout(() => {
    nodes.update(nodeData.map(n => ({
      id: n.id,
      color: { background: criticalPath.has(n.id) ? '#e53935' : '#ccc', border: '#bbb' },
      opacity: criticalPath.has(n.id) ? 1 : 0.3,
    })));
    edges.update(edgeData.map(e => ({
      id: e.id,
      color: { color: criticalEdges.has(e.id) ? '#e53935' : '#ddd' },
      width: criticalEdges.has(e.id) ? 4 : 1,
    })));
    document.getElementById('deploy-msg').textContent = 'Critical path: ~42 min total';
  }, 50);
}

function showParallel() {
  resetGraph();
  const layerColors = ['#546e7a', '#f57c00', '#42a5f5', '#1976d2', '#7b1fa2'];
  setTimeout(() => {
    nodes.update(nodeData.map(n => ({
      id: n.id,
      color: { background: layerColors[n.level], border: '#333' },
      label: nodeData.find(x => x.id === n.id).label + `\nLayer ${n.level}`,
    })));
    document.getElementById('deploy-msg').textContent = 'Each layer deploys in parallel — 5 waves total';
  }, 50);
}

buildGraph();
