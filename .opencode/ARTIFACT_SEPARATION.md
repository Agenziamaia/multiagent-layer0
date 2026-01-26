# 🎨 ARTIFACT SEPARATION (Strategy/Plan/Execution)

**Purpose**: Non-overlap principle - each tier produces specific artifact types to prevent conflict and confusion.

**Generated**: 2026-01-26
**Version**: 1.0.0

---

## 📋 CORE PRINCIPLE

### Artifact Separation (Non-Overlap)

**Rule**: Each tier produces ONLY its designated artifact types. Never produce another tier's artifacts.

**Why This Matters**:

- **Prevents Conflict**: No tier steps on another's authority
- **Clear Ownership**: Who owns which output is unambiguous
- **Efficient Flow**: Artifacts flow through tiers without rework
- **Traceability**: Every decision has clear origin

**Violation Detection**:

```javascript
function detectArtifactViolation(producing_tier, artifact_type) {
  const tierArtifactMap = {
    maia: [
      "task_graph",
      "delegation_packet",
      "execution_report",
      "board_state_update",
    ],
    sisyphus: [
      "project_charter",
      "milestone_plan",
      "decision_record",
      "risk_register",
      "acceptance_report",
    ],
    giuzu: [
      "strategy_brief",
      "policy_update",
      "playbook_update",
      "pattern_diff",
      "decision_record_strategic",
    ],
  };

  const allowed = tierArtifactMap[producing_tier];
  const isViolation = !allowed.includes(artifact_type);

  if (isViolation) {
    console.log(
      `❌ VIOLATION: ${producing_tier} produced ${artifact_type} (belongs to another tier)`,
    );
  }

  return { isViolation, allowedArtifacts: allowed };
}
```

---

## 🎨 TIER 1: MAIA (Execution Artifacts)

### Artifact Types Produced

**1. Task Graph**

```javascript
const taskGraph = {
  graph_id: generateId(),
  project_id: project_id,
  created_at: new Date().toISOString(),

  nodes: [
    {
      task_id: "t1",
      type: "milestone" | "feature" | "bugfix",
      title: "Implement JWT authentication",
      status: "todo" | "in_progress" | "in_review" | "done",
      assigned_agent: "coder",
      required_skills: ["api-service", "git-master"],
      dependencies: ["t2"], // depends on other tasks
    },
    // ... more nodes
  ],

  edges: [
    {
      from_task: "t2", // task_id
      to_task: "t1", // task_id
      type: "sequential" | "parallel",
    },
    // ... more edges
  ],
};
```

**Purpose**: Visual representation of task dependencies and execution flow.

**When Produced**:

- When converting Sisyphus Milestone Plans to Kanban tasks
- When planning parallel execution
- When tracking task status across agents

**Consumers**:

- Maia (internal tracking)
- Sisyphus (to see if tasks are being executed)

---

**2. Delegation Packet (DP)**

```javascript
const delegationPacket = {
  packet_id: generateId(),
  source_tier: "maia", // who created it
  created_at: new Date().toISOString(),

  // Objective
  objective: "Implement authentication system with JWT and React UI",

  // Constraints
  constraints: {
    deadline: "2026-02-15T00:00:00Z",
    budget: "40 agent-hours",
    quality_bar: "Security Level 2 required",
    risk_tolerance: "Medium",
  },

  // Required Skills
  required_skills: [
    "frontend-ui-ux",
    "playwright",
    "api-service",
    "git-master",
  ],

  // Tasks (derived from milestone)
  tasks: [
    {
      id: "t1",
      title: "Research JWT patterns",
      agent: "researcher",
      skills: ["librarian"],
      priority: "high",
    },
    {
      id: "t2",
      title: "Implement auth API",
      agent: "coder",
      skills: ["api-service", "git-master"],
      dependencies: ["t1"],
    },
    {
      id: "t3",
      title: "Build React auth UI",
      agent: "coder",
      skills: ["frontend-ui-ux", "playwright"],
      dependencies: ["t2"],
    },
  ],

  // Acceptance Criteria
  acceptance_criteria: [
    "JWT implemented with rotating refresh tokens",
    "React UI passes accessibility tests (WCAG AA)",
    "API has 95%+ test coverage",
    "Security audit passes Level 2 check",
  ],
};
```

