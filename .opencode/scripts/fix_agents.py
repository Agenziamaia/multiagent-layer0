import os
import re

agent_dirs = [
    "/Users/g/Desktop/MAIA opencode/.opencode/agents/",
    "/Users/g/Desktop/multiagent-layer0/.opencode/agents/",
    "/Users/g/Desktop/MAIA_Layer0/.opencode/agents/"
]

MODEL_MAP = {
    r"zai-coding-plan/glm-4\.7": "zai-coding-plan/glm-4.7",
    r"google/gemini-2\.5-pro": "google_direct/gemini-2.5-pro",
    r"google/gemini-2\.5-flash": "google_direct/gemini-2.5-flash",
    r"google/gemini-2\.0-flash-exp:free": "openrouter_direct/gemini-free",
    r"qwen/qwen3-coder:free": "openrouter_direct/qwen-free",
    r"deepseek/deepseek-r1-0528:free": "openrouter_direct/deepseek-free",
    r"openai/gpt-5\.2": "zai-coding-plan/glm-4.7",
    r"openai/qwen-coder": "openrouter_direct/qwen-free",
}

def fix_agent_file(path):
    with open(path, "r") as f:
        content = f.read()
    
    # Check for anthropic specifically
    if "anthropic" in content:
        # If it's a fallback or model, remove/replace
        content = re.sub(r'model:.*anthropic.*', 'model: zai-coding-plan/glm-4.7', content)
        content = re.sub(r'- anthropic/.*', '', content)

    for pattern, replacement in MODEL_MAP.items():
        # Match "model: <old>" or similar
        content = re.sub(rf"model:\s*{pattern}", f"model: {replacement}", content)
    
    with open(path, "w") as f:
        f.write(content)

for agent_dir in agent_dirs:
    if os.path.exists(agent_dir):
        for root, dirs, files in os.walk(agent_dir):
            for file in files:
                if file.endswith(".md") or file.endswith(".json"):
                    fix_agent_file(os.path.join(root, file))
        print(f"✅ Fixed agent files in {agent_dir}")
