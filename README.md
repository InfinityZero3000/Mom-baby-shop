
# 🛒 Mom Baby Shop

Dự án website bán hàng trực tuyến cho mẹ và bé được xây dựng bằng React + TypeScript + Vite.

## 🌐 Demo Live

- **GitHub Pages**: [https://jenniferzero.github.io/Mom-baby-shop/](https://jenniferzero.github.io/Mom-baby-shop/)

## 📋 Yêu cầu hệ thống

> **Điều kiện tiên quyết:**
> - [Node.js](https://nodejs.org/en/) (phiên bản 18.0 trở lên)
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

### **Development (Phát triển)**
```bash
npm run dev
```
Mở trình duyệt và truy cập: `http://localhost:5173`

### **Production Build (Build sản phẩm)**
```bash
npm run build
```

### **Preview Build**
```bash
npm run preview
```

## 🌐 Deploy lên GitHub Pages

### **Phương pháp 1: Tự động (Khuyến nghị)**

Project đã được cấu hình GitHub Actions để tự động deploy:

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Update project"
git push origin main
```

2. **GitHub Actions sẽ tự động:**
   - Build project với cấu hình production
   - Deploy lên GitHub Pages
   - Cập nhật website tự động

### **Phương pháp 2: Thủ công**

```bash
# Build cho GitHub Pages
npm run build:github

# Deploy thủ công
npm run deploy
```

### **Kiểm tra cấu hình trước khi deploy (Windows)**
```bash
check-config.bat
```

## 📁 Cấu trúc Project tối ưu cho GitHub Pages

```
Mom-baby-shop/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── images/                     # Static assets
├── src/                        # Source code
├── index.html                  # Entry point
├── 404.html                   # SPA routing support
├── CNAME                      # Custom domain (optional)
├── vite.config.ts             # Vite config với base path
├── package.json               # Scripts và dependencies
├── postcss.config.js          # PostCSS config
└── tsconfig.app.json          # TypeScript config với path mapping
```

## ⚙️ Cấu hình quan trọng

### **1. Base Path trong vite.config.ts**
```typescript
base: isGitHubBuild ? '/Mom-baby-shop/' : '/'
```

### **2. Scripts trong package.json**
```json
{
  "build:github": "NODE_ENV=production vite build --mode production",
  "deploy": "npm run build:github && gh-pages -d dist"
}
```

### **3. GitHub Actions Workflow**
- Tự động trigger khi push lên `main` branch
- Build với `npm run build:github`
- Deploy lên GitHub Pages

## 🔧 Xử lý sự cố

### **Lỗi 404 khi truy cập routes**
- File `404.html` đã được cấu hình cho SPA routing
- GitHub Actions tự động copy `index.html` thành `404.html`

### **CSS không load đúng**
- Kiểm tra base path trong `vite.config.ts`
- Đảm bảo `postcss.config.js` được cấu hình đúng

### **Build không thành công**
- Chạy `npm install` để cài đặt lại dependencies
- Kiểm tra Node.js version (>= 18.0)
- Chạy `check-config.bat` để kiểm tra cấu hình

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
- File `404.html` phải có trong thư mục `images/`

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
