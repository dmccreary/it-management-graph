// CANVAS_HEIGHT: 560
// GDPR Cross-Border Data Flow Map
// Shows data flows between EU and non-EU countries with GDPR compliance status using Leaflet.js

const map = L.map('map', { zoomControl: true }).setView([30, 10], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 6, minZoom: 2,
}).addTo(map);

// Data centers: [name, lat, lng, city, apps, status]
const dataCenters = [
  { name: 'DC-Frankfurt-1', lat: 50.11, lng: 8.68,   city: 'Frankfurt', apps: 'Core Banking, Auth Service', status: 'EU — GDPR primary region' },
  { name: 'DC-Frankfurt-2', lat: 50.08, lng: 8.72,   city: 'Frankfurt', apps: 'Analytics, Reporting', status: 'EU — GDPR compliant' },
  { name: 'DC-Dublin-1',    lat: 53.33, lng: -6.25,  city: 'Dublin',    apps: 'Web Frontend, API Gateway', status: 'EU — GDPR compliant' },
  { name: 'DC-London-1',    lat: 51.51, lng: -0.13,  city: 'London',    apps: 'UK Customer Portal', status: 'UK Adequacy Decision (post-Brexit)' },
  { name: 'DC-London-2',    lat: 51.50, lng: -0.10,  city: 'London',    apps: 'UK Payments Service', status: 'UK Adequacy Decision' },
  { name: 'DC-Virginia-1',  lat: 38.95, lng: -77.45, city: 'Virginia',  apps: 'US Operations, Backup', status: 'SCCs Required (Art. 46)' },
  { name: 'DC-Virginia-2',  lat: 38.90, lng: -77.40, city: 'Virginia',  apps: 'CDN Edge, Analytics', status: 'SCCs Required (Art. 46)' },
  { name: 'DC-Virginia-3',  lat: 38.85, lng: -77.35, city: 'Virginia',  apps: 'DR Backup Site', status: 'SCCs Required (Art. 46)' },
  { name: 'DC-Singapore-1', lat: 1.35,  lng: 103.82, city: 'Singapore', apps: 'APAC Operations', status: 'BCR or SCC Required — No Adequacy Decision' },
  { name: 'DC-Sydney-1',    lat: -33.87,lng: 151.21, city: 'Sydney',    apps: 'ANZ Customer Data', status: 'BCR or SCC Required — No Adequacy Decision' },
];

// Data flows: [srcIdx, dstIdx, type, label, legalBasis, dataCategories, freq]
const flows = [
  // EU Internal (green, unrestricted)
  { src: 0, dst: 2, type: 'eu',        color: '#43a047', dash: false, label: 'EU Internal: Frankfurt ↔ Dublin', legal: 'Art. 28 — No transfer restrictions apply within EEA', data: 'Customer PII, Transaction Records', freq: 'Real-time replication' },
  { src: 0, dst: 1, type: 'eu',        color: '#43a047', dash: false, label: 'EU Internal: Frankfurt DC1 ↔ DC2', legal: 'Intra-EU — No GDPR transfer mechanism needed', data: 'Analytical aggregates', freq: 'Hourly batch' },
  // UK Adequacy (yellow)
  { src: 2, dst: 3, type: 'adequacy',  color: '#f9a825', dash: false, label: 'EU → UK: Dublin to London (Adequacy)', legal: 'Art. 45 Adequacy Decision — UK recognised since June 2021', data: 'Customer profile data', freq: 'Real-time sync' },
  { src: 2, dst: 4, type: 'adequacy',  color: '#f9a825', dash: false, label: 'EU → UK: Payments data', legal: 'Art. 45 Adequacy Decision — No additional safeguards required', data: 'Payment transaction references', freq: 'Per transaction' },
  // SCCs Required (orange dashed)
  { src: 0, dst: 5, type: 'scc',       color: '#e67e22', dash: true,  label: 'EU → US: Frankfurt to Virginia (SCCs)', legal: 'Art. 46(2)(c) — Standard Contractual Clauses (SCCs) executed', data: 'Pseudonymised analytics, DR backup', freq: 'Daily batch' },
  { src: 2, dst: 6, type: 'scc',       color: '#e67e22', dash: true,  label: 'EU → US: CDN data transfer', legal: 'Art. 46(2)(c) SCCs + Transfer Impact Assessment completed', data: 'CDN cache data (non-personal)', freq: 'Continuous' },
  { src: 0, dst: 7, type: 'scc',       color: '#e67e22', dash: true,  label: 'EU → US: DR replication', legal: 'Art. 46(2)(c) SCCs — encryption in transit and at rest required', data: 'Encrypted backup snapshots', freq: 'Nightly' },
  // High-risk (red dashed)
  { src: 2, dst: 8, type: 'restricted',color: '#e53935', dash: true,  label: 'EU → Singapore: APAC ops (RESTRICTED)', legal: 'No adequacy decision — BCR or SCCs required + Transfer Risk Assessment', data: 'APAC customer personal data', freq: 'On demand' },
  { src: 0, dst: 9, type: 'restricted',color: '#e53935', dash: true,  label: 'EU → Australia: ANZ data (RESTRICTED)', legal: 'No adequacy decision — Chapter V safeguards must be in place', data: 'ANZ regional customer records', freq: 'Weekly sync' },
];

