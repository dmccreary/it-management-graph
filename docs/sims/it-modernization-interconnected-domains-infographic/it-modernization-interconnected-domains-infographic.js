// IT Modernization Interconnected Domains Infographic
// CANVAS_HEIGHT: 560

const domainDetails = {
  center: {
    title: 'IT Management Graph',
    color: '#DAA520',
    tech: 'Central integration hub for all IT modernization data',
    benefit: 'Single source of truth for relationships, dependencies, and topology',
    integrations: [
      'Receives dynamic discovery data from Infrastructure',
      'Stores relationships using flexible graph schema',
      'Triggers automation based on graph changes',
      'Consumes continuous telemetry feeds'
    ]
  },
  infra: {
    title: 'Infrastructure Modernization',
    color: '#2196F3',
    tech: 'Cloud, Containers, Kubernetes, Terraform, Ansible',
    benefit: 'Dynamic discovery — resources appear and disappear automatically',
    integrations: [
      'Cloud APIs push resource inventory in real-time',
      'Kubernetes events update graph on pod/service changes',
      'Container discovery maps application-to-host relationships',
      'Infrastructure-as-code diffs feed planned change data'
    ]
  },
  data: {
    title: 'Data Modernization',
    color: '#4CAF50',
    tech: 'Graph DB, Flexible Schema, Property Graph, Cypher',
    benefit: 'Relationship modeling — native graph storage for IT relationships',
    integrations: [
      'Native graph storage eliminates JOIN complexity',
      'Schema-free model accommodates heterogeneous assets',
      'Property graph supports rich metadata on nodes and edges',
      'Multi-hop queries resolve dependency chains instantly'
    ]
  },
  process: {
    title: 'Process Modernization',
    color: '#FF9800',
    tech: 'Automation, Real-time Analysis, AIOps, Event-driven workflows',
    benefit: 'Instant impact assessment — automated change analysis',
    integrations: [
      'Change events trigger automated blast-radius analysis',
      'Incident workflows query graph for dependency context',
      'Automated runbooks use graph to determine scope',
      'Real-time alerts enriched with relationship data'
    ]
  },
  tooling: {
    title: 'Tooling Modernization',
    color: '#9C27B0',
    tech: 'Observability, Discovery, Orchestration, OpenTelemetry',
    benefit: 'Continuous data feed — always-fresh asset inventory',
    integrations: [
      'APM tools export service dependency traces to graph',
      'Network scanners feed topology changes continuously',
      'Log analysis identifies new asset relationships',
      'Orchestration tools report workload placement'
    ]
  }
};

const nodes = new vis.DataSet([
  {
    id: 'center',
    label: 'IT Management\nGraph',
    shape: 'circle',
    size: 60,
    color: { background: '#DAA520', border: '#B8860B', highlight: { background: '#FFD700', border: '#B8860B' } },
    font: { size: 14, color: '#fff', bold: true, multi: true },
    mass: 5,
    fixed: false
  },
  {
    id: 'infra',
    label: 'Infrastructure\nModernization',
    shape: 'ellipse',
    size: 44,
    color: { background: '#2196F3', border: '#1565C0', highlight: { background: '#64B5F6', border: '#1565C0' } },
    font: { size: 13, color: '#fff', bold: true, multi: true },
    title: 'Cloud, Containers, Kubernetes\nBenefit: Dynamic discovery'
  },
  {
    id: 'data',
    label: 'Data\nModernization',
    shape: 'ellipse',
    size: 44,
    color: { background: '#4CAF50', border: '#2E7D32', highlight: { background: '#81C784', border: '#2E7D32' } },
    font: { size: 13, color: '#fff', bold: true, multi: true },
    title: 'Graph DB, Flexible Schema\nBenefit: Relationship modeling'
  },
  {
    id: 'process',
    label: 'Process\nModernization',
    shape: 'ellipse',
    size: 44,
    color: { background: '#FF9800', border: '#E65100', highlight: { background: '#FFB74D', border: '#E65100' } },
    font: { size: 13, color: '#fff', bold: true, multi: true },
    title: 'Automation, Real-time Analysis\nBenefit: Instant impact assessment'
  },
  {
    id: 'tooling',
    label: 'Tooling\nModernization',
    shape: 'ellipse',
    size: 44,
    color: { background: '#9C27B0', border: '#6A1B9A', highlight: { background: '#CE93D8', border: '#6A1B9A' } },
    font: { size: 13, color: '#fff', bold: true, multi: true },
    title: 'Observability, Discovery, Orchestration\nBenefit: Continuous data feed'
  }
]);

