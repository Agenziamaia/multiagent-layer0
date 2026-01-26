#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def test():
    env_path = ".env"
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key and os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("OPENROUTER_API_KEY="):
                    api_key = line.strip().split("=", 1)[1]
                    break
    
    model = "meta-llama/llama-3.3-70b-instruct:free"
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json", "HTTP-Referer": "http://localhost:3000"}
    
    data = {"model": model, "messages": [{"role": "user", "content": "hi"}]}
    
    print(f"🧪 Testing {model}...")
    try:
        req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("✅ SUCCESS!")
            print(result['choices'][0]['message']['content'])
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test()
