<!-- MAIA: Message-Mode Handoff Payload Examples -->
<!-- This file demonstrates how agents hand off work via the session({mode: "message"}) tool -->

# Message-Mode Handoff Payloads

**Purpose**: Demonstrate detailed, reusable message-mode handoffs between MAIA agents.

## Concept

Message mode enables **context-rich handoffs** where one agent passes complete state, findings, and artifacts to another agent within the same conversation thread. Unlike "new" mode (which creates a fresh session), message mode preserves conversation history while allowing a different agent to take over.

---

## Handoff Structure

Every message-mode handoff should include:

```javascript
session({
  mode: "message",
  agent: "<target_agent>",
  text: `
    <HANDOFF_SUMMARY>
    Brief statement of what's being handed off

    <CONTEXT>
    Previous agent's work, findings, or analysis

    <ARTIFACTS>
    Files, data, resources created or referenced

    <RECOMMENDATIONS>
    Actionable guidance for the next agent

    <NEXT_STEPS>
    Specific instructions or decisions needed

    <TAG_NEXT_AGENT>
    <!-- @agent_name: Continue from here -->
  `,
});
```

---

## Example 1: Researcher → MAIA

**Scenario**: Researcher has analyzed 3 authentication approaches and wants MAIA to synthesize and create implementation tasks.

```javascript
session({
  mode: "message",
  agent: "maia",
  text: `
    ╔═════════════════════════════════════════════════════════════════════╗
    ║                 HANDOFF: Researcher → MAIA                        ║
    ║                 Topic: Authentication System                        ║
    ╚═════════════════════════════════════════════════════════════════════╝

    HANDOFF SUMMARY
    ---------------
    Completed comprehensive analysis of 3 authentication approaches for the 
    multi-agent layer 0 project. Ready for synthesis and implementation planning.

    CONTEXT
    -------
    Research conducted via parallel web search and documentation analysis:
    
    1. JWT (JSON Web Tokens)
       - Stateless, scalable
       - Token rotation supported
       - Requires 'jose' library for Node.js
       - HTTPOnly cookies for refresh tokens recommended
    
    2. Session-based auth
       - Server-side storage required
       - Simpler implementation
       - Not suitable for stateless architectures
       - Memory/Redis overhead
    
    3. OAuth 2.0 / OpenID Connect
       - Enterprise-grade
       - Complex setup
       - Overkill for internal tools
       - Requires external providers (Auth0, Okta, etc.)

    ARTIFACTS CREATED
    -----------------
    1. .opencode/research/auth-approaches-analysis.md
       - Detailed comparison matrix
       - Security considerations for each approach
       - Implementation complexity ratings
       - Code examples for JWT with 'jose'
    
    2. .opencode/research/auth-requirements.md
       - Extracted from project needs:
         * Must support concurrent agent sessions
         * Must integrate with Vibe Kanban
         * Must support API rate limiting
         * Must be production-ready (not demo)

    RECOMMENDATIONS
    ---------------
    STRONG RECOMMENDATION: Use JWT with HTTPOnly cookies
    
    Rationale:
    1. Fits our stateless multi-agent architecture
    2. 'jose' library is actively maintained (900+ stars, 6M weekly downloads)
    3. HTTPOnly cookies prevent XSS attacks on refresh tokens
    4. Token rotation prevents replay attacks
    5. Aligns with MAIA's stack-agnostic philosophy (works with any backend)
    
    Security Implementation:
    - Access token lifetime: 15 minutes
    - Refresh token lifetime: 7 days
    - Rotate refresh tokens on every use
    - Store refresh tokens securely (server-side hash)
    - Implement rate limiting on /auth/login (5 req/min)
    - Use environment variables for JWT secrets

    Implementation Complexity: Medium
    Estimated effort: 4-6 hours for full implementation

    TECHNICAL SPECIFICATIONS
    ------------------------
    Recommended Library: 'jose' (npm install jose)
    
    JWT Payload Structure:
    {
      "sub": "agent_id",
      "role": "coder|researcher|reviewer|ops",
      "iat": 1737536400,
      "exp": 1737537300,
      "session_id": "ses_abc123"
    }

    Required Endpoints:
    - POST /auth/login (credentials → access + refresh tokens)
    - POST /auth/register (new agent → tokens)
    - POST /auth/refresh (refresh token → new access + refresh tokens)
    - POST /auth/logout (invalidate refresh token)
    - GET /auth/me (validate access token, return agent info)
    
    Middleware:
    - requireAuth() middleware for protected routes
    - validateRole() middleware for role-based access

    NEXT STEPS FOR MAIA
    -------------------
    1. Synthesize research findings into implementation plan
    2. Create Vibe Kanban tasks:
       - Task: Implement JWT authentication endpoints
       - Task: Add HTTPOnly cookie management
       - Task: Create auth middleware
       - Task: Add rate limiting
    3. Assign tasks to @coder with clear specifications
    4. Set up parallel work if possible (endpoints vs middleware)
    
    BLOCKERS OR CONCERNS
    --------------------
    None identified. The recommended approach is well-documented and widely adopted.
    
    QUESTIONS FOR MAIA
    ------------------
    - Should we use TypeScript for the auth module? (Project uses TS)
    - Should auth endpoints be in a separate route file?
    - Do we need to support token revocation for logout? (Yes, recommended)

    <!-- @maia: Please synthesize and create implementation tasks -->
  `,
});
```

