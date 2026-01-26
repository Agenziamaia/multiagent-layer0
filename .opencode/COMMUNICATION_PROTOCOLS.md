# 💬 COMMUNICATION PROTOCOL TEMPLATES (DR/DP/ER)

**Purpose**: Structured message formats for inter-tier communication to ensure clarity, reduce hallucination, and enable traceability.

**Generated**: 2026-01-26
**Version**: 1.0.0

---

## 📋 MESSAGE FORMAT PRINCIPLES

### Core Rules

1. **Structured Headers**: Every message has clear section headers
2. **Explicit Context**: Include all relevant context upfront
3. **Actionable Requests**: What needs to be done is unambiguous
4. **Evidence-Based**: Claims must cite files, lines, or data
5. **Time-Boxed**: Include duration expectation when requesting decisions
6. **Artifact Reference**: Link to relevant artifacts by ID/name

### Forbidden Patterns

- ❌ "It might be..." → Be specific or say unknown
- ❌ "I think we should..." → Provide option analysis
- ❌ Vague requests like "look into X" → Define scope and expected output
- ❌ Missing context → Always include project ID, milestone, artifact references
- ❌ Ambiguous handoffs → Use message mode for complete context transfer

---

## 🎨 TIER 1: MAIA → SISYPHUS (Complex Work Escalation)

### Template: Complex Work Request

**When to Use**: MAIA receives request requiring project charter

```javascript
session({
  mode: "message",
  agent: "sisyphus",
  text: `COMPLEX WORK REQUEST

  USER REQUEST: ${user_request}

  COMPLEXITY ANALYSIS:
  - Multi-step: YES (${step_count} steps identified)
  - Project work: YES/NO
  - Multiple agents: YES (${agent_count} agents needed)
  - Sequencing required: YES/NO
  - Cross-cutting: YES/NO
  - Unclear "done": YES/NO

  PLEASE CREATE PROJECT CHARTER with:
  - Project scope and objectives
  - Milestone plan (deliverables, dependencies, acceptance criteria)
  - Resource allocation (agents, skills, concurrency)
  - Risk register

  CONTEXT:
  - Strategic vision: ${strategic_vision_if_known}
  - Quality bar: ${quality_bar_if_known}
  - Risk tolerance: ${risk_tolerance_if_known}

  ONCE CHARTER APPROVED, DELEGATE BACK TO MAIA FOR EXECUTION.`,
});
```

**Expected Response**: Project Charter document

---

### Template: Execution Report Handoff

**When to Use**: MAIA completes milestone/agent work, sends to Sisyphus for acceptance

```javascript
session({
  mode: "message",
  agent: "sisyphus",
  text: `EXECUTION REPORT (ER)

  MILESTONE: ${milestone_name}
  PROJECT_ID: ${project_id}
  CHARTER_REFERENCE: project-charter-${project_id}.md

  WHAT RAN:
  - Tasks completed: ${completed_tasks}
  - Agents involved: ${agents_involved}
  - Skills loaded: ${skills_loaded}

  OUTPUTS:
  - Files created: ${files_created}
  - Files modified: ${files_modified}
  - Tests written: ${tests_written}

  FAILURES/RETRIES:
  - Tasks that failed: ${failed_tasks}
  - Retry count: ${retry_count}
  - Fallbacks used: ${fallbacks_activated}

  EVIDENCE:
  - Build status: ${build_status}
  - Test results: ${test_results}
  - Diagnostics: ${diagnostics}
  - Lint errors: ${lint_errors}

  NEXT ACTIONS:
  - ${action_1}
  - ${action_2}

  DELIVERABLES:
  ${list_of_deliverables}

  Please verify against charter acceptance criteria (milestone_plan-${plan_id}.md) and provide acceptance decision.`,
});
```

**Expected Response**: Acceptance Report (accepted/rejected/conditional)

---

## 🎨 TIER 2: SISYPHUS → MAIA (Plan Handoff)

### Template: Project Charter Handoff

**When to Use**: Sisyphus creates project charter, delegates to MAIA for execution

```javascript
session({
  mode: "message",
  agent: "maia",
  text: `PROJECT CHARTER READY

  CHARTER_ID: ${charter_id}
  PROJECT: ${project_name}
  CREATED: ${timestamp}

  PROJECT SCOPE:
  ${project_scope_summary}

  MILESTONES: ${milestone_count} milestones
  ${milestones_summary}

  RESOURCE ALLOCATION:
  ${resource_summary}

  RISK REGISTER: ${risk_count} risks identified
  ${high_level_risks}

  GOVERNANCE CONTEXT:
  - Strategic vision: ${strategic_vision}
  - Quality bar: ${quality_bar}
  - Risk tolerance: ${risk_tolerance}
  - Escalation thresholds: ${escalation_thresholds}

  PLEASE CONVERT TO KANBAN TASKS AND EXECUTE.

  Reference artifacts:
  - Full charter: .opencode/context/project-charter-${project_id}.md
  - Milestone plan: .opencode/context/milestone-plan-${plan_id}.md
  - Risk register: .opencode/context/risk-register-${project_id}.md`,
});
```

