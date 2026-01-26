import os

# AGENT MARKDOWN FRONTMATTER PURGE
agent_paths = [
    "/Users/g/Desktop/MAIA opencode/.opencode/agents/",
    "/Users/g/Desktop/multiagent-layer0/.opencode/agents/",
    "/Users/g/Desktop/MAIA_Layer0/.opencode/agents/"
]

AGENT_MODELS = {
    "maia.md": "zai-coding-plan/glm-4.7",
    "sisyphus.md": "zai-coding-plan/glm-4.7",
    "coder.md": "zai-coding-plan/glm-4.7",
    "ops.md": "zai-coding-plan/glm-4.7",
    "researcher.md": "google/gemini-2.0-flash",
    "librarian.md": "google/gemini-1.5-pro",
    "reviewer.md": "opencode/big-pickle",
    "giuzu.md": "opencode/big-pickle",
    "explore.md": "opencode/gpt-5-nano",
    "workflow.md": "zai-coding-plan/glm-4.7",
    "opencode.md": "zai-coding-plan/glm-4.7"
}

for base in agent_paths:
    if not os.path.exists(base): continue
    for filename in os.listdir(base):
        if filename.endswith(".md"):
            path = os.path.join(base, filename)
            with open(path, "r") as f:
                content = f.read()
            
            # Use the prescribed model from the mapping if it exists
            model = AGENT_MODELS.get(filename, "zai-coding-plan/glm-4.7")
            
            import re
            # Replace any 'model: ...' line in the frontmatter
            new_content = re.sub(r'model:\s*.*', f'model: {model}', content)
            
            if new_content != content:
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"✅ Repaired Frontmatter: {path} -> {model}")
