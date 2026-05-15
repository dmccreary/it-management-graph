// OpenTelemetry Data Flow Architecture
// CANVAS_HEIGHT: 560

const nodeInfo = {
  web_app: {
    title: 'Web Application',
    color: '#2196F3',
    desc: 'A production web application instrumented with the OTel SDK. Generates traces for each HTTP request, metrics like response time and error rate, and structured logs.',
    signals: 'Emits: HTTP traces, request metrics, error logs'
  },
  api_svc: {
    title: 'API Service',
    color: '#2196F3',
    desc: 'Backend API service with distributed tracing enabled. Each call to downstream services creates a child span, building a complete trace tree.',
    signals: 'Emits: gRPC traces, latency metrics, dependency maps'
  },
  bg_worker: {
    title: 'Background Worker',
    color: '#2196F3',
    desc: 'Async job processor (e.g., message queue consumer). Instruments job processing time, queue depth, and failure rates.',
    signals: 'Emits: job duration metrics, queue traces, batch logs'
  },
  sdk_web: {
    title: 'OTel SDK (Web App)',
    color: '#FF9800',
    desc: 'OpenTelemetry SDK auto-instrumented via the Java/Python/Go agent. Captures HTTP framework spans, DB queries, and external calls without code changes.',
    signals: 'Packages: traces + metrics + logs → OTLP format'
  },
  sdk_api: {
    title: 'OTel SDK (API Service)',
    color: '#FF9800',
    desc: 'OTel SDK with manual instrumentation for custom business spans. Propagates W3C TraceContext headers to downstream services.',
    signals: 'Packages: spans + custom metrics → OTLP/gRPC'
  },
  sdk_bg: {
    title: 'OTel SDK (Background Worker)',
    color: '#FF9800',
    desc: 'OTel SDK with Prometheus metrics bridge. Converts existing Prometheus metrics to OTLP format for the collector.',
    signals: 'Packages: Prometheus metrics → OTLP/HTTP'
  },
  collector_recv: {
    title: 'OTel Collector — Receivers',
    color: '#FF9800',
    desc: 'Receives telemetry from multiple sources: OTLP/gRPC (from SDK), Prometheus scrape (for existing metrics), Jaeger format (legacy), Zipkin format. Acts as a universal telemetry ingestion endpoint.',
    signals: 'Accepts: OTLP, Prometheus, Jaeger, Zipkin, StatsD'
  },
  collector_proc: {
    title: 'OTel Collector — Processors',
    color: '#E65100',
    desc: 'Transforms telemetry in-flight: (1) Batch processor groups data for efficiency. (2) Attribute processor adds k8s.namespace, service.version. (3) Sampling processor drops 99% of healthy traces, keeps 100% of errors. (4) Filter processor removes internal health-check spans.',
    signals: 'Transforms: batch, enrich, sample, filter, redact PII'
  },
  collector_exp: {
    title: 'OTel Collector — Exporters',
    color: '#E65100',
    desc: 'Routes processed telemetry to multiple backends simultaneously. Fan-out export allows same data to reach observability, graph, and SIEM without agents in each service.',
    signals: 'Routes to: Jaeger, Prometheus, Loki, Graph API, Splunk'
  },
  obs_platform: {
    title: 'Observability Platform',
    color: '#4CAF50',
    desc: 'Full-stack observability: Grafana + Jaeger (traces) + Prometheus (metrics) + Loki (logs). Provides dashboards, alerts, and SLO tracking for engineering teams.',
    signals: 'Receives: all signals | Features: dashboards, alerts, SLOs'
  },
  it_graph: {
    title: 'IT Management Graph',
    color: '#E91E63',
    desc: 'Graph database (Neo4j) that builds and maintains service dependency maps from distributed trace data. Each unique service-to-service call becomes an edge in the graph. Enables automated change impact analysis.',
    signals: 'Receives: traces → extracts DEPENDS_ON relationships\nUpdates: service graph topology in real-time'
  },
  siem: {
    title: 'SIEM / Analytics',
    color: '#9C27B0',
    desc: 'Security Information and Event Management platform (e.g., Splunk, Elastic SIEM). Receives security-relevant logs and anomalous traces for threat detection and compliance reporting.',
    signals: 'Receives: error logs, security events, anomalous traces'
  }
};

const nodes = new vis.DataSet([
  // Layer 1 - Applications (level 0)
  { id: 'web_app', label: 'Web\nApplication', level: 0, group: 'app', title: 'Web Application — click for details' },
  { id: 'api_svc', label: 'API\nService', level: 0, group: 'app', title: 'API Service — click for details' },
  { id: 'bg_worker', label: 'Background\nWorker', level: 0, group: 'app', title: 'Background Worker — click for details' },
  // Layer 2 - SDKs (level 1)
  { id: 'sdk_web', label: 'OTel SDK', level: 1, group: 'sdk', title: 'OTel SDK (Web App) — click for details' },
  { id: 'sdk_api', label: 'OTel SDK', level: 1, group: 'sdk', title: 'OTel SDK (API Service) — click for details' },
  { id: 'sdk_bg', label: 'OTel SDK', level: 1, group: 'sdk', title: 'OTel SDK (Background Worker) — click for details' },
  // Layer 3 - Collector internals (level 2)
  { id: 'collector_recv', label: 'Collector\nReceivers', level: 2, group: 'collector', title: 'OTel Collector — Receivers' },
  { id: 'collector_proc', label: 'Collector\nProcessors', level: 3, group: 'collector', title: 'OTel Collector — Processors' },
  { id: 'collector_exp', label: 'Collector\nExporters', level: 4, group: 'collector', title: 'OTel Collector — Exporters' },
  // Layer 4 - Backends (level 5)
  { id: 'obs_platform', label: 'Observability\nPlatform', level: 5, group: 'backend_obs', title: 'Observability Platform (Grafana + Jaeger + Prometheus)' },
  { id: 'it_graph', label: 'IT Management\nGraph', level: 5, group: 'backend_graph', title: 'IT Management Graph (Neo4j)' },
  { id: 'siem', label: 'SIEM /\nAnalytics', level: 5, group: 'backend_siem', title: 'SIEM / Analytics (Splunk)' }
]);

