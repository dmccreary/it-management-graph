// RBAC Permission Graph Visualization - vis-network
// CANVAS_HEIGHT: 580

const nodes = new vis.DataSet([
  // Users (level 0)
  { id: 'u1', label: 'Dr. Sarah Chen\n(Cardiology)', group: 'user', title: 'Employee: E12345 | Dept: Cardiology\nRoles: Physician\nAccess: Patient Records, Lab Results' },
  { id: 'u2', label: 'John Martinez RN\n(Emergency)', group: 'user', title: 'Employee: E23456 | Dept: Emergency\nRoles: Nurse\nAccess: Patient Records, Billing System' },
  { id: 'u3', label: 'Maria Silva\n(IT Security)', group: 'user', title: 'Employee: E34567 | Dept: IT Security\nRoles: System Administrator\nAccess: All Systems (FULL)' },

  // Roles (level 1)
  { id: 'r1', label: 'Physician\n(Privilege: High)', group: 'role', title: 'Role: Physician\nPrivilege Level: High\nMembers: 12 physicians\nAccess: Patient Records (R/W), Lab Results (R)' },
  { id: 'r2', label: 'Nurse\n(Privilege: Medium)', group: 'role', title: 'Role: Nurse\nPrivilege Level: Medium\nMembers: 47 nurses\nAccess: Patient Records (R/W), Billing (R)' },
  { id: 'r3', label: 'System Admin\n(Privilege: Full)', group: 'role', title: 'Role: System Administrator\nPrivilege Level: Full\nMembers: 3 admins\nAccess: All Systems (FULL ADMIN)' },
  { id: 'r4', label: 'Senior Physician\n(Privilege: High+)', group: 'role', title: 'Role: Senior Physician\nInherits all Physician permissions\nPlus: Approve critical procedures' },

  // Resources - Databases (level 2)
  { id: 'res1', label: 'Patient\nRecords DB', group: 'database', title: 'Resource: Patient_Records_DB\nClassification: RESTRICTED\nCompliance: HIPAA\nAccess: 59 users via roles' },
  { id: 'res2', label: 'Lab\nResults DB', group: 'database', title: 'Resource: Lab_Results_DB\nClassification: RESTRICTED\nCompliance: HIPAA\nAccess: Physicians (READ only)' },
  { id: 'res3', label: 'Billing\nSystem', group: 'system', title: 'Resource: Billing_System\nClassification: CONFIDENTIAL\nCompliance: HIPAA, PCI-DSS\nAccess: Nurses (READ only)' },
  { id: 'res4', label: 'HR\nSystem', group: 'system', title: 'Resource: HR_System\nClassification: INTERNAL\nAccess: Admin (FULL), HR roles' },
]);

const edges = new vis.DataSet([
  // HAS_ROLE edges (solid blue)
  { id: 'e1', from: 'u1', to: 'r1', label: 'HAS_ROLE', color: { color: '#1565c0', highlight: '#1976d2' }, dashes: false, width: 2, arrows: 'to', font: { size: 9, color: '#1565c0' } },
  { id: 'e2', from: 'u2', to: 'r2', label: 'HAS_ROLE', color: { color: '#1565c0', highlight: '#1976d2' }, dashes: false, width: 2, arrows: 'to', font: { size: 9, color: '#1565c0' } },
  { id: 'e3', from: 'u3', to: 'r3', label: 'HAS_ROLE', color: { color: '#1565c0', highlight: '#1976d2' }, dashes: false, width: 2, arrows: 'to', font: { size: 9, color: '#1565c0' } },

  // MEMBER_OF (dotted purple) - role hierarchy
  { id: 'e4', from: 'r4', to: 'r1', label: 'MEMBER_OF', color: { color: '#6a1b9a', highlight: '#8e24aa' }, dashes: [4, 4], width: 2, arrows: 'to', font: { size: 9, color: '#6a1b9a' } },

  // CAN_ACCESS (dashed green)
  { id: 'e5', from: 'r1', to: 'res1', label: 'R/W', color: { color: '#2e7d32', highlight: '#388e3c' }, dashes: [6, 3], width: 2, arrows: 'to', font: { size: 9, color: '#2e7d32' } },
  { id: 'e6', from: 'r1', to: 'res2', label: 'READ', color: { color: '#2e7d32', highlight: '#388e3c' }, dashes: [6, 3], width: 1.5, arrows: 'to', font: { size: 9, color: '#2e7d32' } },
  { id: 'e7', from: 'r2', to: 'res1', label: 'R/W', color: { color: '#2e7d32', highlight: '#388e3c' }, dashes: [6, 3], width: 2, arrows: 'to', font: { size: 9, color: '#2e7d32' } },
  { id: 'e8', from: 'r2', to: 'res3', label: 'READ', color: { color: '#2e7d32', highlight: '#388e3c' }, dashes: [6, 3], width: 1.5, arrows: 'to', font: { size: 9, color: '#2e7d32' } },
  { id: 'e9', from: 'r3', to: 'res1', label: 'ADMIN', color: { color: '#c62828', highlight: '#e53935' }, dashes: [6, 3], width: 3, arrows: 'to', font: { size: 9, color: '#c62828' } },
  { id: 'e10', from: 'r3', to: 'res2', label: 'ADMIN', color: { color: '#c62828', highlight: '#e53935' }, dashes: [6, 3], width: 3, arrows: 'to', font: { size: 9, color: '#c62828' } },
  { id: 'e11', from: 'r3', to: 'res3', label: 'ADMIN', color: { color: '#c62828', highlight: '#e53935' }, dashes: [6, 3], width: 3, arrows: 'to', font: { size: 9, color: '#c62828' } },
  { id: 'e12', from: 'r3', to: 'res4', label: 'ADMIN', color: { color: '#c62828', highlight: '#e53935' }, dashes: [6, 3], width: 3, arrows: 'to', font: { size: 9, color: '#c62828' } },
]);

