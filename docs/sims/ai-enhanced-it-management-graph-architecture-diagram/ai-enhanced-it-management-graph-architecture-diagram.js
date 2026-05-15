// AI-Enhanced IT Management Graph Architecture Diagram
// CANVAS_HEIGHT: 660

document.addEventListener('DOMContentLoaded', function () {
    const nodes = new vis.DataSet([
        // Layer 1 — Data Sources
        { id: 1, label: '📡\nAutomated\nDiscovery',    level: 1, group: 'source' },
        { id: 2, label: '📊\nMonitoring &\nTelemetry', level: 1, group: 'source' },
        { id: 3, label: '🗄️\nCMDB\nData',             level: 1, group: 'source' },
        { id: 4, label: '📄\nChange\nRecords',         level: 1, group: 'source' },
        { id: 5, label: '🚨\nIncident\nHistory',       level: 1, group: 'source' },
        { id: 6, label: '📚\nDocumentation',           level: 1, group: 'source' },

        // Layer 2 — Core IT Management Graph
        { id: 10, label: '🌐  IT Management Graph\nNodes: Assets & Services\nEdges: Dependencies & Relationships',
          level: 2, group: 'core', shape: 'box', widthConstraint: { minimum: 280 } },

        // Layer 3 — AI/ML components
        { id: 21, label: '🔍\nData Quality AI\n• Anomaly detection\n• Duplicate resolution\n• Relationship inference',
          level: 3, group: 'ai_blue' },
        { id: 22, label: '📈\nPredictive Analytics\n• Failure prediction\n• Capacity forecasting\n• Change risk scoring',
          level: 3, group: 'ai_green' },
        { id: 23, label: '💡\nIntelligent Recommendations\n• Optimization opportunities\n• Consolidation candidates\n• Security prioritization',
          level: 3, group: 'ai_purple' },
        { id: 24, label: '🔗\nImpact Analysis AI\n• Conditional dependencies\n• Business impact\n• Alternative paths',
          level: 3, group: 'ai_orange' },

        // Side — ML Models
        { id: 31, label: '🧠 Anomaly Detection',   level: 3, group: 'ml' },
        { id: 32, label: '🌳 Classification',      level: 3, group: 'ml' },
        { id: 33, label: '📉 Time Series',         level: 3, group: 'ml' },
        { id: 34, label: '📝 NLP Models',          level: 3, group: 'ml' },
        { id: 35, label: '🔄 Entity Resolution',   level: 3, group: 'ml' },

        // Side — Human Interface
        { id: 41, label: '🖥️ Analyst Dashboard\n(Accept/Reject)', level: 3, group: 'human' },
        { id: 42, label: '🤖 Automated Actions\n(High-confidence)', level: 3, group: 'human' },
        { id: 43, label: '🔁 Feedback Loop\n(Model retraining)', level: 3, group: 'human' },
    ]);

    const edges = new vis.DataSet([
        // Data sources → Core Graph (blue, data ingestion)
        { from: 1, to: 10, color: { color: '#2196F3' }, arrows: 'to', width: 2 },
        { from: 2, to: 10, color: { color: '#2196F3' }, arrows: 'to', width: 2 },
        { from: 3, to: 10, color: { color: '#2196F3' }, arrows: 'to', width: 2 },
        { from: 4, to: 10, color: { color: '#2196F3' }, arrows: 'to', width: 2 },
        { from: 5, to: 10, color: { color: '#2196F3' }, arrows: 'to', width: 2 },
        { from: 6, to: 10, color: { color: '#2196F3' }, arrows: 'to', width: 2 },

        // Core Graph ↔ AI components (gold queries down, green insights up)
        { from: 10, to: 21, color: { color: '#FFD700' }, arrows: 'to;from', width: 2 },
        { from: 10, to: 22, color: { color: '#FFD700' }, arrows: 'to;from', width: 2 },
        { from: 10, to: 23, color: { color: '#FFD700' }, arrows: 'to;from', width: 2 },
        { from: 10, to: 24, color: { color: '#FFD700' }, arrows: 'to;from', width: 2 },

        // ML Models ↔ AI components (purple dashed, training)
        { from: 31, to: 21, dashes: true, color: { color: '#9C27B0' }, arrows: 'to;from' },
        { from: 32, to: 22, dashes: true, color: { color: '#9C27B0' }, arrows: 'to;from' },
        { from: 33, to: 22, dashes: true, color: { color: '#9C27B0' }, arrows: 'to;from' },
        { from: 34, to: 23, dashes: true, color: { color: '#9C27B0' }, arrows: 'to;from' },
        { from: 35, to: 21, dashes: true, color: { color: '#9C27B0' }, arrows: 'to;from' },

        // Human Interface ↔ AI components (green, insights / orange, feedback)
        { from: 41, to: 23, color: { color: '#4CAF50' }, arrows: 'to;from', width: 2 },
        { from: 42, to: 24, color: { color: '#4CAF50' }, arrows: 'to;from', width: 2 },
        { from: 43, to: 21, color: { color: '#FF9800' }, arrows: 'to;from', width: 2 },
        { from: 43, to: 22, color: { color: '#FF9800' }, arrows: 'to;from', width: 2 },
    ]);

    const options = {
        layout: { hierarchical: { enabled: true, levelSeparation: 140, nodeSpacing: 100,
            direction: 'UD', sortMethod: 'directed' } },
        physics: { enabled: false },
        groups: {
            source:    { color: { background: '#E0E0E0', border: '#9E9E9E' }, font: { size: 12 }, shape: 'box', margin: 8 },
            core:      { color: { background: '#FFD700', border: '#F9A825' }, font: { size: 14, bold: true }, shape: 'box', margin: 12 },
            ai_blue:   { color: { background: '#BBDEFB', border: '#1565C0' }, font: { size: 11 }, shape: 'box', margin: 8 },
            ai_green:  { color: { background: '#C8E6C9', border: '#2E7D32' }, font: { size: 11 }, shape: 'box', margin: 8 },
            ai_purple: { color: { background: '#E1BEE7', border: '#6A1B9A' }, font: { size: 11 }, shape: 'box', margin: 8 },
            ai_orange: { color: { background: '#FFE0B2', border: '#E65100' }, font: { size: 11 }, shape: 'box', margin: 8 },
            ml:        { color: { background: '#E6D5F0', border: '#7B1FA2' }, font: { size: 11 }, shape: 'box', margin: 6 },
            human:     { color: { background: '#D5F0D5', border: '#388E3C' }, font: { size: 11 }, shape: 'box', margin: 6 },
        },
        nodes: { borderWidth: 1.5, shadow: { enabled: true, size: 4 }, borderWidthSelected: 3 },
        edges: { smooth: { type: 'curvedCW', roundness: 0.2 } },
        interaction: { tooltipDelay: 200, navigationButtons: true, keyboard: false },
    };

    const network = new vis.Network(document.getElementById('diagram'), { nodes, edges }, options);
});
