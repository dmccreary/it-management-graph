// Graph RAG Query Flow Interactive Diagram
// CANVAS_HEIGHT: 580
// Uses vis-network to show the Graph RAG pipeline as a step-through flow

const STEPS = [
  { id: 1, label: 'User\nQuestion', group: 'ui',    detail: 'User asks: "What will be affected if we upgrade database cluster 3?"', time: '' },
  { id: 2, label: 'Intent\nClassification', group: 'nlp',   detail: 'NLP extracts entities ("database cluster 3"), intent ("impact analysis"), action ("Upgrade")', time: '~50ms' },
  { id: 3, label: 'Query Pattern\nSelection', group: 'nlp',   detail: 'System selects MATCH (n:Asset)-[:DEPENDS_ON*]->(d) RETURN d query template', time: '~80ms' },
  { id: 4, label: 'Query\nGeneration', group: 'query', detail: 'Template filled: MATCH (n {name:"DB Cluster 3"})-[:DEPENDS_ON*]->(d) RETURN d, d.criticality', time: '~120ms' },
  { id: 5, label: 'Graph\nExecution', group: 'graph', detail: 'Query traverses IT management graph following DEPENDS_ON relationships across hops', time: '~200ms' },
  { id: 6, label: 'Results\nRetrieval', group: 'graph', detail: 'Returns: Customer API (critical), Billing Service (high), Analytics (medium)', time: '~300ms' },
  { id: 7, label: 'Context\nAssembly', group: 'llm',   detail: 'Combines graph results + node metadata (SLAs, owners) + historical incidents', time: '~400ms' },
  { id: 8, label: 'Prompt\nConstruction', group: 'llm',   detail: 'Structured prompt ensures LLM stays grounded in graph data, not hallucination', time: '~450ms' },
  { id: 9, label: 'LLM\nGeneration', group: 'llm',   detail: 'LLM produces human-readable impact analysis (~2-5s for full response)', time: '~3-5s' },
  { id: 10, label: 'Response\nFormatting', group: 'ui',    detail: 'Answer displayed with summary, affected services list, recommendations, follow-up prompts', time: '~5-6s' },
];

const EDGES = [
  { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
  { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 },
  { from: 7, to: 8 }, { from: 8, to: 9 }, { from: 9, to: 10 },
  { from: 10, to: 1, dashes: true, label: 'follow-up', color: { color: '#999' } }
];

const GROUP_COLORS = {
  ui:    { background: '#cfe2ff', border: '#0d6efd', font: '#0a3678' },
  nlp:   { background: '#e2cfff', border: '#6f42c1', font: '#3a1078' },
  query: { background: '#ffe5cc', border: '#fd7e14', font: '#7a3500' },
  graph: { background: '#fff3cd', border: '#ffc107', font: '#664d00' },
  llm:   { background: '#d1e7dd', border: '#198754', font: '#0a3622' },
};

const LANE_LABELS = { ui: 'User Interface', nlp: 'NLP Layer', query: 'Query Generation', graph: 'Graph Database', llm: 'LLM Engine' };

let nodes, edges, network;
let currentStep = 0;
let animating = false;

function initNetwork() {
  const nodeData = STEPS.map(s => ({
    id: s.id,
    label: s.label,
    group: s.group,
    color: GROUP_COLORS[s.group],
    font: { color: GROUP_COLORS[s.group].font, size: 13, bold: true },
    shape: 'box',
    size: 20,
    borderWidth: 2,
    shadow: false,
    title: `<b>Step ${s.id}</b><br>${s.detail}${s.time ? '<br><i>Total elapsed: ' + s.time + '</i>' : ''}`
  }));

  const edgeData = EDGES.map((e, i) => ({
    id: i,
    from: e.from, to: e.to,
    arrows: 'to',
    dashes: e.dashes || false,
    label: e.label || '',
    color: e.color || { color: '#555' },
    font: { size: 10, color: '#555' },
    smooth: { type: 'curvedCW', roundness: e.dashes ? 0.3 : 0.1 }
  }));

  nodes = new vis.DataSet(nodeData);
  edges = new vis.DataSet(edgeData);

  const container = document.getElementById('rag-network');
  network = new vis.Network(container, { nodes, edges }, {
    layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 160, nodeSpacing: 90 } },
    physics: { enabled: false },
    interaction: { hover: true, tooltipDelay: 150, dragView: true, zoomView: true },
    nodes: { borderWidth: 2, margin: 10 },
    edges: { arrows: 'to', width: 1.5 },
  });

  network.on('click', params => {
    if (params.nodes.length > 0) showDetail(params.nodes[0]);
  });
}

function showDetail(stepId) {
  const step = STEPS.find(s => s.id === stepId);
  if (!step) return;
  const panel = document.getElementById('detail-panel');
  panel.innerHTML = `<b>Step ${step.id}: ${step.label.replace('\n', ' ')}</b><br>${step.detail}` +
    (step.time ? `<br><span style="color:#888;font-size:11px">Elapsed: ${step.time}</span>` : '');
  panel.style.borderLeftColor = GROUP_COLORS[step.group].border;
}

function highlightUpTo(n) {
  const updates = STEPS.map(s => ({
    id: s.id,
    color: s.id <= n
      ? { background: GROUP_COLORS[s.group].background, border: GROUP_COLORS[s.group].border }
      : { background: '#f0f0f0', border: '#bbb' },
    borderWidth: s.id === n ? 4 : 2,
    shadow: s.id === n,
  }));
  nodes.update(updates);
  if (n > 0) showDetail(n);
}

async function stepThrough() {
  if (animating) return;
  animating = true;
  document.getElementById('btn-step').disabled = true;
  document.getElementById('btn-play').disabled = true;

  for (let i = currentStep + 1; i <= STEPS.length; i++) {
    currentStep = i;
    highlightUpTo(i);
    document.getElementById('step-counter').textContent = `Step ${i} of ${STEPS.length}`;
    await sleep(900);
    if (!animating) break;
  }

  animating = false;
  document.getElementById('btn-step').disabled = false;
  document.getElementById('btn-play').disabled = false;
  document.getElementById('step-counter').textContent = 'Complete!';
}

function singleStep() {
  if (animating) return;
  currentStep = Math.min(currentStep + 1, STEPS.length);
  highlightUpTo(currentStep);
  document.getElementById('step-counter').textContent = `Step ${currentStep} of ${STEPS.length}`;
}

function resetAll() {
  animating = false;
  currentStep = 0;
  highlightUpTo(0);
  document.getElementById('step-counter').textContent = 'Step 0 of 10';
  document.getElementById('detail-panel').innerHTML = 'Click a step box or use the controls below to walk through the Graph RAG pipeline.';
  document.getElementById('btn-step').disabled = false;
  document.getElementById('btn-play').disabled = false;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

window.addEventListener('load', () => {
  initNetwork();
  highlightUpTo(0);
  document.getElementById('btn-play').addEventListener('click', stepThrough);
  document.getElementById('btn-step').addEventListener('click', singleStep);
  document.getElementById('btn-reset').addEventListener('click', resetAll);

  // Build lane legend
  const legend = document.getElementById('lane-legend');
  Object.entries(LANE_LABELS).forEach(([key, label]) => {
    const item = document.createElement('div');
    item.style.cssText = `display:flex;align-items:center;gap:6px;font-size:12px;`;
    item.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border-radius:3px;background:${GROUP_COLORS[key].background};border:2px solid ${GROUP_COLORS[key].border}"></span>${label}`;
    legend.appendChild(item);
  });
});
