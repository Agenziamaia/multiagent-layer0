<!-- MAIA: E2E Orchestration Log Template & Example -->
<!-- This file serves as both a template and a documented example for end-to-end orchestration -->

# End-to-End Orchestration Log

**Purpose**: Document the complete lifecycle of a task from intent to delivery, showing how MAIA orchestrates multi-agent workflows with Vibe Kanban integration.

---

## 📋 Log Template

```yaml
---
metadata:
  session_id: "ses_<uuid>"
  initiated_by: "user_command" # /plan, /supercharge, /init, etc.
  initiated_at: "2026-01-22T10:30:00Z"
  project_id: "b7a06d11-3600-447f-8dbd-617b0de52e67" # example (repo-backed)
  project_name: "Multi-Agent Layer 0 v2" # example

task:
  id: "task_<uuid>"
  title: "Task Title"
  description: "Detailed task requirements..."
  status: "done" # todo | inprogress | inreview | done | cancelled
  priority: "normal" # high | normal | low
  tags: ["tag1", "tag2"]

orchestration:
  agents_involved:
    - "@maia"
    - "@researcher"
    - "@coder"
    - "@reviewer"
  workflow_type: "sequential" # sequential | parallel | hybrid
  total_duration_seconds: 3600

stages:
  - name: "planning"
    agent: "@maia"
    start_time: "2026-01-22T10:30:00Z"
    end_time: "2026-01-22T10:35:00Z"
    actions:
      - "Analyzed project structure"
      - "Created Vibe Kanban tasks"
      - "Delegated to researcher"
    kanban_updates:
      - status: "todo"
        timestamp: "2026-01-22T10:30:00Z"

  - name: "research"
    agent: "@researcher"
    start_time: "2026-01-22T10:35:00Z"
    end_time: "2026-01-22T10:50:00Z"
    mode: "message"
    handoff_to: "@maia"
    actions:
      - "Explored 3 approaches"
      - "Provided recommendation"
    artifacts:
      - type: "document"
        path: ".opencode/research/approach-analysis.md"
    recommendations: "Use X because..."

  - name: "synthesis"
    agent: "@maia"
    start_time: "2026-01-22T10:50:00Z"
    end_time: "2026-01-22T10:55:00Z"
    mode: "message"
    actions:
      - "Synthesized research findings"
      - "Created implementation spec"
      - "Handed off to coder"

  - name: "implementation"
    agent: "@coder"
    start_time: "2026-01-22T10:55:00Z"
    end_time: "2026-01-22T11:25:00Z"
    mode: "message"
    handoff_to: "@reviewer"
    kanban_updates:
      - status: "in_progress"
        timestamp: "2026-01-22T10:55:00Z"
      - status: "in_review"
        timestamp: "2026-01-22T11:25:00Z"
    actions:
      - "Read existing codebase"
      - "Implemented feature"
      - "Wrote tests"
      - "Ran build and lint"
    artifacts:
      - type: "code"
        path: "src/components/Feature.tsx"
      - type: "test"
        path: "test/Feature.test.tsx"

  - name: "review"
    agent: "@reviewer"
    start_time: "2026-01-22T11:25:00Z"
    end_time: "2026-01-22T11:30:00Z"
    mode: "message"
    actions:
      - "Code quality audit"
      - "Test coverage verification"
      - "Lint check"
    review_status: "approved" # approved | rejected | needs_changes
    findings:
      - "All tests passing"
      - "Lint clean"
      - "Type safety verified"

outcomes:
  final_status: "done"
  kanban_updates:
    - status: "done"
      timestamp: "2026-01-22T11:30:00Z"
  files_created: 5
  files_modified: 3
  tests_added: 23
  test_coverage: "94%"
  build_status: "pass"
  lint_status: "clean"

lessons_learned:
  - "Lesson 1"
  - "Lesson 2"
```

---

## 📝 Example: Counter Component Implementation

### Overview

This log documents the end-to-end orchestration of implementing a **Counter component** with React, TypeScript, and Vitest testing.

---

### Session Metadata

