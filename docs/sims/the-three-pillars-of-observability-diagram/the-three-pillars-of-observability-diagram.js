// The Three Pillars of Observability Diagram - p5.js MicroSim
// CANVAS_HEIGHT: 580

let canvasWidth;
const CANVAS_HEIGHT = 580;

let selectedPillar = null; // null, 'logs', 'metrics', 'traces'
let hoverPillar = null;
let animOffset = 0;

// Pillar definitions
const pillars = [
  {
    id: 'logs',
    label: 'Logs',
    subtitle: 'Event-level detail',
    question: 'What happened?',
    color: [74, 144, 226],
    darkColor: [30, 80, 160],
    icon: '📄',
    tools: ['Elasticsearch', 'Splunk', 'Datadog Logs', 'Fluentd'],
    examples: [
      '2025-01-15 14:32:10 ERROR: Connection timeout to DB',
      '2025-01-15 14:32:11 INFO: Retry attempt 1 of 3',
      '2025-01-15 14:32:15 WARN: High memory usage: 87%',
      '2025-01-15 14:32:18 ERROR: Service unavailable: auth-svc'
    ],
    description: 'Logs are timestamped records of discrete events. They provide granular, searchable records of what happened in your system — essential for debugging and root cause analysis.'
  },
  {
    id: 'metrics',
    label: 'Metrics',
    subtitle: 'Aggregated measurements',
    question: 'How much / many?',
    color: [126, 211, 33],
    darkColor: [60, 130, 20],
    icon: '📊',
    tools: ['Prometheus', 'Grafana', 'CloudWatch', 'Datadog APM'],
    examples: [
      'Request Rate: 2,847 req/sec  ↑',
      'Error Rate: 0.3%            ✓',
      'CPU Usage: 73%              ⚠',
      'Memory: 87%                 ⚠',
      'Latency p99: 342ms          ✓'
    ],
    description: 'Metrics are numeric measurements sampled over time. They enable trend analysis, capacity planning, and alerting. Low overhead makes them ideal for always-on monitoring.'
  },
  {
    id: 'traces',
    label: 'Traces',
    subtitle: 'Request journey',
    question: 'Where in the flow?',
    color: [245, 166, 35],
    darkColor: [180, 100, 10],
    icon: '🔗',
    tools: ['Jaeger', 'Zipkin', 'OpenTelemetry', 'AWS X-Ray'],
    examples: [
      'API Gateway        12ms  ▓▓',
      '└─ Auth Service    45ms  ▓▓▓▓▓',
      '   └─ Database     180ms ▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
      '└─ Cache Service   8ms   ▓',
      'Total: 245ms — SLO: 200ms ⚠'
    ],
    description: 'Distributed traces track a request as it flows through multiple services. They reveal latency bottlenecks and dependencies, critical for microservices and cloud-native architectures.'
  }
];

// Platform at bottom
const platform = {
  label: 'IT Management Graph',
  subtitle: 'Connecting Platform',
  color: [200, 150, 20]
};

function updateCanvasSize() {
  canvasWidth = document.querySelector('main').offsetWidth || 800;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasWidth, CANVAS_HEIGHT);
  canvas.parent(document.querySelector('main'));
  textFont('sans-serif');
}

