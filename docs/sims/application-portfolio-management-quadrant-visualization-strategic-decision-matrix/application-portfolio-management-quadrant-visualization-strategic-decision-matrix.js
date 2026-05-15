// Application Portfolio Management Quadrant — Chart.js bubble chart
// CANVAS_HEIGHT: 600

const apps = [
    { name: 'Customer Portal',        x: 85, y: 72, cost: 2300000, deps: 15, quadrant: 'INVEST' },
    { name: 'Legacy Billing System',  x: 32, y: 28, cost: 3800000, deps: 28, quadrant: 'RETIRE' },
    { name: 'Employee Directory',     x: 25, y: 65, cost: 320000,  deps: 8,  quadrant: 'TOLERATE' },
    { name: 'Old Reporting Tool',     x: 18, y: 22, cost: 450000,  deps: 12, quadrant: 'RETIRE' },
    { name: 'Payment Gateway',        x: 88, y: 85, cost: 1900000, deps: 19, quadrant: 'INVEST' },
    { name: 'Internal Wiki',          x: 35, y: 55, cost: 180000,  deps: 5,  quadrant: 'TOLERATE' },
    { name: 'Mainframe Interface',    x: 42, y: 15, cost: 5200000, deps: 35, quadrant: 'RETIRE' },
    { name: 'Email Archive',          x: 12, y: 30, cost: 560000,  deps: 14, quadrant: 'RETIRE' },
    { name: 'Analytics Dashboard',    x: 70, y: 78, cost: 1400000, deps: 17, quadrant: 'INVEST' },
    { name: 'Test Env Manager',       x: 45, y: 48, cost: 380000,  deps: 9,  quadrant: 'TOLERATE' },
    { name: 'CRM Platform',           x: 78, y: 62, cost: 2800000, deps: 22, quadrant: 'INVEST' },
    { name: 'HR Self-Service',        x: 55, y: 70, cost: 670000,  deps: 11, quadrant: 'INVEST' },
    { name: 'Asset Tracker v1',       x: 22, y: 18, cost: 290000,  deps: 6,  quadrant: 'RETIRE' },
    { name: 'API Gateway',            x: 80, y: 88, cost: 950000,  deps: 30, quadrant: 'INVEST' },
    { name: 'Procurement System',     x: 60, y: 38, cost: 1100000, deps: 20, quadrant: 'TOLERATE' },
];

function complexityColor(deps) {
    if (deps <= 10) return 'rgba(76,175,80,0.75)';
    if (deps <= 20) return 'rgba(255,152,0,0.75)';
    return 'rgba(244,67,54,0.75)';
}
function complexityBorder(deps) {
    if (deps <= 10) return '#2E7D32';
    if (deps <= 20) return '#E65100';
    return '#C62828';
}
function costRadius(cost) {
    return Math.min(40, 8 + cost / 150000);
}

const quadrantBgPlugin = {
    id: 'quadrantBg',
    beforeDraw(chart) {
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const midX = chart.scales.x.getPixelForValue(50);
        const midY = chart.scales.y.getPixelForValue(50);
        const regions = [
            { x: midX, y: top,    w: right - midX,  h: midY - top,    bg: '#E8F5E9', label: 'INVEST',   lx: right - 4,   ly: top + 18,    align: 'right', color: '#2E7D32' },
            { x: left, y: top,    w: midX - left,   h: midY - top,    bg: '#E3F2FD', label: 'MIGRATE',  lx: left + 4,    ly: top + 18,    align: 'left',  color: '#1565C0' },
            { x: midX, y: midY,   w: right - midX,  h: bottom - midY, bg: '#FFF9C4', label: 'TOLERATE', lx: right - 4,   ly: bottom - 6,  align: 'right', color: '#F57C00' },
            { x: left, y: midY,   w: midX - left,   h: bottom - midY, bg: '#FFEBEE', label: 'RETIRE',   lx: left + 4,    ly: bottom - 6,  align: 'left',  color: '#C62828' },
        ];
        regions.forEach(r => {
            ctx.fillStyle = r.bg;
            ctx.fillRect(r.x, r.y, r.w, r.h);
            ctx.fillStyle = r.color;
            ctx.font = 'bold 14px Segoe UI, sans-serif';
            ctx.textAlign = r.align;
            ctx.fillText(r.label, r.lx, r.ly);
        });
        // dividing lines
        ctx.save();
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(midX, top); ctx.lineTo(midX, bottom); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(left, midY); ctx.lineTo(right, midY); ctx.stroke();
        ctx.restore();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const visibleQuadrants = new Set(['INVEST', 'MIGRATE', 'TOLERATE', 'RETIRE']);

    function buildDataset() {
        return [{
            label: 'Applications',
            data: apps
                .filter(a => visibleQuadrants.has(a.quadrant))
                .map(a => ({
                    x: a.x, y: a.y, r: costRadius(a.cost),
                    _name: a.name, _cost: a.cost, _deps: a.deps, _q: a.quadrant
                })),
            backgroundColor: apps.filter(a => visibleQuadrants.has(a.quadrant)).map(a => complexityColor(a.deps)),
            borderColor:     apps.filter(a => visibleQuadrants.has(a.quadrant)).map(a => complexityBorder(a.deps)),
            borderWidth: 2,
        }];
    }

    const tooltip = document.getElementById('tooltip');

    const chart = new Chart(document.getElementById('myChart'), {
        type: 'bubble',
        data: { datasets: buildDataset() },
        options: {
            responsive: true,
            animation: { duration: 500 },
            scales: {
                x: { min: 0, max: 100, title: { display: true, text: 'Strategic Business Value →', font: { size: 13, weight: 'bold' } },
                     ticks: { callback: v => v === 0 ? 'LOW' : v === 50 ? 'MEDIUM' : v === 100 ? 'HIGH' : '' } },
                y: { min: 0, max: 100, title: { display: true, text: '↑ Technical Quality & Health', font: { size: 13, weight: 'bold' } },
                     ticks: { callback: v => v === 0 ? 'LOW' : v === 50 ? 'MEDIUM' : v === 100 ? 'HIGH' : '' } },
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: false,
                    external(context) {
                        const el = tooltip;
                        if (context.tooltip.opacity === 0) { el.style.display = 'none'; return; }
                        const dp = context.tooltip.dataPoints[0]?.raw;
                        if (!dp) return;
                        el.innerHTML = `<strong>${dp._name}</strong><br>
                            Strategic value: ${dp.x}/100<br>
                            Technical quality: ${dp.y}/100<br>
                            Annual cost: $${(dp._cost/1e6).toFixed(1)}M<br>
                            Dependencies: ${dp._deps}<br>
                            Quadrant: <strong>${dp._q}</strong>`;
                        const pos = context.chart.canvas.getBoundingClientRect();
                        el.style.left  = (pos.left + context.tooltip.caretX + 12) + 'px';
                        el.style.top   = (pos.top  + context.tooltip.caretY - 10) + 'px';
                        el.style.display = 'block';
                    }
                }
            }
        },
        plugins: [quadrantBgPlugin]
    });

    // Quadrant filter checkboxes
    ['INVEST','MIGRATE','TOLERATE','RETIRE'].forEach(q => {
        document.getElementById('show' + q).addEventListener('change', function() {
            this.checked ? visibleQuadrants.add(q) : visibleQuadrants.delete(q);
            chart.data.datasets = buildDataset();
            chart.update();
        });
    });
});
