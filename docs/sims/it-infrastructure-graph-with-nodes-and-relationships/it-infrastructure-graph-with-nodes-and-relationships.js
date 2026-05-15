// IT Infrastructure Graph with Nodes and Relationships
// CANVAS_HEIGHT: 600
// vis-network: 22-node IT infrastructure with search, legend, and type highlighting

const TYPE_COLORS = {
  BusinessService: { background: '#fce4ec', border: '#e91e63', shape: 'ellipse' },
  Application:     { background: '#e3f2fd', border: '#1976d2', shape: 'box' },
  Database:        { background: '#e8f5e9', border: '#388e3c', shape: 'database' },
  Server:          { background: '#fff3e0', border: '#f57c00', shape: 'square' },
  NetworkDevice:   { background: '#ede7f6', border: '#7b1fa2', shape: 'diamond' },
  Cloud:           { background: '#e0f7fa', border: '#0097a7', shape: 'dot' },
  Storage:         { background: '#fafafa', border: '#616161', shape: 'triangleDown' },
};

const RAW_NODES = [
  { id:  1, label: 'Customer\nPortal',      type: 'BusinessService', title: 'External-facing web portal — SLA 99.9%' },
  { id:  2, label: 'ERP\nSystem',           type: 'BusinessService', title: 'SAP S/4HANA — core business processes' },
  { id:  3, label: 'HR\nPlatform',          type: 'BusinessService', title: 'Workday HRIS — employee records, payroll' },
  { id:  4, label: 'API\nGateway',          type: 'Application',     title: 'Kong API Gateway — rate limiting, auth, routing' },
  { id:  5, label: 'Auth\nService',         type: 'Application',     title: 'Okta SSO integration — OAuth 2.0 / SAML' },
  { id:  6, label: 'Web\nFrontend',         type: 'Application',     title: 'React SPA — served via CDN, 3MB bundle' },
  { id:  7, label: 'Billing\nService',      type: 'Application',     title: 'Microservice — Stripe integration, invoicing' },
  { id:  8, label: 'Notification\nService', type: 'Application',     title: 'Email/SMS notifications via SendGrid' },
  { id:  9, label: 'Customer\nDB',          type: 'Database',        title: 'PostgreSQL 15 — 2TB, 50M records, replicated' },
  { id: 10, label: 'Product\nDB',           type: 'Database',        title: 'MySQL 8 — product catalog, pricing, inventory' },
  { id: 11, label: 'Analytics\nWarehouse',  type: 'Database',        title: 'Snowflake — petabyte-scale analytics, BI reports' },
  { id: 12, label: 'Redis\nCache',          type: 'Database',        title: 'Redis 7 — session cache, rate limiting, 32GB' },
  { id: 13, label: 'App Server\n01',        type: 'Server',          title: 'Dell R750 — 32 vCPU, 256GB RAM, Ubuntu 22.04' },
  { id: 14, label: 'App Server\n02',        type: 'Server',          title: 'Dell R750 — 32 vCPU, 256GB RAM, Ubuntu 22.04' },
  { id: 15, label: 'DB Server\nPrimary',    type: 'Server',          title: 'HPE DL560 — 64 vCPU, 1TB RAM, NVMe SSD' },
  { id: 16, label: 'DB Server\nReplica',    type: 'Server',          title: 'HPE DL560 — standby replica, same spec' },
  { id: 17, label: 'Core\nSwitch',          type: 'NetworkDevice',   title: 'Cisco Catalyst 9500 — 100GbE backbone' },
  { id: 18, label: 'Load\nBalancer',        type: 'NetworkDevice',   title: 'F5 BIG-IP — L7 HTTP load balancing, SSL termination' },
  { id: 19, label: 'Firewall',              type: 'NetworkDevice',   title: 'Palo Alto PA-5280 — next-gen perimeter firewall' },
  { id: 20, label: 'AWS S3\nBucket',        type: 'Cloud',           title: 'Object storage — static assets, backups, logs' },
  { id: 21, label: 'CDN\nEdge',             type: 'Cloud',           title: 'CloudFront — global edge, 100ms p99 latency' },
  { id: 22, label: 'SAN\nStorage',          type: 'Storage',         title: 'NetApp AFF A800 — 500TB NVMe SAN, 99.9999% uptime' },
];

const RAW_EDGES = [
  { from:  1, to:  4, label: 'CALLS' },
  { from:  1, to:  6, label: 'SERVED_BY' },
  { from:  2, to:  9, label: 'DEPENDS_ON' },
  { from:  3, to:  9, label: 'DEPENDS_ON' },
  { from:  4, to:  5, label: 'AUTH_VIA' },
  { from:  4, to:  7, label: 'ROUTES_TO' },
  { from:  4, to:  8, label: 'ROUTES_TO' },
  { from:  5, to: 12, label: 'CACHES_IN' },
  { from:  6, to: 21, label: 'SERVED_BY' },
  { from:  7, to:  9, label: 'READS' },
  { from:  7, to: 10, label: 'READS' },
  { from:  8, to: 12, label: 'QUEUES_IN' },
  { from:  9, to: 15, label: 'HOSTED_ON' },
  { from:  9, to: 16, label: 'REPLICATED_TO' },
  { from: 10, to: 15, label: 'HOSTED_ON' },
  { from: 11, to: 20, label: 'STORES_IN' },
  { from: 13, to: 17, label: 'CONNECTS_TO' },
  { from: 14, to: 17, label: 'CONNECTS_TO' },
  { from: 15, to: 22, label: 'USES_STORAGE' },
  { from: 17, to: 18, label: 'UPLINKS_TO' },
  { from: 18, to: 19, label: 'UPLINKS_TO' },
  { from: 21, to:  6, label: 'CACHES' },
  { from:  4, to: 13, label: 'RUNS_ON' },
  { from:  4, to: 14, label: 'RUNS_ON' },
];

