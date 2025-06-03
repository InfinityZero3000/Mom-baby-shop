import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  User, 
  MapPin, 
  Edit2, 
  Save, 
  X,
  ArrowLeft,
  Home,
  ChevronRight,
  Camera,
  Lock,
  CreditCard,
  Package,
  Heart,
  Bell,
  Shield,
  LogOut,
  Store,
  Users,
  ShoppingBag,
  LayoutDashboard
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  preferences: UserPreferences;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  newsletter: boolean;
  language: string;
  currency: string;
}

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'preferences' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Convert auth user to profile format
  const userProfile: UserProfile = {
    id: user?.id.toString() || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar,
    addresses: user?.addresses?.map(addr => ({
      id: addr.id.toString(),
      type: 'home' as const,
      name: addr.name,
      street: addr.address,
      city: addr.city,
      postalCode: '',
      country: 'Việt Nam',
      isDefault: addr.isDefault
    })) || [],
    preferences: {
      notifications: {
        email: user?.preferences?.orderUpdates || true,
        sms: false,
        push: false
      },
      newsletter: user?.preferences?.newsletter || false,
      language: user?.preferences?.language || "vi",
      currency: user?.preferences?.currency || "VND"
    }
  };

  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleSaveProfile = () => {
    // Update user in AuthContext
    updateUser({
      name: editedProfile.name,
      email: editedProfile.email,
      phone: editedProfile.phone,
      avatar: editedProfile.avatar,
      preferences: {
        newsletter: editedProfile.preferences.newsletter,
        promotions: editedProfile.preferences.notifications.email,
        orderUpdates: editedProfile.preferences.notifications.email,
        language: editedProfile.preferences.language,
        currency: editedProfile.preferences.currency
      }
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Avatar and Basic Info */}
      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                <Badge 
                  className={`text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-red-100 text-red-800' 
                      : user?.role === 'seller' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {user?.role === 'admin' ? 'Quản trị viên' : 
                   user?.role === 'seller' ? 'Người bán' : 'Khách hàng'}
                </Badge>
              </div>
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Chỉnh sửa</span>
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu</span>
                  </Button>
                  <Button 
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Hủy</span>
                  </Button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    className="w-full"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/orders" className="block">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Đơn hàng</h3>
                <p className="text-sm text-gray-500">Xem lịch sử mua hàng</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/wishlist" className="block">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Yêu thích</h3>
                <p className="text-sm text-gray-500">Sản phẩm đã lưu</p>
              </div>
            </div>
          </Card>
        </Link>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Thanh toán</h3>
              <p className="text-sm text-gray-500">Phương thức thanh toán</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Thông báo</h3>
              <p className="text-sm text-gray-500">Cài đặt thông báo</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Role-specific Quick Actions */}
      {(user?.role === 'seller' || user?.role === 'admin') && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {user?.role === 'admin' ? 'Quản trị' : 'Quản lý bán hàng'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Dashboard link for all roles */}
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Dashboard</h4>
                  <p className="text-sm text-gray-500">Tổng quan hệ thống</p>
                </div>
              </div>
            </Card>

            {user?.role === 'seller' && (
              <>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/seller/products')}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý Sản phẩm</h4>
                      <p className="text-sm text-gray-500">Thêm, sửa, xóa sản phẩm</p>
                    </div>
                  </div>
                </Card>
              </>
            )}
            
            {user?.role === 'admin' && (
              <>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/sellers')}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý Người bán</h4>
                      <p className="text-sm text-gray-500">Phê duyệt, quản lý người bán</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/products')}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý Sản phẩm</h4>
                      <p className="text-sm text-gray-500">Xem tất cả sản phẩm</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Tất cả đơn hàng</h4>
                      <p className="text-sm text-gray-500">Quản lý đơn hàng</p>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderAddressesSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Địa chỉ giao hàng</h2>
        <Button className="bg-pink-500 hover:bg-pink-600">
          + Thêm địa chỉ mới
        </Button>
      </div>

      {userProfile.addresses.map((address) => (
        <Card key={address.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-medium text-gray-900">{address.name}</h3>
                <Badge variant={address.type === 'home' ? 'default' : 'secondary'}>
                  {address.type === 'home' ? 'Nhà riêng' : address.type === 'work' ? 'Văn phòng' : 'Khác'}
                </Badge>
                {address.isDefault && (
                  <Badge className="bg-green-100 text-green-800">Mặc định</Badge>
                )}
              </div>
              <p className="text-gray-600">{address.street}</p>
              <p className="text-gray-600">{address.city}, {address.postalCode}</p>
              <p className="text-gray-600">{address.country}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Cài đặt tài khoản</h2>

      {/* Notification Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thông báo</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email thông báo</h4>
              <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
            </div>
            <input
              type="checkbox"
              checked={userProfile.preferences.notifications.email}
              onChange={(e) => {
                const newPreferences = {
                  ...userProfile.preferences,
                  notifications: {
                    ...userProfile.preferences.notifications,
                    email: e.target.checked
                  }
                };
                updateUser({
                  preferences: {
                    newsletter: newPreferences.newsletter,
                    promotions: newPreferences.notifications.email,
                    orderUpdates: newPreferences.notifications.email,
                    language: newPreferences.language,
                    currency: newPreferences.currency
                  }
                });
              }}
              className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">SMS thông báo</h4>
              <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn</p>
            </div>
            <input
              type="checkbox"
              checked={userProfile.preferences.notifications.sms}
              onChange={(e) => {
                const newPreferences = {
                  ...userProfile.preferences,
                  notifications: {
                    ...userProfile.preferences.notifications,
                    sms: e.target.checked
                  }
                };
                updateUser({
                  preferences: {
                    newsletter: newPreferences.newsletter,
                    promotions: newPreferences.notifications.email,
                    orderUpdates: newPreferences.notifications.email,
                    language: newPreferences.language,
                    currency: newPreferences.currency
                  }
                });
              }}
              className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Thông báo đẩy</h4>
              <p className="text-sm text-gray-500">Nhận thông báo trên thiết bị</p>
            </div>
            <input
              type="checkbox"
              checked={userProfile.preferences.notifications.push}
              onChange={(e) => {
                const newPreferences = {
                  ...userProfile.preferences,
                  notifications: {
                    ...userProfile.preferences.notifications,
                    push: e.target.checked
                  }
                };
                updateUser({
                  preferences: {
                    newsletter: newPreferences.newsletter,
                    promotions: newPreferences.notifications.email,
                    orderUpdates: newPreferences.notifications.email,
                    language: newPreferences.language,
                    currency: newPreferences.currency
                  }
                });
              }}
              className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
            />
          </div>
        </div>
      </Card>

      {/* Language and Currency */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ngôn ngữ và tiền tệ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tiền tệ</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500">
              <option value="VND">VND (₫)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Bảo mật tài khoản</h2>

      {/* Change Password */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Đổi mật khẩu</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
            <Input type="password" placeholder="Nhập mật khẩu hiện tại" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
            <Input type="password" placeholder="Nhập mật khẩu mới" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
            <Input type="password" placeholder="Nhập lại mật khẩu mới" />
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600">
            Cập nhật mật khẩu
          </Button>
        </div>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Xác thực hai bước</h3>
            <p className="text-sm text-gray-500">Tăng cường bảo mật cho tài khoản của bạn</p>
          </div>
          <Badge variant="secondary">Chưa kích hoạt</Badge>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>Kích hoạt xác thực hai bước</span>
        </Button>
      </Card>

      {/* Login Sessions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Phiên đăng nhập</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Thiết bị hiện tại</p>
              <p className="text-sm text-gray-500">Chrome trên Windows • Đang hoạt động</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Hiện tại</Badge>
          </div>
          <Button variant="outline" className="w-full">
            Đăng xuất tất cả thiết bị khác
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center">
                  <Home className="w-4 h-4" />
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">Tài khoản của tôi</span>
              </nav>
            </div>

            <Link to="/">
              <div className="text-2xl font-bold">
                <span className="text-pink-500">Mom</span>
                <span className="text-blue-500">Baby</span>
                <span className="text-gray-900">Shop</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Địa chỉ</span>
                </button>

                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'preferences' 
                      ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span>Cài đặt</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Bảo mật</span>
                </button>

                <hr className="my-4" />

                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfileSection()}
            {activeTab === 'addresses' && renderAddressesSection()}
            {activeTab === 'preferences' && renderPreferencesSection()}
            {activeTab === 'security' && renderSecuritySection()}
          </div>
        </div>
      </div>
    </div>
  );
};
