import json
import os

# FINAL HIGH-AGENCY AGENT CONFIGURATION 2026-01-26
# Split by Strategic Architecture (MAIA) and Execution Lifecycle (SISYPHUS)
CONFIG = {
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "maia",
  "model": "zai-coding-plan/glm-4.7",
  "permission": {
    "edit": "allow", "bash": "allow", "write": "allow", "webfetch": "allow"
  },
  "provider": {
    "google": {
      "npm": "@ai-sdk/google",
      "name": "Gemini Engine (Google Key Native)",
      "options": {
        "apiKey": "env:GOOGLE_API_KEY"
      },
      "models": {
        "gemini-2.0-flash": { "name": "Gemini 2.0 Flash" },
        "gemini-1.5-pro": { "name": "Gemini 1.5 Pro" }
      }
    },
    "opencode": {
      "name": "Zen Ecosystem (Google Key)",
      "options": { "apiKey": "env:GOOGLE_API_KEY" },
      "models": {
        "big-pickle": { "name": "Big Pickle" },
        "gpt-5-nano": { "name": "GPT-5 Nano" }
      }
    },
    "zai-coding-plan": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Z.ai Paid Coding Plan",
      "options": {
        "baseURL": "https://api.z.ai/api/coding/paas/v4",
        "apiKey": "env:ZAI_API_KEY"
      }
    },
    "zai-google": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Gemini Engine (Zai Proxy)",
      "options": {
        "baseURL": "https://api.z.ai/api/v1",
        "apiKey": "env:ZAI_API_KEY"
      }
    }
  },
  "mcp": {
    "filesystem": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."] },
    "git": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-git"] },
    "vibekanban": { "type": "local", "command": ["npx", "-y", "vibe-kanban@latest", "--mcp"] }
  },
  "agent": {
    # --- MAIA STRATEGIC CORE ---
    "maia": {
      "description": "THE SINGULARITY ORCHESTRATOR. Strategic command, architecture mapping, and multi-agent synergy.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "coder": {
        "description": "THE ARCHITECT. Building production reality with God-Tier synthesis and LSP-driven audits.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True }
    },
    "ops": {
        "description": "THE INFRASTRUCTURE GOD. Deployment master. Full system authority for sustainability and CI/CD.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "giuzu": {
        "description": "THE LOGICAL CLONE. Giulio's Logical Mirror. Deduction, pattern mirroring, and specialized logic audits.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },

    # --- SISYPHUS EXECUTION LOOP ---
    "sisyphus": {
      "description": "THE PROJECT COORDINATOR. High-agency lifecycle management. Orchestrates execution streams via Kanban.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "researcher": {
        "description": "THE ORACLE. Intelligence reconnaissance. Expert in context synthesis across 1M+ tokens.",
        "model": "google/gemini-2.0-flash",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "librarian": {
        "description": "THE ARCHIVIST. Knowledge retrieval specialist. Manages RAG prep and info indexing.",
        "model": "google/gemini-1.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER. Strict logic verification and code safety auditor.",
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
        print(f"✅ Final High-Agency Sync: {p}")