let allNodes, allEdges, network;
const activeTypes = new Set(Object.keys(TYPE_COLORS));
let searchTimeout = null;

window.addEventListener('load', () => {
  allNodes = new vis.DataSet(RAW_NODES.map(n => ({
    id: n.id, label: n.label, group: n.type,
    color: { background: TYPE_COLORS[n.type].background, border: TYPE_COLORS[n.type].border },
    shape: TYPE_COLORS[n.type].shape,
    font: { size: 11 }, borderWidth: 2,
    title: `<b>${n.type}</b>: ${n.label.replace('\n',' ')}<br>${n.title}`,
  })));

  allEdges = new vis.DataSet(RAW_EDGES.map((e, i) => ({
    id: i, from: e.from, to: e.to, label: e.label,
    arrows: 'to', font: { size: 9, align: 'middle', background: '#f8f9fa' },
    color: { color: '#aaa' }, smooth: { type: 'dynamic' },
  })));

  const container = document.getElementById('infra-net');
  network = new vis.Network(container, { nodes: allNodes, edges: allEdges }, {
    physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -60 }, stabilization: { iterations: 200 } },
    interaction: { hover: true, tooltipDelay: 200 },
    nodes: { margin: 6 }, edges: { width: 1.5 },
  });

  network.on('click', params => {
    if (params.nodes.length > 0) highlightNode(params.nodes[0]);
    else resetHighlight();
  });

  // Type filter checkboxes
  const legend = document.getElementById('legend');
  Object.keys(TYPE_COLORS).forEach(type => {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer;white-space:nowrap;';
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = true; cb.value = type;
    cb.addEventListener('change', applyFilter);
    const dot = document.createElement('span');
    dot.style.cssText = `display:inline-block;width:12px;height:12px;border-radius:3px;background:${TYPE_COLORS[type].background};border:2px solid ${TYPE_COLORS[type].border};flex-shrink:0;`;
    label.appendChild(cb); label.appendChild(dot);
    label.appendChild(document.createTextNode(' ' + type));
    legend.appendChild(label);
  });

  // Search
  document.getElementById('search').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => doSearch(this.value.trim().toLowerCase()), 250);
  });

  document.getElementById('btn-fit').addEventListener('click', () => { network.fit({ animation: true }); resetHighlight(); });
});

function applyFilter() {
  activeTypes.clear();
  document.querySelectorAll('#legend input[type=checkbox]').forEach(cb => { if (cb.checked) activeTypes.add(cb.value); });
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, hidden: !activeTypes.has(n.type) })));
  allEdges.update(RAW_EDGES.map((e, i) => {
    const fn = RAW_NODES.find(n => n.id === e.from);
    const tn = RAW_NODES.find(n => n.id === e.to);
    return { id: i, hidden: !activeTypes.has(fn.type) || !activeTypes.has(tn.type) };
  }));
}

function doSearch(q) {
  if (!q) { resetHighlight(); return; }
  const matches = new Set(RAW_NODES.filter(n => n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q)).map(n => n.id));
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, opacity: matches.has(n.id) ? 1 : 0.2 })));
  allEdges.update(RAW_EDGES.map((e, i) => ({ id: i, color: { color: (matches.has(e.from) && matches.has(e.to)) ? '#0d6efd' : '#ddd' } })));
}

function highlightNode(nodeId) {
  const connected = new Set([nodeId]);
  const connEdges = new Set();
  RAW_EDGES.forEach((e, i) => { if (e.from === nodeId || e.to === nodeId) { connected.add(e.from); connected.add(e.to); connEdges.add(i); } });
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, opacity: connected.has(n.id) ? 1 : 0.2 })));
  allEdges.update(RAW_EDGES.map((e, i) => ({ id: i, color: { color: connEdges.has(i) ? '#0d6efd' : '#ddd' }, width: connEdges.has(i) ? 2.5 : 1 })));
  const nd = RAW_NODES.find(n => n.id === nodeId);
  document.getElementById('info').innerHTML = `<b>${nd.label.replace('\n',' ')}</b> (${nd.type})<br>${nd.title}`;
}

function resetHighlight() {
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, opacity: 1 })));
  allEdges.update(RAW_EDGES.map((e, i) => ({ id: i, color: { color: '#aaa' }, width: 1.5 })));
  document.getElementById('info').textContent = 'Click a node to highlight its relationships.';
}
