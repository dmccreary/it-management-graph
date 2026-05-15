// Network vs Service Topology Comparison Chart
// CANVAS_HEIGHT: 580

// ---- PHYSICAL NETWORK TOPOLOGY ----
// Nodes: routers, switches, servers with physical connections
const physNodes = new vis.DataSet([
  { id: 'fw1', label: 'Firewall', group: 'router', title: 'Edge firewall — filters all inbound/outbound traffic' },
  { id: 'r1', label: 'Core Router', group: 'router', title: 'Core router — BGP peering, OSPF routing' },
  { id: 'sw1', label: 'Switch-1\n(Prod)', group: 'switch', title: 'Production VLAN switch — 48 ports, 10GbE uplinks' },
  { id: 'sw2', label: 'Switch-2\n(Dev)', group: 'switch', title: 'Dev/Test VLAN switch — isolated network segment' },
  { id: 'lb1', label: 'Load Balancer', group: 'lb', title: 'HAProxy load balancer — distributes web traffic' },
  { id: 'sv1', label: 'web-prod-01', group: 'server', title: 'Web server — Intel Xeon, 32GB RAM, SSD' },
  { id: 'sv2', label: 'web-prod-02', group: 'server', title: 'Web server — Intel Xeon, 32GB RAM, SSD' },
  { id: 'sv3', label: 'api-prod-01', group: 'server', title: 'API server — AMD EPYC, 64GB RAM, NVMe' },
  { id: 'sv4', label: 'db-prod-01', group: 'server', title: 'Database primary — AMD EPYC, 128GB RAM, NVMe RAID' },
  { id: 'sv5', label: 'db-prod-02', group: 'server', title: 'Database replica — AMD EPYC, 128GB RAM, NVMe RAID' },
  { id: 'sv6', label: 'cache-01', group: 'server', title: 'Cache server — Intel Xeon, 64GB RAM (memory-optimized)' }
]);

const physEdges = new vis.DataSet([
  { from: 'fw1', to: 'r1', label: '10GbE', width: 3, color: { color: '#546E7A' } },
  { from: 'r1', to: 'sw1', label: '10GbE', width: 2.5, color: { color: '#546E7A' } },
  { from: 'r1', to: 'sw2', label: '1GbE', width: 1.5, color: { color: '#90A4AE' } },
  { from: 'sw1', to: 'lb1', label: '10GbE', width: 2.5, color: { color: '#546E7A' } },
  { from: 'sw1', to: 'sv3', label: '10GbE', width: 2, color: { color: '#546E7A' } },
  { from: 'sw1', to: 'sv4', label: '10GbE', width: 2, color: { color: '#546E7A' } },
  { from: 'sw1', to: 'sv5', label: '10GbE', width: 2, color: { color: '#546E7A' } },
  { from: 'sw1', to: 'sv6', label: '10GbE', width: 2, color: { color: '#546E7A' } },
  { from: 'lb1', to: 'sv1', label: '1GbE', width: 1.5 },
  { from: 'lb1', to: 'sv2', label: '1GbE', width: 1.5 },
  // Replication link
  { from: 'sv4', to: 'sv5', label: 'Replication', width: 1.5, dashes: [4, 4], color: { color: '#EF5350' } }
]);

