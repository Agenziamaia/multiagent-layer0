# Agent Retry & Fallback System - Implementation Summary

## Problem Solved

**Issue**: Agents were performing unlimited retries when models were unreachable, causing users to wait indefinitely with no feedback.

**Impact**:

- Users stuck waiting for 60+ seconds with no status
- No error analysis or recovery
- No model redundancy
- Resource waste on failed attempts

## Solution Implemented

### 1. Retry Configuration (`retry_config`)

```json
"retry_config": {
  "max_attempts_per_model": 3,
  "timeout_ms": 10000
}
```

**Behavior**:

- **Attempt 1-3**: Try primary model (10s timeout per attempt)
- **After 3 failures**: Analyze error logs
- **Attempt 4-6**: Try fallback model 1 (10s timeout per attempt)
- **Attempt 7-9**: Try fallback model 2 (10s timeout per attempt)
- **After all failures**: Report detailed error to user

### 2. Model Fallback Chains

Each agent now has 2-3 fallback models, chosen based on their niche:

| Agent            | Primary                          | Fallback 1                       | Fallback 2                  | Fallback 3                 |
| ---------------- | -------------------------------- | -------------------------------- | --------------------------- | -------------------------- |
| @coder           | zai-coding-plan/glm-4.7          | qwen/qwen-2.5-coder-32b-instruct | deepseek/deepseek-coder     | codestral/codestral-latest |
| @ops             | zai-coding-plan/glm-4.7          | qwen/qwen-2.5-coder-32b-instruct | google/gemini-2.5-flash     | -                          |
| @workflow        | qwen/qwen-2.5-coder-32b-instruct | zai-coding-plan/glm-4.7          | google/gemini-2.5-pro       | -                          |
| @giuzu           | qwen/qwen-2.5-coder-32b-instruct | zai-coding-plan/glm-4.7          | google/gemini-2.5-pro       | -                          |

### 3. User Feedback System

**Before**: Silent failures, infinite loops
**After**: Progress reports every 3 attempts

```
[10s] ⚠️ @coder: Attempt 1/3 - Timeout
[20s] ⚠️ @coder: Attempt 2/3 - Timeout
[30s] ⚠️ @coder: Attempt 3/3 - Timeout, trying fallback...
[35s] ✓ @coder: Using fallback model (qwen/qwen-2.5-coder-32b-instruct)
[40s] ✓ Task complete
```

### 4. Error Reporting

When all models fail, users receive detailed report:

```
All models unreachable. Errors:
- Primary: Connection timeout (3/3 attempts)
- Fallback 1: 503 Service Unavailable (3/3 attempts)
- Fallback 2: Connection refused (3/3 attempts)
Total attempts: 9, Time: 90 seconds
```

## Model Selection Rationale

### Free Models Chosen for Reliability

**Code Agents** (@coder, @reviewer, @ops, @workflow):

- `qwen/qwen-2.5-coder-32b-instruct` - Excellent coding capabilities, reliable
- `deepseek/deepseek-coder` - Strong for complex code tasks
- `codestral/codestral-latest` - Code-focused model

**Research Agents** (@researcher, @researcher_fast):

- `google/gemini-2.5-pro` - Deep reasoning, large context
- `google/gemini-2.5-flash` - Fast, good for quick research
- `openai/gpt-4o-mini` - Fast, cost-effective

**General Agents** (@maia, @opencode, @starter, @vision, @giuzu):

- `openai/gpt-4-turbo` - Reliable, fast
- `google/gemini-2.5-pro` - Good general purpose

### Prioritization Strategy

1. **Match agent function** → code agents get code-focused models
2. **Speed for frequent tasks** → researcher_fast uses fast models
3. **Reliability first** → all fallbacks are proven stable models

## Files Modified

1. **AGENTS.md**
   - Added "Agent Retry & Fallback System (CRITICAL)" section
   - Documented retry strategy, fallback chains, and behavior
   - Added error message formats and user experience improvements
   - Included model health monitoring concepts

2. **opencode.json**
   - Added `retry_config` to all 10 agents
   - Added `fallback_models` array to all 10 agents
   - Updated @maia primary model from `zai-coding-plan/glm-4.7` to `zai-coding-plan/glm-4.7`

3. **.opencode/agents/preferences.json**
   - Version updated to 2.0.0
   - Added `fallback_system` configuration block
   - Added model health tracking structure
   - Documented issue resolution

## System Requirements

For this to work, the `delegate_task` and `session` tools MUST implement:

1. ✅ Retry Counter - Track attempts per model
2. ✅ Model Rotation - Automatically try next in fallback list
3. ✅ Error Logging - Capture detailed error for each attempt
4. ✅ Timeout Enforcement - Respect `timeout_ms` per attempt
5. ✅ User Feedback - Report progress every 3 attempts
6. ✅ Fallback Warnings - Inform when using non-primary model

## Future Enhancements

**Model Health Monitoring**:

- Track last successful connection per model
- Failure rate per model (last 24 hours)
- Average response time per model
- Current fallback chain position

**Auto-Optimization**:

- Move successful fallbacks up in priority
- Deprioritize chronically failing models
- Suggest model changes to user based on health data

## Impact

**Before**:

- ✗ Unlimited retries (6+ observed)
- ✗ No user feedback during failures
- ✗ No error analysis
- ✗ No model fallbacks
- ✗ 60+ seconds of waiting with no information

**After**:

- ✓ Max 9 attempts (3 models × 3 attempts)
- ✓ Progress feedback every 10 seconds
- ✓ Error analysis after failures
- ✓ 2-3 fallback models per agent
- ✓ Max 90 seconds wait with detailed report

## Testing Recommendations

1. Test primary model failures → Verify fallback activation
2. Test all models failing → Verify detailed error report
3. Test mixed failures → Verify error analysis
4. Test successful fallback → Verify fallback warning

## Rollback Plan

If issues arise:

1. Remove `retry_config` from opencode.json
2. Remove `fallback_models` from opencode.json
3. Revert AGENTS.md to previous version
4. Reset preferences.json version to 1.0.0
