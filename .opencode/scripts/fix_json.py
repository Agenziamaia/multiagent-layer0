#!/usr/bin/env python3
import json

path = "/Users/g/Desktop/multiagent-layer0/opencode.json"
with open(path, "r") as f:
    # Read the file and add the missing brace if needed
    content = f.read().strip()
    if not content.endswith("}"):
        content += "\n}"
    
    # Try to parse to see if it's valid now
    try:
        data = json.loads(content)
        print("✅ JSON is valid!")
        with open(path, "w") as fw:
            json.dump(data, fw, indent=2)
    except json.JSONDecodeError as e:
        print(f"❌ Still invalid: {e}")
