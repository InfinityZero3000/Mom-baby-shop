# Hướng dẫn Hệ thống Đăng nhập Đa vai trò

## 🎭 Các Vai trò Hỗ trợ

Hệ thống đã được nâng cấp để hỗ trợ 3 vai trò khác nhau:

### 1. 👤 **Khách hàng (Customer)**
- **Email**: `customer@example.com`
- **Mật khẩu**: `123456`
- **Tính năng**:
  - Mua sắm và theo dõi đơn hàng
  - Lưu danh sách yêu thích
  - Quản lý thông tin cá nhân
  - Đánh giá sản phẩm

### 2. 🏪 **Người bán (Seller)**
- **Email**: `seller@example.com`
- **Mật khẩu**: `123456`
- **Tính năng**:
  - Quản lý cửa hàng và sản phẩm
  - Xử lý đơn hàng và khách hàng
  - Theo dõi doanh thu và thống kê
  - Quản lý kho hàng

### 3. 🛡️ **Quản trị viên (Admin)**
- **Email**: `admin@example.com`
- **Mật khẩu**: `123456`
- **Tính năng**:
  - Quản lý toàn bộ hệ thống
  - Quản lý người dùng và quyền hạn
  - Xem báo cáo tổng quan
  - Cấu hình hệ thống

## 🚀 Cách sử dụng

### Bước 1: Truy cập trang đăng nhập
Điều hướng đến `/login` hoặc click vào "Đăng nhập" từ trang chủ.

### Bước 2: Chọn vai trò
Trong giao diện đăng nhập, chọn một trong 3 vai trò:
- **Khách hàng**: Cho người dùng thông thường
- **Người bán**: Cho người bán hàng
- **Quản trị**: Cho quản trị viên hệ thống

### Bước 3: Đăng nhập
**Cách 1 - Sử dụng Demo Account:**
- Click vào nút demo tương ứng với vai trò đã chọn
- Thông tin đăng nhập sẽ được điền tự động
- Click "Đăng nhập"

**Cách 2 - Nhập thủ công:**
- Nhập email và mật khẩu của vai trò tương ứng (xem danh sách trên)
- Click "Đăng nhập"

### Bước 4: Kiểm tra quyền truy cập
Sau khi đăng nhập thành công, bạn sẽ được chuyển hướng về trang chủ với quyền truy cập tương ứng vai trò đã chọn.

## 🔧 Tính năng mới

### Role-based UI
- Giao diện sẽ thay đổi tùy theo vai trò người dùng
- Hiển thị các tính năng phù hợp với từng vai trò
- Thông tin và màu sắc khác biệt cho mỗi vai trò

### Demo Accounts
- 3 nút demo riêng biệt cho từng vai trò
- Tự động điền thông tin đăng nhập
- Hướng dẫn rõ ràng cho người dùng

### Enhanced Security
- Kiểm tra vai trò khi đăng nhập
- Thông báo lỗi chi tiết nếu email/mật khẩu không đúng cho vai trò đã chọn

## 🧪 Test Cases

### Test 1: Đăng nhập Khách hàng
1. Chọn vai trò "Khách hàng"
2. Click "Demo Khách hàng" hoặc nhập `customer@example.com` / `123456`
3. Verify: Đăng nhập thành công, hiển thị tên "Nguyễn Văn Khách"

### Test 2: Đăng nhập Người bán
1. Chọn vai trò "Người bán"
2. Click "Demo Người bán" hoặc nhập `seller@example.com` / `123456`
3. Verify: Đăng nhập thành công, hiển thị tên "Trần Thị Bán Hàng"

### Test 3: Đăng nhập Quản trị viên
1. Chọn vai trò "Quản trị"
2. Click "Demo Quản trị viên" hoặc nhập `admin@example.com` / `123456`
3. Verify: Đăng nhập thành công, hiển thị tên "Lê Văn Quản Trị"

### Test 4: Sai vai trò
1. Chọn vai trò "Khách hàng"
2. Nhập email của Người bán: `seller@example.com` / `123456`
3. Verify: Hiển thị lỗi "Email hoặc mật khẩu không chính xác cho vai trò đã chọn"

## 🔄 Legacy Support

Hệ thống vẫn hỗ trợ tài khoản cũ:
- **Email**: `test@example.com`
- **Mật khẩu**: `123456`
- Tự động chuyển thành vai trò "Khách hàng"

## 📱 Responsive Design

Giao diện đăng nhập mới:
- Hoàn toàn responsive trên mobile/tablet/desktop
- Role selector buttons thích ứng với màn hình nhỏ
- Demo buttons được tối ưu cho touch interface
- Thông tin vai trò hiển thị động tùy theo lựa chọn

## 🎨 UI/UX Improvements

- **Role Selection**: 3 nút lựa chọn với icon và màu sắc riêng biệt
- **Demo Buttons**: Màu sắc khác nhau cho từng vai trò
- **Dynamic Info**: Hiển thị tính năng tương ứng với vai trò đã chọn
- **Visual Feedback**: Gradient và animation cho trải nghiệm tốt hơn

---

**Lưu ý**: Đây là hệ thống demo với mock authentication. Trong production, cần tích hợp với API backend thực tế.
