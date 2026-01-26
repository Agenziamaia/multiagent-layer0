# 🎯 3-TIER LEADERSHIP SYSTEM - RESPONSIBILITY MATRIX (RACI)

**Purpose**: Clear authority boundaries to prevent conflicts and ensure efficient decision-making.

**Generated**: 2026-01-26
**Version**: 1.0.0

---

## 📋 LEGEND

| Symbol | Meaning                                            |
| ------ | -------------------------------------------------- |
| **A**  | Accountable - Final decision maker for this domain |
| **R**  | Responsible - The one who performs the work        |
| **C**  | Consulted - Provides input before decision         |
| **I**  | Informed - Notified of decision after it's made    |

---

## 🎯 AUTHORITY LEVELS

### Tier 1: Maia - Spotless Orchestrator

- **Authority Type**: Execution Authority
- **Final Say On**: Operational decisions only
- **Decision Scope**: Routing, tool usage, batching, parallelization, board hygiene, resilience

### Tier 2: Sisyphus - Agentic Project Manager

- **Authority Type**: Program Authority
- **Final Say On**: Project-level decisions within Giuzu's strategy
- **Decision Scope**: Charters, milestones, sequencing, definition of done, acceptance criteria, risk management

### Tier 3: Giuzu - Strategic Leader

- **Authority Type**: Governance Authority
- **Final Say On**: Vision, priorities, standards, risk policy
- **Decision Scope**: Strategy, governance, precedent-setting, cross-project standards

---

## 📊 FULL RESPONSIBILITY MATRIX

| Domain                                              | Maia (T1) | Sisyphus (T2) | Giuzu (T3) | Decision Flow                                              |
| --------------------------------------------------- | --------- | ------------- | ---------- | ---------------------------------------------------------- |
| **STRATEGIC VISION & PRIORITIES**                   | I         | I             | **R/A**    | Giuzu decides, informs all                                 |
| **CROSS-PROJECT STANDARDS**                         | I         | I             | **R/A**    | Giuzu sets, Maia/Sisyphus follow                           |
| **RISK POLICY & TOLERANCE**                         | I         | I             | **R/A**    | Giuzu defines, Sisyphus applies, Maia respects             |
| **ESCALATION THRESHOLDS**                           | I         | I             | **R/A**    | Giuzu defines, Maia implements                             |
| **STOP-THE-LINE SAFETY VETO**                       | R         | R             | **R/A**    | Giuzu has veto power on safety                             |
| **PROJECT CHARTERS**                                | C         | **R/A**       | C          | Sisyphus creates with Giuzu's guidance                     |
| **MILESTONE PLANS**                                 | C         | **R/A**       | C          | Sisyphus creates, Giuzu approves                           |
| **DEFINITION OF DONE**                              | C         | **R/A**       | C          | Sisyphus defines, Maia enforces                            |
| **ACCEPTANCE CRITERIA**                             | C         | **R/A**       | C          | Sisyphus defines, Maia enforces                            |
| **PROJECT RISK MANAGEMENT**                         | C         | **R/A**       | C          | Sisyphus owns, Giuzu sets policy                           |
| **INTAKE TRIAGE** (simple vs complex vs strategic)  | **R/A**   | C             | I          | Maia classifies, Sisyphus handles complex, Giuzu strategic |
| **KANBAN BOARD OPERATIONS**                         | **R/A**   | C             | I          | Maia owns board, Sisyphus creates tasks                    |
| **AGENT ROUTING & SKILL INJECTION**                 | **R/A**   | C             | I          | Maia routes, Sisyphus defines categories                   |
| **OPERATIONAL TACTICS** (batching, parallelization) | **R/A**   | C             | I          | Maia decides, Sisyphus provides guidance                   |
| **PARALLELIZATION & BATCHING**                      | **R/A**   | C             | I          | Maia decides, Sisyphus provides requirements               |
| **BOARD HYGIENE**                                   | **R/A**   | C             | I          | Maia maintains, Sisyphus monitors                          |
| **RESILIENCE & RETRY LOGIC**                        | **R/A**   | C             | I          | Maia implements, Sisyphus documents patterns               |
| **POST-MORTEMS & SYSTEMIC IMPROVEMENTS**            | C         | **R/A**       | **R/A**    | Sisyphus leads, Giuzu learns                               |
| **GOVERNANCE RULES & PLAYBOOKS**                    | I         | C             | **R/A**    | Giuzu owns, Sisyphus uses, Maia follows                    |
| **DECISION RECORDS (DR)**                           | I         | C             | **R/A**    | Giuzu owns precedence, Sisyphus creates operational DRs    |
| **PLAYBOOKS & PATTERNS LIBRARY**                    | I         | **R/A**       | **R/A**    | Giuzu owns, Sisyphus uses, Maia executes                   |

