// CANVAS_HEIGHT: 520
// Dynamic Topology Update Timeline Visualization
// Shows IT topology change events over a 10-minute period using vis-timeline

// Reference start time (use fixed date for consistent display)
const T0 = new Date('2024-01-15T10:00:00');
function t(minutes, seconds) {
  const ms = (minutes * 60 + (seconds || 0)) * 1000;
  return new Date(T0.getTime() + ms);
}

const eventDetails = {
  1:  { title: 'Initial State: 5 services running', desc: 'Infrastructure baseline: API Gateway, Auth Service, User Service, Order Service, Payment Service all healthy. 8 active network connections between services.' },
  2:  { title: 'Auto-scaler triggered: +3 new API pods', desc: 'Kubernetes Horizontal Pod Autoscaler detected CPU utilization >80% on API Gateway pods. Spinning up 3 additional replicas to handle load. Expected ready in ~60 seconds.' },
  3:  { title: 'Kubernetes API watch detects new pods', desc: 'Discovery agent watching Kubernetes API received pod creation events for 3 new API Gateway replicas. Pods moving through Pending → ContainerCreating → Running states. Detection latency: 4.2 seconds.' },
  4:  { title: 'Added 3 API service nodes to graph', desc: 'Graph update: Added nodes api-pod-07, api-pod-08, api-pod-09 with edges to load balancer. Graph now contains 8 services, 14 dependencies. Update time: 1.1 seconds.' },
  5:  { title: 'Database migration started', desc: 'Order Service initiated schema migration for OrderDB (PostgreSQL). Migration script v2.3.1 modifying 4 tables. Expected duration: 90 seconds. Read-replica traffic redirected.' },
  6:  { title: 'OpenTelemetry traces show new DB connection pattern', desc: 'Distributed tracing detected Order Service now connecting to OrderDB-Replica (read) and OrderDB-Primary (write) separately. New connection pattern differs from baseline topology.' },
  7:  { title: 'Updated service→database relationships in graph', desc: 'Graph update: Modified edge Order Service → OrderDB to split into two edges with type annotations (read/write). Added edge weight properties for query volume. Update time: 0.8 seconds.' },
  8:  { title: 'Old cache service decommissioned', desc: 'Legacy Redis cache service (cache-v1) gracefully shut down after traffic migration to cache-v2 was verified complete. Draining connections and flushing remaining data before termination.' },
  9:  { title: 'eBPF monitoring detects connection cessation', desc: 'eBPF kernel probes detected all TCP connections to cache-v1:6379 closed. No new connection attempts in 30-second observation window. Node confirmed decommissioned.' },
  10: { title: 'Removed cache node and 6 dependent edges from graph', desc: 'Graph update: Deleted node cache-v1 and 6 associated edges. Graph shrinks to 7 services, 12 dependencies. Orphan check: no orphaned nodes detected.' },
  11: { title: 'Load balancer configuration updated', desc: 'NGINX Ingress Controller received updated ConfigMap routing 30% of mobile API traffic to new canary deployment (v2.1.0). Traffic split: 70% stable / 30% canary.' },
  12: { title: 'Service mesh control plane detects routing change', desc: 'Istio control plane propagated new traffic routing rules to all sidecar proxies. VirtualService and DestinationRule objects updated. Discovery via Kubernetes watch on Istio CRDs.' },
  13: { title: 'Modified traffic routing edges with weight properties', desc: 'Graph update: Updated edges from load balancer to API pods with traffic weight annotations. 3 edges updated with weight: {stable: 0.70, canary: 0.30}. Enables impact analysis for canary deployment.' },
  14: { title: 'Final state: 7 services, 12 weighted dependencies', desc: 'Summary: 4 topology changes automatically discovered and applied in 10 minutes. Zero manual intervention required. All changes reflected in IT Management Graph within 30 seconds of occurrence.' },
};