// ---- LOGICAL SERVICE TOPOLOGY ----
// Same underlying servers, shown as services with dependencies
const logNodes = new vis.DataSet([
  { id: 'svc_web', label: 'Web Service', group: 'service', title: 'Handles HTTP/HTTPS requests — runs on web-prod-01/02\nInstances: 2 | Replicas: active-active' },
  { id: 'svc_api', label: 'API Service', group: 'service', title: 'REST API layer — runs on api-prod-01\nExposes: /api/v2/* endpoints' },
  { id: 'svc_auth', label: 'Auth Service', group: 'service', title: 'JWT token validation & session management\nCo-located on api-prod-01' },
  { id: 'svc_pay', label: 'Payment Service', group: 'service', title: 'Payment processing — PCI-DSS compliant\nRuns on api-prod-01 in isolated container' },
  { id: 'db_customer', label: 'CustomerDB', group: 'database', title: 'PostgreSQL — customer accounts & profiles\nPrimary: db-prod-01 | Replica: db-prod-02' },
  { id: 'db_orders', label: 'OrderDB', group: 'database', title: 'PostgreSQL — orders and transactions\nPrimary: db-prod-01 | Replica: db-prod-02' },
  { id: 'db_session', label: 'SessionStore', group: 'database', title: 'Redis — session tokens, short TTL\nRuns on: cache-01' },
  { id: 'svc_cache', label: 'Cache Layer', group: 'lb', title: 'Redis caching layer — reduces DB load by 60%\nRuns on cache-01' },
  { id: 'svc_lb', label: 'Load Balancer\nService', group: 'lb', title: 'HAProxy — round-robin to web instances\nHealth checks every 5s' }
]);

const logEdges = new vis.DataSet([
  { from: 'svc_lb', to: 'svc_web', label: 'routes', width: 2.5, color: { color: '#FFA726' } },
  { from: 'svc_web', to: 'svc_api', label: 'API calls', width: 2, color: { color: '#26A69A' } },
  { from: 'svc_api', to: 'svc_auth', label: 'validates', width: 1.5, color: { color: '#5C6BC0' } },
  { from: 'svc_api', to: 'svc_pay', label: 'delegates', width: 1.5, color: { color: '#5C6BC0' } },
  { from: 'svc_api', to: 'db_customer', label: 'reads/writes', width: 2, color: { color: '#26A69A' } },
  { from: 'svc_api', to: 'db_orders', label: 'reads/writes', width: 2, color: { color: '#26A69A' } },
  { from: 'svc_auth', to: 'db_session', label: 'stores tokens', width: 1.5, color: { color: '#EF5350' } },
  { from: 'svc_web', to: 'svc_cache', label: 'caches', width: 1.5, color: { color: '#FFA726' } },
  { from: 'svc_cache', to: 'db_customer', label: 'cache miss', width: 1, dashes: [3, 3], color: { color: '#90A4AE' } }
]);

const physGroups = {
  router: { color: { background: '#546E7A', border: '#263238' }, font: { color: '#fff', size: 11 }, shape: 'diamond' },
  switch: { color: { background: '#78909C', border: '#37474F' }, font: { color: '#fff', size: 11 }, shape: 'square' },
  server: { color: { background: '#5C6BC0', border: '#283593' }, font: { color: '#fff', size: 11 }, shape: 'dot' },
  lb: { color: { background: '#FFA726', border: '#E65100' }, font: { color: '#333', size: 11 }, shape: 'triangle' }
};

const logGroups = {
  service: { color: { background: '#26A69A', border: '#00695C' }, font: { color: '#fff', size: 11 }, shape: 'ellipse' },
  database: { color: { background: '#EF5350', border: '#B71C1C' }, font: { color: '#fff', size: 11 }, shape: 'cylinder' },
  lb: { color: { background: '#FFA726', border: '#E65100' }, font: { color: '#333', size: 11 }, shape: 'triangle' }
};

const commonOptions = {
  physics: {
    enabled: true,
    solver: 'repulsion',
    repulsion: { centralGravity: 0.3, springLength: 110, nodeDistance: 130, damping: 0.09 },
    stabilization: { iterations: 150 }
  },
  interaction: { hover: true, tooltipDelay: 100, navigationButtons: false },
  nodes: { borderWidth: 2, shadow: { enabled: true, size: 4 }, size: 20, font: { size: 11, multi: true } },
  edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { size: 10, align: 'middle' } }
};

const netPhys = new vis.Network(
  document.getElementById('net-physical'),
  { nodes: physNodes, edges: physEdges },
  { ...commonOptions, groups: physGroups }
);
const netLog = new vis.Network(
  document.getElementById('net-logical'),
  { nodes: logNodes, edges: logEdges },
  { ...commonOptions, groups: logGroups }
);

