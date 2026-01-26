import json
import os

# ULTIMATE ECOSYSTEM SYNC: ALL AGENTS + VIBE KANBAN R/W + HARDWARE MAPPING
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
      "options": {
        "baseURL": "https://api.z.ai/api/v1",
        "apiKey": "env:ZAI_API_KEY"
      }
    },
    "opencode": {
      "options": { "apiKey": "env:GOOGLE_API_KEY" }
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
      "description": "THE ORCHESTRATOR. Global Singularity Strategy.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "primary",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "sisyphus": {
      "description": "THE PROJECT MANAGER. Execution coordinator for complex loops.",
      "model": "zai-coding-plan/glm-4.7",
      "mode": "subagent",
      "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "coder": {
        "description": "THE ARCHITECT. Building core production reality.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "write": True, "edit": True, "patch": True, "bash": True, "lsp": True, "git_*": True, "filesystem_*": True, "session": True, "vibekanban_*": True }
    },
    "giuzu": {
        "description": "THE DIGITAL CLONE. Giulio's logic and personality mirror.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "todowrite": True, "todoread": True, "question": True, "webfetch": True, "write": True, "edit": True, "bash": True, "session": True, "vibekanban_*": True }
    },
    "researcher": {
        "description": "THE ORACLE. Deep data synthesis and context ingestion.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "skill": True, "webfetch": True, "question": True, "session": True, "vibekanban_*": True }
    },
    "librarian": {
        "description": "THE ARCHIVIST. Sisyphus's knowledge base and documentation lead.",
        "model": "google/gemini-2.5-pro",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "webfetch": True, "session": True, "vibekanban_*": True }
    },
    "reviewer": {
        "description": "THE GATEKEEPER. Audit, quality control, and logic verification.",
        "model": "opencode/big-pickle",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "lsp": True, "session": True, "vibekanban_*": True }
    },
    "opencode": {
        "description": "THE META MANAGER. Ecosystem configuration and agent tuning.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "write": True, "edit": True, "bash": True, "vibekanban_*": True }
    },
    "explore": {
        "description": "THE SCOUT. Fast recon and file exploration.",
        "model": "opencode/gpt-5-nano",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "vibekanban_*": True }
    },
    "ops": {
        "description": "INFRASTRUCTURE GOD. System stability and deployment pipelines.",
        "model": "zai-coding-plan/glm-4.7",
        "mode": "subagent",
        "tools": { "read": True, "grep": True, "glob": True, "list": True, "write": True, "edit": True, "bash": True, "webfetch": True, "session": True, "vibekanban_*": True }
    }
  },
  "command": {
    "init": { "template": "Initialize Reality.", "agent": "maia" },
    "plan": { "template": "Strategic Initiative: \"$ARGUMENTS\".", "agent": "maia" },
    "audit": { "template": "Audit quality.", "agent": "reviewer" },
    "clone": { "template": "Clone Consultation: \"$ARGUMENTS\".", "agent": "giuzu" },
    "meta": { "template": "Analyze ecosystem config.", "agent": "opencode" }
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
        print(f"✅ ULTIMATE Ecosystem Sync: {p}")
