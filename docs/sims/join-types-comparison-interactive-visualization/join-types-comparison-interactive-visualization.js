// JOIN Types Comparison Interactive Visualization
// CANVAS_HEIGHT: 600

let canvasWidth = 800;
const CANVAS_HEIGHT = 600;

// --- Data definitions ---
const servers = [
  { server_id: 1, hostname: 'web-prod-01' },
  { server_id: 2, hostname: 'db-prod-01' },
  { server_id: 3, hostname: 'app-dev-01' }
];
const apps = [
  { app_id: 501, app_name: 'Customer Portal', server_id: 1 },
  { app_id: 502, app_name: 'Payment API', server_id: 1 },
  { app_id: 503, app_name: 'Inventory System', server_id: 2 },
  { app_id: 504, app_name: 'Orphan App', server_id: 99 }
];

const joinTypes = ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'];

const joinData = {
  'INNER JOIN': {
    sql: 'SELECT * FROM Servers s\nINNER JOIN Applications a\nON s.server_id = a.server_id',
    results: [
      { server_id: 1, hostname: 'web-prod-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 503, app_name: 'Inventory System', sid: 2 }
    ],
    shade: 'intersection',
    note: 'Only matching rows from both tables. Server 3 (no apps) excluded. Orphan App (server 99 missing) excluded.',
    tip: 'INNER JOIN is most common in practice (80%+ of queries).',
    orphan: false
  },
  'LEFT JOIN': {
    sql: 'SELECT * FROM Servers s\nLEFT JOIN Applications a\nON s.server_id = a.server_id',
    results: [
      { server_id: 1, hostname: 'web-prod-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 503, app_name: 'Inventory System', sid: 2 },
      { server_id: 3, hostname: 'app-dev-01', app_id: null, app_name: null, sid: null }
    ],
    shade: 'left',
    note: 'All servers included. Server 3 has NULL for app columns (no apps). Orphan App excluded.',
    tip: 'LEFT JOIN is useful for finding missing relationships.',
    orphan: false
  },
  'RIGHT JOIN': {
    sql: 'SELECT * FROM Servers s\nRIGHT JOIN Applications a\nON s.server_id = a.server_id',
    results: [
      { server_id: 1, hostname: 'web-prod-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 503, app_name: 'Inventory System', sid: 2 },
      { server_id: null, hostname: null, app_id: 504, app_name: 'Orphan App', sid: 99 }
    ],
    shade: 'right',
    note: 'All applications included. Orphan App has NULL for server columns. Server 3 excluded.',
    tip: 'RIGHT JOIN mirrors LEFT JOIN — all right-table rows guaranteed.',
    orphan: true
  },
  'FULL OUTER JOIN': {
    sql: 'SELECT * FROM Servers s\nFULL OUTER JOIN Applications a\nON s.server_id = a.server_id',
    results: [
      { server_id: 1, hostname: 'web-prod-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 503, app_name: 'Inventory System', sid: 2 },
      { server_id: 3, hostname: 'app-dev-01', app_id: null, app_name: null, sid: null },
      { server_id: null, hostname: null, app_id: 504, app_name: 'Orphan App', sid: 99 }
    ],
    shade: 'both',
    note: 'All rows from both tables. Server 3 and Orphan App both appear with NULLs for non-matching columns.',
    tip: 'FULL OUTER JOIN is rare — often indicates data quality issues.',
    orphan: true
  },
  'CROSS JOIN': {
    sql: 'SELECT * FROM Servers s\nCROSS JOIN Applications a',
    results: [
      { server_id: 1, hostname: 'web-prod-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 503, app_name: 'Inventory System', sid: 2 },
      { server_id: 1, hostname: 'web-prod-01', app_id: 504, app_name: 'Orphan App', sid: 99 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 503, app_name: 'Inventory System', sid: 2 },
      { server_id: 2, hostname: 'db-prod-01', app_id: 504, app_name: 'Orphan App', sid: 99 },
      { server_id: 3, hostname: 'app-dev-01', app_id: 501, app_name: 'Customer Portal', sid: 1 },
      { server_id: 3, hostname: 'app-dev-01', app_id: 502, app_name: 'Payment API', sid: 1 },
      { server_id: 3, hostname: 'app-dev-01', app_id: 503, app_name: 'Inventory System', sid: 2 },
      { server_id: 3, hostname: 'app-dev-01', app_id: 504, app_name: 'Orphan App', sid: 99 }
    ],
    shade: 'both',
    note: '3 servers × 4 apps = 12 rows (Cartesian product). No join condition — every server paired with every app.',
    tip: 'CROSS JOIN creates row count = Table A × Table B rows (use with extreme caution!).',
    orphan: false
  }
};

let selectedJoin = 'INNER JOIN';
let buttons = [];
let showNulls = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, CANVAS_HEIGHT);
  canvas.parent(document.querySelector('main'));

  // Create join-type buttons
  const btnY = 180;
  const btnW = canvasWidth > 700 ? 130 : 110;
  const totalW = joinTypes.length * (btnW + 6) - 6;
  let bx = (canvasWidth - totalW) / 2;
  joinTypes.forEach((jt) => {
    const btn = createButton(jt);
    btn.position(bx, btnY);
    btn.style('width', btnW + 'px');
    btn.style('font-size', '12px');
    btn.style('padding', '6px 4px');
    btn.style('cursor', 'pointer');
    btn.style('border-radius', '6px');
    btn.style('border', '2px solid #1a3a6c');
    btn.style('background', jt === selectedJoin ? '#1a3a6c' : '#fff');
    btn.style('color', jt === selectedJoin ? '#fff' : '#1a3a6c');
    btn.style('font-weight', '600');
    btn.mousePressed(() => {
      selectedJoin = jt;
      updateButtons();
      redraw();
    });
    buttons.push({ btn, jt, btnW });
    bx += btnW + 6;
  });

  // Show NULL toggle
  const chk = createCheckbox('Show NULL values', true);
  chk.position(canvasWidth - 170, btnY + 2);
  chk.style('font-size', '13px');
  chk.changed(() => {
    showNulls = chk.checked();
    redraw();
  });
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = min(container.offsetWidth || 800, 900);
}

function updateButtons() {
  const btnW = canvasWidth > 700 ? 130 : 110;
  buttons.forEach(({ btn, jt }) => {
    btn.style('background', jt === selectedJoin ? '#1a3a6c' : '#fff');
    btn.style('color', jt === selectedJoin ? '#fff' : '#1a3a6c');
  });
}

function draw() {
  background(255);

  // Title
  textAlign(CENTER, TOP);
  fill(26, 58, 108);
  textStyle(BOLD);
  textSize(17);
  text('SQL JOIN Types — Interactive Visualization', canvasWidth / 2, 12);

  // Tables section
  drawTables();

  // Venn diagram
  drawVenn();

  // Results
  drawResults();

  // Info panel
  drawInfo();
}

function drawTables() {
  const jd = joinData[selectedJoin];
  const colW = canvasWidth / 2 - 30;
  const startX = 20;
  const startY = 44;
  const rowH = 20;
  textSize(11);

  // Servers table
  drawTable(startX, startY, colW, rowH, 'Servers', ['server_id', 'hostname'],
    servers.map(s => [s.server_id, s.hostname]), color(33, 150, 243), jd);

  // Apps table
  drawTable(canvasWidth / 2 + 10, startY, colW, rowH, 'Applications', ['app_id', 'app_name', 'server_id'],
    apps.map(a => [a.app_id, a.app_name, a.server_id]), color(255, 152, 0), jd);
}

function drawTable(x, y, w, rowH, title, cols, rows, tColor, jd) {
  fill(tColor);
  noStroke();
  rect(x, y, w, rowH, 3, 3, 0, 0);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(title, x + 6, y + rowH / 2);

  // Header
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(x, y + rowH, w, rowH);
  fill(50);
  textStyle(BOLD);
  const cw = w / cols.length;
  cols.forEach((c, i) => text(c, x + 6 + i * cw, y + rowH + rowH / 2));

  // Rows
  rows.forEach((row, ri) => {
    fill(ri % 2 === 0 ? 250 : 240);
    stroke(200);
    rect(x, y + rowH * 2 + ri * rowH, w, rowH);
    fill(30);
    textStyle(NORMAL);
    row.forEach((val, ci) => text(String(val), x + 6 + ci * cw, y + rowH * 2 + ri * rowH + rowH / 2));
  });
  noStroke();
}

function drawVenn() {
  const cx = canvasWidth * 0.28;
  const cy = 320;
  const r = 52;
  const offset = 36;
  const jd = joinData[selectedJoin];
  const shade = jd.shade;

  // Left circle (servers) — blue
  if (shade === 'left' || shade === 'both') {
    fill(33, 150, 243, 100);
  } else {
    fill(33, 150, 243, 30);
  }
  stroke(33, 150, 243);
  strokeWeight(2);
  ellipse(cx - offset, cy, r * 2);

  // Right circle (apps) — orange
  if (shade === 'right' || shade === 'both') {
    fill(255, 152, 0, 100);
  } else {
    fill(255, 152, 0, 30);
  }
  stroke(255, 152, 0);
  ellipse(cx + offset, cy, r * 2);

  // Intersection highlight
  if (shade === 'intersection' || shade === 'left' || shade === 'right' || shade === 'both') {
    fill(150, 80, 200, 130);
    stroke(120, 40, 180);
    // Approximate intersection with a narrow ellipse
    ellipse(cx, cy, offset * 1.6, r * 1.7);
  }

  noStroke();
  // Labels
  fill(33, 150, 243);
  textStyle(BOLD);
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Servers', cx - offset - 16, cy - r - 10);
  fill(255, 120, 0);
  text('Apps', cx + offset + 12, cy - r - 10);
  fill(80);
  textStyle(NORMAL);
  textSize(10);
  text('∩ Joined', cx, cy + r + 16);

  // SQL box
  const sqlX = canvasWidth * 0.52;
  const sqlY = 270;
  const sqlW = canvasWidth * 0.42;
  fill(30, 30, 60);
  stroke(100);
  strokeWeight(1);
  rect(sqlX, sqlY, sqlW, 90, 6);
  noStroke();
  fill(180, 255, 180);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('SQL:', sqlX + 8, sqlY + 8);
  textStyle(NORMAL);
  fill(200, 240, 200);
  text(joinData[selectedJoin].sql, sqlX + 8, sqlY + 24);
}

function drawResults() {
  const jd = joinData[selectedJoin];
  const results = jd.results;
  const showMax = 8;
  const visible = results.slice(0, showMax);

  const startX = 14;
  const startY = 372;
  const rowH = 18;
  const w = canvasWidth - 28;
  const cols = ['server_id', 'hostname', 'app_id', 'app_name', 'a.server_id'];
  const cw = w / cols.length;

  // Header
  fill(26, 58, 108);
  noStroke();
  rect(startX, startY, w, rowH, 3, 3, 0, 0);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  textSize(11);
  text(`Results (${results.length} row${results.length !== 1 ? 's' : ''})`, startX + 6, startY + rowH / 2);

  // Column headers
  fill(210, 218, 230);
  stroke(180);
  strokeWeight(1);
  rect(startX, startY + rowH, w, rowH);
  fill(40);
  textStyle(BOLD);
  cols.forEach((c, i) => text(c, startX + 6 + i * cw, startY + rowH + rowH / 2));

  // Data rows
  visible.forEach((row, ri) => {
    const vals = [row.server_id, row.hostname, row.app_id, row.app_name, row.sid];
    const isOrphan = (row.server_id === null || row.app_id === null);
    fill(isOrphan && jd.orphan ? color(255, 220, 220) : (ri % 2 === 0 ? 250 : 240));
    stroke(200);
    rect(startX, startY + rowH * 2 + ri * rowH, w, rowH);
    noStroke();
    textStyle(NORMAL);
    vals.forEach((val, ci) => {
      if (val === null) {
        fill(160, 160, 160);
        textStyle(ITALIC);
        text(showNulls ? 'NULL' : '', startX + 6 + ci * cw, startY + rowH * 2 + ri * rowH + rowH / 2);
        textStyle(NORMAL);
        fill(30);
      } else {
        fill(30);
        text(String(val), startX + 6 + ci * cw, startY + rowH * 2 + ri * rowH + rowH / 2);
      }
    });
  });
  if (results.length > showMax) {
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    text(`... and ${results.length - showMax} more rows`, canvasWidth / 2, startY + rowH * 2 + showMax * rowH + 2);
  }
  noStroke();
}

function drawInfo() {
  const jd = joinData[selectedJoin];
  const startY = 510;
  const pad = 14;

  fill(245, 247, 255);
  stroke(180, 200, 240);
  strokeWeight(1);
  rect(pad, startY, canvasWidth - pad * 2, 78, 6);
  noStroke();

  fill(40);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Interpretation:', pad + 8, startY + 8);
  textStyle(NORMAL);
  fill(60);
  text(jd.note, pad + 8, startY + 24, canvasWidth - pad * 2 - 16, 26);

  fill(26, 100, 60);
  textStyle(ITALIC);
  text('Tip: ' + jd.tip, pad + 8, startY + 54, canvasWidth - pad * 2 - 16, 20);
}
