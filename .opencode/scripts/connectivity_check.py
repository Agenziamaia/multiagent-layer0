import os
import urllib.request
import json

def test_key(name, url, key, model):
    print(f"🧪 Testing {name}...")
    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }
    data = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": "hi"}],
        "max_tokens": 10
    }).encode()
    
    try:
        req = urllib.request.Request(url, data=data, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as res:
            print(f"✅ {name} Success!")
            return True
    except Exception as e:
        print(f"❌ {name} Failed: {e}")
        return False

zai_key = os.environ.get("ZAI_API_KEY")
google_key = os.environ.get("GOOGLE_API_KEY")

# 1. Test GLM 4.7 with Zai Key (Standard)
test_key("GLM 4.7 (BigModel)", "https://open.bigmodel.cn/api/paas/v4/chat/completions", zai_key, "glm-4.7")

# 2. Test GLM 4.7 with Zai Key (Zai API)
test_key("GLM 4.7 (Zai API)", "https://api.z.ai/api/coding/paas/v4/chat/completions", zai_key, "glm-4.7")

# 3. Test Gemini with Zai Key (if it's a proxy)
test_key("Gemini (via Zai Key Proxy)", "https://api.z.ai/api/coding/paas/v4/chat/completions", zai_key, "gemini-2.5-pro")

# 4. Test Gemini with Google Key (Standard)
# Note: Google API usually has a different URL format, but let's see if there's an OpenAI proxy
test_key("Gemini (Google Key proxy?)", "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", google_key, "gemini-2.5-pro")
