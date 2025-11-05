// Global variables
let network = null;
let nodes = null;
let allNodesData = [];
let nodeTypes = new Set();

// Load data and initialize
async function init() {
    try {
        const response = await fetch('nodes-data.json');
        const data = await response.json();
        allNodesData = data.nodes;

        // Extract unique node types
        allNodesData.forEach(node => nodeTypes.add(node.type));

        // Initialize UI components
        initializeFilterCheckboxes();
        initializeLegend();
        initializeNetwork();
        setupEventListeners();

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initialize filter checkboxes
function initializeFilterCheckboxes() {
    const container = document.getElementById('filterCheckboxes');

    nodeTypes.forEach(type => {
        const wrapper = document.createElement('div');
        wrapper.className = 'filter-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `filter-${type}`;
        checkbox.value = type;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = `filter-${type}`;
        label.textContent = type;

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        container.appendChild(wrapper);

        // Add event listener
        checkbox.addEventListener('change', applyFilters);
    });
}

// Initialize legend
function initializeLegend() {
    const container = document.getElementById('legendItems');

    // Create a map of types to colors and icons
    const typeInfoMap = {};
    allNodesData.forEach(node => {
        if (!typeInfoMap[node.type]) {
            typeInfoMap[node.type] = {
                color: node.color,
                icon: node.icon || null
            };
        }
    });

    // Create legend items
    Object.entries(typeInfoMap).forEach(([type, info]) => {
        const item = document.createElement('div');
        item.className = 'legend-item';

        // Use icon if available, otherwise use colored circle
        if (info.icon) {
            const iconImg = document.createElement('img');
            iconImg.className = 'legend-icon';
            iconImg.src = info.icon;
            iconImg.alt = type;
            item.appendChild(iconImg);
        } else {
            const colorBox = document.createElement('div');
            colorBox.className = 'legend-color';
            colorBox.style.backgroundColor = info.color;
            item.appendChild(colorBox);
        }

        const label = document.createElement('div');
        label.className = 'legend-label';
        label.textContent = type;

        item.appendChild(label);
        container.appendChild(item);
    });
}

// Initialize vis-network
function initializeNetwork() {
    const container = document.getElementById('network');

    // Transform data for vis-network
    const visNodes = allNodesData.map(node => {
        const nodeConfig = {
            id: node.id,
            label: node.label,
            font: {
                size: 14,
                color: '#1e293b'
            },
            borderWidth: 2,
            borderWidthSelected: 4,
            title: createTooltip(node),
            nodeData: node // Store original data
        };

        // Use icon if available, otherwise use shape with color
        if (node.icon) {
            nodeConfig.shape = 'image';
            nodeConfig.image = node.icon;
            nodeConfig.size = node.size || 30;
        } else {
            nodeConfig.shape = node.shape;
            nodeConfig.size = node.size;
            nodeConfig.color = {
                background: node.color,
                border: '#334155',
                highlight: {
                    background: node.color,
                    border: '#1e293b'
                }
            };
        }

        return nodeConfig;
    });

    nodes = new vis.DataSet(visNodes);

    // No edges for this visualization
    const edges = new vis.DataSet([]);

    const data = {
        nodes: nodes,
        edges: edges
    };

    const options = {
        physics: {
            enabled: true,
            stabilization: {
                iterations: 200
            },
            barnesHut: {
                gravitationalConstant: -4000,
                centralGravity: 0.3,
                springLength: 150,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0.5
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 100
        },
        nodes: {
            font: {
                size: 14
            }
        }
    };

    network = new vis.Network(container, data, options);

    // Event listeners
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nodeData = allNodesData.find(n => n.id === nodeId);
            displayNodeDetails(nodeData);
        }
    });
}

// Create tooltip content
function createTooltip(node) {
    let tooltip = `<strong>${node.label}</strong><br>`;
    tooltip += `<em>Type: ${node.type}</em><br><br>`;

    Object.entries(node.properties).forEach(([key, value]) => {
        tooltip += `<strong>${key}:</strong> ${value}<br>`;
    });

    return tooltip;
}

// Display node details in sidebar
function displayNodeDetails(nodeData) {
    const container = document.getElementById('nodeDetails');

    let html = `
        <div class="node-detail-header">
            <h4>${nodeData.label}</h4>
            <div class="node-type">:${nodeData.type}</div>
        </div>

        <div class="properties-list">
    `;

    Object.entries(nodeData.properties).forEach(([key, value]) => {
        html += `
            <div class="property-item">
                <div class="property-key">${key}</div>
                <div class="property-value">${value}</div>
            </div>
        `;
    });

    html += `
        </div>
        <div class="property-count">
            ${Object.keys(nodeData.properties).length} properties
        </div>
    `;

    container.innerHTML = html;
}

// Apply filters
function applyFilters() {
    const checkedTypes = Array.from(document.querySelectorAll('#filterCheckboxes input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    // Update node visibility
    allNodesData.forEach(nodeData => {
        const shouldShow = checkedTypes.includes(nodeData.type);
        nodes.update({
            id: nodeData.id,
            hidden: !shouldShow
        });
    });
}

// Search functionality
function searchNodes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (!searchTerm) {
        return;
    }

    // Find matching node
    const matchingNode = allNodesData.find(node => {
        // Search in label
        if (node.label.toLowerCase().includes(searchTerm)) {
            return true;
        }

        // Search in properties
        return Object.values(node.properties).some(value =>
            String(value).toLowerCase().includes(searchTerm)
        );
    });

    if (matchingNode) {
        // Focus on the node
        network.focus(matchingNode.id, {
            scale: 1.5,
            animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuad'
            }
        });

        // Select the node
        network.selectNodes([matchingNode.id]);

        // Display details
        displayNodeDetails(matchingNode);
    } else {
        alert('No matching node found');
    }
}

// Select all filter checkboxes
function selectAllFilters() {
    const checkboxes = document.querySelectorAll('#filterCheckboxes input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (!cb.checked) {
            cb.checked = true;
        }
    });
    applyFilters();
}

// Unselect all filter checkboxes
function unselectAllFilters() {
    const checkboxes = document.querySelectorAll('#filterCheckboxes input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            cb.checked = false;
        }
    });
    applyFilters();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', searchNodes);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchNodes();
        }
    });
    document.getElementById('selectAllBtn').addEventListener('click', selectAllFilters);
    document.getElementById('unselectAllBtn').addEventListener('click', unselectAllFilters);

    // Setup callout OK button handlers
    const calloutOkButtons = document.querySelectorAll('.callout-ok-btn');
    calloutOkButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const callout = e.target.closest('.callout');
            if (callout) {
                callout.style.display = 'none';
            }
        });
    });
}

// Initialize on page load
window.addEventListener('load', init);
