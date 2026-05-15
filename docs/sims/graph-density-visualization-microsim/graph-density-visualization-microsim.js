// Graph Density Visualization MicroSim
// CANVAS_HEIGHT: 600
// Uses vis-network for graph rendering with density/traversal controls

const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([]);
let network = null;
let numNodes = 30;
let density = 5;
let animSpeed = 600;
let startNode = null;
let traversalRunning = false;
let bfsResult = {};

function initNetwork() {
  const container = document.getElementById('graph-container');
  const data = { nodes, edges };
  const options = {
    physics: { solver: 'repulsion', repulsion: { nodeDistance: 100 } },
    nodes: { shape: 'dot', size: 12, color: { background: '#adb5bd', border: '#6c757d' }, font: { size: 11 } },
    edges: { arrows: 'to', color: { color: '#adb5bd' }, width: 1 },
    interaction: { hover: true, tooltipDelay: 200 },
    layout: { improvedLayout: false }
  };
  network = new vis.Network(container, data, options);
  network.on('click', params => {
    if (params.nodes.length > 0 && !traversalRunning) {
      startNode = params.nodes[0];
      highlightStart();
      setStatus(`Node ${startNode} selected as start. Click "Start BFS Traversal".`);
    }
  });
}

function generateGraph() {
  if (traversalRunning) return;
  nodes.clear(); edges.clear();
  bfsResult = {};

  const nodeList = [];
  for (let i = 1; i <= numNodes; i++) {
    nodeList.push({ id: i, label: String(i), color: { background: '#adb5bd', border: '#6c757d' } });
  }
  nodes.add(nodeList);

  const maxEdges = Math.floor(numNodes * (numNodes - 1) / 2);
  const targetEdges = Math.min(Math.floor(density / 100 * maxEdges), maxEdges);
  const pairs = [];
  for (let a = 1; a <= numNodes; a++)
    for (let b = a + 1; b <= numNodes; b++)
      pairs.push([a, b]);

  // Fisher-Yates shuffle then take first targetEdges
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  const edgeList = pairs.slice(0, targetEdges).map((p, idx) => ({
    id: idx, from: p[0], to: p[1]
  }));
  edges.add(edgeList);

  startNode = Math.floor(Math.random() * numNodes) + 1;
  highlightStart();
  updateStats();
  setStatus(`Graph generated: ${numNodes} nodes, ${targetEdges} edges. Click a node to choose start, or click "Start BFS Traversal".`);
  document.getElementById('btn-traverse').disabled = false;
  document.getElementById('btn-reset').disabled = false;
}

function highlightStart() {
  if (startNode === null) return;
  const updates = [];
  nodes.forEach(n => {
    updates.push({ id: n.id, color: n.id === startNode
      ? { background: '#28a745', border: '#155724' }
      : { background: '#adb5bd', border: '#6c757d' } });
  });
  nodes.update(updates);
}

function resetColors() {
  if (traversalRunning) return;
  bfsResult = {};
  highlightStart();
  edges.update(edges.get().map(e => ({ id: e.id, color: { color: '#adb5bd' }, width: 1 })));
  setStatus('Colors reset. Ready for traversal.');
}

async function startBFS() {
  if (traversalRunning || nodes.length === 0) return;
  if (startNode === null) startNode = 1;
  traversalRunning = true;
  document.getElementById('btn-traverse').disabled = true;
  document.getElementById('btn-generate').disabled = true;

  // Build adjacency
  const adj = {};
  nodes.forEach(n => adj[n.id] = []);
  edges.forEach(e => { adj[e.from].push(e.to); adj[e.to].push(e.from); });

  const dist = {}; dist[startNode] = 0;
  const queue = [startNode];
  const hopColors = ['#28a745', '#90ee90', '#ffc107', '#fd7e14', '#dc3545'];

  nodes.update(nodes.get().map(n => ({
    id: n.id,
    color: n.id === startNode ? { background: '#28a745', border: '#155724' } : { background: '#e9ecef', border: '#dee2e6' }
  })));

  while (queue.length > 0) {
    const current = queue.shift();
    const d = dist[current];
    for (const neighbor of adj[current]) {
      if (dist[neighbor] === undefined) {
        dist[neighbor] = d + 1;
        queue.push(neighbor);
        const hopIdx = Math.min(d + 1, hopColors.length - 1);
        nodes.update([{ id: neighbor, color: { background: hopColors[hopIdx], border: '#333' } }]);
        // highlight edge
        edges.forEach(e => {
          if ((e.from === current && e.to === neighbor) || (e.to === current && e.from === neighbor)) {
            edges.update([{ id: e.id, color: { color: '#0066cc' }, width: 2.5 }]);
          }
        });
        await sleep(animSpeed / (adj[current].length + 1) + 50);
      }
    }
    await sleep(Math.max(30, animSpeed / 5));
  }

  bfsResult = dist;
  const reachable = Object.keys(dist).length;
  updateStats(reachable);
  setStatus(`BFS complete! Reached ${reachable} of ${numNodes} nodes (${Math.round(reachable/numNodes*100)}%).`);
  traversalRunning = false;
  document.getElementById('btn-traverse').disabled = false;
  document.getElementById('btn-generate').disabled = false;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function updateStats(reachable) {
  const n = numNodes;
  const e = edges.length;
  const maxE = n * (n - 1) / 2;
  const actualDensity = maxE > 0 ? (e / maxE * 100).toFixed(2) : '0.00';
  const avgDeg = n > 0 ? (2 * e / n).toFixed(1) : '0';
  document.getElementById('stat-nodes').textContent = n;
  document.getElementById('stat-edges').textContent = e;
  document.getElementById('stat-density').textContent = actualDensity + '%';
  document.getElementById('stat-max-edges').textContent = maxE;
  document.getElementById('stat-avg-degree').textContent = avgDeg;
  if (reachable !== undefined) {
    document.getElementById('stat-reachable').textContent = `${reachable} (${Math.round(reachable/n*100)}%)`;
  } else {
    document.getElementById('stat-reachable').textContent = '—';
  }
}

function setStatus(msg) {
  document.getElementById('status-msg').textContent = msg;
}

function updateDensityColor() {
  const d = parseInt(document.getElementById('slider-density').value);
  const indicator = document.getElementById('density-indicator');
  if (d <= 10) indicator.style.background = '#28a745';
  else if (d <= 25) indicator.style.background = '#ffc107';
  else indicator.style.background = '#dc3545';
  document.getElementById('density-val').textContent = d + '%';
  const warn = document.getElementById('density-warn');
  warn.style.display = d > 20 ? 'block' : 'none';
}

window.addEventListener('load', () => {
  initNetwork();

  document.getElementById('slider-nodes').addEventListener('input', function() {
    numNodes = parseInt(this.value);
    document.getElementById('nodes-val').textContent = numNodes;
  });
  document.getElementById('slider-density').addEventListener('input', function() {
    density = parseInt(this.value);
    updateDensityColor();
  });
  document.getElementById('slider-speed').addEventListener('input', function() {
    animSpeed = parseInt(this.value);
    document.getElementById('speed-val').textContent = animSpeed + 'ms';
  });
  document.getElementById('btn-generate').addEventListener('click', generateGraph);
  document.getElementById('btn-traverse').addEventListener('click', startBFS);
  document.getElementById('btn-reset').addEventListener('click', resetColors);

  updateStats();
  setStatus('Adjust sliders and click "Generate Graph" to begin.');
});
