# 🪟 HƯỚNG DẪN SỬ DỤNG SCRIPTS WINDOWS

## 📋 **CÁC FILE ĐÃ TẠO**

### **1. fix-deploy.bat** (Batch Script)
- ✅ **Tương thích**: Windows XP trở lên
- ✅ **Không cần cài đặt thêm**: Chạy được ngay
- ✅ **Dễ sử dụng**: Double-click để chạy

### **2. fix-deploy.ps1** (PowerShell Script)  
- ✅ **Tính năng mạnh**: Màu sắc, thông tin chi tiết
- ✅ **Hiện đại**: Windows 7+ với PowerShell
- ✅ **Thông minh**: Tự động detect repository info

## 🚀 **CÁCH SỬ DỤNG**

### **Phương pháp 1: Batch Script (Đơn giản nhất)**

```cmd
# Mở Command Prompt tại thư mục dự án
cd Mom-baby-shop

# Chạy script
deploy.bat
```

**Hoặc đơn giản hơn:**
- Double-click vào file `deploy.bat`
- Script sẽ tự động chạy

### **Phương pháp 2: PowerShell Script (Khuyến nghị)**

```powershell
# Mở PowerShell tại thư mục dự án
cd Mom-baby-shop

# Chạy script
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

**Hoặc:**
- Right-click vào file `deploy.ps1`
- Chọn "Run with PowerShell"

## ⚙️ **TÍNH NĂNG SCRIPTS**

### **Cả 2 scripts đều có:**

✅ **Tự động clean build cũ**  
✅ **Build project cho GitHub Pages**  
✅ **Kiểm tra file quan trọng** (index.html, assets, 404.html)  
✅ **Hiển thị thống kê build**  
✅ **Tùy chọn deploy tự động**  
✅ **Hướng dẫn troubleshooting**  

### **PowerShell script có thêm:**

🌟 **Màu sắc đẹp mắt**  
🌟 **Thông tin repository tự động**  
🌟 **Kiểm tra environment** (Node.js, npm)  
🌟 **Tự động install dependencies**  
🌟 **Thống kê file size chi tiết**  

## 🔧 **TROUBLESHOOTING**

### **Nếu gặp lỗi "execution policy":**

```powershell
# Cho phép chạy PowerShell scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Hoặc chạy với bypass (một lần)
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

### **Nếu thiếu Node.js:**

1. Download từ: https://nodejs.org/
2. Cài đặt phiên bản LTS
3. Restart Command Prompt/PowerShell
4. Chạy lại script

### **Nếu thiếu Git:**

1. Download từ: https://git-scm.com/
2. Cài đặt với default settings
3. Restart terminal
4. Chạy lại script

## 📝 **SO SÁNH VỚI LINUX/MAC**

| Tính năng | Linux/Mac (bash) | Windows (batch) | Windows (PowerShell) |
|-----------|------------------|-----------------|---------------------|
| Tự động clean | ✅ | ✅ | ✅ |
| Build project | ✅ | ✅ | ✅ |
| Kiểm tra files | ✅ | ✅ | ✅ |
| Màu sắc | ✅ | ❌ | ✅ |
| Auto deploy | ✅ | ✅ | ✅ |
| Repo info | ✅ | ⚠️ | ✅ |
| Error handling | ✅ | ⚠️ | ✅ |

## 🎯 **KHUYẾN NGHỊ SỬ DỤNG**

### **Cho người mới:**
```cmd
deploy.bat
```
- Đơn giản, dễ hiểu
- Chạy được trên mọi Windows

### **Cho developer:**
```powershell
deploy.ps1
```
- Thông tin chi tiết
- Màu sắc đẹp mắt
- Tự động hóa cao

## 🔄 **QUY TRÌNH TỰ ĐỘNG**

### **Script sẽ thực hiện:**

1. **🧹 Clean up**: Xóa build cũ
2. **🔍 Check environment**: Node.js, npm, dependencies
3. **🏗️ Build**: Chạy `npm run build:github`
4. **✅ Verify**: Kiểm tra files đã build
5. **📊 Statistics**: Hiển thị thông tin build
6. **🚀 Deploy**: Tùy chọn deploy lên GitHub Pages
7. **🌐 URL**: Hiển thị link website

### **Kết quả mong đợi:**

```
✅ Build successful!
✅ index.html found (1.33 KB)
✅ Assets folder found (5 files)
✅ 404.html found (SPA routing support)
✅ No CNAME file (good for default GitHub Pages)

🌐 Your site will be available at:
https://jenniferzero.github.io/Mom-baby-shop/
```

## 🆘 **SUPPORT**

### **Nếu vẫn gặp vấn đề:**

1. **Check logs**: Đọc output của script
2. **Manual build**: Thử `npm run build:github`
3. **Check dependencies**: Chạy `npm install`
4. **Verify Git**: Chạy `git status`
5. **Contact**: Gửi screenshot lỗi

### **Files hỗ trợ khác:**

- `DEPLOYMENT_TROUBLESHOOTING.md` - Hướng dẫn debug chi tiết
- `check-deployment.sh` - Script kiểm tra status (Linux/Mac)

---

**💡 Tip**: Chạy script trong thư mục gốc của project (nơi có file package.json)
