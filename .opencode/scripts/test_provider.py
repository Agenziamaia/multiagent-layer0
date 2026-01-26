#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def test_openrouter():
    # Load .env manually if needed, or rely on environment
    env_path = ".env"
    api_key = os.environ.get("OPENROUTER_API_KEY")
    
    if not api_key and os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("OPENROUTER_API_KEY="):
                    api_key = line.strip().split("=", 1)[1]
                    break
    
    if not api_key:
        print("❌ OPENROUTER_API_KEY not found in env or .env")
        sys.exit(1)
        
    print(f"🔑 Key found: {api_key[:5]}...{api_key[-4:]}")
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "OpenCode Test"
    }
    
    # Test Payload (Gemini Flash)
    data = {
        "model": "google/gemini-2.0-flash-exp:free",
        "messages": [
            {"role": "user", "content": "Return the JSON object {\"status\": \"ok\"}. Do not explain."}
        ]
    }
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("✅ OpenRouter Response Received:")
            print(json.dumps(result, indent=2))
            
            if 'choices' in result and len(result['choices']) > 0:
                print("\nContent:", result['choices'][0]['message']['content'])
                print("🎉 E2E TEST PASSED")
            else:
                print("⚠️ Valid response but no choices?")
                
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.read().decode('utf-8')}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_openrouter()
