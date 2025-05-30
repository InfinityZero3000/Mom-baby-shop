# 🎯 Hướng Dẫn Sử Dụng Mom Baby Shop

## 🏠 **Trang Chủ - Khám Phá Website**

### **URL Chính**: `http://localhost:5173/` hoặc `http://localhost:5173/home`

### 🔗 **Navigation Menu**
```
🏠 Trang Chủ     → / hoặc /home (ImprovedHomePage - Giao diện chính duy nhất)
🛍️ Sản Phẩm     → /products (MainProductPage) 
🚗 Xe Đẩy       → /strollers (StrollerListPage)
👕 Quần Áo      → /clothing (ClothingListPage)
💳 Thanh Toán    → /checkout (CheckoutPage)
📞 Liên Hệ      → /contact (ImprovedHomePage)
```

## 🛒 **Hướng Dẫn Mua Hàng**

### **Bước 1: Duyệt Sản Phẩm**
1. **Trang chủ**: Xem sản phẩm nổi bật và danh mục
2. **Danh mục**: Click vào category cards (Xe đẩy, Quần áo, Đồ chơi...)
3. **Tìm kiếm**: Sử dụng search bar ở header

### **Bước 2: Xem Chi Tiết Sản Phẩm**
1. Click vào sản phẩm bất kỳ
2. Xem hình ảnh, mô tả, đánh giá
3. Chọn size/màu sắc (nếu có)
4. Chọn số lượng

### **Bước 3: Thêm Vào Giỏ Hàng**
1. Click nút **"Thêm vào giỏ hàng"**
2. Toast notification sẽ hiện thông báo thành công
3. Icon giỏ hàng ở header sẽ cập nhật số lượng

### **Bước 4: Quản Lý Giỏ Hàng**
1. Click icon 🛒 ở header để mở modal giỏ hàng
2. **Trong modal có thể**:
   - Xem tất cả sản phẩm đã thêm
   - Tăng/giảm số lượng với nút +/-
   - Xóa sản phẩm với nút X
   - Xem tổng tiền tự động tính
   - Click "Thanh toán" để đến trang checkout

### **Bước 5: Thanh Toán**
1. Nhập thông tin cá nhân
2. Chọn địa chỉ giao hàng
3. Chọn phương thức thanh toán
4. Xác nhận đơn hàng

## ❤️ **Hệ Thống Yêu Thích (Wishlist)**

### **Thêm Sản Phẩm Yêu Thích**
1. Click icon ❤️ trên product card
2. Sản phẩm sẽ được lưu vào wishlist
3. Icon sẽ chuyển màu đỏ khi đã thêm

### **Quản Lý Wishlist**
- Tất cả sản phẩm yêu thích được lưu trong localStorage
- Có thể add/remove bất cứ lúc nào
- Data sẽ được giữ khi reload trang

## 🔍 **Tính Năng Tìm Kiếm & Filter**

### **Search Bar**
- Vị trí: Header của website
- Chức năng: Tìm kiếm theo tên sản phẩm
- Real-time suggestions (nếu có data)

### **Category Filter**
- **Danh mục có sẵn**:
  - 🚗 Xe đẩy (45 sản phẩm)
  - 👕 Quần áo (128 sản phẩm)  
  - 🧸 Đồ chơi (67 sản phẩm)
  - 🍼 Sữa bột (32 sản phẩm)
  - 🛏️ Nôi cũi (28 sản phẩm)
  - 🎯 Phụ kiện (89 sản phẩm)

## 📱 **Responsive Design**

### **Mobile View**
- Menu hamburger trên mobile
- Cards stack vertically
- Touch-friendly buttons
- Swipe gestures support

### **Tablet View**
- 2-column product grid
- Collapsible sidebar
- Optimized touch targets

### **Desktop View**
- Full navigation menu
- 4-column product grid
- Hover effects
- Keyboard shortcuts

## 🎨 **UI Components Tương Tác**

### **Buttons**
- **Primary**: Màu chính (xanh/hồng)
- **Secondary**: Màu phụ (xám)
- **Outline**: Chỉ border
- **Ghost**: Trong suốt
- **Disabled**: Khi không thể click

### **Cards**
- **Hover Effects**: Scale + shadow khi hover
- **Click Animation**: Press effect
- **Loading States**: Skeleton loading

### **Modals**
- **Shopping Cart**: Slide từ phải
- **Product Quick View**: Center overlay
- **Confirmation**: Small center modal

## 🔔 **Hệ Thống Thông Báo**

### **Toast Types**
- ✅ **Success**: Thêm giỏ hàng thành công
- ❌ **Error**: Lỗi khi thực hiện action
- ⚠️ **Warning**: Cảnh báo
- ℹ️ **Info**: Thông tin

### **Toast Behavior**
- Auto-dismiss sau 3 giây
- Click để đóng sớm
- Multiple toasts stack
- Animation fade in/out

## 🎯 **Keyboard Shortcuts**

```
ESC     → Đóng modal/dropdown
ENTER   → Xác nhận action
TAB     → Navigate form fields
SPACE   → Select checkbox/radio
/       → Focus search bar (khi không trong input)
```

## 🔧 **Developer Tools**

### **Console Commands** (F12 → Console)
```javascript
// Xem state giỏ hàng
window.cartState

// Xem wishlist
window.wishlistState

// Clear all data
localStorage.clear()

// Set test data
localStorage.setItem('mom-baby-cart', JSON.stringify([...testItems]))
```

## 📊 **Performance Monitoring**

### **Metrics Tracking**
- Page load time
- First contentful paint
- Largest contentful paint
- Cumulative layout shift
- First input delay

### **User Analytics**
- Page views
- Click events
- Add to cart events
- Purchase events
- Search queries

## 🐛 **Troubleshooting**

### **Giỏ Hàng Trống Sau Reload**
- Kiểm tra localStorage không bị disabled
- Clear browser cache
- Refresh trang

### **Ảnh Không Hiển Thị**
- Kiểm tra file trong `/public` folder
- Check network trong DevTools
- Verify image paths

### **Responsive Issues**
- Clear browser cache
- Check viewport meta tag
- Test trong multiple browsers

## 🚀 **Next Steps**

### **Production Deployment**
```bash
npm run build    # Build production
npm run deploy   # Deploy to GitHub Pages
```

### **Custom Domain Setup**
1. Update CNAME file
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages

---

## 📞 **Support & Documentation**

- **GitHub**: [Repository Link]
- **Demo**: https://jenniferzero.github.io/Mom-baby-shop/
- **Docs**: Xem FEATURES_OVERVIEW.md
- **Issues**: Báo cáo bug trên GitHub Issues

**Enjoy shopping! 🛍️✨**
