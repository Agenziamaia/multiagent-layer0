---

description: Learning Task for Giuzu Digital Clone
agent: giuzu
prompt: |

# LEARNING TASK: Pattern Recognition & Style Mirroring

## What to Learn

Analyze the MAIA ecosystem codebase comprehensively to:

1. **Identify patterns** - Find recurring code patterns, abstractions, naming conventions
2. **Mirror style** - Learn how MAIA agents write code (emoji usage, comment density, voice)
3. **Document structure** - Understand file organization, import patterns, module boundaries

## Scope

- **Target**: `/Users/g/Desktop/multiagent-layer0/` (entire project)
- **Duration**: Medium-depth analysis (not quick surface scan)
- **Focus areas**:
  - Engineering standards across agents (coder.md, reviewer.md, researcher.md)
  - File organization patterns (src/, components/, utils/, types/)
  - Testing philosophy and implementation patterns
  - MAIA orchestration patterns (session tool usage, Kanban workflow)

## What to Deliver

### Pattern Recognition Report

Document all recurring patterns with:

- Pattern name
- Occurrence count
- Examples (file:line references)
- Assessment (consistent vs. inconsistent)
- Recommendation

### Style Mirror Analysis

Analyze and document:

- Emoji usage patterns (which emojis used where, emoji frequency)
- Comment density (minimal vs. verbose)
- Voice/tone patterns (authoritative vs. conversational)
- Section organization (headings, bullet lists, code blocks)

### Structure Understanding

Map the codebase structure:

- Top-level organization (AGENTS.md, package.json, .opencode/)
- Agent-specific files (.opencode/agents/\*.md)
- Project structure (src/, components/, tests/, docs/)
- Module boundaries and separation of concerns

### Capability Recommendations

Based on patterns found, suggest:

- 1-3 capability improvements (architectural, testing, or code quality)
- Pattern library creation for future consistency
- Style guide recommendations if inconsistencies exist
- Anti-slop enforcement opportunities

## Learning Constraints

- **NO IMPLEMENTATION**: You are a learning system. Generate insights and tasks, NOT code.
- **PATTERN ACCURACY**: Only identify patterns that actually exist. Don't hallucinate.
- **STYLE CONGRUENCE**: When suggesting improvements, match observed style. Don't impose your own.
- **KANBAN-AWARE**: Create Vibe Kanban tasks for actionable improvement suggestions.

## Success Criteria

A successful learning task delivers:

- [ ] Comprehensive pattern database (12+ patterns identified)
- [ ] Style mirror report (emoji, voice, structure documented)
- [ ] Structure analysis documented
- [ ] Actionable capability recommendations (2-3 items)
- [ ] Vibe Kanban tasks created for prioritized improvements
