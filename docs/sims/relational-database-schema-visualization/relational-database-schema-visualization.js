// Relational Database Schema Visualization - vis-network ER Diagram
// CANVAS_HEIGHT: 560

const nodes = new vis.DataSet([
  {
    id: 'locations',
    label: 'Locations\n─────────────\nPK  location_id\n    data_center\n    city\n    region',
    shape: 'box',
    color: { background: '#c8e6c9', border: '#2e7d32', highlight: { background: '#a5d6a7', border: '#1b5e20' } },
    font: { size: 12, face: 'monospace', color: '#1b5e20' },
    widthConstraint: { minimum: 160, maximum: 160 },
    title: 'Locations Table\n\nStores physical data center locations.\nPrimary key: location_id\n\nOne location can host MANY servers (1:N)'
  },
  {
    id: 'servers',
    label: 'Servers\n─────────────\nPK  server_id\n    hostname\n    ip_address\nFK  location_id\n    purchase_date\n    status',
    shape: 'box',
    color: { background: '#bbdefb', border: '#1565c0', highlight: { background: '#90caf9', border: '#0d47a1' } },
    font: { size: 12, face: 'monospace', color: '#0d47a1' },
    widthConstraint: { minimum: 160, maximum: 160 },
    title: 'Servers Table\n\nPhysical/virtual compute infrastructure.\nPrimary key: server_id\nFK: location_id → Locations\n\nOne server can host MANY applications (1:N)\nEach server is in exactly ONE location (N:1)'
  },
  {
    id: 'applications',
    label: 'Applications\n─────────────\nPK  app_id\n    app_name\n    version\nFK  server_id\n    owner_team',
    shape: 'box',
    color: { background: '#ffe0b2', border: '#e65100', highlight: { background: '#ffcc80', border: '#bf360c' } },
    font: { size: 12, face: 'monospace', color: '#bf360c' },
    widthConstraint: { minimum: 160, maximum: 160 },
    title: 'Applications Table\n\nSoftware applications running on servers.\nPrimary key: app_id\nFK: server_id → Servers\n\nEach app runs on exactly ONE server (N:1)\n\nLimitation: No app-to-app dependency modeling!'
  }
]);

const edges = new vis.DataSet([
  {
    id: 'e1',
    from: 'servers', to: 'locations',
    label: 'LOCATED_IN\n(N:1)',
    arrows: { to: { enabled: true, scaleFactor: 1 } },
    color: { color: '#2e7d32', highlight: '#1b5e20' },
    width: 2,
    font: { size: 10, color: '#2e7d32', align: 'middle' },
    smooth: { type: 'curvedCW', roundness: 0.2 },
    title: 'FK: Servers.location_id → Locations.location_id\nCardinality: Many servers → One location\nConstraint: location_id must exist in Locations'
  },
  {
    id: 'e2',
    from: 'applications', to: 'servers',
    label: 'HOSTED_ON\n(N:1)',
    arrows: { to: { enabled: true, scaleFactor: 1 } },
    color: { color: '#1565c0', highlight: '#0d47a1' },
    width: 2,
    font: { size: 10, color: '#1565c0', align: 'middle' },
    smooth: { type: 'curvedCW', roundness: 0.2 },
    title: 'FK: Applications.server_id → Servers.server_id\nCardinality: Many apps → One server\nConstraint: server_id must exist in Servers'
  },
  {
    id: 'e3',
    from: 'applications', to: 'applications',
    label: '? App dependencies\nnot representable',
    arrows: { to: { enabled: true, scaleFactor: 0.8 } },
    color: { color: '#9e9e9e', highlight: '#616161' },
    width: 1,
    dashes: [5, 5],
    font: { size: 9, color: '#757575', align: 'top' },
    smooth: { type: 'curvedCW', roundness: 0.5 },
    title: 'Limitation of Relational Model:\nApp-to-app dependencies cannot be represented\nwithout a self-referencing table and complex JOINs.\nGraph databases handle this naturally.'
  }
]);

const container = document.getElementById('network');
const network = new vis.Network(container, { nodes, edges }, {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'directed',
      levelSeparation: 220,
      nodeSpacing: 150
    }
  },
  physics: { enabled: false },
  interaction: {
    hover: true,
    tooltipDelay: 150,
    navigationButtons: false
  },
  edges: {
    smooth: { type: 'curvedCW', roundness: 0.2 }
  },
  nodes: {
    borderWidth: 2,
    shadow: { enabled: true, size: 4, x: 2, y: 2, color: 'rgba(0,0,0,0.12)' }
  }
});

const infoBox = document.getElementById('info-box');
const allNodeIds = nodes.getIds();
const allEdgeIds = edges.getIds();

const nodeInfo = {
  locations: {
    title: 'Locations Table',
    body: 'Physical data centers. <strong>Primary key:</strong> location_id. One location can host many servers (1:N relationship). Foreign key in Servers references this table.'
  },
  servers: {
    title: 'Servers Table',
    body: 'Compute infrastructure. <strong>Primary key:</strong> server_id. References Locations via FK location_id. Referenced by Applications via FK server_id. Central hub in this schema.'
  },
  applications: {
    title: 'Applications Table',
    body: 'Software layer. <strong>Primary key:</strong> app_id. References Servers via FK server_id. <strong>Limitation:</strong> Cannot model app-to-app dependencies without complex self-joins — a key weakness of relational schemas for IT management.'
  }
};

network.on('click', (params) => {
  if (params.nodes.length === 0) {
    nodes.update(allNodeIds.map(id => ({ id, opacity: 1 })));
    edges.update(allEdgeIds.map(id => ({ id, color: undefined })));
    infoBox.innerHTML = '<h4>Click a table to explore</h4><p>Click any table node to highlight its foreign key relationships.</p>';
    return;
  }
  const clickedId = params.nodes[0];
  const connectedNodes = new Set([clickedId, ...network.getConnectedNodes(clickedId)]);
  const connectedEdges = new Set(network.getConnectedEdges(clickedId));

  nodes.update(allNodeIds.map(id => ({ id, opacity: connectedNodes.has(id) ? 1.0 : 0.2 })));
  edges.update(allEdgeIds.map(id => ({
    id,
    color: connectedEdges.has(id) ? undefined : { color: 'rgba(200,200,200,0.2)', highlight: 'rgba(200,200,200,0.2)' }
  })));

  const info = nodeInfo[clickedId] || { title: clickedId, body: '' };
  infoBox.innerHTML = `<h4>${info.title}</h4><p>${info.body}</p>`;
});

network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
network.on('blurNode',  () => { container.style.cursor = 'default'; });
