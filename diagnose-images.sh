#!/bin/bash

# Image Loading Diagnostic Script
# This script helps diagnose why images might not be loading

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Image Loading Diagnostic Script${NC}"
echo "=================================================="

# Function to test URL
test_url() {
    local url=$1
    local description=$2
    
    echo -n "Testing $description: "
    
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status_code" -eq 200 ]; then
        echo -e "${GREEN}✅ OK (HTTP $status_code)${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED (HTTP $status_code)${NC}"
        return 1
    fi
}

# Function to check local files
check_local_files() {
    echo -e "${YELLOW}📁 Checking local files...${NC}"
    
    if [ -d "images" ]; then
        echo -e "${GREEN}✅ Local images directory exists${NC}"
        echo "📸 Sample images:"
        ls images/ | head -5
    else
        echo -e "${RED}❌ Local images directory missing${NC}"
    fi
    
    if [ -d "dist/images" ]; then
        echo -e "${GREEN}✅ Built images directory exists${NC}"
        echo "📸 Built images:"
        ls dist/images/ | head -5
    else
        echo -e "${RED}❌ Built images directory missing${NC}"
    fi
}

# Function to check GitHub Pages deployment
check_github_pages() {
    echo -e "${YELLOW}🌐 Checking GitHub Pages deployment...${NC}"
    
    # Get repository info
    REPO_URL=$(git config --get remote.origin.url)
    if [[ $REPO_URL == *"github.com"* ]]; then
        USERNAME=$(echo $REPO_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/.*/\1/p')
        REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^/]*\)\.git.*/\1/p')
        
        if [ -z "$REPO_NAME" ]; then
            REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^/]*\)/\1/p')
        fi
        
        BASE_URL="https://${USERNAME}.github.io/${REPO_NAME}"
        
        echo "Repository: $USERNAME/$REPO_NAME"
        echo "Base URL: $BASE_URL"
        echo ""
        
        # Test main page
        test_url "$BASE_URL/" "Main page"
        
        # Test sample images
        echo ""
        echo "Testing sample images:"
        test_url "$BASE_URL/images/stroller-1.png" "Stroller image 1"
        test_url "$BASE_URL/images/stroller-premium.png" "Premium stroller"
        test_url "$BASE_URL/images/baby-clothes-1.png" "Baby clothes 1"
        test_url "$BASE_URL/images/mom-baby.jpg" "Hero image"
        test_url "$BASE_URL/images/brand-joie.png" "Joie brand logo"
        
    else
        echo -e "${RED}❌ Could not determine repository info${NC}"
    fi
}

# Function to check React component paths
check_react_paths() {
    echo -e "${YELLOW}⚛️ Checking React component image paths...${NC}"
    
    # Check if image paths in React components are correct
    if grep -r "src=\"/images/" src/ >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Found /images/ paths in React components${NC}"
        echo "Sample paths found:"
        grep -r "src=\"/images/" src/ | head -3
    else
        echo -e "${RED}❌ No /images/ paths found in React components${NC}"
    fi
    
    # Check for old public paths
    if grep -r "src=\"/" src/ | grep -v "/images/" >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Found potential old image paths:${NC}"
        grep -r "src=\"/" src/ | grep -v "/images/" | head -3
    fi
}

# Function to analyze build output
analyze_build() {
    echo -e "${YELLOW}🔨 Analyzing build output...${NC}"
    
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✅ index.html exists${NC}"
        
        # Check if base href is set correctly
        if grep -q "base href" dist/index.html; then
            echo "Base href found in HTML:"
            grep "base href" dist/index.html
        else
            echo -e "${YELLOW}⚠️ No base href found in HTML${NC}"
        fi
        
        # Check for script sources
        echo ""
        echo "Script sources in HTML:"
        grep -o 'src="[^"]*"' dist/index.html | head -3
        
    else
        echo -e "${RED}❌ index.html not found${NC}"
    fi
}

# Function to provide recommendations
provide_recommendations() {
    echo ""
    echo -e "${BLUE}📋 Recommendations:${NC}"
    echo "=================================================="
    
    echo "1. 🔧 For React image loading issues:"
    echo "   - Ensure all image paths start with '/images/'"
    echo "   - Use absolute paths, not relative ones"
    echo "   - Consider using import statements for critical images"
    
    echo ""
    echo "2. 🌐 For GitHub Pages deployment:"
    echo "   - Use BrowserRouter with basename instead of HashRouter"
    echo "   - Ensure base path is set correctly in Vite config"
    echo "   - Check that images are copied to dist/images/"
    
    echo ""
    echo "3. 🐛 For debugging:"
    echo "   - Open browser console to check for 404 errors"
    echo "   - Test image URLs directly in browser"
    echo "   - Verify CORS and security policies"
    
    echo ""
    echo "4. 🚀 To apply fixes:"
    echo "   - Run: ./unified-deploy.sh"
    echo "   - Wait 1-2 minutes for GitHub Pages to update"
    echo "   - Test the deployment"
}

# Main execution
main() {
    check_local_files
    echo ""
    check_react_paths
    echo ""
    analyze_build
    echo ""
    check_github_pages
    echo ""
    provide_recommendations
}

# Run main function
main
