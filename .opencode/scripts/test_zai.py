#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def test_zai():
    env_path = ".env"
    api_key = os.environ.get("ZAI_API_KEY") or os.environ.get("GLM_API_KEY")
    
    if not api_key:
        if os.path.exists(env_path):
            with open(env_path) as f:
                for line in f:
                    if line.startswith("ZAI_API_KEY=") or line.startswith("GLM_API_KEY="):
                        api_key = line.strip().split("=", 1)[1]
                        break
    
    # Model: glm-4.7
    model = "glm-4.7" 
    # Or "GLM-4.7"?
    
    url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {"model": model, "messages": [{"role": "user", "content": "hi"}]}
    
    print(f"🧪 Testing Z.ai ({model})...")
    
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("✅ Z.ai Response Received!")
            print(json.dumps(result, indent=2))
            
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_zai()
