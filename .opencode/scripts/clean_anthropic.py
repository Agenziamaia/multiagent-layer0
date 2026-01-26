import json
import os

paths = [
    "/Users/g/Desktop/MAIA opencode/opencode.json",
    "/Users/g/Desktop/multiagent-layer0/opencode.json",
    "/Users/g/Desktop/MAIA_Layer0/opencode.json"
]

def clean_json(data):
    if isinstance(data, dict):
        return {k: clean_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_json(x) for x in data if not (isinstance(x, str) and "anthropic" in x)]
    else:
        return data

for path in paths:
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                content = f.read()
                # If JSON is already broken by sed, we might need to repair it manually first
                # But let's try to load it. If it fails, we'll try a regex cleanup.
            
            try:
                data = json.loads(content)
            except json.JSONDecodeError:
                # Basic cleaning for common sed-breakage: trailing commas in arrays/objects
                import re
                content = re.sub(r',\s*([\]}])', r'\1', content)
                content = re.sub(r'([\[{])\s*,', r'\1', content)
                data = json.loads(content)
            
            cleaned = clean_json(data)
            with open(path, "w") as f:
                json.dump(cleaned, f, indent=2)
            print(f"✅ Cleaned {path}")
        except Exception as e:
            print(f"❌ Failed to fix {path}: {e}")
