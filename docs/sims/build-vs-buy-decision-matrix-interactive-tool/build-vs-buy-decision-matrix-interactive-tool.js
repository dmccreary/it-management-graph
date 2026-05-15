// Build vs Buy Decision Matrix — Chart.js radar
// CANVAS_HEIGHT: 540

const DIMENSIONS = [
    { key: 'time',       label: 'Time Pressure',        default: 50, buyFavors: true  },
    { key: 'budget',     label: 'Budget Availability',  default: 60, buyFavors: false },
    { key: 'expertise',  label: 'Internal Expertise',   default: 50, buyFavors: false },
    { key: 'custom',     label: 'Customization Needs',  default: 40, buyFavors: false },
    { key: 'vendor',     label: 'Vendor Trust',         default: 60, buyFavors: true  },
    { key: 'control',    label: 'Control Requirements', default: 40, buyFavors: false },
    { key: 'support',    label: 'Support Needs',        default: 50, buyFavors: true  },
    { key: 'scale',      label: 'Scale & Complexity',   default: 50, buyFavors: false },
];

const values = {};
DIMENSIONS.forEach(d => { values[d.key] = d.default; });

let chart;

function getScores() {
    let buyScore = 0, buildScore = 0;
    for (const d of DIMENSIONS) {
        const v = values[d.key];
        if (d.buyFavors) { buyScore += v; buildScore += (100 - v); }
        else              { buildScore += v; buyScore += (100 - v); }
    }
    return { buyScore, buildScore };
}

function getRecommendation() {
    const { buyScore, buildScore } = getScores();
    const diff = Math.abs(buyScore - buildScore);
    if (diff < 80) return { text: '🔀 HYBRID Approach', color: '#9C27B0', bg: '#F3E5F5' };
    if (buyScore > buildScore) return { text: '🛒 BUY — Procure a vendor solution', color: '#1565C0', bg: '#E3F2FD' };
    return { text: '🔨 BUILD — Develop in-house', color: '#2E7D32', bg: '#E8F5E9' };
}

function updateChart() {
    const data = DIMENSIONS.map(d => values[d.key]);
    chart.data.datasets[0].data = data;
    chart.update();

    const rec = getRecommendation();
    const el = document.getElementById('recommendation');
    el.textContent = rec.text;
    el.style.background = rec.bg;
    el.style.color = rec.color;
}

document.addEventListener('DOMContentLoaded', () => {
    // Build sliders
    const sliderDiv = document.getElementById('sliders');
    for (const d of DIMENSIONS) {
        const row = document.createElement('div');
        row.className = 'slider-row';
        const lbl = document.createElement('label');
        const span = document.createElement('span');
        span.id = 'val_' + d.key;
        span.textContent = d.default + '%';
        lbl.append(d.label, span);
        const input = document.createElement('input');
        input.type = 'range'; input.min = 0; input.max = 100;
        input.value = d.default; input.id = 'sl_' + d.key;
        input.addEventListener('input', function() {
            values[d.key] = parseInt(this.value);
            document.getElementById('val_' + d.key).textContent = this.value + '%';
            updateChart();
        });
        row.append(lbl, input);
        sliderDiv.appendChild(row);
    }

    chart = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: DIMENSIONS.map(d => d.label),
            datasets: [
                {
                    label: 'Your Organization',
                    data: DIMENSIONS.map(d => d.default),
                    backgroundColor: 'rgba(33,150,243,0.25)',
                    borderColor: '#2196F3', borderWidth: 2, pointRadius: 5,
                },
                {
                    label: 'Buy Favored Zone',
                    data: DIMENSIONS.map(d => d.buyFavors ? 75 : 25),
                    backgroundColor: 'rgba(255,152,0,0.08)',
                    borderColor: '#FF9800', borderWidth: 1.5,
                    borderDash: [6,3], pointRadius: 0,
                },
                {
                    label: 'Build Favored Zone',
                    data: DIMENSIONS.map(d => !d.buyFavors ? 75 : 25),
                    backgroundColor: 'rgba(76,175,80,0.08)',
                    borderColor: '#4CAF50', borderWidth: 1.5,
                    borderDash: [3,3], pointRadius: 0,
                },
            ]
        },
        options: {
            responsive: true,
            scales: { r: { min: 0, max: 100, ticks: { stepSize: 25, font: { size: 9 } },
                          pointLabels: { font: { size: 10 } } } },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
        }
    });

    updateChart();
});
