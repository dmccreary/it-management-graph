// Graph Traversal Algorithm Comparison: DFS vs BFS
// CANVAS_HEIGHT: 620
// p5.js side-by-side comparison of DFS and BFS on the same 7-node graph

const NODES = [
  { id: 0, label: 'Customer\nPortal',  x: 0,   y: 0   },
  { id: 1, label: 'API\nGateway',      x: -1.4, y: 1  },
  { id: 2, label: 'Web\nServer',       x: 1.4,  y: 1  },
  { id: 3, label: 'Auth\nService',     x: -2.2, y: 2.2 },
  { id: 4, label: 'Rate\nLimiter',     x: -0.6, y: 2.2 },
  { id: 5, label: 'Static\nCDN',       x: 0.6,  y: 2.2 },
  { id: 6, label: 'Session\nStore',    x: 2.2,  y: 2.2 },
];
const ADJ = [[1,2],[3,4],[5,6],[],[],[],[],]; // directed adjacency

let dfsOrder = [];
let bfsOrder = [];
let dfsStep = 0;
let bfsStep = 0;
let speedSlider, stepBtn, resetBtn;
let autoPlay = false;
let lastAuto = 0;

function computeDFS() {
  const visited = new Set();
  const order = [];
  function dfs(n) { if (visited.has(n)) return; visited.add(n); order.push(n); for (const nb of ADJ[n]) dfs(nb); }
  dfs(0);
  return order;
}

function computeBFS() {
  const visited = new Set([0]);
  const order = [0];
  const queue = [0];
  while (queue.length) {
    const n = queue.shift();
    for (const nb of ADJ[n]) { if (!visited.has(nb)) { visited.add(nb); order.push(nb); queue.push(nb); } }
  }
  return order;
}

function setup() {
  const cnv = createCanvas(900, 620);
  cnv.parent(document.querySelector('main'));
  frameRate(30);

  dfsOrder = computeDFS();
  bfsOrder = computeBFS();

  speedSlider = createSlider(200, 2000, 700, 100);
  speedSlider.parent(document.querySelector('main'));
  speedSlider.style('width', '160px');

  stepBtn = createButton('Next Step');
  stepBtn.parent(document.querySelector('main'));
  stepBtn.mousePressed(() => {
    autoPlay = false;
    dfsStep = min(dfsStep + 1, dfsOrder.length);
    bfsStep = min(bfsStep + 1, bfsOrder.length);
  });

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(() => { dfsStep = 0; bfsStep = 0; autoPlay = false; });

  const playBtn = createButton('Auto Play');
  playBtn.parent(document.querySelector('main'));
  playBtn.mousePressed(() => { autoPlay = true; lastAuto = millis(); });
}

function draw() {
  background(248, 249, 250);

  // Auto advance
  if (autoPlay && millis() - lastAuto > speedSlider.value()) {
    lastAuto = millis();
    if (dfsStep < dfsOrder.length || bfsStep < bfsOrder.length) {
      dfsStep = min(dfsStep + 1, dfsOrder.length);
      bfsStep = min(bfsStep + 1, bfsOrder.length);
    } else { autoPlay = false; }
  }

  // Title
  textAlign(CENTER); fill(26, 58, 108); textSize(18); noStroke();
  text('DFS vs BFS Traversal Comparison', 450, 28);

  // Draw both panels
  drawPanel(60, 50, 380, 540, 'Depth-First Search (DFS)', dfsOrder, dfsStep, color(111, 66, 193), color(220, 207, 255));
  drawPanel(460, 50, 380, 540, 'Breadth-First Search (BFS)', bfsOrder, bfsStep, color(13, 110, 253), color(207, 226, 255));

  // Controls label
  fill(80); textSize(12); textAlign(LEFT);
  text('Speed:', 60, 606);
  textAlign(LEFT);
  text(`Step: ${min(dfsStep, bfsStep)} / ${dfsOrder.length}`, 280, 606);
}

function drawPanel(px, py, pw, ph, title, order, step, activeCol, visitedCol) {
  // Panel background
  fill(255); stroke(222, 226, 230); strokeWeight(1);
  rect(px, py, pw, ph, 8);

  // Title bar
  fill(activeCol); noStroke();
  rect(px, py, pw, 34, 8, 8, 0, 0);
  fill(255); textSize(13); textAlign(CENTER); noStroke();
  text(title, px + pw / 2, py + 21);

  const cx = px + pw / 2;
  const visitedSet = new Set(order.slice(0, step));
  const currentNode = step > 0 ? order[step - 1] : null;

  // Scale nodes to panel
  const scale = 80;
  const oy = py + 130;

  // Draw edges
  for (let n = 0; n < NODES.length; n++) {
    for (const nb of ADJ[n]) {
      const na = NODES[n], nbNode = NODES[nb];
      const x1 = cx + na.x * scale, y1 = oy + na.y * scale;
      const x2 = cx + nbNode.x * scale, y2 = oy + nbNode.y * scale;
      const bothVisited = visitedSet.has(n) && visitedSet.has(nb);
      stroke(bothVisited ? activeCol : 180); strokeWeight(bothVisited ? 2 : 1);
      drawArrow(x1, y1, x2, y2, 20);
    }
  }

  // Draw nodes
  for (const nd of NODES) {
    const nx = cx + nd.x * scale;
    const ny = oy + nd.y * scale;
    const isVisited = visitedSet.has(nd.id);
    const isCurrent = nd.id === currentNode;
    const visitIdx = order.indexOf(nd.id);

    noStroke();
    if (isCurrent) { fill(255, 200, 0); stroke(180, 120, 0); strokeWeight(3); }
    else if (isVisited) { fill(visitedCol); stroke(activeCol); strokeWeight(2); }
    else { fill(240); stroke(180); strokeWeight(1); }
    ellipse(nx, ny, 44, 44);

    // Visit order number
    if (isVisited && visitIdx < step) {
      fill(isCurrent ? color(80) : activeCol); noStroke(); textSize(10); textAlign(CENTER);
      text(visitIdx + 1, nx, ny - 18);
    }

    // Label
    fill(isCurrent ? color(40) : (isVisited ? activeCol : color(120)));
    noStroke(); textSize(10); textAlign(CENTER);
    const lines = nd.label.split('\n');
    text(lines[0], nx, ny - 4);
    if (lines[1]) text(lines[1], nx, ny + 8);
  }

  // Order display
  fill(60); noStroke(); textSize(11); textAlign(LEFT);
  text('Visit order: ' + order.slice(0, step).map((id, i) => `${i+1}.${NODES[id].label.replace('\n',' ')}`).join(' → '), px + 10, py + ph - 12);
}

function drawArrow(x1, y1, x2, y2, r) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  const sx = x1 + ux * r, sy = y1 + uy * r;
  const ex = x2 - ux * (r + 6), ey = y2 - uy * (r + 6);
  line(sx, sy, ex, ey);
  // arrowhead
  push(); translate(ex, ey); rotate(atan2(dy, dx));
  fill(get(floor(ex), floor(ey)));
  noStroke(); triangle(6, 0, -4, -4, -4, 4);
  pop();
}
