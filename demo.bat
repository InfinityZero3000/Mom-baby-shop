@echo off
REM Demo Script for Multi-Role Authentication System

echo 🎭 === MomBabyShop Multi-Role Authentication Demo ===
echo.
echo 🚀 Starting development server...
echo.

REM Start the development server
call npm run dev

echo.
echo 📖 === Quick Test Guide ===
echo.
echo 1. Open browser and go to: http://localhost:5173
echo 2. Click 'Đăng nhập' in the top navigation
echo 3. Test different roles:
echo.
echo    👤 Customer Demo:
echo    - Click 'Demo Khách hàng' button
echo    - Or use: customer@example.com / 123456
echo.
echo    🏪 Seller Demo:
echo    - Click 'Demo Người bán' button  
echo    - Or use: seller@example.com / 123456
echo.
echo    🛡️ Admin Demo:
echo    - Click 'Demo Quản trị viên' button
echo    - Or use: admin@example.com / 123456
echo.
echo 4. After login, check the header for role indicator
echo 5. Try different roles to see UI changes
echo.
echo 🎯 === Features to Test ===
echo - Role selection before login
echo - Demo account auto-fill
echo - User role indicator in header
echo - Dynamic UI based on role
echo - Logout functionality
echo.
echo 📚 For detailed guide, see: MULTI_ROLE_LOGIN_GUIDE.md

pause
