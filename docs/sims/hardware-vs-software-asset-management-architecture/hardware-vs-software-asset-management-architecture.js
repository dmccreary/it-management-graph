// Hardware vs Software Asset Management Architecture
// CANVAS_HEIGHT: 560
// vis-network hierarchical showing parallel flows for HW and SW asset management

const nodes = new vis.DataSet([
  // Shared top: Financial Systems
  { id: 'erp',      label: 'ERP / Financial\nSystems',     group: 'shared', level: 0, title: 'Procurement, accounts payable, budgeting' },

  // Hardware flow (left)
  { id: 'hw-proc',  label: 'Hardware\nProcurement',        group: 'hw',     level: 1, title: 'PO creation, vendor management, delivery tracking' },
  { id: 'hw-asset', label: 'Asset\nRegistration',          group: 'hw',     level: 2, title: 'Assign asset tag, serial number, location, owner' },
  { id: 'hw-disc',  label: 'Network\nDiscovery',           group: 'hw',     level: 3, title: 'Automated scan: IP, MAC, OS, installed software' },
  { id: 'hw-cmdb',  label: 'CMDB\nConfiguration Item',     group: 'hw',     level: 4, title: 'CI record with attributes and relationships in graph DB' },

  // Central IT Management Graph
  { id: 'graph',    label: 'IT Management\nGraph',         group: 'core',   level: 5, title: 'Central knowledge graph linking all asset types, relationships, and dependencies' },

  // Software flow (right)
  { id: 'sw-lic',   label: 'License\nAcquisition',         group: 'sw',     level: 1, title: 'Vendor contracts, entitlement records, seat counts' },
  { id: 'sw-dep',   label: 'Software\nDeployment',         group: 'sw',     level: 2, title: 'Installation tracking, version management, patch level' },
  { id: 'sw-met',   label: 'Usage\nMetering',              group: 'sw',     level: 3, title: 'Track actual usage vs. licensed seats; identify shelfware' },
  { id: 'sw-comp',  label: 'License\nCompliance',          group: 'sw',     level: 4, title: 'Compare deployed vs. licensed; generate audit reports' },

  // Shared bottom
  { id: 'report',   label: 'Reporting &\nAnalytics',       group: 'shared', level: 6, title: 'Dashboards, cost allocation, risk reporting, audits' },
]);

const edges = new vis.DataSet([
  // Hardware chain
  { from: 'erp', to: 'hw-proc', label: 'PO / Invoice' },
  { from: 'hw-proc', to: 'hw-asset', label: 'Receive' },
  { from: 'hw-asset', to: 'hw-disc', label: 'Deploy' },
  { from: 'hw-disc', to: 'hw-cmdb', label: 'Discover' },
  { from: 'hw-cmdb', to: 'graph', label: 'Sync CI' },

  // Software chain
  { from: 'erp', to: 'sw-lic', label: 'Purchase' },
  { from: 'sw-lic', to: 'sw-dep', label: 'Entitle' },
  { from: 'sw-dep', to: 'sw-met', label: 'Install' },
  { from: 'sw-met', to: 'sw-comp', label: 'Measure' },
  { from: 'sw-comp', to: 'graph', label: 'Sync License' },

  // Both to reporting
  { from: 'graph', to: 'report', label: 'Query' },
]);

const GROUP_COLORS = {
  hw:     { background: '#cfe2ff', border: '#0d6efd' },
  sw:     { background: '#d1e7dd', border: '#198754' },
  core:   { background: '#fff3cd', border: '#ffc107' },
  shared: { background: '#e2cfff', border: '#6f42c1' },
};

window.addEventListener('load', () => {
  const container = document.getElementById('net');
  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        direction: 'UD',
        sortMethod: 'directed',
        levelSeparation: 80,
        nodeSpacing: 160,
      }
    },
    physics: { enabled: false },
    nodes: {
      shape: 'box',
      borderWidth: 2,
      font: { size: 12 },
      margin: 8,
    },
    edges: {
      arrows: 'to',
      font: { size: 10, align: 'middle' },
      smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 },
    },
    interaction: { hover: true, tooltipDelay: 200 },
    groups: {
      hw:     { color: GROUP_COLORS.hw },
      sw:     { color: GROUP_COLORS.sw },
      core:   { color: GROUP_COLORS.core },
      shared: { color: GROUP_COLORS.shared },
    }
  };

  const network = new vis.Network(container, { nodes, edges }, options);

  // Build legend
  const legend = document.getElementById('legend');
  const items = [
    { label: 'Financial / Reporting', color: GROUP_COLORS.shared },
    { label: 'Hardware Flow', color: GROUP_COLORS.hw },
    { label: 'Software Flow', color: GROUP_COLORS.sw },
    { label: 'IT Management Graph', color: GROUP_COLORS.core },
  ];
  items.forEach(item => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:12px;';
    div.innerHTML = `<span style="display:inline-block;width:16px;height:16px;border-radius:3px;background:${item.color.background};border:2px solid ${item.color.border}"></span>${item.label}`;
    legend.appendChild(div);
  });
});
