// CANVAS_HEIGHT: 520
// Data Quality Dimensions Radar Chart - IT Management Data Health Assessment
// Shows 6 data quality dimensions before vs after graph-based IT management

const dimensions = ['Completeness', 'Accuracy', 'Timeliness', 'Consistency', 'Validity', 'Uniqueness'];

const presets = {
  before: [42, 55, 28, 38, 61, 70],   // Legacy CMDB scores
  after:  [88, 91, 95, 86, 93, 97],   // Graph-based system scores
};

const descriptions = {
  Completeness: 'All required attributes populated for CI records',
  Accuracy:     'CI data matches actual infrastructure state',
  Timeliness:   'Data is current and reflects real-time state',
  Consistency:  'Same CI represented consistently across systems',
  Validity:     'Data conforms to defined formats and constraints',
  Uniqueness:   'No duplicate CI records in the repository',
};

let currentValues = [...presets.before];
let baselineValues = [...presets.before];
let chart;

function buildSliders() {
  const container = document.getElementById('sliders');
  dimensions.forEach((dim, i) => {
    const row = document.createElement('div');
    row.className = 'dim-row';
    row.innerHTML = `
      <div class="dim-label">
        <span title="${descriptions[dim]}">${dim}</span>
        <span id="val-${i}">${currentValues[i]}</span>
      </div>
      <input type="range" min="0" max="100" value="${currentValues[i]}" id="slider-${i}"
             oninput="onSlider(${i}, this.value)">`;
    container.appendChild(row);
  });
}

function onSlider(i, val) {
  currentValues[i] = parseInt(val);
  document.getElementById(`val-${i}`).textContent = val;
  updateChart();
  updateScore();
}

function loadPreset(name) {
  const vals = presets[name];
  if (name === 'before') baselineValues = [...vals];
  currentValues = [...vals];
  dimensions.forEach((_, i) => {
    document.getElementById(`slider-${i}`).value = vals[i];
    document.getElementById(`val-${i}`).textContent = vals[i];
  });
  updateChart();
  updateScore();
}

function updateChart() {
  chart.data.datasets[0].data = [...currentValues];
  chart.update();
}

function updateScore() {
  const score = Math.round(currentValues.reduce((a, b) => a + b, 0) / dimensions.length);
  const baseline = Math.round(baselineValues.reduce((a, b) => a + b, 0) / dimensions.length);
  document.getElementById('score-val').textContent = score;
  const diff = score - baseline;
  const el = document.getElementById('delta-txt');
  if (diff > 0) {
    el.textContent = `▲ +${diff} vs baseline`;
    el.className = 'delta pos';
  } else if (diff < 0) {
    el.textContent = `▼ ${diff} vs baseline`;
    el.className = 'delta neg';
  } else {
    el.textContent = 'At baseline';
    el.className = 'delta';
  }
}

function buildChart() {
  const ctx = document.getElementById('radar-chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: dimensions,
      datasets: [
        {
          label: 'Current / After Graph',
          data: [...currentValues],
          backgroundColor: 'rgba(67, 160, 71, 0.25)',
          borderColor: '#43a047',
          borderWidth: 2.5,
          pointBackgroundColor: '#43a047',
          pointRadius: 5,
        },
        {
          label: 'Before Graph (Legacy CMDB)',
          data: [...presets.before],
          backgroundColor: 'rgba(229, 57, 53, 0.15)',
          borderColor: '#e53935',
          borderWidth: 2,
          borderDash: [6, 3],
          pointBackgroundColor: '#e53935',
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.raw}/100`,
          },
        },
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 20, font: { size: 10 } },
          pointLabels: { font: { size: 12 }, color: '#1a3a6c' },
          grid: { color: 'rgba(0,0,0,0.08)' },
        },
      },
    },
  });
}

buildSliders();
buildChart();
loadPreset('before');
updateScore();
