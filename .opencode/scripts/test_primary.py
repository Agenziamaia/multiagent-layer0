import json
import os

def set_all_primary():
    path = "/Users/g/Desktop/MAIA opencode/opencode.json"
    with open(path, "r") as f:
        config = json.load(f)
    
    for name in config["agent"]:
        config["agent"][name]["mode"] = "primary"
    
    with open(path, "w") as f:
        json.dump(config, f, indent=2)

if __name__ == "__main__":
    set_all_primary()
    print("✅ All agents set to PRIMARY for verification")
