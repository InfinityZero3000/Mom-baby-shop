@echo off
setlocal enabledelayedexpansion

echo 🔧 Fixing deployment issues for GitHub Pages...
echo.

REM 1. Clean previous build
echo 📦 Cleaning previous build...
if exist "dist" (
    rmdir /s /q "dist"
    echo ✅ Previous build cleaned
) else (
    echo ⚠️ No previous build found
)
echo.

REM 2. Build for GitHub Pages
echo 🏗️ Building for GitHub Pages...
call npm run build:github

REM Check if npm command was successful
if %errorlevel% neq 0 (
    echo ❌ Build command failed!
    echo 💡 Try running: npm install
    pause
    exit /b 1
)
echo.

REM 3. Check if build was successful
if exist "dist" (
    echo ✅ Build successful!
    echo 📁 Build contents:
    dir /b "dist"
    echo.
    
    REM 4. Check if index.html exists
    if exist "dist\index.html" (
        echo ✅ index.html found
        for %%i in ("dist\index.html") do echo    Size: %%~zi bytes
    ) else (
        echo ❌ index.html missing!
        echo 💡 Check vite.config.ts configuration
    )
    echo.
    
    REM 5. Check if assets exist
    if exist "dist\assets" (
        echo ✅ Assets folder found
        echo 📦 Assets:
        dir /b "dist\assets"
        echo.
        
        REM Count asset files
        for /f %%i in ('dir /b "dist\assets" ^| find /c /v ""') do set asset_count=%%i
        echo    Total assets: !asset_count! files
    ) else (
        echo ❌ Assets folder missing!
        echo 💡 Check if build process completed successfully
    )
    echo.
    
    REM 6. Check for common files
    echo 🔍 Checking for important files:
    if exist "dist\404.html" (
        echo ✅ 404.html found ^(SPA routing support^)
    ) else (
        echo ⚠️ 404.html not found ^(may affect routing^)
    )
    
    if exist "dist\CNAME" (
        echo ⚠️ CNAME file found ^(may cause issues^)
        echo 💡 Consider removing CNAME for GitHub Pages default domain
    ) else (
        echo ✅ No CNAME file ^(good for default GitHub Pages^)
    )
    echo.
    
    REM 7. Calculate total build size
    echo 📊 Build statistics:
    for /f "tokens=3" %%i in ('dir "dist" /s /-c ^| find "File(s)"') do set total_size=%%i
    echo    Total size: !total_size! bytes
    echo.
    
    REM 8. Deployment options
    echo 🚀 Deployment options:
    echo.
    echo    Option 1 - Manual deploy:
    echo    npx gh-pages -d dist
    echo.
    echo    Option 2 - Manual deploy with cleanup:
    echo    npx gh-pages -d dist --dotfiles
    echo.
    echo    Option 3 - Push to trigger GitHub Actions:
    echo    git add .
    echo    git commit -m "Update build"
    echo    git push origin main
    echo.
    
    REM 9. Ask user for deployment
    set /p deploy_choice="🤔 Deploy now? (y/n): "
    if /i "!deploy_choice!"=="y" (
        echo.
        echo 🚀 Deploying to GitHub Pages...
        call npx gh-pages -d dist
        
        if !errorlevel! equ 0 (
            echo.
            echo ✅ Deployment successful!
            echo 🌐 Your site will be available at:
            
            REM Try to get repository info
            for /f "tokens=*" %%i in ('git config --get remote.origin.url 2^>nul') do set repo_url=%%i
            if defined repo_url (
                REM Extract username and repo name from GitHub URL
                for /f "tokens=1,2 delims=/" %%a in ("!repo_url:*/=!") do (
                    set username=%%a
                    set repo_name=%%b
                )
                set repo_name=!repo_name:.git=!
                echo    https://!username!.github.io/!repo_name!/
            ) else (
                echo    https://YOUR_USERNAME.github.io/Mom-baby-shop/
            )
            echo.
            echo ⏱️ Note: GitHub Pages may take 2-3 minutes to update
            echo 💡 Test in incognito mode to avoid cache issues
        ) else (
            echo ❌ Deployment failed!
            echo 💡 Check your GitHub credentials and repository access
        )
    ) else (
        echo.
        echo ⏭️ Skipping deployment
        echo 💡 Run deployment manually when ready:
        echo    npx gh-pages -d dist
    )
    
) else (
    echo ❌ Build failed!
    echo.
    echo 🔍 Troubleshooting steps:
    echo 1. Check if Node.js is installed: node --version
    echo 2. Check if npm is working: npm --version
    echo 3. Install dependencies: npm install
    echo 4. Try building again: npm run build:github
    echo 5. Check for errors in the output above
    echo.
    pause
    exit /b 1
)

echo.
echo 🎉 Script completed!
echo 📋 Next steps if deployment was successful:
echo    1. Wait 2-3 minutes for GitHub Pages to update
echo    2. Visit your site URL
echo    3. Test in incognito/private mode
echo    4. Check browser console for any errors ^(F12^)
echo    5. Test authentication with: admin@test.com / 123456
echo.

pause