**Purpose**: Complete specification for agents to execute without reinterpretation.

**When Produced**:

- When delegating to agents after receiving Sisyphus plan
- When creating Kanban tasks for agents
- When handoff to next agent (message mode)

**Consumers**:

- All agents receiving delegation
- Sisyphus (to see what was issued)

---

**3. Execution Report (ER)**

```javascript
const executionReport = {
  report_id: generateId(),
  source_tier: "maia",
  project_id: project_id,
  milestone_id: "m1",
  completed_at: new Date().toISOString(),

  // What Ran
  what_ran: {
    tasks_completed: ["t1", "t2", "t3"],
    agents_involved: ["coder", "ops", "researcher"],
    skills_loaded: [
      "frontend-ui-ux",
      "playwright",
      "api-service",
      "git-master",
    ],
    duration_seconds: 2847, // total execution time
  },

  // Outputs
  outputs: {
    files_created: [
      "/src/auth/jwt-handler.ts",
      "/src/components/LoginForm.tsx",
    ],
    files_modified: ["/src/api/routes.ts", "/package.json"],
    tests_written: [
      "/src/auth/__tests__/jwt.test.ts",
      "/src/components/__tests__/LoginForm.test.tsx",
    ],
  },

  // Failures/Retries
  failures_retries: {
    tasks_that_failed: [],
    retry_count: 0,
    fallbacks_activated: [],
  },

  // Evidence
  evidence: {
    build_status: "PASS", // or "FAIL"
    test_results: {
      total: 17,
      passed: 16,
      failed: 1,
      coverage: "94%",
    },
    diagnostics: "CLEAN", // or "ISSUES_FOUND"
    lint_errors: 0,
    type_errors: 0,
  },

  // Next Actions
  next_actions: [
    "Sisyphus acceptance required",
    "Fix failing test in LoginForm.test.tsx",
    "Update Kanban status to IN REVIEW",
  ],
};
```

**Purpose**: Complete status of work execution for acceptance and learning.

**When Produced**:

- When milestone/agent work completes
- When errors occur during execution
- After retry cycles

**Consumers**:

- Sisyphus (acceptance verification)
- Giuzu (learning from outcomes)
- Kanban board (status update)

---

**4. Board State Update**

```javascript
const boardStateUpdate = {
  update_id: generateId(),
  source_tier: "maia",
  project_id: project_id,
  timestamp: new Date().toISOString(),

  updates: [
    {
      task_id: "t1",
      from_status: "todo",
      to_status: "in_progress",
      reason: "Coder started work",
    },
    {
      task_id: "t2",
      from_status: "in_progress",
      to_status: "in_review",
      reason: "Deliverables complete, awaiting Sisyphus acceptance",
    },
    {
      task_id: "t3",
      from_status: "in_review",
      to_status: "done",
      reason: "Sisyphus accepted, moving to done",
    },
  ],
};
```

**Purpose**: Track real-time progress on Kanban board.

**When Produced**:

- Every task status change
- After agent completes work
- After acceptance

**Consumers**:

- Kanban board (visual display)
- All tiers (transparency into work status)

---

## 🎨 TIER 2: SISYPHUS (Program Artifacts)

### Artifact Types Produced

**1. Project Charter**

