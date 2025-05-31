import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Loader2,
  User,
  ShoppingCart,
  Heart,
  Store,
  Shield,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    role: 'customer' as UserRole,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
      try {
      const result = await login(formData.email, formData.password, formData.role);
      
      if (result.success) {
        addToast({ type: 'success', title: 'Đăng nhập thành công!' });
        navigate(from, { replace: true });
      } else {
        addToast({ type: 'error', title: result.message || 'Đăng nhập thất bại' });
      }
    } catch (error) {
      addToast({ type: 'error', title: 'Đã xảy ra lỗi không mong muốn' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  const handleDemoLogin = (role: UserRole) => {
    const demoAccounts = {
      customer: { email: 'customer@example.com', password: '123456' },
      seller: { email: 'seller@example.com', password: '123456' },
      admin: { email: 'admin@example.com', password: '123456' },
    };

    const account = demoAccounts[role];
    setFormData({
      email: account.email,
      password: account.password,
      rememberMe: false,
      role: role,
    });
    
    const roleNames = {
      customer: 'Khách hàng',
      seller: 'Người bán',
      admin: 'Quản trị viên'
    };
    
    addToast({ 
      type: 'info', 
      title: `Đã điền thông tin demo cho ${roleNames[role]}. Nhấn "Đăng nhập" để tiếp tục.` 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="w-full py-6 px-8 lg:px-20 bg-white/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-3xl font-bold">
            <span className="text-[#ef62f9]">MomBaby</span>
            <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] bg-clip-text text-transparent">
                Đăng nhập
              </CardTitle>
              <CardDescription className="text-gray-600">
                Chào mừng bạn đến với MomBabyShop
              </CardDescription>
            </CardHeader>
              <CardContent className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Chọn vai trò đăng nhập
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={formData.role === 'customer' ? 'default' : 'outline'}
                    className={`flex flex-col items-center p-3 h-auto ${
                      formData.role === 'customer' 
                        ? 'bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleInputChange('role', 'customer')}
                  >
                    <User className="h-5 w-5 mb-1" />
                    <span className="text-xs">Khách hàng</span>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === 'seller' ? 'default' : 'outline'}
                    className={`flex flex-col items-center p-3 h-auto ${
                      formData.role === 'seller' 
                        ? 'bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleInputChange('role', 'seller')}
                  >
                    <Store className="h-5 w-5 mb-1" />
                    <span className="text-xs">Người bán</span>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === 'admin' ? 'default' : 'outline'}
                    className={`flex flex-col items-center p-3 h-auto ${
                      formData.role === 'admin' 
                        ? 'bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleInputChange('role', 'admin')}
                  >
                    <Shield className="h-5 w-5 mb-1" />
                    <span className="text-xs">Quản trị</span>
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        handleInputChange('rememberMe', checked as boolean)
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#ef62f9] hover:text-[#df52e9] font-medium"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] hover:from-[#df52e9] hover:to-[#0aacf7] text-white py-6 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </form>              <Separator />

              {/* Demo Login Buttons */}
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-600 font-medium">
                  Tài khoản demo để test
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    className="w-full border-[#ef62f9] text-[#ef62f9] hover:bg-[#ef62f9] hover:text-white flex items-center justify-center"
                    onClick={() => handleDemoLogin('customer')}
                    disabled={isLoading}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Demo Khách hàng
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#0bbdf8] text-[#0bbdf8] hover:bg-[#0bbdf8] hover:text-white flex items-center justify-center"
                    onClick={() => handleDemoLogin('seller')}
                    disabled={isLoading}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Demo Người bán
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white flex items-center justify-center"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={isLoading}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Demo Quản trị viên
                  </Button>
                </div>
              </div>              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?{' '}
                  <Link
                    to="/register"
                    className="text-[#ef62f9] hover:text-[#df52e9] font-medium"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              {/* Role Features Info */}
              <div className="pt-4 border-t">
                <div className="space-y-3 text-sm">
                  {formData.role === 'customer' && (
                    <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2 flex items-center">
                        <User className="mr-2 h-4 w-4 text-[#ef62f9]" />
                        Tính năng Khách hàng:
                      </p>
                      <div className="grid grid-cols-1 gap-1 text-gray-600">
                        <div className="flex items-center">
                          <ShoppingCart className="mr-2 h-3 w-3 text-[#ef62f9]" />
                          Mua sắm và theo dõi đơn hàng
                        </div>
                        <div className="flex items-center">
                          <Heart className="mr-2 h-3 w-3 text-[#ef62f9]" />
                          Lưu danh sách yêu thích
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.role === 'seller' && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2 flex items-center">
                        <Store className="mr-2 h-4 w-4 text-[#0bbdf8]" />
                        Tính năng Người bán:
                      </p>
                      <div className="grid grid-cols-1 gap-1 text-gray-600">
                        <div className="flex items-center">
                          <Store className="mr-2 h-3 w-3 text-[#0bbdf8]" />
                          Quản lý cửa hàng và sản phẩm
                        </div>
                        <div className="flex items-center">
                          <ShoppingCart className="mr-2 h-3 w-3 text-[#0bbdf8]" />
                          Xử lý đơn hàng và khách hàng
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.role === 'admin' && (
                    <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-3 rounded-lg">
                      <p className="font-medium text-gray-700 mb-2 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-gray-600" />
                        Tính năng Quản trị viên:
                      </p>
                      <div className="grid grid-cols-1 gap-1 text-gray-600">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-3 w-3 text-gray-600" />
                          Quản lý toàn bộ hệ thống
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-3 w-3 text-gray-600" />
                          Quản lý người dùng và quyền hạn
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
