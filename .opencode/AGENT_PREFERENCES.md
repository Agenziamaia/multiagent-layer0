# MAIA Agent Preferences

**This file tracks learned preferences from interactions**

---

## Current State

```json
{
  "version": "1.1.0",
  "last_updated": "2026-01-22",
  "preferences": {
    "model": {
      "maia": "zai-coding-plan/glm-4.7",
      "vision_enabled": true,
      "fallback_model": "openai/gpt-4o"
    },
    "workflow": {
      "auto_start_dev_server": true,
      "skip_confirmation_simple": false,
      "preferred_communication": "detailed",
      "kanban_first": true,
      "message_mode": true,
      "tracker_only_default": true,
      "no_paid_executors_by_default": true
    },
    "tools": {
      "vibe_kanban": {
        "enabled": true,
        "project_id": "b7a06d11-3600-447f-8dbd-617b0de52e67",
        "api_url": "http://localhost:62601"
      }
    },
    "learned_patterns": {
      "user_uses_vision": true,
      "prefers_parallel_research": true,
      "likes_message_mode": true,
      "prefers_natural_language": true,
      "frustrated_with_background_tasks": true,
      "wants_real_execution": true,
      "demands_visual_tracking": true
    },
    "issues_resolved": [
      {
        "issue": "Tasks not being executed - only created and moved",
        "fix": "Task 1: Actually fire background agents and execute work",
        "date": "2026-01-22"
      },
      {
        "issue": "Vision/screenshot tool broken with temp paths",
        "fix": "User should save screenshots to persistent location first",
        "date": "2026-01-22"
      },
      {
        "issue": "User wants to see tasks being executed, not just created",
        "fix": "Demonstrate real multi-agent execution, show progress in real-time",
        "date": "2026-01-22"
      },
      {
        "issue": "Confusion about task management - tasks not visible working",
        "fix": "Update AGENTS.md with real execution workflow documentation",
        "date": "2026-01-22"
      }
    ]
}
```

---

## Tool Configuration

**Vibe Kanban**: Enabled and connected
**Project ID**: `b7a06d11-3600-447f-8dbd-617b0de52e67` (Multi-Agent Layer 0 v2)
**API URL**: `http://localhost:62601`

---

## Agent Models (Fixed)

- **@maia**: `zai-coding-plan/glm-4.7` (with vision via GPT-4o)
- **@coder**: `zai-coding-plan/glm-4.7`
- **@ops**: `zai-coding-plan/glm-4.7`
- **@researcher**: `google/gemini-2.5-pro`
- **@reviewer**: `zai-coding-plan/glm-4.7`

---

## Real Execution Workflow

**Task Creation**:

1. Parse user intent → Create task in Vibe Kanban (TODO status)
2. Assign to appropriate agent (@coder, @ops, @researcher)
3. Fire background agents for independent work (parallel)
4. Use message mode for sequential handoffs

**Task Execution**:

1. **Move to IN PROGRESS**: Update task status when agent starts working
2. **Do the work**: Agent actually executes (code, infra, research)
3. **Move to IN REVIEW**: When complete, move for reviewer
4. **Move to DONE**: After reviewer approval

**Demonstration Mode**:

- When user asks to demonstrate system:
  - Create clear, actionable task
  - Actually execute the work (not just create tasks)
  - Show real-time progress through status updates
  - Use message mode for agent handoffs
  - Demonstrate parallel background agents

---

## Vibe Kanban Integration

### Project Configuration

- **Name**: Multi-Agent Layer 0
- **Project ID**: f947a334-989d-408a-9e3c-03b73fe2f6e9
- **Status**: Active and operational

### Task Lifecycle

```
┌─────────────────────────────────────────────────┐
│  TO DO          │  IN PROGRESS      │  IN REVIEW    │  DONE  │
│  ─────────────  │  ──────────────   │  ──────────   │  ──────│
│  • New tasks    │  • Active agents  │  • Awaiting   │  • Done │
│  • Backlog      │  • Work in progress  │    review     │  • Merged│
└─────────────────────────────────────────────────┘
```

### Natural Language → Orchestration

**User says**: "Research 3 options in parallel, plan with ops, implement with coder, review"

**MAIA executes**:

1. Creates 3 research tasks in TODO (via `vibe_kanban_create_task`)
2. Fires 3 `background_task(agent="researcher")` calls (parallel execution)
3. Collects findings via `background_output(task_id)`
4. Synthesizes → Creates ops planning task
5. Message handoff to @ops: `session({ mode: "message", agent: "ops", text: "...findings..." })`
6. Creates coder task: `vibe_kanban_create_task` for implementation
7. Message handoff to @coder: `session({ mode: "message", agent: "coder", text: "implement per spec..." })`
8. Coder updates to IN PROGRESS: `vibe_kanban_update_task({ status: "in_progress" })`
9. Coder completes → moves to IN REVIEW: `vibe_kanban_update_task({ status: "in_review" })`
10. Message handoff to @reviewer: `session({ mode: "message", agent: "reviewer", text: "Review implementation..." })`
11. Reviewer approves → moves to DONE: `vibe_kanban_update_task({ status: "done" })`

**User sees**: Real-time status updates on Vibe Kanban board!

---

## Communication Protocols

### Message Mode (Critical for Sequential Work)

**When Agent A completes and Agent B needs to continue:**

```
session({
  mode: "message",
  agent: "nextAgent",  // e.g., "coder", "ops", "reviewer"
  text: `TASK HANDOFF:

  Context from previous agent:
  - Files created: [list]
  - Findings: [summary]
  - Recommendations: [what to do next]

  Please continue from here.`
})
```

**Handoff Payload Structure:**

- Current state of work
- Completed artifacts
- Next steps
- Blockers or concerns

### Background Tasks (Parallel Work)

**When independent work can run in parallel:**

```
background_task(
  agent="researcher",  // or "coder", "ops"
  prompt="Specific task description",
  run_in_background=true
)
```

**Collect Results:**

```
background_output(task_id="<task_id>")
```

---

## User Preferences Learned

1. **Vision Support**: GPT-4o model used for screenshot/image analysis
2. **Real Execution**: User wants to see agents actually working, not just task creation
3. **Visual Tracking**: User wants tasks moving through statuses in real-time
4. **Parallel Research**: Good for exploration and multi-faceted analysis
5. **Demonstration**: Show the system in action with real work execution

---

## Quick Commands

```bash
# View board
open http://localhost:62601/projects/f947a334-989d-408a-9e3c-03b73fe2f6e9

# List tasks
curl 'http://localhost:62601/api/tasks?project_id=f947a334-989d-408a-9e3c-03b73fe2f6e9'

# Create task
curl -X POST 'http://localhost:62601/api/tasks' \
  -H 'Content-Type: application/json' \
  -d '{
    "project_id": "f947a334-989d-408a-9e3c-03b73fe2f6e9",
    "title": "Build feature X",
    "description": "Detailed requirements..."
  }'
```

---

_Real Execution Mode Activated - Tasks now execute visibly!_

_Last Updated: 2026-01-22_
