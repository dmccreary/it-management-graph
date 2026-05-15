// IT Infrastructure Nodes Interactive Visualization
// CANVAS_HEIGHT: 580
// vis-network: IT node types with properties panel on click

const TYPE_CONFIG = {
  BusinessService: { background: '#fce4ec', border: '#e91e63', shape: 'ellipse',        size: 28, label: ':BusinessService' },
  Application:     { background: '#e3f2fd', border: '#1976d2', shape: 'box',            size: 22, label: ':Application' },
  Database:        { background: '#fff3e0', border: '#f57c00', shape: 'database',       size: 22, label: ':Database' },
  Server:          { background: '#e8f5e9', border: '#388e3c', shape: 'square',         size: 20, label: ':Server' },
  Location:        { background: '#e8f5e9', border: '#00796b', shape: 'triangle',       size: 18, label: ':Location' },
  Team:            { background: '#ede7f6', border: '#7b1fa2', shape: 'hexagon',        size: 18, label: ':Team' },
  NetworkDevice:   { background: '#f3e5f5', border: '#8e24aa', shape: 'diamond',        size: 20, label: ':NetworkDevice' },
};

const NODES_DATA = [
  {
    id: 1, type: 'BusinessService', label: 'Online Banking\nPortal',
    properties: { name: 'Online Banking Portal', SLA_tier: 'Tier 1', business_owner: 'Jane Smith', revenue_impact: '$45M/yr' },
    cypher: 'CREATE (n:BusinessService {name: "Online Banking Portal", SLA_tier: "Tier 1", business_owner: "Jane Smith", revenue_impact_annual: 45000000})',
  },
  {
    id: 2, type: 'Application', label: 'Customer API\nv2.3',
    properties: { name: 'Customer API', version: '2.3', language: 'Java', env: 'Production', health: 'Healthy' },
    cypher: 'CREATE (n:Application {name: "Customer API", version: "2.3", language: "Java", deployment_env: "Production", health_status: "Healthy"})',
  },
  {
    id: 3, type: 'Application', label: 'Auth Service\nv1.8',
    properties: { name: 'Auth Service', version: '1.8', language: 'Go', env: 'Production', health: 'Healthy' },
    cypher: 'CREATE (n:Application {name: "Auth Service", version: "1.8", language: "Go", deployment_env: "Production", health_status: "Healthy"})',
  },
  {
    id: 4, type: 'Database', label: 'CustomerDB',
    properties: { name: 'CustomerDB', db_type: 'PostgreSQL 15', size_gb: '2,400 GB', backup: 'Daily', last_backup: '2h ago' },
    cypher: 'CREATE (n:Database {name: "CustomerDB", db_type: "PostgreSQL", size_gb: 2400, backup_frequency: "Daily"})',
  },
  {
    id: 5, type: 'Database', label: 'SessionStore',
    properties: { name: 'SessionStore', db_type: 'Redis 7', size_gb: '32 GB', backup: 'Hourly', last_backup: '45min ago' },
    cypher: 'CREATE (n:Database {name: "SessionStore", db_type: "Redis", size_gb: 32, backup_frequency: "Hourly"})',
  },
  {
    id: 6, type: 'Server', label: 'web-prod-01',
    properties: { hostname: 'web-prod-01', ip: '10.0.1.50', os: 'Ubuntu 22.04', cpu: '16 cores', ram: '64 GB', status: 'Running' },
    cypher: 'CREATE (n:Server {hostname: "web-prod-01", ip_address: "10.0.1.50", os: "Ubuntu 22.04", cpu_cores: 16, ram_gb: 64, status: "Running"})',
  },
  {
    id: 7, type: 'Server', label: 'db-prod-01',
    properties: { hostname: 'db-prod-01', ip: '10.0.2.10', os: 'RHEL 9', cpu: '64 cores', ram: '512 GB', status: 'Running' },
    cypher: 'CREATE (n:Server {hostname: "db-prod-01", ip_address: "10.0.2.10", os: "RHEL 9", cpu_cores: 64, ram_gb: 512, status: "Running"})',
  },
  {
    id: 8, type: 'Location', label: 'DC-EAST-1',
    properties: { name: 'DC-EAST-1', city: 'New York', region: 'US-EAST', facility: 'Tier 3', power: 'N+1' },
    cypher: 'CREATE (n:Location {name: "DC-EAST-1", city: "New York", region: "US-EAST", facility_type: "Tier 3", power_redundancy: "N+1"})',
  },
  {
    id: 9, type: 'Team', label: 'Platform\nEngineering',
    properties: { name: 'Platform Engineering', dept: 'Engineering', lead: 'Alex Johnson', on_call: '24/7' },
    cypher: 'CREATE (n:Team {name: "Platform Engineering", department: "Engineering", team_lead: "Alex Johnson", on_call_rotation: "24/7"})',
  },
  {
    id: 10, type: 'NetworkDevice', label: 'Core Switch\nNYC-01',
    properties: { name: 'NYC-01', model: 'Cisco Catalyst 9500', speed: '100GbE', vlans: '24', status: 'Active' },
    cypher: 'CREATE (n:NetworkDevice {name: "NYC-01", model: "Cisco Catalyst 9500", speed: "100GbE", status: "Active"})',
  },
];

