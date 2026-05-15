// Migration Timeline with Risk and Value Curves
// CANVAS_HEIGHT: 500

Chart.register(ChartDataLabels = undefined);

const months = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

// Risk curve data points (interpolated)
const riskPoints = {
  0: 75, 3: 80, 6: 65, 10: 50, 14: 55, 17: 35, 20: 20, 24: 10
};
// Value curve data points (interpolated)
const valuePoints = {
  0: 5, 6: 15, 10: 40, 14: 60, 17: 75, 20: 90, 24: 100
};

function interpolate(points, month) {
  const keys = Object.keys(points).map(Number).sort((a, b) => a - b);
  for (let i = 0; i < keys.length - 1; i++) {
    if (month >= keys[i] && month <= keys[i + 1]) {
      const t = (month - keys[i]) / (keys[i + 1] - keys[i]);
      return points[keys[i]] + t * (points[keys[i + 1]] - points[keys[i]]);
    }
  }
  if (month <= keys[0]) return points[keys[0]];
  return points[keys[keys.length - 1]];
}

const riskData = months.map(m => interpolate(riskPoints, m));
const valueData = months.map(m => interpolate(valuePoints, m));

// Legacy/Graph usage for stacked bars (background)
const legacyUsage = months.map(m => Math.max(0, 100 - m * (100/24) * 1.1));
const graphUsage = months.map(m => Math.min(100, m * (100/24) * 1.1));

const ctx = document.getElementById('chart').getContext('2d');

// Phase background boxes via annotation plugin
const annotationPlugin = Chart.registry.plugins.get('annotation');
const hasAnnotation = !!annotationPlugin;

const annotations = {};

// Phase backgrounds
const phases = [
  { x0: 0, x1: 6, color: 'rgba(33,150,243,0.08)', label: 'Phase 1\nParallel Op' },
  { x0: 6, x1: 14, color: 'rgba(255,193,7,0.1)', label: 'Phase 2\nSelective' },
  { x0: 14, x1: 20, color: 'rgba(255,87,34,0.1)', label: 'Phase 3\nCritical' },
  { x0: 20, x1: 24, color: 'rgba(76,175,80,0.1)', label: 'Phase 4\nDecommission' }
];

if (hasAnnotation) {
  phases.forEach((p, i) => {
    annotations['phase' + i] = {
      type: 'box',
      xMin: p.x0, xMax: p.x1,
      yMin: 0, yMax: 100,
      backgroundColor: p.color,
      borderWidth: 0,
      label: { content: p.label, display: true, position: { x: 'center', y: 'start' }, font: { size: 10 }, color: '#666' }
    };
  });

  // Phase boundary lines
  [6, 14, 20].forEach((x, i) => {
    annotations['bound' + i] = {
      type: 'line',
      xMin: x, xMax: x,
      yMin: 0, yMax: 100,
      borderColor: 'rgba(100,100,100,0.5)',
      borderWidth: 1,
      borderDash: [5, 5]
    };
  });

  // Milestones
  const milestones = [3, 8, 14, 20, 24];
  milestones.forEach((x, i) => {
    annotations['ms' + i] = {
      type: 'point',
      xValue: x,
      yValue: x === 14 ? 57.5 : (x === 20 ? 55 : (x === 24 ? 55 : 72)),
      backgroundColor: '#1a3a6c',
      radius: 6,
      borderColor: '#fff',
      borderWidth: 2
    };
  });

  // Crossover annotation
  annotations['crossover'] = {
    type: 'line',
    xMin: 14, xMax: 14,
    yMin: 0, yMax: 100,
    borderColor: 'rgba(150,0,150,0.4)',
    borderWidth: 2,
    label: {
      content: 'Crossover: Graph\nbecomes primary',
      display: true,
      position: 'end',
      font: { size: 9 },
      color: '#800080'
    }
  };
}

new Chart(ctx, {
  type: 'line',
  data: {
    labels: months,
    datasets: [
      {
        label: 'Risk Level (%)',
        data: riskData,
        borderColor: 'rgba(244,67,54,1)',
        backgroundColor: 'rgba(244,67,54,0.15)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
        pointRadius: months.map(m => [0,3,6,8,10,14,17,20,24].includes(m) ? 5 : 2),
        pointBackgroundColor: 'rgba(244,67,54,1)'
      },
      {
        label: 'Business Value (%)',
        data: valueData,
        borderColor: 'rgba(76,175,80,1)',
        backgroundColor: 'rgba(76,175,80,0.15)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
        pointRadius: months.map(m => [0,6,10,14,17,20,24].includes(m) ? 5 : 2),
        pointBackgroundColor: 'rgba(76,175,80,1)'
      },
      {
        label: 'Legacy CMDB Usage (%)',
        data: legacyUsage,
        borderColor: 'rgba(244,67,54,0.4)',
        backgroundColor: 'rgba(244,67,54,0.1)',
        borderWidth: 1,
        fill: false,
        tension: 0.2,
        yAxisID: 'y',
        borderDash: [4, 4],
        pointRadius: 0
      },
      {
        label: 'Graph System Usage (%)',
        data: graphUsage,
        borderColor: 'rgba(76,175,80,0.4)',
        backgroundColor: 'rgba(76,175,80,0.1)',
        borderWidth: 1,
        fill: false,
        tension: 0.2,
        yAxisID: 'y',
        borderDash: [4, 4],
        pointRadius: 0
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
        labels: { font: { size: 12 }, padding: 12 }
      },
      tooltip: {
        callbacks: {
          title: ctx => `Month ${ctx[0].label}`,
          label: ctx => `${ctx.dataset.label}: ${Math.round(ctx.raw)}%`
        }
      },
      annotation: hasAnnotation ? { annotations } : undefined
    },
    scales: {
      x: {
        title: { display: true, text: 'Time (Months)', font: { size: 13 } },
        ticks: {
          callback: (val) => `M${val}`,
          maxTicksLimit: 13
        },
        grid: { color: 'rgba(0,0,0,0.06)' }
      },
      y: {
        min: 0, max: 100,
        title: { display: true, text: 'Percentage (%)', font: { size: 13 } },
        ticks: {
          callback: val => val + '%'
        },
        grid: { color: 'rgba(0,0,0,0.08)' }
      }
    }
  }
});
