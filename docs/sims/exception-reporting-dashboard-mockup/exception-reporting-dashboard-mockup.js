// CANVAS_HEIGHT: 520
// Exception Reporting Dashboard Mockup
// 3-panel IT governance dashboard using Chart.js

// --- Donut Chart: Severity Distribution ---
new Chart(document.getElementById('donut-chart'), {
  type: 'doughnut',
  data: {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [12, 63, 142, 30],
      backgroundColor: ['#e53935', '#e67e22', '#f39c12', '#95a5a6'],
      borderWidth: 2,
      borderColor: '#fff',
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: { font: { size: 10 }, padding: 8, boxWidth: 12 },
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.raw} (${Math.round(ctx.raw/247*100)}%)`,
        },
      },
    },
    cutout: '58%',
  },
});

// --- Horizontal Bar Chart: Top Violated Rules ---
const ruleLabels = [
  'No monitoring agents',
  'Single point of failure',
  'EOL software in prod',
  'Unencrypted prod DB',
  'Direct app→DB connect',
  'Missing svc ownership',
  'Unpatched >30 days',
  'No redundancy: critical',
  'Dev/prod separation',
  'GDPR data outside EU',
];
const ruleValues = [45, 38, 27, 22, 18, 16, 15, 14, 11, 8];
const ruleColors = [
  '#e67e22','#e67e22','#e53935','#e53935','#e53935',
  '#f39c12','#f39c12','#e67e22','#f39c12','#e53935',
];

new Chart(document.getElementById('bar-chart'), {
  type: 'bar',
  data: {
    labels: ruleLabels,
    datasets: [{
      label: 'Violations',
      data: ruleValues,
      backgroundColor: ruleColors,
      borderRadius: 3,
    }],
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { title: ctx => ruleLabels[ctx[0].dataIndex] } },
    },
    scales: {
      x: { ticks: { font: { size: 9 } }, grid: { color: 'rgba(0,0,0,0.06)' } },
      y: { ticks: { font: { size: 9 } } },
    },
  },
});

// --- Line Chart: 12-Month Trend ---
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// Stacked values: Critical, High, Medium, Low — show downward trend
const critical = [18, 17, 15, 14, 14, 13, 13, 12, 12, 13, 12, 12];
const high      = [80, 78, 75, 70, 68, 65, 62, 60, 58, 60, 61, 63];
const medium    = [170,165,160,152,148,145,142,140,138,140,141,142];
const low       = [42, 40, 38, 36, 34, 33, 32, 31, 30, 30, 30, 30];

new Chart(document.getElementById('line-chart'), {
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        label: 'Critical',
        data: critical,
        borderColor: '#e53935',
        backgroundColor: 'rgba(229,57,53,0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'High',
        data: high,
        borderColor: '#e67e22',
        backgroundColor: 'rgba(230,126,34,0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Medium',
        data: medium,
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243,156,18,0.10)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Low',
        data: low,
        borderColor: '#95a5a6',
        backgroundColor: 'rgba(149,165,166,0.10)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 9 }, boxWidth: 10, padding: 6 } },
      annotation: {},
    },
    scales: {
      x: { ticks: { font: { size: 9 } } },
      y: { ticks: { font: { size: 9 } }, grid: { color: 'rgba(0,0,0,0.06)' } },
    },
    interaction: { mode: 'index', intersect: false },
  },
});
