@echo off
echo 🚀 Bắt đầu quá trình deploy...

echo 📦 Đang build project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build thất bại!
    pause
    exit /b 1
)

echo 📄 Copy CNAME file...
copy CNAME dist\

echo 📄 Tạo 404.html cho GitHub Pages routing...
copy dist\index.html dist\404.html

echo 🌐 Deploy lên GitHub Pages...
call npx gh-pages -d dist

if %errorlevel% neq 0 (
    echo ❌ Deploy thất bại!
    pause
    exit /b 1
)

echo ✅ Deploy hoàn thành! 
echo 🌐 Trang web sẽ sẵn sàng tại: https://jenniferzero.github.io/Mom-baby-shop/
echo ⏰ Có thể mất vài phút để cập nhật...
pause
