import json
import os

# ULTIMATE HIGH-AGENCY AGENT CONFIGURATION 2026-01-26
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
      "npm": "@ai-sdk/openai-compatible",
      "name": "Gemini Engine (Zai Key)",
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
      "name": "Zen Ecosystem (Google Key)",
      "options": { "apiKey": "env:GOOGLE_API_KEY" },
      "models": {
        "big-pickle": { "name": "Big Pickle (Reasoning)" },
        "gpt-5-nano": { "name": "GPT-5 Nano (Utility)" }
      }
    },
    "zai-coding-plan": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Z.ai Paid Coding Plan",
      "options": {
        "baseURL": "https://api.z.ai/api/coding/paas/v4",
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
    # --- MAIA STRATEGIC CORE (Architecture & Intelligence) ---
    "maia": {
      "description": "THE SINGULARITY ORCHESTRATOR. High-agency strategic mapping and multi-agent synergy. Commands @coder, @ops, and @giuzu.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { 
        "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
        "todowrite": True, "todoread": True, "question": True, "webfetch": True, 
        "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True 
      }
    },
    "coder": {
        "description": "THE ARCHITECT. God-Tier Synthesis and Refactoring. Specialized in complex code generation and LSP-driven audits.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { 
            "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
            "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, 
            "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True 
        }
    },
    "giuzu": {
        "description": "THE LOGICAL CLONE. Giulio's Logical Mirror. Specializes in deductive reasoning, personality mirroring, and creative problem solving.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { 
            "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
            "todowrite": True, "todoread": True, "question": True, "webfetch": True, 
            "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True 
        }
    },
    "ops": {
        "description": "THE INFRASTRUCTURE GOD. Master of sustainability, Docker, and CI/CD pipelines. Full system authority.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { 
            "read": True, "grep": True, "glob": True, "list": True, "write": True, 
            "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True 
        }
    },
    "opencode": {
        "description": "THE META MANAGER. Self-referential evolution specialist. Manages agent configs, tool assignments, and skill evolution.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "write": True, "edit": True, "bash": True, "vibekanban_*": True }
    },

    # --- SISYPHUS EXECUTION LOOP (Context & Lifecycle) ---
    "sisyphus": {
      "description": "THE PROJECT COORDINATOR. High-agency lifecycle management. Orchestrates @researcher, @librarian, and @reviewer through Kanban loops.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { 
          "read": True, "grep": True, "glob": True, "list": True, "skill": True, 
          "todowrite": True, "todoread": True, "question": True, "webfetch": True, 
          "session": True, "vibekanban_*": True 
      }
    },
    "researcher": {
        "description": "THE ORACLE. Intelligence reconnaissance and deep data ingestion. Specializes in the 1M+ context synthesis of documentation.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "librarian": {
        "description": "THE ARCHIVIST. Specialist in long-memory retrieval, RAG prep, and documentation indexing for @sisyphus.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER. Strict logic verification and code safety auditor. Ensures high production standards before merge.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True }
    },
    "explore": {
        "description": "THE SCOUT. Rapid reconnaissance and high-speed structural discovery of codebases.",
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
        print(f"✅ Ultimate High-Agency Sync: {p}")
