#!/bin/bash

echo "🔍 Checking deployment status..."

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
if [[ $REPO_URL == *"github.com"* ]]; then
    # Extract username and repo name
    USERNAME=$(echo $REPO_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/.*/\1/p')
    REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^/]*\)\.git.*/\1/p')
    
    if [ -z "$REPO_NAME" ]; then
        REPO_NAME=$(echo $REPO_URL | sed -n 's/.*\/\([^/]*\)/\1/p')
    fi
    
    GITHUB_PAGES_URL="https://${USERNAME}.github.io/${REPO_NAME}/"
    
    echo -e "${YELLOW}Repository:${NC} $USERNAME/$REPO_NAME"
    echo -e "${YELLOW}GitHub Pages URL:${NC} $GITHUB_PAGES_URL"
    echo ""
    
    # Check if gh-pages branch exists
    if git ls-remote --heads origin gh-pages | grep -q gh-pages; then
        echo -e "${GREEN}✅ gh-pages branch exists${NC}"
    else
        echo -e "${RED}❌ gh-pages branch not found${NC}"
        exit 1
    fi
    
    # Check local build
    if [ -d "dist" ]; then
        echo -e "${GREEN}✅ dist folder exists${NC}"
        echo -e "${YELLOW}Build files:${NC}"
        ls -la dist/ | head -10
    else
        echo -e "${RED}❌ dist folder not found${NC}"
        echo "Run: npm run build:github"
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}🚀 Deployment URLs to test:${NC}"
    echo "Main site: $GITHUB_PAGES_URL"
    echo "Login: ${GITHUB_PAGES_URL}#/login"
    echo "Products: ${GITHUB_PAGES_URL}#/products"
    echo "Profile: ${GITHUB_PAGES_URL}#/profile"
    
    echo ""
    echo -e "${YELLOW}📝 Test checklist:${NC}"
    echo "1. Wait 2-3 minutes for GitHub Pages to update"
    echo "2. Open URL in incognito/private mode"
    echo "3. Check browser console for errors (F12)"
    echo "4. Test login with: admin@test.com / 123456"
    echo "5. Test protected routes after login"
    
    echo ""
    echo -e "${YELLOW}🔧 If still blank screen:${NC}"
    echo "1. Check: https://github.com/$USERNAME/$REPO_NAME/settings/pages"
    echo "2. Verify source is set to 'gh-pages' branch"
    echo "3. Force refresh browser (Ctrl+F5 or Cmd+Shift+R)"
    echo "4. Try in different browser"
    
else
    echo -e "${RED}❌ Not a GitHub repository${NC}"
    exit 1
fi
