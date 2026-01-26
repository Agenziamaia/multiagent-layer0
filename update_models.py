import json

with open('opencode.json', 'r') as f:
    data = json.load(f)
    
working_agents = ["coder", "ops", "researcher_fast"]

openrouter_models = {
    "openai/gpt-4-turbo": {"id": "openai/gpt-4-turbo"},
    "zai-coding-plan/glm-4.7": {"id": "zai-coding-plan/glm-4.7"},
    "google/gemini-2.5-flash": {"id": "google/gemini-2.5-flash"},
    "google/gemini-2.5-pro": {"id": "google/gemini-2.5-pro"},
    "anthropic/claude-3.5-sonnet": {"id": "anthropic/claude-3.5-sonnet"}
}

for agent in working_agents:
    if agent in data['agent']:
        current = data['agent'][agent]['model']
        for model_id, model_info in openrouter_models.items():
            if model_info.get('name', '') == current:
                data['agent'][agent]['model'] = model_id
                break

json.dump(data, f, indent=2)
    print(f"{agent}: {current} -> {model_id}")
ENDPY
'