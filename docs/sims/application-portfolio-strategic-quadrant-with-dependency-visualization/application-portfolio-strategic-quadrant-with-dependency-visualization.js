// Application Portfolio Strategic Quadrant with Dependency Visualization
// CANVAS_HEIGHT: 660

let canvasWidth, drawHeight = 480, panelHeight = 160, controlHeight = 20;
let canvasHeight = drawHeight + panelHeight + controlHeight;

const apps = [
    { name: 'Customer Portal',           tq: 9, bv: 8, users: 5000,
      upstream: ['ERP Core', 'Legacy Billing System'],
      downstream: ['Mobile App', 'Partner API'],
      services: ['E-Commerce', 'Account Management'], complexity: 'MEDIUM' },
    { name: 'Legacy Billing System',      tq: 2, bv: 9, users: 800,
      upstream: ['ERP Core'],
      downstream: ['Customer Portal', 'Old Reporting Engine', 'Finance Reports'],
      services: ['Billing', 'Revenue Management'], complexity: 'HIGH' },
    { name: 'Internal Tools Suite',       tq: 7, bv: 3, users: 200,
      upstream: [],
      downstream: ['HR Self-Service'],
      services: [], complexity: 'LOW' },
    { name: 'Old Reporting Engine',       tq: 3, bv: 2, users: 50,
      upstream: ['Legacy Billing System', 'ERP Core'],
      downstream: ['Regulatory Reports'],
      services: ['Compliance Reporting (CRITICAL)'], complexity: 'HIGH' },
    { name: 'ERP Core',                  tq: 6, bv: 8, users: 2000,
      upstream: ['Financial System'],
      downstream: ['Customer Portal', 'Old Reporting Engine', 'Legacy Billing System'],
      services: ['Finance', 'HR', 'Supply Chain'], complexity: 'HIGH' },
    { name: 'Spreadsheet Automation',    tq: 4, bv: 2, users: 30,
      upstream: ['ERP Core'],
      downstream: [],
      services: [], complexity: 'LOW' },
];

const quadrants = [
    { label: 'INVEST',   bg: [200, 240, 200], textColor: [30, 100, 30],   xMin: 5, xMax: 10, yMin: 5, yMax: 10 },
    { label: 'MIGRATE',  bg: [255, 245, 200], textColor: [160, 90, 0],    xMin: 0, xMax: 5,  yMin: 5, yMax: 10 },
    { label: 'MAINTAIN', bg: [200, 220, 255], textColor: [20, 60, 150],   xMin: 5, xMax: 10, yMin: 0, yMax: 5  },
    { label: 'RETIRE',   bg: [255, 210, 210], textColor: [160, 20, 20],   xMin: 0, xMax: 5,  yMin: 0, yMax: 5  },
];

const complexityColors = { LOW: [76,175,80], MEDIUM: [255,152,0], HIGH: [244,67,54] };

let selectedApp = null;
let hoveredApp = null;

function getQuadrant(app) {
    if (app.tq >= 5 && app.bv >= 5) return 'INVEST';
    if (app.tq < 5  && app.bv >= 5) return 'MIGRATE';
    if (app.tq >= 5 && app.bv < 5)  return 'MAINTAIN';
    return 'RETIRE';
}

function mapX(tq) { return map(tq, 0, 10, 60, canvasWidth - 30); }
function mapY(bv) { return map(bv, 0, 10, drawHeight - 20, 40); }
function bubbleR(users) { return constrain(8 + users / 150, 10, 38); }

function updateCanvasSize() {
    canvasWidth = min(windowWidth, 800);
    canvasHeight = drawHeight + panelHeight + controlHeight;
}

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
}

