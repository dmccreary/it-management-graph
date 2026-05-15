// Regulatory Framework Timeline - vis-timeline
// CANVAS_HEIGHT: 500

const events = [
  {
    id: 1, content: 'HIPAA Enacted', start: '1996-08-21',
    className: 'hipaa',
    detail: {
      title: 'HIPAA (1996) — Health Insurance Portability and Accountability Act',
      body: `<p>Enacted August 21, 1996. Established national standards for protecting sensitive patient health information.
      <br><br><strong>Key IT Requirements:</strong> Administrative, physical, and technical safeguards for Protected Health Information (PHI).
      Covered entities (hospitals, insurers) must implement access controls, audit logs, and encryption.
      <br><br><strong>Penalty:</strong> Up to $1.9M per violation category per year.</p>`
    }
  },
  {
    id: 2, content: 'HIPAA Security Rule', start: '2003-04-21',
    className: 'hipaa',
    detail: {
      title: 'HIPAA Security Rule Finalized (2003)',
      body: `<p>Finalized April 2003, enforcement began April 2005. Specifically addressed electronic Protected Health Information (ePHI).
      <br><br><strong>Key IT Requirements:</strong> Risk analysis and management programs, workforce security training,
      access management controls, audit controls for ePHI, data integrity verification, and transmission security (encryption).
      <br><br>This rule drove adoption of role-based access control (RBAC) in healthcare IT systems.</p>`
    }
  },
  {
    id: 3, content: 'HITECH Act', start: '2009-02-17',
    className: 'hipaa',
    detail: {
      title: 'HITECH Act (2009) — Health Information Technology for Economic and Clinical Health Act',
      body: `<p>Signed February 17, 2009. Strengthened HIPAA enforcement and expanded breach notification requirements.
      <br><br><strong>Key IT Changes:</strong> Mandatory breach notification within 60 days for breaches affecting 500+ individuals.
      Increased penalties: up to $1.5M per violation category. Extended HIPAA requirements to Business Associates.
      <br><br><strong>IT Impact:</strong> Drove adoption of encryption as a de-facto safe harbor and audit logging infrastructure.</p>`
    }
  },
  {
    id: 4, content: 'GDPR Adopted', start: '2016-04-27',
    className: 'gdpr',
    detail: {
      title: 'GDPR Adopted by EU Parliament (2016)',
      body: `<p>Adopted April 27, 2016, with a two-year implementation period before enforcement began.
      <br><br><strong>Scope:</strong> Any organization processing data of EU residents, regardless of where the organization is based.
      <br><br><strong>Key IT Requirements:</strong> Data minimization, purpose limitation, privacy by design and default,
      Data Protection Impact Assessments (DPIA), right to erasure ("right to be forgotten"), data portability,
      72-hour breach notification to supervisory authorities.
      <br><br><strong>IT Architecture Impact:</strong> Forced redesign of data retention systems, consent management platforms, and data discovery tools.</p>`
    }
  },
  {
    id: 5, content: 'GDPR Enforcement Begins', start: '2018-05-25',
    className: 'gdpr',
    detail: {
      title: 'GDPR Enforcement Begins (May 25, 2018)',
      body: `<p>Full enforcement of GDPR began May 25, 2018, creating a new global standard for data privacy.
      <br><br><strong>Penalties:</strong> Up to €20M or 4% of global annual turnover (whichever is higher).
      <br><br><strong>Notable Fines:</strong> Google: €50M (2019), Amazon: €746M (2021), Meta: €1.2B (2023).
      <br><br><strong>IT Impact:</strong> Data governance became a board-level concern. Organizations invested heavily in
      data cataloging, lineage tracking, and consent management infrastructure. Graph databases emerged as key tools
      for tracking data flows and relationships across systems.</p>`
    }
  },
  {
    id: 6, content: 'Schrems II Ruling', start: '2020-07-16',
    className: 'ruling',
    detail: {
      title: 'Schrems II Ruling (July 16, 2020)',
      body: `<p>European Court of Justice invalidated the EU-US Privacy Shield framework on July 16, 2020.
      <br><br><strong>Impact:</strong> Complicated trans-Atlantic data transfers for thousands of organizations.
      Standard Contractual Clauses (SCCs) remained valid but required supplementary measures.
      <br><br><strong>IT Requirements:</strong> Organizations had to audit all data transfers to the US,
      implement technical measures (encryption with key management in EU), and conduct Transfer Impact Assessments (TIAs).
      <br><br><strong>Result:</strong> Accelerated adoption of data residency controls and region-aware data architectures.</p>`
    }
  },
  {
    id: 7, content: 'DORA Published', start: '2022-12-27',
    className: 'dora',
    detail: {
      title: 'DORA Published (December 2022) — Digital Operational Resilience Act',
      body: `<p>Published December 27, 2022, with a 2-year implementation period for EU financial sector entities.
      <br><br><strong>Scope:</strong> Banks, insurance companies, investment firms, crypto-asset service providers,
      and their critical ICT third-party providers.
      <br><br><strong>Key IT Requirements:</strong> ICT risk management frameworks, incident reporting (within 4 hours for major incidents),
      digital operational resilience testing (including threat-led penetration testing), ICT third-party risk management,
      and information sharing on cyber threats.
      <br><br><strong>IT Architecture Impact:</strong> Requires comprehensive CMDB and dependency mapping — exactly the use case for graph-based IT management.</p>`
    }
  },
  {
    id: 8, content: 'DORA Enforcement Begins', start: '2025-01-17',
    className: 'dora',
    detail: {
      title: 'DORA Full Enforcement (January 17, 2025)',
      body: `<p>DORA became fully enforceable across the EU financial sector on January 17, 2025.
      <br><br><strong>Penalties:</strong> Up to 2% of global annual turnover for financial entities.
      Critical third-party ICT providers face up to €5M fines or 1% of global daily turnover.
      <br><br><strong>IT Requirements Active:</strong> Real-time ICT incident detection and reporting,
      mandatory threat-led penetration testing (TLPT) every 3 years, register of all ICT third-party contracts,
      and comprehensive dependency mapping between services and their supporting ICT infrastructure.
      <br><br><strong>Graph DB Relevance:</strong> Graph-based CMDB systems are ideally suited for DORA's dependency tracing requirements.</p>`
    }
  }
];

const timelineItems = new vis.DataSet(events.map(e => ({
  id: e.id,
  content: e.content,
  start: e.start,
  className: e.className
})));

const options = {
  start: '1994-01-01',
  end: '2026-12-31',
  height: '100%',
  margin: { item: { horizontal: 10, vertical: 8 } },
  orientation: { axis: 'bottom' },
  zoomMin: 1000 * 60 * 60 * 24 * 30,
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 40,
  selectable: true,
  moveable: true,
  zoomable: true
};

const container = document.getElementById('timeline');
const timeline = new vis.Timeline(container, timelineItems, options);

const detailPanel = document.getElementById('detail-panel');

timeline.on('select', (props) => {
  if (props.items.length === 0) return;
  const id = props.items[0];
  const ev = events.find(e => e.id === id);
  if (ev) {
    detailPanel.innerHTML = `<h3>${ev.detail.title}</h3>${ev.detail.body}`;
  }
});