**Expected Response**: Kanban tasks created and execution started

---

### Template: Decision Record Handoff (Operational)

**When to Use**: Sisyphus makes operational decision, informs MAIA

```javascript
session({
  mode: "message",
  agent: "maia",
  text: `DECISION RECORD (OPERATIONAL)

  RECORD_ID: ${record_id}
  PROJECT: ${project_id}
  MILESTONE: ${milestone_id}

  CONTEXT:
  ${question_or_issue}

  OPTIONS CONSIDERED:
  Option A: ${option_a}
    Pros: ${pros_a}
    Cons: ${cons_a}
    Risks: ${risks_a}
  Option B: ${option_b}
    Pros: ${pros_b}
    Cons: ${cons_b}
    Risks: ${risks_b}

  DECISION: ${chosen_option}

  RATIONALE: ${reasoning}

  IMPLEMENTATION GUIDANCE:
  ${implementation_instructions}

  RISKS MITIGATED:
  ${mitigation_list}

  Reference: decision-record-${record_id}.md`,
});
```

**Expected Response**: MAIA implements decision, updates routing if needed

---

## 🎨 TIER 2: SISYPHUS → GIUZU (Governance Consultation)

### Template: Governance Decision Request

**When to Use**: Sisyphus needs governance-level guidance

```javascript
session({
  mode: "message",
  agent: "giuzu",
  text: `GOVERNANCE DECISION NEEDED

  CONTEXT:
  Project: ${project_name}
  Current Charter: project-charter-${project_id}.md
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

  TIME-BOX: ${max_duration}

  Please provide strategic direction within ${max_duration}.`,
});
```

**Expected Response**: Decision Record (DR) with strategic rationale

---

## 🎨 TIER 3: GIUZU → MAIA (Strategic Direction)

### Template: Strategic Decision Communication

**When to Use**: Giuzu makes strategic/precedent-setting decision

```javascript
session({
  mode: "message",
  agent: "maia",
  text: `STRATEGIC DECISION COMPLETE

  DECISION MADE:
  ${decision_summary}

  OPTIONS CONSIDERED:
  Option A: ${option_a}
    Pros: ${pros_a}
    Cons: ${cons_a}
    Risks: ${risks_a}
  Option B: ${option_b}
    Pros: ${pros_b}
    Cons: ${cons_b}
    Risks: ${risks_b}

  DECISION: ${chosen_option}

  RATIONALE: ${reasoning}

  POLICY/PLAYBOOK UPDATE: ${what_changes}

  RISKS IDENTIFIED:
  - ${risk_1}: Mitigation → ${strategy}
  - ${risk_2}: Mitigation → ${strategy}

  RETURN TO: ${where_execution_continues}

  Reference: decision-record-${record_id}.md`,
});
```

**Expected Response**: MAIA updates routing/playbooks, Sisyphus adjusts plan

---

### Template: Policy Update Communication

**When to Use**: Giuzu updates governance policy

```javascript
// Broadcast to all tiers
session({
  mode: "message",
  agent: "maia", // Broadcast from Giuzu
  text: `POLICY UPDATE NOTIFICATION

  POLICY TYPE: ${policy_type}
  UPDATE: ${summary_of_changes}

  PREVIOUS POLICY:
  ${previous_policy_description}

  NEW POLICY:
  ${new_policy_description}

  RATIONALE:
  ${rationale}

  IMPLEMENTATION:
  - Effective date: ${effective_date}
  - Affected agents: ${affected_agents}
  - Required training: ${training_required}
  - Rollback plan: ${rollback_plan_if_needed}

  METRICS TRACKING:
  ${success_metric}
  - Baseline: ${baseline}
  - Target: ${target}

  ALL TIERS MUST ADHERE TO THIS POLICY IMMEDIATELY.

  Reference: policy-update-${update_id}.md`,
});

// Also send to Sisyphus
session({
  mode: "message",
  agent: "sisyphus",
  text: `[SAME POLICY UPDATE NOTIFICATION]

  ${content}`,
});
```

**Expected Response**: All tiers acknowledge and implement new policy

---

## 🎨 TIER 2: SISYPHUS → MAIA (Acceptance)

### Template: Acceptance Decision

**When to Use**: Sisyphus completes acceptance verification

