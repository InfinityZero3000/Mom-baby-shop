# PowerShell script for fixing deployment issues on Windows
# Run with: powershell -ExecutionPolicy Bypass -File deploy.ps1

# Enable colors in PowerShell
$Host.UI.RawUI.WindowTitle = "Mom Baby Shop - Deployment Fix"

# Color functions
function Write-Success { param($text) Write-Host $text -ForegroundColor Green }
function Write-Error { param($text) Write-Host $text -ForegroundColor Red }
function Write-Warning { param($text) Write-Host $text -ForegroundColor Yellow }
function Write-Info { param($text) Write-Host $text -ForegroundColor Cyan }

Write-Host "🔧 Fixing deployment issues for GitHub Pages..." -ForegroundColor Magenta
Write-Host ""

# 1. Clean previous build
Write-Info "📦 Cleaning previous build..."
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Success "✅ Previous build cleaned"
} else {
    Write-Warning "⚠️ No previous build found"
}
Write-Host ""

# 2. Check Node.js and npm
Write-Info "🔍 Checking environment..."
try {
    $nodeVersion = node --version 2>$null
    $npmVersion = npm --version 2>$null
    Write-Success "✅ Node.js: $nodeVersion"
    Write-Success "✅ npm: $npmVersion"
} catch {
    Write-Error "❌ Node.js or npm not found!"
    Write-Warning "💡 Please install Node.js from https://nodejs.org/"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# 3. Check if package.json exists
if (!(Test-Path "package.json")) {
    Write-Error "❌ package.json not found!"
    Write-Warning "💡 Make sure you're in the correct project directory"
    Read-Host "Press Enter to exit"
    exit 1
}

# 4. Install dependencies if needed
if (!(Test-Path "node_modules")) {
    Write-Warning "⚠️ node_modules not found, installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "❌ Failed to install dependencies!"
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Success "✅ Dependencies installed"
    Write-Host ""
}

# 5. Build for GitHub Pages
Write-Info "🏗️ Building for GitHub Pages..."
npm run build:github

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Build command failed!"
    Write-Warning "💡 Check the error messages above"
    Write-Warning "💡 Try running: npm install"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# 6. Check if build was successful
if (Test-Path "dist") {
    Write-Success "✅ Build successful!"
    
    # Display build contents
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
    
    # 7. Check important files
    Write-Info "🔍 Checking important files:"
    
    if (Test-Path "dist\index.html") {
        $indexSize = (Get-Item "dist\index.html").Length
        Write-Success "✅ index.html found ($indexSize bytes)"
    } else {
        Write-Error "❌ index.html missing!"
        Write-Warning "💡 Check vite.config.ts configuration"
    }
    
    if (Test-Path "dist\assets") {
        $assetCount = (Get-ChildItem "dist\assets").Count
        Write-Success "✅ Assets folder found ($assetCount files)"
        
        # Show asset details
        Write-Host "  📦 Assets:" -ForegroundColor Gray
        Get-ChildItem "dist\assets" | ForEach-Object {
            $size = if ($_.Length -gt 1MB) { "{0:N2} MB" -f ($_.Length / 1MB) }
                   elseif ($_.Length -gt 1KB) { "{0:N2} KB" -f ($_.Length / 1KB) }
                   else { "$($_.Length) bytes" }
            Write-Host "    - $($_.Name) ($size)" -ForegroundColor Gray
        }
    } else {
        Write-Error "❌ Assets folder missing!"
        Write-Warning "💡 Check if build process completed successfully"
    }
    
    if (Test-Path "dist\404.html") {
        Write-Success "✅ 404.html found (SPA routing support)"
    } else {
        Write-Warning "⚠️ 404.html not found (may affect routing)"
    }
    
    if (Test-Path "dist\CNAME") {
        Write-Warning "⚠️ CNAME file found (may cause issues)"
        Write-Warning "💡 Consider removing CNAME for GitHub Pages default domain"
    } else {
        Write-Success "✅ No CNAME file (good for default GitHub Pages)"
    }
    Write-Host ""
    
    # 8. Calculate total build size
    $totalSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
    $totalSizeFormatted = if ($totalSize -gt 1MB) { "{0:N2} MB" -f ($totalSize / 1MB) }
                         elseif ($totalSize -gt 1KB) { "{0:N2} KB" -f ($totalSize / 1KB) }
                         else { "$totalSize bytes" }
    
    Write-Info "📊 Build statistics:"
    Write-Host "  Total size: $totalSizeFormatted" -ForegroundColor White
    Write-Host ""
    
    # 9. Get repository information
    try {
        $repoUrl = git config --get remote.origin.url 2>$null
        if ($repoUrl -match "github\.com[:/]([^/]+)/([^/]+)\.git$|github\.com[:/]([^/]+)/([^/]+)$") {
            $username = if ($matches[1]) { $matches[1] } else { $matches[3] }
            $repoName = if ($matches[2]) { $matches[2] } else { $matches[4] }
            $githubPagesUrl = "https://$username.github.io/$repoName/"
            
            Write-Info "🌐 Repository information:"
            Write-Host "  Repository: $username/$repoName" -ForegroundColor White
            Write-Host "  GitHub Pages URL: $githubPagesUrl" -ForegroundColor White
        }
    } catch {
        $githubPagesUrl = "https://YOUR_USERNAME.github.io/Mom-baby-shop/"
    }
    Write-Host ""
    
    # 10. Deployment options
    Write-Info "🚀 Deployment options:"
    Write-Host "  1. Manual deploy: npx gh-pages -d dist" -ForegroundColor White
    Write-Host "  2. Git push (if GitHub Actions configured): git push origin main" -ForegroundColor White
    Write-Host ""
    
    # 11. Ask for deployment
    $deployChoice = Read-Host "🤔 Deploy now? (y/n)"
    if ($deployChoice -match "^[Yy]") {
        Write-Host ""
        Write-Info "🚀 Deploying to GitHub Pages..."
        
        npx gh-pages -d dist
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Success "✅ Deployment successful!"
            Write-Host ""
            Write-Info "🌐 Your site will be available at:"
            if ($githubPagesUrl) {
                Write-Host "  $githubPagesUrl" -ForegroundColor Green
            } else {
                Write-Host "  https://YOUR_USERNAME.github.io/Mom-baby-shop/" -ForegroundColor Green
            }
            Write-Host ""
            Write-Warning "⏱️ Note: GitHub Pages may take 2-3 minutes to update"
            Write-Warning "💡 Test in incognito mode to avoid cache issues"
            Write-Warning "🔑 Test login with: admin@test.com / 123456"
        } else {
            Write-Error "❌ Deployment failed!"
            Write-Warning "💡 Check your GitHub credentials and repository access"
            Write-Warning "💡 You may need to install gh-pages: npm install -g gh-pages"
        }
    } else {
        Write-Host ""
        Write-Warning "⏭️ Skipping deployment"
        Write-Info "💡 Run deployment manually when ready:"
        Write-Host "  npx gh-pages -d dist" -ForegroundColor White
    }
    
} else {
    Write-Error "❌ Build failed!"
    Write-Host ""
    Write-Warning "🔍 Troubleshooting steps:"
    Write-Host "1. Check Node.js version: node --version" -ForegroundColor Gray
    Write-Host "2. Check npm version: npm --version" -ForegroundColor Gray
    Write-Host "3. Install dependencies: npm install" -ForegroundColor Gray
    Write-Host "4. Check build script in package.json" -ForegroundColor Gray
    Write-Host "5. Try building in development: npm run dev" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Success "🎉 Script completed!"
Write-Host ""
Write-Info "📋 Next steps if deployment was successful:"
Write-Host "  1. Wait 2-3 minutes for GitHub Pages to update" -ForegroundColor White
Write-Host "  2. Visit your site URL" -ForegroundColor White
Write-Host "  3. Test in incognito/private mode" -ForegroundColor White
Write-Host "  4. Check browser console for any errors (F12)" -ForegroundColor White
Write-Host "  5. Test authentication and protected routes" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to exit"
