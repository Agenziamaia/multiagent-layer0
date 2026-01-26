import os
import re

roots = [
    "/Users/g/Desktop/MAIA opencode/",
    "/Users/g/Desktop/multiagent-layer0/",
    "/Users/g/Desktop/MAIA_Layer0/",
    "/Users/g/.config/opencode/"
]

REPLACEMENTS = {
    r"anthropic/claude-opus-4-5": "zai-coding-plan/glm-4.7",
    r"anthropic/claude-3\.5-sonnet": "zai-coding-plan/glm-4.7",
    r"anthropic/claude-3-haiku": "zai-coding-plan/glm-4.7",
    r"openai/gpt-5\.2": "zai-coding-plan/glm-4.7",
    r"openschills": "openskills", # Fix potential typos
}

def clean_file(path):
    if not os.path.isfile(path): return
    if any(p in path for p in ["node_modules", ".git", "bin"]): return
    if not (path.endswith(".json") or path.endswith(".jsonc") or path.endswith(".md") or path.endswith(".ts") or path.endswith(".js")): return

    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        original = content
        for pattern, replacement in REPLACEMENTS.items():
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        
        # Surgical: if we still see the literal string "anthropic" in a model field
        content = re.sub(r'"model":\s*"anthropic/.*?"', f'"model": "zai-coding-plan/glm-4.7"', content)
        
        if content != original:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"✨ Purged Anthropic/GPT placeholders from: {path}")
    except:
        pass

for root in roots:
    print(f"🔍 Scanning {root}...")
    for r, d, f in os.walk(root):
        for file in f:
            clean_file(os.path.join(r, file))

print("🏁 Final Model Cleanse Complete.")
