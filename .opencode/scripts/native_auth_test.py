import json
import os

# NATIVE AUTH ECOSYSTEM SYNC (2026-01-26)
# Stripping individual keys to use system auth.json natively.
CONFIG = {
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "maia",
  "model": "zai-coding-plan/glm-4.7",
  "permission": {
    "edit": "allow", "bash": "allow", "write": "allow", "webfetch": "allow"
  },
  "provider": {
    "zai-coding-plan": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Z.ai Paid Coding Plan",
      "options": {
        "baseURL": "https://api.z.ai/api/coding/paas/v4"
      }
    },
    "google": {
      "npm": "@ai-sdk/google",
      "name": "Gemini Engine (Native)"
    },
    "opencode": {
      "name": "OpenCode Models"
    },
    "openrouter": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenRouter Global",
      "options": {
        "baseURL": "https://openrouter.ai/api/v1"
      }
    }
  },
  "mcp": {
    "filesystem": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."] },
    "git": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-git"] },
    "vibekanban": { "type": "local", "command": ["npx", "-y", "vibe-kanban@latest", "--mcp"] }
  },
  "agent": {
    "maia": {
      "description": "THE ORCHESTRATOR.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "sisyphus": {
      "description": "THE PROJECT MANAGER.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "coder": {
        "description": "THE ARCHITECT.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True }
    },
    "researcher": {
        "description": "THE ORACLE.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "giuzu": {
        "description": "THE DIGITAL CLONE.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True }
    },
    "ops": {
        "description": "THE INFRASTRUCTURE GOD.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True }
    }
  }
}

base_dir = "/Users/g/Desktop/MAIA opencode"
target_json = os.path.join(base_dir, "opencode.json")
with open(target_json, "w") as f:
    json.dump(CONFIG, f, indent=2)

print("✅ Native Auth Roster Synced")
