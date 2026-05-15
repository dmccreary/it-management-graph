// RDBMS JOIN Performance by Hop Count - Chart.js line chart with log scale
// CANVAS_HEIGHT: 480

let isLogScale = true;

const labels = ['1 hop', '2 hops', '3 hops', '4 hops', '5 hops', '6 hops'];

const rdbmsNoIndex = [50, 800, 8500, 45000, 180000, null];
const rdbmsIndexed = [8, 95, 1200, 12000, 65000, null];
const graphDB      = [5,  9,   13,    17,    21,    25];

const ctx = document.getElementById('chart').getContext('2d');

function buildAnnotations() {
  return {
    threshold1: {
      type: 'line', scaleID: 'y', value: 1000,
      borderColor: 'rgba(70,130,200,0.8)', borderWidth: 1.5, borderDash: [6, 3],
      label: {
        content: 'Acceptable threshold (1s)', display: true,
        position: 'start', color: '#1565c0', font: { size: 10 }, yAdjust: -8
      }
    },
    threshold2: {
      type: 'line', scaleID: 'y', value: 60000,
      borderColor: 'rgba(198,40,40,0.7)', borderWidth: 1.5, borderDash: [6, 3],
      label: {
        content: 'Query timeout (1 min)', display: true,
        position: 'start', color: '#c62828', font: { size: 10 }, yAdjust: -8
      }
    }
  };
}

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'RDBMS without indexes',
        data: rdbmsNoIndex,
        borderColor: '#e53935',
        backgroundColor: 'rgba(229,57,53,0.08)',
        borderDash: [7, 4],
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: '#e53935',
        tension: 0.1,
        spanGaps: false
      },
      {
        label: 'RDBMS with optimal indexes',
        data: rdbmsIndexed,
        borderColor: '#fb8c00',
        backgroundColor: 'rgba(251,140,0,0.08)',
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: '#fb8c00',
        tension: 0.1,
        spanGaps: false
      },
      {
        label: 'Graph database (index-free adjacency)',
        data: graphDB,
        borderColor: '#43a047',
        backgroundColor: 'rgba(67,160,71,0.12)',
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: '#43a047',
        tension: 0.1
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
            if (v === null) return `${ctx.dataset.label}: N/A (timeout)`;
            return `${ctx.dataset.label}: ${v.toLocaleString()} ms`;
          },
          afterBody(items) {
            const hop = items[0].dataIndex + 1;
            const notes = [
              '',
              'At 1 hop: simple single-table lookup for all databases.',
              'At 2 hops: RDBMS performs one JOIN over full intermediate set.',
              'At 3 hops: two JOINs; intermediate sets grow exponentially.',
              'At 4 hops: enterprise CMDB impact analysis requires 5-10 hops.',
              'At 5 hops: many RDBMS queries exceed timeout thresholds.',
              'At 6 hops: Graph DB follows direct pointers in ~25ms.'
            ];
            return [notes[hop] || ''];
          }
        }
      },
      annotation: { annotations: buildAnnotations() }
    },
    scales: {
      x: {
        title: { display: true, text: 'Number of Relationship Hops', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.06)' }
      },
      y: {
        type: isLogScale ? 'logarithmic' : 'linear',
        title: {
          display: true,
          text: isLogScale ? 'Query Response Time (ms, log scale)' : 'Query Response Time (ms)',
          font: { size: 12 }
        },
        min: isLogScale ? 1 : 0,
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: {
          callback(val) {
            if (isLogScale) {
              const map = {1:'1ms', 10:'10ms', 100:'100ms', 1000:'1s', 10000:'10s', 100000:'1.7min', 1000000:'16.7min'};
              return map[val] || '';
            }
            return val >= 1000 ? (val/1000).toFixed(0)+'s' : val+'ms';
          }
        }
      }
    }
  }
});

document.getElementById('toggleScale').addEventListener('click', () => {
  isLogScale = !isLogScale;
  chart.options.scales.y.type = isLogScale ? 'logarithmic' : 'linear';
  chart.options.scales.y.title.text = isLogScale
    ? 'Query Response Time (ms, log scale)'
    : 'Query Response Time (ms)';
  chart.options.scales.y.min = isLogScale ? 1 : 0;
  chart.update();
});
