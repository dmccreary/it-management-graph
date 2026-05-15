// Query Performance: Graph DB vs RDBMS bar chart (log scale)
// CANVAS_HEIGHT: 480

const labels = ['1 hop', '2 hops', '3 hops', '4 hops', '5 hops'];

const rdbmsData  = [12, 180, 3200, 58000, 920000];
const graphData  = [4,    6,    9,    12,      15];

const ctx = document.getElementById('chart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        label: 'RDBMS with JOIN operations',
        data: rdbmsData,
        backgroundColor: 'rgba(251,140,0,0.85)',
        borderColor: '#e65100',
        borderWidth: 1.5,
        borderRadius: 3
      },
      {
        label: 'Graph Database (native traversal)',
        data: graphData,
        backgroundColor: 'rgba(212,175,55,0.85)',
        borderColor: '#b8860b',
        borderWidth: 1.5,
        borderRadius: 3
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
        labels: { font: { size: 11 }, padding: 14 }
      },
      tooltip: {
        callbacks: {
          label(ctx) {
            const v = ctx.parsed.y;
            if (v >= 60000) return `${ctx.dataset.label}: ${(v/60000).toFixed(1)} min ⚠ TIMEOUT`;
            if (v >= 1000)  return `${ctx.dataset.label}: ${(v/1000).toFixed(1)} s`;
            return `${ctx.dataset.label}: ${v} ms`;
          }
        }
      },
      annotation: {
        annotations: {
          timeout: {
            type: 'line', scaleID: 'y', value: 60000,
            borderColor: 'rgba(198,40,40,0.7)', borderWidth: 1.5, borderDash: [6, 3],
            label: {
              content: 'Typical query timeout (1 min)', display: true,
              position: 'end', color: '#c62828', font: { size: 10 }
            }
          },
          userExp: {
            type: 'line', scaleID: 'y', value: 1000,
            borderColor: 'rgba(30,136,229,0.7)', borderWidth: 1.5, borderDash: [6, 3],
            label: {
              content: 'Acceptable UX (1 s)', display: true,
              position: 'end', color: '#1565c0', font: { size: 10 }
            }
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Number of Relationship Hops', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        type: 'logarithmic',
        min: 1,
        title: {
          display: true,
          text: 'Query Response Time (milliseconds, log scale)',
          font: { size: 12 }
        },
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: {
          callback(val) {
            const map = {
              1: '1ms', 10: '10ms', 100: '100ms',
              1000: '1s', 10000: '10s', 100000: '1.7min', 1000000: '16.7min'
            };
            return map[val] || '';
          }
        }
      }
    }
  }
});
