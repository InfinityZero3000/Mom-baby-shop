
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
# macOS/Linux
npm run build:mac

# Windows
npm run build:win
```
- **Output**: Tạo thư mục `dist/` với base path `/Mom-baby-shop/`
- **Tính năng**: 
  - Tự động copy thư mục `images/` vào `dist/`
  - Copy `404.html` để hỗ trợ SPA routing
  - Cấu hình đúng base path cho GitHub Pages
- **Script**: Sử dụng `./deploy-mac.sh` hoặc `./deploy-win.ps1`

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

#### macOS/Linux:
```bash
npm run deploy:mac
```

#### Windows:
```powershell
npm run deploy:win
```

- **Quá trình**: Build → Deploy to gh-pages branch
- **Thời gian**: ~2-5 phút để website live
- **Kết quả**: Website cập nhật tại demo URL

## 📁 Cấu trúc dự án

```
Mom-baby-shop/
├── 📄 index.html              # Entry point
├── 📄 404.html                # SPA routing support cho GitHub Pages
├── 📄 vite.config.ts          # Vite config với dynamic base path
├── 📄 package.json            # Dependencies và scripts
├── 📄 deploy-mac.sh           # Unified deployment script cho macOS/Linux
├── 📄 deploy-win.ps1          # Unified deployment script cho Windows
├── 📁 images/                 # Static assets (ảnh sản phẩm, brands, etc.)
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
  // Tự động phát hiện GitHub Pages build
  const isGitHubBuild = process.env.BUILD_FOR_GITHUB === 'true';
  
  return {
    base: isGitHubBuild ? '/Mom-baby-shop/' : '/',
    publicDir: 'images',
    // ...
  };
});
```

### Scripts triển khai trong `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "preview:github": "vite preview --base /Mom-baby-shop/",
    
    // Scripts cho macOS/Linux
    "deploy:mac": "bash ./deploy-mac.sh",
    "build:mac": "bash ./deploy-mac.sh --build-only",
    "update-paths:mac": "bash ./deploy-mac.sh --update-paths --build-only",
    "check:mac": "bash ./deploy-mac.sh --check --build-only",
    
    // Scripts cho Windows
    "deploy:win": "powershell -ExecutionPolicy Bypass -File deploy-win.ps1",
    "build:win": "powershell -ExecutionPolicy Bypass -File deploy-win.ps1 -BuildOnly",
    "update-paths:win": "powershell -ExecutionPolicy Bypass -File deploy-win.ps1 -UpdatePaths -BuildOnly",
    "check:win": "powershell -ExecutionPolicy Bypass -File deploy-win.ps1 -Check -BuildOnly"
  }
}
```

### Scripts thống nhất cho đa nền tảng

#### Cho macOS/Linux:
```bash
./deploy-mac.sh [options]
  Options:
  --build-only   : Chỉ build cho GitHub Pages, không deploy
  --update-paths : Cập nhật đường dẫn hình ảnh trước khi build
  --check        : Chạy health check trước khi triển khai
```

#### Cho Windows:
```powershell
powershell -ExecutionPolicy Bypass -File deploy-win.ps1 [options]
  Options:
  -BuildOnly     : Chỉ build cho GitHub Pages, không deploy
  -UpdatePaths   : Cập nhật đường dẫn hình ảnh
  -Check         : Chạy kiểm tra hệ thống
```

## 🚀 Triển khai dự án

### Trên macOS/Linux:
```bash
# Triển khai đầy đủ (build và deploy)
npm run deploy:mac

# Chỉ build cho GitHub Pages
npm run build:mac

# Cập nhật đường dẫn hình ảnh và build
npm run update-paths:mac

# Kiểm tra hệ thống trước khi build
npm run check:mac
```

### Trên Windows:
```cmd
# Triển khai đầy đủ (build và deploy)
npm run deploy:win

# Chỉ build cho GitHub Pages
npm run build:win

# Cập nhật đường dẫn hình ảnh và build
npm run update-paths:win

# Kiểm tra hệ thống trước khi build
npm run check:win
```

## 🔧 Xử lý sự cố phổ biến

### ❌ **Ảnh không hiển thị trên GitHub Pages**
- **Nguyên nhân**: Đường dẫn ảnh không đúng
- **Giải pháp**: Sử dụng script cập nhật đường dẫn hình ảnh:
  - macOS/Linux: `npm run update-paths:mac`
  - Windows: `npm run update-paths:win`

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

- 📖 **GUIDE_TROUBLESHOOTING.md**: Xử lý sự cố deploy
- 🚀 **GUIDE_WINDOWS.md**: Hướng dẫn deploy trên Windows
- 📑 **GUIDE_SCRIPTS.md**: Hướng dẫn sử dụng các scripts
- 🧭 **GUIDE_NAVIGATION.md**: Thông tin về cấu trúc điều hướng
- 🖼️ **GUIDE_PATH_UPDATE.md**: Cập nhật đường dẫn hình ảnh
- 🐛 **GitHub Issues**: [Báo lỗi tại đây](https://github.com/jenniferzero/Mom-baby-shop/issues)

---

**Phát triển bởi Nguyễn Hữu Thắng, sản phẩm học phần Công Nghệ Phần Mềm - HUIT**