---

## Example 2: MAIA → Coder

**Scenario**: MAIA has synthesized research, created tasks in Vibe Kanban, and is handing off to @coder for implementation.

```javascript
session({
  mode: "message",
  agent: "coder",
  text: `
    ╔═════════════════════════════════════════════════════════════════════╗
    ║                 HANDOFF: MAIA → Coder                              ║
    ║                 Task: Implement JWT Authentication                  ║
    ╚═════════════════════════════════════════════════════════════════════╝

    HANDOFF SUMMARY
    ---------------
    Research phase complete. Task created in Vibe Kanban. Ready for implementation 
    of JWT authentication system with HTTPOnly cookies.

    TASK CONTEXT
    ------------
    Task ID: task_auth_001
    Title: Implement JWT authentication with HTTPOnly cookies
    Status: todo → Please update to 'in_progress' when you start
    Priority: high
    
    Previous work:
    - Researcher analyzed 3 approaches, recommended JWT
    - MAIA synthesized findings, created implementation spec
    - Task created in Vibe Kanban project: "Multi-Agent Layer 0"

    IMPLEMENTATION REQUIREMENTS
    ---------------------------
    1. Endpoints (create in src/auth/routes.ts):
       - POST /auth/login
       - POST /auth/register
       - POST /auth/refresh
       - POST /auth/logout
       - GET /auth/me
    
    2. Token Management (create in src/auth/tokens.ts):
       - Access token: 15 min lifetime
       - Refresh token: 7 day lifetime
       - Rotate refresh tokens on use
       - Use 'jose' library for signing/validation
       
    3. Middleware (create in src/auth/middleware.ts):
       - requireAuth(): Protect routes, verify JWT
       - validateRole(role): Check agent permissions
    
    4. Security:
       - HTTPOnly cookies for refresh tokens
       - SameSite=strict for cookies
       - Rate limiting on /auth/login (5 req/min)
       - Environment variables for JWT secrets
       - Hash refresh tokens server-side (bcrypt)

    5. Testing (create in test/auth.test.ts):
       - Test all endpoints
       - Test middleware behavior
       - Test token rotation
       - Test rate limiting
       - Test invalid token handling

    ARTIFACTS FROM RESEARCH
    ------------------------
    1. .opencode/research/auth-approaches-analysis.md
       - Read for security considerations
       - Copy JWT payload structure from here
    
    2. .opencode/research/auth-requirements.md
       - Review all project requirements
       - Ensure integration with Vibe Kanban

    RECOMMENDATIONS FROM RESEARCHER
    --------------------------------
    - Use 'jose' library (npm install jose)
    - Implement token rotation on every refresh
    - Use bcrypt for refresh token hashing
    - Add comprehensive error handling (invalid tokens, expired tokens, etc.)
    - Log all auth events for debugging
    
    PROJECT CONTEXT
    ----------------
    Language: TypeScript (check tsconfig.json for strict mode)
    Framework: Express.js (inferred from package.json scripts)
    Testing: Vitest (npm test)
    Linting: ESLint (npm run lint)
    
    Commands to use:
    - npm run build: Build TypeScript
    - npm test: Run tests
    - npm run lint: Check code style
    - npm run typecheck: Verify types

    CODE STYLE GUIDELINES
    ---------------------
    - Use TypeScript strict mode
    - Group imports: external → internal → relative
    - Use async/await for asynchronous code
    - Handle errors explicitly (try/catch)
    - Log errors with context
    - Never expose stack traces to clients

    EXPECTED OUTPUT
    ---------------
    1. Files created:
       - src/auth/routes.ts (endpoint handlers)
       - src/auth/tokens.ts (JWT utilities)
       - src/auth/middleware.ts (auth protection)
       - test/auth.test.ts (comprehensive tests)
    
    2. Environment variables needed:
       - JWT_ACCESS_SECRET
       - JWT_REFRESH_SECRET
       - Add these to .env.example
    
    3. Test coverage: Target 90%+
    4. Lint: 0 errors, 0 warnings
    5. Build: Success

    WORKFLOW INSTRUCTIONS
    ----------------------
    1. Update task status to 'in_progress' in Vibe Kanban
    2. Read project structure: ls src/, check package.json
    3. Install 'jose' if not already installed
    4. Implement endpoints (start with /auth/login)
    5. Implement token utilities
    6. Implement middleware
    7. Write tests for each component
    8. Run npm test, fix any failures
    9. Run npm run lint, fix any warnings
    10. Run npm run build, fix any type errors
    11. Update task status to 'in_review' when complete
    12. Hand off to @reviewer with message mode

    BLOCKERS OR QUESTIONS
    ---------------------
    If you encounter any blockers:
    - Check .opencode/research/ for clarification
    - Ask MAIA via session({mode: "message", agent: "maia"})
    - Document the issue in task description in Vibe Kanban

    SUCCESS CRITERIA
    ----------------
    ✅ All 5 endpoints implemented and working
    ✅ Token rotation working correctly
    ✅ Middleware protecting routes
    ✅ All tests passing (minimum 15 test cases)
    ✅ 90%+ code coverage
    ✅ Lint clean (0 errors, 0 warnings)
    ✅ Build succeeds
    ✅ No security vulnerabilities flagged

    <!-- @coder: Begin implementation. Update task to 'in_progress'. Good luck! -->
  `,
});
```

