// Primary Key and Foreign Key Relationship Diagram
// CANVAS_HEIGHT: 540

let canvasWidth, canvasHeight = 540;
let hoveredAppRow = -1;  // index into apps table (0-based)
let hoveredSrvRow = -1;
let hoveredLocRow = -1;

// Table geometry (set in draw)
let locX, srvX, appX;
const tableY = 120;
const colW = 170;
const rowH = 28;
const headerH = 34;

// Data
const locations = [
  { id: 101, dc: 'DC-EAST-1', city: 'New York' },
  { id: 102, dc: 'DC-WEST-1', city: 'San Francisco' }
];
const servers = [
  { id: 1, host: 'web-prod-01', ip: '10.0.1.50', locId: 101 },
  { id: 2, host: 'db-prod-01',  ip: '10.0.1.51', locId: 101 },
  { id: 3, host: 'app-dev-01',  ip: '10.0.2.20', locId: 102 }
];
const apps = [
  { id: 501, name: 'Customer Portal',   srvId: 1 },
  { id: 502, name: 'Payment API',       srvId: 1 },
  { id: 503, name: 'Inventory System',  srvId: 2 },
  { id: 504, name: 'Dev Test App',      srvId: 3 }
];

function updateCanvasSize() {
  const container = document.querySelector('main');
  canvasWidth = container ? container.offsetWidth : 860;
  if (canvasWidth < 600) canvasWidth = 600;
}

function setup() {
  updateCanvasSize();
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(document.querySelector('main'));
  textFont('monospace');
}

function draw() {
  background(248, 249, 250);

  // Layout: 3 tables across
  const margin = 20;
  const tableW = floor((canvasWidth - margin * 4) / 3);
  locX = margin;
  srvX = margin * 2 + tableW;
  appX = margin * 3 + tableW * 2;

  // Title
  fill(26, 58, 108);
  noStroke();
  textSize(15);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('Primary Key & Foreign Key Relationships', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100);
  text('Hover over application rows to highlight FK relationships', canvasWidth / 2, 32);

  // Detect hover
  detectHover(tableW);

  // Draw arrows first (under tables)
  drawArrows(tableW);

  // Draw tables
  drawLocationsTable(locX, tableY, tableW);
  drawServersTable(srvX, tableY, tableW);
  drawAppsTable(appX, tableY, tableW);

  // Draw error callout at bottom
  drawErrorCallout(margin, tableY + headerH + rowH * 4 + 60, tableW * 3 + margin * 2);

  // Legend
  drawLegend();
}

function rowTop(row) {
  return tableY + headerH + row * rowH;
}

function detectHover(tableW) {
  hoveredAppRow = -1;
  hoveredSrvRow = -1;
  hoveredLocRow = -1;
  for (let i = 0; i < apps.length; i++) {
    if (mouseX > appX && mouseX < appX + tableW &&
        mouseY > rowTop(i) && mouseY < rowTop(i) + rowH) {
      hoveredAppRow = i;
      // find server row
      hoveredSrvRow = apps[i].srvId - 1;
      // find loc row
      hoveredLocRow = locations.findIndex(l => l.id === servers[hoveredSrvRow].locId);
    }
  }
}

