import json
import os

# GOD-TIER ROSTER SYNC (12 AGENTS)
# Synced with the WAKEUP_OPENCODE.txt Manifesto
CONFIG = {
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "maia",
  "model": "zai-coding-plan/glm-4.7",
  "permission": { "edit": "allow", "bash": "allow", "write": "allow", "webfetch": "allow" },
  "provider": {
    "zai-coding-plan": { "npm": "@ai-sdk/openai-compatible", "name": "Z.ai Paid Coding Plan", "options": { "baseURL": "https://api.z.ai/api/coding/paas/v4" } },
    "google": { "npm": "@ai-sdk/google", "name": "Gemini Engine" },
    "opencode": { "name": "OpenCode Models" },
    "openrouter": { "npm": "@ai-sdk/openai-compatible", "name": "OpenRouter Global", "options": { "baseURL": "https://openrouter.ai/api/v1" } }
  },
  "mcp": {
    "filesystem": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."] },
    "git": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-git"] },
    "vibekanban": { "type": "local", "command": ["npx", "-y", "vibe-kanban@latest", "--mcp"] }
  },
  "agent": {
    "maia": { "description": "THE ORCHESTRATOR. Strategic command.", "model": "zai-coding-plan/glm-4.7", "mode": "primary", "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True } },
    "sisyphus": { "description": "THE PROJECT MANAGER. Workflow loop engine.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "session": True, "vibekanban_*": True } },
    "coder": { "description": "THE ARCHITECT. Production creating agent.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True } },
    "ops": { "description": "THE INFRASTRUCTURE GOD. System stability.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True } },
    "researcher": { "description": "THE ORACLE. Deep context Analyst.", "model": "google/gemini-2.5-pro", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True } },
    "researcher_fast": { "description": "THE RAPID ANALYST.", "model": "google/gemini-2.5-flash", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True } },
    "reviewer": { "description": "THE GATEKEEPER. No-mercy logic audits.", "model": "opencode/big-pickle", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True } },
    "vision": { "description": "THE VISUAL ANALYST. Dedicated Multimodal path.", "model": "google/gemini-2.0-flash", "mode": "subagent", "tools": { "read": True, "webfetch": True, "session": True } },
    "giuzu": { "description": "THE DIGITAL CLONE. personality/logic mirror.", "model": "opencode/big-pickle", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True } },
    "workflow": { "description": "THE AUTOMATOR. Specialist in n8n/Flowise.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "read": True, "write": True, "edit": True, "bash": True } },
    "starter": { "description": "THE BOOTSTRAPPER. Quick project init.", "model": "google/gemini-2.5-flash", "mode": "subagent", "tools": { "read": True, "write": True, "edit": True, "bash": True } },
    "opencode": { "description": "THE META SPECIALIST. Self-maintenance agent.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "read": True, "write": True, "edit": True, "bash": True } },
    "maia_premium": { "description": "THE GPT-5 ARCHITECT. Complex reasoning.", "model": "google/gemini-2.5-pro", "mode": "subagent", "tools": { "read": True, "write": True, "edit": True, "bash": True, "session": True } },
    "explore": { "description": "THE SCOUT. File discovery.", "model": "opencode/gpt-5-nano", "mode": "subagent", "tools": { "read": True, "grep": True, "glob": True, "list": True } }
  }
}

base_dir = "/Users/g/Desktop/MAIA opencode"
target_json = os.path.join(base_dir, "opencode.json")
with open(target_json, "w") as f:
    json.dump(CONFIG, f, indent=2)

print("✅ Full 12-Droid Roster Synced to opencode.json")
