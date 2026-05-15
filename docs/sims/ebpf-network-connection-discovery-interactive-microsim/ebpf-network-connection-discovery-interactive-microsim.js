// CANVAS_HEIGHT: 580
// eBPF Network Connection Discovery Interactive MicroSim
// Demonstrates how eBPF monitors kernel-level events to discover service dependencies

let canvasW = 900, canvasH = 580;
let running = false;
let showEBPF = true;
let animPackets = true;
let filterHTTP = true, filterDB = true, filterCache = true;
let speedSlider, startBtn, resetBtn, ebpfCheck, packetCheck, httpCheck, dbCheck, cacheCheck;

// Service processes
const services = [
  { id: 0, name: 'Web App',      x: 0.18, y: 0.72, color: '#2196F3' },
  { id: 1, name: 'API Service',  x: 0.50, y: 0.72, color: '#4CAF50' },
  { id: 2, name: 'Database',     x: 0.82, y: 0.72, color: '#FF9800' },
  { id: 3, name: 'Cache Svc',    x: 0.65, y: 0.55, color: '#9C27B0' },
];

// Connection definitions
const connDefs = [
  { src: 0, dst: 1, type: 'http',  label: 'HTTP:8080',     proto: 'HTTP',       color: '#7ED321' },
  { src: 1, dst: 2, type: 'db',    label: 'PostgreSQL:5432',proto: 'Database',   color: '#4A90E2' },
  { src: 1, dst: 3, type: 'cache', label: 'Redis:6379',     proto: 'Cache',      color: '#E74C3C' },
  { src: 0, dst: 3, type: 'cache', label: 'Redis:6379',     proto: 'Cache',      color: '#E74C3C' },
];

let discoveredConns = [];
let activeConn = [];   // {src,dst,progress,color}
let particles = [];    // animated packets
let stats = { total: 0, unique: 0, ebpfEvents: 0, graphEdges: 0 };
let connCounts = {};
let ebpfGlow = 0;
let nextConnIdx = 0;
let lastEvent = 0;
let connLog = [];      // {time,label}

function getSpeed() { return speedSlider ? speedSlider.value() : 800; }
function isActive(type) {
  if (type === 'http')  return filterHTTP;
  if (type === 'db')    return filterDB;
  if (type === 'cache') return filterCache;
  return true;
}

