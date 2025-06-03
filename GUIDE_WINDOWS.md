# 🪟 HƯỚNG DẪN TRIỂN KHAI MOM-BABY-SHOP TRÊN WINDOWS

> **TỔNG QUAN:** Tài liệu này hướng dẫn chi tiết cách triển khai dự án Mom-Baby-Shop lên GitHub Pages từ môi trường Windows, giải thích các scripts có sẵn, quy trình triển khai, và cách xử lý các sự cố thường gặp.

## 📋 **FILE SCRIPT CHÍNH**

### **deploy-win.ps1** (PowerShell Script)
- ✅ **Giao diện**: Hiển thị màu sắc và thông tin chi tiết
- ✅ **Tính năng đa năng**: Cung cấp nhiều tùy chọn thông qua tham số
- ✅ **Tính năng nâng cao**: Tự động phát hiện thông tin repository và kiểm tra môi trường
- ✅ **Hiện đại**: Tối ưu cho Windows 7 trở lên

## 🚀 **HƯỚNG DẪN SỬ DỤNG**

### **Sử dụng npm scripts (Khuyến nghị)**

```powershell
# Mở Command Prompt hoặc PowerShell tại thư mục dự án
cd Mom-baby-shop

# Triển khai đầy đủ (build và deploy)
npm run deploy:win

# HOẶC chỉ build cho GitHub Pages
npm run build:win

# HOẶC cập nhật đường dẫn hình ảnh và build
npm run update-paths:win

# HOẶC kiểm tra hệ thống trước khi build
npm run check:win
```

### **Sử dụng PowerShell Script trực tiếp**

```powershell
# Mở PowerShell tại thư mục dự án
cd Mom-baby-shop

# Triển khai đầy đủ
powershell -ExecutionPolicy Bypass -File deploy-win.ps1

# HOẶC chỉ build
powershell -ExecutionPolicy Bypass -File deploy-win.ps1 -BuildOnly

# HOẶC cập nhật đường dẫn hình ảnh và build
powershell -ExecutionPolicy Bypass -File deploy-win.ps1 -UpdatePaths -BuildOnly

# HOẶC chạy kiểm tra trước khi build
powershell -ExecutionPolicy Bypass -File deploy-win.ps1 -Check -BuildOnly
```

**Hoặc cách tiện lợi hơn:**
- Nhấp chuột phải vào file `deploy-win.ps1`
- Chọn "Run with PowerShell"

## ⚙️ **QUY TRÌNH TRIỂN KHAI**

### **Các bước thực hiện khi chạy script:**

1. **🧹 Dọn dẹp build cũ**: Xóa thư mục `dist` nếu đã tồn tại
2. **🔍 Kiểm tra môi trường**: Xác minh Node.js, npm và các dependencies
3. **🏗️ Build cho GitHub Pages**: Thực hiện `npm run build:github` với cấu hình đúng
4. **✅ Kiểm tra kết quả build**: Xác minh các file quan trọng trong thư mục `dist`
5. **📊 Hiển thị thống kê**: Kích thước file, số lượng assets
6. **🚀 Deploy lên GitHub Pages**: Tùy chọn triển khai sử dụng `gh-pages`

### **PowerShell script (deploy-win.ps1) có các tính năng bổ sung:**

🌟 **Hiển thị màu sắc**: Dễ đọc với các thông báo được tô màu  
🌟 **Tự động phát hiện repository**: Hiển thị URL GitHub Pages chính xác  
🌟 **Kiểm tra môi trường đầy đủ**: Phát hiện phiên bản Node.js, npm  
🌟 **Tự động cài đặt dependencies**: Kiểm tra và cài đặt nếu cần  
🌟 **Thống kê chi tiết**: Hiển thị kích thước file, cấu trúc thư mục build  

## 🔧 **XỬ LÝ SỰ CỐ**

### **1. Lỗi "Execution Policy" khi chạy PowerShell script:**

```powershell
# Cách 1: Thiết lập policy cho user hiện tại (chỉ cần làm một lần)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Cách 2: Chạy script với bypass (mỗi lần chạy)
powershell -ExecutionPolicy Bypass -File deploy-win.ps1
```

### **2. Lỗi "Node.js không tìm thấy":**

1. Tải Node.js từ: https://nodejs.org/ (chọn phiên bản LTS)
2. Cài đặt với tùy chọn mặc định (quan trọng: chọn "Add to PATH")
3. Khởi động lại Command Prompt/PowerShell
4. Kiểm tra cài đặt: `node --version` và `npm --version`
5. Chạy lại script triển khai

