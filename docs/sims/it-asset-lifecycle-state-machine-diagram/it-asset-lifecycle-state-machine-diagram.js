// IT Asset Lifecycle State Machine Diagram
// CANVAS_HEIGHT: 560
// vis-network state machine layout with clickable state transitions

const STATES = [
  { id: 'requested',  label: 'Requested',    color: { background: '#e2cfff', border: '#6f42c1' }, title: 'Asset has been formally requested and approved in the procurement system.' },
  { id: 'ordered',    label: 'Ordered',      color: { background: '#cfe2ff', border: '#0d6efd' }, title: 'Purchase order issued to vendor. Awaiting delivery.' },
  { id: 'received',   label: 'Received',     color: { background: '#d1e7dd', border: '#198754' }, title: 'Asset physically received. Unboxed, inspected, and tagged with asset ID.' },
  { id: 'staging',    label: 'Staging /\nConfig', color: { background: '#fff3cd', border: '#ffc107' }, title: 'Asset being configured: OS install, patching, security baseline, image.' },
  { id: 'deployed',   label: 'Deployed',     color: { background: '#28a745', border: '#155724' }, title: 'Asset assigned to a user or service. Active in production.' },
  { id: 'inservice',  label: 'In Service',   color: { background: '#0d6efd', border: '#0a3678' }, title: 'Asset operational and under management. Monitored, patched, maintained.' },
  { id: 'maintenance',label: 'Maintenance',  color: { background: '#fd7e14', border: '#7a3500' }, title: 'Asset temporarily removed from service for repair or upgrade.' },
  { id: 'retiring',   label: 'Retiring',     color: { background: '#ffc107', border: '#664d00' }, title: 'Asset scheduled for decommission. Data backup initiated, replacement ordered.' },
  { id: 'retired',    label: 'Retired',      color: { background: '#dc3545', border: '#7b1c1c' }, title: 'Asset decommissioned. Removed from CMDB active records.' },
  { id: 'disposed',   label: 'Disposed',     color: { background: '#6c757d', border: '#343a40' }, title: 'Physical disposal: secure wipe, recycling (WEEE), or resale. Certificate issued.' },
];

const TRANSITIONS = [
  { from: 'requested',   to: 'ordered',     label: 'Approve PO' },
  { from: 'ordered',     to: 'received',    label: 'Deliver' },
  { from: 'received',    to: 'staging',     label: 'Intake' },
  { from: 'staging',     to: 'deployed',    label: 'Deploy' },
  { from: 'deployed',    to: 'inservice',   label: 'Accept' },
  { from: 'inservice',   to: 'maintenance', label: 'Incident / Upgrade' },
  { from: 'maintenance', to: 'inservice',   label: 'Repair Complete' },
  { from: 'inservice',   to: 'retiring',    label: 'EOL Decision' },
  { from: 'maintenance', to: 'retiring',    label: 'Unrepairable' },
  { from: 'retiring',    to: 'retired',     label: 'Decommission' },
  { from: 'retired',     to: 'disposed',    label: 'Dispose' },
  // Exception paths
  { from: 'deployed',    to: 'maintenance', label: 'Failure', dashes: true },
  { from: 'retiring',    to: 'inservice',   label: 'Reprieve', dashes: true },
];

let nodes, edges, network;

window.addEventListener('load', () => {
  nodes = new vis.DataSet(STATES.map((s, i) => ({
    id: s.id, label: s.label, color: s.color,
    font: { size: 13, bold: true },
    shape: 'box', borderWidth: 2.5, margin: 10,
    title: s.title,
  })));

  edges = new vis.DataSet(TRANSITIONS.map((t, i) => ({
    id: i, from: t.from, to: t.to, label: t.label,
    arrows: 'to',
    dashes: t.dashes || false,
    font: { size: 10, align: 'middle', background: '#f8f9fa' },
    color: { color: t.dashes ? '#aaa' : '#555' },
    smooth: { type: 'curvedCW', roundness: 0.2 },
  })));

  const container = document.getElementById('state-net');
  network = new vis.Network(container, { nodes, edges }, {
    layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 140, nodeSpacing: 80 } },
    physics: { enabled: false },
    interaction: { hover: true, tooltipDelay: 200, dragView: true, zoomView: true },
    edges: { width: 1.8 },
  });

  // Click node: highlight reachable transitions
  network.on('click', params => {
    if (params.nodes.length === 0) {
      resetHighlight(); return;
    }
    const clicked = params.nodes[0];
    const relEdges = TRANSITIONS.filter(t => t.from === clicked || t.to === clicked);
    const relNodes = new Set([clicked]);
    relEdges.forEach(t => { relNodes.add(t.from); relNodes.add(t.to); });

    nodes.update(STATES.map(s => ({
      id: s.id,
      opacity: relNodes.has(s.id) ? 1.0 : 0.3,
    })));
    edges.update(TRANSITIONS.map((t, i) => ({
      id: i,
      color: { color: (t.from === clicked || t.to === clicked) ? '#0d6efd' : '#ddd' },
      width: (t.from === clicked || t.to === clicked) ? 3 : 1,
    })));

    const info = STATES.find(s => s.id === clicked);
    document.getElementById('state-info').innerHTML = `<b>${info.label.replace('\n',' ')}</b>: ${info.title}`;
  });

  network.on('deselectNode', resetHighlight);

  document.getElementById('btn-reset-view').addEventListener('click', () => {
    network.fit({ animation: true });
    resetHighlight();
  });
});

function resetHighlight() {
  nodes.update(STATES.map(s => ({ id: s.id, opacity: 1.0 })));
  edges.update(TRANSITIONS.map((t, i) => ({ id: i, color: { color: t.dashes ? '#aaa' : '#555' }, width: 1.8 })));
  document.getElementById('state-info').textContent = 'Click a state to see details and highlight transitions.';
}
