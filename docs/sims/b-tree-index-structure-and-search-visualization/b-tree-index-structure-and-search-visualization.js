// B-Tree Index Structure and Search Visualization — p5.js step-through
// CANVAS_HEIGHT: 620

let canvasWidth;
const drawHeight = 500, controlHeight = 60, infoHeight = 60;
const canvasHeight = drawHeight + controlHeight + infoHeight;

// B-Tree levels for server_id search
const btree = {
    root:  { keys: [500, 2500, 7500], x: 0.5, y: 0.08, id: 0 },
    level1: [
        { keys: [100, 250, 400],        x: 0.18, y: 0.30, id: 1 },
        { keys: [750, 1000, 2000],       x: 0.40, y: 0.30, id: 2 },
        { keys: [3000, 5000, 6500],      x: 0.62, y: 0.30, id: 3 },
        { keys: [8000, 9000, 9500],      x: 0.84, y: 0.30, id: 4 },
    ],
    level2: [
        { keys: [1,5,12,47],       x: 0.08, y: 0.56, id: 5 },
        { keys: [101,105,112,120], x: 0.22, y: 0.56, id: 6 },
        { keys: [251,262,280,290], x: 0.36, y: 0.56, id: 7 },
        { keys: [751,800,820,847], x: 0.50, y: 0.56, id: 8, target: true },
        { keys: [1001,1050,1200],  x: 0.64, y: 0.56, id: 9 },
        { keys: [3001,4000,5001],  x: 0.78, y: 0.56, id: 10 },
        { keys: [8001,9001,9502],  x: 0.92, y: 0.56, id: 11 },
    ]
};

const TARGET = 847;
// Step path: [nodeId, description]
const steps = [
    { node: 0, msg: `Root: compare ${TARGET} with [500, 2500, 7500] → 500 < ${TARGET} < 2500, go right of 500` },
    { node: 2, msg: `Level 1: compare ${TARGET} with [750, 1000, 2000] → 750 < ${TARGET} < 1000, go left of 1000` },
    { node: 8, msg: `Leaf node found! ${TARGET} is in [751, 800, 820, 847] ✓ — 3 comparisons total` },
];

let currentStep = -1; // -1 = not started
let scanRow = 0;
let scanTimer = 0;
let animateScan = false;
let stepBtn, resetBtn;

function updateCanvasSize() {
    canvasWidth = min(windowWidth, 900);
}

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    stepBtn = createButton('▶ Next Step');
    stepBtn.parent(document.querySelector('main'));
    stepBtn.style('margin', '4px 8px');
    stepBtn.mousePressed(() => { currentStep = min(currentStep + 1, steps.length - 1); animateScan = false; });

    resetBtn = createButton('↺ Reset');
    resetBtn.parent(document.querySelector('main'));
    resetBtn.style('margin', '4px 8px');
    resetBtn.mousePressed(() => { currentStep = -1; scanRow = 0; animateScan = false; });

    let scanBtn = createButton('▶ Animate Full Scan (Left)');
    scanBtn.parent(document.querySelector('main'));
    scanBtn.style('margin', '4px 8px');
    scanBtn.mousePressed(() => { currentStep = -1; scanRow = 0; animateScan = true; });
}

