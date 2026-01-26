import json
import os

# DATA RECOVERY: STRIPPING PROJECT PROVIDERS TO RESTORE NATIVE FUNCTIONALITY
# WITH USER'S KEY-MAPPING OVERRIDES.

paths = [
    "/Users/g/Desktop/MAIA opencode/opencode.json",
    "/Users/g/Desktop/multiagent-layer0/opencode.json",
    "/Users/g/Desktop/MAIA_Layer0/opencode.json"
]

def restore_native_with_remap(path):
    if not os.path.exists(path): return
    with open(path, "r") as f:
        data = json.load(f)
    
    # 1. REMOVE CUSTOM PROVIDER BLOCKS (Let Native handle it)
    # BUT keep the overrides for key-mapping as requested by user.
    data["provider"] = {
        "google": {
            "options": {
                "apiKey": "env:ZAI_API_KEY"
            }
        },
        "opencode": {
            "options": {
                "apiKey": "env:GOOGLE_API_KEY"
            }
        },
        "openrouter": {
            "options": {
                "apiKey": "env:OPENROUTER_API_KEY"
            }
        }
    }
    
    # 2. ASSIGN AGENTS (Based on Approved MODELS.md strategy)
    PRIMARY = "zai-coding-plan/glm-4.7"
    RESEARCH = "google/gemini-2.5-pro"
    SPECIALIST = "opencode/big-pickle"
    UTILITY = "opencode/gpt-5-nano"
    
    if "agent" in data:
        for name, agent in data["agent"].items():
            if name in ["maia", "sisyphus", "coder", "frontend", "ops", "workflow", "opencode", "starter", "maia_premium"]:
                agent["model"] = PRIMARY
            elif name in ["researcher", "librarian", "vision", "researcher_fast"]:
                agent["model"] = RESEARCH
            elif name in ["giuzu", "oracle", "reviewer"]:
                agent["model"] = SPECIALIST
            elif name == "explore":
                agent["model"] = UTILITY
            
            agent["fallback_models"] = [PRIMARY, SPECIALIST] if agent["model"] != PRIMARY else [SPECIALIST]

    # 3. ENSURE NO PLUGINS (Stability)
    if "plugin" in data:
        del data["plugin"]

    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"🔄 Native Restore & Remap: {path}")

for p in paths:
    restore_native_with_remap(p)
