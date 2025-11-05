// Generic P5.js Infographic Template
// Loads configuration and data from data.json
// Creates an interactive task visualization with side panels

let canvasWidth = 1200;
let canvasHeight = 700;
let containerWidth;
let containerHeight = canvasHeight;

// Data loaded from JSON
let infographicData = null;
let taskStages = [];
let currentHover = -1;

// Layout parameters
let margin = 30;
let taskCenterX;
let taskStartY = 100;
let taskEndY = 600;
let taskTopWidth = 300;
let taskBottomWidth = 100;

function preload() {
    // Load data from JSON file
    loadJSON('data.json',
        (data) => {
            infographicData = data;
            console.log('Data loaded successfully');
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

    taskCenterX = containerWidth / 2;

    if (infographicData) {
        // Calculate positions for task stages
        let stageSpacing = (taskEndY - taskStartY) / (infographicData.taskStages.length + 1);
        taskStages = infographicData.taskStages.map((stage, index) => ({
            ...stage,
            y: taskStartY + (index * stageSpacing),
            height: 60
        }));

        describe(infographicData.description || 'Interactive task infographic', LABEL);
    } else {
        console.error('Failed to load infographic data');
    }
}

function draw() {
    if (!infographicData) {
        background(220);
        fill(0);
        textAlign(CENTER, CENTER);
        text('Loading...', width / 2, height / 2);
        return;
    }

    background(infographicData.background || 'aliceblue');

    // Draw title
    fill(infographicData.titleColor || '#2c3e50');
    noStroke();
    textSize(28);
    textAlign(CENTER, TOP);
    text(infographicData.title || "Task Infographic", containerWidth / 2, 20);

    // Draw side panels
    drawSidePanels();

    // Draw task outline
    drawTaskOutline();

    // Draw task stages
    drawTaskStages();

    // Draw flow indicators
    drawFlowIndicators();

    // Draw hover info box
    if (currentHover !== -1) {
        drawInfoBox();
    }
}

function drawSidePanels() {
    let panelWidth = 180;
    let panelHeight = 300;
    let leftPanelX = margin;
    let leftPanelY = taskStartY + 50;

    // Left panel
    if (infographicData.leftPanel) {
        const lp = infographicData.leftPanel;

        fill(lp.backgroundColor || '#e8f4fd');
        stroke(lp.borderColor || '#3498db');
        strokeWeight(2);
        rect(leftPanelX, leftPanelY, panelWidth, panelHeight, 10);

        fill(lp.titleColor || '#2980b9');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        const titleLines = lp.title.split(' ');
        const midPoint = Math.ceil(titleLines.length / 2);
        text(titleLines.slice(0, midPoint).join(' '), leftPanelX + panelWidth / 2, leftPanelY + 15);
        text(titleLines.slice(midPoint).join(' '), leftPanelX + panelWidth / 2, leftPanelY + 35);

        // Form elements
        fill('#34495e');
        textSize(12);
        textAlign(LEFT, TOP);
        let formY = leftPanelY + 70;
        lp.items.forEach((item, i) => {
            text(item, leftPanelX + 15, formY + (i * 25));
        });

        // Submit button
        fill(lp.buttonColor || '#27ae60');
        noStroke();
        rect(leftPanelX + 30, formY + (lp.items.length * 25) + 10, panelWidth - 60, 35, 5);
        fill('white');
        textAlign(CENTER, CENTER);
        textSize(14);
        text(lp.buttonText || "Submit", leftPanelX + panelWidth / 2, formY + (lp.items.length * 25) + 27);
    }

    // Right panel
    if (infographicData.rightPanel) {
        const rp = infographicData.rightPanel;
        let rightPanelX = containerWidth - margin - panelWidth;
        let rightPanelY = leftPanelY;

        fill(rp.backgroundColor || '#fff5e6');
        stroke(rp.borderColor || '#f39c12');
        strokeWeight(2);
        rect(rightPanelX, rightPanelY, panelWidth, panelHeight, 10);

        fill(rp.titleColor || '#e67e22');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        const titleLines = rp.title.split(' ');
        const midPoint = Math.ceil(titleLines.length / 2);
        text(titleLines.slice(0, midPoint).join(' '), rightPanelX + panelWidth / 2, rightPanelY + 15);
        text(titleLines.slice(midPoint).join(' '), rightPanelX + panelWidth / 2, rightPanelY + 35);

        // Stats
        fill('#34495e');
        textSize(12);
        textAlign(LEFT, TOP);
        let dashY = rightPanelY + 70;
        rp.stats.forEach((stat, i) => {
            text(stat, rightPanelX + 15, dashY + (i * 25));
        });

        // Chart representation (if colors provided)
        if (rp.chartColors && rp.chartColors.length > 0) {
            let chartY = dashY + (rp.stats.length * 25) + 10;
            let chartX = rightPanelX + 15;
            let widths = [40, 30, 50];
            rp.chartColors.forEach((color, i) => {
                fill(color);
                noStroke();
                rect(chartX, chartY, widths[i] || 30, 20);
                chartX += (widths[i] || 30) + 5;
            });
        }
    }
}

function drawTaskOutline() {
    stroke('#7f8c8d');
    strokeWeight(2);
    noFill();

    let leftTop = taskCenterX - taskTopWidth / 2;
    let leftBottom = taskCenterX - taskBottomWidth / 2;
    let rightTop = taskCenterX + taskTopWidth / 2;
    let rightBottom = taskCenterX + taskBottomWidth / 2;

    line(leftTop, taskStartY, leftBottom, taskEndY);
    line(rightTop, taskStartY, rightBottom, taskEndY);
}

function drawTaskStages() {
    currentHover = -1;

    for (let i = 0; i < taskStages.length; i++) {
        let stage = taskStages[i];

        // Calculate width at this Y position
        let progress = (stage.y - taskStartY) / (taskEndY - taskStartY);
        let currentWidth = taskTopWidth - (taskTopWidth - taskBottomWidth) * progress;
        let stageWidth = currentWidth * 0.9;

        let x = taskCenterX - stageWidth / 2;
        let y = stage.y;

        // Check for hover
        let isHovered = mouseX > x && mouseX < x + stageWidth &&
            mouseY > y && mouseY < y + stage.height;

        if (isHovered) {
            currentHover = i;
            strokeWeight(4);
            stroke('#2c3e50');
        } else {
            strokeWeight(2);
            stroke('#34495e');
        }

        // Draw stage rectangle
        fill(stage.color);
        rect(x, y, stageWidth, stage.height, 8);

        // Draw stage label
        fill(stage.textColor || 'white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text(stage.shortLabel, taskCenterX, y + stage.height / 2);

        // Draw stage number
        fill('#2c3e50');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        let numberX = x - 25;
        circle(numberX, y + stage.height / 2, 20);
        fill('white');
        text(i + 1, numberX, y + stage.height / 2);
    }
}

function drawFlowIndicators() {
    // Draw arrows between stages
    fill('#7f8c8d');
    noStroke();
    for (let i = 0; i < taskStages.length - 1; i++) {
        let currentStage = taskStages[i];
        let arrowY = currentStage.y + currentStage.height + 10;

        triangle(taskCenterX, arrowY + 10,
            taskCenterX - 5, arrowY,
            taskCenterX + 5, arrowY);
    }

    // Draw entry arrow from left panel
    if (infographicData.leftPanel) {
        fill(infographicData.leftPanel.borderColor || '#3498db');
        let formToTaskY = taskStartY + 25;
        triangle(margin + 190, formToTaskY,
            margin + 200, formToTaskY - 5,
            margin + 200, formToTaskY + 5);
    }

    // Draw exit arrow to right panel
    if (infographicData.rightPanel) {
        fill(infographicData.rightPanel.borderColor || '#f39c12');
        let taskToDashY = taskStartY + 200;
        triangle(containerWidth - margin - 190, taskToDashY,
            containerWidth - margin - 200, taskToDashY - 5,
            containerWidth - margin - 200, taskToDashY + 5);
    }
}

function drawInfoBox() {
    let stage = taskStages[currentHover];
    let boxWidth = 350;
    let boxHeight = 100;
    let boxX = mouseX + 15;
    let boxY = mouseY - 50;

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
    fill(255, 255, 255, 240);
    stroke('#2c3e50');
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    // Draw title
    fill('#2c3e50');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(stage.name, boxX + 15, boxY + 15);

    // Draw description
    fill('#34495e');
    textSize(12);
    text(stage.description, boxX + 15, boxY + 40, boxWidth - 30, boxHeight - 50);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    taskCenterX = containerWidth / 2;
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
