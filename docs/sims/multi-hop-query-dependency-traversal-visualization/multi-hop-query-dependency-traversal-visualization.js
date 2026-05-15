// Multi-Hop Query Dependency Traversal Visualization
// CANVAS_HEIGHT: 580

// Dependency graph (adjacency list)
const graph = {
  customer_portal: { label: 'Customer Portal', deps: ['auth_service', 'api_gateway', 'session_store'] },
  auth_service: { label: 'Auth Service', deps: ['user_db', 'ldap_service'] },
  api_gateway: { label: 'API Gateway', deps: ['payment_service', 'inventory_service'] },
  session_store: { label: 'Session Store', deps: [] },
  payment_service: { label: 'Payment Service', deps: ['payment_db', 'fraud_detection'] },
  inventory_service: { label: 'Inventory Service', deps: ['inventory_db'] },
  user_db: { label: 'User Database', deps: [] },
  ldap_service: { label: 'LDAP Service', deps: [] },
  payment_db: { label: 'Payment Database', deps: [] },
  fraud_detection: { label: 'Fraud Detection', deps: ['ml_model'] },
  inventory_db: { label: 'Inventory DB', deps: [] },
  ml_model: { label: 'ML Model Service', deps: [] }
};

const hopColors = ['#27ae60', '#82c45b', '#f1c40f', '#e67e22', '#e74c3c', '#c0392b'];
const hopFonts = ['#fff', '#fff', '#333', '#fff', '#fff', '#fff'];

function getHopColor(hop) { return hopColors[Math.min(hop, hopColors.length - 1)]; }
function getHopFont(hop) { return hopFonts[Math.min(hop, hopFonts.length - 1)]; }

let nodes = new vis.DataSet();
let edges = new vis.DataSet();
let network = null;
let traversalState = { visited: {}, hopMap: {} };
let animTimer = null;
let currentHop = 0;
let hopLimit = 3;
let rootNode = 'customer_portal';

function buildNodes() {
  const nodeArr = Object.entries(graph).map(([id, d]) => ({
    id,
    label: d.label,
    color: { background: '#bdc3c7', border: '#95a5a6', highlight: { background: '#bdc3c7' } },
    font: { color: '#333', size: 12 },
    shape: 'ellipse',
    size: 18
  }));
  nodes.clear();
  nodes.add(nodeArr);

  const edgeArr = [];
  Object.entries(graph).forEach(([from, d]) => {
    d.deps.forEach(to => {
      edgeArr.push({ id: `${from}-${to}`, from, to, arrows: 'to', color: { color: '#aaa', highlight: '#1a3a6c' }, width: 1.5 });
    });
  });
  edges.clear();
  edges.add(edgeArr);
}

function initNetwork() {
  buildNodes();
  const container = document.getElementById('network');
  const options = {
    layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 130, nodeSpacing: 80 } },
    physics: { enabled: false },
    interaction: { hover: true, tooltipDelay: 100 },
    nodes: { borderWidth: 2, shadow: { enabled: true, size: 4 } },
    edges: { smooth: { type: 'cubicBezier' } }
  };
  network = new vis.Network(container, { nodes, edges }, options);
}

function resetVisualization() {
  if (animTimer) { clearTimeout(animTimer); animTimer = null; }
  traversalState = { visited: {}, hopMap: {} };
  currentHop = 0;
  buildNodes();
  updateStats();
  updateSQL(0);
}

function bfsHops(root, maxHop) {
  const levels = [[root]];
  const visited = new Set([root]);
  for (let h = 0; h < maxHop; h++) {
    const next = [];
    levels[h].forEach(nodeId => {
      (graph[nodeId]?.deps || []).forEach(dep => {
        if (!visited.has(dep)) { visited.add(dep); next.push(dep); }
      });
    });
    if (next.length === 0) break;
    levels.push(next);
  }
  return levels;
}