---

## 🔄 DECISION FLOW HIERARCHY

### Flow 1: Intake & Triage

```
User Request
    ↓
[Maia: T1] Rapid Classification
    ├─ Routine (trivial, single-step) → MAIA executes directly
    ├─ Complex (multi-step, project work) → Escalate to Sisyphus (T2)
    └─ Strategic (precedent-setting, ambiguous) → Consult Giuzu (T3)
    ↓
Giuzu [T3]: Provides strategic direction (if consulted)
    ↓
Sisyphus [T2]: Creates project charter/milestone plan (if complex)
    ↓
Maia [T1]: Converts plan to Kanban tasks and executes
```

**Decision Authority**: Maia (T1) for classification, Giuzu (T3) for strategy, Sisyphus (T2) for planning

---

### Flow 2: Project Execution

```
Sisyphus Plan Approved
    ↓
[Maia: T1] Extracts milestones, resources, acceptance criteria
    ↓
[Maia: T1] Creates Kanban tasks for all milestones
    ↓
[Maia: T1] Health checks agents (30s timeout)
    ↓
[Maia: T1] Fires parallel agents for independent work
    ↓
[Maia: T1] Monitors progress, updates Kanban status
    ↓
[Maia: T1] Generates Execution Report (ER) on completion
    ↓
[Maia: T1] Sends ER to Sisyphus (T2) for acceptance
    ↓
[Sisyphus: T2] Verifies against charter, provides acceptance decision
    ↓
[Maia: T1] Updates Kanban to DONE (if approved)
```

**Decision Authority**: Maia (T1) for operational execution, Sisyphus (T2) for acceptance

---

### Flow 3: Strategic Decisions

```
Precedent-Setting Moment Identified
    ↓
[Maia: T1] OR [Sisyphus: T2] identifies strategic nature
    ↓
Escalates to Giuzu [T3]
    ↓
[Giuzu: T3] Provides strategic consultation (time-boxed ≤10min)
    ├─ Options A and B (pros/cons/risks)
    ├─ Recommendation
    └─ What would change your mind
    ↓
[Maia: T1] OR [Sisyphus: T2] implements decision
    ↓
[Giuzu: T3] Records Decision Record (DR) for future reference
```

**Decision Authority**: Giuzu (T3) for all strategic decisions

---

### Flow 4: Conflict Resolution

```
Disagreement Identified
    ↓
Name Disagreement Type:
    ├─ STRATEGY (vision, priorities, standards)
    │  └─ [Giuzu: T3] decides within 10min
    ├─ PLAN (milestones, sequencing, acceptance criteria)
    │  └─ [Sisyphus: T2] decides, Maia (T1) implements
    └─ EXECUTION (routing, tools, batching)
       └─ [Maia: T1] decides, Sisyphus (T2) informed
    ↓
If Not Resolved (≤2 message exchanges):
    ↓
Escalate to Giuzu [T3] for tie-break
    ↓
[Giuzu: T3] Provides definitive decision with 2-option brief
    ↓
Implement decision
```

**Decision Authority**: Based on disagreement type (Strategy/Plan/Execution), appropriate Tier decides

---

## 🛡️ ARTIFACT SEPARATION (Non-Overlap Principle)

### Tier 1: Maia (Execution Artifacts)

- **Produces**: Task Graphs, Delegation Packets, Execution Logs, Board State Updates
- **Does NOT Produce**: Strategy Briefs, Policies, Playbooks, Pattern Diffs
- **Artifact Types**:
  - Kanban task cards
  - Execution Reports (ER)
  - Health check logs
  - Agent status tracking
  - Retry/failure logs
  - Parallel task coordination data

### Tier 2: Sisyphus (Program Artifacts)

- **Produces**: Project Charters, Milestone Plans, Decision Records, Risk Registers
- **Does NOT Produce**: Strategy Briefs, Policies, Task Graphs (Maia handles)
- **Artifact Types**:
  - Project Charters (scope, objectives, success criteria)
  - Milestone Plans (deliverables, dependencies, acceptance criteria)
  - Decision Records (DR) - operational decisions only
  - Risk Registers (identification, mitigation, monitoring)
  - Acceptance Reports
  - Delegation Packets (with skill requirements)
  - Postmortem Analyses

