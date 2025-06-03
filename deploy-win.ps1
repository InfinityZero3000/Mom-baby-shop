# Mom Baby Shop - Combined Deployment Script for Windows
# Run with: powershell -ExecutionPolicy Bypass -File deploy-win.ps1
# Options:
#   -BuildOnly      : Only build for GitHub Pages, don't deploy
#   -UpdatePaths    : Update image paths before building
#   -Check          : Run health check before deployment 
#   -Deploy         : Build and deploy to GitHub Pages (default behavior)

param (
    [switch]$BuildOnly = $false,
    [switch]$UpdatePaths = $false,
    [switch]$Check = $false,
    [switch]$Deploy = $true
)

# If BuildOnly is specified, set Deploy to false
if ($BuildOnly) {
    $Deploy = $false
}

# Enable colors in PowerShell
$Host.UI.RawUI.WindowTitle = "Mom Baby Shop - Windows Deployment"

# Color functions
function Write-Success { param($text) Write-Host $text -ForegroundColor Green }
function Write-Error { param($text) Write-Host $text -ForegroundColor Red }
function Write-Warning { param($text) Write-Host $text -ForegroundColor Yellow }
function Write-Info { param($text) Write-Host $text -ForegroundColor Cyan }
function Write-Header { param($text) Write-Host "`n$text`n" -ForegroundColor Magenta }

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Error "❌ package.json not found! Please run this script from the project root."
    exit 1
}

# PART 1: HEALTH CHECK FUNCTIONALITY
function Run-HealthCheck {
    Write-Header "🔍 Running Health Check"
    
    # Check Node.js and npm
    Write-Info "Checking Node.js and npm versions..."
    try {
        $nodeVersion = node --version 2>$null
        $npmVersion = npm --version 2>$null
        Write-Success "✅ Node.js: $nodeVersion"
        Write-Success "✅ npm: $npmVersion"
    } catch {
        Write-Error "❌ Node.js or npm not found!"
        Write-Warning "💡 Please install Node.js from https://nodejs.org/"
        exit 1
    }
    
    # Check critical files
    Write-Info "Checking critical files..."
    $criticalFiles = @(
        "src\App.tsx",
        "src\main.tsx",
        "src\lib\assets.ts",
        "vite.config.ts"
    )
    
    foreach ($file in $criticalFiles) {
        if (Test-Path $file) {
            Write-Success "✅ $file exists"
        } else {
            Write-Error "❌ $file not found!"
            exit 1
        }
    }
    
    # Check dependencies
    if (!(Test-Path "node_modules")) {
        Write-Warning "⚠️ node_modules not found, installing dependencies..."
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "❌ Failed to install dependencies!"
            exit 1
        }
        Write-Success "✅ Dependencies installed"
    } else {
        Write-Success "✅ Dependencies already installed"
    }
    
    # Check for old image paths
    Write-Info "Checking image path usage..."
    $oldPathsCount = (Select-String -Path "src\screens\*.tsx" -Pattern '"/images/' -List | Measure-Object).Count
    
    if ($oldPathsCount -eq 0) {
        Write-Success "✅ No old image path patterns found"
    } else {
        Write-Warning "⚠️ $oldPathsCount files still use old image path patterns"
        Write-Warning "💡 Consider using -UpdatePaths parameter"
        
        if ($UpdatePaths) {
            Write-Info "Will update image paths as requested"
        }
    }
    
    Write-Success "✅ Health check completed"
}

