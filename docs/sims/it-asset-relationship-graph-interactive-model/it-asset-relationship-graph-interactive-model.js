// IT Asset Relationship Graph Interactive Model
// CANVAS_HEIGHT: 580
// vis-network with node type filter checkboxes and relationship highlighting

const RAW_NODES = [
  // Business Services
  { id: 'svc-crm',    label: 'CRM Service',         type: 'BusinessService', title: 'Customer Relationship Management — SLA: 99.9%' },
  { id: 'svc-pay',    label: 'Payment\nService',     type: 'BusinessService', title: 'Payment processing — SLA: 99.99%' },
  { id: 'svc-bi',     label: 'BI Dashboard',         type: 'BusinessService', title: 'Business Intelligence reporting — SLA: 99.5%' },

  // Applications
  { id: 'app-crm',    label: 'Salesforce\nApp',      type: 'Application', title: 'Salesforce CRM application layer' },
  { id: 'app-pay',    label: 'Payment\nAPI',         type: 'Application', title: 'REST API for payment processing' },
  { id: 'app-etl',    label: 'ETL\nPipeline',        type: 'Application', title: 'Data extraction, transformation, loading' },
  { id: 'app-web',    label: 'Web\nFrontend',        type: 'Application', title: 'React-based web portal' },

  // Databases
  { id: 'db-crm',     label: 'CRM\nDatabase',        type: 'Database', title: 'PostgreSQL — customer records, opportunities' },
  { id: 'db-pay',     label: 'Transactions\nDB',     type: 'Database', title: 'Oracle — financial transaction ledger' },
  { id: 'db-dw',      label: 'Data\nWarehouse',      type: 'Database', title: 'Snowflake — analytics data warehouse' },

  // Servers
  { id: 'srv-app1',   label: 'App Server\n1',         type: 'Server', title: 'Dell PowerEdge — 32 vCPUs, 128GB RAM' },
  { id: 'srv-app2',   label: 'App Server\n2',         type: 'Server', title: 'Dell PowerEdge — 32 vCPUs, 128GB RAM' },
  { id: 'srv-db1',    label: 'DB Server\n1',          type: 'Server', title: 'HPE ProLiant — 64 vCPUs, 512GB RAM, SSD' },

  // Network
  { id: 'net-fw',     label: 'Firewall',             type: 'NetworkDevice', title: 'Palo Alto PA-5250 — perimeter security' },
  { id: 'net-lb',     label: 'Load\nBalancer',       type: 'NetworkDevice', title: 'F5 BIG-IP — HTTP/S traffic distribution' },
];

const RAW_EDGES = [
  { from: 'svc-crm',  to: 'app-crm',  label: 'RUNS_ON' },
  { from: 'svc-pay',  to: 'app-pay',  label: 'RUNS_ON' },
  { from: 'svc-bi',   to: 'app-etl',  label: 'RUNS_ON' },
  { from: 'app-crm',  to: 'db-crm',   label: 'DEPENDS_ON' },
  { from: 'app-pay',  to: 'db-pay',   label: 'DEPENDS_ON' },
  { from: 'app-etl',  to: 'db-crm',   label: 'READS' },
  { from: 'app-etl',  to: 'db-pay',   label: 'READS' },
  { from: 'app-etl',  to: 'db-dw',    label: 'WRITES' },
  { from: 'app-web',  to: 'app-crm',  label: 'CALLS' },
  { from: 'app-web',  to: 'app-pay',  label: 'CALLS' },
  { from: 'app-crm',  to: 'srv-app1', label: 'HOSTS' },
  { from: 'app-pay',  to: 'srv-app2', label: 'HOSTS' },
  { from: 'db-crm',   to: 'srv-db1',  label: 'HOSTS' },
  { from: 'db-pay',   to: 'srv-db1',  label: 'HOSTS' },
  { from: 'net-lb',   to: 'srv-app1', label: 'CONNECTS_TO' },
  { from: 'net-lb',   to: 'srv-app2', label: 'CONNECTS_TO' },
  { from: 'net-fw',   to: 'net-lb',   label: 'CONNECTS_TO' },
];

