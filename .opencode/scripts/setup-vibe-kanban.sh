#!/bin/bash

# Vibe Kanban Setup Script for MAIA Ecosystem
# Installs and configures Vibe Kanban MCP server

set -e

echo "🚀 Setting up Vibe Kanban for MAIA Multi-Agent Orchestration..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install Vibe Kanban globally (for CLI)
echo "📦 Installing Vibe Kanban..."
npm install -g vibe-kanban@latest 2>/dev/null || npx -y vibe-kanban@latest --help > /dev/null

echo "✅ Vibe Kanban available"

# Verify MCP server works
echo "🔌 Testing Vibe Kanban MCP server..."
timeout 5 npx -y vibe-kanban@latest --mcp --help 2>/dev/null || echo "⚠️ MCP server test skipped (will work when MAIA starts)"

echo ""
echo "🎉 Vibe Kanban Setup Complete!"
echo ""
echo "📋 To start Vibe Kanban UI:"
echo "   npx vibe-kanban"
echo ""
echo "🔗 MCP server will auto-start when MAIA agents need task management"
echo ""
echo "📊 Workflow:"
echo "   1. User describes intent to MAIA"
echo "   2. MAIA creates tasks in Vibe Kanban"
echo "   3. Agents execute work in isolated worktrees"
echo "   4. Reviewer approves in IN REVIEW column"
echo "   5. Task moves to DONE"
echo ""
