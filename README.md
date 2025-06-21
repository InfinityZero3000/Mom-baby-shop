
# 🛒 Mom Baby Shop

Dự án website bán hàng trực tuyến cho mẹ và bé được xây dựng bằng **React + TypeScript + Vite + TailwindCSS**.

## 🌐 Demo Live

🔗 **Website**: [https://jenniferzero.github.io/Mom-baby-shop/](https://jenniferzero.github.io/Mom-baby-shop/)

## Trang đăng nhập với nhiều actor 
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/76ee5eca-a43b-4fba-b993-a535a7a12c59" />

## Giao diện chính của hệ thống 
<img width="1790" alt="image" src="https://github.com/user-attachments/assets/a3e6827c-6da8-4709-96bb-cfabb12c31e4" />

## Một số giao diện danh sách sản phẩm
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/e2527631-75fc-412e-b302-915c53accd07" /> 

<img width="1792" alt="image" src="https://github.com/user-attachments/assets/270286fe-b573-48bc-b61f-c82d85eb381c" /> 

<img width="1792" alt="image" src="https://github.com/user-attachments/assets/3d82a1d6-f71c-4906-80ac-667f4fda5c27" />

## Dashboard của Quản trị viên & Người bán hàng
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/84c6e74e-f4ca-4e18-a51b-f5bb6b104e9a" />

<img width="1792" alt="image" src="https://github.com/user-attachments/assets/df5e751e-f631-4da1-a58a-bb96302dfc5a" />

## Trang chủ tài khoản 
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/eea0b8b7-e451-4865-9348-793ac9f8a484" />


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

-  **Trang chủ**: Banner, sản phẩm nổi bật, thương hiệu
-  **Sản phẩm**: Danh sách xe đẩy, quần áo trẻ em
-  **Chi tiết sản phẩm**: Gallery ảnh, thông tin chi tiết
-  **Giỏ hàng**: Thêm/xóa sản phẩm, modal cart
- ❤ **Wishlist**: Lưu sản phẩm yêu thích
-  **Tài khoản**: Đăng ký, đăng nhập, profile
-  **Đơn hàng**: Checkout, lịch sử đơn hàng
-  **Responsive**: Tối ưu cho mobile và desktop

##  Quick Start

```bash
# Clone và chạy nhanh
git clone https://github.com/jenniferzero/Mom-baby-shop.git
cd Mom-baby-shop
npm install
npm run dev
# ➡ Mở http://localhost:5173/
```

## 📚 Tài liệu bổ sung

-  **GUIDE_TROUBLESHOOTING.md**: Xử lý sự cố deploy
-  **GUIDE_WINDOWS.md**: Hướng dẫn deploy trên Windows
-  **GUIDE_SCRIPTS.md**: Hướng dẫn sử dụng các scripts
-  **GUIDE_NAVIGATION.md**: Thông tin về cấu trúc điều hướng
-  **GUIDE_PATH_UPDATE.md**: Cập nhật đường dẫn hình ảnh
-  **GitHub Issues**: [Báo lỗi tại đây](https://github.com/jenniferzero/Mom-baby-shop/issues)

---

**Phát triển bởi Nguyễn Hữu Thắng, sản phẩm học phần Công Nghệ Phần Mềm - HUIT**
