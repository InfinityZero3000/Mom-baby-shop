import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export const App: React.FC = () => {
  // Detect if running on GitHub Pages - consistent with vite.config.ts
  const basename = (
    window.location.hostname === 'jenniferzero.github.io' || 
    window.location.pathname.startsWith('/Mom-baby-shop/')
  ) ? '/Mom-baby-shop' : '';
  
  console.log('Current hostname:', window.location.hostname);
  console.log('Current pathname:', window.location.pathname);
  console.log('Detected basename:', basename);
  
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <BrowserRouter basename={basename}>
            <Routes>
              {/* Trang chủ chính - Sử dụng ImprovedHomePage */}
              <Route path="/" element={<ImprovedHomePage />} />
              <Route path="/home" element={<ImprovedHomePage />} />
              
              {/* Trang sản phẩm chính */}
              <Route path="/products" element={<MainProductPage />} />
              
              {/* Danh sách xe đẩy */}
              <Route path="/strollers" element={<StrollerListPage />} />
              
              {/* Danh sách quần áo */}
              <Route path="/clothing" element={<ClothingListPage />} />
              
              {/* Trang chi tiết sản phẩm */}
              <Route path="/product/:id" element={<ProductDetailPage />} />
              
              {/* Trang thanh toán */}
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Trang liên hệ - tạm thời hiển thị ImprovedHomePage */}
              <Route path="/contact" element={<ImprovedHomePage />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Shopping Cart Modal */}
            <ShoppingCartModal />
          </BrowserRouter>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
};
