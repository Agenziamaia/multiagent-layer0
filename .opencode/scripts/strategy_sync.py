import json
import os

# DEFINITIVE STRATEGY SYNC (14-AGENT MASTER CONFIG)
# This script ensures opencode.json has the FULL roster with correct models.

def restore_architecture():
    base_dir = "/Users/g/Desktop/MAIA opencode"
    
    CONFIG = {
      "$schema": "https://opencode.ai/config.json",
      "default_agent": "maia",
      "model": "zai-coding-plan/glm-4.7",
      "permission": { "edit": "allow", "bash": "allow", "write": "allow", "webfetch": "allow" },
      "provider": {
        "zai-coding-plan": { "npm": "@ai-sdk/openai-compatible", "name": "Z.ai Paid Coding Plan", "options": { "baseURL": "https://api.z.ai/api/coding/paas/v4" } },
        "google": { "npm": "@ai-sdk/google", "name": "Gemini Engine (Native)" },
        "opencode": { "name": "OpenCode Models" },
        "openrouter": { "npm": "@ai-sdk/openai-compatible", "name": "OpenRouter Global", "options": { "baseURL": "https://openrouter.ai/api/v1" } }
      },
      "mcp": {
        "filesystem": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."] },
        "git": { "type": "local", "command": ["npx", "-y", "@modelcontextprotocol/server-git"] },
        "vibekanban": { "type": "local", "command": ["npx", "-y", "vibe-kanban@latest", "--mcp"] }
      },
      "agent": {
        "maia": { "description": "Orchestrator.", "model": "zai-coding-plan/glm-4.7", "mode": "primary", "tools": { "vibekanban_*": True, "session": True, "read": True, "write": True, "bash": True, "skill": True, "grep": True, "glob": True } },
        "sisyphus": { "description": "Project Manager.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "vibekanban_*": True, "session": True, "read": True, "write": True, "grep": True, "skill": True, "todoread": True, "todowrite": True } },
        "coder": { "description": "LSP Architect.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "filesystem_*": True, "git_*": True, "patch": True, "edit": True, "write": True, "read": True, "lsp": True, "bash": True, "skill": True } },
        "ops": { "description": "Infra & Scripts.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "bash": True, "read": True, "write": True, "edit": True, "webfetch": True, "skill": True } },
        "researcher": { "description": "Deep Intel.", "model": "google/gemini-2.5-pro", "mode": "subagent", "tools": { "webfetch": True, "read": True, "grep": True, "skill": True, "glob": True } },
        "researcher_fast": { "description": "Flash Oracle.", "model": "google/gemini-2.5-flash", "mode": "subagent", "tools": { "webfetch": True, "read": True, "skill": True } },
        "giuzu": { "description": "Reasoning Clone.", "model": "openrouter/deepseek/deepseek-r1:free", "mode": "subagent", "tools": { "read": True, "write": True, "session": True, "skill": True } },
        "vision": { "description": "Native Vision.", "model": "google/gemini-2.0-flash", "mode": "subagent", "tools": { "read": True, "webfetch": True, "session": True } },
        "reviewer": { "description": "Logic Audit.", "model": "zai-coding-plan/glm-4.7", "mode": "subagent", "tools": { "read": True, "grep": True, "lsp": True, "skill": True } },
        "workflow": { "description": "Automations.", "model": "openrouter/qwen/qwen-2.5-coder-32b-instruct", "mode": "subagent", "tools": { "read": True, "write": True, "bash": True, "skill": True } },
        "opencode": { "description": "Platform Oracle.", "model": "google/gemini-2.5-flash", "mode": "subagent", "tools": { "read": True, "write": True, "bash": True, "webfetch": True, "skill": True } },
        "starter": { "description": "Bootstrapper.", "model": "google/gemini-2.5-flash", "mode": "subagent", "tools": { "read": True, "write": True, "bash": True, "skill": True } },
        "librarian": { "description": "Success Curator.", "model": "google/gemini-2.5-flash", "mode": "subagent", "tools": { "read": True, "write": True, "skill": True, "glob": True } },
        "maia_premium": { "description": "Supreme Arbiter.", "model": "google/gemini-2.5-pro", "mode": "subagent", "tools": { "read": True, "session": True, "write": True } }
      }
    }
    
    with open(os.path.join(base_dir, "opencode.json"), "w") as f:
        json.dump(CONFIG, f, indent=2)
    print("✅ 14-Agent Universe Synced")

if __name__ == "__main__":
    restore_architecture()
