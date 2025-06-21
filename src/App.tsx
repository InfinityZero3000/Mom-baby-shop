import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ToastProvider } from './contexts/ToastContext';
import { ShoppingCartModal } from './components/ShoppingCartModal';
import { ProtectedRoute } from './components/ProtectedRoute';
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
import { DashboardPage } from './screens/DashboardPage';
import { AdminSellerManagementPage } from './screens/AdminSellerManagementPage';
import { SellerProductManagementPage } from './screens/SellerProductManagementPage';
import { CartDebugPage } from './screens/CartDebugPage';
import { AvatarTestPage } from './screens/AvatarTestPage';

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
                
                {/* Dashboard routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes */}
                <Route path="/admin/sellers" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminSellerManagementPage />
                  </ProtectedRoute>
                } />
                
                {/* Seller routes */}
                <Route path="/seller/products" element={
                  <ProtectedRoute allowedRoles={['seller']}>
                    <SellerProductManagementPage />
                  </ProtectedRoute>
                } />
                
                {/* Trang sản phẩm chính */}
                <Route path="/products" element={<MainProductPage />} />
                
                {/* Danh sách xe đẩy */}
                <Route path="/strollers" element={<StrollerListPage />} />
                
                {/* Danh sách quần áo */}
                <Route path="/clothing" element={<ClothingListPage />} />
                  {/* Trang chi tiết sản phẩm */}
                <Route path="/product/:id" element={<ProductDetailPage />} />
                  {/* Trang danh sách yêu thích - Cần đăng nhập */}
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <WishlistPage />
                  </ProtectedRoute>
                } />
                  {/* Trang lịch sử đơn hàng - Cần đăng nhập */}
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                } />
                
                {/* Trang thông tin cá nhân - Cần đăng nhập */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                } />
                
                {/* Trang thanh toán - Cần đăng nhập */}
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                
                {/* Trang liên hệ - tạm thời hiển thị ImprovedHomePage */}
                <Route path="/contact" element={<ImprovedHomePage />} />
                
                {/* Debug routes - chỉ để kiểm tra */}
                <Route path="/debug/cart" element={<CartDebugPage />} />
                <Route path="/debug/avatar" element={<AvatarTestPage />} />
                
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