const edges = new vis.DataSet([
  // Domain to center (bidirectional data flow)
  { id: 'e1', from: 'infra', to: 'center', arrows: { to: { enabled: true }, from: { enabled: true } }, width: 3, color: { color: '#2196F3', highlight: '#64B5F6' }, label: 'Dynamic\ndiscovery', font: { size: 10, align: 'middle' } },
  { id: 'e2', from: 'data', to: 'center', arrows: { to: { enabled: true }, from: { enabled: true } }, width: 3, color: { color: '#4CAF50', highlight: '#81C784' }, label: 'Relationship\nmodeling', font: { size: 10, align: 'middle' } },
  { id: 'e3', from: 'process', to: 'center', arrows: { to: { enabled: true }, from: { enabled: true } }, width: 3, color: { color: '#FF9800', highlight: '#FFB74D' }, label: 'Impact\nassessment', font: { size: 10, align: 'middle' } },
  { id: 'e4', from: 'tooling', to: 'center', arrows: { to: { enabled: true }, from: { enabled: true } }, width: 3, color: { color: '#9C27B0', highlight: '#CE93D8' }, label: 'Continuous\ndata feed', font: { size: 10, align: 'middle' } },
  // Adjacent domain interdependencies (curved)
  { id: 'e5', from: 'infra', to: 'data', arrows: 'none', width: 1.5, dashes: [5, 5], color: { color: '#999' }, smooth: { type: 'curvedCCW', roundness: 0.3 } },
  { id: 'e6', from: 'data', to: 'process', arrows: 'none', width: 1.5, dashes: [5, 5], color: { color: '#999' }, smooth: { type: 'curvedCCW', roundness: 0.3 } },
  { id: 'e7', from: 'process', to: 'tooling', arrows: 'none', width: 1.5, dashes: [5, 5], color: { color: '#999' }, smooth: { type: 'curvedCCW', roundness: 0.3 } },
  { id: 'e8', from: 'tooling', to: 'infra', arrows: 'none', width: 1.5, dashes: [5, 5], color: { color: '#999' }, smooth: { type: 'curvedCCW', roundness: 0.3 } }
]);

const options = {
  layout: {
    improvedLayout: true
  },
  physics: {
    enabled: true,
    solver: 'repulsion',
    repulsion: {
      centralGravity: 0.3,
      springLength: 180,
      springConstant: 0.05,
      nodeDistance: 200,
      damping: 0.09
    },
    stabilization: { iterations: 200 }
  },
  interaction: {
    hover: true,
    tooltipDelay: 100,
    navigationButtons: false
  },
  nodes: {
    borderWidth: 2,
    shadow: { enabled: true, size: 6, x: 2, y: 2 }
  },
  edges: {
    smooth: { type: 'dynamic' }
  }
};

const container = document.getElementById('network');
const network = new vis.Network(container, { nodes, edges }, options);

// Fix center node in place after stabilization
network.once('stabilizationIterationsDone', () => {
  network.moveNode('center', 0, 0);
  const positions = {
    infra: { x: 0, y: -200 },
    data: { x: 200, y: 0 },
    process: { x: 0, y: 200 },
    tooling: { x: -200, y: 0 }
  };
  Object.entries(positions).forEach(([id, pos]) => {
    network.moveNode(id, pos.x, pos.y);
  });
  network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
});

const infoPanel = document.getElementById('info-panel');

network.on('click', (params) => {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    const d = domainDetails[nodeId];
    if (d) {
      infoPanel.innerHTML = `
        <h3 style="color:${d.color}">${d.title}</h3>
        <p><strong>Technologies:</strong> ${d.tech}</p>
        <p><strong>Key Benefit:</strong> ${d.benefit}</p>
        <p><strong>Integration Points:</strong></p>
        <ul style="margin-left:18px;margin-top:4px">${d.integrations.map(i => `<li>${i}</li>`).join('')}</ul>
      `;
    }
  } else {
    infoPanel.innerHTML = '<h3>Click or hover on any node to explore its details</h3><p>The IT Management Graph sits at the center, integrating four modernization domains.</p>';
  }
});

network.on('hoverNode', (params) => {
  const nodeId = params.node;
  const d = domainDetails[nodeId];
  if (d) {
    infoPanel.innerHTML = `
      <h3 style="color:${d.color}">${d.title}</h3>
      <p><strong>Technologies:</strong> ${d.tech}</p>
      <p><strong>Key Benefit:</strong> ${d.benefit}</p>
    `;
  }
});

network.on('blurNode', () => {
  // Keep last selected content
});
