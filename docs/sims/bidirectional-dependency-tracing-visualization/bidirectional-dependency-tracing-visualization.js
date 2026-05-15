// Bidirectional Dependency Tracing Visualization — vis-network
// CANVAS_HEIGHT: 590

const NODE_GROUPS = {
    service:  { color: { background: '#F8BBD0', border: '#880E4F' }, shape: 'ellipse',    font: { size: 12 } },
    app:      { color: { background: '#BBDEFB', border: '#1565C0' }, shape: 'box',        font: { size: 11 } },
    db:       { color: { background: '#FFE0B2', border: '#E65100' }, shape: 'cylinder',   font: { size: 11 } },
    server:   { color: { background: '#E0E0E0', border: '#424242' }, shape: 'square',     font: { size: 10 } },
    central:  { color: { background: '#FFF176', border: '#F57F17' }, shape: 'box',        font: { size: 13, bold: true }, borderWidth: 3 },
};

const ALL_NODES = [
    // Central
    { id: 1,  label: 'Customer Portal', group: 'central' },
    // Upstream (what Customer Portal needs)
    { id: 2,  label: 'Auth Service',    group: 'app' },
    { id: 3,  label: 'API Gateway',     group: 'app' },
    { id: 4,  label: 'CustomerDB',      group: 'db' },
    { id: 5,  label: 'SessionStore',    group: 'db' },
    { id: 6,  label: 'UserDB',          group: 'db' },
    { id: 7,  label: 'ConfigDB',        group: 'db' },
    { id: 8,  label: 'Rate Limiter',    group: 'app' },
    { id: 9,  label: 'db-prod-01',      group: 'server' },
    { id: 10, label: 'cache-prod-01',   group: 'server' },
    // Downstream (what depends on Customer Portal)
    { id: 11, label: 'Online Banking',  group: 'service' },
    { id: 12, label: 'Mobile App',      group: 'service' },
    { id: 13, label: 'Partner API',     group: 'app' },
    { id: 14, label: 'Analytics Svc',   group: 'app' },
    { id: 15, label: 'web-prod-01',     group: 'server' },
    { id: 16, label: 'web-prod-02',     group: 'server' },
];

// Edges: from=source, to=target (arrows pointing in "depends on" direction)
// Upstream: 1→X means Customer Portal depends on X
const UPSTREAM_EDGES = [
    { id:'u1', from:1, to:2,  label:'DEPENDS_ON' },
    { id:'u2', from:1, to:3,  label:'DEPENDS_ON' },
    { id:'u3', from:1, to:4,  label:'DEPENDS_ON' },
    { id:'u4', from:1, to:5,  label:'DEPENDS_ON' },
    { id:'u5', from:2, to:6,  label:'DEPENDS_ON' },
    { id:'u6', from:2, to:7,  label:'DEPENDS_ON' },
    { id:'u7', from:3, to:8,  label:'DEPENDS_ON' },
    { id:'u8', from:4, to:9,  label:'HOSTED_ON' },
    { id:'u9', from:5, to:10, label:'HOSTED_ON' },
];
// Downstream: X→1 means X depends on Customer Portal
const DOWNSTREAM_EDGES = [
    { id:'d1', from:11, to:1,  label:'USES' },
    { id:'d2', from:12, to:1,  label:'USES' },
    { id:'d3', from:13, to:1,  label:'USES' },
    { id:'d4', from:14, to:1,  label:'READS_FROM' },
    { id:'d5', from:1,  to:15, label:'RUNS_ON' },
    { id:'d6', from:1,  to:16, label:'RUNS_ON' },
];

let network, nodesDS, edgesDS;

function buildNetwork(filter) {
    let visEdges = [];
    let visNodeIds = new Set([1]);

    if (filter === 'all' || filter === 'upstream') {
        visEdges = visEdges.concat(UPSTREAM_EDGES);
        UPSTREAM_EDGES.forEach(e => { visNodeIds.add(e.from); visNodeIds.add(e.to); });
    }
    if (filter === 'all' || filter === 'downstream') {
        visEdges = visEdges.concat(DOWNSTREAM_EDGES);
        DOWNSTREAM_EDGES.forEach(e => { visNodeIds.add(e.from); visNodeIds.add(e.to); });
    }

    const visNodes = ALL_NODES.filter(n => visNodeIds.has(n.id));

    nodesDS = new vis.DataSet(visNodes);
    edgesDS = new vis.DataSet(visEdges.map(e => ({
        ...e,
        arrows: 'to',
        color: filter === 'upstream' ? '#4CAF50' : filter === 'downstream' ? '#2196F3' : '#888',
        font: { size: 9, color: '#555' },
    })));

    const options = {
        groups: NODE_GROUPS,
        physics: { stabilization: { iterations: 120 } },
        edges: { smooth: { type: 'dynamic' } },
        layout: { randomSeed: 42 },
        interaction: { navigationButtons: true, keyboard: false },
    };

    if (network) {
        network.setData({ nodes: nodesDS, edges: edgesDS });
    } else {
        network = new vis.Network(document.getElementById('diagram'), { nodes: nodesDS, edges: edgesDS }, options);
        network.on('click', function(params) {
            if (!params.nodes.length) return;
            const nid = params.nodes[0];
            const connected = network.getConnectedNodes(nid);
            const allIds = nodesDS.getIds();
            nodesDS.update(allIds.map(id => ({
                id,
                color: connected.includes(id) || id === nid
                    ? undefined
                    : { background: '#f0f0f0', border: '#ccc' },
                opacity: connected.includes(id) || id === nid ? 1 : 0.3,
            })));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buildNetwork('all');
    document.getElementById('btnAll').addEventListener('click', () => buildNetwork('all'));
    document.getElementById('btnUpstream').addEventListener('click', () => buildNetwork('upstream'));
    document.getElementById('btnDownstream').addEventListener('click', () => buildNetwork('downstream'));
    document.getElementById('btnReset').addEventListener('click', () => { buildNetwork('all'); });
});