---

## Example 3: Coder → Reviewer

**Scenario**: @coder has completed implementation and is handing off to @reviewer for quality verification.

```javascript
session({
  mode: "message",
  agent: "reviewer",
  text: `
    ╔═════════════════════════════════════════════════════════════════════╗
    ║                 HANDOFF: Coder → Reviewer                           ║
    ║                 Task: JWT Authentication Review                     ║
    ╚═════════════════════════════════════════════════════════════════════╝

    HANDOFF SUMMARY
    ---------------
    JWT authentication system implementation complete. All tests passing, 
    lint clean, build successful. Ready for review and approval.

    TASK CONTEXT
    ------------
    Task ID: task_auth_001
    Title: Implement JWT authentication with HTTPOnly cookies
    Status: in_review (updated from in_progress)
    
    Previous handoff: MAIA → Coder (see context above)

    IMPLEMENTATION DELIVERED
    -------------------------
    1. Files Created (5 total):
       
       src/auth/routes.ts (245 lines)
       - POST /auth/login: Validates credentials, issues tokens
       - POST /auth/register: Creates new agent, issues tokens
       - POST /auth/refresh: Rotates refresh token, issues new access
       - POST /auth/logout: Invalidates refresh token
       - GET /auth/me: Validates token, returns agent info
       - Rate limiting: 5 requests/minute on /auth/login
       - Error handling: Detailed but sanitized error messages
       
       src/auth/tokens.ts (128 lines)
       - generateAccessToken(agent, session): 15 min lifetime
       - generateRefreshToken(agent): 7 day lifetime
       - verifyAccessToken(token): Returns payload or throws
       - verifyRefreshToken(token): Returns payload or throws
       - hashToken(token): bcrypt for server-side storage
       - verifyHash(token, hash): For logout validation
       
       src/auth/middleware.ts (87 lines)
       - requireAuth(): Extracts and validates JWT from header
       - validateRole(roles): Checks if agent has required role
       - Both middleware attach agent info to request object
       
       test/auth.test.ts (312 lines)
       - 18 test cases covering:
         * Successful login/logout/refresh
         * Invalid credentials handling
         * Expired token handling
         * Token rotation verification
         * Rate limiting behavior
         * Middleware protection
         * Role-based access control
       
       .env.example (updated)
       - JWT_ACCESS_SECRET added
       - JWT_REFRESH_SECRET added

    2. Dependencies Added:
       - jose (JWT signing/validation)
       - express-rate-limit (rate limiting)
       - bcryptjs (token hashing)

    TEST RESULTS
    ------------
    Command: npm test
    
    Test Suite: Auth API
    ✓ POST /auth/login - valid credentials returns tokens
    ✓ POST /auth/login - invalid credentials returns 401
    ✓ POST /auth/login - rate limiting kicks in after 5 requests
    ✓ POST /auth/register - creates new agent and returns tokens
    ✓ POST /auth/register - duplicate email returns 409
    ✓ POST /auth/refresh - rotates refresh token correctly
    ✓ POST /auth/refresh - invalid token returns 401
    ✓ POST /auth/refresh - expired token returns 401
    ✓ POST /auth/logout - invalidates refresh token
    ✓ POST /auth/logout - already logged out returns 200
    ✓ GET /auth/me - returns agent info with valid token
    ✓ GET /auth/me - invalid token returns 401
    ✓ requireAuth middleware - protects routes
    ✓ requireAuth middleware - passes valid token
    ✓ validateRole middleware - allows correct role
    ✓ validateRole middleware - denies incorrect role
    ✓ Token rotation - refresh token changes on each use
    ✓ Token expiration - access token expires after 15 minutes
    
    Test Suites: 1 passed, 1 total
    Tests: 18 passed, 18 total
    Duration: 2.3s
    
    Coverage Report:
    src/auth/routes.ts: 94.2% coverage
    src/auth/tokens.ts: 100% coverage
    src/auth/middleware.ts: 100% coverage
    Overall: 97.4% coverage

    LINT RESULTS
    ------------
    Command: npm run lint
    
    .opencode/src/auth/routes.ts
      0 errors, 0 warnings
    
    .opencode/src/auth/tokens.ts
      0 errors, 0 warnings
    
    .opencode/src/auth/middleware.ts
      0 errors, 0 warnings
    
    .opencode/test/auth.test.ts
      0 errors, 0 warnings
    
    Total: 0 errors, 0 warnings
    Lint: Clean ✅

    BUILD RESULTS
    --------------
    Command: npm run build
    
    Building...
    ✓ TypeScript compilation successful
    ✓ Vite build complete
    Output: dist/ (45 files)
    
    Build: Success ✅

    IMPLEMENTATION NOTES
    --------------------
    1. Followed researcher's recommendation: Used 'jose' library
    2. Implemented token rotation on every refresh request
    3. Used bcrypt for hashing refresh tokens (salt rounds: 10)
    4. HTTPOnly cookies set on refresh token responses
    5. Rate limiting implemented using express-rate-limit
    6. All environment variables documented in .env.example
    7. Error messages are sanitized (no stack traces to client)
    8. Comprehensive logging added for debugging

    ADHERENCE TO REQUIREMENTS
    -------------------------
    ✅ JWT with HTTPOnly cookies (as recommended by researcher)
    ✅ All 5 endpoints implemented
    ✅ Access token lifetime: 15 minutes
    ✅ Refresh token lifetime: 7 days
    ✅ Token rotation implemented
    ✅ Rate limiting: 5 req/min on /auth/login
    ✅ Middleware: requireAuth() and validateRole()
    ✅ TypeScript: Strict mode, type-safe throughout
    ✅ Tests: 18 cases, 97.4% coverage
    ✅ Lint: Clean (0 errors, 0 warnings)
    ✅ Build: Successful

    SECURITY CONSIDERATIONS
    -----------------------
    ✅ Tokens signed with HS256 algorithm
    ✅ Refresh tokens hashed server-side (bcrypt)
    ✅ HTTPOnly cookies prevent XSS
    ✅ SameSite=strict on cookies
    ✅ Rate limiting prevents brute force
    ✅ No sensitive data in JWT payload (only agent_id, role, session_id)
    ✅ Error messages don't leak implementation details
    ✅ All secrets read from environment variables

    ARTIFACTS FOR REVIEW
    --------------------
    1. Implementation:
       - src/auth/routes.ts
       - src/auth/tokens.ts
       - src/auth/middleware.ts
    
    2. Tests:
       - test/auth.test.ts
       - Coverage: .opencode/coverage/index.html
    
    3. Documentation:
       - .env.example (JWT secrets)
       - Inline code comments (JSDoc on exported functions)

    4. Research Reference:
       - .opencode/research/auth-approaches-analysis.md
       - .opencode/research/auth-requirements.md

    REVIEW CHECKLIST
    -----------------
    Please verify:
    
    Code Quality:
    [ ] TypeScript types are correct and thorough
    [ ] Error handling is comprehensive
    [ ] Code is readable and maintainable
    [ ] Follows project style guidelines
    [ ] No security vulnerabilities
    
    Functional Correctness:
    [ ] All endpoints work as specified
    [ ] Token rotation is working correctly
    [ ] Middleware protects routes properly
    [ ] Rate limiting prevents abuse
    [ ] Logout invalidates tokens
    
    Testing:
    [ ] All tests pass (18/18)
    [ ] Test coverage is adequate (97.4%)
    [ ] Tests cover edge cases
    [ ] Tests are maintainable
    
    Security:
    [ ] JWT secrets are not hardcoded
    [ ] Refresh tokens are hashed
    [ ] HTTPOnly cookies set correctly
    [ ] Rate limiting configured
    [ ] No sensitive data in logs or errors
    
    Documentation:
    [ ] Environment variables documented
    [ ] API behavior is self-documenting
    [ ] Code comments are helpful
    [ ] .env.example is updated

    NEXT STEPS
    ----------
    1. Conduct thorough review using checklist above
    2. Run npm test, verify all tests pass
    3. Run npm run lint, verify clean
    4. Run npm run build, verify success
    5. If any issues found:
       - Document in task description
       - Request fixes from @coder
    6. If approved:
       - Update task status to 'done'
       - Notify MAIA of completion

    POTENTIAL CONCERNS
    ------------------
    None identified. Implementation is solid.

    <!-- @reviewer: Please review implementation for security, correctness, and quality -->
  `,
});
```

