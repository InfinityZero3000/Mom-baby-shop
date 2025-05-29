# ✅ HƯỚNG DẪN DEPLOY MOM BABY SHOP LÊN GITHUB PAGES

## 🎯 Mục tiêu
Deploy trang web Mom Baby Shop lên URL: **https://jenniferzero.github.io/Mom-baby-shop/**

## 📋 Các bước cần thực hiện

### 1. Tạo Repository trên GitHub
- Đăng nhập GitHub với tài khoản `jenniferzero`
- Tạo repository mới với tên chính xác: **`Mom-baby-shop`**
- Đặt repository là Public
- **⚠️ Quan trọng**: Tên repository phải chính xác là `Mom-baby-shop`

### 2. Khởi tạo Git và push code
```bash
cd "d:\Files of Zero\Repos_GitHub\project-bolt-sb1-79ijgsx1\project"
git init
git add .
git commit -m "Initial commit: Mom Baby Shop website"
git branch -M main
git remote add origin https://github.com/jenniferzero/Mom-baby-shop.git
git push -u origin main
```

### 3. Deploy tự động hoặc thủ công

#### Tự động (Khuyến nghị)
- GitHub Actions đã được thiết lập sẵn
- Mỗi khi push code, trang web sẽ tự động deploy

#### Thủ công
```bash
npm run deploy
```
hoặc chạy file:
```bash
deploy.bat
```

### 4. Thiết lập GitHub Pages
1. Vào repository settings: https://github.com/jenniferzero/Mom-baby-shop/settings/pages
2. Chọn Source: "Deploy from a branch"
3. Chọn Branch: `gh-pages`
4. Chọn Folder: `/ (root)`
5. Click Save

## 🎉 Kết quả mong đợi
- **URL trang web**: https://jenniferzero.github.io/Mom-baby-shop/
- **Trang chủ**: Hiển thị `ImprovedHomePage` với:
  - Logo và navigation
  - Hero section với tìm kiếm
  - Danh mục sản phẩm
  - Sản phẩm nổi bật
  - Thương hiệu đối tác
  - Footer

## 🔧 Cấu hình đã thiết lập
- ✅ Vite config với base path `/Mom-baby-shop/`
- ✅ GitHub Actions workflow
- ✅ CNAME file cho GitHub Pages
- ✅ 404.html cho SPA routing
- ✅ Package.json với deploy script
- ✅ App routing mặc định đến `/home`

## 📁 Files quan trọng đã tạo/cập nhật
- `vite.config.ts` - Cấu hình base path
- `.github/workflows/deploy.yml` - GitHub Actions
- `CNAME` - Domain configuration  
- `deploy.bat` - Script deploy cho Windows
- `deploy.sh` - Script deploy cho Linux/Mac
- `package.json` - Scripts và dependencies

## 🚨 Lưu ý quan trọng
- Repository phải tên chính xác: `Mom-baby-shop`
- Đợi 5-10 phút sau khi deploy để trang web cập nhật
- Trang chủ sẽ tự động redirect từ `/` đến `/home`
- Tất cả routing đã được thiết lập cho SPA
