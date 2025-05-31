import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ToastProvider } from './contexts/ToastContext';
import { ShoppingCartModal } from './components/ShoppingCartModal';
import { ImprovedHomePage } from './screens/ImprovedHomePage';
import { MainProductPage } from './screens/MainProductPage';
import { StrollerListPage } from './screens/StrollerListPage';
import { ClothingListPage } from './screens/ClothingListPage';
import { ProductDetailPage } from './screens/ProductDetailPage';
import { CheckoutPage } from './screens/CheckoutPage';
import { WishlistPage } from './screens/WishlistPage';
import { OrderHistoryPage } from './screens/OrderHistoryPage';
import { UserProfilePage } from './screens/UserProfilePage';
import { LoginPage } from './screens/LoginPage';
import { RegisterPage } from './screens/RegisterPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>              <Routes>
                {/* Trang chủ chính - Sử dụng ImprovedHomePage */}
                <Route path="/" element={<ImprovedHomePage />} />
                <Route path="/home" element={<ImprovedHomePage />} />
                
                {/* Authentication routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Trang sản phẩm chính */}
                <Route path="/products" element={<MainProductPage />} />
                
                {/* Danh sách xe đẩy */}
                <Route path="/strollers" element={<StrollerListPage />} />
                
                {/* Danh sách quần áo */}
                <Route path="/clothing" element={<ClothingListPage />} />
                  {/* Trang chi tiết sản phẩm */}
                <Route path="/product/:id" element={<ProductDetailPage />} />
                  {/* Trang danh sách yêu thích */}
                <Route path="/wishlist" element={<WishlistPage />} />
                  {/* Trang lịch sử đơn hàng */}
                <Route path="/orders" element={<OrderHistoryPage />} />
                
                {/* Trang thông tin cá nhân */}
                <Route path="/profile" element={<UserProfilePage />} />
                
                {/* Trang thanh toán */}
                <Route path="/checkout" element={<CheckoutPage />} />
                
                {/* Trang liên hệ - tạm thời hiển thị ImprovedHomePage */}
                <Route path="/contact" element={<ImprovedHomePage />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              
              {/* Shopping Cart Modal */}
              <ShoppingCartModal />
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};