const edges = new vis.DataSet([
  // App → SDK
  { from: 'web_app', to: 'sdk_web', label: 'instrumented', arrows: 'to', width: 2, color: { color: '#2196F3' } },
  { from: 'api_svc', to: 'sdk_api', label: 'instrumented', arrows: 'to', width: 2, color: { color: '#2196F3' } },
  { from: 'bg_worker', to: 'sdk_bg', label: 'instrumented', arrows: 'to', width: 2, color: { color: '#2196F3' } },
  // SDK → Receivers
  { from: 'sdk_web', to: 'collector_recv', label: 'OTLP/gRPC', arrows: 'to', width: 2.5, color: { color: '#FF9800' } },
  { from: 'sdk_api', to: 'collector_recv', label: 'OTLP/gRPC', arrows: 'to', width: 2.5, color: { color: '#FF9800' } },
  { from: 'sdk_bg', to: 'collector_recv', label: 'OTLP/HTTP', arrows: 'to', width: 2.5, color: { color: '#FF9800' } },
  // Within collector
  { from: 'collector_recv', to: 'collector_proc', label: 'pipeline', arrows: 'to', width: 3, color: { color: '#E65100' } },
  { from: 'collector_proc', to: 'collector_exp', label: 'processed', arrows: 'to', width: 3, color: { color: '#E65100' } },
  // Exporters → Backends
  { from: 'collector_exp', to: 'obs_platform', label: 'Jaeger/Prometheus/Loki', arrows: 'to', width: 2.5, color: { color: '#4CAF50' } },
  { from: 'collector_exp', to: 'it_graph', label: 'trace→graph API', arrows: 'to', width: 2.5, color: { color: '#E91E63' } },
  { from: 'collector_exp', to: 'siem', label: 'security events', arrows: 'to', width: 2, color: { color: '#9C27B0' } }
]);

const groups = {
  app: { color: { background: '#E3F2FD', border: '#1565C0', highlight: { background: '#BBDEFB', border: '#0D47A1' } }, font: { color: '#0D47A1', size: 12, bold: true }, shape: 'box', widthConstraint: 90 },
  sdk: { color: { background: '#FFD54F', border: '#F57F17', highlight: { background: '#FFE082', border: '#F57F17' } }, font: { color: '#333', size: 11, bold: true }, shape: 'box', widthConstraint: 70 },
  collector: { color: { background: '#FF9800', border: '#E65100', highlight: { background: '#FFB74D', border: '#BF360C' } }, font: { color: '#fff', size: 12, bold: true }, shape: 'box', widthConstraint: 100 },
  backend_obs: { color: { background: '#4CAF50', border: '#1B5E20', highlight: { background: '#81C784', border: '#1B5E20' } }, font: { color: '#fff', size: 12, bold: true }, shape: 'box', widthConstraint: 100 },
  backend_graph: { color: { background: '#E91E63', border: '#880E4F', highlight: { background: '#F48FB1', border: '#880E4F' } }, font: { color: '#fff', size: 12, bold: true }, shape: 'box', widthConstraint: 100 },
  backend_siem: { color: { background: '#9C27B0', border: '#4A148C', highlight: { background: '#CE93D8', border: '#4A148C' } }, font: { color: '#fff', size: 12, bold: true }, shape: 'box', widthConstraint: 100 }
};

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'LR',
      sortMethod: 'directed',
      levelSeparation: 130,
      nodeSpacing: 90,
      treeSpacing: 100
    }
  },
  physics: { enabled: false },
  interaction: { hover: true, tooltipDelay: 100 },
  nodes: { borderWidth: 2, shadow: { enabled: true, size: 4 }, font: { multi: true } },
  edges: { smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.5 }, font: { size: 10, align: 'middle' } },
  groups
};

const container = document.getElementById('network');
const network = new vis.Network(container, { nodes, edges }, options);

network.on('click', params => {
  if (!params.nodes.length) return;
  const nodeId = params.nodes[0];
  const info = nodeInfo[nodeId];
  if (!info) return;
  document.getElementById('info-panel').innerHTML = `
    <h3 style="color:${info.color}">${info.title}</h3>
    <p>${info.desc}</p>
    <p style="margin-top:5px;font-size:12px;color:#555"><em>${info.signals}</em></p>
  `;
});
