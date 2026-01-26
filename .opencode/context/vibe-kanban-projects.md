# MAIA Multi-Agent Layer0 - Vibe Kanban Project Mapping

**This file maps MAIA workspace to Vibe Kanban projects**

---

## Project Configuration

```json
{
  "maia-opencode": {
    "project_id": "b7a06d11-3600-447f-8dbd-617b0de52e67",
    "project_name": "Multi-Agent Layer 0 v2",
    "description": "MAIA Multi-Agent Orchestration Layer0 - repo-backed project (required for execution)",
    "default_agent": "maia",
    "agents": ["maia", "coder", "ops", "researcher", "reviewer"],
    "created": "2026-01-22",
    "url": "http://localhost:62601",
    "repo": {
      "repo_id": "83f5c192-5a44-42e2-acc8-eae7e699ab95",
      "git_repo_path": "/Users/g/Desktop/multiagent-layer0",
      "base_branch": "main"
    }
  }
}
```

---

## Available Vibe Kanban Projects

| Project ID                             | Name                   | Status                               |
| -------------------------------------- | ---------------------- | ------------------------------------ |
| `b7a06d11-3600-447f-8dbd-617b0de52e67` | Multi-Agent Layer 0 v2 | ✅ **ACTIVE (Current)**              |
| `f947a334-989d-408a-9e3c-03b73fe2f6e9` | Multi-Agent Layer 0    | ⚠️ No repo attached (cannot execute) |
| `c88decd1-4ec0-472c-8097-1755eafb6283` | ai-lab                 | Available                            |
| `2c5d2dbf-6964-46b3-9af6-e2973252c35f` | testing-zenflow-agents | Available                            |
| `2dc5bb30-9024-4137-ba4e-2f58fd44ef28` | antigravity test       | Available                            |

---

## Usage

MAIA automatically uses **Multi-Agent Layer 0** project for task management.

**Quick Commands:**

```bash
# List tasks in current project
curl 'http://localhost:62601/api/tasks?project_id=f947a334-989d-408a-9e3c-03b73fe2f6e9'

# Create a task
curl -X POST 'http://localhost:62601/api/tasks' \
  -H 'Content-Type: application/json' \
  -d '{
    "project_id": "f947a334-989d-408a-9e3c-03b73fe2f6e9",
    "title": "Research X",
    "description": "Analyze patterns"
  }'

# Update task status
curl -X PATCH 'http://localhost:62601/api/tasks/<task_id>' \
  -H 'Content-Type: application/json' \
  -d '{"status": "in_progress"}'
```

---

## Workflow Mapping

```
MAIA Intent → Vibe Kanban Task → Agent Assignment → Status Update → Review → Done
```

**Column Mapping:**

- `todo` → New tasks awaiting agent assignment
- `in_progress` → Agent actively working
- `in_review` → Awaiting reviewer approval
- `done` → Approved and complete

---

## API Endpoint

```
Base URL: http://localhost:62601

Endpoints:
- GET  /api/projects              → List projects
- GET  /api/tasks?project_id=...  → List tasks
- POST /api/tasks                 → Create task
- PATCH /api/tasks/{id}           → Update task
- GET  /api/tasks/{id}            → Get task details
- DELETE /api/tasks/{id}          → Delete task
- POST /api/workspaces            → Start agent workspace
```

---

## Integration Complete

✅ Vibe Kanban MCP Server connected  
✅ Project "Multi-Agent Layer 0" created (f947a334-989d-408a-9e3c-03b73fe2f6e9)  
✅ All agents configured for kanban-first orchestration  
✅ Message mode integrated for context preservation  
✅ Conflict prevention (git worktrees) enabled  
✅ Tools loaded: vk_list_projects, vk_list_tasks, vk_create_task, vk_update_task, vk_get_task, vk_delete_task, vk_start_workspace, vk_board_status

---

_Last Updated: 2026-01-22_