```javascript
const projectCharter = {
  charter_id: generateId(),
  created_at: new Date().toISOString(),
  source_tier: "sisyphus",
  strategic_vision: "Giuzu's strategic direction (if provided)",

  // Project Scope
  project_scope: {
    title: "Authentication System Implementation",
    objectives: [
      "Implement secure JWT-based authentication",
      "Build accessible React login/register UI",
      "Deploy with zero-downtime migration path",
    ],
    non_objectives: ["Payment processing", "User profile management (phase 2)"],
    success_criteria: [
      "JWT auth API with 95%+ test coverage",
      "React UI passes WCAG AA accessibility",
      "Deployment completes with <30 min downtime",
    ],
    constraints: {
      deadline: "2026-02-28T23:59:59Z",
      budget: "60 agent-hours",
      tech_stack: "TypeScript, React, Node.js, PostgreSQL",
      risk_tolerance: "Medium",
    },
  },

  // Governance Context
  governance_context: {
    strategic_vision:
      "Prioritize security over speed, maintainability over brevity",
    quality_bar: "Security Level 2, 90%+ test coverage, WCAG AA",
    escalation_thresholds: "Escalate to Giuzu if >3 agent failures",
    stop_the_line_veto: "Security vulnerabilities trigger immediate stop",
  },

  // Milestones
  milestones: [
    {
      id: "m1",
      name: "Architecture & Research",
      deliverables: [
        "JWT implementation pattern selected",
        "Database schema designed",
        "API endpoints documented",
      ],
      acceptance_criteria: [
        "Pattern documented with trade-off analysis",
        "Schema normalizes to 3NF",
        "API docs include error handling examples",
      ],
      dependencies: [],
      estimated_duration: "2 days",
      sequence: 1,
    },
    {
      id: "m2",
      name: "Implement Auth API",
      deliverables: [
        "JWT token generation/validation",
        "Refresh token rotation",
        "User endpoints (login, register, logout)",
      ],
      acceptance_criteria: [
        "95%+ test coverage",
        "Security audit passes",
        "API docs complete",
      ],
      dependencies: ["m1"],
      estimated_duration: "3 days",
      sequence: 2,
    },
    // ... more milestones
  ],

  // Resource Allocation
  resource_allocation: [
    {
      milestone_id: "m1",
      required_agents: ["researcher", "ops"],
      required_skills: ["librarian", "api-service"],
      concurrency: "parallel",
    },
    {
      milestone_id: "m2",
      required_agents: ["coder", "ops"],
      required_skills: ["api-service", "git-master"],
      concurrency: "parallel",
    },
    // ... more allocations
  ],

  // Risks
  risks: [
    {
      id: "r1",
      description: "JWT secret泄露 could compromise all sessions",
      probability: "low",
      impact: "critical",
      mitigation_strategy: "Use environment variables, rotate every 30 days",
      owner: "ops",
      trigger: "Review in weekly security audit",
    },
    {
      id: "r2",
      description: "React UI may have accessibility issues",
      probability: "medium",
      impact: "high",
      mitigation_strategy:
        "Use axe devtools during development, test with screen reader",
      owner: "coder",
      trigger: "WCAG AA test failure",
    },
    // ... more risks
  ],
};
```

**Purpose**: Complete project definition with scope, milestones, resources, and risks.

**When Produced**:

- When MAIA escalates complex work
- When starting new project
- When planning major feature

**Consumers**:

- Maia (converts to Kanban tasks)
- All agents (resource allocation)
- Giuzu (strategic alignment check)

---

**2. Milestone Plan**

