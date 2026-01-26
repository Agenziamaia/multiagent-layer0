import json
import os

# DEFINITIVE CONFIGURATION
CONFIG = {
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "maia",
  "model": "zai-coding-plan/glm-4.7",
  "permission": {
    "edit": "allow",
    "bash": "allow",
    "write": "allow",
    "webfetch": "allow"
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
      "npm": "@ai-sdk/openai-compatible",
      "name": "Gemini Engine (Zai Proxy)",
      "options": {
        "baseURL": "https://api.z.ai/api/v1",
        "apiKey": "env:ZAI_API_KEY"
      },
      "models": {
        "gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "gemini-2.5-flash": { "name": "Gemini 2.5 Flash" }
      }
    },
    "opencode": {
      "npm": "@ai-sdk/openai",
      "name": "OpenCode Models (Google Key)",
      "options": {
        "apiKey": "env:GOOGLE_API_KEY"
      },
      "models": {
        "big-pickle": { "name": "Big Pickle" },
        "gpt-5-nano": { "name": "GPT 5 Nano" }
      }
    },
    "openrouter_direct": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenRouter Direct",
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
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "git": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-git"]
    },
    "vibekanban": {
      "type": "local",
      "command": ["npx", "-y", "vibe-kanban@latest", "--mcp"]
    }
  },
  "agent": {
    "maia": {
      "description": "THE ORCHESTRATOR. Strategic planner.",
      "model": "zai-coding-plan/glm-4.7",
      "fallback_models": ["opencode/big-pickle", "google/gemini-2.5-flash"],
      "mode": "primary",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True }
    },
    "coder": {
        "description": "THE ARCHITECT. Coding Powerhouse.",
        "model": "zai-coding-plan/glm-4.7",
        "fallback_models": ["opencode/big-pickle", "google/gemini-2.5-pro"],
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True }
    },
    "giuzu": {
        "description": "THE DIGITAL CLONE.",
        "model": "opencode/big-pickle",
        "fallback_models": ["zai-coding-plan/glm-4.7"],
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True }
    },
    "researcher": {
        "description": "THE ORACLE.",
        "model": "google/gemini-2.5-pro",
        "fallback_models": ["zai-coding-plan/glm-4.7", "opencode/big-pickle"],
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True }
    },
    "explore": {
        "description": "THE SCOUT.",
        "model": "opencode/gpt-5-nano",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True }
    },
    "ops": {
        "description": "INFRASTRUCTURE GOD.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True }
    }
  },
  "command": {
    "init": { "template": "Initialize Reality.", "agent": "maia" },
    "plan": { "template": "Strategic Initiative: \"$ARGUMENTS\".", "agent": "maia" },
    "audit": { "template": "Audit quality.", "agent": "coder" },
    "clone": { "template": "Clone Consultation: \"$ARGUMENTS\".", "agent": "giuzu" }
  }
}

paths = [
    "/Users/g/Desktop/MAIA opencode/opencode.json",
    "/Users/g/Desktop/multiagent-layer0/opencode.json",
    "/Users/g/Desktop/MAIA_Layer0/opencode.json"
]

for p in paths:
    if os.path.exists(os.path.dirname(p)):
        with open(p, "w") as f:
            json.dump(CONFIG, f, indent=2)
        print(f"✅ Final Sync to: {p}")
