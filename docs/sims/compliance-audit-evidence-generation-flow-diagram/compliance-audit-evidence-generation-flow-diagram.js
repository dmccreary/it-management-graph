// Compliance Audit Evidence Generation Flow — Mermaid.js
// CANVAS_HEIGHT: 600

const DIAGRAMS = {
    overview: `flowchart TD
    A["🔍 Audit Request\nReceived"] --> B["Parse Regulatory\nFramework\n(SOX / HIPAA / GDPR)"]
    B --> C["Query IT\nManagement Graph"]
    C --> D1["Access Control\nEvidence"]
    C --> D2["Data Flow\nEvidence"]
    C --> D3["Change History\nEvidence"]
    C --> D4["Configuration\nBaseline Evidence"]
    D1 --> E["Evidence Validator"]
    D2 --> E
    D3 --> E
    D4 --> E
    E --> F{Gaps\nDetected?}
    F -- Yes --> G["🚨 Gap Report\n& Remediation\nTickets"]
    F -- No --> H["✅ Evidence\nPackage Assembly"]
    G --> I["Remediation\nWorkflow"]
    I --> C
    H --> J["📄 Audit Report\nGeneration"]
    J --> K["🔐 Digital\nSignature &\nTimestamp"]
    K --> L["📬 Deliver to\nAuditor"]

    style A fill:#E3F2FD,stroke:#1565C0
    style L fill:#E8F5E9,stroke:#2E7D32
    style G fill:#FFEBEE,stroke:#C62828
    style H fill:#FFF9C4,stroke:#F9A825`,

    sox: `flowchart LR
    A["📋 SOX Audit\nScope"] --> B["IT General\nControls Check"]
    B --> C1["Access Control\nReview\n(ITGC-AC)"]
    B --> C2["Change Management\n(ITGC-CM)"]
    B --> C3["Operations\n(ITGC-OP)"]
    C1 --> D["Graph Query:\nWHO has access to\nFINANCIAL systems?"]
    C2 --> E["Graph Query:\nAll changes to\nfinancial apps\nlast 90 days"]
    C3 --> F["Graph Query:\nBackup completion\nstatus"]
    D --> G["Access Matrix\nReport"]
    E --> H["Change Log\nEvidence"]
    F --> I["Operations\nChecklist"]
    G --> J["📊 SOX\nControl\nPackage"]
    H --> J
    I --> J

    style A fill:#FFF3E0,stroke:#E65100
    style J fill:#E8F5E9,stroke:#2E7D32`,

    hipaa: `flowchart TD
    A["🏥 HIPAA Audit\nInitiated"] --> B["Identify PHI\nData Flows"]
    B --> C["Graph Query:\nAll nodes tagged\nwith PHI=true"]
    C --> D["Map PHI\nTransmission Paths"]
    D --> E1["Encryption\nStatus Check"]
    D --> E2["Access Audit\nLog Review"]
    D --> E3["Business Associate\nAgreement Status"]
    E1 --> F{All PHI\nEncrypted?}
    F -- No --> G["⚠️ Encryption\nGap Finding"]
    F -- Yes --> H["✅ Encryption\nEvidence"]
    E2 --> I["Access Review\nReport"]
    E3 --> J["BAA Compliance\nReport"]
    G --> K["📋 HIPAA\nFindings Report"]
    H --> K
    I --> K
    J --> K

    style A fill:#FCE4EC,stroke:#880E4F
    style G fill:#FFEBEE,stroke:#C62828
    style K fill:#E8F5E9,stroke:#2E7D32`
};

let currentDiagram = 'overview';

function renderDiagram(key) {
    currentDiagram = key;
    const el = document.getElementById('mermaid-div');
    el.removeAttribute('data-processed');
    el.innerHTML = DIAGRAMS[key];
    mermaid.init(undefined, el);

    document.querySelectorAll('#controls button').forEach(b => b.classList.remove('active'));
    const map = { overview: 'btnOverview', sox: 'btnSOX', hipaa: 'btnHIPAA' };
    document.getElementById(map[key]).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    mermaid.initialize({ startOnLoad: false, theme: 'default', flowchart: { curve: 'basis' } });
    renderDiagram('overview');

    document.getElementById('btnOverview').addEventListener('click', () => renderDiagram('overview'));
    document.getElementById('btnSOX').addEventListener('click', () => renderDiagram('sox'));
    document.getElementById('btnHIPAA').addEventListener('click', () => renderDiagram('hipaa'));
});