```javascript
session({
  mode: "message",
  agent: "maia",
  text: `MILESTONE ACCEPTANCE COMPLETE

  MILESTONE: ${milestone_name}
  PROJECT_ID: ${project_id}
  CHARTER_REFERENCE: project-charter-${project_id}.md

  DECISION: ${accepted | rejected | conditional}

  VERIFICATION:
  Milestone Reference: milestone-plan-${plan_id}.md

  Acceptance Criteria Checked:
  - ${criterion_1}: ${status} - ${evidence}
  - ${criterion_2}: ${status} - ${evidence}
  - ${criterion_3}: ${status} - ${evidence}

  ISSUES IDENTIFIED:
  - Issue 1: ${description}
    Severity: ${warning | error | critical}
    Files affected: ${file_list}
    Recommendation: ${action}
  - Issue 2: ${description}
    Severity: ${info | warning}
    Recommendation: ${action}

  ${if_accepted}:
  NEXT ACTIONS:
  - ${action_1}
  - ${action_2}

  UPDATE KANBAN STATUS TO: DONE

  ${if_rejected}:
  REJECTION RATIONALE:
  ${why_rejected}

  REQUIRED REWORK:
  - ${what_needs_fixing}

  RETURN TO AGENTS:
  - ${agent_1}: ${instruction}
  - ${agent_2}: ${instruction}

  Reference: acceptance-report-${report_id}.md`,
});
```

**Expected Response**: MAIA updates Kanban, re-issues work if rejected

---

## 🎨 TIER 3: GIUZU → SISYPHUS (Pattern Learning)

### Template: Pattern Diff Communication

**When to Use**: Giuzu identifies operational patterns needing documentation

```javascript
session({
  mode: "message",
  agent: "sisyphus",
  text: `PATTERN DIFF NOTIFICATION

  PATTERN IDENTIFIED:
  - Name: ${pattern_name}
  - Category: ${pattern_category}
  - Confidence: ${confidence_level}

  EXECUTION EVIDENCE:
  - Outcomes: ${outcomes_summary}
  - Deltas: ${deltas_summary}
  - Failures/Retries: ${failures_summary}
  - Time-to-Done: ${performance_metrics}
  - Quality Signals: ${quality_metrics}
  - Agent Confusion: ${confusion_points}

  OBSERVED CHANGE:
  - Previous State: ${previous_state}
  - Current State: ${current_state}
  - Improvement: ${specific_improvement}

  PLAYBOOK UPDATE REQUIRED:
  - Playbook Name: ${playbook_name}
  - Change Type: ${enhancement | new_rule | deprecation}
  - Description: ${update_description}
  - Effective Immediately: ${yes_no}

  POLICY UPDATE REQUIRED:
  - Policy Name: ${policy_name}
  - Change: ${policy_change}
  - Rationale: ${rationale}

  Reference: pattern-diffs.md (continuously updated)`,
});
```

**Expected Response**: Sisyphus acknowledges, uses updated patterns in future charters

---

## 🎨 TIER 1: MAIA → GIUZU (Strategic Consultation)

### Template: Strategic Consultation Request

**When to Use**: MAIA encounters strategic ambiguity

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

**Expected Response**: Decision Record (DR) with chosen option

---

## 🛡️ MESSAGE QUALITY CHECKLIST

Before sending ANY inter-tier message, verify:

```javascript
function messageQualityCheck(message) {
  const checklist = {
    has_structured_headers: message.headers.length > 0,
    has_explicit_context: message.context !== undefined,
    has_actionable_request: message.action_needed !== undefined,
    has_evidence_citations: message.evidence.length > 0,
    has_time_box: message.time_box !== undefined,
    has_artifact_reference: message.artifact_refs !== undefined,
    no_ambiguous_language:
      !message.includes("might") && !message.includes("maybe"),
    no_vague_requests: !message.includes("look into"),
  };

  const allPassed = Object.values(checklist).every((v) => v === true);

  if (!allPassed) {
    console.log("⚠️ Message quality check failed:");
    console.log(checklist.filter((v) => !v));
    return { valid: false, missing: checklist.filter((v) => !v) };
  }

  return { valid: true };
}
```

---

## 🎯 QUICK REFERENCE CARD

| From     | To       | Purpose                        | Template                         | Key Elements                                 |
| -------- | -------- | ------------------------------ | -------------------------------- | -------------------------------------------- |
| MAIA     | Sisyphus | Complex work escalation        | Complex Work Request             | User request, complexity analysis, context   |
| MAIA     | Sisyphus | Execution report handoff       | Execution Report                 | Milestone, outputs, evidence, next actions   |
| Sisyphus | MAIA     | Plan handoff                   | Project Charter Handoff          | Charter ID, milestones, resources, risks     |
| Sisyphus | MAIA     | Decision handoff (operational) | Decision Record (Operational)    | Context, options, decision, rationale        |
| Sisyphus | Giuzu    | Governance consultation        | Governance Decision Request      | Decision type, options, time-box             |
| Giuzu    | MAIA     | Strategic decision             | Strategic Decision Communication | Decision summary, rationale, policy updates  |
| Giuzu    | MAIA     | Policy update                  | Policy Update Notification       | Old policy, new policy, implementation       |
| Giuzu    | Sisyphus | Pattern learning               | Pattern Diff Notification        | Evidence, patterns, playbook updates         |
| Sisyphus | MAIA     | Acceptance decision            | Acceptance Decision              | Decision, verification, issues, next actions |
| MAIA     | Giuzu    | Strategic consultation         | Strategic Consultation Request   | Situation, options, context, time-box        |

---

_These templates ensure clarity. Include all context. Be explicit. Cite evidence._
