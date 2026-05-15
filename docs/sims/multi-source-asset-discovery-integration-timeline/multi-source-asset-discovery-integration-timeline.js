// Multi-Source Asset Discovery Integration Timeline
// CANVAS_HEIGHT: 520

const events = [
  {
    id: 1, group: 1,
    content: '1990: Manual Inventory',
    start: '1990-01-01', end: '1995-01-01',
    className: 'red',
    title: '1990: Manual inventory spreadsheets',
    detail: 'IT staff physically inventory equipment with serial numbers recorded in Excel. Update frequency: annually or when problems arise. Tools: pen, paper, spreadsheets.'
  },
  {
    id: 2, group: 1,
    content: '1995: Barcode Scanning',
    start: '1995-01-01', end: '2000-01-01',
    className: 'red',
    title: '1995: Barcode scanning and asset tags',
    detail: 'Physical asset tags with barcodes enable faster inventory counts. Still manual but more systematic. CMDB databases emerge to store asset records.'
  },
  {
    id: 3, group: 2,
    content: '2000: Network Discovery (Nmap)',
    start: '2000-01-01', end: '2005-01-01',
    className: 'orange',
    title: '2000: Network discovery tools (Nmap, enterprise scanners)',
    detail: 'Automated network scanning identifies active devices by IP address. Detects hardware but limited software visibility. Discovery frequency: weekly.'
  },
  {
    id: 4, group: 2,
    content: '2005: Agent-Based Inventory',
    start: '2005-01-01', end: '2010-01-01',
    className: 'orange',
    title: '2005: Agent-based inventory solutions',
    detail: 'Software agents installed on endpoints report hardware specs, installed software, and configuration to central servers. Real-time updates for managed devices.'
  },
  {
    id: 5, group: 3,
    content: '2010: Agentless Discovery (WMI/SSH)',
    start: '2010-01-01', end: '2013-01-01',
    className: 'gold',
    title: '2010: Agentless discovery and WMI/SSH',
    detail: 'Tools leverage Windows Management Instrumentation and SSH to remotely inventory devices without agent installation. Reduces deployment complexity.'
  },
  {
    id: 6, group: 3,
    content: '2012: Cloud API Integration',
    start: '2012-01-01', end: '2016-01-01',
    className: 'gold',
    title: '2012: Cloud API integration begins',
    detail: 'Early AWS/Azure API connectors pull virtual machine and storage inventory into asset databases. Cloud resources become visible alongside on-premises.'
  },
  {
    id: 7, group: 3,
    content: '2015: SaaS Discovery (SSO)',
    start: '2015-01-01', end: '2018-01-01',
    className: 'gold',
    title: '2015: SaaS discovery through SSO logs',
    detail: 'Organizations discover shadow SaaS usage by analyzing SSO authentication logs and network traffic patterns. Reveals unsanctioned applications.'
  },
  {
    id: 8, group: 4,
    content: '2018: Observability Integration',
    start: '2018-01-01', end: '2021-01-01',
    className: 'green',
    title: '2018: Observability tool integration (OpenTelemetry precursors)',
    detail: 'APM and observability platforms map application dependencies through distributed tracing. Asset discovery merges with dependency mapping.'
  },
  {
    id: 9, group: 4,
    content: '2020: eBPF Kernel Telemetry',
    start: '2020-01-01', end: '2023-01-01',
    className: 'green',
    title: '2020: eBPF and kernel-level telemetry',
    detail: 'Extended Berkeley Packet Filter enables deep visibility into system calls, network connections, and process execution without traditional agents.'
  },
  {
    id: 10, group: 4,
    content: '2023: Graph-Based Reconciliation',
    start: '2023-01-01', end: '2025-01-01',
    className: 'green',
    title: '2023: Graph-based multi-source reconciliation',
    detail: 'IT management graphs integrate network discovery, cloud APIs, software metering, financial systems, and observability into unified asset inventory with automated entity resolution.'
  },
  {
    id: 11, group: 4,
    content: '2025: AI-Assisted Discovery',
    start: '2025-01-01', end: '2026-01-01',
    className: 'green',
    title: '2025: AI-assisted discovery and classification',
    detail: 'Machine learning models automatically classify discovered assets, predict relationships, and identify anomalies. Continuous real-time inventory becomes standard practice.'
  }
];

const groups = [
  { id: 1, content: '<span style="font-weight:700;color:#c62828">Manual Era</span>' },
  { id: 2, content: '<span style="font-weight:700;color:#e65100">Network Discovery</span>' },
  { id: 3, content: '<span style="font-weight:700;color:#ff8f00">Cloud Integration</span>' },
  { id: 4, content: '<span style="font-weight:700;color:#2e7d32">Graph & Observability</span>' }
];

const items = new vis.DataSet(events);
const groupData = new vis.DataSet(groups);

const options = {
  start: '1988-01-01',
  end: '2027-01-01',
  min: '1988-01-01',
  max: '2027-01-01',
  moveable: true,
  zoomable: true,
  selectable: true,
  orientation: { axis: 'top' },
  tooltip: { followMouse: true, overflowMethod: 'cap' },
  stack: false,
  groupOrder: 'id',
  showCurrentTime: true,
  height: '100%',
  margin: { item: { horizontal: 4, vertical: 4 } }
};

const container = document.getElementById('timeline');
const timeline = new vis.Timeline(container, items, groupData, options);

timeline.on('select', (props) => {
  if (!props.items || props.items.length === 0) return;
  const item = events.find(e => e.id === props.items[0]);
  if (!item) return;
  const colorMap = { red: '#c62828', orange: '#e65100', gold: '#ff8f00', green: '#2e7d32' };
  const color = colorMap[item.className] || '#1a3a6c';
  document.getElementById('info-panel').innerHTML = `
    <h3 style="color:${color}">${item.title}</h3>
    <p>${item.detail}</p>
  `;
});

timeline.on('click', (props) => {
  if (!props.item) return;
  const item = events.find(e => e.id === props.item);
  if (!item) return;
  const colorMap = { red: '#c62828', orange: '#e65100', gold: '#ff8f00', green: '#2e7d32' };
  const color = colorMap[item.className] || '#1a3a6c';
  document.getElementById('info-panel').innerHTML = `
    <h3 style="color:${color}">${item.title}</h3>
    <p>${item.detail}</p>
  `;
});
