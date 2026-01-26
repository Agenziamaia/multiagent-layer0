#!/bin/bash

# Quick Start Script for AI Website Builder
# This script installs dependencies and starts the dev server

echo "🚀 AI Website Builder - Quick Start"
echo "=================================="
echo ""

# Check if node_modules exists for next
if [ ! -d "node_modules/next" ]; then
    echo "📦 Installing Next.js dependencies..."
    npm install next@14.0.4 \
      @dnd-kit/core@6.1.0 @dnd-kit/sortable@8.0.0 @dnd-kit/utilities@3.2.2 \
      zustand@4.4.7 \
      tailwindcss@3.4.0 autoprefixer@10.4.16 postcss@8.4.32 \
      clsx@2.0.0 tailwind-merge@2.1.0
    echo ""
fi

# Check if dev dependencies are installed
if ! command -v next &> /dev/null; then
    echo "📦 Installing dev dependencies..."
    npm install -D \
      @types/node@20.10.6 @types/react@18.2.46 @types/react-dom@18.2.18 \
      typescript@5.3.3 \
      eslint@8.56.0 eslint-config-next@14.0.4
    echo ""
fi

echo "✅ Dependencies installed!"
echo ""
echo "🎯 Starting development server..."
echo "   Open http://localhost:3000 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the dev server
npm run dev
