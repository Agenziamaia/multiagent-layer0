<!-- MAIA: Demonstration artifact -->

# Demo: Git Worktree Isolation (Conflict Prevention)

This artifact demonstrates the **core conflict-prevention primitive** used by Vibe Kanban and by MAIA parallelization strategies: **git worktrees**.

## Goal

Prove that two parallel "agents" can work simultaneously without file conflicts by:

- creating **two worktrees** off the same base branch
- making changes in each
- showing each worktree has independent working tree state
- cleaning up after

## Commands (exact)

```bash
cd /Users/g/Desktop/multiagent-layer0

rm -rf /tmp/maia-wt-a /tmp/maia-wt-b || true

BR_A=demo/wt-a
BR_B=demo/wt-b

git branch -D "$BR_A" >/dev/null 2>&1 || true
git branch -D "$BR_B" >/dev/null 2>&1 || true

git worktree add -b "$BR_A" /tmp/maia-wt-a main
git worktree add -b "$BR_B" /tmp/maia-wt-b main

printf "\n# Worktree A marker\n" >> /tmp/maia-wt-a/NEXT_AGENT_HANDOFF.md
printf "\n# Worktree B marker\n" >> /tmp/maia-wt-b/CHANGELOG.md

cd /tmp/maia-wt-a
git branch --show-current
git status --porcelain
git diff --stat

cd /tmp/maia-wt-b
git branch --show-current
git status --porcelain
git diff --stat

cd /Users/g/Desktop/multiagent-layer0
git worktree remove /tmp/maia-wt-a --force
git worktree remove /tmp/maia-wt-b --force
git branch -D "$BR_A"
git branch -D "$BR_B"
```

## Output (captured)

Worktree A:

```
demo/wt-a
 M NEXT_AGENT_HANDOFF.md
 NEXT_AGENT_HANDOFF.md | 2 ++
 1 file changed, 2 insertions(+)
```

Worktree B:

```
demo/wt-b
 M CHANGELOG.md
 CHANGELOG.md | 2 ++
 1 file changed, 2 insertions(+)
```

## Why this matters for MAIA orchestration

- Vibe Kanban uses worktrees per task attempt to ensure isolation.
- In **tracker-only mode**, MAIA can still use worktrees (or separate branches) to isolate parallel coding tasks.
- This prevents agents from overwriting each other’s edits.