```yaml
metadata:
  session_id: "ses_abc123"
  initiated_by: "user_command: /plan 'Create a Counter component with increment, decrement, and reset functionality'"
  initiated_at: "2026-01-22T10:30:00Z"
  project_id: "f947a334-989d-408a-9e3c-03b73fe2f6e9"
  project_name: "Multi-Agent Layer 0"

task:
  id: "task_counter_001"
  title: "Create Counter component with increment/decrement/reset"
  description: |
    Build a reusable React Counter component with the following requirements:
    - Initial value prop (default: 0)
    - Step size prop (default: 1)
    - Increment, decrement, and reset buttons
    - Proper accessibility (aria-labels)
    - TypeScript interfaces
    - Comprehensive Vitest tests
    - Follow existing code style (see AGENTS.md)
  status: "done"
  priority: "normal"
  tags: ["react", "typescript", "component", "ui"]

orchestration:
  agents_involved:
    - "@maia"
    - "@coder"
    - "@reviewer"
  workflow_type: "sequential"
  total_duration_seconds: 1800
```

---

### Stage 1: Planning (@maia)

```yaml
stages:
  - name: "planning"
    agent: "@maia"
    start_time: "2026-01-22T10:30:00Z"
    end_time: "2026-01-22T10:32:00Z"
    actions:
      - "Read package.json to understand project stack (React + TypeScript + Vitest)"
      - "Identified build command: npm run build"
      - "Identified test command: npm test"
      - "Identified lint command: npm run lint"
      - "Created task in Vibe Kanban: 'Create Counter component'"
    kanban_updates:
      - status: "todo"
        timestamp: "2026-01-22T10:30:00Z"
```

**MAIA Decision Flow**:

1. **Stack Detection**: Read `package.json` → Confirmed React 18.2.0, TypeScript 5.2.2, Vitest 1.3.1
2. **Command Mapping**:
   - Build: `npm run build` (tsc && vite build)
   - Test: `npm test` (vitest)
   - Lint: `npm run lint` (eslint)
3. **Task Creation**: Called `vibe_kanban_create_task` with task details
4. **Handoff Decision**: No research needed for simple React component → Direct to `@coder`

---

### Stage 2: Implementation (@coder)

```yaml
- name: "implementation"
  agent: "@coder"
  start_time: "2026-01-22T10:32:00Z"
  end_time: "2026-01-22T10:57:00Z"
  mode: "message"
  handoff_to: "@reviewer"
  kanban_updates:
    - status: "in_progress"
      timestamp: "2026-01-22T10:32:00Z"
  actions:
    - "Read AGENTS.md for coding standards"
    - "Read package.json for dependencies"
    - "Implemented Counter.tsx component"
    - "Wrote Counter.test.tsx with 10 test cases"
    - "Ran npm test: 10 passing"
    - "Ran npm run lint: Clean"
    - "Updated task status to in_review"
  artifacts:
    - type: "code"
      path: ".opencode/maia-layer0/components/Counter.tsx"
      lines_of_code: 34
      complexity: "low"
    - type: "test"
      path: ".opencode/maia-layer0/test/Counter.test.tsx"
      test_count: 10
      coverage: "100%"
```

**Implementation Details**:

1. **Component Structure** (Counter.tsx):

   ```typescript
   interface CounterProps {
     initialValue?: number;
     step?: number;
   }

   export const Counter: React.FC<CounterProps> = ({
     initialValue = 0,
     step = 1,
   }) => {
     const [value, setValue] = useState(initialValue);
     // ... handlers
   };
   ```

2. **Test Coverage** (Counter.test.tsx):
   - ✅ Renders with initial value
   - ✅ Renders with default initial value of 0
   - ✅ Increments by default step of 1
   - ✅ Increments by custom step
   - ✅ Decrements by default step of 1
   - ✅ Decrements by custom step
   - ✅ Resets to initial value
   - ✅ Handles multiple increments
   - ✅ Handles multiple decrements
   - ✅ Allows negative values

3. **Code Quality Checks**:
   - ESLint: 0 warnings, 0 errors
   - TypeScript: Type-safe with interfaces
   - Accessibility: Aria-labels on all buttons
   - Style: Follows project conventions (camelCase, FC type)

---

### Stage 3: Review (@reviewer)