```javascript
const milestonePlan = {
  plan_id: generateId(),
  project_id: project_id,
  created_at: new Date().toISOString(),

  milestones: [
    {
      id: "m1",
      name: "Architecture & Research",
      deliverables: [/* as defined in charter */],
      acceptance_criteria: [/* as defined in charter */],
      dependencies: [],
      estimated_duration: "2 days",
      sequence: 1,

      // Sisyphus-specific
      phase: "Phase 1",
      category: "ultrabrain" | "visual-engineering" | "quick" | "unspecified-high"
      required_skills: ["librarian", "api-service"]
    },
    {
      id: "m2",
      name: "Implement Auth API",
      deliverables: [/* as defined in charter */],
      acceptance_criteria: [/* as defined in charter */],
      dependencies: ["m1"],
      estimated_duration: "3 days",
      sequence: 2,

      phase: "Phase 2",
      category: "unspecified-high",
      required_skills: ["api-service", "git-master", "test-writing"]
    }
    // ... more milestones
  ],

  // Sequencing
  critical_path: calculateCriticalPath(milestones),

  // Resource Summary
  resource_summary: {
    total_estimated_hours: 120,
    peak_concurrency: 3,
    most_used_skill: "api-service",
    most_used_agent: "coder"
  }
};
```

**Purpose**: Detailed execution plan with sequencing and resource requirements.

**When Produced**:

- After project charter created
- When refining plan based on feedback

**Consumers**:

- Maia (converts to Delegation Packets)
- Agents (receive work specifications)

---

**3. Decision Record (DR) - Operational**

```javascript
const decisionRecord = {
  record_id: generateId(),
  source_tier: "sisyphus",
  created_at: new Date().toISOString(),
  decision_type: "operational", // vs "strategic" for Giuzu

  // Context
  context: {
    project_id: project_id,
    milestone_id: "m2",
    question_or_issue: "Should we use jose or jsonwebtoken library?",
  },

  // Options Considered
  options: [
    {
      option_id: "A",
      description: "Use jose library",
      pros: [
        "Modern, TypeScript-first API",
        "Active maintenance",
        "Built-in JWK support",
      ],
      cons: [
        "Smaller community vs jsonwebtoken",
        "Learning curve for team unfamiliar",
      ],
      risks: ["Dependency update frequency", "Breaking changes possible"],
    },
    {
      option_id: "B",
      description: "Use jsonwebtoken library",
      pros: [
        "Largest community",
        "Well-documented",
        "Battle-tested in production",
      ],
      cons: [
        "Callback-based API (older style)",
        "TypeScript support via @types",
        "Less active maintenance",
      ],
      risks: ["Security vulnerabilities (need updates)", "Older patterns"],
    },
  ],

  // Decision
  decision: {
    chosen_option: "A", // "A" or "B"
    rationale:
      "Modern TypeScript-first API with active maintenance outweighs smaller community",
    confidence: "high",
  },

  // Implementation Guidance
  implementation: {
    library: "jose",
    version_constraint: "^5.0.0",
    key_requirements: "Use ES256 for signing, RS256 for verification",
  },

  // Risks Mitigated
  risks_mitigated: [
    "Library freshness risk - mitigated by choosing actively maintained jose",
    "Community support risk - mitigated by thorough research phase",
  ],
};
```

**Purpose**: Document operational decisions within project context.

**When Produced**:

- When architectural choice needs to be made
- When choosing between implementation approaches
- When resolving ambiguous requirements

**Consumers**:

- Maia (implements decision)
- Future reference (why we chose X)
- Giuzu (learns patterns)

---

**4. Risk Register**

```javascript
const riskRegister = {
  register_id: generateId(),
  project_id: project_id,
  created_at: new Date().toISOString(),

  risks: [
    {
      id: "r1",
      title: "JWT secret泄露",
      category: "security",
      description: "Environment variable compromise could expose signing keys",
      probability: "low",
      impact: "critical",
      likelihood_score: 0.2, // probability * impact
      owner: "ops",
      mitigation_strategy: "Use environment variables, rotate every 30 days, enable audit logging",
      trigger_condition: "If rotation missed by 7 days",
      status: "open" | "mitigating" | "closed" | "materialized"
      created_at: new Date().toISOString(),
      last_reviewed: new Date().toISOString()
    },
    {
      id: "r2",
      title: "React UI accessibility issues",
      category: "quality",
      description: "WCAG AA violations in login form",
      probability: "medium",
      impact: "high",
      likelihood_score: 0.6,
      owner: "coder",
      mitigation_strategy: "Use axe devtools during development, test with screen reader, run automated a11y tests",
      trigger_condition: "WCAG AA test failure",
      status: "open",
      created_at: new Date().toISOString()
    }
    // ... more risks
  ],

  // Summary
  summary: {
    total_risks: 8,
    open_risks: 6,
    critical_risks: 1,
    high_risks: 2,
    medium_risks: 4,
    low_risks: 1,
    average_likelihood: 0.45
  }
};
```

