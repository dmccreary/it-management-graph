// Multi-Layer Dependency Map Visualization
// CANVAS_HEIGHT: 580

const layerConfig = {
  1: { name: 'Business Service', color: '#E91E63', border: '#880E4F', shape: 'dot', level: 1, size: 26, font: '#fff' },
  2: { name: 'Technical Service', color: '#9C27B0', border: '#4A148C', shape: 'dot', level: 2, size: 20, font: '#fff' },
  3: { name: 'Application', color: '#2196F3', border: '#0D47A1', shape: 'dot', level: 3, size: 18, font: '#fff' },
  4: { name: 'Database', color: '#FF9800', border: '#E65100', shape: 'dot', level: 4, size: 18, font: '#fff' },
  5: { name: 'Server', color: '#607D8B', border: '#263238', shape: 'dot', level: 5, size: 16, font: '#fff' },
  6: { name: 'Datacenter', color: '#4CAF50', border: '#1B5E20', shape: 'dot', level: 6, size: 14, font: '#fff' }
};

const rawNodes = [
  // Layer 1 - Business Services
  { id: 'bs1', label: 'Online Banking', layer: 1 },
  { id: 'bs2', label: 'E-Commerce', layer: 1 },
  { id: 'bs3', label: 'Customer Portal', layer: 1 },
  // Layer 2 - Technical Services
  { id: 'ts1', label: 'Auth Service', layer: 2 },
  { id: 'ts2', label: 'Payment Gateway', layer: 2 },
  { id: 'ts3', label: 'Notification Hub', layer: 2 },
  { id: 'ts4', label: 'Analytics Engine', layer: 2 },
  // Layer 3 - Applications
  { id: 'ap1', label: 'Web Frontend', layer: 3 },
  { id: 'ap2', label: 'Mobile API', layer: 3 },
  { id: 'ap3', label: 'Admin Dashboard', layer: 3 },
  { id: 'ap4', label: 'Background Worker', layer: 3 },
  { id: 'ap5', label: 'API Gateway', layer: 3 },
  { id: 'ap6', label: 'Search Service', layer: 3 },
  { id: 'ap7', label: 'Recommendation Engine', layer: 3 },
  { id: 'ap8', label: 'Reporting Service', layer: 3 },
  // Layer 4 - Databases
  { id: 'db1', label: 'CustomerDB', layer: 4 },
  { id: 'db2', label: 'OrderDB', layer: 4 },
  { id: 'db3', label: 'ProductDB', layer: 4 },
  { id: 'db4', label: 'SessionStore', layer: 4 },
  { id: 'db5', label: 'AnalyticsDB', layer: 4 },
  { id: 'db6', label: 'ConfigDB', layer: 4 },
  // Layer 5 - Servers
  { id: 'sv1', label: 'web-prod-01', layer: 5 },
  { id: 'sv2', label: 'web-prod-02', layer: 5 },
  { id: 'sv3', label: 'api-prod-01', layer: 5 },
  { id: 'sv4', label: 'db-prod-01', layer: 5 },
  { id: 'sv5', label: 'db-prod-02', layer: 5 },
  { id: 'sv6', label: 'cache-prod-01', layer: 5 },
  // Layer 6 - Datacenters
  { id: 'dc1', label: 'DC-East-1', layer: 6 },
  { id: 'dc2', label: 'DC-West-1', layer: 6 },
  { id: 'dc3', label: 'DC-Central-1', layer: 6 }
];

const rawEdges = [
  // Business → Technical
  { from: 'bs1', to: 'ts1' }, { from: 'bs1', to: 'ts2' },
  { from: 'bs2', to: 'ts2' }, { from: 'bs2', to: 'ts3' }, { from: 'bs2', to: 'ts4' },
  { from: 'bs3', to: 'ts1' }, { from: 'bs3', to: 'ts3' },
  // Business → Application
  { from: 'bs1', to: 'ap1' }, { from: 'bs2', to: 'ap2' }, { from: 'bs3', to: 'ap3' },
  // Technical → Application
  { from: 'ts1', to: 'ap5' }, { from: 'ts2', to: 'ap5' }, { from: 'ts3', to: 'ap4' }, { from: 'ts4', to: 'ap7' },
  // App → App
  { from: 'ap1', to: 'ap5' }, { from: 'ap2', to: 'ap5' }, { from: 'ap5', to: 'ap6' },
  // App → Database
  { from: 'ap1', to: 'db1' }, { from: 'ap5', to: 'db2' }, { from: 'ap6', to: 'db3' },
  { from: 'ap4', to: 'db5' }, { from: 'ap7', to: 'db5' }, { from: 'ap3', to: 'db6' },
  { from: 'ap2', to: 'db4' }, { from: 'ap8', to: 'db5' },
  // App → Server
  { from: 'ap1', to: 'sv1' }, { from: 'ap2', to: 'sv1' }, { from: 'ap3', to: 'sv2' },
  { from: 'ap5', to: 'sv3' }, { from: 'ap6', to: 'sv3' }, { from: 'ap7', to: 'sv3' },
  { from: 'ap4', to: 'sv4' }, { from: 'ap8', to: 'sv4' },
  // DB → Server
  { from: 'db1', to: 'sv4' }, { from: 'db2', to: 'sv4' }, { from: 'db3', to: 'sv5' },
  { from: 'db4', to: 'sv6' }, { from: 'db5', to: 'sv5' }, { from: 'db6', to: 'sv5' },
  // Server → DC
  { from: 'sv1', to: 'dc1' }, { from: 'sv2', to: 'dc1' },
  { from: 'sv3', to: 'dc2' }, { from: 'sv4', to: 'dc2' },
  { from: 'sv5', to: 'dc3' }, { from: 'sv6', to: 'dc3' }
];