function draw() {
  background(248, 249, 250);
  animOffset = (animOffset + 0.02) % TWO_PI;

  // Title
  noStroke();
  fill(26, 58, 108);
  textAlign(CENTER, TOP);
  textSize(20);
  textStyle(BOLD);
  text('The Three Pillars of Observability', canvasWidth / 2, 12);
  textStyle(NORMAL);
  fill(100);
  textSize(12);
  text('Click a pillar to explore examples, tools, and details', canvasWidth / 2, 38);

  // Layout
  let centerX = canvasWidth / 2;
  let pillarY = 130; // top of pillars
  let pillarH = 180;
  let pillarW = min(160, (canvasWidth - 60) / 3 - 10);
  let spacing = (canvasWidth - pillarW * 3) / 4;

  let pillarPositions = [
    { x: spacing + pillarW / 2, y: pillarY },
    { x: spacing * 2 + pillarW * 1.5, y: pillarY },
    { x: spacing * 3 + pillarW * 2.5, y: pillarY }
  ];

  // Platform at bottom
  let platY = pillarY + pillarH + 80;
  let platW = min(320, canvasWidth - 60);
  let platH = 56;
  let platX = centerX - platW / 2;

  // Draw connecting lines from pillars to platform
  for (let i = 0; i < 3; i++) {
    let px = pillarPositions[i].x;
    let py = pillarPositions[i].y + pillarH;
    let [r, g, b] = pillars[i].color;

    stroke(r, g, b, 160);
    strokeWeight(2.5);
    drawingContext.setLineDash([6, 4]);
    line(px, py, centerX, platY);
    drawingContext.setLineDash([]);

    // Arrow at platform
    fill(r, g, b, 160);
    noStroke();
    let angle = atan2(platY - py, centerX - px);
    push();
    translate(centerX - cos(angle) * 14, platY - sin(angle) * 14);
    rotate(angle);
    triangle(8, 0, -4, -5, -4, 5);
    pop();
  }

  // Dashed triangle between pillars (correlated insights)
  stroke(150, 150, 150, 120);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 6]);
  for (let i = 0; i < 3; i++) {
    let a = pillarPositions[i];
    let b = pillarPositions[(i + 1) % 3];
    line(a.x, a.y + pillarH / 2, b.x, b.y + pillarH / 2);
  }
  drawingContext.setLineDash([]);

  // "Correlated insights" label in center of triangle
  fill(120, 120, 120);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(ITALIC);
  text('Correlated\ninsights', centerX, pillarY + pillarH / 2 - 20);
  textStyle(NORMAL);

  // Draw pillars
  for (let i = 0; i < 3; i++) {
    drawPillar(pillars[i], pillarPositions[i].x, pillarPositions[i].y, pillarW, pillarH, i);
  }

  // Platform box
  let [pr, pg, pb] = platform.color;
  let pulse = sin(animOffset) * 3;
  fill(pr, pg, pb, 220);
  stroke(pr - 40, pg - 40, pb - 40);
  strokeWeight(2);
  rect(platX - pulse / 2, platY - pulse / 4, platW + pulse, platH + pulse / 2, 10);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(platform.label, centerX, platY + 18);
  textStyle(NORMAL);
  textSize(11);
  fill(255, 240, 180);
  text(platform.subtitle, centerX, platY + 38);

  // Question labels on connecting lines
  for (let i = 0; i < 3; i++) {
    let px = pillarPositions[i].x;
    let py = pillarPositions[i].y + pillarH;
    let mx = (px + centerX) / 2;
    let my = (py + platY) / 2;
    let [r, g, b] = pillars[i].color;

    fill(r, g, b, 230);
    noStroke();
    rect(mx - 40, my - 10, 80, 20, 6);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(pillars[i].question, mx, my);
    textStyle(NORMAL);
  }

  // Detail panel if a pillar is selected
  if (selectedPillar !== null) {
    drawDetailPanel(pillars[selectedPillar], platY + platH + 14);
  } else {
    // Hint text
    fill(120);
    textAlign(CENTER, TOP);
    textSize(12);
    text('Click any pillar to see examples and tools', centerX, platY + platH + 14);
  }
}

function drawPillar(pillar, cx, cy, w, h, idx) {
  let [r, g, b] = pillar.color;
  let [dr, dg, db] = pillar.darkColor;

  let isSelected = (selectedPillar === idx);
  let isHover = (hoverPillar === idx);

  let scale = isSelected ? 1.04 : (isHover ? 1.02 : 1.0);
  let sw = w * scale;
  let sh = h * scale;
  let sx = cx - sw / 2;
  let sy = cy - (sh - h) / 2;

  // Shadow
  if (isSelected || isHover) {
    fill(r, g, b, 40);
    noStroke();
    rect(sx + 4, sy + 4, sw, sh, 12);
  }

  // Pillar body
  fill(isSelected ? r : r, isSelected ? g : g, isSelected ? b : b, isSelected ? 255 : 210);
  stroke(dr, dg, db);
  strokeWeight(isSelected ? 3 : 1.5);
  rect(sx, sy, sw, sh, 10);

  // Header band
  fill(dr, dg, db);
  noStroke();
  rect(sx, sy, sw, 38, 10, 10, 0, 0);

  // Label
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text(pillar.label, cx, sy + 20);
  textStyle(NORMAL);

  // Subtitle
  fill(255, 240, 200);
  textSize(10);
  text(pillar.subtitle, cx, sy + 55);

  // Mini content preview
  fill(255, 255, 255, 220);
  textAlign(LEFT, TOP);
  textSize(9.5);
  textFont('monospace');
  let previewLines = pillar.examples.slice(0, 3);
  for (let i = 0; i < previewLines.length; i++) {
    fill(30, 40, 60);
    text(previewLines[i].substring(0, 22), sx + 8, sy + 70 + i * 16, sw - 12, 16);
  }
  textFont('sans-serif');

  // Click hint
  fill(255, 255, 255, 180);
  textAlign(CENTER, BOTTOM);
  textSize(10);
  text(isSelected ? '▼ Selected' : '▶ Click to expand', cx, sy + sh - 6);
}