**Purpose**: Track, monitor, and mitigate project risks.

**When Produced**:

- With project charter (initial risk identification)
- As risks materialize during execution
- After postmortem (lessons learned)

**Consumers**:

- Maia (triggers mitigations when conditions met)
- Sisyphus (monitors and escalates if risks exceed tolerance)
- Giuzu (learns risk patterns for governance)

---

**5. Acceptance Report**

```javascript
const acceptanceReport = {
  report_id: generateId(),
  source_tier: "sisyphus",
  project_id: project_id,
  milestone_id: "m2",
  completed_at: new Date().toISOString(),

  // Decision
  decision: "accepted" | "rejected" | "conditional",

  // Verification
  verification: {
    milestone_reference: project_charter.milestones.find((m) => m.id === "m2"),
    acceptance_criteria_checked: [
      {
        criterion: "95%+ test coverage",
        status: "passed",
        evidence: "Istanbul report shows 96% coverage",
        verified_by: "sisyphus",
      },
      {
        criterion: "Security audit passes",
        status: "passed",
        evidence: "Snyk scan found 0 critical vulnerabilities",
        verified_by: "sisyphus",
      },
    ],
  },

  // Issues Identified
  issues: [
    {
      severity: "warning",
      description: "2 edge cases not covered in tests",
      files_affected: ["/src/auth/jwt-handler.ts"],
      recommendation: "Add test cases for token refresh scenarios",
    },
    {
      severity: "info",
      description: "Documentation could include more examples",
      files_affected: ["/README.md"],
      recommendation: "Add usage examples for error handling",
    },
    // ... more issues
  ],

  // Next Actions
  next_actions: [
    {
      action: "Fix edge case tests",
      assigned_to: "coder",
      priority: "medium",
      deadline: "2026-01-30T17:00:00Z",
    },
    {
      action: "Update documentation with examples",
      assigned_to: "coder",
      priority: "low",
      deadline: "2026-02-05T17:00:00Z",
    },
  ],
};
```

**Purpose**: Formal acceptance or rejection of milestone deliverables.

**When Produced**:

- After reviewing MAIA's Execution Report
- After verifying deliverables against charter

**Consumers**:

- Maia (updates Kanban to DONE or sends back to agents)
- Kanban board (status change)

---

## 🎨 TIER 3: GIUZU (Governance Artifacts)

### Artifact Types Produced

**1. Strategy Brief**

```javascript
const strategyBrief = {
  brief_id: generateId(),
  created_at: new Date().toISOString(),
  source_tier: "giuzu",

  // Strategic Direction
  vision: {
    statement:
      "Prioritize security and maintainability over speed for authentication systems",
    timeframe: "2026 Q1-Q4",
    success_definition: "Zero security incidents, 95%+ maintainability score",
  },

  // Priorities
  priorities: [
    {
      id: "p1",
      name: "Security First",
      description:
        "All authentication systems must meet Level 2 security requirements",
      weight: "critical",
    },
    {
      id: "p2",
      name: "Maintainability",
      description:
        "Code must be self-documenting, testable, and follow patterns",
      weight: "high",
    },
    // ... more priorities
  ],

  // Risk Policy
  risk_policy: {
    acceptable_risk_levels: {
      security: "Level 2 required, Level 1 preferred",
      performance: "20% degradation acceptable, 50% unacceptable",
      timeline: "2-week slip acceptable, 1-month slip unacceptable",
    },
    escalation_thresholds: {
      immediate_stop: ["Critical security vulnerabilities", "Data breaches"],
      require_giuzu_consult: [
        "Precedent-setting",
        "Architecture standard changes",
      ],
      auto_retry: ["Single agent failure", "Minor test failures"],
    },
  },
};
```

