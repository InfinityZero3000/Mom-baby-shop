import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Navigation } from '../../components/Navigation';
import { getImagePath } from '../../lib/assets';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Eye,
  Home,
  ChevronRight,
  Star,
  RefreshCcw
} from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: string;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const OrderHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sample order data
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-05-15",
      status: "delivered",
      total: "8.450.000 đ",
      items: [
        {
          id: 1,
          name: "Xe đẩy trẻ em Joie Chrome DLX",
          price: "7.500.000 đ",
          quantity: 1,
          image: getImagePath("images/stroller-1.png")
        },
        {
          id: 2,
          name: "Gối chữ U cho mẹ bầu",
          price: "560.000 đ",
          quantity: 1,
          image: getImagePath("images/pillow-u-shape.png")
        }
      ],
      shippingAddress: "123 Nguyễn Văn A, Quận 1, TP.HCM",
      paymentMethod: "Thẻ tín dụng",
      trackingNumber: "VN123456789",
      estimatedDelivery: "2024-05-20"
    },
    {
      id: "ORD-2024-002", 
      date: "2024-05-20",
      status: "shipped",
      total: "2.340.000 đ",
      items: [
        {
          id: 3,
          name: "Bộ quần áo cotton organic cho bé gái",
          price: "320.000 đ",
          quantity: 2,
          image: getImagePath("images/clothing-1.png")
        },
        {
          id: 4,
          name: "Ghế gội đầu Holla cho bé",
          price: "450.000 đ",
          quantity: 1,
          image: getImagePath("images/bath-chair.png")
        }
      ],
      shippingAddress: "456 Lê Văn B, Quận 3, TP.HCM",
      paymentMethod: "COD",
      trackingNumber: "VN987654321",
      estimatedDelivery: "2024-05-25"
    },
    {
      id: "ORD-2024-003",
      date: "2024-05-22",
      status: "processing",
      total: "6.499.000 đ",
      items: [
        {
          id: 5,
          name: "Nôi đưa trẻ em Joie Serina",
          price: "6.499.000 đ",
          quantity: 1,
          image: getImagePath("images/crib-joie.png")
        }
      ],
      shippingAddress: "789 Trần Văn C, Quận 7, TP.HCM",
      paymentMethod: "Chuyển khoản",
      estimatedDelivery: "2024-05-28"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <RefreshCcw className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: string) => {
    return price.includes('đ') ? price : `${price} đ`;
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />

        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">📦</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Chưa có đơn hàng nào</h1>
            <p className="text-gray-600 mb-8">Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!</p>
            <Link to="/products">
              <Button className="bg-[#ef62f9] hover:bg-[#df52e9]">
                Khám phá sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />

      {/* Breadcrumb */}
      <div className="px-8 lg:px-20 py-4 border-b bg-gray-50">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#ef62f9] flex items-center gap-1">
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#ef62f9] font-medium">Lịch sử đơn hàng</span>
        </nav>
      </div>

      <div className="px-8 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h1>
            <p className="text-gray-600">Theo dõi tất cả đơn hàng của bạn</p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef62f9] focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Đơn hàng #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Đặt ngày: {new Date(order.date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#ef62f9]">{formatPrice(order.total)}</p>
                      <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Địa chỉ giao hàng:</h5>
                        <p className="text-gray-600">{order.shippingAddress}</p>
                      </div>
                      
                      {order.trackingNumber && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Mã vận đơn:</h5>
                          <p className="text-gray-600 font-mono">{order.trackingNumber}</p>
                        </div>
                      )}
                      
                      {order.estimatedDelivery && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Dự kiến giao hàng:</h5>
                          <p className="text-gray-600">
                            {new Date(order.estimatedDelivery).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                    
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Đánh giá
                      </Button>
                    )}
                    
                    {order.trackingNumber && order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Theo dõi đơn hàng
                      </Button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Mua lại
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy đơn hàng nào
              </h3>
              <p className="text-gray-600">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}

          {/* Continue Shopping */}
          <div className="mt-12 text-center">
            <Link to="/products">
              <Button variant="outline" className="bg-white hover:bg-gray-50">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
