
# 🛒 Mom Baby Shop

Dự án website bán hàng trực tuyến cho mẹ và bé được xây dựng bằng **React + TypeScript + Vite + TailwindCSS**.

## 🌐 Demo Live

🔗 **Website**: [https://jenniferzero.github.io/Mom-baby-shop/](https://jenniferzero.github.io/Mom-baby-shop/)

## 📋 Yêu cầu hệ thống

- **Node.js** ≥ 18.0
- **npm** hoặc **yarn**
- **Git** (để clone và deploy)
- Trình duyệt web hiện đại

## 🚀 Cài đặt và chạy

### 1. Clone dự án
```bash
git clone https://github.com/jenniferzero/Mom-baby-shop.git
cd Mom-baby-shop
```

### 2. Cài đặt dependencies
```bash
npm install
```

## 🎯 Các lệnh chạy dự án

### 🔧 Development (Phát triển)
```bash
npm run dev
```
- **URL**: http://localhost:5173/
- **Tính năng**: Hot reload, fast refresh, dev tools
- **Sử dụng**: Phát triển và debug code

### 🏗️ Build Production
```bash
npm run build
```
- **Output**: Tạo thư mục `dist/`
- **Tính năng**: Code được minified và optimized
- **Sử dụng**: Build cho server thông thường

### 🌐 Build cho GitHub Pages
```bash
npm run build:github
```
- **Output**: Tạo thư mục `dist/` với base path `/Mom-baby-shop/`
- **Tính năng**: 
  - Tự động copy thư mục `images/` vào `dist/`
  - Copy `404.html` để hỗ trợ SPA routing
  - Cấu hình đúng base path cho GitHub Pages
- **Script**: Sử dụng `./build-github.sh`

### 👀 Preview Build
```bash
npm run preview
```
- **URL**: http://localhost:4173/
- **Sử dụng**: Xem trước build production locally

### 🔍 Preview GitHub Pages Build
```bash
npm run preview:github
```
- **URL**: http://localhost:4173/Mom-baby-shop/
- **Sử dụng**: Test GitHub Pages build trước khi deploy

### 🚀 Deploy lên GitHub Pages
```bash
npm run deploy
```
- **Quá trình**: Build → Deploy to gh-pages branch
- **Thời gian**: ~2-5 phút để website live
- **Kết quả**: Website cập nhật tại demo URL

## 📁 Cấu trúc dự án

```
Mom-baby-shop/
├── 📄 index.html              # Entry point
├── 📄 404.html               # SPA routing support cho GitHub Pages
├── 📄 vite.config.ts         # Vite config với dynamic base path
├── 📄 package.json           # Dependencies và scripts
├── 📄 build-github.sh        # Custom build script cho GitHub Pages
├── 📁 images/                # Static assets (ảnh sản phẩm, brands, etc.)
│   ├── banner.png
│   ├── mom-baby.jpg
│   ├── brand-*.png
│   ├── clothing-*.png
│   ├── stroller-*.png
│   └── ...
├── 📁 src/                   # Source code
│   ├── 📄 App.tsx
│   ├── 📄 main.tsx
│   ├── 📁 components/        # UI components
│   │   ├── 📁 ui/           # Base UI components (buttons, cards, etc.)
│   │   ├── ShoppingCartModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── 📁 contexts/          # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── WishlistContext.tsx
│   ├── 📁 screens/           # Page components
│   │   ├── ImprovedHomePage/
│   │   ├── MainProductPage/
│   │   ├── ProductDetailPage/
│   │   ├── ClothingListPage/
│   │   ├── StrollerListPage/
│   │   ├── CheckoutPage/
│   │   ├── OrderHistoryPage/
│   │   ├── WishlistPage/
│   │   ├── LoginPage/
│   │   ├── RegisterPage/
│   │   └── UserProfilePage/
│   └── 📁 lib/              # Utilities
│       └── utils.ts
└── 📁 dist/                 # Build output (generated)
```

## ⚙️ Cấu hình deployment

### Cấu hình chính trong `vite.config.ts`:
```typescript
export default defineConfig(({ mode }) => {
  const isGitHubBuild = process.env.NODE_ENV === 'production' || mode === 'production';
  
  return {
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    publicDir: false, // Manual handling of static assets
    // ...
  };
});
```

### Scripts trong `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "build:github": "./build-github.sh",
    "preview": "vite preview",
    "preview:github": "vite preview --base=/Mom-baby-shop/",
    "deploy": "npm run build:github && gh-pages -d dist"
  }
}
```

### Custom build script `build-github.sh`:
```bash
#!/bin/bash
# Build với production mode và base path
NODE_ENV=production npx vite build --mode production --base=/Mom-baby-shop/

