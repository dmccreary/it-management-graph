// ITIL Framework Structure Diagram
// Hierarchical block diagram showing ITIL v1-v3 architecture

let canvasWidth = 1200;
let canvasHeight = 800;
let containerWidth;
let containerHeight = canvasHeight;

// Data loaded from JSON
let itilData = null;
let currentHover = null;

// Layout parameters
let margin = 40;
let bannerHeight = 60;
let columnGap = 60;
let processBoxHeight = 70;
let processBoxGap = 15;
let cmdbHeight = 80;

function preload() {
    loadJSON('data.json',
        (data) => {
            itilData = data;
            console.log('ITIL data loaded successfully');
        },
        (error) => {
            console.error('Error loading data.json:', error);
        }
    );
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    if (itilData) {
        describe(itilData.description || 'ITIL Framework Structure Diagram', LABEL);
    } else {
        console.error('Failed to load ITIL data');
    }
}

function draw() {
    if (!itilData) {
        background('aliceblue');
        fill(0);
        textAlign(CENTER, CENTER);
        text('Loading...', width / 2, height / 2);
        return;
    }

    background(itilData.background || 'aliceblue');

    currentHover = null;

    // Draw title banner at the very top
    drawTitleBanner();

    // Draw ITIL Framework banner
    drawFrameworkBanner();

    // Draw Service Support and Service Delivery columns
    drawServiceColumns();

    // Draw CMDB foundation
    drawCMDB();

    // Draw arrows
    // not needed for this diagram
    // drawArrows();

    // Draw hover info box
    if (currentHover) {
        drawInfoBox();
    }
}

function drawTitleBanner() {
    fill(itilData.titleColor || '#2c3e50');
    noStroke();
    textSize(26);
    textAlign(CENTER, TOP);
    text(itilData.title || "ITIL Framework", containerWidth / 2, 15);
}

function drawFrameworkBanner() {
    let bannerY = 60;

    fill('#34495e');
    stroke('#2c3e50');
    strokeWeight(2);
    rect(margin, bannerY, containerWidth - 2 * margin, bannerHeight, 8);

    fill('white');
    noStroke();
    textSize(22);
    textAlign(CENTER, CENTER);
    text('ITIL Framework', containerWidth / 2, bannerY + bannerHeight / 2);
}

function drawServiceColumns() {
    let columnsY = 60 + bannerHeight + 30;
    let columnWidth = (containerWidth - 2 * margin - columnGap) / 2;

    // Service Support (left)
    drawServiceColumn(
        margin,
        columnsY,
        columnWidth,
        itilData.serviceSupport,
        'left'
    );

    // Service Delivery (right)
    drawServiceColumn(
        margin + columnWidth + columnGap,
        columnsY,
        columnWidth,
        itilData.serviceDelivery,
        'right'
    );
}

function drawServiceColumn(x, y, width, serviceData, side) {
    let headerHeight = 50;

    // Draw column header
    fill(serviceData.color);
    stroke('#2c3e50');
    strokeWeight(2);
    rect(x, y, width, headerHeight, 8, 8, 0, 0);

    fill(serviceData.textColor || 'white');
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text(serviceData.title, x + width / 2, y + headerHeight / 2);

    // Draw label below header
    fill('#7f8c8d');
    textSize(12);
    textStyle(ITALIC);
    text(serviceData.label, x + width / 2, y + headerHeight + 15);
    textStyle(NORMAL);

    // Draw process boxes
    let processY = y + headerHeight + 35;
    serviceData.processes.forEach((process, index) => {
        drawProcessBox(
            x + 20,
            processY + index * (processBoxHeight + processBoxGap),
            width - 40,
            processBoxHeight,
            process,
            side,
            index
        );
    });
}

