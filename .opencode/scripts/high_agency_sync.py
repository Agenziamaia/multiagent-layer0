import json
import os

# DEFINITIVE HIGH-AGENCY AGENT CONFIGURATION 2026-01-26
# Split by Strategic Core (MAIA) and Execution Loop (SISYPHUS)
CONFIG = {
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "maia",
  "model": "zai-coding-plan/glm-4.7",
  "permission": {
    "edit": "allow", "bash": "allow", "write": "allow", "webfetch": "allow"
  },
  "provider": {
    "google-proxy": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Gemini via Zai Plan",
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
      "options": { "apiKey": "env:GOOGLE_API_KEY" }
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
      "description": "THE SINGULARITY ORCHESTRATOR. Strategic planning and multi-agent synergy.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { 
        "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
        "todowrite": True, "todoread": True, "question": True, "webfetch": True, 
        "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True 
      }
    },
    "coder": {
        "description": "THE ARCHITECT. God-Tier Synthesis. Specializes in production environments and complex refactoring.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { 
            "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
            "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, 
            "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True 
        }
    },
    "giuzu": {
        "description": "THE LOGICAL CLONE. Giulio's mirror. Deep deduction, pattern replication, and creative logic.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { 
            "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
            "todowrite": True, "todoread": True, "question": True, "webfetch": True, 
            "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True 
        }
    },
    "ops": {
        "description": "THE INFRASTRUCTURE GOD. Master of deployments, Docker, and system reliability.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { 
            "read": True, "grep": True, "glob": True, "list": True, "write": True, 
            "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True 
        }
    },
    "opencode": {
        "description": "THE META MANAGER. Self-referential agent for ecosystem tuning and config evolution.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "write": True, "edit": True, "bash": True, "vibekanban_*": True }
    },

    # --- SISYPHUS EXECUTION LOOP ---
    "sisyphus": {
      "description": "THE PROJECT COORDINATOR. Lifecycle management, task tracking, and departmental delegation.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { 
          "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
          "todowrite": True, "todoread": True, "question": True, "webfetch": True, 
          "session": True, "vibekanban_*": True 
      }
    },
    "researcher": {
        "description": "THE ORACLE. Intelligence gatherer. Specializes in deep documentation analysis.",
        "model": "google-proxy/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "librarian": {
        "description": "THE ARCHIVIST. Specialist in knowledge storage, RAG preparation, and info retrieval.",
        "model": "google-proxy/gemini-2.0-flash",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER. Audit specialist. Zero-mercy code review and logic verification.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True }
    },
    "explore": {
        "description": "THE SCOUT. Rapid reconnaissance and high-speed file discovery.",
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
        print(f"✅ High-Agency Sync: {p}")
