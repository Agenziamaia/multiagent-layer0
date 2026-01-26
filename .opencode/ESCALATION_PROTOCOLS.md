# 🔄 ESCALATION PROTOCOLS & TRIGGERS

**Purpose**: Explicit escalation paths and triggers for the 3-tier leadership system.

**Generated**: 2026-01-26
**Version**: 1.0.0

---

## 📋 ESCALATION FLOW DIAGRAM

```
USER REQUEST
    ↓
[TIER 1: MAIA] - Rapid Classification
    ├─ ROUTINE → Execute directly (no escalation)
    ├─ COMPLEX → Escalate to Sisyphus (T2)
    └─ STRATEGIC → Consult Giuzu (T3)
    ↓
[TIER 2: SISYPHUS] - Project Planning
    ├─ CHARTER CREATED → Delegate to Maia (T1) for execution
    ├─ STANDARDS UNCLEAR → Escalate to Giuzu (T3)
    └─ RISK DECISION NEEDED → Escalate to Giuzu (T3)
    ↓
[TIER 1: MAIA] - Plan Execution
    ├─ MILESTONES EXECUTED → Execution Report to Sisyphus (T2)
    ├─ AGENT TIMEOUT → Fallback + Retry
    └─ TASK FAILURE → Escalate to Sisyphus (T2) or Giuzu (T3)
    ↓
[TIER 2: SISYPHUS] - Acceptance
    ├─ ACCEPTED → Maia (T1) updates Kanban to DONE
    └─ REJECTED → Return to Maia (T1) with feedback
    ↓
[TIER 3: GIUZU] - Strategic Direction
    ├─ DECISION MADE → Communicate to Sisyphus (T2)
    ├─ POLICY UPDATED → Communicate to all tiers
    └─ PATTERN LEARNED → Update playbooks
```

---

## 🎯 DETAILED ESCALATION TRIGGERS

### 1. MAIA (T1) → SISYPHUS (T2)

**Trigger**: MAIA receives complex user request

**Complexity Indicators** (ANY one = ESCALATE):

| Indicator                         | Example                                                        | Threshold  |
| --------------------------------- | -------------------------------------------------------------- | ---------- |
| **Multi-step task**               | "Build authentication system with JWT, database, and React UI" | ≥3 steps   |
| **Project work**                  | "Create new product" vs "Fix bug"                              | Always     |
| **Multiple agents involved**      | "Have coder build API, ops deploy it, researcher document it"  | ≥2 agents  |
| **Sequencing required**           | "When researcher done, have coder implement"                   | Always     |
| **Cross-cutting changes**         | "Update all services to use new authentication"                | ≥2 modules |
| **Unclear "done"**                | "What does success look like here?"                            | Always     |
| **Multiple plausible approaches** | "Should we use monolith or microservices?"                     | Always     |

**Maia Action When Triggered**:

```javascript
session({
  mode: "message",
  agent: "sisyphus",
  text: `COMPLEX WORK REQUEST

  USER REQUEST: ${user_request}

  COMPLEXITY ANALYSIS:
  - Multi-step: YES (X steps identified)
  - Project work: YES/NO
  - Multiple agents: YES (X agents needed)
  - Sequencing required: YES/NO
  - Cross-cutting: YES/NO

  PLEASE CREATE PROJECT CHARTER with:
  - Project scope and objectives
  - Milestone plan (deliverables, dependencies, acceptance criteria)
  - Resource allocation (agents, skills, concurrency)
  - Risk register

  Once charter is approved, provide to MAIA for execution.`,
});
```

**Expected Response from Sisyphus**:

- Project Charter document
- Milestone Plan (all milestones with dependencies)
- Resource Allocation (which agents/skills for each milestone)

---

### 2. MAIA (T1) → GIUZU (T3)

**Trigger**: MAIA identifies strategic ambiguity or precedent-setting need

**Strategic Indicators** (ANY one = CONSULT):