let allPolylines = [];
let dcMarkers = [];

// Add data center markers
dataCenters.forEach((dc, i) => {
  const color = dc.city === 'Frankfurt' || dc.city === 'Dublin' ? '#2e7d32' :
                dc.city === 'London' ? '#f9a825' :
                dc.city === 'Virginia' ? '#e67e22' : '#e53935';

  const icon = L.divIcon({
    html: `<div style="background:${color};width:14px;height:14px;border-radius:3px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
    className: '', iconAnchor: [7, 7],
  });

  const marker = L.marker([dc.lat, dc.lng], { icon })
    .addTo(map)
    .bindPopup(`<div class="dc-popup"><b>${dc.name}</b><br>City: ${dc.city}<br>Apps: ${dc.apps}<br>Status: <i>${dc.status}</i></div>`);
  dcMarkers.push({ marker, i });
});

function drawFlows(filterType) {
  allPolylines.forEach(p => map.removeLayer(p));
  allPolylines = [];

  flows.forEach(f => {
    if (filterType && f.type !== filterType && !(filterType === 'adequacy' && f.type === 'adequacy')) return;
    if (filterType === 'restricted' && f.type !== 'restricted' && f.type !== 'scc') return;

    const src = dataCenters[f.src], dst = dataCenters[f.dst];
    const options = {
      color: f.color,
      weight: 3,
      opacity: 0.85,
      dashArray: f.dash ? '8 5' : null,
    };

    const line = L.polyline([[src.lat, src.lng], [dst.lat, dst.lng]], options)
      .addTo(map)
      .bindTooltip(`<div class="flow-tooltip"><b>${f.label}</b><br>Legal basis: ${f.legal}<br>Data: ${f.data}<br>Frequency: ${f.freq}</div>`, { sticky: true });

    allPolylines.push(line);
  });
}

function showAllFlows()       { drawFlows(null); }
function showRestrictedOnly() {
  allPolylines.forEach(p => map.removeLayer(p));
  allPolylines = [];
  flows.filter(f => f.type === 'restricted' || f.type === 'scc').forEach(f => {
    const src = dataCenters[f.src], dst = dataCenters[f.dst];
    const line = L.polyline([[src.lat, src.lng], [dst.lat, dst.lng]], {
      color: f.color, weight: 4, opacity: 0.9, dashArray: '8 5',
    }).addTo(map).bindTooltip(`<div class="flow-tooltip"><b>${f.label}</b><br>${f.legal}</div>`, { sticky: true });
    allPolylines.push(line);
  });
}
function showAdequacyOnly() {
  allPolylines.forEach(p => map.removeLayer(p));
  allPolylines = [];
  flows.filter(f => f.type === 'adequacy' || f.type === 'eu').forEach(f => {
    const src = dataCenters[f.src], dst = dataCenters[f.dst];
    const line = L.polyline([[src.lat, src.lng], [dst.lat, dst.lng]], {
      color: f.color, weight: 3, opacity: 0.9,
    }).addTo(map).bindTooltip(`<div class="flow-tooltip"><b>${f.label}</b><br>${f.legal}</div>`, { sticky: true });
    allPolylines.push(line);
  });
}

// Initial render
showAllFlows();
