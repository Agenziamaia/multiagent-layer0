import json
import os

# DEFINITIVE HARDWARE-OPTIMIZED CONFIGURATION 2026-01-26
# Based on User's verified working state:
# 1. Zai Key -> GLM (Coding Plan) and Gemini (v1 Proxy).
# 2. Google Key -> OpenCode Native Models (Big Pickle).
# 3. OpenRouter Key -> External Benchmarking.

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
      "name": "Z.ai Paid Coding Plan (Zai Key)",
      "options": {
        "baseURL": "https://api.z.ai/api/coding/paas/v4",
        "apiKey": "env:ZAI_API_KEY"
      },
      "models": {
        "glm-4.7": { "name": "GLM 4.7 Coding Plan" }
      }
    },
    "google": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Gemini Engine (Zai Proxy)",
      "options": {
        "baseURL": "https://api.z.ai/api/v1",
        "apiKey": "env:ZAI_API_KEY"
      },
      "models": {
        "gemini-2.5-pro": { "name": "Gemini 2.5 Pro (Zai)" },
        "gemini-2.0-flash": { "name": "Gemini 2.0 Flash (Zai)" }
      }
    },
    "opencode": {
      "npm": "@ai-sdk/openai",
      "name": "OpenCode Models (Google Key)",
      "options": {
        "apiKey": "env:GOOGLE_API_KEY"
      },
      "models": {
        "big-pickle": { "name": "Big Pickle (Free Reasoning)" },
        "gpt-5-nano": { "name": "GPT-5 Nano (Utility)" }
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
      "description": "THE ORCHESTRATOR. Strategic command.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "sisyphus": {
      "description": "THE PROJECT COORDINATOR. Lifecycle management.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "coder": {
        "description": "THE ARCHITECT. Production creating agent.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True }
    },
    "ops": {
        "description": "THE INFRASTRUCTURE GOD. System deployment and stability.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "researcher": {
        "description": "THE ORACLE. Deep documentation synthesis.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "librarian": {
        "description": "THE ARCHIVIST. Info retrieval and indexing.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER. Logic audit and quality control.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True }
    },
    "giuzu": {
        "description": "THE LOGICAL CLONE. Personality and deduction specialist.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "explore": {
        "description": "THE SCOUT. Rapid recon.",
        "model": "opencode/gpt-5-nano",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "vibekanban_*": True }
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
        print(f"✅ Final Corrected Sync: {p}")
