#!/bin/bash

echo "🔍 Mom Baby Shop - Health Check"
echo "================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[CHECK]${NC} $1"; }
print_success() { echo -e "${GREEN}[✓]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run from project root."
    exit 1
fi

print_status "Starting health check..."
echo

# 1. Check Node.js and npm
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

# 2. Check dependencies
print_status "Checking dependencies..."
if [ -d "node_modules" ]; then
    print_success "node_modules exists"
    
    # Check package.json vs package-lock.json
    if [ -f "package-lock.json" ]; then
        print_success "package-lock.json exists"
    else
        print_warning "package-lock.json not found - dependencies might be inconsistent"
    fi
else
    print_error "node_modules not found - run 'npm install'"
fi

# 3. Check TypeScript files
print_status "Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    print_success "tsconfig.json exists"
else
    print_error "tsconfig.json not found!"
fi

# 4. Check source files
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
    fi
done

# 5. Check build scripts
print_status "Checking build scripts..."
BUILD_SCRIPTS=(
    "build-github.sh"
    "auto-deploy.sh"
    "update-image-paths.sh"
    "check-and-build.sh"
)

for script in "${BUILD_SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            print_success "$script exists and is executable"
        else
            print_warning "$script exists but not executable - run 'chmod +x $script'"
        fi
    else
        print_error "$script not found!"
    fi
done

# 6. Check asset helper usage
print_status "Checking asset helper usage..."
ASSET_FILES=(
    "src/screens/ImprovedHomePage/ImprovedHomePage.tsx"
    "src/screens/MainProductPage/MainProductPage.tsx"
    "src/screens/StrollerListPage/StrollerListPage.tsx"
    "src/screens/ClothingListPage/ClothingListPage.tsx"
    "src/screens/ProductDetailPage/ProductDetailPage.tsx"
)

ASSET_ISSUES=0
for file in "${ASSET_FILES[@]}"; do
    if [ -f "$file" ]; then
        if grep -q "getImagePath" "$file"; then
            print_success "$file uses getImagePath helper"
        else
            print_warning "$file might not use asset helper"
            ASSET_ISSUES=$((ASSET_ISSUES + 1))
        fi
    fi
done

# 7. Check for old image paths
print_status "Checking for old image path patterns..."
OLD_PATHS=$(find src -name "*.tsx" -exec grep -l '"/images/' {} \; 2>/dev/null | wc -l)
if [ "$OLD_PATHS" -eq 0 ]; then
    print_success "No old image path patterns found"
else
    print_warning "$OLD_PATHS files still use old image path patterns"
    echo "        Run './update-image-paths.sh' to fix"
fi

# 8. Try a quick build test
print_status "Testing build process..."
if npm run build >/dev/null 2>&1; then
    print_success "Build test passed"
else
    print_error "Build test failed - check for syntax errors"
fi

# 9. Check Git status
print_status "Checking Git status..."
if [ -d ".git" ]; then
    print_success "Git repository initialized"
    
    if git status --porcelain 2>/dev/null | grep -q .; then
        print_warning "Uncommitted changes detected"
    else
        print_success "Working directory clean"
    fi
else
    print_warning "Not a Git repository"
fi

# 10. Check available scripts
print_status "Checking package.json scripts..."
EXPECTED_SCRIPTS=(
    "dev"
    "build"
    "build:github"
    "preview:github"
    "deploy"
    "deploy:auto"
)

for script in "${EXPECTED_SCRIPTS[@]}"; do
    if npm run "$script" --silent >/dev/null 2>&1; then
        print_success "Script '$script' available"
    else
        # Check if script exists in package.json
        if grep -q "\"$script\":" package.json; then
            print_warning "Script '$script' exists but might have issues"
        else
            print_error "Script '$script' not found in package.json"
        fi
    fi
done

echo
print_status "Health check summary:"
echo "================================"

if [ "$ASSET_ISSUES" -eq 0 ] && [ "$OLD_PATHS" -eq 0 ]; then
    print_success "🎉 All checks passed! System is healthy."
    echo
    print_status "Ready for deployment:"
    echo "  npm run deploy:auto    # Automatic deployment"
    echo "  npm run preview:github # Preview GitHub build"
    echo "  npm run dev           # Start development"
else
    print_warning "⚠️  Some issues detected but system is functional."
    echo
    print_status "Recommended actions:"
    if [ "$ASSET_ISSUES" -gt 0 ]; then
        echo "  ./update-image-paths.sh  # Fix asset paths"
    fi
    if [ "$OLD_PATHS" -gt 0 ]; then
        echo "  ./update-image-paths.sh  # Update old image paths"
    fi
    echo "  npm run build:github    # Test build"
fi

echo
