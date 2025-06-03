#!/bin/bash

echo "🔍 Checking project structure and dependencies..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🧹 Cleaning previous builds..."
rm -rf dist

echo "🏗️ Building for local environment..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
    
    echo "🌐 Building for GitHub Pages..."
    npm run build:github
    
    if [ $? -eq 0 ]; then
        echo "✅ GitHub build successful!"
        echo "🚀 All builds completed successfully!"
        echo ""
        echo "📋 Available commands:"
        echo "  npm run dev          - Start development server"
        echo "  npm run build        - Build for local/production"
        echo "  npm run build:github - Build for GitHub Pages"
        echo "  npm run preview      - Preview local build"
        echo "  npm run preview:github - Preview GitHub build"
        echo "  npm run deploy       - Deploy to GitHub Pages"
    else
        echo "❌ GitHub build failed!"
        exit 1
    fi
else
    echo "❌ Local build failed!"
    exit 1
fi
