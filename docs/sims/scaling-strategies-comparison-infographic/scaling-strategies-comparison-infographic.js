// Scaling Strategies Comparison - Chart.js dual-line chart
// CANVAS_HEIGHT: 540

const labels = ['10K CIs', '50K CIs', '100K CIs', '250K CIs', '500K CIs', '1M CIs'];

// Cost (relative units, 1 = baseline)
const verticalCost = [1, 2.5, 6, null, null, null];  // hits hardware ceiling
const horizontalCost = [2, 3, 4.5, 7, 11, 18];

// Throughput (queries/sec, relative)
const verticalThroughput = [100, 180, 220, 230, 235, null]; // plateaus
const horizontalThroughput = [60, 120, 200, 380, 700, 1200]; // keeps scaling

const ctx = document.getElementById('chart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: 'Vertical Cost',
        data: verticalCost,
        borderColor: '#1e88e5',
        backgroundColor: 'rgba(30,136,229,0.08)',
        borderWidth: 2.5,
        borderDash: [],
        pointRadius: 5,
        pointBackgroundColor: '#1e88e5',
        tension: 0.3,
        yAxisID: 'yCost',
        spanGaps: false
      },
      {
        label: 'Horizontal Cost',
        data: horizontalCost,
        borderColor: '#43a047',
        backgroundColor: 'rgba(67,160,71,0.08)',
        borderWidth: 2.5,
        borderDash: [],
        pointRadius: 5,
        pointBackgroundColor: '#43a047',
        tension: 0.3,
        yAxisID: 'yCost',
        spanGaps: false
      },
      {
        label: 'Vertical Throughput (QPS)',
        data: verticalThroughput,
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66,165,245,0.05)',
        borderWidth: 2,
        borderDash: [6, 3],
        pointRadius: 4,
        pointBackgroundColor: '#42a5f5',
        tension: 0.3,
        yAxisID: 'yPerf',
        spanGaps: false
      },
      {
        label: 'Horizontal Throughput (QPS)',
        data: horizontalThroughput,
        borderColor: '#66bb6a',
        backgroundColor: 'rgba(102,187,106,0.05)',
        borderWidth: 2,
        borderDash: [6, 3],
        pointRadius: 4,
        pointBackgroundColor: '#66bb6a',
        tension: 0.3,
        yAxisID: 'yPerf',
        spanGaps: false
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
        labels: { font: { size: 10 }, padding: 10, boxWidth: 20 }
      },
      tooltip: {
        callbacks: {
          label(ctx) {
            const v = ctx.parsed.y;
            if (v === null) return `${ctx.dataset.label}: Hardware ceiling reached`;
            if (ctx.dataset.yAxisID === 'yCost') return `${ctx.dataset.label}: ${v.toFixed(1)}x baseline cost`;
            return `${ctx.dataset.label}: ${v} queries/sec`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Database Scale (Configuration Items)', font: { size: 11 } },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      yCost: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Relative Cost (1x = baseline)', font: { size: 11 }, color: '#1a3a6c' },
        grid: { color: 'rgba(0,0,0,0.05)' },
        min: 0,
        max: 20
      },
      yPerf: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Throughput (queries/sec)', font: { size: 11 }, color: '#555' },
        grid: { display: false },
        min: 0
      }
    }
  }
});
