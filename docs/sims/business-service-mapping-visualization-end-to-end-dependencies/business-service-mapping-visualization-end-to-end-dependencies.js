// Business Service Mapping Visualization — vis-network
// CANVAS_HEIGHT: 600

const ALL_NODES = [
    // Business Services
    { id:1,  label:'🏦 Online Banking',   group:'service', title:'SLA: 99.99% | Tier 1 Critical' },
    { id:2,  label:'📱 Mobile App',       group:'service', title:'SLA: 99.9% | Tier 1 Critical' },
    { id:3,  label:'💼 Corporate Portal', group:'service', title:'SLA: 99.5% | Tier 2' },
    // Applications
    { id:10, label:'Customer Portal',     group:'app', title:'v4.2 | Health: OK' },
    { id:11, label:'API Gateway',         group:'app', title:'v2.1 | Health: OK' },
    { id:12, label:'Auth Service',        group:'app', title:'v3.0 | Health: OK' },
    { id:13, label:'Transaction Engine',  group:'app', title:'v1.8 | Health: WARN' },
    { id:14, label:'Mobile Backend',      group:'app', title:'v5.1 | Health: OK' },
    { id:15, label:'Notification Svc',    group:'app', title:'v2.3 | Health: OK' },
    { id:16, label:'Corporate SSO',       group:'app', title:'v4.0 | Health: OK' },
    // Databases
    { id:20, label:'CustomerDB',          group:'db', title:'PostgreSQL | 2.3TB' },
    { id:21, label:'TransactionDB',       group:'db', title:'Oracle | 8.7TB' },
    { id:22, label:'SessionStore',        group:'db', title:'Redis | 64GB' },
    { id:23, label:'AuditLog',            group:'db', title:'Cassandra | 12TB' },
    // Infrastructure
    { id:30, label:'web-prod-01',         group:'server', title:'8 vCPU / 32GB RAM' },
    { id:31, label:'web-prod-02',         group:'server', title:'8 vCPU / 32GB RAM' },
    { id:32, label:'db-prod-01',          group:'server', title:'32 vCPU / 256GB RAM' },
    { id:33, label:'load-balancer',       group:'server', title:'F5 BIG-IP | Active' },
];

const ALL_EDGES = [
    // Services → Apps
    {from:1,  to:10, label:'DEPENDS_ON'}, {from:1, to:11, label:'ROUTES_THROUGH'},
    {from:1,  to:13, label:'DEPENDS_ON'}, {from:2, to:11, label:'ROUTES_THROUGH'},
    {from:2,  to:14, label:'DEPENDS_ON'}, {from:2, to:12, label:'DEPENDS_ON'},
    {from:3,  to:16, label:'DEPENDS_ON'}, {from:3, to:10, label:'DEPENDS_ON'},
    // Apps → Apps
    {from:10, to:12, label:'CALLS'},      {from:11, to:12, label:'CALLS'},
    {from:11, to:13, label:'CALLS'},      {from:14, to:15, label:'CALLS'},
    {from:16, to:12, label:'CALLS'},
    // Apps → DBs
    {from:10, to:20, label:'READS'},      {from:13, to:21, label:'WRITES'},
    {from:12, to:22, label:'READS'},      {from:13, to:23, label:'WRITES'},
    {from:14, to:20, label:'READS'},
    // DBs/Apps → Servers
    {from:10, to:30, label:'RUNS_ON'},    {from:11, to:31, label:'RUNS_ON'},
    {from:20, to:32, label:'RUNS_ON'},    {from:21, to:32, label:'RUNS_ON'},
    {from:33, to:30, label:'FORWARDS_TO'},{from:33, to:31, label:'FORWARDS_TO'},
];

const SERVICE_FOCUS = {
    'Online Banking': [1, 10, 11, 12, 13, 20, 21, 22, 23, 30, 31, 32, 33],
    'Mobile App':     [2, 11, 12, 14, 15, 20, 22, 30, 31, 33],
};

let network, nodesDS, edgesDS;

function initNetwork(filterNodeIds) {
    const visNodes = filterNodeIds
        ? ALL_NODES.filter(n => filterNodeIds.includes(n.id))
        : ALL_NODES;
    const visNodeSet = new Set(visNodes.map(n => n.id));
    const visEdges = ALL_EDGES.filter(e => visNodeSet.has(e.from) && visNodeSet.has(e.to));

    nodesDS = new vis.DataSet(visNodes);
    edgesDS = new vis.DataSet(visEdges.map(e => ({
        ...e, arrows:'to', font:{size:9,color:'#666'},
        color:{color:'#aaa'}, smooth:{type:'dynamic'}
    })));

    const options = {
        groups: {
            service: { color:{background:'#F8BBD0',border:'#880E4F'}, shape:'ellipse',    font:{size:13,bold:true}, margin:10 },
            app:     { color:{background:'#BBDEFB',border:'#1565C0'}, shape:'box',        font:{size:11}, margin:8  },
            db:      { color:{background:'#FFE0B2',border:'#E65100'}, shape:'cylinder',   font:{size:11}, margin:8  },
            server:  { color:{background:'#E0E0E0',border:'#424242'}, shape:'square',     font:{size:10}, margin:6  },
        },
        physics: { stabilization:{iterations:150} },
        interaction: { tooltipDelay:200, navigationButtons:true, keyboard:false },
        layout: { randomSeed:7 },
    };

    if (network) {
        network.setData({ nodes:nodesDS, edges:edgesDS });
    } else {
        network = new vis.Network(document.getElementById('diagram'), {nodes:nodesDS,edges:edgesDS}, options);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNetwork(null);

    document.getElementById('btnOnlineBanking').addEventListener('click', () => initNetwork(SERVICE_FOCUS['Online Banking']));
    document.getElementById('btnMobileApp').addEventListener('click', () => initNetwork(SERVICE_FOCUS['Mobile App']));
    document.getElementById('btnAllServices').addEventListener('click', () => initNetwork(null));
    document.getElementById('btnFit').addEventListener('click', () => network && network.fit());
});
