// IT Asset Hierarchy Infographic
// CANVAS_HEIGHT: 580
// vis-network hierarchical tree with click-to-expand/collapse

const ALL_NODES = [
  // Root
  { id: 'root',       label: 'IT Assets',         group: 'root',    level: 0, title: 'All technology resources owned or managed by the organization' },

  // Layer 1: Major categories
  { id: 'hw',         label: 'Hardware',           group: 'hw',      level: 1, title: 'Physical devices and equipment', children: ['servers','network','endpoints','storage'] },
  { id: 'sw',         label: 'Software',           group: 'sw',      level: 1, title: 'Applications, licenses, and SaaS subscriptions', children: ['apps','os','saas','db'] },
  { id: 'cloud',      label: 'Cloud &\nServices',  group: 'cloud',   level: 1, title: 'Cloud infrastructure and managed services', children: ['iaas','paas','cdn','managed'] },

  // Hardware children
  { id: 'servers',    label: 'Servers',            group: 'hw',      level: 2, title: 'Physical and blade servers, rack-mounted compute' },
  { id: 'network',    label: 'Network\nDevices',   group: 'hw',      level: 2, title: 'Routers, switches, firewalls, load balancers' },
  { id: 'endpoints',  label: 'Endpoints',          group: 'hw',      level: 2, title: 'Laptops, desktops, mobile devices, tablets' },
  { id: 'storage',    label: 'Storage\nSystems',   group: 'hw',      level: 2, title: 'SAN, NAS, tape libraries, disk arrays' },

  // Software children
  { id: 'apps',       label: 'Applications',       group: 'sw',      level: 2, title: 'Business apps: ERP, CRM, HR systems' },
  { id: 'os',         label: 'Operating\nSystems', group: 'sw',      level: 2, title: 'Windows Server, RHEL, Ubuntu, macOS' },
  { id: 'saas',       label: 'SaaS',               group: 'sw',      level: 2, title: 'Microsoft 365, Salesforce, ServiceNow, Workday' },
  { id: 'db',         label: 'Databases',          group: 'sw',      level: 2, title: 'Oracle, SQL Server, PostgreSQL, MongoDB, Neo4j' },

  // Cloud children
  { id: 'iaas',       label: 'IaaS\nCompute',      group: 'cloud',   level: 2, title: 'AWS EC2, Azure VMs, GCP Compute Engine' },
  { id: 'paas',       label: 'PaaS\nPlatforms',    group: 'cloud',   level: 2, title: 'Kubernetes, App Engine, Azure App Service' },
  { id: 'cdn',        label: 'CDN &\nEdge',        group: 'cloud',   level: 2, title: 'CloudFront, Fastly, Akamai edge networks' },
  { id: 'managed',    label: 'Managed\nServices',  group: 'cloud',   level: 2, title: 'RDS, Cosmos DB, managed Kafka, Redis Cloud' },
];

const ALL_EDGES = [
  { from: 'root', to: 'hw' }, { from: 'root', to: 'sw' }, { from: 'root', to: 'cloud' },
  { from: 'hw', to: 'servers' }, { from: 'hw', to: 'network' }, { from: 'hw', to: 'endpoints' }, { from: 'hw', to: 'storage' },
  { from: 'sw', to: 'apps' }, { from: 'sw', to: 'os' }, { from: 'sw', to: 'saas' }, { from: 'sw', to: 'db' },
  { from: 'cloud', to: 'iaas' }, { from: 'cloud', to: 'paas' }, { from: 'cloud', to: 'cdn' }, { from: 'cloud', to: 'managed' },
];

const COLORS = {
  root:  { background: '#fff3cd', border: '#ffc107' },
  hw:    { background: '#cfe2ff', border: '#0d6efd' },
  sw:    { background: '#d1e7dd', border: '#198754' },
  cloud: { background: '#e2cfff', border: '#6f42c1' },
};

let network, nodes, edges;
const collapsed = new Set(); // tracks collapsed L1 nodes

window.addEventListener('load', () => {
  const nodeData = ALL_NODES.map(n => ({
    id: n.id, label: n.label, group: n.group, level: n.level,
    color: COLORS[n.group],
    font: { size: 13, bold: n.level === 0 },
    shape: n.level === 0 ? 'ellipse' : 'box',
    title: n.title + (n.children ? '<br><i>Click to collapse/expand</i>' : ''),
    borderWidth: n.level === 0 ? 3 : 2,
    size: n.level === 0 ? 30 : 20,
  }));
  const edgeData = ALL_EDGES.map((e, i) => ({ id: i, from: e.from, to: e.to, arrows: 'to', color: { color: '#999' }, smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.3 } }));

  nodes = new vis.DataSet(nodeData);
  edges = new vis.DataSet(edgeData);

  const container = document.getElementById('tree-net');
  network = new vis.Network(container, { nodes, edges }, {
    layout: { hierarchical: { enabled: true, direction: 'UD', sortMethod: 'directed', levelSeparation: 100, nodeSpacing: 130 } },
    physics: { enabled: false },
    interaction: { hover: true, tooltipDelay: 200 },
    nodes: { margin: 8 },
    edges: { width: 1.5 },
  });

  network.on('click', params => {
    if (params.nodes.length === 0) return;
    const nodeId = params.nodes[0];
    const nd = ALL_NODES.find(n => n.id === nodeId);
    if (!nd || !nd.children) return;
    toggleCollapse(nodeId, nd.children);
  });

  buildLegend();
});

function toggleCollapse(parentId, children) {
  if (collapsed.has(parentId)) {
    // Expand: add children edges
    collapsed.delete(parentId);
    children.forEach(c => {
      const nd = ALL_NODES.find(n => n.id === c);
      if (!nodes.get(c)) nodes.add([{ id: c, label: nd.label, group: nd.group, level: nd.level, color: COLORS[nd.group], font: { size: 13 }, shape: 'box', title: nd.title, borderWidth: 2 }]);
    });
    ALL_EDGES.filter(e => e.from === parentId).forEach((e, i) => {
      if (!edges.get('e-' + e.from + '-' + e.to)) {
        edges.add([{ id: 'e-' + e.from + '-' + e.to, from: e.from, to: e.to, arrows: 'to', color: { color: '#999' } }]);
      }
    });
  } else {
    // Collapse: remove children and their edges
    collapsed.add(parentId);
    children.forEach(c => {
      edges.remove(edges.get().filter(e => e.from === parentId && e.to === c).map(e => e.id));
      nodes.remove(c);
    });
  }
}

function buildLegend() {
  const legend = document.getElementById('legend');
  const items = [
    { label: 'Root', color: COLORS.root },
    { label: 'Hardware', color: COLORS.hw },
    { label: 'Software', color: COLORS.sw },
    { label: 'Cloud & Services', color: COLORS.cloud },
  ];
  items.forEach(item => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:12px;';
    d.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${item.color.background};border:2px solid ${item.color.border}"></span>${item.label}`;
    legend.appendChild(d);
  });
}
