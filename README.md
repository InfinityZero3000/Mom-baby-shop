
# 🛒 Mom Baby Shop

Dự án website bán hàng trực tuyến cho mẹ và bé được xây dựng bằng React + TypeScript + Vite.

## 🌐 Demo Live

- **GitHub Pages**: [https://jenniferzero.github.io/Mom-baby-shop/](https://jenniferzero.github.io/Mom-baby-shop/)

## 📋 Yêu cầu hệ thống

> **Điều kiện tiên quyết:**
> - [Node.js](https://nodejs.org/en/) (phiên bản 16.0 trở lên)
> - [Git](https://git-scm.com/) (để clone và deploy)
> - Trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari)

## 🚀 Cách cài đặt và chạy

### **1. Clone dự án**
```bash
git clone https://github.com/jenniferzero/Mom-baby-shop.git
cd Mom-baby-shop
```

### **2. Cài đặt dependencies**
```bash
npm install
```

## 🎯 Các cách chạy chương trình

### **1️⃣ Development Mode (Phát triển)**
Chạy server phát triển với hot reload:
```bash
npm run dev
```
- 📍 **URL**: [http://localhost:5173/](http://localhost:5173/)
- ⚡ **Tính năng**: Hot reload, fast refresh, dev tools
- 🔧 **Dùng khi**: Phát triển và debug

### **2️⃣ Production Build (Build sản phẩm)**
Build ứng dụng cho môi trường production:
```bash
npm run build
```
- 📁 **Output**: Tạo thư mục `dist/` 
- 🗜️ **Tính năng**: Minified, optimized, tree-shaking
- 🎯 **Dùng khi**: Chuẩn bị deploy lên server

### **3️⃣ GitHub Pages Build**
Build đặc biệt cho GitHub Pages:
```bash
npm run build:github
```
- 📁 **Output**: Tạo thư mục `dist/` với base path `/Mom-baby-shop/`
- 🌐 **Tính năng**: Configured cho GitHub Pages routing
- 🎯 **Dùng khi**: Deploy lên GitHub Pages

### **4️⃣ Preview Build (Xem trước build)**
Xem trước phiên bản đã build cục bộ:
```bash
npm run preview
```
- 📍 **URL**: [http://localhost:4173/](http://localhost:4173/)
- 👀 **Tính năng**: Preview build output locally
- 🔍 **Dùng khi**: Test build trước khi deploy

### **5️⃣ Preview GitHub Pages Build**
Xem trước build cho GitHub Pages:
```bash
npm run preview:github
```
- 📍 **URL**: [http://localhost:4173/Mom-baby-shop/](http://localhost:4173/Mom-baby-shop/)
- 🌐 **Tính năng**: Giống production GitHub Pages
- 🔍 **Dùng khi**: Test GitHub Pages build locally

### **6️⃣ Full Deploy to GitHub Pages**
Deploy hoàn chỉnh lên GitHub Pages:
```bash
npm run deploy
```
- 🚀 **Quá trình**: Build → Copy CNAME → Deploy to gh-pages branch
- 🌐 **Result**: Live tại [https://jenniferzero.github.io/Mom-baby-shop/](https://jenniferzero.github.io/Mom-baby-shop/)
- ⏱️ **Thời gian**: ~2-5 phút để live

## 📱 URL truy cập

| Môi trường | URL | Mô tả |
|------------|-----|-------|
| **Development** | `http://localhost:5173/` | Server phát triển |
| **Preview Local** | `http://localhost:4173/` | Preview build local |
| **Preview GitHub** | `http://localhost:4173/Mom-baby-shop/` | Preview GitHub Pages |
| **Production** | `https://jenniferzero.github.io/Mom-baby-shop/` | Website live |

## ⚙️ Scripts NPM chi tiết

```json
{
  "scripts": {
    "dev": "vite",                    // Chạy development server
    "build": "vite build",            // Build cho production
    "build:github": "vite build --mode production",  // Build cho GitHub Pages
    "preview": "vite preview",        // Preview build local
    "preview:github": "vite preview --base /Mom-baby-shop/",  // Preview GitHub Pages
    "deploy": "npm run build:github && powershell -Command \"Copy-Item -Path CNAME -Destination dist/\" && gh-pages -d dist"  // Deploy to GitHub Pages
  }
}
```

## 🔧 Cấu hình deployment

### **File cấu hình chính:**
- `vite.config.ts` - Cấu hình Vite với dynamic base path
- `CNAME` - Domain cho GitHub Pages
- `package.json` - NPM scripts

### **Cấu hình base path tự động:**
```typescript
// vite.config.ts
const isProduction = command === 'build' && mode === 'production';
base: isProduction ? '/Mom-baby-shop/' : '/'
```

## 🛠️ Troubleshooting

### **Lỗi thường gặp:**

**1. Port 5173 đã được sử dụng:**
```bash
npm run dev -- --port 3000
```

**2. Build lỗi:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

**3. GitHub Pages không cập nhật:**
- Đợi 2-5 phút sau khi deploy
- Kiểm tra GitHub Pages settings
- Clear browser cache

**4. Màn hình trắng trên GitHub Pages:**
- Đảm bảo React Router có `basename` đúng
- Kiểm tra build với `npm run preview:github` trước khi deploy
- File `404.html` phải có trong thư mục `public/`

**5. Routing không hoạt động trên GitHub Pages:**
- Đảm bảo đã dùng `npm run build:github`
- Kiểm tra base path trong `vite.config.ts`

## 📚 Thêm thông tin

- 📖 **User Guide**: Xem file `USER_GUIDE.md`
- 🚀 **Deploy Guide**: Xem file `DEPLOY_GUIDE.md`
- 🐛 **Issues**: [GitHub Issues](https://github.com/jenniferzero/Mom-baby-shop/issues)

## 🎉 Quick Start

```bash
# Clone và chạy nhanh
git clone https://github.com/jenniferzero/Mom-baby-shop.git
cd Mom-baby-shop
npm install
npm run dev
# Mở http://localhost:5173/
```

---

**Phát triển bởi Zero** | **© 2025 Mom Baby Shop**