### **3. Lỗi khi sử dụng Git hoặc gh-pages:**

1. Cài đặt Git từ: https://git-scm.com/
2. Đảm bảo bạn đã cài đặt gh-pages: `npm install -g gh-pages`
3. Kiểm tra cấu hình remote: `git remote -v`
4. Xác minh quyền truy cập repository GitHub của bạn

## 📝 **TÍCH HỢP GIỮA WINDOWS VÀ MAC**

Dự án Mom-baby-shop được thiết kế để hoạt động trên cả Windows và macOS/Linux, với các script tương ứng cho từng nền tảng.

| Tính năng | macOS/Linux | Windows (batch) | Windows (PowerShell) |
|-----------|-------------|-----------------|---------------------|
| Script chính | `deploy-mac.sh` | `deploy-win.ps1` |
| Build GitHub Pages | `npm run build:mac` | `npm run build:win` |
| Cập nhật đường dẫn | `npm run update-paths:mac` | `npm run update-paths:win` |
| Kiểm tra hệ thống | `npm run check:mac` | `npm run check:win` |
| Triển khai | `npm run deploy` | `npx gh-pages -d dist` | `npx gh-pages -d dist` |

> **Lưu ý:** Windows có thể chạy các file `.sh` thông qua Windows Subsystem for Linux (WSL) nếu đã cài đặt.

## 🎯 **KHUYẾN NGHỊ SỬ DỤNG**

### **Dành cho người mới:**
```cmd
# Đơn giản nhất - chỉ cần double-click vào deploy-win.ps1 trong Windows Explorer và chọn "Run with PowerShell"
deploy-win.ps1
```
**Ưu điểm:**
- ✅ Đơn giản, dễ hiểu
- ✅ Không cần cài đặt thêm
- ✅ Hoạt động trên mọi phiên bản Windows 
- ✅ Tự động hướng dẫn khi gặp lỗi

### **Dành cho nhà phát triển:**
```powershell
# Mở PowerShell và chạy
cd đường\dẫn\đến\Mom-baby-shop
.\deploy-win.ps1
```
**Ưu điểm:**
- ✅ Hiển thị thông tin chi tiết với màu sắc
- ✅ Phát hiện và xử lý lỗi tốt hơn
- ✅ Tự động kiểm tra môi trường đầy đủ
- ✅ Hiển thị thống kê chi tiết về build

## 🔄 **CHI TIẾT QUY TRÌNH TRIỂN KHAI**

### **1. Quy trình triển khai tự động:**

1. **🧹 Dọn dẹp thư mục build cũ**
   ```powershell
   # PowerShell
   Remove-Item -Recurse -Force "dist"
   ```

2. **🔍 Kiểm tra môi trường phát triển**
   ```powershell
   # Kiểm tra Node.js và npm
   node --version
   npm --version
   ```

3. **🏗️ Build dự án cho GitHub Pages**
   ```powershell
   # Script sẽ thực hiện build cho GitHub Pages
   npm run build:win
   ```

4. **✅ Xác minh kết quả build**
   ```powershell
   # Kiểm tra các file quan trọng
   Test-Path "dist\index.html"
   Test-Path "dist\assets"
   ```

5. **🚀 Triển khai lên GitHub Pages**
   ```powershell
   # Deploy bằng gh-pages
   npx gh-pages -d dist
   ```

### **2. Kết quả của quy trình triển khai:**

```
✅ Build successful!
✅ index.html found (1.33 KB)
✅ Assets folder found (5 files)
  - index-1a2b3c.css (7.3 KB)
  - index-4d5e6f.js (52.0 KB)
  - vendor-7g8h9i.js (53.5 KB)
✅ 404.html found (SPA routing support)
✅ No CNAME file (good for default GitHub Pages)

📊 Total size: 4.8 MB

🌐 Your site will be available at:
https://your-username.github.io/Mom-baby-shop/
```

## 🆘 **HỖ TRỢ XỬ LÝ CÁC LỖI THƯỜNG GẶP**

### **Các bước xử lý sự cố:**

1. **Kiểm tra logs:** Đọc kỹ thông báo lỗi từ script
   ```powershell
   # Xem lịch sử lệnh PowerShell gần đây
   Get-History
   ```

2. **Build thủ công:** Thử từng bước một
   ```powershell
   # Xóa build cũ
   Remove-Item -Recurse -Force dist
   
   # Build thủ công
   npm run build:github
   
   # Kiểm tra kết quả
   Get-ChildItem dist -Recurse | Select-Object Name, Length
   ```