let network, nodes;

window.addEventListener('load', () => {
  nodes = new vis.DataSet(NODES_DATA.map(n => {
    const tc = TYPE_CONFIG[n.type];
    return {
      id: n.id, label: n.label,
      color: { background: tc.background, border: tc.border },
      shape: tc.shape, size: tc.size,
      font: { size: 12, bold: true },
      borderWidth: 2.5,
      title: `<b>${tc.label}</b><br>${Object.entries(n.properties).map(([k,v]) => `${k}: ${v}`).join('<br>')}`,
    };
  }));

  const container = document.getElementById('nodes-net');
  network = new vis.Network(container, { nodes, edges: new vis.DataSet([]) }, {
    physics: { solver: 'repulsion', repulsion: { nodeDistance: 140 }, stabilization: { iterations: 100 } },
    interaction: { hover: true, tooltipDelay: 150 },
  });

  network.on('click', params => {
    if (params.nodes.length > 0) showProps(params.nodes[0]);
    else clearProps();
  });

  // Build type legend / filter
  const legend = document.getElementById('type-legend');
  Object.entries(TYPE_CONFIG).forEach(([type, cfg]) => {
    const row = document.createElement('label');
    row.style.cssText = 'display:flex;align-items:center;gap:5px;font-size:11px;cursor:pointer;';
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = true; cb.value = type;
    cb.addEventListener('change', applyFilter);
    const dot = document.createElement('span');
    dot.style.cssText = `width:12px;height:12px;border-radius:3px;background:${cfg.background};border:2px solid ${cfg.border};flex-shrink:0;`;
    row.appendChild(cb); row.appendChild(dot);
    row.appendChild(document.createTextNode(` ${type}`));
    legend.appendChild(row);
  });
});

function showProps(nodeId) {
  const nd = NODES_DATA.find(n => n.id === nodeId);
  if (!nd) return;
  const tc = TYPE_CONFIG[nd.type];
  const propsHtml = Object.entries(nd.properties)
    .map(([k, v]) => `<div class="prop-row"><span class="prop-key">${k}</span><span class="prop-val">${v}</span></div>`)
    .join('');
  document.getElementById('prop-panel').innerHTML = `
    <div class="prop-header" style="border-left:4px solid ${tc.border};padding-left:8px;margin-bottom:8px;">
      <div style="font-size:11px;color:#888;font-family:monospace">${tc.label}</div>
      <div style="font-size:14px;font-weight:700">${nd.label.replace('\n', ' ')}</div>
    </div>
    <div style="margin-bottom:8px">${propsHtml}</div>
    <div class="cypher-box">${nd.cypher}</div>
  `;
  // Highlight selected node
  nodes.update(NODES_DATA.map(n => ({ id: n.id, borderWidth: n.id === nodeId ? 4 : 2 })));
}

function clearProps() {
  nodes.update(NODES_DATA.map(n => ({ id: n.id, borderWidth: 2 })));
  document.getElementById('prop-panel').innerHTML = '<span style="color:#888;font-size:12px">Click any node to explore its properties and Cypher CREATE statement.</span>';
}

function applyFilter() {
  const active = new Set();
  document.querySelectorAll('#type-legend input').forEach(cb => { if (cb.checked) active.add(cb.value); });
  nodes.update(NODES_DATA.map(n => ({ id: n.id, hidden: !active.has(n.type) })));
}
