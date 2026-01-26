# Success Pattern: Multi-Agent System Audit

**Pattern ID**: audit-multi-agent-health-check
**Created**: 2026-01-26
**Harvested From**: task_28afd573-0130-44aa-88bd-c58f71eba51d
**Context Agent**: @maia

---

## Problem Statement

How to systematically verify the health and readiness of a multi-agent ecosystem before starting work?

---

## Solution

### Audit Protocol

1. **Ping All Agents**: Verify connectivity to all agents defined in AGENTS.md
2. **Verify External Services**: Check VibeKanban connectivity, Decision Log accessibility
3. **Check Tool Alignment**: Ensure tools are configured and accessible
4. **Report Status**: Generate health report with pass/fail status

### Agent Health Check Template

```markdown
**AUDIT TASK**: Multi-Agent System Health Check
**Date**: ${DATE}
**Auditor**: @${AGENT}
**Project**: ${PROJECT_NAME}

**Objectives**:

1. Ping all N agents defined in AGENTS.md
2. Verify VibeKanban connectivity
3. Verify Decision Log accessibility
4. Report agent health status

**Agents to Verify**:

- List each agent with their model and role

**Acceptance Criteria**:

- ✅ All agents respond to ping
- ✅ VibeKanban task created successfully
- ✅ Decision Log is readable
- ✅ Tools aligned and accessible
```

---

## Code Snippet

### Vibe Kanban Health Check Pattern

```bash
# Verify Vibe Kanban connectivity
vibekanban_list_projects

# Verify task operations
vibekanban_list_tasks --project_id=$PROJECT_ID
```

### Agent Health Check Pattern

```javascript
// Verify agent availability
const AGENTS = [
  '@maia',
  '@coder',
  '@ops',
  '@researcher',
  '@researcher_fast',
  '@reviewer',
  '@opencode',
  '@workflow',
  '@vision',
  '@giuzu',
  '@starter',
  '@maia_premium',
];

for (const agent of AGENTS) {
  const health = await healthCheck(agent, 30000);
  console.log(`${agent}: ${health.status}`);
}
```

---

## Context Agent Usage

**When to Use**: Before starting any multi-agent orchestration task
**Who Should Use**: @maia (Orchestrator), @sisyphus (Project Manager)
**Prerequisites**: AGENTS.md must exist with agent definitions

---

## Success Criteria

- All agents respond within 30s timeout
- Vibe Kanban operations complete successfully
- Decision Log is readable
- Tool configuration verified

---

## Related Patterns

- [agent-swarm-initialization](../initialization/agent-swarm-initialization.md)
- [board-initialization](../initialization/board-initialization.md)