# PART 2: UPDATE IMAGE PATHS FUNCTIONALITY
function Update-ImagePaths {
    Write-Header "🔧 Updating Image Paths"
    
    # Since PowerShell isn't ideal for complex text processing,
    # we'll check if WSL or Git Bash is available
    
    if (Get-Command bash -ErrorAction SilentlyContinue) {
        Write-Info "Using bash for image path updates..."
        
        # Create a temporary script
        $tempScript = [System.IO.Path]::GetTempFileName() + ".sh"
        @"
#!/bin/bash
echo "🔧 Updating image paths to use asset helper..."

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
for file in "\${FILES[@]}"; do
  if [ -f "\$file" ]; then
    cp "\$file" "\$file.backup"
    echo "✅ Backed up \$file"
  fi
done

echo "🔄 Updating image paths..."

# Function to update a file
update_file() {
  local file=\$1
  echo "Updating \$file..."
  
  # Add import for getImagePath at the top if not already present
  if ! grep -q "getImagePath" "\$file"; then
    sed -i.tmp '1s/^/import { getImagePath } from "..\/..\/lib\/assets";\n/' "\$file"
  fi
  
  # Replace direct image paths with getImagePath function
  sed -i.tmp 's/src="\([^"]*\/images\/[^"]*\)"/src={getImagePath("\1")}/g' "\$file"
  sed -i.tmp 's/backgroundImage: "url(\([^)]*\/images\/[^)]*\))"/backgroundImage: `url(\${getImagePath("\1")})`/g' "\$file"
  
  # Clean up tmp files
  rm -f "\$file.tmp"
  
  echo "✅ Updated \$file"
}

# Update each file
for file in "\${FILES[@]}"; do
  if [ -f "\$file" ]; then
    update_file "\$file"
  else
    echo "⚠️ File not found: \$file"
  fi
done

echo "✅ Image paths updated successfully"
echo "NOTE: Original files have been backed up with .backup extension"
"@ | Out-File -FilePath $tempScript -Encoding ascii
        
        # Run the script with bash
        bash $tempScript
        
        # Clean up
        Remove-Item $tempScript -Force
    } else {
        Write-Warning "⚠️ bash not found. Cannot update image paths automatically on Windows."
        Write-Warning "💡 Please install Git Bash or WSL, or run this script on macOS/Linux."
        Write-Warning "💡 Alternatively, manually replace image paths to use getImagePath function."
        Write-Warning "💡 Example: src='/images/file.png' -> src={getImagePath('images/file.png')}"
        
        # Ask if the user wants to continue
        $continue = Read-Host "Continue with deployment anyway? (y/n)"
        if ($continue -ne "y") {
            exit 1
        }
    }
}

# PART 3: BUILD GITHUB PAGES FUNCTIONALITY
function Build-ForGitHub {
    Write-Header "🏗️ Building for GitHub Pages"
    
    # Clean previous builds
    Write-Info "📦 Cleaning previous build..."
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
        Write-Success "✅ Previous build cleaned"
    } else {
        Write-Warning "⚠️ No previous build found"
    }
    
    # Set environment variables
    $env:BUILD_FOR_GITHUB = "true"
    $env:NODE_ENV = "production"
    
    # Build the project
    Write-Info "🏗️ Building project..."
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "✅ GitHub Pages build completed successfully!"
        Write-Host ""
        
        # Show build contents
        Write-Info "📁 Build contents:"
        Get-ChildItem "dist" | ForEach-Object {
            if ($_.PSIsContainer) {
                Write-Host "  📁 $($_.Name)" -ForegroundColor Blue
            } else {
                $size = if ($_.Length -gt 1MB) { "{0:N2} MB" -f ($_.Length / 1MB) }
                       elseif ($_.Length -gt 1KB) { "{0:N2} KB" -f ($_.Length / 1KB) }
                       else { "$($_.Length) bytes" }
                Write-Host "  📄 $($_.Name) ($size)" -ForegroundColor White
            }
        }
        Write-Host ""
        
        # Check important files
        Write-Info "🔍 Checking important files:"
        
        if (Test-Path "dist\index.html") {
            $indexSize = (Get-Item "dist\index.html").Length
            Write-Success "✅ index.html found ($indexSize bytes)"
        } else {
            Write-Error "❌ index.html missing!"
            Write-Warning "💡 Check vite.config.ts configuration"
            exit 1
        }
        
        if (Test-Path "dist\assets") {
            $assetCount = (Get-ChildItem "dist\assets").Count
            Write-Success "✅ Assets folder found ($assetCount files)"
        } else {
            Write-Error "❌ Assets folder missing!"
            Write-Warning "💡 Check if build process completed successfully"
            exit 1
        }
        
        # Calculate total build size
        $totalSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
        $totalSizeFormatted = if ($totalSize -gt 1MB) { "{0:N2} MB" -f ($totalSize / 1MB) }
                             elseif ($totalSize -gt 1KB) { "{0:N2} KB" -f ($totalSize / 1KB) }
                             else { "$totalSize bytes" }
        
        Write-Info "📊 Build statistics:"
        Write-Host "  Total size: $totalSizeFormatted" -ForegroundColor White
        
        if (!$Deploy) {
            Write-Info "📋 Next steps:"
            Write-Host "  1. Run 'npm run preview:github' to preview the build" -ForegroundColor White
            Write-Host "  2. Run this script with -Deploy parameter to deploy to GitHub Pages" -ForegroundColor White
        }
    } else {
        Write-Error "❌ Build failed!"
        exit 1
    }
}

