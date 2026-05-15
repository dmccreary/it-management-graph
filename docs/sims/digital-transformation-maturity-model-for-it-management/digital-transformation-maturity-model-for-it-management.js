// CANVAS_HEIGHT: 540
// Digital Transformation Maturity Model for IT Management
// Shows 5-level maturity model across 6 dimensions with gap analysis

const dimensions = [
  'Asset Discovery',
  'Relationship Mapping',
  'Change Detection',
  'Impact Analysis',
  'Compliance Monitoring',
  'Predictive Insights',
];

const levelNames = ['', 'Manual Tracking', 'Database CMDB', 'Automated Discovery', 'Real-Time Graph', 'AI-Enhanced'];
const levelColors = ['', '#ef5350', '#ff7043', '#ffa726', '#66bb6a', '#26a69a'];

// Default: mixed maturity (typical organization in transition)
let currentLevels = [2, 1, 3, 2, 2, 1];

let chart;

function buildSliders() {
  const container = document.getElementById('sliders');
  dimensions.forEach((dim, i) => {
    const row = document.createElement('div');
    row.className = 'dim-row';
    row.innerHTML = `
      <div class="dim-label">
        <span class="name">${dim}</span>
        <span class="level" id="val-${i}">${currentLevels[i]}</span>
      </div>
      <input type="range" min="1" max="5" value="${currentLevels[i]}" id="slider-${i}"
             oninput="onSlider(${i}, this.value)">
      <div>
        <span class="level-badge" id="badge-${i}"
              style="background:${levelColors[currentLevels[i]]}22;color:${levelColors[currentLevels[i]]}">
          ${levelNames[currentLevels[i]]}
        </span>
      </div>`;
    container.appendChild(row);
  });
}

function onSlider(i, val) {
  currentLevels[i] = parseInt(val);
  document.getElementById(`val-${i}`).textContent = val;
  document.getElementById(`badge-${i}`).textContent = levelNames[val];
  document.getElementById(`badge-${i}`).style.background = levelColors[val] + '22';
  document.getElementById(`badge-${i}`).style.color = levelColors[val];
  updateChart();
  updateSummary();
}

function updateChart() {
  chart.data.datasets[0].data = [...currentLevels];
  chart.data.datasets[0].backgroundColor = currentLevels.map(l => levelColors[l] + '88');
  chart.update();
}

function updateSummary() {
  const avg = (currentLevels.reduce((a, b) => a + b, 0) / currentLevels.length).toFixed(1);
  const level = Math.round(avg);
  document.getElementById('overall-score').textContent = `Level ${avg}`;
  document.getElementById('overall-score').style.color = levelColors[level] || '#1a3a6c';
  document.getElementById('overall-label').textContent = levelNames[level] || 'Assessing...';
}

function buildChart() {
  const ctx = document.getElementById('maturity-chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dimensions,
      datasets: [
        {
          label: 'Current Maturity Level',
          data: [...currentLevels],
          backgroundColor: currentLevels.map(l => levelColors[l] + '88'),
          borderColor: currentLevels.map(l => levelColors[l]),
          borderWidth: 2,
          borderRadius: 4,
        },
        {
          label: 'Target (Level 5: AI-Enhanced)',
          data: dimensions.map(() => 5),
          backgroundColor: 'transparent',
          borderColor: '#26a69a',
          borderWidth: 2,
          borderDash: [6, 3],
          type: 'line',
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (ctx.datasetIndex === 0) {
                const lv = ctx.raw;
                return `Level ${lv}: ${levelNames[lv]}`;
              }
              return 'Target: Level 5 (AI-Enhanced)';
            },
          },
        },
      },
      scales: {
        y: {
          min: 0, max: 5,
          ticks: {
            stepSize: 1,
            callback: v => v === 0 ? '' : `L${v}: ${levelNames[v] || ''}`,
            font: { size: 10 },
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: { ticks: { font: { size: 11 } } },
      },
    },
  });
}

buildSliders();
buildChart();
updateSummary();