function drawDetailPanel(pillar, panelY) {
  let [r, g, b] = pillar.color;
  let [dr, dg, db] = pillar.darkColor;
  let panelH = CANVAS_HEIGHT - panelY - 10;
  let panelX = 10;
  let panelW = canvasWidth - 20;

  if (panelH < 60) return;

  fill(255);
  stroke(r, g, b, 150);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  // Header
  fill(r, g, b);
  noStroke();
  rect(panelX, panelY, panelW, 28, 8, 8, 0, 0);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(pillar.icon + '  ' + pillar.label + ' — ' + pillar.subtitle, panelX + 12, panelY + 14);
  textStyle(NORMAL);

  let col1W = panelW * 0.38;
  let col2W = panelW * 0.32;
  let contentY = panelY + 36;
  let contentH = panelH - 42;

  // Column 1: Description
  noStroke();
  fill(40, 40, 80);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('About:', panelX + 10, contentY);
  textStyle(NORMAL);
  fill(60, 60, 80);
  textSize(10.5);
  text(pillar.description, panelX + 10, contentY + 16, col1W - 10, contentH - 20);

  // Divider
  stroke(r, g, b, 60);
  strokeWeight(1);
  line(panelX + col1W + 4, contentY, panelX + col1W + 4, panelY + panelH - 8);

  // Column 2: Examples
  noStroke();
  fill(40, 40, 80);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Example output:', panelX + col1W + 14, contentY);
  textStyle(NORMAL);

  fill(20, 35, 55);
  noStroke();
  rect(panelX + col1W + 14, contentY + 16, col2W - 20, contentH - 22, 4);
  textFont('monospace');
  fill(160, 220, 160);
  textSize(9.5);
  for (let i = 0; i < pillar.examples.length; i++) {
    text(pillar.examples[i], panelX + col1W + 18, contentY + 20 + i * 16, col2W - 28, 16);
  }
  textFont('sans-serif');

  // Divider
  stroke(r, g, b, 60);
  strokeWeight(1);
  line(panelX + col1W + col2W + 8, contentY, panelX + col1W + col2W + 8, panelY + panelH - 8);

  // Column 3: Tools
  noStroke();
  fill(40, 40, 80);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  let col3X = panelX + col1W + col2W + 18;
  text('Popular tools:', col3X, contentY);
  textStyle(NORMAL);
  for (let i = 0; i < pillar.tools.length; i++) {
    fill(r, g, b, 200);
    noStroke();
    rect(col3X, contentY + 20 + i * 28, panelW - col1W - col2W - 30, 22, 5);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(11);
    text(pillar.tools[i], col3X + 8, contentY + 30 + i * 28);
  }
}

function mouseMoved() {
  hoverPillar = getPillarAt(mouseX, mouseY);
}

function mousePressed() {
  let hit = getPillarAt(mouseX, mouseY);
  if (hit !== null) {
    selectedPillar = (selectedPillar === hit) ? null : hit;
  } else {
    selectedPillar = null;
  }
}

function getPillarAt(mx, my) {
  let pillarY = 130;
  let pillarH = 180;
  let pillarW = min(160, (canvasWidth - 60) / 3 - 10);
  let spacing = (canvasWidth - pillarW * 3) / 4;

  let positions = [
    spacing + pillarW / 2,
    spacing * 2 + pillarW * 1.5,
    spacing * 3 + pillarW * 2.5
  ];

  for (let i = 0; i < 3; i++) {
    let cx = positions[i];
    let cy = pillarY;
    if (mx >= cx - pillarW / 2 - 4 && mx <= cx + pillarW / 2 + 4 &&
        my >= cy - 4 && my <= cy + pillarH + 4) {
      return i;
    }
  }
  return null;
}
