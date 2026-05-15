// SQL Query Execution Visualization - p5.js MicroSim
// CANVAS_HEIGHT: 620

let canvasWidth;
const CANVAS_HEIGHT = 620;
let currentStep = 0;
let prevBtn, nextBtn, resetBtn;

const steps = [
  {
    id: 0,
    label: "Developer Writes SQL Query",
    phase: "user",
    color: [52, 152, 219],
    icon: "SQL",
    detail: "SELECT h.hostname, h.ip_address\nFROM Servers h\nJOIN Services s ON h.id = s.server_id\nWHERE h.status = 'active'\nORDER BY h.hostname;",
    description: "The developer writes a SQL JOIN query to retrieve active servers and their services. The query is submitted to the RDBMS engine.",
    layer: "User / Application Layer"
  },
  {
    id: 1,
    label: "Parser Validates Syntax",
    phase: "sql-engine",
    color: [41, 128, 185],
    icon: "PARSE",
    detail: "Checking:\n✓ SQL grammar\n✓ Table names exist\n✓ Column names valid\n✓ Data types match\n→ Building parse tree...",
    description: "The SQL parser checks grammar, validates table and column names, verifies data types match. Output: a parse tree or syntax error.",
    layer: "SQL Engine"
  },
  {
    id: 2,
    label: "Syntax Valid? → Yes",
    phase: "sql-engine",
    color: [39, 174, 96],
    icon: "✓",
    detail: "Parse tree built\nsuccessfully.\n\nNo syntax errors\ndetected.\n\nProceeding to\noptimizer...",
    description: "Syntax check passed. If errors were found, an error message would be returned to the user (red path). The parse tree is passed to the query optimizer.",
    layer: "SQL Engine"
  },
  {
    id: 3,
    label: "Query Optimizer Generates Plans",
    phase: "sql-engine",
    color: [230, 126, 34],
    icon: "OPT",
    detail: "Plan A: Index seek on\n  idx_servers_status → Join\n  Cost: 312 units\n\nPlan B: Full table scan\n  → Hash join\n  Cost: 4,820 units\n\nPlan C: Nested loop\n  Cost: 1,240 units",
    description: "The optimizer creates multiple execution plans, estimates I/O/CPU cost using table statistics, and selects the cheapest plan. This is where RDBMS intelligence lives.",
    layer: "SQL Engine"
  },
  {
    id: 4,
    label: "Select Lowest-Cost Execution Plan",
    phase: "sql-engine",
    color: [211, 84, 0],
    icon: "PLAN",
    detail: "Selected Plan A:\n→ Index seek:\n   idx_servers_status\n→ Nested-loop join\n   with Services\n→ Sort by hostname\nEstimated cost: 312",
    description: "Plan A selected: use index idx_servers_status to filter active servers, then nested-loop join with Services table. Much cheaper than full scan.",
    layer: "SQL Engine"
  },
  {
    id: 5,
    label: "Execute Plan: Access Storage Layer",
    phase: "storage",
    color: [142, 68, 173],
    icon: "I/O",
    detail: "Reading data pages...\n→ Index seek: status='active'\n→ Rows found: 127\n→ Reading Services...\n→ Join rows matched: 284\nBuffer cache hits: 89%\nDisk reads: 11%",
    description: "The storage engine reads data pages from disk or buffer cache. Uses the index for efficient filtering. This is where actual I/O happens — disk access is the slowest part.",
    layer: "Storage Engine"
  },
  {
    id: 6,
    label: "Apply Sorting & Filtering",
    phase: "storage",
    color: [155, 89, 182],
    icon: "SORT",
    detail: "ORDER BY hostname\n→ Sorting 284 rows...\n→ Applying DISTINCT\n→ Rows in result: 127\n\nStats collector:\nUpdating table stats\nfor future queries",
    description: "ORDER BY, GROUP BY, HAVING, and LIMIT operations are applied. Stats collector updates table statistics — improving future query optimizations.",
    layer: "Storage Engine"
  },
  {
    id: 7,
    label: "Return Results to User",
    phase: "user",
    color: [39, 174, 96],
    icon: "DONE",
    detail: "hostname      | ip_address\n--------------+-----------\napp-server-01 | 10.0.1.10\napp-server-02 | 10.0.1.11\ndb-primary    | 10.0.2.10\n...(127 rows)\n\nExecution: 45ms",
    description: "Results are formatted as rows and columns and returned to the application. Query complete in 45ms with 127 rows returned from 10,000 scanned.",
    layer: "User / Application Layer"
  }
];