function draw() {
    background(248, 249, 250);

    // Quadrant backgrounds
    noStroke();
    for (const q of quadrants) {
        fill(...q.bg, 180);
        let x1 = mapX(q.xMin), x2 = mapX(q.xMax);
        let y1 = mapY(q.yMax), y2 = mapY(q.yMin);
        rect(x1, y1, x2 - x1, y2 - y1);
        // Quadrant label
        fill(...q.textColor);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        textSize(14);
        text(q.label, (x1 + x2) / 2, (y1 + y2) / 2);
    }

    // Axes
    stroke(80);
    strokeWeight(1.5);
    line(mapX(0), mapY(0), mapX(10), mapY(0));
    line(mapX(0), mapY(0), mapX(0), mapY(10));
    // Midlines (dashed)
    drawingContext.setLineDash([6, 4]);
    stroke(160);
    strokeWeight(1);
    line(mapX(5), mapY(0), mapX(5), mapY(10));
    line(mapX(0), mapY(5), mapX(10), mapY(5));
    drawingContext.setLineDash([]);

    // Axis labels
    noStroke();
    fill(60);
    textStyle(BOLD);
    textSize(12);
    textAlign(CENTER, TOP);
    text('← Technical Quality →', (mapX(0) + mapX(10)) / 2, mapY(0) + 6);
    push();
    translate(18, (mapY(0) + mapY(10)) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('← Business Value →', 0, 0);
    pop();

    // Title
    fill(26, 58, 108);
    textSize(15);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Application Portfolio Strategic Quadrant', canvasWidth / 2, 5);

    // Applications
    for (const app of apps) {
        const ax = mapX(app.tq);
        const ay = mapY(app.bv);
        const r = bubbleR(app.users);
        const col = complexityColors[app.complexity];
        const isHover = hoveredApp === app;
        const isSel = selectedApp === app;

        strokeWeight(isSel ? 3 : 1.5);
        stroke(col[0] * 0.6, col[1] * 0.6, col[2] * 0.6);
        fill(col[0], col[1], col[2], isHover ? 230 : 180);
        circle(ax, ay, r * (isHover ? 2.4 : 2));

        // Label
        noStroke();
        fill(30);
        textStyle(NORMAL);
        textSize(10);
        textAlign(CENTER, BOTTOM);
        text(app.name, ax, ay - r - 2);
    }

    // Dependency panel
    const panelY = drawHeight;
    stroke(180);
    strokeWeight(1);
    fill(255);
    rect(0, panelY, canvasWidth, panelHeight);

    noStroke();
    if (!selectedApp) {
        fill(100);
        textSize(13);
        textAlign(CENTER, CENTER);
        textStyle(ITALIC);
        text('Click an application to see its dependency analysis', canvasWidth / 2, panelY + panelHeight / 2);
    } else {
        const a = selectedApp;
        const col = complexityColors[a.complexity];
        fill(26, 58, 108);
        textSize(14);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text(a.name + '  [' + getQuadrant(a) + ']', 16, panelY + 10);

        fill(...col);
        textSize(11);
        textStyle(BOLD);
        text('Complexity: ' + a.complexity, 16, panelY + 30);

        fill(60);
        textStyle(NORMAL);
        textSize(11);
        text('↑ Depends on: ' + (a.upstream.length ? a.upstream.join(', ') : 'None'), 16, panelY + 48);
        text('↓ Supports:   ' + (a.downstream.length ? a.downstream.join(', ') : 'None'), 16, panelY + 64);

        fill(150, 30, 30);
        textStyle(BOLD);
        let services = a.services.length ? a.services.join(', ') : 'None';
        text('Services: ' + services, 16, panelY + 82);

        if (getQuadrant(a) === 'RETIRE' && a.services.some(s => s.includes('CRITICAL'))) {
            fill(200, 0, 0);
            textSize(11);
            text('⚠ Cannot retire until replacement capability is deployed!', 16, panelY + 100);
        }

        fill(80);
        textStyle(ITALIC);
        textSize(10);
        text('Users: ' + a.users.toLocaleString(), 16, panelY + 118);
    }

    // Legend
    const lx = 16, ly = panelY + panelHeight + 2;
    textStyle(NORMAL);
    textSize(10);
    textAlign(LEFT, CENTER);
    const legItems = [
        { label: 'Low deps', col: complexityColors.LOW },
        { label: 'Medium deps', col: complexityColors.MEDIUM },
        { label: 'High deps', col: complexityColors.HIGH },
        { label: 'Size = user count', col: [100,100,100] },
    ];
    let lx2 = lx;
    for (const item of legItems) {
        fill(...item.col, 200);
        noStroke();
        circle(lx2 + 6, ly + 8, 12);
        fill(60);
        text(item.label, lx2 + 14, ly + 8);
        lx2 += textWidth(item.label) + 30;
    }
}

function mouseMoved() {
    hoveredApp = null;
    for (const app of apps) {
        const ax = mapX(app.tq);
        const ay = mapY(app.bv);
        const r = bubbleR(app.users);
        if (dist(mouseX, mouseY, ax, ay) < r) { hoveredApp = app; break; }
    }
}

function mousePressed() {
    for (const app of apps) {
        const ax = mapX(app.tq);
        const ay = mapY(app.bv);
        const r = bubbleR(app.users);
        if (dist(mouseX, mouseY, ax, ay) < r) {
            selectedApp = (selectedApp === app) ? null : app;
            return;
        }
    }
    selectedApp = null;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
