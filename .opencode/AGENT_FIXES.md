# 🐛 AGENT FIXES - OpenRouter Provider Issues

## Problem

Several agents failing with `ProviderModelNotFoundError` because they're configured to use **direct provider models** that need to go through **OpenRouter's** routing system, but OpenRouter is not configured for them.

## Affected Agents

| Agent     | Current Model             | Issue        | Fix                                        |
| --------- | ------------------------- | ------------ | ------------------------------------------ |
| @workflow | `qwen/qwen3-coder:free`   | Wrong format | Use OpenRouter config OR switch to GLM-4.7 |
| @giuzu    | `qwen/qwen3-coder:free`   | Wrong format | Use OpenRouter config OR switch to GLM-4.7 |
| @vision   | `google/gemini-2.5-flash` | Wrong format | Add to OpenRouter OR use working model     |
| @starter  | `google/gemini-2.5-flash` | Wrong format | Add to OpenRouter OR use GLM-4.7           |
| @reviewer | `google/gemini-2.5-pro`   | Wrong format | Add to OpenRouter OR use GLM-4.7           |
| @opencode | `google/gemini-2.5-flash` | Wrong format | Add to OpenRouter OR use GLM-4.7           |

## Option A: Configure OpenRouter

Add `openrouter` provider configuration to opencode.json:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openrouter": {
      "models": {
        "qwen/qwen3-coder:free": {
          "name": "Qwen3 Coder (Free)"
        },
        "google/gemini-2.5-flash": {
          "name": "Gemini 2.5 Flash"
        },
        "google/gemini-2.5-pro": {
          "name": "Gemini 2.5 Pro"
        }
      }
    }
  }
}
```

## Option B: Switch to Direct Provider (RECOMMENDED)

Switch broken agents to use direct providers that are working:

```json
"workflow": {
  "model": "zai-coding-plan/glm-4.7",
},
"giuzu": {
  "model": "zai-coding-plan/glm-4.7",
},
"vision": {
  "model": "zai-coding-plan/glm-4.7",
},
"starter": {
  "model": "zai-coding-plan/glm-4.7",
},
"reviewer": {
  "model": "zai-coding-plan/glm-4.7",
},
"opencode": {
  "model": "zai-coding-plan/glm-4.7",
}
```

## Working Agents (Keep As-Is)

✅ @coder - GLM-4.7 (working)
✅ @ops - GLM-4.7 (working)
✅ @researcher_fast - Gemini 2.5 Flash (working)
✅ @maia - GPT-5.2 (primary)

## Recommendation

**Option B is recommended** - Use GLM-4.7 for all broken agents since it's already proven to work.

This avoids the complexity of configuring OpenRouter routing and uses models we know work.