const stats = {
  executionTime: "45ms",
  rowsScanned: "10,000",
  rowsReturned: "127",
  indexUsed: "idx_servers_status",
  queryCost: "312 units",
  cacheHitRate: "89%"
};

function updateCanvasSize() {
  canvasWidth = document.querySelector('main').offsetWidth || 800;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, CANVAS_HEIGHT);
  canvas.parent(document.querySelector('main'));

  // Controls
  let controlY = CANVAS_HEIGHT - 50;
  let btnW = 110;

  prevBtn = createButton('◀ Previous');
  prevBtn.position(20, controlY);
  prevBtn.size(btnW, 36);
  prevBtn.style('font-size', '14px');
  prevBtn.style('cursor', 'pointer');
  prevBtn.style('border-radius', '6px');
  prevBtn.style('border', '1px solid #1a3a6c');
  prevBtn.style('background', '#1a3a6c');
  prevBtn.style('color', 'white');
  prevBtn.mousePressed(() => { if (currentStep > 0) currentStep--; });

  nextBtn = createButton('Next ▶');
  nextBtn.position(140, controlY);
  nextBtn.size(btnW, 36);
  nextBtn.style('font-size', '14px');
  nextBtn.style('cursor', 'pointer');
  nextBtn.style('border-radius', '6px');
  nextBtn.style('border', '1px solid #1a3a6c');
  nextBtn.style('background', '#1a3a6c');
  nextBtn.style('color', 'white');
  nextBtn.mousePressed(() => { if (currentStep < steps.length - 1) currentStep++; });

  resetBtn = createButton('Reset');
  resetBtn.position(260, controlY);
  resetBtn.size(80, 36);
  resetBtn.style('font-size', '14px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('border-radius', '6px');
  resetBtn.style('border', '1px solid #6c757d');
  resetBtn.style('background', '#6c757d');
  resetBtn.style('color', 'white');
  resetBtn.mousePressed(() => { currentStep = 0; });
}

function draw() {
  background(248, 249, 250);

  // Title
  fill(26, 58, 108);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  text('SQL Query Execution Visualization', 15, 12);
  textStyle(NORMAL);
  textSize(12);
  fill(100, 100, 100);
  text(`Step ${currentStep + 1} of ${steps.length}`, 15, 38);

  let step = steps[currentStep];

  // Left panel: step flow (mini pipeline)
  drawPipeline();

  // Center panel: current step detail
  drawStepDetail(step);

  // Right panel: stats
  drawStatsPanel();

  // Layer label
  drawLayerBadge(step);

  // Description at bottom
  drawDescription(step);
}

function drawPipeline() {
  let panelX = 15;
  let panelW = 170;
  let startY = 55;

  fill(240, 244, 255);
  stroke(180, 200, 240);
  strokeWeight(1);
  rect(panelX, startY, panelW, steps.length * 54 + 10, 8);

  noStroke();
  fill(26, 58, 108);
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Query Pipeline', panelX + panelW / 2, startY + 5);
  textStyle(NORMAL);

  for (let i = 0; i < steps.length; i++) {
    let s = steps[i];
    let bx = panelX + 10;
    let by = startY + 20 + i * 54;
    let bw = panelW - 20;
    let bh = 44;

    let [r, g, b] = s.color;
    let alpha = (i === currentStep) ? 255 : 80;

    // Highlight active
    if (i === currentStep) {
      fill(r, g, b, 220);
      stroke(r - 40, g - 40, b - 40);
      strokeWeight(2);
    } else if (i < currentStep) {
      fill(r, g, b, 60);
      stroke(r, g, b, 120);
      strokeWeight(1);
    } else {
      fill(220, 220, 220, 120);
      stroke(180, 180, 180);
      strokeWeight(1);
    }
    rect(bx, by, bw, bh, 6);

    // Step number
    noStroke();
    if (i === currentStep) {
      fill(255);
    } else if (i < currentStep) {
      fill(r, g, b, 200);
    } else {
      fill(150);
    }
    textSize(10);
    textAlign(LEFT, CENTER);
    text(`${i + 1}. ${s.label.substring(0, 22)}${s.label.length > 22 ? '…' : ''}`, bx + 6, by + bh / 2);

    // Arrow between steps
    if (i < steps.length - 1) {
      stroke(150);
      strokeWeight(1);
      let midX = panelX + panelW / 2;
      line(midX, by + bh, midX, by + bh + 10);
      fill(150);
      noStroke();
      triangle(midX - 4, by + bh + 5, midX + 4, by + bh + 5, midX, by + bh + 12);
    }
  }
}