function drawArrows(tableW) {
  // Draw connection arrows from FK cells to PK cells
  const arrowColor = color(34, 160, 100, 180);
  const highlightColor = color(34, 160, 100, 255);
  const dimColor = color(34, 160, 100, 60);

  // Apps server_id FK → Servers server_id PK
  for (let i = 0; i < apps.length; i++) {
    const srvIdx = apps[i].srvId - 1;
    const isHovered = (hoveredAppRow === i);
    const isRelated = (hoveredAppRow >= 0 && apps[hoveredAppRow].srvId === apps[i].srvId && i !== hoveredAppRow);

    let c;
    if (hoveredAppRow < 0) c = arrowColor;
    else if (isHovered) c = highlightColor;
    else if (isRelated) c = color(255, 140, 0, 200);
    else c = dimColor;

    stroke(c);
    strokeWeight(isHovered ? 2.5 : 1.5);
    fill(c);

    const x1 = appX;
    const y1 = rowTop(i) + rowH / 2;
    const x2 = srvX + tableW;
    const y2 = rowTop(srvIdx) + rowH / 2;
    drawArrowLine(x1, y1, x2, y2);
  }

  // Servers location_id FK → Locations location_id PK
  for (let i = 0; i < servers.length; i++) {
    const locIdx = locations.findIndex(l => l.id === servers[i].locId);
    const isRelated = (hoveredSrvRow === i);

    let c;
    if (hoveredAppRow < 0) c = color(70, 130, 200, 150);
    else if (isRelated) c = color(70, 130, 200, 255);
    else c = color(70, 130, 200, 40);

    stroke(c);
    strokeWeight(isRelated ? 2.5 : 1.5);
    fill(c);

    const x1 = srvX;
    const y1 = rowTop(i) + rowH / 2;
    const x2 = locX + tableW;
    const y2 = rowTop(locIdx) + rowH / 2;
    drawArrowLine(x1, y1, x2, y2);
  }
}

function drawArrowLine(x1, y1, x2, y2) {
  const headLen = 9;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = atan2(dy, dx);
  line(x1, y1, x2, y2);
  // arrowhead
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -headLen, headLen / 2.5, -headLen, -headLen / 2.5);
  pop();
}

function drawLocationsTable(x, y, w) {
  const cols = ['location_id', 'data_center', 'city'];
  const colWidths = [w * 0.32, w * 0.38, w * 0.30];
  drawTableHeader(x, y, w, 'Locations', '#2e7d32');
  drawColumnHeaders(x, y + headerH, cols, colWidths, [0], []);
  for (let i = 0; i < locations.length; i++) {
    const vals = [String(locations[i].id), locations[i].dc, locations[i].city];
    const isHighlighted = (hoveredLocRow === i);
    drawRow(x, y + headerH + rowH + i * rowH, vals, colWidths, [0], [], isHighlighted, '#c8e6c9');
  }
  drawTableBorder(x, y, w, headerH + rowH + locations.length * rowH, '#2e7d32');
}

function drawServersTable(x, y, w) {
  const cols = ['server_id', 'hostname', 'ip_address', 'loc_id'];
  const colWidths = [w * 0.22, w * 0.30, w * 0.27, w * 0.21];
  drawTableHeader(x, y, w, 'Servers', '#1565c0');
  drawColumnHeaders(x, y + headerH, cols, colWidths, [0], [3]);
  for (let i = 0; i < servers.length; i++) {
    const vals = [String(servers[i].id), servers[i].host, servers[i].ip, String(servers[i].locId)];
    const isHighlighted = (hoveredSrvRow === i);
    drawRow(x, y + headerH + rowH + i * rowH, vals, colWidths, [0], [3], isHighlighted, '#bbdefb');
  }
  drawTableBorder(x, y, w, headerH + rowH + servers.length * rowH, '#1565c0');
}

function drawAppsTable(x, y, w) {
  const cols = ['app_id', 'app_name', 'srv_id'];
  const colWidths = [w * 0.23, w * 0.52, w * 0.25];
  drawTableHeader(x, y, w, 'Applications', '#e65100');
  drawColumnHeaders(x, y + headerH, cols, colWidths, [0], [2]);
  for (let i = 0; i < apps.length; i++) {
    const vals = [String(apps[i].id), apps[i].name, String(apps[i].srvId)];
    const isHighlighted = (hoveredAppRow === i);
    drawRow(x, y + headerH + rowH + i * rowH, vals, colWidths, [0], [2], isHighlighted, '#ffe0b2');
  }
  drawTableBorder(x, y, w, headerH + rowH + apps.length * rowH, '#e65100');
}

