// Technology Selection Workflow with Decision Gates - Mermaid.js MicroSim
// CANVAS_HEIGHT: 580

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  },
  themeVariables: {
    primaryColor: '#3498db',
    primaryTextColor: '#fff',
    primaryBorderColor: '#1a6ba0',
    lineColor: '#555',
    secondaryColor: '#f39c12',
    tertiaryColor: '#f8f9fa'
  }
});

const diagramDef = `flowchart TD
    START([🚀 Technology Selection Initiated]):::start
    REQ[📋 Define Requirements<br/>Functional, Non-Functional,<br/>Organizational]:::req
    WEIGHT[⚖️ Prioritize & Weight Requirements<br/>Critical / Important / Beneficial]:::req
    GATE1{🔷 Gate 1:<br/>Build vs Buy?}:::gate
    CUSTOM([🔧 Architect Custom Solution]):::custom
    RFI[📤 Issue RFI to Vendors<br/>Send requirements document]:::vendor
    SCREEN[🔍 Initial Vendor Screening<br/>Eliminate non-qualifying vendors]:::vendor
    GATE2{🔷 Gate 2:<br/>≥2 Qualified<br/>Vendors?}:::gate
    REVISIT[🔄 Revisit Requirements<br/>Relax constraints or expand search]:::loop
    POC[🧪 Conduct Proof of Concept<br/>2-4 weeks per vendor]:::eval
    REF[📞 Reference Checks<br/>Interview existing customers]:::eval
    TCO[💰 Calculate TCO & ROI<br/>5-year cost analysis]:::eval
    SCORE[📊 Score & Rank Options<br/>Weighted decision matrix]:::eval
    GATE3{🔷 Gate 3:<br/>Clear Winner?}:::gate
    MOREANALYSIS[🔎 Conduct Additional Analysis<br/>Re-evaluate scoring]:::loop
    RECOMMEND[📄 Prepare Recommendation<br/>Document findings & rationale]:::docs
    GATE4{🔷 Gate 4:<br/>Stakeholder Approval?}:::gate
    REVISIT2[🔄 Revisit Requirements<br/>Incorporate feedback]:::loop
    CONTRACT[✅ Finalize Contract &<br/>Begin Implementation]:::done
    END([🎉 Technology Selected]):::end

    START --> REQ
    REQ --> WEIGHT
    WEIGHT --> GATE1
    GATE1 -->|Build| CUSTOM
    GATE1 -->|Buy| RFI
    GATE1 -->|Hybrid| RFI
    RFI --> SCREEN
    SCREEN --> GATE2
    GATE2 -->|No| REVISIT
    REVISIT --> RFI
    GATE2 -->|Yes| POC
    POC --> REF
    REF --> TCO
    TCO --> SCORE
    SCORE --> GATE3
    GATE3 -->|No| MOREANALYSIS
    MOREANALYSIS --> SCORE
    GATE3 -->|Yes| RECOMMEND
    RECOMMEND --> GATE4
    GATE4 -->|No| REVISIT2
    REVISIT2 --> WEIGHT
    GATE4 -->|Yes| CONTRACT
    CONTRACT --> END

    classDef start fill:#2980b9,stroke:#1a5c8a,color:#fff,rx:20
    classDef req fill:#3498db,stroke:#2471a3,color:#fff
    classDef gate fill:#f1c40f,stroke:#d4ac0d,color:#333,shape:diamond
    classDef vendor fill:#27ae60,stroke:#1e8449,color:#fff
    classDef eval fill:#e67e22,stroke:#ca6f1e,color:#fff
    classDef docs fill:#9b59b6,stroke:#7d3c98,color:#fff
    classDef done fill:#1e8449,stroke:#145a32,color:#fff
    classDef end fill:#1e8449,stroke:#145a32,color:#fff,rx:20
    classDef custom fill:#95a5a6,stroke:#717d7e,color:#fff
    classDef loop fill:#fadbd8,stroke:#e74c3c,color:#922b21
`;

async function renderDiagram() {
  const el = document.getElementById('main-diagram');
  try {
    const { svg } = await mermaid.render('mermaid-svg', diagramDef);
    el.innerHTML = svg;
  } catch (e) {
    el.innerHTML = `<p style="color:red;padding:20px;">Diagram render error: ${e.message}</p>`;
    console.error('Mermaid render error:', e);
  }
}

// Add tooltip interactivity after render
function addTooltips() {
  const tooltips = {
    'Technology Selection Initiated': 'Triggered by digital transformation initiative or legacy system pain points.',
    'Define Requirements': 'Document functional, non-functional, and organizational requirements from all stakeholders.',
    'Prioritize': 'Categorize as Critical (must have), Important (strongly desired), or Beneficial (nice to have).',
    'Build vs Buy': 'Initial strategic decision: Custom build, vendor platform, or hybrid approach?',
    'Issue RFI': 'Request for Information sent to potential vendors with requirements document.',
    'Initial Vendor Screening': 'Eliminate vendors that do not meet critical requirements.',
    'Proof of Concept': 'Hands-on testing with real data and use cases (2-4 weeks per vendor).',
    'Reference Checks': 'Interview existing customers about their experience with the vendor.',
    'TCO & ROI': 'Total cost of ownership and return on investment analysis over 5 years.',
    'Score & Rank': 'Apply decision matrix with weighted requirements to rank all options.',
    'Prepare Recommendation': 'Document findings, scores, rationale, and implementation plan.',
    'Finalize Contract': 'Negotiate terms, sign contract, kick off implementation project.'
  };
}

renderDiagram().then(addTooltips);
