import json
import os

# FINAL DEFINITIVE ECOSYSTEM CONFIGURATION 2026-01-26
# Mapped to User's specific Keys and Setup requirements.
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
      "name": "Z.ai Coding Plan (Zai Key)",
      "options": {
        "baseURL": "https://api.z.ai/api/coding/paas/v4",
        "apiKey": "env:ZAI_API_KEY"
      },
      "models": {
        "glm-4.7": { "name": "GLM 4.7 Coding Plan" }
      }
    },
    "google": {
      "npm": "@ai-sdk/google",
      "name": "Gemini Engine (Google Key)",
      "options": {
        "apiKey": "env:GEMINI_API_KEY"
      },
      "models": {
        "gemini-2.0-flash": { "name": "Gemini 2.0 Flash" },
        "gemini-2.5-pro": { "name": "Gemini 2.5 Pro" }
      }
    },
    "opencode": {
      "name": "OpenCode Native Models",
      "options": {
        "apiKey": "env:GEMINI_API_KEY"
      },
      "models": {
        "big-pickle": { "name": "Big Pickle" },
        "gpt-5-nano": { "name": "GPT-5 Nano" }
      }
    },
    "openrouter": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenRouter Global (OR Key)",
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
    # --- MAIA CLUSTER (Strategy & Creation) ---
    "maia": {
      "description": "THE ORCHESTRATOR. High-agency strategic command.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "coder": {
        "description": "THE ARCHITECT. Building production reality.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True }
    },
    "giuzu": {
        "description": "THE LOGICAL CLONE. Personality and deduction specialist.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "ops": {
        "description": "THE INFRASTRUCTURE GOD. Deployment and CI/CDPipelines.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "opencode": {
        "description": "THE META MANAGER. Ecosystem configuration specialist.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "write": True, "edit": True, "bash": True, "vibekanban_*": True }
    },

    # --- SISYPHUS CLUSTER (Coordination & Execution) ---
    "sisyphus": {
      "description": "THE PROJECT COORDINATOR. Lifecycle management.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "researcher": {
        "description": "THE ORACLE. Deep documentation synthesis.",
        "model": "google/gemini-2.0-flash",
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
    "explore": {
        "description": "THE SCOUT. Rapid structural discovery.",
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
        print(f"✅ Definitive Setup Sync: {p}")