function setup() {
  updateCanvasSize();
  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent(document.querySelector('main'));

  // Controls
  startBtn = createButton('▶ Start Discovery');
  startBtn.parent(document.querySelector('main'));
  startBtn.style('margin', '6px 4px');
  startBtn.style('padding', '6px 14px');
  startBtn.style('background', '#43a047');
  startBtn.style('color', 'white');
  startBtn.style('border', 'none');
  startBtn.style('border-radius', '4px');
  startBtn.style('cursor', 'pointer');
  startBtn.style('font-size', '13px');
  startBtn.mousePressed(() => {
    running = !running;
    startBtn.html(running ? '⏸ Pause' : '▶ Start Discovery');
    startBtn.style('background', running ? '#f9a825' : '#43a047');
    startBtn.style('color', running ? '#333' : 'white');
  });

  resetBtn = createButton('↺ Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.style('margin', '6px 4px');
  resetBtn.style('padding', '6px 14px');
  resetBtn.style('background', '#6c757d');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('font-size', '13px');
  resetBtn.mousePressed(resetSim);

  createSpan(' Speed: ').parent(document.querySelector('main')).style('font-size','12px');
  speedSlider = createSlider(200, 2000, 800, 100);
  speedSlider.parent(document.querySelector('main'));
  speedSlider.style('width', '100px');

  ebpfCheck = createCheckbox('Show eBPF', true);
  ebpfCheck.parent(document.querySelector('main'));
  ebpfCheck.style('margin-left', '10px');
  ebpfCheck.style('font-size', '12px');
  ebpfCheck.changed(() => { showEBPF = ebpfCheck.checked(); });

  httpCheck = createCheckbox('HTTP', true);
  httpCheck.parent(document.querySelector('main'));
  httpCheck.style('margin-left', '10px');
  httpCheck.style('font-size', '12px');
  httpCheck.changed(() => { filterHTTP = httpCheck.checked(); });

  dbCheck = createCheckbox('Database', true);
  dbCheck.parent(document.querySelector('main'));
  dbCheck.style('margin-left', '6px');
  dbCheck.style('font-size', '12px');
  dbCheck.changed(() => { filterDB = dbCheck.checked(); });

  cacheCheck = createCheckbox('Cache', true);
  cacheCheck.parent(document.querySelector('main'));
  cacheCheck.style('margin-left', '6px');
  cacheCheck.style('font-size', '12px');
  cacheCheck.changed(() => { filterCache = cacheCheck.checked(); });

  textFont('monospace');
}

function updateCanvasSize() {
  const el = document.querySelector('main');
  canvasW = el ? Math.min(el.clientWidth || 900, 960) : 900;
  canvasH = 480;
}

function resetSim() {
  running = false;
  startBtn.html('▶ Start Discovery');
  startBtn.style('background', '#43a047');
  startBtn.style('color', 'white');
  discoveredConns = [];
  activeConn = [];
  particles = [];
  stats = { total: 0, unique: 0, ebpfEvents: 0, graphEdges: 0 };
  connCounts = {};
  ebpfGlow = 0;
  nextConnIdx = 0;
  lastEvent = 0;
  connLog = [];
}

function draw() {
  background(240, 248, 255);

  // Kernel space background (top 42%)
  const kernelH = canvasH * 0.42;
  fill(200, 200, 210, 80);
  noStroke();
  rect(0, 0, canvasW, kernelH);
  fill(80, 80, 120, 120);
  textSize(11); textAlign(LEFT, TOP);
  text('Linux Kernel Space', 8, 5);

  // eBPF programs (gold dots in kernel layer)
  if (showEBPF) {
    const ebpfPositions = [[0.25, 0.18], [0.50, 0.22], [0.75, 0.18]];
    for (let ep of ebpfPositions) {
      let px = ep[0] * canvasW, py = ep[1] * canvasH;
      let glowRadius = 14 + sin(frameCount * 0.05 + px) * 4 + ebpfGlow * 8;
      noStroke();
      fill(255, 215, 0, 60);
      ellipse(px, py, glowRadius * 2, glowRadius * 2);
      fill(255, 215, 0);
      ellipse(px, py, 16, 16);
      fill(80, 60, 0);
      textSize(8); textAlign(CENTER, CENTER);
      text('eBPF', px, py);
    }
  }

  // User space label
  fill(50, 100, 50, 120);
  textSize(11); textAlign(LEFT, TOP);
  text('User Space', 8, kernelH + 4);

  // Draw service processes
  for (let s of services) {
    let sx = s.x * canvasW, sy = s.y * canvasH;
    let count = Object.keys(connCounts).filter(k => k.includes(String(s.id))).length;
    let sz = 52 + count * 3;
    stroke(30); strokeWeight(2);
    fill(s.color);
    rect(sx - sz/2, sy - 24, sz, 44, 6);
    fill(255); noStroke();
    textSize(11); textAlign(CENTER, CENTER);
    text(s.name, sx, sy - 4);
    textSize(9);
    text(`(id:${s.id})`, sx, sy + 10);
  }

  // Draw discovered connections
  for (let dc of discoveredConns) {
    if (!isActive(dc.type)) continue;
    let s = services[dc.src], d = services[dc.dst];
    let sx = s.x * canvasW, sy = s.y * canvasH;
    let dx = d.x * canvasW, dy = d.y * canvasH;
    let cnt = connCounts[`${dc.src}-${dc.dst}`] || 1;
    let w = min(1 + cnt * 0.5, 6);
    stroke(dc.color); strokeWeight(w); noFill();
    line(sx, sy - 4, dx, dy - 4);
    // Arrow
    let angle = atan2(dy - sy, dx - sx);
    fill(dc.color); noStroke();
    push();
    translate(dx - (services[dc.dst].name.length * 3.5 + 28) * cos(angle),
              dy - 4 - (28) * sin(angle));
    rotate(angle);
    triangle(10, 0, -4, -4, -4, 4);
    pop();
    // Label
    fill(dc.color); noStroke();
    textSize(9); textAlign(CENTER, CENTER);
    let mx = (sx + dx) / 2, my = (sy + dy) / 2 - 12;
    text(dc.label, mx, my);
  }

  // Animate packets
  let now = millis();
  if (running && now - lastEvent > getSpeed()) {
    spawnConnection();
    lastEvent = now;
  }

  for (let i = activeConn.length - 1; i >= 0; i--) {
    let ac = activeConn[i];
    ac.progress += 0.025;
    if (ac.progress >= 1) {
      // Connection captured
      captureConnection(ac);
      activeConn.splice(i, 1);
      ebpfGlow = 1;
    } else {
      // Draw moving packet
      let s = services[ac.src], d = services[ac.dst];
      let sx = s.x * canvasW, sy = s.y * canvasH;
      let dx = d.x * canvasW, dy = d.y * canvasH;
      let px = lerp(sx, dx, ac.progress);
      let py = lerp(sy - 4, dy - 4, ac.progress);
      // eBPF intercept glow at midpoint
      if (ac.progress > 0.45 && ac.progress < 0.55) {
        noStroke(); fill(255, 215, 0, 120);
        ellipse(px, py, 22, 22);
      }
      fill(ac.color); noStroke();
      ellipse(px, py, 10, 10);
    }
  }

  if (ebpfGlow > 0) ebpfGlow = max(0, ebpfGlow - 0.04);

  // Stats panel (right side of canvas)
  drawStatsPanel();
  drawConnLog();
}

function spawnConnection() {
  let available = connDefs.filter(c => isActive(c.type));
  if (available.length === 0) return;
  let def = available[nextConnIdx % available.length];
  nextConnIdx++;
  stats.ebpfEvents++;
  activeConn.push({ src: def.src, dst: def.dst, progress: 0, color: def.color, type: def.type, label: def.label, proto: def.proto });
}

function captureConnection(ac) {
  let key = `${ac.src}-${ac.dst}`;
  stats.total++;
  connCounts[key] = (connCounts[key] || 0) + 1;
  if (!discoveredConns.find(d => d.src === ac.src && d.dst === ac.dst)) {
    discoveredConns.push({ src: ac.src, dst: ac.dst, type: ac.type, label: ac.label, color: ac.color });
    stats.unique++;
    stats.graphEdges++;
  }
  let cnt = connCounts[key];
  let src = services[ac.src].name, dst = services[ac.dst].name;
  connLog.unshift({ time: floor(millis() / 1000) + 's ago', text: `${src} → ${dst} (${ac.proto}) [${cnt}]` });
  if (connLog.length > 6) connLog.pop();
}

function drawStatsPanel() {
  let px = canvasW - 200, py = 10;
  fill(255, 255, 255, 230); stroke(200); strokeWeight(1);
  rect(px, py, 192, 100, 6);
  fill(26, 58, 108); noStroke(); textSize(11); textAlign(LEFT, TOP);
  text('Statistics', px + 8, py + 6);
  textSize(10); fill(60, 60, 60);
  text(`Connections Discovered: ${stats.total}`,  px + 8, py + 22);
  text(`Unique Services Linked: ${stats.unique}`, px + 8, py + 36);
  text(`eBPF Events Processed: ${stats.ebpfEvents}`, px + 8, py + 50);
  text(`Graph Edges Created: ${stats.graphEdges}`,    px + 8, py + 64);
  text(running ? '● Discovering...' : '○ Paused', px + 8, py + 82);
}

function drawConnLog() {
  if (connLog.length === 0) return;
  let px = 4, py = canvasH - 14 - connLog.length * 14;
  fill(30, 30, 50, 180); noStroke();
  rect(px, py - 4, canvasW / 2 - 10, connLog.length * 14 + 8, 4);
  textSize(9); textAlign(LEFT, TOP); fill(220);
  for (let i = 0; i < connLog.length; i++) {
    text(`${connLog[i].time}: ${connLog[i].text}`, px + 5, py + i * 14);
  }
}
