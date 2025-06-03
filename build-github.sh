#!/bin/bash

echo "🚀 Building for GitHub Pages..."

# Set environment variable for GitHub Pages build
export BUILD_FOR_GITHUB=true
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist

# Build the project
echo "🏗️ Building project..."
vite build

if [ $? -eq 0 ]; then
    echo "✅ GitHub Pages build completed successfully!"
    echo "📁 Build output is in the 'dist' directory"
    echo ""
    echo "📋 Next steps:"
    echo "  1. Run 'npm run preview:github' to preview the build"
    echo "  2. Run 'npm run deploy' to deploy to GitHub Pages"
else
    echo "❌ Build failed!"
    exit 1
fi