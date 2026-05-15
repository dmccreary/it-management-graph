// HIPAA Data Flow Tracing Diagram
// CANVAS_HEIGHT: 600
// Mermaid.js with two switchable views: data flow and access control

const DIAGRAMS = {
  dataflow: `flowchart LR
    classDef phi fill:#fde8e8,stroke:#dc3545,color:#7b1c1c
    classDef system fill:#cfe2ff,stroke:#0d6efd,color:#0a3678
    classDef control fill:#d1e7dd,stroke:#198754,color:#0a3622
    classDef external fill:#fff3cd,stroke:#ffc107,color:#664d00

    EHR["EHR System<br/>(ePHI Source)"]:::phi
    API["FHIR API<br/>Gateway"]:::system
    PACS["PACS Imaging<br/>Server"]:::phi
    LAB["Lab Results<br/>System"]:::phi
    GRAPH["IT Management<br/>Graph DB"]:::system
    AUDIT["Audit Log<br/>Service"]:::control
    PORTAL["Patient\nPortal"]:::external
    INSURER["Insurer\n(BAA Required)"]:::external
    DEIDENT["De-identification\nService"]:::control
    RESEARCH["Research\nDataset"]:::external

    EHR -->|"ePHI (TLS 1.3)"| API
    PACS -->|"DICOM (encrypted)"| API
    LAB -->|"HL7 v2 (VPN)"| API
    API -->|"Relationship\nMapping"| GRAPH
    API -->|"All access events"| AUDIT
    GRAPH -->|"Audit trail"| AUDIT
    API -->|"Patient view\n(authenticated)"| PORTAL
    API -->|"Claims data\n(BAA signed)"| INSURER
    EHR -->|"Raw PHI"| DEIDENT
    DEIDENT -->|"Anonymized"| RESEARCH
`,
  access: `flowchart TD
    classDef role fill:#e2cfff,stroke:#6f42c1,color:#3a1078
    classDef system fill:#cfe2ff,stroke:#0d6efd,color:#0a3678
    classDef control fill:#d1e7dd,stroke:#198754,color:#0a3622
    classDef deny fill:#fde8e8,stroke:#dc3545,color:#7b1c1c

    DOCTOR["Treating Physician\n(Role: Clinician)"]:::role
    ADMIN["Billing Admin\n(Role: Administrative)"]:::role
    ANALYST["Data Analyst\n(Role: Research)"]:::role
    EXTERNAL["External Auditor\n(Role: Auditor)"]:::role

    RBAC["RBAC Policy\nEngine"]:::control
    MFA["Multi-Factor\nAuth"]:::control

    EHR["Full EHR\n(all ePHI)"]:::system
    BILLING["Billing Records\n(claims data)"]:::system
    DEIDENT["De-identified\nDataset"]:::system
    AUDITONLY["Audit Logs\n(read-only)"]:::system
    DENIED["Direct PHI Access\nDENIED"]:::deny

    DOCTOR --> MFA --> RBAC
    ADMIN --> MFA --> RBAC
    ANALYST --> MFA --> RBAC
    EXTERNAL --> MFA --> RBAC

    RBAC -->|"Permit: full record\nfor own patients"| EHR
    RBAC -->|"Permit: billing fields\nonly"| BILLING
    RBAC -->|"Permit: anonymized\ndata only"| DEIDENT
    RBAC -->|"Permit: read audit\nnot PHI"| AUDITONLY
    RBAC -->|"Deny: no treatment\nrelationship"| DENIED
`
};

let currentView = 'dataflow';

async function renderDiagram(view) {
  const el = document.getElementById('mermaid-container');
  el.removeAttribute('data-processed');
  el.innerHTML = DIAGRAMS[view];
  try {
    const { svg } = await mermaid.render('merm-' + Date.now(), DIAGRAMS[view]);
    el.innerHTML = svg;
  } catch (e) {
    el.innerHTML = '<p style="color:red;padding:20px">Render error: ' + e.message + '</p>';
  }
}

window.addEventListener('load', async () => {
  mermaid.initialize({ startOnLoad: false, theme: 'base', fontSize: 13 });

  document.getElementById('btn-dataflow').addEventListener('click', () => {
    currentView = 'dataflow';
    setActive('btn-dataflow');
    renderDiagram('dataflow');
  });
  document.getElementById('btn-access').addEventListener('click', () => {
    currentView = 'access';
    setActive('btn-access');
    renderDiagram('access');
  });

  setActive('btn-dataflow');
  await renderDiagram('dataflow');
});

function setActive(id) {
  ['btn-dataflow', 'btn-access'].forEach(b => {
    const el = document.getElementById(b);
    el.style.background = b === id ? '#1a3a6c' : '#e9ecef';
    el.style.color = b === id ? '#fff' : '#212529';
  });
}
