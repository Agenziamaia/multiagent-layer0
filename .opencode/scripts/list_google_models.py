#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def list_models():
    env_path = ".env"
    api_key = os.environ.get("GEMINI_API_KEY")
    
    if not api_key:
        if os.path.exists(env_path):
            with open(env_path) as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        api_key = line.strip().split("=", 1)[1]
                        break
    
    if not api_key:
        print("❌ GEMINI_API_KEY not found")
        sys.exit(1)
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
    
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("✅ Available Models:")
            if 'models' in result:
                for m in result['models']:
                    # Filter for 'generateContent' support
                    if 'generateContent' in m.get('supportedGenerationMethods', []):
                        print(f"  - {m['name']} ({m.get('displayName', 'No Name')})")
            else:
                print("No models found in response?")
                
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    list_models()