---

## 📊 Handoff Best Practices

### 1. Always Include Context

```javascript
// ❌ BAD - No context
session({
  mode: "message",
  agent: "coder",
  text: "Implement this feature.",
});

// ✅ GOOD - Full context
session({
  mode: "message",
  agent: "coder",
  text: `
    TASK: Implement JWT authentication
    RESEARCH: See .opencode/research/auth-analysis.md
    RECOMMENDATIONS: Use 'jose' library
    BLOCKERS: None
  `,
});
```

### 2. Tag the Next Agent

```javascript
<!-- @coder: Continue from here -->
<!-- @reviewer: Please review this implementation -->
<!-- @maia: Need synthesis of findings -->
```

### 3. Provide Actionable Guidance

```javascript
// ❌ BAD - Vague
session({
  mode: "message",
  agent: "coder",
  text: "Write some tests for the auth module.",
});

// ✅ GOOD - Specific
session({
  mode: "message",
  agent: "coder",
  text: `
    Write tests for src/auth/middleware.ts:
    - Test requireAuth() with valid token
    - Test requireAuth() with missing token
    - Test requireAuth() with invalid token
    - Test validateRole() with correct role
    - Test validateRole() with incorrect role
    Target: 90%+ coverage
  `,
});
```

### 4. List Artifacts Explicitly