# Copy static assets
cp 404.html dist/
cp -r images dist/
```

## 🔧 Xử lý sự cố

### ❌ **Ảnh không hiển thị trên GitHub Pages**
- **Nguyên nhân**: Đường dẫn ảnh không đúng hoặc thư mục `images/` chưa được copy
- **Giải pháp**: Đảm bảo chạy `npm run build:github` thay vì `npm run build`

### ❌ **404 Error khi refresh trang**
- **Nguyên nhân**: GitHub Pages không hỗ trợ SPA routing mặc định
- **Giải pháp**: File `404.html` đã được cấu hình tự động

### ❌ **CSS không load đúng**
- **Nguyên nhân**: Base path không đúng
- **Giải pháp**: Kiểm tra `vite.config.ts` có cấu hình base path đúng

### ❌ **Build lỗi**
```bash
# Xóa cache và cài lại
rm -rf node_modules package-lock.json dist
npm install
npm run build:github
```

### ❌ **Port đã được sử dụng**
```bash
npm run dev -- --port 3000
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6.0
- **Styling**: TailwindCSS 3.4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router Dom v6
- **Deployment**: GitHub Pages + gh-pages

## 📱 URL truy cập

| Môi trường | URL | Mô tả |
|------------|-----|-------|
| **Development** | `http://localhost:5173/` | Server phát triển |
| **Preview Build** | `http://localhost:4173/` | Preview build local |
| **Preview GitHub** | `http://localhost:4173/Mom-baby-shop/` | Preview GitHub Pages build |
| **Production** | `https://jenniferzero.github.io/Mom-baby-shop/` | Website live |

## 🎨 Tính năng chính

- 🏠 **Trang chủ**: Banner, sản phẩm nổi bật, thương hiệu
- 🛍️ **Sản phẩm**: Danh sách xe đẩy, quần áo trẻ em
- 🔍 **Chi tiết sản phẩm**: Gallery ảnh, thông tin chi tiết
- 🛒 **Giỏ hàng**: Thêm/xóa sản phẩm, modal cart
- ❤️ **Wishlist**: Lưu sản phẩm yêu thích
- 👤 **Tài khoản**: Đăng ký, đăng nhập, profile
- 📋 **Đơn hàng**: Checkout, lịch sử đơn hàng
- 📱 **Responsive**: Tối ưu cho mobile và desktop

## 🚀 Quick Start

```bash
# Clone và chạy nhanh
git clone https://github.com/jenniferzero/Mom-baby-shop.git
cd Mom-baby-shop
npm install
npm run dev
# ➡️ Mở http://localhost:5173/
```

## 📚 Tài liệu bổ sung

- 📖 **DEPLOYMENT_TROUBLESHOOTING.md**: Xử lý sự cố deploy
- 🚀 **WINDOWS_DEPLOYMENT_GUIDE.md**: Hướng dẫn deploy trên Windows
- 🐛 **GitHub Issues**: [Báo lỗi tại đây](https://github.com/jenniferzero/Mom-baby-shop/issues)

---

**Phát triển bởi Zero** | **© 2025 Mom Baby Shop**
