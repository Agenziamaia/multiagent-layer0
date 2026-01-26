<!-- MAIA: Full orchestration runbook -->

# Full MAIA Orchestration Demo (Runbook)

This runbook documents the **best-practice automation flow** for MAIA + Vibe Kanban, with clear handoff points for human review.

## Objectives

1. **Automation**: MAIA runs work end-to-end when safe.
2. **Human collaboration**: humans intervene at explicit gates (requirements, security, UX, approvals).
3. **No surprises**: avoid paid executor defaults (AMP) and naming collisions (Vibe "OpenCode" != repo `opencode`).
4. **Resumability**: another agent can pick up from artifacts + handoff payloads.

## Operating Modes

### Mode A — Tracker-only (default)

- Vibe Kanban is the **system-of-record**.
- MAIA agents execute work in this ecosystem.
- Vibe Kanban **Attempts may remain (0)**.

### Mode B — Vibe executor (opt-in)

- Vibe Kanban launches an external executor (Cursor/Gemini CLI/etc).
- Requires repo-backed project + executor installation/auth.
- May have costs.

## The Canonical Pipeline

### Stage 0 — Intake (Human optional)

Input: user intent or task card.

Output:

- clarified requirements
- explicit acceptance criteria
- risk flags (security, paid tools, destructive ops)

### Stage 1 — Plan (MAIA)

MAIA splits work into tasks:

- Research (parallel)
- Implementation
- Review
- Release/merge (optional)

Artifacts:

- `.opencode/demos/handoff-payloads.md` (handoff formats)

### Stage 2 — Parallel Research (Researcher)

Run 2–3 research threads in parallel. Each produces:

- decision matrix
- recommendation
- constraints + risks
- citations

Handoff: Researcher → MAIA

### Stage 3 — Synthesis (MAIA)

MAIA merges research into a single implementation spec:

- scope
- API changes
- file list
- test plan
- rollout plan

Handoff: MAIA → Coder

### Stage 4 — Implementation (Coder)

Coder:

- implements feature
- runs tests/lint/typecheck
- records commands + outputs

Artifacts:

- `.opencode/demos/e2e-orchestration-log.md`

Handoff: Coder → Reviewer

### Stage 5 — Review Gate (Reviewer + Human optional)

Reviewer:

- audits diffs
- requests changes or approves

If human wants to intervene:

- keep task in **In Review**
- collect comments
- hand back to coder

### Stage 6 — Done

Task is moved to Done when:

- acceptance criteria met
- reviewer approval
- artifacts/logs captured

## Where to Look When Something Fails

### If Vibe Kanban shows Attempts(0)

That is normal in tracker-only mode.

### If Vibe executor fails

Common causes:

- AMP credits required
- Executor not authenticated
- Wrong executor (Vibe OpenCode is SST OpenCode)

Use:

- Vibe Kanban Attempt logs (right panel)
- `.opencode/agents/maia.md` guardrails

## Resume Instructions (for another agent)

1. Read:
   - `.opencode/WORKFLOW_VIBE_KANBAN.md`
   - `.opencode/demos/e2e-orchestration-log.md`
   - `.opencode/demos/handoff-payloads.md`
2. Check Vibe Kanban board for task statuses.
3. Continue from latest handoff payload.