```javascript
ARTIFACTS CREATED:
1. src/auth/routes.ts (245 lines)
2. src/auth/tokens.ts (128 lines)
3. test/auth.test.ts (312 lines)
4. .env.example (updated)
```

### 5. Include Success Criteria

```javascript
SUCCESS CRITERIA:
✅ All 5 endpoints working
✅ 90%+ test coverage
✅ Lint clean (0 errors, 0 warnings)
✅ Build succeeds
✅ Security review passed
```

---

## 🔄 Handoff Flow Diagram

```
Researcher
    ↓ [message mode with research findings]
MAIA
    ↓ [message mode with implementation spec]
Coder
    ↓ [message mode with completed implementation]
Reviewer
    ↓ [task status: done]
Done
```

---

## 📝 Handoff Payload Template

```markdown
╔═════════════════════════════════════════════════════════════════════╗
║ HANDOFF: <Source> → <Target> ║
║ Task: <Task Title> ║
╚═════════════════════════════════════════════════════════════════════╝

## HANDOFF SUMMARY

<Brief statement of what's being handed off>

## TASK CONTEXT

- Task ID: <id>
- Title: <title>
- Status: <current_status>
- Previous handoff: <summary>

<Context from previous work>

## ARTIFACTS CREATED/REFERRED

- <file_path>: <description>
- <file_path>: <description>

## RECOMMENDATIONS

<Previous agent's recommendations>

## IMPLEMENTATION REQUIREMENTS / REVIEW CHECKLIST

<Specific requirements or checklist items>

## NEXT STEPS

<Concrete actions for next agent>

## BLOCKERS OR QUESTIONS

<Any blockers or clarifications needed>

## SUCCESS CRITERIA

<What constitutes completion>

<!-- @agent_name: Continue from here -->
```

---

**Last Updated**: 2026-01-22
**Maintainer**: @maia
**Version**: 1.0