const items = new vis.DataSet([
  // t=0
  { id: 1,  content: '🟢 Initial State: 5 services',    start: t(0),   className: 'infra-event',  group: 1, title: eventDetails[1].desc },
  { id: 14, content: '📊 Snapshot: 5 svc, 8 deps',      start: t(0),   className: 'graph-state',   group: 4, title: eventDetails[14].desc },
  // t=2
  { id: 2,  content: '⬆️ Auto-scaler: +3 API pods',      start: t(2),   className: 'infra-event',  group: 1, title: eventDetails[2].desc },
  { id: 3,  content: '👁️ K8s API: pods detected',         start: t(2, 5),className: 'discovery',    group: 2, title: eventDetails[3].desc },
  { id: 4,  content: '➕ Graph: 3 nodes added',           start: t(2,15),className: 'graph-update',  group: 3, title: eventDetails[4].desc },
  // t=3
  { id: 15, content: '📊 Snapshot: 8 svc, 14 deps',     start: t(3),   className: 'graph-state',   group: 4, title: '8 services, 14 dependencies — 3 new API pods visible' },
  // t=4
  { id: 5,  content: '🗄️ DB migration started',           start: t(4),   className: 'infra-event',  group: 1, title: eventDetails[5].desc },
  { id: 6,  content: '🔍 OTel: new DB conn pattern',      start: t(4,10),className: 'discovery',    group: 2, title: eventDetails[6].desc },
  // t=5
  { id: 7,  content: '🔗 Graph: DB edges updated',        start: t(5),   className: 'graph-update',  group: 3, title: eventDetails[7].desc },
  // t=6
  { id: 8,  content: '🔴 Cache-v1 decommissioned',        start: t(6),   className: 'infra-event',  group: 1, title: eventDetails[8].desc },
  { id: 9,  content: '🔬 eBPF: connections closed',       start: t(6, 8),className: 'discovery',    group: 2, title: eventDetails[9].desc },
  // t=7
  { id: 10, content: '➖ Graph: cache node removed',       start: t(7),   className: 'graph-update',  group: 3, title: eventDetails[10].desc },
  { id: 16, content: '📊 Snapshot: 7 svc, 12 deps',      start: t(7,30),className: 'graph-state',   group: 4, title: '7 services, 12 dependencies — cache-v1 removed' },
  // t=8
  { id: 11, content: '⚖️ Load balancer reconfigured',      start: t(8),   className: 'infra-event',  group: 1, title: eventDetails[11].desc },
  { id: 12, content: '🕸️ Service mesh: routing change',    start: t(8,12),className: 'discovery',    group: 2, title: eventDetails[12].desc },
  // t=9
  { id: 13, content: '📊 Graph: edge weights updated',    start: t(9),   className: 'graph-update',  group: 3, title: eventDetails[13].desc },
  // t=10
  { id: 17, content: '✅ Final: 7 svc, 12 deps (weighted)',start: t(10),  className: 'graph-state',   group: 4, title: eventDetails[14].desc },
]);

const groups = new vis.DataSet([
  { id: 1, content: '<b style="color:#1976d2">Infrastructure Events</b>' },
  { id: 2, content: '<b style="color:#e65100">Discovery Actions</b>' },
  { id: 3, content: '<b style="color:#880e4f">Graph Updates</b>' },
  { id: 4, content: '<b style="color:#1b5e20">Graph State</b>' },
]);

const options = {
  start: t(-0.3),
  end: t(10.5),
  min: t(-0.5),
  max: t(11),
  zoomMin: 60000,
  zoomMax: 700000,
  height: '360px',
  margin: { item: { horizontal: 5, vertical: 5 } },
  showCurrentTime: false,
  orientation: { axis: 'bottom' },
  format: {
    minorLabels: {
      minute: 'm:ss [min]',
      second: 's[s]',
    },
    majorLabels: {
      minute: 'Timeline',
    },
  },
};

const container = document.getElementById('timeline');
const timeline = new vis.Timeline(container, items, groups, options);

// Click handler for event details
timeline.on('click', function(props) {
  if (props.item !== null) {
    const detail = eventDetails[props.item];
    if (detail) {
      document.getElementById('event-detail').innerHTML =
        `<strong>${detail.title}</strong><br>${detail.desc}`;
    }
  }
});
