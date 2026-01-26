import json
import os

path = "/Users/g/Desktop/MAIA opencode/opencode.json"

with open(path, "r") as f:
    data = json.load(f)

# Update Agents
AGENT_MAPPING = {
    # Production Workhorses
    "maia": "zai-coding-plan/glm-4.7",
    "sisyphus": "zai-coding-plan/glm-4.7",
    "coder": "zai-coding-plan/glm-4.7",
    "frontend": "zai-coding-plan/glm-4.7",
    "ops": "zai-coding-plan/glm-4.7",
    "workflow": "zai-coding-plan/glm-4.7",
    "opencode": "zai-coding-plan/glm-4.7",
    "starter": "zai-coding-plan/glm-4.7",
    "maia_premium": "zai-coding-plan/glm-4.7",
    
    # Research & Context (using Zai key per instruction)
    "researcher": "google_direct/gemini-2.5-pro",
    "librarian": "google_direct/gemini-2.5-pro",
    "vision": "google_direct/gemini-2.5-flash",
    "researcher_fast": "google_direct/gemini-2.5-flash",
    
    # Specialists (using Google key for OpenCode models per instruction)
    "giuzu": "opencode/big-pickle",
    "oracle": "opencode/big-pickle",
    "reviewer": "opencode/big-pickle",
    
    # Utilities
    "explore": "opencode/gpt-5-nano"
}

# Apply Mapping
if "agent" in data:
    for name, agent in data["agent"].items():
        if name in AGENT_MAPPING:
            agent["model"] = AGENT_MAPPING[name]
        
        # Set standardized fallbacks
        if "google_direct" in agent["model"]:
            agent["fallback_models"] = ["zai-coding-plan/glm-4.7", "opencode/big-pickle"]
        elif "opencode" in agent["model"]:
            agent["fallback_models"] = ["zai-coding-plan/glm-4.7", "google_direct/gemini-2.5-flash"]
        else:
            agent["fallback_models"] = ["opencode/big-pickle", "google_direct/gemini-2.5-flash"]

# Restore command block agent references
if "command" in data:
    for cmd in data["command"].values():
        if cmd.get("agent") in AGENT_MAPPING:
            # Command stays linked to the agent name, model updates happen in agent block
            pass

with open(path, "w") as f:
    json.dump(data, f, indent=2)

print("🚀 Agent Model Sync Complete.")