```yaml
- name: "review"
  agent: "@reviewer"
  start_time: "2026-01-22T10:57:00Z"
  end_time: "2026-01-22T11:00:00Z"
  mode: "message"
  actions:
    - "Code quality audit of Counter.tsx"
    - "Verified all 10 tests passing"
    - "Checked TypeScript types"
    - "Validated accessibility attributes"
    - "Confirmed ESLint compliance"
    - "Approved and moved to done"
  kanban_updates:
    - status: "done"
      timestamp: "2026-01-22T11:00:00Z"
  review_status: "approved"
  findings:
    - "✅ All tests passing (10/10)"
    - "✅ 100% code coverage"
    - "✅ Lint: Clean (0 errors, 0 warnings)"
    - "✅ TypeScript: No type errors"
    - "✅ Accessibility: Proper aria-labels"
    - "✅ Style: Follows project conventions"
  approval_comments: |
    Implementation is production-ready.
    - Code is clean and maintainable
    - Tests are comprehensive
    - Type safety is excellent
    - No issues found
```

**Review Checklist**:

- [x] Functional correctness: All features work as specified
- [x] Test coverage: 100% of component logic tested
- [x] Type safety: Proper TypeScript interfaces
- [x] Code style: Matches project conventions
- [x] Accessibility: Aria-labels on interactive elements
- [x] Best practices: React hooks used correctly
- [x] Documentation: Self-documenting code

---

### Outcomes

```yaml
outcomes:
  final_status: "done"
  kanban_updates:
    - status: "done"
      timestamp: "2026-01-22T11:00:00Z"
  files_created: 2
  files_modified: 0
  tests_added: 10
  test_coverage: "100%"
  build_status: "pass"
  lint_status: "clean"
  type_check: "pass"

artifacts_delivered:
  - component: ".opencode/maia-layer0/components/Counter.tsx"
    size_kb: 1.2
    lines: 34
    language: "TypeScript"
  - tests: ".opencode/maia-layer0/test/Counter.test.tsx"
    size_kb: 3.4
    lines: 86
    test_count: 10
```

---

### Workflow Timeline

```
10:30 ── @maia: Planning phase
          ↓ Stack detection, task creation
10:32 ── @coder: Implementation phase
          ↓ Write code, write tests, verify
10:57 ── @reviewer: Quality gate
          ↓ Audit, approve
11:00 ── DONE: Counter component ready
```

**Total duration**: 30 minutes (1800 seconds)

---

### Lessons Learned

```yaml
lessons_learned:
  - "Stack detection protocol worked perfectly - @coder adapted to project's TypeScript + Vitest setup"
  - "No research needed for simple React component - @maia correctly identified this and skipped to implementation"
  - "Message mode handoffs preserved full context between agents"
  - "Vibe Kanban status tracking provided clear visibility throughout the workflow"
  - "Test coverage target (100%) was achieved with comprehensive test cases"
  - "Reviewer checklist ensures consistent quality standards"
```

---

## 🔄 Reusability Notes

### When to Use This Template

This log template is useful for:

1. **Documentation**: Track how tasks are executed in the MAIA ecosystem
2. **Debugging**: Analyze orchestration issues and bottlenecks
3. **Onboarding**: Teach new users how MAIA workflows work
4. **Metrics**: Calculate agent performance, task duration, success rates
5. **Audit**: Provide complete traceability for critical tasks

### Customization Points

- **agents_involved**: Add or remove agents based on task complexity
- **workflow_type**: Switch between sequential, parallel, or hybrid
- **stages**: Add custom stages for specific workflows (e.g., "deployment", "security_audit")
- **findings**: Expand review checklist based on domain requirements

### Integration with Vibe Kanban

- Every `kanban_updates` entry should be timestamped
- Task status in Vibe Kanban should match log final status
- Subtasks can be logged as nested entries under parent task
- Attempt tracking: Add `attempts` field if external executors are used

---

## 📊 Key Metrics (from Example)

| Metric          | Value                        |
| --------------- | ---------------------------- |
| Total duration  | 30 minutes                   |
| Agents involved | 3 (@maia, @coder, @reviewer) |
| Files created   | 2                            |
| Tests added     | 10                           |
| Test coverage   | 100%                         |
| Lint status     | Clean                        |
| Build status    | Pass                         |
| Review outcome  | Approved                     |

---

**Last Updated**: 2026-01-22
**Maintainer**: @maia
**Version**: 1.0
