// Load data from JSON file and initialize visualization
// Assumes data.json is in the same directory and contains the hierarchical asset data
// will not run locally due to CORS; use a local server for testing or put data inline
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        initializeVisualization(data);
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// Global variables for D3 objects (needed for resize handler)
let svg, g, tree, root, width, height, radius;

function initializeVisualization(data) {
    // Set up SVG dimensions based on actual container size
    function getDimensions() {
        const vizContainer = document.getElementById("visualization");
        const containerWidth = vizContainer.clientWidth - 5; // Account for padding
        const containerHeight = vizContainer.clientHeight - 5;
        const size = Math.min(containerWidth, containerHeight);
        return {
            width: containerWidth,
            height: containerHeight,
            radius: size / 2 - 80
        };
    }

    const dims = getDimensions();
    width = dims.width;
    height = dims.height;
    radius = dims.radius;

    svg = d3.select("#svg")
        .attr("width", width)
        .attr("height", height);

    g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`);

    // Create hierarchical layout
    root = d3.hierarchy(data);
    tree = d3.tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    tree(root);

    // Draw links
    g.selectAll(".link")
        .data(root.links())
        .join("path")
        .attr("class", "link")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

    // Draw nodes
    const nodes = g.selectAll(".node")
        .data(root.descendants())
        .join("g")
        .attr("class", "node")
        .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    // Node circles with size based on depth
    nodes.append("circle")
        .attr("class", "node-circle")
        .attr("r", d => d.depth === 0 ? 50 : d.depth === 1 ? 40 : 25)
        .attr("fill", d => d.data.color)
        .attr("stroke", d => d3.color(d.data.color).darker(1))
        .attr("stroke-width", 2)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip)
        .on("click", showDetailPanel);

    // Node icons (counter-rotated to stay upright)
    nodes.append("text")
        .attr("class", "icon")
        .attr("text-anchor", "middle")
        .attr("dy", d => d.depth === 0 ? 16 : d.depth === 1 ? 12 : 8)
        .attr("transform", d => `rotate(${90 - d.x * 180 / Math.PI})`)
        .style("font-size", d => d.depth === 0 ? "59px" : d.depth === 1 ? "47px" : "31px")
        .text(d => d.data.icon)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip)
        .on("click", showDetailPanel);

    // Node labels (counter-rotated to stay upright and centered below)
    nodes.append("text")
        .attr("class", "node-text")
        .attr("dy", d => d.depth === 0 ? 75 : d.depth === 1 ? 65 : 45)
        .attr("text-anchor", "middle")
        .attr("transform", d => `rotate(${90 - d.x * 180 / Math.PI})`)
        .text(d => d.data.name)
        .style("fill", "#333");

    // Set up resize handler
    setupResizeHandler();
}

// Tooltip functionality
const tooltip = d3.select(".tooltip");

function showTooltip(event, d) {
    if (!d.data.definition) return;

    tooltip
        .html(`<strong>${d.data.name}</strong><br/>${d.data.definition}`)
        .style("left", (event.clientX + 10) + "px")
        .style("top", (event.clientY - 28) + "px")
        .classed("active", true);
}

function hideTooltip() {
    tooltip.classed("active", false);
}

// Detail panel functionality
function showDetailPanel(event, d) {
    event.stopPropagation();

    const panel = document.getElementById("detail-panel");
    const content = document.getElementById("panel-content");

    let html = `<h2 style="border-color: ${d.data.color}">${d.data.icon} ${d.data.name}</h2>`;

    if (d.data.definition) {
        html += `<p><strong>Definition:</strong> ${d.data.definition}</p>`;
    }

    if (d.data.lifecycle) {
        html += `<h3>Typical Lifecycle</h3>`;
        html += `<div class="lifecycle-steps">`;
        d.data.lifecycle.forEach(step => {
            html += `<div class="lifecycle-step">${step}</div>`;
        });
        html += `</div>`;
    }

    if (d.data.challenges) {
        html += `<h3>Key Management Challenges</h3><ul>`;
        d.data.challenges.forEach(challenge => {
            html += `<li>${challenge}</li>`;
        });
        html += `</ul>`;
    }

    if (d.data.cmdbIntegration) {
        html += `<h3>CMDB Integration</h3>`;
        html += `<p>${d.data.cmdbIntegration}</p>`;
    }

    if (d.data.examples) {
        html += `<h3>Example Items</h3><ul>`;
        d.data.examples.forEach(example => {
            html += `<li>${example}</li>`;
        });
        html += `</ul>`;
    }

    if (d.data.stakeholders) {
        html += `<h3>Primary Stakeholders</h3>`;
        html += `<p>${d.data.stakeholders}</p>`;
    }

    if (d.data.managementFocus) {
        html += `<h3>Management Focus</h3>`;
        html += `<p>${d.data.managementFocus}</p>`;
    }

    if (d.data.updateFrequency) {
        html += `<h3>Update Frequency</h3>`;
        html += `<p>${d.data.updateFrequency}</p>`;
    }

    if (d.data.trackingAttributes) {
        html += `<h3>Typical Tracking Attributes</h3><ul>`;
        d.data.trackingAttributes.forEach(attr => {
            html += `<li>${attr}</li>`;
        });
        html += `</ul>`;
    }

    content.innerHTML = html;
    panel.classList.add("active");
}

function closePanel() {
    document.getElementById("detail-panel").classList.remove("active");
}

// Handle window resize
function setupResizeHandler() {
    window.addEventListener("resize", () => {
        const vizContainer = document.getElementById("visualization");
        const containerWidth = vizContainer.clientWidth - 5;
        const containerHeight = vizContainer.clientHeight - 5;
        const size = Math.min(containerWidth, containerHeight);

        width = containerWidth;
        height = containerHeight;
        radius = size / 2 - 80;

        svg.attr("width", width).attr("height", height);
        g.attr("transform", `translate(${width/2},${height/2})`);

        // Update tree layout with new radius
        tree.size([2 * Math.PI, radius]);
        tree(root);

        // Update links
        g.selectAll(".link")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));

        // Update nodes
        g.selectAll(".node")
            .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

        // Update icon rotations to keep them upright
        g.selectAll(".icon")
            .attr("transform", d => `rotate(${90 - d.x * 180 / Math.PI})`);

        // Update label rotations to keep them upright
        g.selectAll(".node-text")
            .attr("transform", d => `rotate(${90 - d.x * 180 / Math.PI})`);
    });
}
