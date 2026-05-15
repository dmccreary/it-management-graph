// ROI Waterfall Chart - Chart.js (stacked bar waterfall implementation)
// CANVAS_HEIGHT: 480

// Waterfall data: [label, value, type]
// type: 'cost', 'benefit', 'total'
const waterfallData = [
  { label: 'Total\nInvestment',       value: -647,  type: 'cost'    },
  { label: 'Operational\nEfficiency', value:  633,  type: 'benefit' },
  { label: 'Prevented\nOutages',      value: 2000,  type: 'benefit' },
  { label: 'Compliance\nImprove.',    value:  150,  type: 'benefit' },
  { label: 'Decision\nSupport',       value:  200,  type: 'benefit' },
  { label: 'Net\nValue',              value: 2336,  type: 'total'   },
];

const tooltips = [
  'TCO over 3 years: implementation, licensing, and training costs.',
  'Faster impact analysis, incident resolution, and automated reporting.',
  'Avoided change-related incidents — the largest single benefit category.',
  'Reduced audit effort and avoided compliance violations.',
  'Better portfolio decisions, avoided redundant purchases.',
  'Total net value = Sum of all benefits minus total investment costs.'
];

// Build waterfall bars:
// For each item, we need: transparent base (invisible) + colored value bar
const labels = waterfallData.map(d => d.label);

// Running cumulative for computing bases
let running = 0;
const bases = [];
const values = [];
const colors = [];

waterfallData.forEach((d, i) => {
  if (d.type === 'total') {
    bases.push(0);
    values.push(d.value);
    colors.push('rgba(30,136,229,0.85)');
  } else if (d.type === 'cost') {
    // Cost: bar goes from 0 down to negative
    bases.push(d.value); // start at negative value
    values.push(-d.value); // positive height
    running = d.value;
    colors.push('rgba(229,57,53,0.85)');
  } else {
    // Benefit: bar goes up from running
    const base = running;
    bases.push(Math.min(base, 0));   // clamp to 0 for negative carry-through
    values.push(d.value + Math.min(running, 0) - Math.min(base, 0));
    // Actually, simpler: just track running cumulative properly
    running += d.value;
    colors.push('rgba(67,160,71,0.85)');
  }
});

// Redo the waterfall calculation properly
const properBases = [];
const properValues = [];
const properColors = [];
let cum = 0;

waterfallData.forEach((d, i) => {
  if (d.type === 'total') {
    properBases.push(0);
    properValues.push(d.value);
    properColors.push('rgba(30,136,229,0.85)');
  } else if (d.type === 'cost') {
    properBases.push(d.value);
    properValues.push(Math.abs(d.value));
    cum = d.value;
    properColors.push('rgba(229,57,53,0.85)');
  } else {
    properBases.push(cum);
    properValues.push(d.value);
    cum += d.value;
    properColors.push('rgba(67,160,71,0.85)');
  }
});

// Value labels for display
const valueLabels = ['-$647K', '+$633K', '+$2.0M', '+$150K', '+$200K', '$2.336M'];

const ctx = document.getElementById('chart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        // Invisible base for stacking
        label: '__base__',
        data: properBases,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        stack: 'waterfall',
        borderWidth: 0
      },
      {
        label: 'Value',
        data: properValues,
        backgroundColor: properColors,
        borderColor: properColors.map(c => c.replace('0.85', '1')),
        borderWidth: 1.5,
        borderRadius: 3,
        stack: 'waterfall',
        datalabels: { display: false }
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label(ctx) {
            if (ctx.dataset.label === '__base__') return null;
            const i = ctx.dataIndex;
            const d = waterfallData[i];
            const val = d.value >= 0 ? `+$${(d.value/1000).toFixed(3).replace(/\.?0+$/,'')}M` : `-$${(Math.abs(d.value)/1000).toFixed(3).replace(/\.?0+$/,'')}M`;
            return `${val} — ${tooltips[i]}`;
          },
          title(items) {
            return waterfallData[items[0].dataIndex].label.replace(/\n/g,' ');
          }
        },
        filter(item) { return item.dataset.label !== '__base__'; }
      },
      annotation: {
        annotations: {
          zeroLine: {
            type: 'line', scaleID: 'y', value: 0,
            borderColor: '#333', borderWidth: 2,
            label: { content: 'Break-even', display: false }
          },
          breakeven: {
            type: 'label',
            xValue: 1.5, yValue: 50,
            content: ['↑ Break-even achieved', 'after Outage Prevention'],
            color: '#2e7d32',
            font: { size: 10, weight: 'bold' },
            backgroundColor: 'rgba(232,245,233,0.9)',
            borderColor: '#2e7d32',
            borderWidth: 1,
            borderRadius: 4,
            padding: 4
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 11 } }
      },
      y: {
        stacked: true,
        min: -800,
        max: 2600,
        title: { display: true, text: 'Value (USD thousands)', font: { size: 12 } },
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: {
          callback(val) {
            if (val === 0) return '$0';
            if (val < 0) return `-$${Math.abs(val/1000).toFixed(1)}M`;
            return `$${(val/1000).toFixed(1)}M`;
          }
        }
      }
    }
  },
  plugins: [{
    // Draw value labels on bars
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[1];
      const meta = chart.getDatasetMeta(1);
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = 'bold 10px Segoe UI, sans-serif';
      meta.data.forEach((bar, i) => {
        const v = properValues[i];
        const b = properBases[i];
        const total = b + v;
        const y = chart.scales.y.getPixelForValue(total);
        const offset = v >= 0 ? -8 : 14;
        ctx.fillStyle = waterfallData[i].type === 'cost' ? '#c62828' :
                        waterfallData[i].type === 'total' ? '#1565c0' : '#2e7d32';
        ctx.fillText(valueLabels[i], bar.x, y + offset);
      });
      ctx.restore();
    }
  }]
});