function buildNode(n) {
  const lc = layerConfig[n.layer];
  return {
    id: n.id,
    label: n.label,
    layer: n.layer,
    level: lc.level,
    shape: 'dot',
    size: lc.size,
    color: { background: lc.color, border: lc.border, highlight: { background: lc.color, border: '#222' } },
    font: { color: lc.font, size: 11 },
    hidden: false
  };
}

let allNodes = new vis.DataSet(rawNodes.map(buildNode));
let allEdges = new vis.DataSet(rawEdges.map((e, i) => ({
  id: 'e' + i,
  from: e.from,
  to: e.to,
  arrows: 'to',
  color: { color: '#adb5bd', highlight: '#1a3a6c' },
  width: 1.5,
  smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.3 }
})));

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 80,
      nodeSpacing: 70,
      treeSpacing: 80,
      blockShifting: true,
      edgeMinimization: true
    }
  },
  physics: { enabled: false },
  interaction: { hover: true, navigationButtons: false },
  nodes: { borderWidth: 2, shadow: { enabled: true, size: 4 } }
};

const container = document.getElementById('network');
const network = new vis.Network(container, { nodes: allNodes, edges: allEdges }, options);

document.getElementById('s-edges').textContent = rawEdges.length;

// Layer visibility toggles
const layerCheckboxes = { 1: 'l1', 2: 'l2', 3: 'l3', 4: 'l4', 5: 'l5', 6: 'l6' };
function updateVisibility() {
  const hidden = {};
  Object.entries(layerCheckboxes).forEach(([layer, id]) => {
    hidden[layer] = !document.getElementById(id).checked;
  });
  const updates = rawNodes.map(n => ({ id: n.id, hidden: hidden[n.layer] }));
  allNodes.update(updates);
  // Hide edges where either endpoint is hidden
  const hiddenSet = new Set(rawNodes.filter(n => hidden[n.layer]).map(n => n.id));
  const edgeUpdates = rawEdges.map((e, i) => ({
    id: 'e' + i,
    hidden: hiddenSet.has(e.from) || hiddenSet.has(e.to)
  }));
  allEdges.update(edgeUpdates);
  document.getElementById('s-nodes').textContent = rawNodes.filter(n => !hidden[n.layer]).length;
}

Object.values(layerCheckboxes).forEach(id => {
  document.getElementById(id).addEventListener('change', updateVisibility);
});

document.getElementById('reset-btn').addEventListener('click', () => {
  Object.values(layerCheckboxes).forEach(id => { document.getElementById(id).checked = true; });
  updateVisibility();
  // Reset colors
  allNodes.update(rawNodes.map(buildNode));
  allEdges.update(rawEdges.map((e, i) => ({
    id: 'e' + i, color: { color: '#adb5bd' }, width: 1.5
  })));
  document.getElementById('node-info').textContent = 'Click a node to see details and highlight its dependency stack.';
  network.fit({ animation: true });
});

// Build lookup maps for BFS
const adjDown = {}; // node → its dependencies (edges going to lower layer)
const adjUp = {};   // node → things that depend on it (edges going up)
rawNodes.forEach(n => { adjDown[n.id] = []; adjUp[n.id] = []; });
rawEdges.forEach(e => {
  adjDown[e.from].push(e.to);
  adjUp[e.to].push(e.from);
});

function bfsSet(start, adj) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const cur = queue.shift();
    (adj[cur] || []).forEach(n => { if (!visited.has(n)) { visited.add(n); queue.push(n); } });
  }
  return visited;
}

network.on('click', params => {
  if (params.nodes.length === 0) return;
  const nodeId = params.nodes[0];
  const nd = rawNodes.find(n => n.id === nodeId);
  if (!nd) return;

  const lc = layerConfig[nd.layer];
  const downstream = bfsSet(nodeId, adjDown);
  const upstream = bfsSet(nodeId, adjUp);
  const relevant = new Set([...downstream, ...upstream]);

  // Highlight relevant, dim others
  allNodes.update(rawNodes.map(n => {
    if (n.id === nodeId) {
      return { id: n.id, color: { background: '#FFD700', border: '#B8860B' }, font: { color: '#333' } };
    } else if (relevant.has(n.id)) {
      const lc2 = layerConfig[n.layer];
      return { id: n.id, color: { background: lc2.color, border: lc2.border }, font: { color: lc2.font } };
    } else {
      return { id: n.id, color: { background: '#e0e0e0', border: '#bbb' }, font: { color: '#aaa' } };
    }
  }));

  allEdges.update(rawEdges.map((e, i) => {
    const isRelevant = relevant.has(e.from) && relevant.has(e.to);
    return { id: 'e' + i, color: { color: isRelevant ? '#1a3a6c' : '#e0e0e0' }, width: isRelevant ? 3 : 1 };
  }));

  document.getElementById('node-info').innerHTML = `
    <strong style="color:${lc.color}">${nd.label}</strong><br>
    Layer: ${lc.name} (${nd.layer}/6)<br>
    Depends on: ${adjDown[nodeId].length} nodes<br>
    Required by: ${adjUp[nodeId].length} nodes<br>
    Total stack: ${relevant.size} nodes
  `;
});
