// TCO Comparison Chart: Three Options Over Five Years - Chart.js MicroSim
// CANVAS_HEIGHT: 520

const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];

// --- Raw data by component per vendor ---
const data = {
  servicenow: {
    licenses:    [20000, 22000, 24000, 26000, 29000],
    infra:       [12000, 13000, 14000, 15000, 16000],
    personnel:   [180000, 60000, 60000, 65000, 65000],
    impl:        [150000, 30000, 30000, 35000, 35000],
    training:    [25000, 5000, 5000, 5000, 5000]
  },
  atlassian: {
    licenses:    [10000, 11000, 12000, 13000, 14000],
    infra:       [6000, 7000, 8000, 9000, 10000],
    personnel:   [80000, 36000, 36000, 40000, 40000],
    impl:        [80000, 20000, 20000, 25000, 25000],
    training:    [15000, 3000, 3000, 3000, 3000]
  },
  custom: {
    licenses:    [75000, 80000, 85000, 90000, 95000],
    infra:       [20000, 22000, 24000, 26000, 28000],
    personnel:   [360000, 120000, 120000, 130000, 130000],
    impl:        [0, 40000, 40000, 45000, 45000],
    training:    [10000, 5000, 5000, 5000, 5000]
  }
};

// Cumulative TCO lines
const cumSN = [387000, 517000, 650000, 796000, 946000];
const cumAT = [191000, 268000, 347000, 437000, 529000];
const cumCB = [505000, 772000, 1046000, 1342000, 1645000];

// Color palettes for each vendor (5 shades)
const colors = {
  servicenow: [
    'rgba(25, 80, 180, 0.9)',   // licenses
    'rgba(45, 110, 210, 0.85)', // infra
    'rgba(70, 140, 230, 0.8)',  // personnel
    'rgba(100, 170, 240, 0.75)',// impl
    'rgba(160, 200, 255, 0.7)' // training
  ],
  atlassian: [
    'rgba(30, 140, 60, 0.9)',
    'rgba(50, 170, 80, 0.85)',
    'rgba(80, 200, 110, 0.8)',
    'rgba(120, 220, 140, 0.75)',
    'rgba(170, 240, 180, 0.7)'
  ],
  custom: [
    'rgba(200, 80, 20, 0.9)',
    'rgba(220, 110, 40, 0.85)',
    'rgba(240, 140, 60, 0.8)',
    'rgba(250, 170, 90, 0.75)',
    'rgba(255, 210, 150, 0.7)'
  ]
};

// Build datasets for grouped stacked bars
// Chart.js stacked group uses 'stack' property
function buildDatasets(visible) {
  const components = ['licenses', 'infra', 'personnel', 'impl', 'training'];
  const labels = ['Licenses', 'Infrastructure', 'Personnel', 'Impl/Enhancement', 'Training & Support'];
  const checkIds = ['chk-licenses', 'chk-infra', 'chk-personnel', 'chk-impl', 'chk-training'];

  const datasets = [];

  const vendors = [
    { key: 'servicenow', label: 'ServiceNow', stack: 'sn', cols: colors.servicenow, cum: cumSN, lineColor: 'rgba(25,80,180,1)' },
    { key: 'atlassian', label: 'Atlassian', stack: 'at', cols: colors.atlassian, cum: cumAT, lineColor: 'rgba(30,140,60,1)' },
    { key: 'custom', label: 'Custom Build', stack: 'cb', cols: colors.custom, cum: cumCB, lineColor: 'rgba(200,80,20,1)' }
  ];

  vendors.forEach(v => {
    components.forEach((comp, ci) => {
      if (!visible[checkIds[ci]]) return;
      datasets.push({
        type: 'bar',
        label: `${v.label}: ${labels[ci]}`,
        data: data[v.key][comp],
        backgroundColor: v.cols[ci],
        stack: v.stack,
        borderWidth: 0,
        order: 2
      });
    });
  });

  // Cumulative TCO lines
  vendors.forEach(v => {
    datasets.push({
      type: 'line',
      label: `${v.label} Cumulative TCO`,
      data: v.cum,
      borderColor: v.lineColor,
      backgroundColor: 'transparent',
      borderWidth: 3,
      pointStyle: 'circle',
      pointRadius: 6,
      pointBackgroundColor: v.lineColor,
      tension: 0.3,
      yAxisID: 'y',
      stack: undefined,
      order: 1
    });
  });

  return datasets;
}

function getVisible() {
  const ids = ['chk-licenses', 'chk-infra', 'chk-personnel', 'chk-impl', 'chk-training'];
  const v = {};
  ids.forEach(id => {
    const el = document.getElementById(id);
    v[id] = el ? el.checked : true;
  });
  return v;
}

const ctx = document.getElementById('tcoChart').getContext('2d');

const chart = new Chart(ctx, {
  data: {
    labels: years,
    datasets: buildDatasets(getVisible())
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          filter: (item) => item.text.includes('Cumulative') || item.text.endsWith('Licenses'),
          font: { size: 11 },
          boxWidth: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return `${ctx.dataset.label}: $${val >= 1000000 ? (val/1000000).toFixed(2)+'M' : (val/1000).toFixed(0)+'K'}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } }
      },
      y: {
        beginAtZero: true,
        max: 1800000,
        title: { display: true, text: 'Cost (USD)', font: { size: 12 } },
        ticks: {
          callback: v => '$' + (v >= 1000000 ? (v/1000000).toFixed(1)+'M' : (v/1000)+'K'),
          font: { size: 11 }
        },
        grid: { color: 'rgba(0,0,0,0.07)' }
      }
    }
  }
});

// Wire up checkboxes
['chk-licenses', 'chk-infra', 'chk-personnel', 'chk-impl', 'chk-training'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('change', () => {
      chart.data.datasets = buildDatasets(getVisible());
      chart.update();
    });
  }
});
