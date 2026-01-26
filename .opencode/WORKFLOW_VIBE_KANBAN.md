<!-- MAIA: Vibe Kanban workflow modes -->

# Vibe Kanban Workflow (MAIA Layer0)

This repo supports **two valid modes** of using Vibe Kanban.

## 1) Tracker-Only Mode (Recommended default)

Use Vibe Kanban as the **source of truth** for:

- tasks
- status (To Do → In Progress → In Review → Done)
- links + artifacts

**Execution happens via MAIA agents** in this chat/system (coder/ops/researcher/reviewer).

### What you’ll see in the UI

- Tasks will move across columns.
- **Attempts may show (0)**. That’s expected.

Why Attempts=0 can still be “real work”:

- “Attempts” are specifically Vibe Kanban launching an _external executor_ (Amp/Cursor/Gemini CLI/etc)
- If we run the work via MAIA agents, there may be no Vibe Kanban attempt.

### Best for

- avoiding paid-tool surprises
- keeping execution inside this multi-agent ecosystem
- human collaboration via Kanban reviews/comments + MAIA message handoffs

## 2) Vibe-Executor Mode (Optional)

Use Vibe Kanban to **start a task attempt** with a selected executor.

### Requirements

1. Project must be **repo-backed** (git repo attached)
2. Executor must be **installed + authenticated**
3. Executor must be acceptable (some are paid)

### How to run (UI)

1. Open a task
2. In the right panel, under **Attempts**, click **+**
3. Choose executor (Cursor Agent / Gemini CLI / etc)
4. Click **Start**

### Notes

- **Amp** can fail with paid credits errors in non-interactive mode.
- Vibe Kanban “OpenCode” refers to **SST OpenCode** (`npx -y opencode-ai`) and is not this repo’s `opencode` binary.

## Collaboration pattern (best of both worlds)

**Default**: Tracker-only.

When humans want to intervene:

- keep tasks in **In Review**
- use Vibe Kanban review UI for line comments
- MAIA uses **message mode** to hand feedback back to coder
