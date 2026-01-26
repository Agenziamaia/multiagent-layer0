#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def test_google():
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
        
    print(f"🔑 Gemini Key: {api_key[:5]}...{api_key[-4:]}")
    
    # Google AI Studio API Endpoint (v1beta)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={api_key}"
    
    data = {
        "contents": [{
            "parts": [{"text": "Reply with JSON: {\"status\": \"ok\"}"}]
        }]
    }
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("✅ Gemini Response Received:")
            print(json.dumps(result, indent=2))
            print("🎉 NATIVE GOOGLE TEST PASSED")
            
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_google()