**Purpose**: Clear strategic direction for all projects and decisions.

**When Produced**:

- Pre-flight strategic consultation (precedent-setting)
- Quarterly strategic review
- Governance policy updates

**Consumers**:

- Sisyphus (aligns project charters with strategy)
- Maia (respects quality bars and standards)
- All agents (follows governance rules)

---

**2. Policy Update**

```javascript
const policyUpdate = {
  update_id: generateId(),
  source_tier: "giuzu",
  created_at: new Date().toISOString(),
  policy_type: "escalation_thresholds" | "quality_bar" | "safety_rules",

  // What's Changing
  changes: {
    previous_policy: "Escalate to Giuzu after 3 agent failures",
    new_policy: "Escalate to Giuzu after 2 agent failures",
    rationale:
      "Observed 92% resolution rate within 2 attempts. Reducing threshold prevents unnecessary delays.",
    impact: "Faster escalation to Giuzu, less wait time for critical decisions",
  },

  // Implementation
  implementation: {
    effective_date: "2026-02-01T00:00:00Z",
    affected_agents: ["maia", "sisyphus"],
    required_training: "Update escalation protocols in agent profiles",
    rollback_plan:
      "If new threshold causes too many escalations, revert to 3 attempts",
  },

  // Metrics Tracking
  metrics: {
    success_metric: "Escalation resolution time <5 minutes",
    baseline: "Average: 8 minutes (before update)",
    target: "Average: 4 minutes (after update)",
  },
};
```

**Purpose**: Formal update to governance rules and thresholds.

**When Produced**:

- After observing repeated patterns requiring adjustment
- After postmortem identifies policy gap
- Quarterly governance review

**Consumers**:

- All tiers (must follow updated policy)
- Kanban board (triggers for escalations)

---

**3. Playbook Update**

```javascript
const playbookUpdate = {
  update_id: generateId(),
  source_tier: "giuzu",
  created_at: new Date().toISOString(),
  playbook_name: "routing_heuristics",

  // What's Updating
  changes: {
    playbook_type: "routing" | "delegation" | "quality_check",
    previous_version: "1.2",
    new_version: "1.3",
    added_rules: [
      "Add category 'writing' for documentation tasks",
      "Require load_skills: ['doc-coauthoring', 'internal-comms'] for writing category",
    ],
    deprecated_rules: [
      "Remove heuristic for detecting documentation requests (use explicit classification)",
    ],
  },

  // Rationale
  rationale: {
    evidence_summary:
      "12/15 documentation tasks incorrectly routed to 'quick' category",
    pattern_detected: "Users say 'Write docs for X' consistently",
    confidence: "high",
  },

  // Examples
  examples: {
    before: {
      request: "Write API documentation",
      incorrect_routing: "quick category (single file edit)",
      outcome: "Docs inconsistent, missing sections",
    },
    after: {
      request: "Write API documentation",
      correct_routing: "writing category with doc-coauthoring skill",
      outcome: "Comprehensive docs with standard sections",
    },
  },
};
```

**Purpose**: Update operational playbooks based on learned patterns.

**When Produced**:

- After Giuzu identifies pattern that requires playbook adjustment
- After Sisyphus/Maia feedback indicates routing gap

**Consumers**:

- MAIA (uses updated heuristics for routing)
- Sisyphus (uses updated delegation templates)

---

**4. Pattern Diff**