const nodeInfo = {
  fw1: { title: 'Edge Firewall', phys: 'Filters all inbound/outbound traffic. Runs iptables/nftables rules.', logical: 'Not represented in service topology (infrastructure concern only).' },
  r1: { title: 'Core Router', phys: 'BGP peering with ISP, OSPF internal routing, VLAN segmentation.', logical: 'Not directly visible in service topology.' },
  sw1: { title: 'Production Switch', phys: '48-port 10GbE managed switch, VLAN 100 (production).', logical: 'Underlying connectivity for all production services.' },
  lb1: { title: 'Load Balancer (Hardware)', phys: 'Dedicated HAProxy instance, round-robin to web servers.', logical: 'Maps to Load Balancer Service in logical view.' },
  sv1: { title: 'web-prod-01', phys: 'Web server, 32GB RAM. Connected to switch via 1GbE.', logical: 'Hosts Web Service (one of two instances behind load balancer).' },
  sv2: { title: 'web-prod-02', phys: 'Web server, 32GB RAM. Connected to switch via 1GbE.', logical: 'Hosts Web Service (second instance — active-active HA).' },
  sv3: { title: 'api-prod-01', phys: 'API server, 64GB RAM, 10GbE uplink.', logical: 'Hosts API Service, Auth Service, and Payment Service.' },
  sv4: { title: 'db-prod-01', phys: 'DB primary, 128GB RAM, NVMe RAID. Replication to db-prod-02.', logical: 'Hosts CustomerDB and OrderDB (primary replicas).' },
  sv5: { title: 'db-prod-02', phys: 'DB replica, 128GB RAM. Receives replication from db-prod-01.', logical: 'Hosts CustomerDB and OrderDB (read replicas for scale).' },
  sv6: { title: 'cache-01', phys: 'Cache server, 64GB RAM (memory-optimized), 10GbE.', logical: 'Hosts Cache Layer (Redis) and SessionStore.' },
  svc_web: { title: 'Web Service', phys: 'Runs on web-prod-01 and web-prod-02 (2 physical servers).', logical: 'Receives traffic from load balancer, calls API Service for data.' },
  svc_api: { title: 'API Service', phys: 'Runs on api-prod-01 (single server, multiple containers).', logical: 'Core business logic — orchestrates auth, payments, DB access.' },
  svc_auth: { title: 'Auth Service', phys: 'Co-located on api-prod-01.', logical: 'Validates JWT tokens, manages sessions in SessionStore.' },
  svc_pay: { title: 'Payment Service', phys: 'Isolated container on api-prod-01, PCI-DSS compliant.', logical: 'Processes payments — called by API Service on checkout.' },
  db_customer: { title: 'CustomerDB', phys: 'PostgreSQL on db-prod-01 (primary) + db-prod-02 (replica).', logical: 'Stores customer accounts and profiles, read by API Service.' },
  db_orders: { title: 'OrderDB', phys: 'PostgreSQL on db-prod-01 (primary) + db-prod-02 (replica).', logical: 'Stores orders and transactions, written by API & Payment services.' },
  db_session: { title: 'SessionStore', phys: 'Redis on cache-01, volatile in-memory storage.', logical: 'Stores short-lived JWT tokens, queried by Auth Service.' },
  svc_cache: { title: 'Cache Layer', phys: 'Redis on cache-01.', logical: 'Reduces CustomerDB load by 60% — fronts reads for Web Service.' },
  svc_lb: { title: 'Load Balancer Service', phys: 'HAProxy process on lb1 (dedicated hardware).', logical: 'Routes incoming traffic to healthy Web Service instances.' }
};

function showInfo(nodeId) {
  const info = nodeInfo[nodeId];
  if (!info) return;
  document.getElementById('info-panel').innerHTML = `
    <h3>${info.title}</h3>
    <p><strong>Physical view:</strong> ${info.phys}</p>
    <p><strong>Logical view:</strong> ${info.logical}</p>
  `;
}

netPhys.on('click', p => { if (p.nodes.length) showInfo(p.nodes[0]); });
netLog.on('click', p => { if (p.nodes.length) showInfo(p.nodes[0]); });