| Indicator                            | Example                                           | Threshold |
| ------------------------------------ | ------------------------------------------------- | --------- |
| **Trade-offs unclear**               | "Prioritize speed vs. quality vs. cost?"          | Always    |
| **Standards disputed**               | "Should we use TypeScript or Python here?"        | Always    |
| **Precedent-setting**                | "This workflow will apply to all future projects" | Always    |
| **Long-term architectural decision** | "Should we migrate from REST to GraphQL?"         | Always    |
| **Vision/priority conflict**         | "Is this more important than feature X?"          | Always    |
| **Cross-project impact**             | "This change will affect 3 other projects"        | Always    |
| **Regulatory/compliance question**   | "Is this GDPR compliant?"                         | Always    |

**Maia Action When Triggered**:

```javascript
session({
  mode: "message",
  agent: "giuzu",
  text: `STRATEGIC CONSULTATION REQUEST

  SITUATION: ${situation_description}

  OPTIONS CONSIDERED:
  Option A: ${option_a}
    Pros: ${pros_a}
    Cons: ${cons_a}
    Risks: ${risks_a}
  Option B: ${option_b}
    Pros: ${pros_b}
    Cons: ${cons_b}
    Risks: ${risks_b}

  CURRENT CONTEXT:
  - Governance policies: ${current_policies}
  - Strategic vision: ${strategic_vision_if_known}
  - Risk tolerance: ${risk_tolerance_if_known}

  Please provide strategic direction (time-boxed ≤10 minutes equivalent).`,
});
```

**Expected Response from Giuzu**:

- Decision Record (DR) with chosen option
- Rationale for decision
- Policy/Playbook updates (if precedent-setting)
- Clear direction on how to proceed

---

### 3. SISYPHUS (T2) → GIUZU (T3)

**Trigger**: Sisyphus needs governance-level guidance

**Governance Indicators** (ANY one = ESCALATE):

| Indicator                          | Example                                                      | Threshold |
| ---------------------------------- | ------------------------------------------------------------ | --------- |
| **Architecture standards unclear** | "No established pattern for this type of service"            | Always    |
| **New tech stack decision**        | "Should we adopt Rust or Go for performance-critical paths?" | Always    |
| **Risk policy decision**           | "Ship this vulnerability now or delay release for fix?"      | Always    |
| **Precedent-setting moment**       | "New project management workflow for CI/CD"                  | Always    |
| **Governance rule needed**         | "When should we require code review for all changes?"        | Always    |
| **Quality bar adjustment**         | "Should we raise security testing requirement to critical?"  | Always    |

**Sisyphus Action When Triggered**:

```javascript
session({
  mode: "message",
  agent: "giuzu",
  text: `GOVERNANCE DECISION NEEDED

  CONTEXT:
  Project: ${project_name}
  Current Charter: ${charter_reference}
  Milestone: ${current_milestone}

  DECISION REQUIRED:
  ${decision_type}

  CURRENT SITUATION:
  ${current_situation_description}

  OPTIONS IDENTIFIED:
  Option A: ${option_a}
    Trade-offs: ${trade_offs_a}
    Long-term impact: ${long_term_impact_a}
  Option B: ${option_b}
    Trade-offs: ${trade_offs_b}
    Long-term impact: ${long_term_impact_b}

  RECOMMENDATION:
  ${sisyphus_recommendation}

  Please provide governance direction (time-boxed ≤10 minutes equivalent).`,
});
```

**Expected Response from Giuzu**:

- Policy/Playbook update (If precedent-setting)
- Decision Record (DR) with governance rationale
- Clear direction on risk tolerance and standards

---

### 4. MAIA (T1) → SISYPHUS (T2) [EXECUTION HANDOFF]

**Trigger**: MAIA completes work and needs acceptance

**Handoff Indicators**:

- Milestone deliverables complete
- Implementation tasks done
- Agent work finished
- Execution Report generated

**Maia Action**:

```javascript
session({
  mode: "message",
  agent: "sisyphus",
  text: `EXECUTION COMPLETE

  MILESTONE: ${milestone_name}
  PROJECT_ID: ${project_id}

  EXECUTION REPORT (ER):
  ${execution_report_summary}

  DELIVERABLES:
  ${list_of_deliverables}

  Please verify against charter acceptance criteria and provide acceptance decision.`,
});
```