function drawStepDetail(step) {
  let px = 200;
  let py = 55;
  let pw = canvasWidth - 400;
  let ph = 400;

  let [r, g, b] = step.color;

  // Card background
  fill(255);
  stroke(r, g, b, 120);
  strokeWeight(2);
  rect(px, py, pw, ph, 10);

  // Header bar
  fill(r, g, b);
  noStroke();
  rect(px, py, pw, 44, 10, 10, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(step.label, px + pw / 2, py + 22);
  textStyle(NORMAL);

  // Icon badge
  fill(255, 255, 255, 40);
  noStroke();
  ellipse(px + pw - 35, py + 22, 50, 34);
  fill(255);
  textSize(11);
  textStyle(BOLD);
  text(step.icon, px + pw - 35, py + 22);
  textStyle(NORMAL);

  // Detail code block
  fill(30, 40, 60);
  stroke(r, g, b, 60);
  strokeWeight(1);
  rect(px + 14, py + 54, pw - 28, 200, 6);

  fill(180, 220, 180);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textFont('monospace');
  text(step.detail, px + 22, py + 62, pw - 44, 185);
  textFont('sans-serif');

  // Progress bar
  let progress = (currentStep + 1) / steps.length;
  fill(220, 220, 220);
  noStroke();
  rect(px + 14, py + 265, pw - 28, 12, 6);
  fill(r, g, b);
  rect(px + 14, py + 265, (pw - 28) * progress, 12, 6);
  fill(80);
  textSize(10);
  textAlign(LEFT, CENTER);
  text(`Progress: ${Math.round(progress * 100)}%`, px + 14, py + 295);

  // Phase label
  textAlign(RIGHT, CENTER);
  fill(r, g, b);
  textSize(11);
  textStyle(BOLD);
  text(step.phase.toUpperCase(), px + pw - 14, py + 295);
  textStyle(NORMAL);
}

function drawStatsPanel() {
  let sx = canvasWidth - 185;
  let sy = 55;
  let sw = 170;
  let sh = 270;

  fill(255, 248, 230);
  stroke(230, 170, 50);
  strokeWeight(1);
  rect(sx, sy, sw, sh, 8);

  noStroke();
  fill(180, 100, 0);
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Query Statistics', sx + sw / 2, sy + 8);
  textStyle(NORMAL);

  let statItems = [
    ['Exec Time', stats.executionTime],
    ['Rows Scanned', stats.rowsScanned],
    ['Rows Returned', stats.rowsReturned],
    ['Index Used', stats.indexUsed],
    ['Query Cost', stats.queryCost],
    ['Cache Hit Rate', stats.cacheHitRate]
  ];

  for (let i = 0; i < statItems.length; i++) {
    let iy = sy + 32 + i * 38;
    fill(245, 240, 220);
    stroke(210, 180, 100);
    strokeWeight(1);
    rect(sx + 8, iy, sw - 16, 32, 4);

    noStroke();
    fill(100, 70, 0);
    textAlign(LEFT, TOP);
    textSize(9);
    text(statItems[i][0], sx + 13, iy + 4);
    fill(30, 30, 30);
    textSize(12);
    textStyle(BOLD);
    text(statItems[i][1], sx + 13, iy + 16);
    textStyle(NORMAL);
  }

  // Highlight steps that are past
  let activeLabel = sy + sh + 10;
  noStroke();
  fill(80, 80, 80);
  textAlign(LEFT, TOP);
  textSize(11);
  text('Completed steps:', sx, activeLabel);
  for (let i = 0; i <= currentStep; i++) {
    let [r, g, b] = steps[i].color;
    fill(r, g, b, 200);
    noStroke();
    ellipse(sx + 8 + i * 18, activeLabel + 24, 14, 14);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(8);
    text(i + 1, sx + 8 + i * 18, activeLabel + 24);
  }
}

function drawLayerBadge(step) {
  let layerColors = {
    'User / Application Layer': [52, 152, 219],
    'SQL Engine': [230, 126, 34],
    'Storage Engine': [142, 68, 173]
  };
  let [r, g, b] = layerColors[step.layer] || [100, 100, 100];

  fill(r, g, b, 200);
  noStroke();
  rect(200, 468, 180, 26, 6);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Layer: ' + step.layer, 210, 481);
  textStyle(NORMAL);
}

function drawDescription(step) {
  let dy = 500;
  fill(255);
  stroke(200, 200, 220);
  strokeWeight(1);
  rect(15, dy, canvasWidth - 30, 65, 6);

  noStroke();
  fill(40, 40, 80);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('What happens at this step:', 22, dy + 7);
  textStyle(NORMAL);
  fill(60, 60, 80);
  textSize(11.5);
  text(step.description, 22, dy + 24, canvasWidth - 50, 36);
}
