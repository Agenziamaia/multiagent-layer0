# Browser-Use MCP Server Integration

## Overview

Browser automation capabilities via Browser-Use MCP server integration with MAIA ecosystem.

## Architecture

```
MAIA ↔ Browser-Use MCP Server ↔ Our Models (GLM-4.7/Qwen)
                ↓
         Skills API (production endpoints)
```

## MCP Server Details

- **Server URL**: `https://api.browser-use.com/mcp`
- **Protocol**: HTTP-based MCP (not stdio)
- **Authentication**: API key required
- **Model Compatibility**: OpenAI-compatible (can use GLM-4.7, Qwen, etc.)

## Available Tools

### Core Browser Automation

- `browser_task` - Execute browser automation tasks
- `list_browser_profiles` - Manage browser profiles
- `monitor_task` - Real-time task monitoring

### Smart Features

- **Cloud Profiles** - Authentication management
- **Real-time Monitoring** - Task progress tracking
- **Conversational Progress** - Natural language status updates

## Integration Options

### Option 1: Direct MCP Connection (Recommended)

```javascript
// Connect to browser-use MCP server
const mcpClient = new MCPClient({
  serverUrl: "https://api.browser-use.com/mcp",
  headers: {
    "X-Browser-Use-API-Key": process.env.BROWSER_USE_API_KEY,
  },
});
```

### Option 2: Local Self-Hosted

```bash
# Free open-source version
uvx browser-use --mcp
```

## Model Strategy

### Phase 1: Use Existing Models

- **GLM-4.7**: General browser automation
- **Qwen 3 235B**: Complex strategic tasks
- **Gemini 2.5 Pro**: Research-heavy automation

### Phase 2: Optimize with BU-30B

- Test BU-30B-A3B-Preview model
- Cost analysis: 200 tasks/$1
- Performance comparison

## Skills API Integration

### Production Endpoints

```javascript
// Create reusable automation endpoints
const skill = await browserUse.createSkill({
  name: "login-to-platform",
  description: "Login to X platform with credentials",
  parameters: {
    username: "string",
    password: "string",
  },
});

// Execute via API
const result = await skill.execute({
  username: "user@example.com",
  password: "secure-password",
});
```

## Implementation Steps

### 1. API Key Setup

```bash
# Get API key from Browser Use Dashboard
export BROWSER_USE_API_KEY="your-api-key"
```

### 2. MCP Client Integration

- Add browser-use MCP server to MAIA's MCP client list
- Configure HTTP-based transport
- Set up authentication headers

### 3. Agent Workflow Updates

- Update @coder to include browser automation capabilities
- Add browser task creation to Vibe Kanban
- Implement Skills API endpoint creation

### 4. Testing & Validation

- Test browser automation with sample tasks
- Validate Skills API endpoint creation
- Performance benchmarking

## Use Cases

### Immediate Applications

- **Web Testing**: Automated UI testing
- **Data Extraction**: Scraping structured data
- **Form Automation**: Fill and submit forms
- **Content Monitoring**: Track website changes

### Advanced Applications

- **E-commerce Automation**: Product monitoring and purchasing
- **Social Media Management**: Post scheduling and engagement
- **Research Automation**: Academic paper collection and analysis

## Security Considerations

- **API Key Protection**: Store in environment variables
- **Profile Isolation**: Use separate browser profiles for tasks
- **Data Privacy**: Avoid sensitive data in browser automation
- **Rate Limiting**: Monitor API usage and costs

## Cost Management

### BU Cloud Pricing

- **Input Tokens**: $0.20 per 1M tokens
- **Cached Tokens**: $0.02 per 1M tokens
- **Output Tokens**: $2.00 per 1M tokens

### Optimization Strategies

- Use cached tokens when possible
- Optimize prompt engineering
- Monitor task completion rates
- Consider BU-30B model for cost efficiency

## Troubleshooting

### Common Issues

- **MCP Connection**: Verify API key and server URL
- **Browser Launch**: Check Chrome/Chromium installation
- **Task Failures**: Review error logs and adjust prompts
- **Rate Limits**: Monitor API usage and implement backoff

### Debug Mode

```bash
# Enable debug logging
export BROWSER_USE_DEBUG=true
```

## Next Steps

1. **API Key Acquisition**: Get Browser Use API key
2. **MCP Integration**: Add server to MAIA ecosystem
3. **Agent Training**: Update agents with browser capabilities
4. **Skills Development**: Create reusable automation skills
5. **Performance Testing**: Benchmark and optimize

## Documentation

- [Browser Use MCP Server Docs](https://docs.browser-use.com/customize/integrations/mcp-server)
- [Skills API Documentation](https://docs.browser-use.com/skills)
- [Supported Models](https://docs.browser-use.com/supported-models)
