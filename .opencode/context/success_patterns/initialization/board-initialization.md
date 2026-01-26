# Success Pattern: Board Initialization

**Pattern ID**: initialization-board-setup
**Created**: 2026-01-26
**Harvested From**: task_f36b7c7e-a0b5-46b5-940c-171a6e2705b3
**Context Agent**: @maia

---

## Problem Statement

How to initialize a Vibe Kanban board for tracking multi-agent project work?

---

## Solution

### Initialization Protocol

1. **Verify Project Exists**: Check if project exists in Vibe Kanban
2. **List Existing Tasks**: Review current board state
3. **Check System Status**: Verify connectivity and operations
4. **Prepare Success Patterns**: Ensure success_patterns vault is ready
5. **Update Task Status**: Move initialization task through stages

### Board Initialization Template

```markdown
## Board Initialization Complete ✅

**Current Status**:

- **Vibe Kanban**: Connected and operational
- **Project ID**: ${PROJECT_ID}
- **Active Tasks**: X (Y done, Z todo)
- **Success Patterns Vault**: ${STATUS}

**Board Activity**:

- Task 1 - DONE
- Task 2 - DONE
- Task 3 - IN PROGRESS
- Task 4 - TODO

**Success Patterns System**:

- Location: layer0/.opencode/context/success_patterns/
- Status: Directory exists, needs population
- Librarian agent configured to manage this vault
- Starter agent configured to query this vault
```

---

## Code Snippet

### Vibe Kanban Operations Pattern

```javascript
// List all projects
const projects = await vibekanban_list_projects();

// Find target project by name
const targetProject = projects.find((p) => p.name === 'Multi-Agent Layer 0');

// List all tasks
const tasks = await vibekanban_list_tasks({
  project_id: targetProject.id,
});

// Update task status
await vibekanban_update_task({
  task_id: taskId,
  status: 'inprogress', // or "done", "todo", "inreview", "cancelled"
  description: 'Updated description',
});
```

### Success Patterns Vault Pattern

```bash
# Create success patterns directory structure
mkdir -p layer0/.opencode/context/success_patterns/{audit,initialization,agent-health,implementation,testing}

# Verify directory creation
ls -la layer0/.opencode/context/success_patterns/
```

---

## Context Agent Usage

**When to Use**: At start of any session using Vibe Kanban for task tracking
**Who Should Use**: @maia (Orchestrator)
**Prerequisites**: Vibe Kanban MCP configured, project created

---

## Success Criteria

- Project exists and is accessible
- Board operations (list, create, update tasks) work
- Success patterns directory structure created
- Task tracking functional

---

## Related Patterns

- [multi-agent-health-check](../audit/multi-agent-health-check.md)
- [agent-swarm-initialization](../initialization/agent-swarm-initialization.md)
