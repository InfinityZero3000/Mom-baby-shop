@echo off
echo 🔍 Kiểm tra cấu trúc project cho GitHub Pages...

echo.
echo 📂 Kiểm tra các file quan trọng:

if exist "index.html" (
    echo ✅ index.html - OK
) else (
    echo ❌ index.html - THIẾU
    set "hasError=1"
)

if exist "package.json" (
    echo ✅ package.json - OK
) else (
    echo ❌ package.json - THIẾU
    set "hasError=1"
)

if exist "vite.config.ts" (
    echo ✅ vite.config.ts - OK
) else (
    echo ❌ vite.config.ts - THIẾU
    set "hasError=1"
)

if exist ".github\workflows\deploy.yml" (
    echo ✅ GitHub Actions workflow - OK
) else (
    echo ❌ GitHub Actions workflow - THIẾU
    set "hasError=1"
)

if exist "404.html" (
    echo ✅ 404.html (cho SPA routing) - OK
) else (
    echo ⚠️  404.html - KHÔNG CÓ (sẽ được tạo tự động)
)

if exist "CNAME" (
    echo ✅ CNAME (custom domain) - OK
) else (
    echo ⚠️  CNAME - KHÔNG CÓ (sử dụng domain mặc định GitHub Pages)
)

echo.
echo 🔧 Kiểm tra cấu hình:

findstr /C:"base:" vite.config.ts >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Base path được cấu hình trong vite.config.ts
) else (
    echo ❌ Base path chưa được cấu hình
    set "hasError=1"
)

findstr /C:"build:github" package.json >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Script build:github có trong package.json
) else (
    echo ❌ Script build:github thiếu trong package.json
    set "hasError=1"
)

echo.
if defined hasError (
    echo ❌ Có lỗi trong cấu hình! Vui lòng kiểm tra và sửa.
    pause
    exit /b 1
) else (
    echo ✅ Tất cả cấu hình đều OK! Project sẵn sàng deploy lên GitHub Pages.
)

echo.
echo 📋 Hướng dẫn deploy:
echo 1. Commit và push code lên GitHub
echo 2. GitHub Actions sẽ tự động build và deploy
echo 3. Hoặc chạy: npm run deploy (deploy thủ công)
echo.

pause
