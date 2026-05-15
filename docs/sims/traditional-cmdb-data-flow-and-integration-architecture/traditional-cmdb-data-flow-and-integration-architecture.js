// Traditional CMDB Data Flow and Integration Architecture - vis-network MicroSim
// CANVAS_HEIGHT: 580

let network = null;
let currentMode = 'cmdb'; // 'cmdb' or 'graph'

// ---- TRADITIONAL CMDB DATA ----
const cmdbNodes = [
  // Central CMDB
  { id: 'cmdb', label: 'CMDB\nCore', group: 'cmdb',
    title: 'Central Configuration Management Database\nStores all CI (Configuration Item) records\nRelational schema with strict field definitions\nData often 2-7 days stale',
    level: 2, shape: 'database', size: 36, font: { size: 14, bold: true } },

  // Integration Layer
  { id: 'etl', label: 'ETL /\nIntegration\nLayer', group: 'etl',
    title: 'ETL/Integration layer handles data transformation\nbetween sources and the CMDB.\nThis overhead is 15-25% of total CMDB cost.',
    level: 2, shape: 'ellipse', color: { background: '#95a5a6', border: '#7f8c8d' }, font: { size: 10 } },

  // Discovery sources (level 1 - top)
  { id: 'discovery', label: 'Network\nDiscovery Tools', group: 'source',
    title: 'Agent-based network scanning\nExamples: Nessus, Qualys, BMC Discovery\nIntegration: API v2.1\nUpdate frequency: Weekly',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'monitoring', label: 'Server\nMonitoring', group: 'source',
    title: 'Server health and performance data\nExamples: Nagios, Zabbix, SolarWinds\nIntegration: XML Feed\nUpdate frequency: 5-minute polling',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'apm', label: 'App Performance\nManagement', group: 'source',
    title: 'Application performance monitoring\nExamples: New Relic, AppDynamics\nIntegration: REST API\nUpdate frequency: Real-time (but CMDB update: daily)',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'ticketing', label: 'Service Desk\n/ Ticketing', group: 'source',
    title: 'IT service management tickets\nExamples: Remedy, ServiceNow\nIntegration: CSV Import\nUpdate frequency: On ticket close',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'change', label: 'Change Mgmt\nSystem', group: 'source',
    title: 'Change records and approvals\nIntegration: XML Feed\nCommon issue: Change records not always linked to CIs',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'assetdb', label: 'Asset\nManagement\nDB', group: 'source',
    title: 'Hardware/software inventory\nIntegration: Database replication\nSchema mismatch with CMDB is common issue',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'cloud', label: 'Cloud Mgmt\nPlatforms', group: 'source',
    title: 'AWS, Azure, GCP resource management\nIntegration: REST API (multiple versions)\nRapid change rate creates staleness',
    level: 1, color: { background: '#8e44ad', border: '#6c3483' } },
  { id: 'manual', label: 'Manual Entry\n/ Spreadsheets', group: 'source',
    title: 'Human data entry and Excel uploads\nIntegration: CSV Import / Web UI\n⚠ Highest error rate source\nOften contradicts automated discovery',
    level: 1, color: { background: '#c0392b', border: '#922b21' } },

  // Failure nodes
  { id: 'fail1', label: '⚠', group: 'fail',
    title: 'Data Quality Issue: Conflicting data from multiple sources\nManual reconciliation required — avg 4 hours/week',
    level: 2, shape: 'diamond', size: 16, color: { background: '#c0392b', border: '#922b21' }, font: { color: '#fff', size: 16 } },
  { id: 'fail2', label: '⚠', group: 'fail',
    title: 'Integration Failure: Schema mismatch between cloud API v3 and CMDB schema\nRequires middleware update',
    level: 2, shape: 'diamond', size: 16, color: { background: '#c0392b', border: '#922b21' }, font: { color: '#fff', size: 16 } },

  // Consumers (level 3 - bottom)
  { id: 'impact', label: 'Change Impact\nAnalysis', group: 'consumer',
    title: 'Uses CMDB relationships to predict change impact\nQuery: "What services depend on this server?"\nLimited by incomplete relationship data',
    level: 3, color: { background: '#2980b9', border: '#1a5276' } },
  { id: 'incident', label: 'Incident\nManagement', group: 'consumer',
    title: 'Links incidents to affected CIs\nChallenges: CMDB often not current during incidents\n"CMDB is only accurate when you need it least"',
    level: 3, color: { background: '#2980b9', border: '#1a5276' } },
  { id: 'capacity', label: 'Capacity\nPlanning', group: 'consumer',
    title: 'Uses infrastructure metrics for capacity forecasting\nLimited by stale data (weekly refresh not sufficient)',
    level: 3, color: { background: '#2980b9', border: '#1a5276' } },
  { id: 'compliance', label: 'Compliance\nReporting', group: 'consumer',
    title: 'Generates audit reports from CMDB data\nRisk: Stale CMDB creates compliance gaps\nRemediation cost: avg $200K per audit finding',
    level: 3, color: { background: '#2980b9', border: '#1a5276' } }
];

