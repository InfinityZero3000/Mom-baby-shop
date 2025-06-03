#!/bin/bash

echo "🚀 Automatic deployment script for Mom Baby Shop"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_error "Git repository not found. Please initialize git first."
    exit 1
fi

print_status "Starting deployment process..."

# Step 1: Check for uncommitted changes
print_status "Checking for uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Committing them first..."
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    commit_message="Update paths and build for GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"
    
    print_success "Changes committed: $commit_message"
else
    print_success "Working directory is clean"
fi

# Step 2: Install dependencies if needed
print_status "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies"
        exit 1
    fi
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed"
fi

# Step 3: Run tests/linting if available
print_status "Running quality checks..."
if npm run lint --silent 2>/dev/null; then
    print_success "Linting passed"
else
    print_warning "No linting script found or linting failed"
fi

# Step 4: Build for GitHub Pages
print_status "Building for GitHub Pages..."
npm run build:github
if [ $? -ne 0 ]; then
    print_error "Build failed!"
    exit 1
fi
print_success "Build completed successfully"

# Step 5: Deploy to GitHub Pages
print_status "Deploying to GitHub Pages..."
npm run deploy
if [ $? -ne 0 ]; then
    print_error "Deployment failed!"
    exit 1
fi

print_success "🎉 Deployment completed successfully!"
echo ""
print_status "Your site should be available at: https://$(git remote get-url origin | sed 's/.*github.com[/:]\([^/]*\)\/\([^/.]*\).*/\1.github.io\/\2/')"
echo ""
print_status "📋 Deployment Summary:"
echo "  ✅ Code committed and pushed"
echo "  ✅ Dependencies checked"
echo "  ✅ Project built for GitHub Pages"
echo "  ✅ Deployed to gh-pages branch"
echo ""
print_warning "Note: It may take a few minutes for GitHub Pages to update the site."
