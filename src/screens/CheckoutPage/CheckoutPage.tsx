import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Input, 
  Label, 
  Textarea, 
  Separator, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  RadioGroup, 
  RadioGroupItem, 
  Checkbox 
} from '../../components/ui';
import {
  ArrowLeft,
  CreditCard,
  Truck,
  User,
  Shield,
  CheckCircle2,
  Home,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { addToast } = useToast();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    notes: ''
  });

  const [selectedPayment, setSelectedPayment] = useState<string>('cod');
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: 'banking',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản qua tài khoản ngân hàng',
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán qua ví điện tử MoMo',
      icon: <CreditCard className="h-5 w-5 text-pink-500" />
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      description: 'Thanh toán qua ví điện tử ZaloPay',
      icon: <CreditCard className="h-5 w-5 text-blue-500" />
    }
  ];

  const shippingOptions = [
    {
      id: 'standard',
      name: 'Giao hàng tiêu chuẩn',
      description: '3-5 ngày làm việc',
      price: 0,
      duration: '3-5 ngày'
    },
    {
      id: 'express',
      name: 'Giao hàng nhanh',
      description: '1-2 ngày làm việc',
      price: 50000,
      duration: '1-2 ngày'
    }
  ];

  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const shippingFee = selectedShippingOption?.price || 0;
  const finalTotal = totalPrice + shippingFee;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'district', 'ward'];
    
    for (const field of requiredFields) {
      if (!customerInfo[field as keyof CustomerInfo]) {
        addToast({
          type: 'error',
          title: 'Lỗi',
          message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
        });
        return false;
      }
    }

    if (!agreeTerms) {
      addToast({
        type: 'error',
        title: 'Lỗi',
        message: 'Vui lòng đồng ý với điều khoản và điều kiện'
      });
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      addToast({
        type: 'error',
        title: 'Lỗi',
        message: 'Email không hợp lệ'
      });
      return false;
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      addToast({
        type: 'error',
        title: 'Lỗi',
        message: 'Số điện thoại không hợp lệ'
      });
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    if (items.length === 0) {
      addToast({
        type: 'error',
        title: 'Lỗi',
        message: 'Giỏ hàng trống'
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order object
      const order = {
        id: Date.now().toString(),
        customerInfo,
        items,
        paymentMethod: selectedPayment,
        shippingMethod: selectedShipping,
        subtotal: totalPrice,
        shippingFee,
        total: finalTotal,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // In real app, this would be sent to backend
      console.log('Order created:', order);

      // Clear cart
      clearCart();

      // Show success message
      addToast({
        type: 'success',
        title: 'Đặt hàng thành công!',
        message: `Đơn hàng #${order.id} đã được tạo. Chúng tôi sẽ liên hệ với bạn sớm nhất.`
      });

      // Navigate to success page or home
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      addToast({
        type: 'error',
        title: 'Lỗi',
        message: 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        {/* Navigation */}
        <nav className="w-full py-6 px-8 lg:px-20 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-8">Thêm sản phẩm vào giỏ hàng để tiếp tục thanh toán</p>
            <Link to="/products">
              <Button className="bg-[#ef62f9] hover:bg-[#df52e9]">
                Mua sắm ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="w-full py-6 px-8 lg:px-20 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold">
            <span className="text-[#ef62f9]">MomBaby</span>
            <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white px-8 lg:px-20 py-4 border-b">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#ef62f9] flex items-center gap-1">
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/cart" className="hover:text-[#ef62f9]">Giỏ hàng</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#ef62f9] font-medium">Thanh toán</span>
        </nav>
      </div>

      <div className="px-8 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán đơn hàng</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Thông tin người nhận
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={customerInfo.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ *</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Số nhà, tên đường"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Chọn tỉnh/thành phố"
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">Quận/Huyện *</Label>
                      <Input
                        id="district"
                        value={customerInfo.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        placeholder="Chọn quận/huyện"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ward">Phường/Xã *</Label>
                      <Input
                        id="ward"
                        value={customerInfo.ward}
                        onChange={(e) => handleInputChange('ward', e.target.value)}
                        placeholder="Chọn phường/xã"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Ghi chú đơn hàng</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Ghi chú về đơn hàng (tùy chọn)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Phương thức vận chuyển
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                    {shippingOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-sm text-gray-600">{option.description}</div>
                            </div>
                            <div className="font-medium">
                              {option.price === 0 ? 'Miễn phí' : formatPrice(option.price)}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                          {method.icon}
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {selectedPayment === 'banking' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Ngân hàng:</strong> Vietcombank</p>
                        <p><strong>Số tài khoản:</strong> 1234567890</p>
                        <p><strong>Chủ tài khoản:</strong> MomBaby Shop</p>
                        <p><strong>Nội dung:</strong> Thanh toán đơn hàng [Mã đơn hàng]</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      Tôi đồng ý với{' '}
                      <Link to="/terms" className="text-[#ef62f9] hover:underline">
                        Điều khoản và điều kiện
                      </Link>{' '}
                      và{' '}
                      <Link to="/privacy" className="text-[#ef62f9] hover:underline">
                        Chính sách bảo mật
                      </Link>{' '}
                      của MomBaby Shop
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{item.name}</h4>
                          <div className="text-xs text-gray-600 space-y-1">
                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                            {item.selectedColor && <p>Màu: {item.selectedColor}</p>}
                            <p>Số lượng: 1</p>
                          </div>
                          <p className="text-sm font-medium text-[#ef62f9]">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tạm tính ({totalItems} sản phẩm):</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phí vận chuyển:</span>
                      <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                        {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-[#ef62f9]">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmitOrder}
                    disabled={isProcessing}
                    className="w-full bg-[#ef62f9] hover:bg-[#df52e9] text-lg py-6"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang xử lý...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        ĐẶT HÀNG
                      </div>
                    )}
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-4">
                    <Shield className="h-4 w-4" />
                    <span>Thanh toán an toàn & bảo mật</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 px-8 lg:px-20 border-t mt-16">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="text-[#ef62f9]">MomBaby</span>
            <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
          </div>
          <p className="text-gray-600 mb-4">
            Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm chất lượng cao.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 MomBabyShop. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
};