const cmdbEdges = [
  // Sources → ETL
  { from: 'discovery', to: 'etl', label: 'API v2.1', arrows: 'to', dashes: false, color: { color: '#8e44ad' } },
  { from: 'monitoring', to: 'etl', label: 'XML Feed', arrows: 'to', dashes: false, color: { color: '#8e44ad' } },
  { from: 'apm', to: 'etl', label: 'REST API', arrows: 'to', dashes: false, color: { color: '#8e44ad' } },
  { from: 'ticketing', to: 'etl', label: 'CSV', arrows: 'to', dashes: false, color: { color: '#8e44ad' } },
  { from: 'change', to: 'etl', label: 'XML', arrows: 'to', dashes: false, color: { color: '#8e44ad' } },
  { from: 'assetdb', to: 'etl', label: 'DB Repl.', arrows: 'to', dashes: false, color: { color: '#8e44ad' } },
  { from: 'cloud', to: 'etl', label: 'REST v3', arrows: 'to', dashes: false, color: { color: '#c0392b' } },
  { from: 'manual', to: 'etl', label: 'CSV/UI', arrows: 'to', dashes: false, color: { color: '#c0392b' } },

  // ETL → CMDB
  { from: 'etl', to: 'cmdb', arrows: 'to', width: 3, color: { color: '#e67e22' } },

  // Failure points
  { from: 'manual', to: 'fail1', arrows: 'to', color: { color: '#c0392b' }, dashes: [5, 3] },
  { from: 'cloud', to: 'fail2', arrows: 'to', color: { color: '#c0392b' }, dashes: [5, 3] },

  // CMDB → Consumers
  { from: 'cmdb', to: 'impact', label: 'Query', arrows: 'to', dashes: [8, 4], color: { color: '#2980b9' } },
  { from: 'cmdb', to: 'incident', label: 'Query', arrows: 'to', dashes: [8, 4], color: { color: '#2980b9' } },
  { from: 'cmdb', to: 'capacity', label: 'Query', arrows: 'to', dashes: [8, 4], color: { color: '#2980b9' } },
  { from: 'cmdb', to: 'compliance', label: 'Query', arrows: 'to', dashes: [8, 4], color: { color: '#2980b9' } }
];

// ---- GRAPH-BASED APPROACH DATA ----
const graphNodes = [
  { id: 'graphdb', label: 'IT Management\nGraph Database', group: 'graphdb',
    title: 'Neo4j or similar graph database\nNative graph storage — relationships are first-class\nReal-time ingestion from all sources\nMillisecond traversal across millions of nodes',
    level: 2, shape: 'database', size: 36, color: { background: '#27ae60', border: '#1e8449' }, font: { size: 13, bold: true } },

  { id: 'g-discovery', label: 'Network\nDiscovery', group: 'gsource',
    title: 'Continuous network discovery\nReal-time streaming via Kafka\nAuto-creates/updates nodes and edges',
    level: 1, color: { background: '#27ae60', border: '#1e8449' } },
  { id: 'g-ebpf', label: 'eBPF\nObservability', group: 'gsource',
    title: 'Linux kernel-level network monitoring\nSub-millisecond latency detection\nAuto-discovers service dependencies',
    level: 1, color: { background: '#27ae60', border: '#1e8449' } },
  { id: 'g-cloud', label: 'Cloud APIs\n(Multi-Cloud)', group: 'gsource',
    title: 'AWS/Azure/GCP native APIs\nReal-time resource change events\nCost: no ETL overhead',
    level: 1, color: { background: '#27ae60', border: '#1e8449' } },
  { id: 'g-itsm', label: 'ITSM\nStreaming', group: 'gsource',
    title: 'Event-driven ITSM integration\nTickets automatically linked to graph nodes\nNo batch processing required',
    level: 1, color: { background: '#27ae60', border: '#1e8449' } },

  { id: 'g-query', label: 'Cypher / Gremlin\nQuery Engine', group: 'gengine',
    title: 'Graph query languages\nExample: MATCH (s:Server)-[:HOSTS]->(svc:Service) WHERE s.status="degraded"\nHop traversal: O(1) per relationship',
    level: 2, color: { background: '#1abc9c', border: '#148f77' } },

  { id: 'g-impact', label: 'Real-Time\nImpact Analysis', group: 'gconsumer',
    title: 'Instant impact analysis via graph traversal\n"5-hop dependency chain in 12ms"\nNo stale data problem',
    level: 3, color: { background: '#3498db', border: '#2471a3' } },
  { id: 'g-incident', label: 'AI-Assisted\nIncident Mgmt', group: 'gconsumer',
    title: 'ML models trained on graph structure\nAutomatic root cause suggestions\nCorrelates across logs, metrics, traces',
    level: 3, color: { background: '#3498db', border: '#2471a3' } },
  { id: 'g-compliance', label: 'Continuous\nCompliance', group: 'gconsumer',
    title: 'Policy-as-code on the graph\nContinuous compliance checking\nAuto-generates audit evidence',
    level: 3, color: { background: '#3498db', border: '#2471a3' } },
  { id: 'g-aiops', label: 'AIOps\nPlatform', group: 'gconsumer',
    title: 'AI operations platform\nPredictive alerting from graph patterns\nCapacity planning via graph analytics',
    level: 3, color: { background: '#3498db', border: '#2471a3' } }
];

