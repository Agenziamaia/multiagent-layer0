import json
import os

# DEFINITIVE ECOSYSTEM SYNC 2.0 (2026-01-26)
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
      "name": "Z.ai Coding Plan",
      "options": {
        "baseURL": "https://api.z.ai/api/coding/paas/v4",
        "apiKey": "env:ZAI_API_KEY"
      },
      "models": {
        "glm-4.7": { "name": "GLM 4.7 Coding Plan" }
      }
    },
    "google": {
      "name": "Gemini Engine (Native)",
      "options": {
        "apiKey": "env:GEMINI_API_KEY"
      }
    },
    "opencode": {
      "name": "OpenCode Models",
      "models": {
        "big-pickle": { "name": "Big Pickle (Free)" },
        "gpt-5-nano": { "name": "GPT-5 Nano" }
      }
    },
    "openrouter": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenRouter Global",
      "options": {
        "baseURL": "https://openrouter.ai/api/v1",
        "apiKey": "env:OPENROUTER_API_KEY"
      },
      "models": {
        "qwen-free": { "id": "qwen/qwen3-coder:free", "name": "Qwen 3 Coder (Free)" },
        "deepseek-free": { "id": "deepseek/deepseek-r1-0528:free", "name": "DeepSeek R1 (Free)" }
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
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "sisyphus": {
      "description": "THE PROJECT COORDINATOR.",
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
        "model": "google/gemini-2.0-flash",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "giuzu": {
        "description": "THE LOGICAL CLONE.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True }
    }
  }
}

paths = [
    "/Users/g/Desktop/MAIA opencode/opencode.json",
    "/Users/g/Desktop/multiagent-layer0/opencode.json",
    "/Users/g/Desktop/MAIA_Layer0/opencode.json"
]

def clean_dict(d):
    if isinstance(d, dict):
        return {k: clean_dict(v) for k, v in d.items()}
    elif isinstance(d, list):
        return [clean_dict(x) for x in d]
    elif isinstance(d, bool):
        return d
    return d

data_to_write = clean_dict(CONFIG)

for p in paths:
    if os.path.exists(os.path.dirname(p)):
        with open(p, "w") as f:
            json.dump(data_to_write, f, indent=2)
        print(f"✅ Hardware Sync 2.0: {p}")
