// Native Graph Storage vs Graph Layer Performance Comparison
// CANVAS_HEIGHT: 500

const hops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const TIMEOUT_VAL = 60000; // display cap for timeout

const nativeData = [4, 7, 11, 14, 18, 21, 25, 28, 32, 35];
const rdbmsData = [12, 145, 1400, 8500, 35000, TIMEOUT_VAL, TIMEOUT_VAL, TIMEOUT_VAL, TIMEOUT_VAL, TIMEOUT_VAL];
const docData = [18, 210, 2100, 12000, 48000, TIMEOUT_VAL, TIMEOUT_VAL, TIMEOUT_VAL, TIMEOUT_VAL, TIMEOUT_VAL];

const rdbmsLabels = [12, 145, 1400, 8500, 35000, 'TIMEOUT', 'TIMEOUT', 'TIMEOUT', 'TIMEOUT', 'TIMEOUT'];
const docLabels = [18, 210, 2100, 12000, 48000, 'TIMEOUT', 'TIMEOUT', 'TIMEOUT', 'TIMEOUT', 'TIMEOUT'];

let isLog = true;

const ctx = document.getElementById('chart').getContext('2d');

function makeChart(logScale) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: hops,
      datasets: [
        {
          label: 'Native Graph (Neo4j)',
          data: nativeData,
          borderColor: 'rgba(76,175,80,1)',
          backgroundColor: 'rgba(76,175,80,0.1)',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(76,175,80,1)'
        },
        {
          label: 'Graph Layer on RDBMS (PostgreSQL + AGE)',
          data: rdbmsData,
          borderColor: 'rgba(255,152,0,1)',
          backgroundColor: 'rgba(255,152,0,0.1)',
          borderWidth: 2.5,
          borderDash: [6, 4],
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(255,152,0,1)'
        },
        {
          label: 'Graph Layer on Document Store (MongoDB)',
          data: docData,
          borderColor: 'rgba(33,150,243,1)',
          backgroundColor: 'rgba(33,150,243,0.08)',
          borderWidth: 2,
          borderDash: [3, 3],
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(33,150,243,1)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { size: 12 }, padding: 10 }
        },
        tooltip: {
          callbacks: {
            title: ctx => `${ctx[0].label} hop${ctx[0].label > 1 ? 's' : ''}`,
            label: ctx => {
              const ds = ctx.datasetIndex;
              const hop = ctx.dataIndex;
              if (ds === 0) return `Native: ${nativeData[hop]}ms`;
              if (ds === 1) return `RDBMS Layer: ${rdbmsLabels[hop]}${typeof rdbmsLabels[hop] === 'number' ? 'ms' : ''}`;
              return `Document Layer: ${docLabels[hop]}${typeof docLabels[hop] === 'number' ? 'ms' : ''}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Number of Hops', font: { size: 13 } },
          ticks: { callback: v => `${v} hop${v > 1 ? 's' : ''}` },
          grid: { color: 'rgba(0,0,0,0.06)' }
        },
        y: {
          type: logScale ? 'logarithmic' : 'linear',
          min: logScale ? 1 : 0,
          max: logScale ? 100000 : 65000,
          title: { display: true, text: 'Query Response Time (ms)', font: { size: 13 } },
          ticks: {
            callback: val => {
              if (val >= 60000) return 'TIMEOUT';
              if (val >= 1000) return (val / 1000).toFixed(val === 1000 ? 0 : 0) + 's';
              return val + 'ms';
            },
            maxTicksLimit: 8
          },
          grid: { color: 'rgba(0,0,0,0.08)' }
        }
      }
    }
  });
}

let chart = makeChart(true);

document.getElementById('btn-log').addEventListener('click', () => {
  if (isLog) return;
  isLog = true;
  chart.destroy();
  chart = makeChart(true);
  document.getElementById('btn-log').classList.add('active');
  document.getElementById('btn-lin').classList.remove('active');
});

document.getElementById('btn-lin').addEventListener('click', () => {
  if (!isLog) return;
  isLog = false;
  chart.destroy();
  chart = makeChart(false);
  document.getElementById('btn-lin').classList.add('active');
  document.getElementById('btn-log').classList.remove('active');
});