function draw() {
    background(248, 249, 250);

    // Title
    fill(26, 58, 108); noStroke();
    textStyle(BOLD); textSize(15); textAlign(CENTER, TOP);
    text('B-Tree Index: Finding server_id = ' + TARGET, canvasWidth / 2, 8);

    const half = canvasWidth / 2;
    const treeAreaH = drawHeight - 20;

    // --- LEFT: Full Table Scan ---
    fill(240, 240, 240); noStroke();
    rect(4, 28, half - 8, treeAreaH, 8);

    fill(80); textStyle(BOLD); textSize(12); textAlign(CENTER, TOP);
    text('WITHOUT INDEX — Full Table Scan', half / 2, 34);

    // Table rows
    const colW = [50, 80, 100, 60];
    const headers = ['id', 'hostname', 'ip_address', 'status'];
    const rowH = 18, tableTop = 56, tableLeft = 16;
    const tableW = half - 28;

    fill(60, 60, 100); noStroke();
    rect(tableLeft, tableTop, tableW, rowH, 3);
    fill(255); textStyle(BOLD); textSize(10); textAlign(LEFT, CENTER);
    let cx = tableLeft + 4;
    for (let h of headers) { text(h, cx, tableTop + rowH / 2); cx += tableW / 4; }

    const visRows = min(18, floor((treeAreaH - 80) / rowH));
    for (let i = 0; i < visRows; i++) {
        const rowId = i + 1;
        const isScanned = animateScan && i <= scanRow;
        const isTarget = animateScan && i === scanRow && scanRow === TARGET - 1;

        if (isTarget) fill(100, 220, 100);
        else if (isScanned) fill(255, 245, 200);
        else fill(i % 2 === 0 ? 255 : 245);
        noStroke();
        rect(tableLeft, tableTop + rowH * (i + 1), tableW, rowH);

        fill(isTarget ? 30 : 50); textStyle(NORMAL); textSize(10); textAlign(LEFT, CENTER);
        const ry = tableTop + rowH * (i + 1.5);
        text(rowId, tableLeft + 4, ry);
        text('srv-' + String(rowId).padStart(3,'0'), tableLeft + 4 + tableW/4, ry);
        text('10.0.' + floor(rowId/100) + '.' + (rowId % 100), tableLeft + 4 + tableW*2/4, ry);
        text(rowId % 7 === 0 ? 'offline' : 'online', tableLeft + 4 + tableW*3/4, ry);
    }

    // Scan stats
    if (animateScan) {
        fill(180, 50, 50); textStyle(BOLD); textSize(12); textAlign(CENTER, TOP);
        text(`Rows scanned: ${scanRow} of 10,000`, half / 2, tableTop + rowH * (visRows + 2));
        text(`Estimated time: ~${round(scanRow * 0.085)}ms`, half / 2, tableTop + rowH * (visRows + 3.5));
        scanTimer++;
        if (scanTimer % 3 === 0 && scanRow < 847) scanRow++;
    } else if (currentStep < 0) {
        fill(120); textStyle(ITALIC); textSize(11); textAlign(CENTER, TOP);
        text('Click "Animate Full Scan" to see O(n) search', half / 2, tableTop + rowH * (visRows + 2));
    }

    // --- RIGHT: B-Tree ---
    fill(255, 255, 240); noStroke();
    rect(half + 4, 28, half - 8, treeAreaH, 8);

    fill(80); textStyle(BOLD); textSize(12); textAlign(CENTER, TOP);
    text('WITH B-TREE INDEX — O(log n) Search', half + half / 2, 34);

    // Draw B-tree nodes
    const rx = (rel) => half + 4 + rel * (half - 12);
    const ry = (rel) => 28 + rel * treeAreaH;

    // Draw edges first
    stroke(200); strokeWeight(1);
    // Root to level 1
    for (let n of btree.level1) {
        line(rx(btree.root.x), ry(btree.root.y) + 22,
             rx(n.x), ry(n.y) - 2);
    }
    // Level 1 to level 2
    const l1ToL2 = { 1:[5,6], 2:[7,8], 3:[9,10], 4:[11] };
    for (let [l1id, l2ids] of Object.entries(l1ToL2)) {
        const l1n = btree.level1.find(n => n.id === parseInt(l1id));
        for (let l2id of l2ids) {
            const l2n = btree.level2.find(n => n.id === l2id);
            line(rx(l1n.x), ry(l1n.y) + 22, rx(l2n.x), ry(l2n.y) - 2);
        }
    }

    // Draw nodes
    const allNodes = [btree.root, ...btree.level1, ...btree.level2];
    for (let n of allNodes) {
        const nx = rx(n.x), ny = ry(n.y);
        const isPath = currentStep >= 0 && steps.slice(0, currentStep + 1).some(s => s.node === n.id);
        const isActive = currentStep >= 0 && steps[currentStep].node === n.id;
        const isTarget = n.target;

        noStroke();
        if (isActive) fill(100, 200, 100);
        else if (isPath) fill(180, 220, 180);
        else if (isTarget && currentStep >= 2) fill(80, 180, 80);
        else fill(255, 248, 200);

        stroke(isActive ? color(0, 150, 0) : 150); strokeWeight(isActive ? 2 : 1);
        rect(nx - 50, ny - 12, 100, 24, 4);

        noStroke(); fill(isActive ? 0 : 50);
        textStyle(NORMAL); textSize(9); textAlign(CENTER, CENTER);
        text(n.keys.join(', '), nx, ny);

        if (isActive) {
            fill(0, 130, 0); textStyle(BOLD); textSize(9);
            text('◀ HERE', nx + 60, ny);
        }
    }

    // Search path indicator
    if (currentStep >= 0) {
        fill(30, 100, 30); textStyle(BOLD); textSize(11); textAlign(CENTER, TOP);
        text(`Step ${currentStep + 1}: ${steps[currentStep].msg}`, half + half / 2, ry(0.73) + 4);
    }

    // Stats box (right side)
    if (currentStep >= 2) {
        fill(220, 255, 220); stroke(0, 150, 0); strokeWeight(1);
        rect(half + 8, ry(0.82), half - 20, 70, 6);
        noStroke(); fill(0, 100, 0); textStyle(BOLD); textSize(11); textAlign(LEFT, TOP);
        text('Nodes visited: 3 of ~4 levels', half + 16, ry(0.83));
        text('Comparisons: 7', half + 16, ry(0.83) + 18);
        text('Search time: ~5ms', half + 16, ry(0.83) + 34);
        fill(180, 50, 50);
        text('vs. 847 scans = ~850ms without index', half + 16, ry(0.83) + 50);
    }

    // Info bar
    fill(230, 235, 250); noStroke();
    rect(0, drawHeight, canvasWidth, infoHeight);
    fill(50); textStyle(NORMAL); textSize(11); textAlign(CENTER, CENTER);
    text('B-tree stays balanced: all root-to-leaf paths are same length  •  O(log n) vs O(n) lookup', canvasWidth / 2, drawHeight + infoHeight / 2);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