```javascript
const patternDiff = {
  diff_id: generateId(),
  source_tier: "giuzu",
  created_at: new Date().toISOString(),
  epic_scope: "Authentication system implementation",

  // Execution Evidence (learned from MAIA/Sisyphus)
  execution_evidence: {
    outcomes: ["m1 completed", "m2 completed"],
    deltas: ["m1 took 3 days (estimated 2)", "m2 took 2.5 days (estimated 3)"],
    failures: [],
    retries: ["researcher timeout (1 fallback to researcher_fast)"],
    time_to_done: [2847, 4321, 3600], // seconds per milestone
    quality_signals: [
      "reviewer: 2 minor issues",
      "linter: clean",
      "tests: 16/17 passed",
    ],
    agent_confusion: ["coder unsure about error handling pattern"],
  },

  // Pattern Diffs (what changed)
  patterns: [
    {
      pattern_name: "Category routing accuracy",
      previous_state: "85% correct classification",
      current_state: "92% correct classification",
      confidence: "high",
      improvement: "Add 2 more classification heuristics to escalation rubric",
    },
    {
      pattern_name: "Documentation completeness",
      previous_state: "60% docs include examples",
      current_state: "88% docs include examples",
      confidence: "medium",
      improvement:
        "Add writing category with doc-coauthoring skill requires example section",
    },
    {
      pattern_name: "Agent success rate",
      previous_state: "Researcher: 85% availability",
      current_state: "95% availability",
      confidence: "high",
      improvement:
        "Keep researcher_fast as primary fallback, reduce timeout to 90s",
    },
    // ... up to 10 patterns
  ],

  // Playbook Updates (actionable changes)
  playbook_updates: [
    {
      playbook_name: "routing_heuristics",
      change_type: "enhancement",
      description: "Update escalation classifier to handle [X, Y, Z] patterns",
    },
    {
      playbook_name: "timeout_policies",
      change_type: "update",
      description:
        "Reduce research task timeout from 120s to 90s based on 92% completion rate",
    },
    // ... up to 5 updates
  ],

  // Policy Updates (if precedent-setting)
  policy_updates: [
    {
      policy_name: "escalation_thresholds",
      change: "Reduce to 2 agent failures before Giuzu consult",
      rationale: "Observed faster resolution with lower threshold",
    },
    // ... up to 3 updates
  ],
};
```

**Purpose**: Document what we learned and how it changes operations.

**When Produced**:

- End-of-day or per-epic synthesis
- After detecting repeated failure patterns
- Postmortem analysis completion

**Consumers**:

- MAIA (implements updated playbooks)
- Sisyphus (uses updated delegation patterns)
- All future operations (benefit from learning)

---

**5. Decision Record (DR) - Strategic**

```javascript
const decisionRecordStrategic = {
  record_id: generateId(),
  source_tier: "giuzu",
  created_at: new Date().toISOString(),
  decision_type: "strategic", // vs "operational" for Sisyphus

  // Context
  context: {
    cross_project_impact:
      "This authentication pattern will affect 3 other projects",
    precedent_level: "high",
    strategic_vision: "Prioritize security over speed",
  },

  // Options Considered
  options: [
    {
      option_id: "A",
      description: "Standardize on jose library across all projects",
      pros: [
        "Consistent tech stack",
        "Shared knowledge across teams",
        "Single security audit point",
      ],
      cons: [
        "Existing projects need migration (cost)",
        "Learning curve for teams using jsonwebtoken",
        "Migration timeline: 2-3 months",
      ],
      risks: [
        "Migration bugs in 3 projects",
        "Deployment coordination complexity",
        "Business continuity risk during migration",
      ],
    },
    {
      option_id: "B",
      description: "Allow project-specific library choice",
      pros: [
        "No migration cost",
        "Faster implementation for new projects",
        "Team autonomy preserved",
      ],
      cons: [
        "Fragmented security knowledge",
        "Duplicate audit efforts",
        "Harder to enforce standards",
      ],
      risks: [
        "Inconsistent security practices",
        "Skill gaps across teams",
        "Compliance complexity",
      ],
    },
  ],

  // Decision
  decision: {
    chosen_option: "A", // "A" or "B"
    rationale:
      "Consistent tech stack reduces long-term security risk and audit overhead. Migration cost acceptable for 3 projects over 6-month period.",
    confidence: "high",
    authority: "Giuzu Tier 3",
  },

  // Precedent Set
  precedent: {
    applies_to: "All future authentication systems",
    constraint:
      "Must use jose library unless explicit exception approved by Giuzu",
    rationale: "Decision ID DR-2026-01-26-001",
  },

  // Implementation Guidance
  implementation: {
    migration_plan:
      "Phase 1: Audit current usage (2 weeks)\nPhase 2: Training and pilot (4 weeks)\nPhase 3: Full migration (6 weeks)\nPhase 4: Decommission old library (2 weeks)",
    governance_update: "Update AGENTS.md to require jose for all auth work",
  },
};
```