### Tier 3: Giuzu (Governance Artifacts)

- **Produces**: Strategy Briefs, Policies, Playbooks, Pattern Diffs, Guardrails, Decision Records
- **Does NOT Produce**: Project Charters, Task Graphs, Execution Logs (Maia/Sisyphus handle)
- **Artifact Types**:
  - Strategy Briefs (vision, priorities, strategic direction)
  - Policies & Governance Rules (escalation thresholds, quality bars, safety rules)
  - Playbooks & Templates (routing heuristics, delegation templates)
  - Pattern Diffs ("What we learned that changes how we operate")
  - Decision Records (DR) - strategic/precedent-setting only
  - Guardrails & Safety Vetoes
  - Cross-Project Standards (style, quality, architecture)

---

## ⚡ QUICK REFERENCE: WHO DECIDES WHAT

| Decision Domain                              | Final Authority                                 | Process                        |
| -------------------------------------------- | ----------------------------------------------- | ------------------------------ |
| **Is this trivial, complex, or strategic?**  | Maia (T1)                                       | Rapid classification at intake |
| **What's the project charter?**              | Sisyphus (T2)                                   | Within Giuzu's strategy        |
| **Which agents for which milestone?**        | Sisyphus (T2)                                   | Resource allocation            |
| **Definition of Done for this feature?**     | Sisyphus (T2)                                   | Within Giuzu's quality bar     |
| **Acceptable risk level for this release?**  | Giuzu (T3)                                      | Policy definition              |
| **Which agent to use for X task?**           | Maia (T1)                                       | Routing decision               |
| **Should we batch these operations?**        | Maia (T1)                                       | Operational tactic             |
| **Is our quality bar appropriate?**          | Giuzu (T3)                                      | Cross-project standard         |
| **What's our architectural standard for X?** | Giuzu (T3)                                      | Precedent-setting              |
| **Should we escalate this to Giuzu?**        | Maia (T1) or Sisyphus (T2)                      | Based on triggers              |
| **Escalation threshold too aggressive?**     | Giuzu (T3)                                      | Policy adjustment              |
| **Do we need a new governance rule?**        | Giuzu (T3)                                      | Precedent-setting              |
| **How to handle repeated failure pattern?**  | Giuzu (T3)                                      | Systemic improvement           |
| **Is this execution or plan disagreement?**  | Maia (T1) for execution, Sisyphus (T2) for plan | Authority matrix               |
| **Conflict resolution timeout?**             | Giuzu (T3)                                      | Tie-break decision             |

---

## 🛡️ ESCALATION TRIGGERS (SUMMARY)

### Maia (T1) → Sisyphus (T2) WHEN:

- User request is complex (multi-step, project work)
- > 3 dependent tasks or cross-cutting changes
- Unclear acceptance criteria ("what does done mean?")
- Multiple plausible decompositions, risk of rework
- Needs category-driven delegation beyond obvious routing

### Maia (T1) → Giuzu (T3) WHEN:

- Strategic ambiguity (trade-offs, standards, scope disputes)
- Precedent-setting decisions (new protocols, governance rules)
- Long-term architectural impact
- Risk policy decisions ("ship now vs. harden")

### Sisyphus (T2) → Giuzu (T3) WHEN:

- Architecture standards unclear or contested
- Risk policy decisions needed
- "This will set precedent" moments
- Priority conflicts across initiatives
- Repeated failure patterns across agents/skills

### Sisyphus (T2) → Maia (T1) FOR:

- All milestone implementations
- All agent coordination (after plan approved)
- Kanban board task management (to convert charters to tasks)

---

## 🎯 SUCCESS CRITERIA

The 3-Tier System is working when:

- **Zero Gridlock**: No agent disagreements last >10 minutes without resolution
- **Clear Authority**: Every decision has obvious final owner (R in matrix)
- **No Overlap**: Each tier produces only its artifact types
- **Efficient Flow**: Intake → Escalation → Plan → Execute → Review happens without friction
- **Visible Progress**: Kanban board reflects real-time state for all work
- **Resilient Execution**: Health checks prevent hangs, fallbacks minimize downtime
- **Pattern-Driven Improvement**: Giuzu learns from execution evidence to refine playbooks
- **Policy Compliance**: All tiers respect governance rules and authority boundaries

---

_This matrix is the foundation of our 3-tier leadership system. Update when authority boundaries shift._
