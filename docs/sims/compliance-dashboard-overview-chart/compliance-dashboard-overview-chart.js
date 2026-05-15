// Compliance Dashboard Overview — Chart.js multi-panel
// CANVAS_HEIGHT: 560

document.addEventListener('DOMContentLoaded', () => {
    // Panel 1 — Score gauge (doughnut used as gauge)
    new Chart(document.getElementById('gaugeChart'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [87, 13],
                backgroundColor: ['#4CAF50', '#e0e0e0'],
                borderWidth: 0,
                circumference: 180,
                rotation: -90,
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
        }
    });

    // Panel 2 — Regulation stacked bar
    new Chart(document.getElementById('regulationChart'), {
        type: 'bar',
        data: {
            labels: ['HIPAA', 'GDPR', 'DORA'],
            datasets: [
                { label: 'Compliant',              data: [92, 85, 84], backgroundColor: '#4CAF50' },
                { label: 'Remediation in Progress', data: [5, 10, 12],  backgroundColor: '#FFC107' },
                { label: 'Non-Compliant',           data: [3, 5, 4],   backgroundColor: '#F44336' },
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: { stacked: true, max: 100, ticks: { callback: v => v + '%' } },
                y: { stacked: true },
            },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } }
        }
    });

    // Panel 3 — Trend line
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                { label: 'Technical Controls',     data: [78,79,81,82,83,87,88,89,90,90,91,91], borderColor:'#2196F3', backgroundColor:'rgba(33,150,243,0.1)', tension:0.3, fill:true },
                { label: 'Administrative Controls', data: [82,83,83,84,85,86,86,87,87,88,88,88], borderColor:'#FF9800', backgroundColor:'rgba(255,152,0,0.1)', tension:0.3, fill:true },
            ]
        },
        options: {
            responsive: true,
            scales: { y: { min: 70, max: 100, ticks: { callback: v => v + '%' } } },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } }
        }
    });

    // Panel 4 — Findings donut
    new Chart(document.getElementById('findingsChart'), {
        type: 'doughnut',
        data: {
            labels: ['Critical (3)', 'High (12)', 'Medium (28)', 'Low (17)'],
            datasets: [{
                data: [3, 12, 28, 17],
                backgroundColor: ['#F44336', '#FF9800', '#FFC107', '#4CAF50'],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'right', labels: { font: { size: 10 } } } }
        }
    });
});
