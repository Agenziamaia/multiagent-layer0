# Vibe Kanban Auto-Startup Protocol

## PROBLEM ANALYSIS: Port Configuration Issue

### The Issue

Previous Vibe Kanban startup used incorrect port configuration:

```bash
# WRONG - Backend on 62602, browser opened to wrong port
HOST=127.0.0.1 PORT=62601 BACKEND_PORT=62602 MCP_HOST=127.0.0.1 MCP_PORT=62601 VK_ALLOWED_ORIGINS=http://localhost:62601,http://127.0.0.1:62601 npx vibe-kanban
```

**What Went Wrong**:

1. Set `BACKEND_PORT=62602` - Split frontend and backend onto different ports
2. Server started on port 62602 instead of 62601
3. Browser opened to 62602 (wrong port)
4. User expected everything on port 62601 (consistent access)

### Why This Matters

- Inconsistent port assignment makes Vibe Kanban unreliable
- Browser opened to wrong port creates confusion
- MCP server integration breaks when ports don't match
- Multiple agents can't coordinate if ports keep changing

---

## THE CORRECT SOLUTION

### What I Did to Fix It

**Step 1: Kill all existing processes**

```bash
pkill -f "vibe-kanban" || true
```

**Step 2: Verify port 62601 is free**

`lsof` lists processes using a port. If the port is free, `lsof` produces no output and exits 1. If in use, it exits 0 with output.

```bash
# Fail if port in use (lsof exits 0). Proceed only when port is free.
if lsof -i :62601 >/dev/null 2>&1; then echo "ERROR: Port 62601 in use. Run: pkill -f vibe-kanban" >&2; exit 1; fi
```

**Step 3: Start Vibe Kanban correctly**

```bash
# CORRECT - Simple, consistent port configuration
PORT=62601 HOST=127.0.0.1 npx vibe-kanban &
```

**Step 4: Verify operation**

```bash
# Wait for startup
sleep 5

# Check if running on correct port (lsof shows processes using the port)
lsof -i :62601  # Should show vibe-kanban process

# Verify HTTP response
curl -s -o /dev/null -w "%{http_code}" http://localhost:62601  # Should return 200
```

### Key Principles

1. **SIMPLE PORT CONFIGURATION**: Use only `PORT=62601`, don't set `BACKEND_PORT`
2. **CONSISTENT HOST**: Always use `HOST=127.0.0.1` (localhost)
3. **BACKGROUND EXECUTION**: Run with `&` so it doesn't block the agent
4. **VERIFICATION**: Always check HTTP 200 response before proceeding
5. **PORT STABILITY**: Same port every time (62601) for predictable access

---

## MAIA AGENT AUTO-STARTUP PROTOCOL

### When to Start Vibe Kanban

- **ALWAYS** start Vibe Kanban on session initialization
- Before any task creation or agent orchestration
- Before any git operations or workflow execution

### Startup Sequence

```javascript
// MAIA Agent Initialization Protocol
async function initializeMAIASession() {
  // 1. Check if Vibe Kanban is already running
  const isRunning = await checkVibeKanbanStatus();

  if (!isRunning) {
    // 2. Kill any existing vibe-kanban processes (cleanup)
    await executeCommand('pkill -f "vibe-kanban" || true');

    // 3. Verify port 62601 is free (lsof exits 0 when port in use, 1 when free)
    const portCheck = await executeCommand("lsof -i :62601");
    if (portCheck.exitCode === 0) {
      throw new Error("Port 62601 is in use. Run: pkill -f vibe-kanban");
    }

    // 4. Start Vibe Kanban correctly
    await executeCommand("PORT=62601 HOST=127.0.0.1 npx vibe-kanban &");

    // 5. Wait for startup (5 seconds)
    await executeCommand("sleep 5");

    // 6. Verify HTTP 200 response
    const status = await executeCommand(
      'curl -s -o /dev/null -w "%{http_code}" http://localhost:62601',
    );

    if (status !== "200") {
      throw new Error("Vibe Kanban failed to start - HTTP response: " + status);
    }
  }

  // 7. Proceed with task orchestration
  console.log("✅ Vibe Kanban operational on http://localhost:62601");
}
```

### Error Handling

**If startup fails**:

1. Log the error with full diagnostic output
2. Try killing processes again and restart
3. If still failing, inform user and proceed in tracker-only mode (Vibe Kanban status updates optional)

**If port conflict**:

1. Identify what's using port 62601
2. Kill that process
3. Restart Vibe Kanban

---

## VERIFICATION CHECKLIST

Before proceeding with any work, verify:

- [ ] Vibe Kanban process running (`lsof -i :62601` shows vibe-kanban)
- [ ] HTTP 200 response from http://localhost:62601
- [ ] No port conflicts on 62601
- [ ] MCP server integration ready (automatic with startup)

---

## LESSONS LEARNED

### For Future Agents

1. **DON'T OVERTHINK PORT CONFIGURATION**
   - Wrong: Complex multi-port setup with BACKEND_PORT, FRONTEND_PORT
   - Right: Simple `PORT=62601` only

2. **ALWAYS VERIFY THE OUTPUT**
   - Wrong: Assume startup worked because command didn't error
   - Right: Actually check HTTP 200 response

3. **LISTEN TO USER REQUIREMENTS**
   - Wrong: Use default port assignment or your preference
   - Right: User explicitly said port 62601 - use exactly that

4. **CONSISTENCY IS KEY**
   - Wrong: Random port assignment or port + offset logic
   - Right: Same port (62601) every single time

5. **BACKGROUND EXECUTION MATTERS**
   - Wrong: Run npx vibe-kanban without `&` - blocks the agent
   - Right: Run with `&` so agent can continue working

---

## INTEGRATION POINT

### Where This Should Live

**File**: `.opencode/agents/maia.md`

**Add to Initialization Protocol** section:

```markdown
### Session Initialization Protocol

**MANDATORY STARTUP STEPS**:

1. **Vibe Kanban Auto-Startup**
   - Always start Vibe Kanban on port 62601 first
   - Use simple configuration: `PORT=62601 HOST=127.0.0.1 npx vibe-kanban &`
   - Verify HTTP 200 response before proceeding
   - See VIBE_KANBAN_PROTOCOL.md for full troubleshooting guide

2. **Task Management Readiness**
   - Verify Vibe Kanban MCP connection
   - Check project ID: f947a334-989d-408a-9e3c-03b73fe2f6e9
   - Ensure agent can create/update/list tasks
```

---

## CONCLUSION

**Resolution**: Simple, consistent port configuration with proper verification

**Key Learning**: Avoid overcomplication. User specified port 62601 - use exactly that and verify operation.

**Protocol Implementation**: MAIA should always start Vibe Kanban first, verify it's working, then proceed with all other tasks.

---

**Last Updated**: 2026-01-23
**Updated By**: MAIA (GPT-5.2)
**Verified**: ✅ HTTP 200 on http://localhost:62601