const graphEdges = [
  { from: 'g-discovery', to: 'graphdb', label: 'Stream', arrows: 'to', color: { color: '#27ae60' } },
  { from: 'g-ebpf', to: 'graphdb', label: 'Stream', arrows: 'to', color: { color: '#27ae60' } },
  { from: 'g-cloud', to: 'graphdb', label: 'Event', arrows: 'to', color: { color: '#27ae60' } },
  { from: 'g-itsm', to: 'graphdb', label: 'Event', arrows: 'to', color: { color: '#27ae60' } },
  { from: 'graphdb', to: 'g-query', arrows: 'both', width: 2, color: { color: '#1abc9c' } },
  { from: 'g-query', to: 'g-impact', label: 'Cypher', arrows: 'to', color: { color: '#3498db' } },
  { from: 'g-query', to: 'g-incident', label: 'Cypher', arrows: 'to', color: { color: '#3498db' } },
  { from: 'g-query', to: 'g-compliance', label: 'Cypher', arrows: 'to', color: { color: '#3498db' } },
  { from: 'g-query', to: 'g-aiops', label: 'Cypher', arrows: 'to', color: { color: '#3498db' } }
];

const networkOptions = {
  layout: {
    hierarchical: {
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 140,
      nodeSpacing: 100,
      treeSpacing: 120,
      blockShifting: true,
      edgeMinimization: true
    }
  },
  physics: { enabled: false },
  nodes: {
    shape: 'box',
    size: 22,
    font: { size: 12, face: 'Segoe UI, sans-serif', multi: true },
    borderWidth: 2,
    shadow: { enabled: true, size: 4, x: 2, y: 2 }
  },
  edges: {
    font: { size: 10, align: 'middle', background: 'rgba(255,255,255,0.8)' },
    smooth: { type: 'cubicBezier', forceDirection: 'vertical' },
    width: 1.5,
    shadow: false
  },
  interaction: {
    hover: true,
    tooltipDelay: 200,
    zoomView: true,
    dragView: true
  }
};

function initNetwork(mode) {
  const container = document.getElementById('network-container');
  const nodes = mode === 'cmdb' ? cmdbNodes : graphNodes;
  const edges = mode === 'cmdb' ? cmdbEdges : graphEdges;

  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  };

  if (network) network.destroy();
  network = new vis.Network(container, data, networkOptions);

  // Show problem panel for CMDB mode
  const panel = document.getElementById('problemPanel');
  if (mode === 'cmdb') {
    panel.classList.add('visible');
  } else {
    panel.classList.remove('visible');
  }

  // Fit to view
  network.once('stabilized', () => network.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } }));
}

function toggleMode() {
  currentMode = (currentMode === 'cmdb') ? 'graph' : 'cmdb';
  const btn = document.getElementById('modeBtn');
  const label = document.getElementById('modeLabel');

  if (currentMode === 'cmdb') {
    btn.textContent = 'Switch to Graph-Based Approach';
    btn.classList.remove('alt');
    label.textContent = '📊 Traditional CMDB Architecture';
    label.style.color = '#1a3a6c';
  } else {
    btn.textContent = 'Switch to Traditional CMDB';
    btn.classList.add('alt');
    label.textContent = '🌐 Graph-Based IT Management';
    label.style.color = '#1e8449';
  }

  initNetwork(currentMode);
}

// Initialize on load
initNetwork('cmdb');