function drawTableHeader(x, y, w, label, colorStr) {
  const c = color(colorStr);
  fill(c);
  noStroke();
  rect(x, y, w, headerH, 4, 4, 0, 0);
  fill(255);
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(label, x + 8, y + headerH / 2);
  textStyle(NORMAL);
}

function drawColumnHeaders(x, y, cols, colWidths, pkCols, fkCols) {
  fill(240, 240, 240);
  noStroke();
  rect(x, y, colWidths.reduce((a, b) => a + b, 0), rowH);
  let cx = x;
  textSize(9);
  textStyle(BOLD);
  for (let i = 0; i < cols.length; i++) {
    const isPK = pkCols.includes(i);
    const isFK = fkCols.includes(i);
    if (isPK) fill('#f9a825');
    else if (isFK) fill('#b3e5fc');
    else fill(240);
    rect(cx, y, colWidths[i], rowH);

    fill(60);
    textAlign(LEFT, CENTER);
    let label = cols[i];
    if (isPK) label += ' PK';
    else if (isFK) label += ' FK';
    text(label, cx + 4, y + rowH / 2);
    cx += colWidths[i];
  }
  textStyle(NORMAL);
}

function drawRow(x, y, vals, colWidths, pkCols, fkCols, highlighted, highlightColor) {
  let cx = x;
  for (let i = 0; i < vals.length; i++) {
    const isPK = pkCols.includes(i);
    const isFK = fkCols.includes(i);
    let bg;
    if (highlighted && isPK) bg = color('#ffd600');
    else if (highlighted && isFK) bg = color('#29b6f6');
    else if (highlighted) bg = color(highlightColor);
    else if (isPK) bg = color('#fff9c4');
    else if (isFK) bg = color('#e1f5fe');
    else bg = color(255);

    fill(bg);
    stroke(200);
    strokeWeight(0.5);
    rect(cx, y, colWidths[i], rowH);

    fill(30);
    noStroke();
    textSize(9);
    textAlign(LEFT, CENTER);
    textStyle(isPK ? BOLD : NORMAL);
    text(vals[i], cx + 4, y + rowH / 2);
    textStyle(NORMAL);
    cx += colWidths[i];
  }
}

function drawTableBorder(x, y, w, h, colorStr) {
  noFill();
  stroke(colorStr);
  strokeWeight(1.5);
  rect(x, y, w, h, 4);
}

function drawErrorCallout(x, y, w) {
  const bx = x + w * 0.08;
  const bw = w * 0.84;
  const bh = 68;
  fill(255, 235, 235);
  stroke('#c62828');
  strokeWeight(1.5);
  rect(bx, y, bw, bh, 6);

  fill('#c62828');
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('ERROR EXAMPLE: Foreign Key Constraint Violation', bx + 12, y + 8);
  textStyle(NORMAL);
  fill(60);
  textSize(10);
  text('Attempted INSERT: app_id=505, app_name="Invalid App", server_id=999', bx + 12, y + 26);
  fill('#c62828');
  textSize(11);
  text('✘ ERROR: server_id=999 does not exist in Servers table. Referential integrity enforced.', bx + 12, y + 44);
}

function drawLegend() {
  const lx = 20, ly = canvasHeight - 38;
  noStroke();
  // PK
  fill('#f9a825'); rect(lx, ly, 14, 14);
  fill(60); textSize(10); textAlign(LEFT, CENTER);
  text('PK = Primary Key (unique, gold)', lx + 18, ly + 7);
  // FK
  fill('#b3e5fc'); rect(lx + 170, ly, 14, 14);
  fill(60); text('FK = Foreign Key (blue, references PK)', lx + 188, ly + 7);
  // Arrow
  stroke(34, 160, 100); strokeWeight(2);
  line(lx + 400, ly + 7, lx + 420, ly + 7);
  fill(34, 160, 100); noStroke();
  triangle(lx + 420, ly + 7, lx + 414, ly + 4, lx + 414, ly + 10);
  fill(60); text('FK → PK reference', lx + 424, ly + 7);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}
