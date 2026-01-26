# Success Pattern: Agent Swarm Initialization

**Pattern ID**: initialization-agent-swarm-wakeup
**Created**: 2026-01-26
**Harvested From**: task_a3c702a5-75bd-4974-8250-94c7572a3ffd
**Context Agent**: @maia

---

## Problem Statement

How to systematically initialize and verify a multi-agent swarm for "God Mode" operation?

---

## Solution

### Initialization Protocol

1. **Agent Verification**: Verify all agents in AGENTS.md are operational
2. **Infrastructure Check**: Verify Node, npm, TypeScript, build tools, Docker
3. **Configuration Sync**: Verify opencode.json matches AGENTS.md
4. **Quality Scan**: Check for TODOs, security issues, code quality
5. **Report Generation**: Generate comprehensive initialization report

### Initialization Template

```markdown
## WAKEUP GOD MODE - COMPLETED

### ✅ ALL N AGENTS VERIFIED

**Successfully Retried (X/Y previously failed)**:

- @agent1 ✅ - Status details
- @agent2 ✅ - Status details

**Previously Working (Z/Z)**:

- @agent3 ✅
- @agent4 ✅

### 🔍 KEY FINDINGS

**Infrastructure**:

- Port X: ✅ Service running (PID Y)
- Node/npm: ✅ Installed
- TypeScript: ✅ Strict mode enabled
- Build/Test: ✅ Vite + Vitest configured
- Docker: ❌ Not installed (if applicable)

**Code Quality**:

- TODOs: X found
- Security: Issues found (if any)
- AGENTS.md: ✅ Well-structured

**Agent Ecosystem**:

- opencode.json: X agents configured
- AGENTS.md: Y agents documented
- Missing in config: List missing agents

### 📋 NEXT ACTIONS

1. Add missing agents to opencode.json
2. Rotate exposed API keys
3. Clean up TODOs in production code
4. Install missing infrastructure (if needed)

**STATUS: PARTIAL SUCCESS - READY FOR OPERATION**
```

---

## Code Snippet

### Agent Health Check Pattern

```bash
# Check agent status
@agent1 "ping"
@agent2 "ping"
# ... continue for all agents

# Verify infrastructure
node --version
npm --version
tsc --version
docker --version 2>/dev/null || echo "Docker not installed"
```

### Configuration Sync Pattern

```bash
# Compare AGENTS.md vs opencode.json
grep -E "^- @" AGENTS.md | wc -l  # Count in docs
grep -E '"name":' opencode.json | wc -l  # Count in config
```

---

## Context Agent Usage

**When to Use**: On first-time setup or after major configuration changes
**Who Should Use**: @maia (Orchestrator)
**Prerequisites**: AGENTS.md and opencode.json must exist

---

## Success Criteria

- All agents respond to ping
- Infrastructure tools installed
- Configuration files synchronized
- Quality scan completed
- Comprehensive report generated

---

## Related Patterns

- [multi-agent-health-check](../audit/multi-agent-health-check.md)
- [board-initialization](../initialization/board-initialization.md)
