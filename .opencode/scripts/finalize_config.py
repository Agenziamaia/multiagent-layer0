import json
import os

paths = [
    "/Users/g/Desktop/MAIA opencode/opencode.json",
    "/Users/g/Desktop/multiagent-layer0/opencode.json",
    "/Users/g/Desktop/MAIA_Layer0/opencode.json"
]

def finalize_config(path):
    if not os.path.exists(path): return
    with open(path, "r") as f:
        data = json.load(f)
    
    # ENSURE PLUGINS ARE GONE (THEY CAUSE PHANTOM ANTHROPIC CALLS)
    if "plugin" in data:
        del data["plugin"]
    
    # ENSURE PROVIDERS EXIST
    if "provider" not in data:
        data["provider"] = {}
    
    # Strategic Sync
    PRIMARY = "zai-coding-plan/glm-4.7"
    RESEARCH = "google_direct/gemini-2.5-pro"
    SPECIALIST = "opencode/big-pickle"
    UTILITY = "opencode/gpt-5-nano"
    
    for name, agent in data.get("agent", {}).items():
        if name in ["maia", "sisyphus", "coder", "frontend", "ops", "workflow", "opencode", "starter", "maia_premium", "github"]:
            agent["model"] = PRIMARY
        elif name in ["researcher", "librarian", "vision", "researcher_fast"]:
            agent["model"] = RESEARCH
        elif name in ["giuzu", "oracle", "reviewer"]:
            agent["model"] = SPECIALIST
        elif name == "explore":
            agent["model"] = UTILITY
            
        # Robust fallbacks
        agent["fallback_models"] = [PRIMARY, SPECIALIST] if agent["model"] != PRIMARY else [SPECIALIST, "google_direct/gemini-2.5-flash"]

    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"✅ Finalized and De-Plugined: {path}")

for p in paths:
    finalize_config(p)
