import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ToastProvider } from './contexts/ToastContext';
import { ShoppingCartModal } from './components/ShoppingCartModal';
import { TrangCh } from './screens/TrangCh';
import { ImprovedHomePage } from './screens/ImprovedHomePage';
import { MainProductPage } from './screens/MainProductPage';
import { StrollerListPage } from './screens/StrollerListPage';
import { ClothingListPage } from './screens/ClothingListPage';
import { ProductDetailPage } from './screens/ProductDetailPage';
import { CheckoutPage } from './screens/CheckoutPage';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Redirect từ root đến home */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              
              {/* Trang chủ gốc */}
              <Route path="/original" element={<TrangCh />} />
              
              {/* Trang chủ cải tiến */}
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
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            
            {/* Shopping Cart Modal */}
            <ShoppingCartModal />
          </Router>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
};
