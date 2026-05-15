// Automated Discovery Architecture Diagram — vis-network hierarchical
// CANVAS_HEIGHT: 640

document.addEventListener('DOMContentLoaded', function () {
    const nodes = new vis.DataSet([
        // Layer 1 — Data Sources
        { id: 1, label: '🖥️ Infrastructure\n(SNMP, SSH, WMI)',      level: 1, group: 'source_blue'   },
        { id: 2, label: '📦 Applications\n(OpenTelemetry, Logs)',   level: 1, group: 'source_green'  },
        { id: 3, label: '🌐 Network Devices\n(LLDP, NetFlow, BGP)', level: 1, group: 'source_orange' },
        { id: 4, label: '☁️ Cloud Platforms\n(AWS, Azure, GCP APIs)',level: 1, group: 'source_purple' },
        { id: 5, label: '🔗 Service Meshes\n(Istio, Linkerd)',       level: 1, group: 'source_teal'   },

        // Layer 2 — Collection
        { id: 11, label: '📡 OpenTelemetry\nCollector',  level: 2, group: 'collector' },
        { id: 12, label: '🔬 eBPF\nAgents',              level: 2, group: 'collector' },
        { id: 13, label: '🛰️ Network\nScanners',         level: 2, group: 'collector' },
        { id: 14, label: '☁️ Cloud\nDiscovery',          level: 2, group: 'collector' },
        { id: 15, label: '🤖 Agent\nFramework',          level: 2, group: 'collector' },

        // Layer 3 — Processing
        { id: 21, label: '🔗 Correlation\nEngine',       level: 3, group: 'processing' },
        { id: 22, label: '↔️ Dependency\nMapper',         level: 3, group: 'processing' },
        { id: 23, label: '△ Change\nDetector',           level: 3, group: 'processing' },
        { id: 24, label: '+ Enrichment\nService',        level: 3, group: 'processing' },

        // Layer 4 — Core Graph
        { id: 31, label: '🌐 IT Management Graph\n(Central Repository)',
          level: 4, group: 'graph', widthConstraint: { minimum: 240 } },

        // Layer 5 — Consumers
        { id: 41, label: '🔒 Security\nTools',           level: 5, group: 'consumer' },
        { id: 42, label: '🛠️ ITSM\nPlatforms',          level: 5, group: 'consumer' },
        { id: 43, label: '📊 Analytics &\nDashboards',   level: 5, group: 'consumer' },
        { id: 44, label: '🤖 AI/ML\nPipelines',          level: 5, group: 'consumer' },
    ]);

    const edges = new vis.DataSet([
        // Sources → Collectors
        { from: 1, to: 11, label: 'Metrics' },
        { from: 2, to: 11, label: 'Traces' },
        { from: 5, to: 11, label: 'Events' },
        { from: 1, to: 12, label: 'eBPF' },
        { from: 3, to: 12 },
        { from: 3, to: 13, label: 'Scans' },
        { from: 4, to: 14, label: 'APIs' },
        { from: 1, to: 15, label: 'Agents' },

        // Collectors → Processing
        { from: 11, to: 21 }, { from: 11, to: 22 },
        { from: 12, to: 21 }, { from: 12, to: 23 },
        { from: 13, to: 22 }, { from: 14, to: 24 },
        { from: 15, to: 21 },

        // Processing → Graph
        { from: 21, to: 31, width: 2 },
        { from: 22, to: 31, width: 2 },
        { from: 23, to: 31, width: 2 },
        { from: 24, to: 31, width: 2 },

        // Graph → Consumers
        { from: 31, to: 41 }, { from: 31, to: 42 },
        { from: 31, to: 43 }, { from: 31, to: 44 },
    ]);

    const options = {
        layout: { hierarchical: { enabled: true, levelSeparation: 110, nodeSpacing: 90,
            direction: 'UD', sortMethod: 'directed', blockShifting: true } },
        physics: { enabled: false },
        groups: {
            source_blue:   { color: { background: '#BBDEFB', border: '#1565C0' }, font: { size: 11 }, shape: 'box', margin: 8 },
            source_green:  { color: { background: '#C8E6C9', border: '#2E7D32' }, font: { size: 11 }, shape: 'box', margin: 8 },
            source_orange: { color: { background: '#FFE0B2', border: '#E65100' }, font: { size: 11 }, shape: 'box', margin: 8 },
            source_purple: { color: { background: '#E1BEE7', border: '#6A1B9A' }, font: { size: 11 }, shape: 'box', margin: 8 },
            source_teal:   { color: { background: '#B2EBF2', border: '#00695C' }, font: { size: 11 }, shape: 'box', margin: 8 },
            collector:     { color: { background: '#FFF9C4', border: '#F9A825' }, font: { size: 11 }, shape: 'box', margin: 8 },
            processing:    { color: { background: '#FCE4EC', border: '#880E4F' }, font: { size: 11 }, shape: 'box', margin: 8 },
            graph:         { color: { background: '#FFD700', border: '#F9A825' }, font: { size: 13, bold: true }, shape: 'box', margin: 12 },
            consumer:      { color: { background: '#E8F5E9', border: '#388E3C' }, font: { size: 11 }, shape: 'box', margin: 8 },
        },
        nodes: { shadow: { enabled: true, size: 3 }, borderWidth: 1.5 },
        edges: { arrows: 'to', color: { color: '#888' }, font: { size: 9, color: '#555' },
                 smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.3 } },
        interaction: { navigationButtons: true, keyboard: false },
    };

    new vis.Network(document.getElementById('diagram'), { nodes, edges }, options);
});
