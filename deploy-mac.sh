#!/bin/bash

# Mom Baby Shop - Combined Deployment Script for macOS/Linux
# Usage: ./deploy-mac.sh [options]
#   Options:
#   --build-only   : Only build for GitHub Pages, don't deploy
#   --update-paths : Update image paths before building
#   --check        : Run health check before deployment
#   --deploy       : Build and deploy to GitHub Pages (default behavior)

echo "🚀 Mom Baby Shop - macOS/Linux Deployment Script"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }
print_header() { echo -e "${MAGENTA}\n$1${NC}\n"; }

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Parse command line arguments
BUILD_ONLY=false
UPDATE_PATHS=false
RUN_CHECK=false
DEPLOY=true

for arg in "$@"
do
    case $arg in
        --build-only)
        BUILD_ONLY=true
        DEPLOY=false
        shift
        ;;
        --update-paths)
        UPDATE_PATHS=true
        shift
        ;;
        --check)
        RUN_CHECK=true
        shift
        ;;
        --deploy)
        DEPLOY=true
        shift
        ;;
        *)
        # unknown option
        ;;
    esac
done

# PART 1: HEALTH CHECK FUNCTIONALITY
run_health_check() {
    print_header "🔍 Running Health Check"
    
    # Check Node.js and npm
    print_status "Checking Node.js and npm versions..."
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        print_success "Node.js: $NODE_VERSION"
    else
        print_error "Node.js not found!"
        exit 1
    fi

    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        print_success "npm: $NPM_VERSION"
    else
        print_error "npm not found!"
        exit 1
    fi

    # Check critical files
    print_status "Checking critical source files..."
    CRITICAL_FILES=(
        "src/App.tsx"
        "src/main.tsx"
        "src/lib/assets.ts"
        "vite.config.ts"
    )

    for file in "${CRITICAL_FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "$file exists"
        else
            print_error "$file not found!"
            exit 1
        fi
    done

    # Check package.json dependencies
    print_status "Checking dependencies..."
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules not found, installing dependencies..."
        npm install
        if [ $? -ne 0 ]; then
            print_error "Failed to install dependencies"
            exit 1
        fi
    else
        print_success "Dependencies installed"
    fi

    # Check image paths
    print_status "Checking image path usage..."
    OLD_PATHS=$(find src -name "*.tsx" -exec grep -l '"/images/' {} \; 2>/dev/null | wc -l)
    if [ "$OLD_PATHS" -eq 0 ]; then
        print_success "No old image path patterns found"
    else
        print_warning "$OLD_PATHS files still use old image path patterns"
        echo "        Consider running with --update-paths option"
        
        if [ "$UPDATE_PATHS" = true ]; then
            print_status "Will update image paths as requested"
        fi
    fi
    
    print_success "Health check completed"
}

# PART 2: UPDATE IMAGE PATHS FUNCTIONALITY
update_image_paths() {
    print_header "🔧 Updating Image Paths"
    
    # Define the files to update
    FILES=(
      "src/screens/ImprovedHomePage/ImprovedHomePage.tsx"
      "src/screens/MainProductPage/MainProductPage.tsx"
      "src/screens/StrollerListPage/StrollerListPage.tsx"
      "src/screens/ClothingListPage/ClothingListPage.tsx"
      "src/screens/ProductDetailPage/ProductDetailPage.tsx"
    )

    # Backup original files
    echo "📋 Creating backup of original files..."
    for file in "${FILES[@]}"; do
      if [ -f "$file" ]; then
        cp "$file" "$file.backup"
        echo "✅ Backed up $file"
      fi
    done

    echo "🔄 Updating image paths..."

    # Function to update a file
    update_file() {
      local file=$1
      echo "Updating $file..."
      
      # Add import for getImagePath at the top if not already present
      if ! grep -q "getImagePath" "$file"; then
        sed -i.tmp '1s/^/import { getImagePath } from "..\/..\/lib\/assets";\n/' "$file"
      fi
      
      # Replace direct image paths with getImagePath function
      sed -i.tmp 's/src="\([^"]*\/images\/[^"]*\)"/src={getImagePath("\1")}/g' "$file"
      sed -i.tmp 's/backgroundImage: "url(\([^)]*\/images\/[^)]*\))"/backgroundImage: `url(${getImagePath("\1")})`/g' "$file"
      
      # Clean up tmp files
      rm -f "$file.tmp"
      
      echo "✅ Updated $file"
    }

    # Update each file
    for file in "${FILES[@]}"; do
      if [ -f "$file" ]; then
        update_file "$file"
      else
        echo "⚠️ File not found: $file"
      fi
    done

    print_success "Image paths updated successfully"
    echo "NOTE: Original files have been backed up with .backup extension"
}

# PART 3: BUILD GITHUB PAGES FUNCTIONALITY
build_for_github() {
    print_header "🏗️ Building for GitHub Pages"
    
    # Set environment variable for GitHub Pages build
    export BUILD_FOR_GITHUB=true
    export NODE_ENV=production

    # Clean previous builds
    echo "🧹 Cleaning previous builds..."
    rm -rf dist

    # Build the project
    echo "🏗️ Building project..."
    npx vite build

    if [ $? -eq 0 ]; then
        print_success "GitHub Pages build completed successfully!"
        echo "📁 Build output is in the 'dist' directory"
        echo ""
        
        # List build contents
        echo "📦 Build contents:"
        ls -la dist/
        
        if [ "$DEPLOY" = false ]; then
            echo "📋 Next steps:"
            echo "  1. Run 'npm run preview:github' to preview the build"
            echo "  2. Run this script with --deploy option to deploy to GitHub Pages"
        fi
    else
        print_error "Build failed!"
        exit 1
    fi
}

# PART 4: DEPLOYMENT FUNCTIONALITY
deploy_to_github() {
    print_header "🚀 Deploying to GitHub Pages"
    
    # Check if git is initialized
    if [ ! -d ".git" ]; then
        print_error "Git repository not found. Please initialize git first."
        exit 1
    fi

    # Check for uncommitted changes
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

    # Deploy to GitHub Pages
    print_status "Deploying to GitHub Pages..."
    npx gh-pages -d dist
    
    if [ $? -ne 0 ]; then
        print_error "Deployment failed!"
        exit 1
    fi

    print_success "🎉 Deployment completed successfully!"
    echo ""
    
    # Display GitHub Pages URL
    print_status "Your site should be available at:"
    echo "https://$(git remote get-url origin | sed 's/.*github.com[/:]\([^/]*\)\/\([^/.]*\).*/\1.github.io\/\2/')"
    echo ""
    print_warning "Note: It may take a few minutes for GitHub Pages to update the site."
}

# MAIN EXECUTION FLOW
if [ "$RUN_CHECK" = true ]; then
    run_health_check
fi

if [ "$UPDATE_PATHS" = true ]; then
    update_image_paths
fi

build_for_github

if [ "$DEPLOY" = true ]; then
    deploy_to_github
fi

print_success "Script completed successfully!"