function colorByHop(hopLevels, upToHop) {
  // Reset all to unvisited
  nodes.update(Object.keys(graph).map(id => ({
    id,
    color: { background: '#bdc3c7', border: '#95a5a6' },
    font: { color: '#333', size: 12 }
  })));
  edges.update(edges.get().map(e => ({ id: e.id, color: { color: '#aaa' }, width: 1.5 })));

  for (let h = 0; h <= upToHop && h < hopLevels.length; h++) {
    hopLevels[h].forEach(nodeId => {
      const bg = getHopColor(h);
      nodes.update({ id: nodeId, color: { background: bg, border: '#333', highlight: { background: bg } }, font: { color: getHopFont(h), size: 12 } });
    });
  }

  // Highlight traversed edges
  for (let h = 0; h < upToHop && h < hopLevels.length - 1; h++) {
    hopLevels[h].forEach(from => {
      (graph[from]?.deps || []).forEach(to => {
        const edgeId = `${from}-${to}`;
        if (edges.get(edgeId)) {
          edges.update({ id: edgeId, color: { color: '#1a3a6c' }, width: 3 });
        }
      });
    });
  }
}

function estimateRows(hop) {
  const fanOut = 2.5;
  return Math.round(Math.pow(fanOut, hop) * 3);
}

function estimateTime(hop) {
  if (hop === 0) return '< 1ms';
  const ms = Math.round(Math.pow(3.5, hop) * 15);
  return ms >= 1000 ? (ms / 1000).toFixed(1) + 's' : ms + 'ms';
}

function updateStats() {
  const hopLevels = bfsHops(rootNode, hopLimit);
  let totalDiscovered = 0;
  for (let h = 0; h <= currentHop && h < hopLevels.length; h++) {
    totalDiscovered += hopLevels[h].length;
  }
  document.getElementById('s-hop').textContent = currentHop === 0 ? '0 (root only)' : currentHop;
  document.getElementById('s-apps').textContent = totalDiscovered;
  document.getElementById('s-rows').textContent = estimateRows(currentHop);
  document.getElementById('s-joins').textContent = currentHop;
  document.getElementById('s-time').textContent = estimateTime(currentHop);
}

const sqlTemplates = [
  `SELECT a.*\nFROM app a\nWHERE a.id = '${rootNode}'`,
  `SELECT a2.*\nFROM app a\nJOIN dep d1 ON a.id = d1.from\nJOIN app a2 ON d1.to = a2.id\nWHERE a.id = '${rootNode}'`,
  `SELECT a3.*\nFROM app a\nJOIN dep d1 ON a.id = d1.from\nJOIN app a2 ON d1.to = a2.id\nJOIN dep d2 ON a2.id = d2.from\nJOIN app a3 ON d2.to = a3.id\nWHERE a.id = '${rootNode}'`,
  `SELECT a4.*\nFROM app a\nJOIN dep d1 ON a.id = d1.from\nJOIN app a2 ON d1.to = a2.id\nJOIN dep d2 ON a2.id = d2.from\nJOIN app a3 ON d2.to = a3.id\nJOIN dep d3 ON a3.id = d3.from\nJOIN app a4 ON d3.to = a4.id\nWHERE a.id = '${rootNode}'`
];

function updateSQL(hop) {
  const box = document.getElementById('sql-box');
  const template = sqlTemplates[Math.min(hop, sqlTemplates.length - 1)];
  box.textContent = template.replace(/customer_portal/g, rootNode.replace(/_/g, '-'));
}

function traverseAll() {
  if (animTimer) clearTimeout(animTimer);
  currentHop = 0;
  const hopLevels = bfsHops(rootNode, hopLimit);
  resetVisualization();

  function stepHop(h) {
    if (h >= Math.min(hopLimit + 1, hopLevels.length)) return;
    currentHop = h;
    colorByHop(hopLevels, h);
    updateStats();
    updateSQL(h);
    animTimer = setTimeout(() => stepHop(h + 1), 700);
  }
  stepHop(0);
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  initNetwork();
  resetVisualization();

  document.getElementById('root-select').addEventListener('change', e => {
    rootNode = e.target.value;
    resetVisualization();
  });

  document.getElementById('hop-slider').addEventListener('input', e => {
    hopLimit = parseInt(e.target.value);
    document.getElementById('hop-display').textContent = `Hop limit: ${hopLimit}`;
    resetVisualization();
  });

  document.getElementById('traverse-btn').addEventListener('click', traverseAll);
  document.getElementById('reset-btn').addEventListener('click', resetVisualization);
});
