#!/bin/bash

echo "🔧 Fixing deployment issues for GitHub Pages..."

# 1. Clean previous build
echo "📦 Cleaning previous build..."
rm -rf dist

# 2. Build for GitHub Pages
echo "🏗️ Building for GitHub Pages..."
npm run build:github

# 3. Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Build contents:"
    ls -la dist/
    
    # 4. Check if index.html exists
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html found"
    else
        echo "❌ index.html missing!"
    fi
    
    # 5. Check if assets exist
    if [ -d "dist/assets" ]; then
        echo "✅ Assets folder found"
        echo "📦 Assets:"
        ls -la dist/assets/
    else
        echo "❌ Assets folder missing!"
    fi
    
    echo ""
    echo "🚀 To deploy manually:"
    echo "   gh-pages -d dist"
    
else
    echo "❌ Build failed!"
    exit 1
fi