3. **Kiểm tra dependencies:**
   ```powershell
   # Xóa và cài đặt lại dependencies
   npm ci
   # hoặc
   npm install
   ```

4. **Kiểm tra cấu hình repository:**
   ```powershell
   # Xem thông tin remote
   git remote -v
   
   # Kiểm tra tên nhánh hiện tại
   git branch
   ```

5. **Xử lý lỗi rõ ràng:** Dựa vào mã lỗi
   - **404 sau khi deploy:** Kiểm tra lại base path trong `vite.config.ts`
   - **Lỗi JavaScript:** Sửa lỗi cú pháp trong mã nguồn
   - **Sai đường dẫn tài nguyên:** Chạy `npm run update-paths:win` để cập nhật

### **Tài liệu hướng dẫn bổ sung:**

- `README.md` - Tổng quan dự án
- `GUIDE_TROUBLESHOOTING.md` - Hướng dẫn xử lý sự cố chi tiết
- `GUIDE_SCRIPTS.md` - Hướng dẫn sử dụng tất cả các scripts
- `GUIDE_PATH_UPDATE.md` - Thông tin về cập nhật đường dẫn

---

**💡 Mẹo quan trọng:** 
1. **Luôn sao lưu trước khi triển khai:** Commit changes trước khi build
2. **Kiểm tra preview:** Sử dụng `npm run preview:github` trước khi deploy
3. **Chạy từ thư mục gốc:** Đảm bảo chạy script từ thư mục dự án chính (chứa file package.json)

---

## 🧩 **TÍNH NĂNG TRIỂN KHAI MOM-BABY-SHOP**

### **1. Quản lý đường dẫn tài nguyên thông minh**

Dự án sử dụng `src/lib/assets.ts` để quản lý đường dẫn tài nguyên trên nhiều môi trường:

```typescript
// Ví dụ sử dụng helper function cho hình ảnh
import { getImagePath } from "../../lib/assets";

// Thay vì sử dụng đường dẫn cứng
const imageSrc = getImagePath("images/stroller-1.png");
```

Giúp tự động xử lý các đường dẫn khác nhau giữa:
- **Môi trường phát triển**: `/images/stroller-1.png`
- **GitHub Pages**: `/Mom-baby-shop/images/stroller-1.png`

### **2. Cấu hình Vite thông minh**

File `vite.config.ts` tự động phát hiện môi trường triển khai:

```typescript
export default defineConfig(({ mode }) => {
  // Tự động phát hiện GitHub Pages build
  const isGitHubBuild = process.env.BUILD_FOR_GITHUB === 'true';
  
  return {
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    // Cấu hình khác...
  };
});
```

### **3. Kiểm tra trước khi triển khai**

Trước khi deploy lên GitHub Pages, bạn nên:

1. **Preview build GitHub Pages** (mô phỏng môi trường thực tế)
   ```cmd
   npm run preview:github
   ```
   Sau đó truy cập: http://localhost:4173/Mom-baby-shop/

2. **Kiểm tra xử lý đường dẫn hình ảnh**
   - Đảm bảo tất cả hình ảnh có thể tải được
   - Kiểm tra nếu có lỗi 404 trong console

3. **Xác minh chức năng**
   - Thử nghiệm tất cả chức năng chính
   - Đặc biệt chú ý đến các trang có chức năng login/đăng ký

### **4. Sử dụng các scripts đặc thù**

| Script | Mục đích | Cách sử dụng trên Windows |
|--------|----------|----------------------------|
| `build:github` | Build cho GitHub Pages | `npm run build:github` |
| `preview:github` | Preview build GitHub | `npm run preview:github` |
| `deploy` | Deploy lên GitHub Pages | `npm run deploy` |
| `update-paths` | Cập nhật đường dẫn | Yêu cầu WSL hoặc Git Bash |

---

# 🎯 **HOÀN THÀNH**

Sau khi triển khai thành công:

1. **GitHub Pages sẽ hiển thị trang web tại URL:**
   ```
   https://your-username.github.io/Mom-baby-shop/
   ```

2. **Cần khoảng 2-5 phút** để thay đổi được áp dụng trên GitHub Pages

3. **Thử nghiệm với chế độ Incognito/Private** để tránh vấn đề bộ nhớ cache

4. **Thông báo thành công cuối cùng:**
   ```
   ✅ Deployment successful!
   🌐 Your site will be available at:
   https://your-username.github.io/Mom-baby-shop/
   ```
