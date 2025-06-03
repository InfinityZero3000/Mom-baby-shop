#!/bin/bash

# Build for GitHub Pages
echo "🏗️ Building for GitHub Pages..."
NODE_ENV=production npx vite build --mode production --base=/Mom-baby-shop/

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Copy 404.html to dist
    echo "📁 Copying 404.html..."
    cp 404.html dist/
    
    # Copy images directory to dist
    echo "🖼️ Copying images directory..."
    cp -r images dist/
    
    echo "✅ All files copied successfully!"
    echo "📊 Final dist structure:"
    ls -la dist/
    
else
    echo "❌ Build failed!"
    exit 1
fi