function drawProcessBox(x, y, width, height, process, side, index) {
    let isHovered = mouseX > x && mouseX < x + width &&
                   mouseY > y && mouseY < y + height;

    if (isHovered) {
        currentHover = process;
        strokeWeight(3);
        stroke('#2c3e50');
    } else {
        strokeWeight(2);
        stroke('#34495e');
    }

    // Determine box color (Configuration Management is highlighted)
    let boxColor = process.highlight ? process.color : process.color;
    fill(boxColor);
    rect(x, y, width, height, 6);

    // Draw process name
    fill(process.highlight ? 'black' : 'white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);

    // Wrap text if needed
    let words = process.name.split(' ');
    if (words.length > 2) {
        let line1 = words.slice(0, 2).join(' ');
        let line2 = words.slice(2).join(' ');
        text(line1, x + width / 2, y + height / 2 - 8);
        text(line2, x + width / 2, y + height / 2 + 8);
    } else {
        text(process.name, x + width / 2, y + height / 2);
    }
}

function drawCMDB() {
    let cmdbY = containerHeight - margin - cmdbHeight - 20;
    let cmdbWidth = containerWidth - 2 * margin;

    // Check if CMDB is hovered
    let isHovered = mouseX > margin && mouseX < margin + cmdbWidth &&
                   mouseY > cmdbY && mouseY < cmdbY + cmdbHeight;

    if (isHovered) {
        currentHover = itilData.cmdb;
        strokeWeight(3);
        stroke('#2c3e50');
    } else {
        strokeWeight(2);
        stroke('#d35400');
    }

    fill(itilData.cmdb.color);
    rect(margin, cmdbY, cmdbWidth, cmdbHeight, 8);

    fill(itilData.cmdb.textColor || 'white');
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text(itilData.cmdb.title, containerWidth / 2, cmdbY + 15);

    textSize(12);
    textStyle(ITALIC);
    fill('white');
    text(itilData.cmdb.label, containerWidth / 2, cmdbY + 45);
    textStyle(NORMAL);
}

function drawArrows() {
    let cmdbY = containerHeight - margin - cmdbHeight - 20;
    let cmdbCenterY = cmdbY;

    let columnsY = 60 + bannerHeight + 30;
    let columnWidth = (containerWidth - 2 * margin - columnGap) / 2;
    let headerHeight = 50;
    let processStartY = columnsY + headerHeight + 35;

    // Service Support arrows (solid)
    drawServiceArrows(
        margin,
        processStartY,
        columnWidth,
        itilData.serviceSupport.processes,
        cmdbCenterY,
        'solid',
        'left'
    );

    // Service Delivery arrows (dashed)
    drawServiceArrows(
        margin + columnWidth + columnGap,
        processStartY,
        columnWidth,
        itilData.serviceDelivery.processes,
        cmdbCenterY,
        'dashed',
        'right'
    );

    // Bidirectional arrow for Configuration Management (index 4 in Service Support)
    drawConfigManagementArrows(
        margin,
        processStartY,
        columnWidth,
        cmdbCenterY
    );
}

function drawServiceArrows(columnX, processStartY, columnWidth, processes, cmdbY, style, side) {
    processes.forEach((process, index) => {
        if (process.highlight) return; // Skip Configuration Management here

        let processY = processStartY + index * (processBoxHeight + processBoxGap);
        let processCenterY = processY + processBoxHeight / 2;

        // Arrow from CMDB upward to process
        let startX, endX;
        if (side === 'left') {
            startX = columnX + columnWidth / 2;
            endX = startX;
        } else {
            startX = columnX + columnWidth / 2;
            endX = startX;
        }

        if (style === 'dashed') {
            drawDashedLine(startX, cmdbY, endX, processY + processBoxHeight, '#7f8c8d');
        } else {
            stroke('#7f8c8d');
            strokeWeight(2);
            line(startX, cmdbY, endX, processY + processBoxHeight);
        }

        // Arrowhead
        drawArrowhead(endX, processY + processBoxHeight, 0, -1, '#7f8c8d');
    });
}

function drawConfigManagementArrows(columnX, processStartY, columnWidth, cmdbY) {
    // Configuration Management is at index 4 in Service Support
    let configManagementY = processStartY + 4 * (processBoxHeight + processBoxGap);
    let configCenterY = configManagementY + processBoxHeight / 2;
    let configCenterX = columnX + columnWidth / 2;

    // Bidirectional arrows
    stroke('#FFD700');
    strokeWeight(3);

    // Upward arrow from CMDB
    line(configCenterX, cmdbY, configCenterX, configManagementY + processBoxHeight);
    drawArrowhead(configCenterX, configManagementY + processBoxHeight, 0, -1, '#FFD700');

    // Downward arrow to CMDB
    line(configCenterX + 10, configManagementY + processBoxHeight, configCenterX + 10, cmdbY);
    drawArrowhead(configCenterX + 10, cmdbY, 0, 1, '#FFD700');
}

function drawDashedLine(x1, y1, x2, y2, color) {
    stroke(color);
    strokeWeight(2);

    let steps = 20;
    let dashLength = 5;
    let gapLength = 5;
    let totalLength = dist(x1, y1, x2, y2);
    let dx = (x2 - x1) / totalLength;
    let dy = (y2 - y1) / totalLength;

    let currentLength = 0;
    let drawing = true;

    while (currentLength < totalLength) {
        let segmentLength = drawing ? dashLength : gapLength;
        let nextLength = min(currentLength + segmentLength, totalLength);

        if (drawing) {
            let sx = x1 + dx * currentLength;
            let sy = y1 + dy * currentLength;
            let ex = x1 + dx * nextLength;
            let ey = y1 + dy * nextLength;
            line(sx, sy, ex, ey);
        }

        currentLength = nextLength;
        drawing = !drawing;
    }
}

function drawArrowhead(x, y, dx, dy, color) {
    fill(color);
    noStroke();

    let arrowSize = 8;

    if (dy < 0) { // Pointing up
        triangle(
            x, y,
            x - arrowSize / 2, y - arrowSize,
            x + arrowSize / 2, y - arrowSize
        );
    } else if (dy > 0) { // Pointing down
        triangle(
            x, y,
            x - arrowSize / 2, y + arrowSize,
            x + arrowSize / 2, y + arrowSize
        );
    }
}

function drawInfoBox() {
    let boxWidth = 400;
    let boxHeight = 120;
    let boxX = mouseX + 15;
    let boxY = mouseY - 60;

    // Keep box within canvas bounds
    if (boxX + boxWidth > containerWidth - 20) {
        boxX = mouseX - boxWidth - 15;
    }
    if (boxY < 20) {
        boxY = 20;
    }
    if (boxY + boxHeight > containerHeight - 20) {
        boxY = containerHeight - boxHeight - 20;
    }

    // Draw info box
    fill(255, 255, 255, 250);
    stroke('#2c3e50');
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    // Draw title
    fill('#2c3e50');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text(currentHover.name || currentHover.title, boxX + 15, boxY + 15);
    textStyle(NORMAL);

    // Draw description
    fill('#34495e');
    textSize(12);
    text(currentHover.description, boxX + 15, boxY + 45, boxWidth - 30, boxHeight - 55);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
