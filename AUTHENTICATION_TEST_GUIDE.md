# Hướng dẫn kiểm tra Authentication và Protected Routes

## Tổng quan thay đổi

Đã hoàn thành việc bảo vệ các trang quan trọng và cập nhật trang thông tin cá nhân để hiển thị thông tin theo loại user đã đăng nhập.

## Các trang được bảo vệ

1. **Trang thông tin cá nhân** (`/profile`)
2. **Trang giỏ hàng/thanh toán** (`/checkout`) 
3. **Trang danh sách yêu thích** (`/wishlist`)
4. **Trang lịch sử đơn hàng** (`/orders`)

## Cách kiểm tra

### 1. Kiểm tra protected routes

1. Mở ứng dụng tại `http://localhost:5173/`
2. Thử truy cập trực tiếp các URL sau khi chưa đăng nhập:
   - `http://localhost:5173/profile`
   - `http://localhost:5173/checkout`
   - `http://localhost:5173/wishlist`
   - `http://localhost:5173/orders`

**Kết quả mong đợi:** Sẽ được chuyển hướng về trang đăng nhập (`/login`)

### 2. Kiểm tra đăng nhập với các role khác nhau

#### Role Customer (Khách hàng)
- Email: `customer@test.com`
- Password: `123456`

#### Role Seller (Người bán)
- Email: `seller@test.com` 
- Password: `123456`

#### Role Admin (Quản trị viên)
- Email: `admin@test.com`
- Password: `123456`

### 3. Kiểm tra trang thông tin cá nhân

Sau khi đăng nhập thành công:

1. Truy cập `/profile`
2. Kiểm tra các thông tin hiển thị:
   - **Tên và thông tin cơ bản** từ tài khoản đã đăng nhập
   - **Badge role** hiển thị đúng loại user:
     - 🟢 Khách hàng (Customer)
     - 🔵 Người bán (Seller) 
     - 🔴 Quản trị viên (Admin)

#### Tính năng đặc biệt theo role:

**Seller sẽ thấy thêm:**
- 🏪 Quản lý cửa hàng
- 📦 Quản lý sản phẩm

**Admin sẽ thấy thêm:**
- 👥 Quản lý user
- ⚙️ Cài đặt hệ thống  
- 📦 Tất cả đơn hàng

### 4. Kiểm tra trang thanh toán

1. Thêm sản phẩm vào giỏ hàng
2. Truy cập `/checkout`
3. Kiểm tra thông tin được điền sẵn từ tài khoản đã đăng nhập:
   - Họ tên
   - Email
   - Số điện thoại
   - Địa chỉ (nếu có)

### 5. Kiểm tra trang wishlist và orders

- Truy cập `/wishlist` - sẽ hiển thị danh sách yêu thích của user
- Truy cập `/orders` - sẽ hiển thị lịch sử đơn hàng của user

## Tính năng đã hoàn thành

✅ **Protected Routes:** Tất cả trang quan trọng đã được bảo vệ  
✅ **Role-based UI:** Hiển thị giao diện theo role user  
✅ **Auto-fill user data:** Tự động điền thông tin user đã đăng nhập  
✅ **Authentication Context:** Sử dụng context để quản lý trạng thái đăng nhập  
✅ **Redirect to login:** Chuyển hướng về login khi chưa xác thực

## Lưu ý kỹ thuật

- **ProtectedRoute component:** Bọc các route cần bảo vệ
- **AuthContext integration:** Tất cả component đều sử dụng useAuth()
- **User data binding:** Thông tin user được lấy từ AuthContext thay vì mock data
- **Role-specific features:** Hiển thị tính năng dựa trên role của user

## Cấu trúc file đã thay đổi

```
src/
├── components/
│   └── ProtectedRoute.tsx (mới)
├── screens/
│   ├── UserProfilePage/
│   │   └── UserProfilePage.tsx (cập nhật)
│   └── CheckoutPage/
│       └── CheckoutPage.tsx (cập nhật)
└── App.tsx (cập nhật routes)
```
