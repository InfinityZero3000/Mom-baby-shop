import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AvatarUpload } from '../ui/AvatarUpload';
import UserRoleIndicator from '../UserRoleIndicator';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Package,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  LogOut
} from 'lucide-react';

interface NavigationProps {
  className?: string;
  showTopBar?: boolean;
  showSearch?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  className = '',
  showTopBar = true,
  showSearch = true
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const { totalItems: wishlistTotalItems } = useWishlist();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Role-based navigation items
  const getRoleNavItems = () => {
    const items = [];

    if (isAuthenticated && user) {
      // Common items for all authenticated users
      items.push({
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Tổng quan'
      });

      // Role-specific items
      if (user.role === 'admin') {
        items.push(
          {
            label: 'Quản lý Người bán',
            href: '/admin/sellers',
            icon: Users,
            description: 'Quản lý người bán hàng'
          },
          {
            label: 'Quản lý Sản phẩm',
            href: '/admin/products',
            icon: ShoppingBag,
            description: 'Xem tất cả sản phẩm'
          },
          {
            label: 'Báo cáo',
            href: '/admin/reports',
            icon: BarChart3,
            description: 'Thống kê và báo cáo'
          }
        );
      } else if (user.role === 'seller') {
        items.push(
          {
            label: 'Quản lý Sản phẩm',
            href: '/seller/products',
            icon: ShoppingBag,
            description: 'Quản lý sản phẩm của bạn'
          },
          {
            label: 'Đơn hàng',
            href: '/seller/orders',
            icon: Package,
            description: 'Quản lý đơn hàng'
          },
          {
            label: 'Thống kê',
            href: '/seller/analytics',
            icon: BarChart3,
            description: 'Xem thống kê bán hàng'
          }
        );
      }
    }

    return items;
  };

  const roleNavItems = getRoleNavItems();

  return (
    <div className={className}>
      {/* Top Bar */}
      {showTopBar && (
        <div className="bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] text-white py-2 px-8 lg:px-20">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span>Tải ứng dụng</span>
              <span>|</span>
              <span>Kết nối</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link to="/orders" className="hover:text-gray-200">Đơn hàng</Link>
              <span>|</span>
              <span>Hỗ trợ</span>
              <span>|</span>
              {isAuthenticated ? (
                <>
                  <UserRoleIndicator />
                  <span>|</span>
                  <button 
                    onClick={handleLogout}
                    className="hover:text-gray-200 cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                  <span>|</span>
                  <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="w-full py-6 px-8 lg:px-20 border-b border-gray-100 bg-white">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-bold">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              <Link to="/home" className="font-semibold text-gray-800 hover:text-[#ef62f9]">
                TRANG CHỦ
              </Link>
              <Link to="/strollers" className="font-semibold text-gray-800 hover:text-[#ef62f9]">
                XE ĐẨY
              </Link>
              <Link to="/clothing" className="font-semibold text-gray-800 hover:text-[#ef62f9]">
                QUẦN ÁO
              </Link>
              <Link to="/products" className="font-semibold text-gray-800 hover:text-[#ef62f9]">
                SẢN PHẨM
              </Link>
              <Link to="/contact" className="font-semibold text-gray-800 hover:text-[#ef62f9]">
                LIÊN HỆ
              </Link>

              {/* Role-based menu items */}
              {roleNavItems.length > 0 && (
                <div className="relative group">
                  <button className="font-semibold text-gray-800 hover:text-[#ef62f9] flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    QUẢN LÝ
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      {roleNavItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <IconComponent className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">{item.label}</div>
                              <div className="text-sm text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {showSearch && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10 w-80"
                />
              </div>
            )}

            {/* Action Buttons */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/orders">
                <Package className="h-5 w-5" />
              </Link>
            </Button>

            {/* User Profile */}
            {isAuthenticated ? (
              <Link to="/profile" className="block">
                <AvatarUpload
                  currentAvatar={user?.avatar}
                  onAvatarChange={() => {}} // Readonly in navigation
                  size="sm"
                  editable={false}
                />
              </Link>
            ) : (
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistTotalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistTotalItems}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ef62f9] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t pt-6">
            {/* Mobile Search */}
            {showSearch && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10"
                />
              </div>
            )}

            {/* Mobile Menu Items */}
            <div className="space-y-2">
              <Link 
                to="/home" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                Trang chủ
              </Link>
              <Link 
                to="/strollers" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                Xe đẩy
              </Link>
              <Link 
                to="/clothing" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                Quần áo
              </Link>
              <Link 
                to="/products" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                Sản phẩm
              </Link>

              {/* Role-based items */}
              {roleNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}

              {/* User actions */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 w-full text-left text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  Đăng xuất
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
