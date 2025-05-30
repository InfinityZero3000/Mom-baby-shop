# Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Cài đặt dependencies
```bash
npm install
```

## Bước 2: Tạo repository trên GitHub
1. Đi tới https://github.com/jenniferzero
2. Tạo repository mới với tên: `Mom-baby-shop`
3. **Chú ý**: Repository phải có tên chính xác là `Mom-baby-shop` để link hoạt động đúng

## Bước 3: Thiết lập remote repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jenniferzero/Mom-baby-shop.git
git push -u origin main
```

## Bước 4: Deploy lên GitHub Pages

### Cách 1: Sử dụng GitHub Actions (Tự động)
GitHub Actions đã được thiết lập sẵn. Mỗi khi bạn push code lên repository, trang web sẽ tự động được deploy.

### Cách 2: Deploy thủ công
```bash
npm run deploy
```

## Bước 5: Thiết lập GitHub Pages
1. Đi tới repository settings: https://github.com/jenniferzero/Mom-baby-shop/settings/pages
2. Trong phần "Source", chọn "Deploy from a branch"
3. Chọn branch `gh-pages` (sẽ xuất hiện sau khi deploy)
4. Chọn folder `/ (root)`
5. Nhấn Save

## Kiểm tra kết quả
Sau khi deploy thành công, trang web sẽ có sẵn tại:
**https://jenniferzero.github.io/Mom-baby-shop/**

## Cấu trúc trang chủ
- Trang chủ mặc định sẽ hiển thị `ImprovedHomePage` component
- Đường dẫn gốc `/` sẽ redirect đến `/home` 
- Trang chủ bao gồm:
  - Hero section với logo và tìm kiếm
  - Danh mục sản phẩm
  - Sản phẩm nổi bật
  - Thương hiệu đối tác
  - Footer

## Lưu ý quan trọng
- Repository phải có tên chính xác: `Mom-baby-shop`
- File CNAME đã được thiết lập để hoạt động với domain GitHub Pages
- Trang web sử dụng React + Vite với Tailwind CSS
- Base path được thiết lập là `/Mom-baby-shop/` trong vite.config.ts

## Troubleshooting
- Nếu trang không load: Kiểm tra GitHub Pages settings
- Nếu CSS không hiển thị: Kiểm tra base path trong vite.config.ts
- Nếu routing không hoạt động: Đảm bảo đã sử dụng HashRouter hoặc thiết lập fallback cho SPA
