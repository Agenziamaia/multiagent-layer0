import json
import os

paths = [
    "/Users/g/Desktop/MAIA opencode/opencode.json",
    "/Users/g/Desktop/multiagent-layer0/opencode.json",
    "/Users/g/Desktop/MAIA_Layer0/opencode.json"
]

# Strategic Model Assignment
PRIMARY_MODEL = "zai-coding-plan/glm-4.7"
RESEARCH_MODEL = "google_direct/gemini-2.5-pro"
VISION_MODEL = "google_direct/gemini-2.5-flash"
SPECIALIST_MODEL = "opencode/big-pickle"
UTILITY_MODEL = "opencode/gpt-5-nano"

FALLBACKS = [PRIMARY_MODEL, SPECIALIST_MODEL]

def overhaul_agents(data):
    if "agent" in data:
        for name, agent in data["agent"].items():
            # Force Primary for workhorses
            if name in ["maia", "sisyphus", "coder", "frontend", "ops", "workflow", "opencode", "starter", "maia_premium"]:
                agent["model"] = PRIMARY_MODEL
            # Force Research/Vision
            elif name in ["researcher", "librarian", "vision", "researcher_fast"]:
                agent["model"] = RESEARCH_MODEL if "flash" not in name else VISION_MODEL
            # Force Specialists
            elif name in ["giuzu", "oracle", "reviewer"]:
                agent["model"] = SPECIALIST_MODEL
            # Utility
            elif name == "explore":
                agent["model"] = UTILITY_MODEL
            
            # Clean up fallbacks
            agent["fallback_models"] = [f for f in FALLBACKS if f != agent["model"]]
            
    # Remove plugins for now to stabilize
    if "plugin" in data:
        data["plugin"] = []
        
    return data

for path in paths:
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                data = json.load(f)
            
            overhauled = overhaul_agents(data)
            
            with open(path, "w") as f:
                json.dump(overhauled, f, indent=2)
            print(f"🚀 Overhauled {path}")
        except Exception as e:
            print(f"❌ Failed to overhaul {path}: {e}")
