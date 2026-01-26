#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def list_openrouter_models():
    url = "https://openrouter.ai/api/v1/models"
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "OpenCode-Test"})
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            print("✅ OpenRouter Models Fetched.")
            # Search for Qwen, DeepSeek, Gemini free
            search_terms = ["qwen", "deepseek", "gemini", "free"]
            
            found = []
            if 'data' in result:
                for m in result['data']:
                    mid = m['id']
                    name = m['name']
                    # Check pricing
                    prompt_price = float(m.get('pricing', {}).get('prompt', 1))
                    if prompt_price == 0:
                        is_free = True
                    else:
                        is_free = False
                        
                    # Filter relevant ones
                    if any(term in mid.lower() for term in search_terms) and is_free:
                         found.append(f"{mid} | Free: {is_free}")
            
            found.sort()
            for f in found:
                print(f)
                
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    list_openrouter_models()