**Purpose**: Document strategic/precedent-setting decisions with full rationale.

**When Produced**:

- Precedent-setting strategic consultations
- Architecture standard decisions
- Cross-project policy changes

**Consumers**:

- Sisyphus (must follow precedent in future charters)
- MAIA (must enforce precedent in routing)
- All future projects (bound by decision)

---

## 🎨 ARTIFACT FLOW DIAGRAM

```
STRATEGIC DECISION NEEDED
    ↓
[GIUZU: T3] Creates Decision Record (DR)
    ↓
[SISYPHUS: T2] Updates Project Charter (if precedent)
    ↓
[MAIA: T1] Converts to Delegation Packets
    ↓
[MAIA: T1] Executes Plan
    ↓
[MAIA: T1] Generates Execution Reports (ER)
    ↓
[SISYPHUS: T2] Creates Acceptance Report
    ↓
[MAIA: T1] Updates Kanban Status
```

---

## 🛡️ ARTIFACT STORAGE

### File Structure

```
.opencode/
├── context/
│   ├── project-charter-*.md           # Sisyphus artifacts
│   ├── milestone-plan-*.md            # Sisyphus artifacts
│   ├── decision-record-*.md           # Sisyphus & Giuzu artifacts
│   ├── risk-register-*.md             # Sisyphus artifacts
│   ├── acceptance-report-*.md          # Sisyphus artifacts
│   ├── pattern-diffs.md              # Giuzu artifacts (continuous)
│   ├── playbooks.md                  # Giuzu artifacts (continuous)
│   └── policies.md                  # Giuzu artifacts (continuous)
├── agents/
│   ├── giuzu.md                     # Giuzu profile
│   ├── sisyphus.md                  # Sisyphus profile
│   ├── maia.md                       # Maia profile
│   └── ...
└── ...
```

### Artifact Naming Convention

**Sisyphus Artifacts**:

- `project-charter-{project_id}.md`
- `milestone-plan-{plan_id}.md`
- `decision-record-{record_id}.md`
- `risk-register-{project_id}.md`
- `acceptance-report-{report_id}.md`

**Maia Artifacts** (ephemeral, in memory):

- Task Graphs (during execution)
- Delegation Packets (during execution)
- Execution Reports (on completion)
- Board State Updates (real-time)

**Giuzu Artifacts**:

- `decision-record-{record_id}.md` (strategic)
- `policy-update-{update_id}.md`
- `playbook-update-{update_id}.md`
- `pattern-diffs.md` (continuous update)

---

## 🎯 SUCCESS CRITERIA

Artifact separation is working when:

- **Zero Violations**: No tier produces another tier's artifact types
- **Clear Ownership**: Every artifact has unambiguous producing tier
- **Efficient Flow**: Artifacts flow through system without rework
- **Traceability**: Every decision/document has clear origin and consumer
- **No Overlap**: Artifact types are mutually exclusive between tiers

---

_These artifact types prevent conflict. Ownership is clear. Flow is efficient._