# PART 4: DEPLOYMENT FUNCTIONALITY
function Deploy-ToGitHub {
    Write-Header "🚀 Deploying to GitHub Pages"
    
    # Check if git is available
    try {
        $gitVersion = git --version
        Write-Success "✅ Git detected: $gitVersion"
    } catch {
        Write-Error "❌ Git not found! Please install Git."
        exit 1
    }
    
    # Get repository information
    try {
        $repoUrl = git config --get remote.origin.url 2>$null
        if ($repoUrl -match "github\.com[:/]([^/]+)/([^/]+)\.git$|github\.com[:/]([^/]+)/([^/]+)$") {
            $username = if ($matches[1]) { $matches[1] } else { $matches[3] }
            $repoName = if ($matches[2]) { $matches[2] } else { $matches[4] }
            $githubPagesUrl = "https://$username.github.io/$repoName/"
            
            Write-Info "🌐 Repository information:"
            Write-Host "  Repository: $username/$repoName" -ForegroundColor White
            Write-Host "  GitHub Pages URL: $githubPagesUrl" -ForegroundColor White
        } else {
            Write-Warning "⚠️ Could not parse repository URL"
            $githubPagesUrl = "https://YOUR_USERNAME.github.io/Mom-baby-shop/"
        }
    } catch {
        Write-Warning "⚠️ Could not get repository information"
        $githubPagesUrl = "https://YOUR_USERNAME.github.io/Mom-baby-shop/"
    }
    
    # Check for uncommitted changes
    $hasChanges = git status --porcelain
    if ($hasChanges) {
        Write-Warning "⚠️ You have uncommitted changes. Committing them first..."
        
        # Add all changes
        git add .
        
        # Commit with timestamp
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $commitMessage = "Update paths and build for GitHub Pages - $timestamp"
        git commit -m $commitMessage
        
        Write-Success "✅ Changes committed: $commitMessage"
    } else {
        Write-Success "✅ Working directory is clean"
    }
    
    # Deploy to GitHub Pages
    Write-Info "🚀 Deploying to GitHub Pages..."
    npx gh-pages -d dist
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "✅ Deployment successful!"
        Write-Host ""
        Write-Info "🌐 Your site will be available at:"
        Write-Host "  $githubPagesUrl" -ForegroundColor Green
        Write-Host ""
        Write-Warning "⏱️ Note: GitHub Pages may take 2-3 minutes to update"
        Write-Warning "💡 Test in incognito mode to avoid cache issues"
    } else {
        Write-Error "❌ Deployment failed!"
        Write-Warning "💡 Check your GitHub credentials and repository access"
        Write-Warning "💡 You may need to install gh-pages: npm install -g gh-pages"
        exit 1
    }
}

# MAIN EXECUTION FLOW
if ($Check) {
    Run-HealthCheck
}

if ($UpdatePaths) {
    Update-ImagePaths
}

Build-ForGitHub

if ($Deploy) {
    Deploy-ToGitHub
}

Write-Success "🎉 Script completed successfully!"