**Expected Response from Sisyphus**:

- Acceptance Report (accepted/rejected/conditional)
- Verified criteria (what passed, what failed)
- Issues identified (if any)
- Next actions (what to do next)

---

## ⚠️ ESCALATION THRESHOLDS

### 1. Automatic Escalation Thresholds

| Scenario                          | Threshold                        | Escalation Action         |
| --------------------------------- | -------------------------------- | ------------------------- |
| **Complex request with ≥5 steps** | MAIA → Sisyphus                  | Automatic                 |
| **Unclear "done" criteria**       | MAIA → Sisyphus                  | Automatic                 |
| **Trade-offs unresolved**         | MAIA → Giuzu                     | After 2 message exchanges |
| **Strategic decision needed**     | MAIA → Giuzu                     | Immediate                 |
| **Architecture standard unclear** | Sisyphus → Giuzu                 | After plan review         |
| **Risk exceeds tolerance**        | Sisyphus → Giuzu                 | Before proceeding         |
| **Precedent-setting**             | Sisyphus → Giuzu or MAIA → Giuzu | Depends on tier           |
| **Repeated failure pattern**      | Any tier → Giuzu                 | After 3+ occurrences      |

### 2. Time-Boxing Rules

| Escalation Type                      | Max Duration                     | If Not Resolved                |
| ------------------------------------ | -------------------------------- | ------------------------------ |
| **MAIA → Sisyphus** (classification) | 30 seconds                       | Proceed with best guess        |
| **MAIA → Giuzu** (strategic)         | 10 minutes (2 message exchanges) | Proceed with best guess        |
| **SISYPHUS → Giuzu** (governance)    | 10 minutes (2 message exchanges) | Proceed with best guess        |
| **MAIA ↔ Sisyphus** (conflict)       | 10 minutes (2 message exchanges) | Escalate to Giuzu              |
| **Any → Giuzu** (exception review)   | 15 minutes (3 message exchanges) | Continue with current approach |

---

## 🔄 ESCALATION PROTOCOLS

### Protocol 1: Pre-Escalation Checklist

**Before escalating, check**:

```javascript
function preEscalationCheck(escalation_type) {
  const checklist = {
    classification_verified: "Have I verified this matches escalation type?",
    threshold_met: "Have threshold conditions been met?",
    alternative_tried: "Have I tried all reasonable alternatives?",
    context_provided: "Have I included full context for receiving tier?",
    time_boxed: "Is this within time-boxed duration?",
    authority_boundaries: "Is this within my authority to escalate?",
  };

  const allPassed = Object.values(checklist).every((v) => v === true);

  if (!allPassed) {
    console.log("⚠️ Escalation prerequisites not met. Reviewing...");
    return { proceed: false, missing: checklist.filter((v) => !v) };
  }

  return { proceed: true };
}
```

### Protocol 2: Escalation Message Format

**Required Elements**:

1. **Situation Context** (What triggered escalation?)
2. **Current Status** (What have we tried?)
3. **Options Considered** (What alternatives exist?)
4. **Recommendation** (What do we suggest?)
5. **Decision Needed** (What's the question for the receiving tier?)
6. **Time-Box Declaration** (Max duration for decision)

**Template**:

```javascript
`ESCALATION: ${escalation_type}

  CONTEXT:
  - Triggered by: ${what_happened}
  - Threshold met: ${which_threshold}
  - Current status: ${where_we_are}
  - Attempts made: ${what_tried}

  OPTIONS:
  Option A: ${description}
    Pros: ${pros}
    Cons: ${cons}
    Risks: ${risks}

  RECOMMENDATION:
  ${recommended_option}

  DECISION NEEDED:
  ${question_for_receiving_tier}

  TIME-BOX: ${max_duration}

  Please respond within ${max_duration}.`;
```

### Protocol 3: Post-Escalation Follow-up

**After receiving escalation response**:

```javascript
// Record outcome
function recordEscalationOutcome(escalation_id, outcome) {
  const record = {
    escalation_id,
    escalation_type,
    from_tier,
    to_tier,
    timestamp: new Date().toISOString(),
    time_to_resolve: duration_seconds,
    decision: outcome.decision,
    rationale: outcome.rationale,
    followed: outcome.followed || false,
    next_actions: outcome.next_actions,
  };

  // Store for learning
  saveToGovernanceLog(record);

  // If precedent-setting, inform Giuzu
  if (isPrecedentSetting(outcome)) {
    session({
      mode: "message",
      agent: "giuzu",
      text: `ESCALATION OUTCOME RECORDED

${JSON.stringify(record, null, 2)}

  This establishes precedent. Please update playbooks accordingly.`,
    });
  }
}
```

---

## 🛡️ REPEATED FAILURE PROTOCOL

### Trigger Pattern Detection

**When to declare "Repeated Failure Pattern"**:

| Pattern                                 | Occurrence Threshold | Escalation Action |
| --------------------------------------- | -------------------- | ----------------- |
| **Same agent fails 3+ times**           | 3 consecutive        | Any tier → Giuzu  |
| **Same skill missing 3+ times**         | 3 consecutive        | Any tier → Giuzu  |
| **Escalation loop (>3 back-and-forth)** | 3 cycles             | Any tier → Giuzu  |
| **Same architecture issue recurs**      | 3 projects           | Sisyphus → Giuzu  |
| **Workflow fails 2+ times**             | 2 attempts           | MAIA → Giuzu      |

**Exception Review Workflow**:

```javascript
// Giuzu reviews repeated failures
session({
  mode: "message",
  agent: "giuzu",
  text: `REPEATED FAILURE PATTERN DETECTED

  PATTERN:
  - Type: ${pattern_type}
  - Occurrences: ${count}
  - Affected Tiers: ${tiers}
  - Affected Agents: ${agents}
  - Affected Skills: ${skills}

  ROOT CAUSE ANALYSIS:
  - Primary: ${root_cause_primary}
  - Secondary: ${root_cause_secondary}
  - Systemic?: ${is_systemic}

  RESOLUTION STRATEGY:
  ${resolution_plan}

  PLAYBOOK UPDATE REQUIRED: ${yes / no}
  POLICY UPDATE REQUIRED: ${yes / no}

  RECOMMENDATION:
  ${action_to_take}
  `,
});
```

---

## 🎯 SUCCESS METRICS

Track these to ensure escalation system is effective:

| Metric                            | Target     | Current                                                | Action Needed |
| --------------------------------- | ---------- | ------------------------------------------------------ | ------------- |
| **Escalation resolution time**    | <5 minutes | Average time to resolve escalations                    |
| **Escalation loop rate**          | <5%        | Percentage of escalations that cycle                   |
| **Incorrect classification rate** | <10%       | Percentage of escalations that shouldn't have happened |
| **Time-box adherence**            | >90%       | Percentage of escalations resolved within time-box     |
| **Follow-up rate**                | 100%       | Percentage of decisions that are actually followed     |

---

## 🚀 QUICK REFERENCE CARD

| Scenario                              | Who Escalates to Whom | Trigger                   | Format |
| ------------------------------------- | --------------------- | ------------------------- | ------ |
| MAIA can't classify quickly           | MAIA → Sisyphus       | ≥3 steps or project work  |
| MAIA sees strategic ambiguity         | MAIA → Giuzu          | Precedent-setting needed  |
| Sisyphus can't plan without standards | Sisyphus → Giuzu      | Architecture unclear      |
| MAIA and Sisyphus disagree            | Escalate to Giuzu     | After 2 message exchanges |
| Agent fails 3+ times                  | Any → Giuzu           | Repeated failure pattern  |
| Same issue recurs 3+ projects         | Sisyphus → Giuzu      | Systemic pattern          |

---

_These protocols prevent gridlock. Escalate proactively. Resolve within time-boxes._
