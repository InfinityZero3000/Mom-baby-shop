import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Navigation } from '../../components/Navigation';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Mock data based on user role
  const getMockData = () => {
    if (user?.role === 'admin') {
      return {
        totalSellers: 15,
        activeSellers: 12,
        pendingSellers: 3,
        totalProducts: 450,
        totalOrders: 1250,
        totalRevenue: 875000000,
        recentSellers: [
          { id: 1, name: 'Actor Bán Hàng', storeName: 'Baby Store ABC', status: 'active', joinDate: '2024-01-15' },
          { id: 2, name: 'Actor Kinh Doanh', storeName: 'Mom Care Store', status: 'active', joinDate: '2024-02-20' },
          { id: 3, name: 'Actor Kinh Doanh', storeName: 'Baby World', status: 'pending', joinDate: '2024-12-01' }
        ]
      };
    } else if (user?.role === 'seller') {
      return {
        totalProducts: 45,
        activeProducts: 42,
        outOfStockProducts: 3,
        totalOrders: 156,
        totalRevenue: 12500000,
        monthlyRevenue: 2800000,
        recentOrders: [
          { id: 1, productName: 'Xe đẩy cao cấp Premium', customer: 'Nguyễn Văn A', amount: 2500000, date: '2024-12-01' },
          { id: 2, productName: 'Quần áo cotton organic', customer: 'Trần Thị B', amount: 350000, date: '2024-11-30' },
          { id: 3, productName: 'Đồ chơi giáo dục', customer: 'Lê Văn C', amount: 450000, date: '2024-11-29' }
        ]
      };
    }
    return null;
  };

  const mockData = getMockData();

  if (!user || (user.role !== 'admin' && user.role !== 'seller')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Truy cập bị từ chối</h2>
          <p className="text-gray-600">Bạn không có quyền truy cập trang này.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard {user.role === 'admin' ? 'Quản trị viên' : 'Người bán hàng'}
            </h1>
            <p className="text-gray-600">
              Chào mừng {user.name}, đây là tổng quan về {user.role === 'admin' ? 'hệ thống' : 'cửa hàng của bạn'}
            </p>
          </div>

          {/* Admin Dashboard */}
          {user.role === 'admin' && mockData && (
          <>
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng người bán</h3>
                <p className="text-3xl font-bold text-blue-600">{mockData.totalSellers}</p>
                <p className="text-sm text-gray-600">
                  {mockData.activeSellers} đang hoạt động, {mockData.pendingSellers} chờ duyệt
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng sản phẩm</h3>
                <p className="text-3xl font-bold text-green-600">{mockData.totalProducts}</p>
                <p className="text-sm text-gray-600">Trên toàn hệ thống</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng đơn hàng</h3>
                <p className="text-3xl font-bold text-purple-600">{mockData.totalOrders}</p>
                <p className="text-sm text-gray-600">Đã xử lý</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng doanh thu</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(mockData.totalRevenue)}
                </p>
                <p className="text-sm text-gray-600">Toàn thời gian</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Hành động nhanh</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    onClick={() => navigate('/admin/sellers')}
                  >
                    Quản lý người bán hàng
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/admin/products')}
                  >
                    Xem tất cả sản phẩm
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/admin/orders')}
                  >
                    Quản lý đơn hàng
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/admin/reports')}
                  >
                    Xem báo cáo
                  </Button>
                </div>
              </Card>

              {/* Recent Sellers */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Người bán mới nhất</h3>
                <div className="space-y-3">
                  {mockData.recentSellers?.map((seller) => (
                    <div key={seller.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{seller.name}</p>
                        <p className="text-sm text-gray-600">{seller.storeName}</p>
                        <p className="text-xs text-gray-500">
                          Tham gia: {new Date(seller.joinDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <Badge 
                        className={seller.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {seller.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
          )}

          {/* Seller Dashboard */}
          {user.role === 'seller' && mockData && (
          <>
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng sản phẩm</h3>
                <p className="text-3xl font-bold text-blue-600">{mockData.totalProducts}</p>
                <p className="text-sm text-gray-600">
                  {mockData.activeProducts} đang bán, {mockData.outOfStockProducts} hết hàng
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Đơn hàng</h3>
                <p className="text-3xl font-bold text-green-600">{mockData.totalOrders}</p>
                <p className="text-sm text-gray-600">Tổng đã bán</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Doanh thu tháng</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(mockData.monthlyRevenue || 0)}
                </p>
                <p className="text-sm text-gray-600">Tháng này</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng doanh thu</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(mockData.totalRevenue)}
                </p>
                <p className="text-sm text-gray-600">Toàn thời gian</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Hành động nhanh</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    onClick={() => navigate('/seller/products')}
                  >
                    Quản lý sản phẩm
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/seller/orders')}
                  >
                    Xem đơn hàng
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/seller/inventory')}
                  >
                    Quản lý kho hàng
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/seller/analytics')}
                  >
                    Xem thống kê
                  </Button>
                </div>
              </Card>

              {/* Recent Orders */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h3>
                <div className="space-y-3">
                  {mockData.recentOrders?.map((order) => (
                    <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">{order.productName}</p>
                        <Badge variant="outline" className="text-xs">
                          {formatCurrency(order.amount)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Khách: {order.customer}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.date).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
          )}

          {/* User Info Card */}
          <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Thông tin tài khoản</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Tên:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Vai trò:</strong> 
                <Badge className="ml-2">
                  {user.role === 'admin' ? 'Quản trị viên' : 
                   user.role === 'seller' ? 'Người bán hàng' : 'Khách hàng'}
                </Badge>
              </p>
            </div>
            <div>
              {user.phone && <p><strong>Điện thoại:</strong> {user.phone}</p>}
              <p><strong>Trạng thái:</strong> 
                <Badge className="ml-2 bg-green-100 text-green-800">Đang hoạt động</Badge>
              </p>
            </div>
          </div>          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