const TYPE_COLORS = {
  BusinessService: { background: '#fce4ec', border: '#e91e63' },
  Application:     { background: '#e3f2fd', border: '#1976d2' },
  Database:        { background: '#e8f5e9', border: '#388e3c' },
  Server:          { background: '#fff3e0', border: '#f57c00' },
  NetworkDevice:   { background: '#ede7f6', border: '#7b1fa2' },
};

let network, allNodes, allEdges;
const visibleTypes = new Set(Object.keys(TYPE_COLORS));

window.addEventListener('load', () => {
  allNodes = new vis.DataSet(RAW_NODES.map(n => ({
    id: n.id, label: n.label, group: n.type,
    color: TYPE_COLORS[n.type],
    font: { size: 12 },
    shape: shapeFor(n.type),
    borderWidth: 2,
    title: `<b>${n.type}</b><br>${n.title}`,
  })));

  allEdges = new vis.DataSet(RAW_EDGES.map((e, i) => ({
    id: i, from: e.from, to: e.to, label: e.label,
    arrows: 'to',
    font: { size: 10, align: 'middle', background: '#f8f9fa' },
    color: { color: '#888' },
    smooth: { type: 'dynamic' },
  })));

  const container = document.getElementById('rel-net');
  network = new vis.Network(container, { nodes: allNodes, edges: allEdges }, {
    physics: { solver: 'forceAtlas2Based', stabilization: { iterations: 150 } },
    interaction: { hover: true, tooltipDelay: 200 },
    nodes: { margin: 8 },
    edges: { width: 1.5 },
  });

  network.on('click', params => {
    if (params.nodes.length > 0) highlightNode(params.nodes[0]);
    else resetHighlight();
  });

  // Build filter checkboxes
  const filterDiv = document.getElementById('filters');
  Object.keys(TYPE_COLORS).forEach(type => {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer;';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = true; cb.value = type;
    cb.addEventListener('change', applyFilter);
    const dot = document.createElement('span');
    dot.style.cssText = `display:inline-block;width:12px;height:12px;border-radius:3px;background:${TYPE_COLORS[type].background};border:2px solid ${TYPE_COLORS[type].border};`;
    label.appendChild(cb); label.appendChild(dot);
    label.appendChild(document.createTextNode(' ' + type));
    filterDiv.appendChild(label);
  });
});

function shapeFor(type) {
  return { BusinessService: 'ellipse', Application: 'box', Database: 'database', Server: 'square', NetworkDevice: 'diamond' }[type] || 'dot';
}

function applyFilter() {
  visibleTypes.clear();
  document.querySelectorAll('#filters input[type=checkbox]').forEach(cb => {
    if (cb.checked) visibleTypes.add(cb.value);
  });
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, hidden: !visibleTypes.has(n.type) })));
  // Hide edges where either endpoint is hidden
  allEdges.update(RAW_EDGES.map((e, i) => {
    const fromNode = RAW_NODES.find(n => n.id === e.from);
    const toNode = RAW_NODES.find(n => n.id === e.to);
    return { id: i, hidden: !visibleTypes.has(fromNode.type) || !visibleTypes.has(toNode.type) };
  }));
}

function highlightNode(nodeId) {
  const connected = new Set([nodeId]);
  const connectedEdges = new Set();
  RAW_EDGES.forEach((e, i) => {
    if (e.from === nodeId || e.to === nodeId) { connected.add(e.from); connected.add(e.to); connectedEdges.add(i); }
  });
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, opacity: connected.has(n.id) ? 1 : 0.25 })));
  allEdges.update(RAW_EDGES.map((e, i) => ({ id: i, color: { color: connectedEdges.has(i) ? '#0d6efd' : '#ddd' }, width: connectedEdges.has(i) ? 2.5 : 1 })));
  const nd = RAW_NODES.find(n => n.id === nodeId);
  document.getElementById('detail').innerHTML = `<b>${nd.label.replace('\n',' ')}</b> (${nd.type})<br>${nd.title}`;
}

function resetHighlight() {
  allNodes.update(RAW_NODES.map(n => ({ id: n.id, opacity: 1 })));
  allEdges.update(RAW_EDGES.map((e, i) => ({ id: i, color: { color: '#888' }, width: 1.5 })));
  document.getElementById('detail').textContent = 'Click a node to see details and highlight relationships.';
}