const groups = {
  user: {
    shape: 'ellipse',
    color: { background: '#64b5f6', border: '#1565c0', highlight: { background: '#42a5f5', border: '#0d47a1' } },
    font: { size: 11, color: '#0d47a1' },
    size: 30
  },
  role: {
    shape: 'hexagon',
    color: { background: '#ce93d8', border: '#6a1b9a', highlight: { background: '#ba68c8', border: '#4a148c' } },
    font: { size: 11, color: '#4a148c' },
    size: 28
  },
  database: {
    shape: 'cylinder',
    color: { background: '#ffb74d', border: '#e65100', highlight: { background: '#ffa726', border: '#bf360c' } },
    font: { size: 11, color: '#bf360c' },
    size: 24
  },
  system: {
    shape: 'box',
    color: { background: '#a5d6a7', border: '#2e7d32', highlight: { background: '#81c784', border: '#1b5e20' } },
    font: { size: 11, color: '#1b5e20' },
    size: 24
  }
};

const container = document.getElementById('network');
const network = new vis.Network(container, { nodes, edges }, {
  groups,
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      sortMethod: 'directed',
      levelSeparation: 130,
      nodeSpacing: 110
    }
  },
  physics: { enabled: false },
  interaction: {
    hover: true,
    tooltipDelay: 100,
    navigationButtons: false,
    keyboard: false
  },
  edges: {
    smooth: { type: 'curvedCW', roundness: 0.15 },
    font: { align: 'middle', size: 9 }
  }
});

const infoPanel = document.getElementById('info-panel');
const allNodeIds = nodes.getIds();
const allEdgeIds = edges.getIds();

network.on('click', (params) => {
  if (params.nodes.length === 0) {
    // Reset
    nodes.update(allNodeIds.map(id => ({ id, opacity: 1 })));
    edges.update(allEdgeIds.map(id => ({ id, color: undefined })));
    infoPanel.innerHTML = '<h4>Click a node to explore</h4><p>Click any user, role, or resource to highlight their permission paths through the RBAC graph.</p>';
    return;
  }
  const clickedId = params.nodes[0];
  const clickedNode = nodes.get(clickedId);

  // Find connected nodes
  const connected = network.getConnectedNodes(clickedId);
  const connectedEdges = network.getConnectedEdges(clickedId);

  // Also get 2nd degree for users (user → role → resource)
  const secondDegree = [];
  connected.forEach(nId => {
    network.getConnectedNodes(nId).forEach(n2 => {
      if (!connected.includes(n2) && n2 !== clickedId) secondDegree.push(n2);
    });
  });
  const secondEdges = [];
  connected.forEach(nId => {
    network.getConnectedEdges(nId).forEach(eId => {
      if (!connectedEdges.includes(eId)) secondEdges.push(eId);
    });
  });

  const highlighted = new Set([clickedId, ...connected, ...secondDegree]);
  const highlightedEdges = new Set([...connectedEdges, ...secondEdges]);

  nodes.update(allNodeIds.map(id => ({
    id,
    opacity: highlighted.has(id) ? 1.0 : 0.15
  })));
  edges.update(allEdgeIds.map(id => ({
    id,
    color: highlightedEdges.has(id)
      ? undefined
      : { color: 'rgba(200,200,200,0.2)', highlight: 'rgba(200,200,200,0.2)' }
  })));

  infoPanel.innerHTML = `<h4>${clickedNode.label.replace(/\n/g,' ')}</h4><p style="color:#555">${clickedNode.title || ''}</p>`;
});

network.on('hoverNode', (params) => {
  container.style.cursor = 'pointer';
});
network.on('blurNode', () => {
  container.style.cursor = 'default';
});
