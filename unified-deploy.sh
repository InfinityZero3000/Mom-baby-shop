#!/bin/bash

# Unified GitHub Pages Deployment Script
# This script handles all deployment tasks in one go

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Unified GitHub Pages Deployment Script${NC}"
echo "=================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print step
print_step() {
    echo -e "${YELLOW}📋 Step $1: $2${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Environment Check
print_step "1" "Checking environment"

if ! command_exists node; then
    print_error "Node.js is not installed"
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is not installed"
    exit 1
fi

if ! command_exists git; then
    print_error "git is not installed"
    exit 1
fi

print_success "Environment check passed"

# Step 2: Check if images directory exists
print_step "2" "Checking images directory"

if [ ! -d "images" ]; then
    print_error "Images directory not found!"
    exit 1
fi

print_success "Images directory found"

# Step 3: Clean previous build
print_step "3" "Cleaning previous build"
rm -rf dist/
rm -rf node_modules/.vite/
print_success "Previous build cleaned"

# Step 4: Install dependencies
print_step "4" "Installing dependencies"
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi
print_success "Dependencies installed"

# Step 5: Fix Vite configuration for better image handling
print_step "5" "Updating Vite configuration"

cat > vite.config.ts << 'EOF'
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // Check if building for production (GitHub Pages)
  const isGitHubBuild = process.env.NODE_ENV === 'production' || mode === 'production';
  
  return {
    plugins: [react()],
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    build: {
      outDir: 'dist',
      sourcemap: false,
      assetsDir: 'assets',
      copyPublicDir: false, // We handle images manually
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    publicDir: false, // Disable default public dir since we handle it manually
    css: {
      postcss: './postcss.config.js',
    },
    server: {
      fs: {
        allow: ['..']
      }
    }
  };
});
EOF

print_success "Vite configuration updated"

# Step 6: Fix main.tsx to use BrowserRouter for better GitHub Pages compatibility
print_step "6" "Updating main.tsx for better routing"

cat > src/main.tsx << 'EOF'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./lib/utils";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename="/Mom-baby-shop">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
EOF

print_success "main.tsx updated with BrowserRouter and basename"

# Step 7: Build for production
print_step "7" "Building for production"
NODE_ENV=production npx vite build --mode production

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_success "Build completed successfully"

# Step 8: Copy additional files
print_step "8" "Copying additional files"

# Copy 404.html for SPA routing
if [ -f "404.html" ]; then
    cp 404.html dist/
    print_success "404.html copied"
fi

# Copy images directory
cp -r images dist/
print_success "Images directory copied"

# Create .nojekyll file to prevent Jekyll processing
touch dist/.nojekyll
print_success ".nojekyll file created"

# Step 9: Verify build structure
print_step "9" "Verifying build structure"

echo "📁 Final dist structure:"
ls -la dist/

if [ -f "dist/index.html" ]; then
    print_success "index.html found"
else
    print_error "index.html missing!"
    exit 1
fi

if [ -d "dist/images" ]; then
    print_success "Images directory found in dist"
    echo "📸 Images in dist:"
    ls -la dist/images/ | head -10
else
    print_error "Images directory missing in dist!"
    exit 1
fi

if [ -d "dist/assets" ]; then
    print_success "Assets directory found"
else
    print_error "Assets directory missing!"
    exit 1
fi

# Step 10: Test image paths in HTML
print_step "10" "Testing image paths in built HTML"

if grep -q "/images/" dist/index.html; then
    print_success "Image paths found in HTML"
else
    print_error "No image paths found in HTML - this might be expected for React apps"
fi

# Step 11: Deploy to GitHub Pages
print_step "11" "Deploying to GitHub Pages"

if command_exists gh-pages; then
    gh-pages -d dist
    if [ $? -eq 0 ]; then
        print_success "Deployment successful!"
    else
        print_error "Deployment failed"
        exit 1
    fi
else
    print_error "gh-pages not found. Please install it with: npm install -g gh-pages"
    exit 1
fi

# Step 12: Final verification
print_step "12" "Final verification"

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
if [[ $REPO_URL == *"github.com"* ]]; then
    USERNAME=$(echo $REPO_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/.*/\1/p')
    REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^/]*\)\.git.*/\1/p')
    
    if [ -z "$REPO_NAME" ]; then
        REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^/]*\)/\1/p')
    fi
    
    GITHUB_PAGES_URL="https://${USERNAME}.github.io/${REPO_NAME}/"
    
    echo ""
    echo "🎉 Deployment Complete!"
    echo "=================================================="
    echo -e "${GREEN}✅ Repository:${NC} $USERNAME/$REPO_NAME"
    echo -e "${GREEN}✅ GitHub Pages URL:${NC} $GITHUB_PAGES_URL"
    echo -e "${GREEN}✅ Test Image URL:${NC} ${GITHUB_PAGES_URL}images/stroller-1.png"
    echo ""
    echo "🔍 To verify deployment:"
    echo "1. Wait 1-2 minutes for GitHub Pages to update"
    echo "2. Visit: $GITHUB_PAGES_URL"
    echo "3. Check if images load properly"
    echo ""
    echo "🐛 If images still don't load:"
    echo "1. Check browser console for errors"
    echo "2. Verify image paths in React components"
    echo "3. Test image URLs directly"
else
    print_error "Could not determine repository info"
fi

print_success "Script completed successfully!"
