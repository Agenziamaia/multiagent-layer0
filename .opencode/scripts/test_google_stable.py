#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def test_google_stable():
    env_path = ".env"
    api_key = os.environ.get("GEMINI_API_KEY")
    
    if not api_key:
        if os.path.exists(env_path):
            with open(env_path) as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        api_key = line.strip().split("=", 1)[1]
                        break
    
    # Model: Gemini Flash Latest (Stable)
    model = "gemini-flash-latest" 
    # Or "gemini-1.5-flash" if mapped
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    
    print(f"🧪 Testing {model}...")
    
    data = {
        "contents": [{
            "parts": [{"text": "Reply with JSON: {\"status\": \"ok\"}"}]
        }]
    }
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"✅ {model} Response Received!")
            print(result)
            
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_google_stable()
