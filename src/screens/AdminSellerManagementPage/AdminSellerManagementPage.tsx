import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Navigation } from '../../components/Navigation';

interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  storeName: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalProducts: number;
  totalSales: number;
  commission: number;
}

const AdminSellerManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: '',
    address: '',
    status: 'pending' as Seller['status']
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  // Mock data for sellers
  useEffect(() => {
    const mockSellers: Seller[] = [
      {
        id: 1,
        name: 'Actor Bán Hàng',
        email: 'seller@example.com',
        phone: '0987654321',
        storeName: 'Baby Store ABC',
        address: '456 Đường XYZ, Hà Nội',
        status: 'active',
        joinDate: '2024-01-15',
        totalProducts: 45,
        totalSales: 12500000,
        commission: 5
      },
      {
        id: 2,
        name: 'Actor Kinh Doanh',
        email: 'business@example.com',
        phone: '0123456789',
        storeName: 'Mom Care Store',
        address: '789 Đường DEF, Hồ Chí Minh',
        status: 'active',
        joinDate: '2024-02-20',
        totalProducts: 32,
        totalSales: 8750000,
        commission: 4
      },
      {
        id: 3,
        name: 'Actor Kinh Doanh',
        email: 'newbie@example.com',
        phone: '0999888777',
        storeName: 'Baby World',
        address: '123 Đường GHI, Đà Nẵng',
        status: 'pending',
        joinDate: '2024-12-01',
        totalProducts: 0,
        totalSales: 0,
        commission: 3
      }
    ];
    setSellers(mockSellers);
  }, []);

  // Filter sellers based on search and status
  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAddingNew) {
      // Add new seller
      const newSeller: Seller = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        totalProducts: 0,
        totalSales: 0,
        commission: 3 // Default commission
      };
      setSellers([...sellers, newSeller]);
    } else if (selectedSeller) {
      // Update existing seller
      setSellers(sellers.map(seller => 
        seller.id === selectedSeller.id 
          ? { ...seller, ...formData }
          : seller
      ));
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      storeName: '',
      address: '',
      status: 'pending'
    });
    setSelectedSeller(null);
    setIsAddingNew(false);
  };

  const handleEdit = (seller: Seller) => {
    setSelectedSeller(seller);
    setFormData({
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      storeName: seller.storeName,
      address: seller.address,
      status: seller.status
    });
    setIsAddingNew(false);
  };

  const handleDelete = (sellerId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người bán hàng này?')) {
      setSellers(sellers.filter(seller => seller.id !== sellerId));
    }
  };

  const handleStatusChange = (sellerId: number, newStatus: Seller['status']) => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId 
        ? { ...seller, status: newStatus }
        : seller
    ));
  };

  const getStatusColor = (status: Seller['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (user?.role !== 'admin') {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Người bán hàng</h1>
            <p className="text-gray-600">Quản lý và theo dõi các người bán hàng trên hệ thống</p>
          </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Danh sách</TabsTrigger>
            <TabsTrigger value="add">Thêm mới</TabsTrigger>
            <TabsTrigger value="statistics">Thống kê</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Search and Filter */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Tìm kiếm</Label>
                  <Input
                    id="search"
                    placeholder="Tìm theo tên, email hoặc tên cửa hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status-filter">Trạng thái</Label>
                  <select
                    id="status-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  >
                    <option value="all">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="pending">Đang chờ</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Sellers List */}
            <div className="grid gap-6">
              {filteredSellers.map((seller) => (
                <Card key={seller.id} className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{seller.name}</h3>
                        <Badge className={getStatusColor(seller.status)}>
                          {seller.status === 'active' ? 'Hoạt động' : 
                           seller.status === 'inactive' ? 'Không hoạt động' : 'Đang chờ'}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><strong>Email:</strong> {seller.email}</p>
                        <p><strong>Điện thoại:</strong> {seller.phone}</p>
                        <p><strong>Cửa hàng:</strong> {seller.storeName}</p>
                        <p><strong>Ngày tham gia:</strong> {new Date(seller.joinDate).toLocaleDateString('vi-VN')}</p>
                        <p><strong>Sản phẩm:</strong> {seller.totalProducts}</p>
                        <p><strong>Doanh số:</strong> {formatCurrency(seller.totalSales)}</p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Địa chỉ:</strong> {seller.address}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(seller)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(seller.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Xóa
                        </Button>
                      </div>
                      
                      {seller.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(seller.id, 'active')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Phê duyệt
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(seller.id, 'inactive')}
                            className="text-red-600 hover:text-red-700"
                          >
                            Từ chối
                          </Button>
                        </div>
                      )}
                      
                      {seller.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(seller.id, 'inactive')}
                          className="text-red-600 hover:text-red-700"
                        >
                          Vô hiệu hóa
                        </Button>
                      )}
                      
                      {seller.status === 'inactive' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(seller.id, 'active')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Kích hoạt
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {selectedSeller ? 'Chỉnh sửa người bán hàng' : 'Thêm người bán hàng mới'}
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên người bán</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="storeName">Tên cửa hàng</Label>
                    <Input
                      id="storeName"
                      value={formData.storeName}
                      onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Trạng thái</Label>
                    <select
                      id="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as Seller['status']})}
                    >
                      <option value="pending">Đang chờ</option>
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit">
                    {selectedSeller ? 'Cập nhật' : 'Thêm mới'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Hủy
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng số người bán</h3>
                <p className="text-3xl font-bold text-blue-600">{sellers.length}</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Đang hoạt động</h3>
                <p className="text-3xl font-bold text-green-600">
                  {sellers.filter(s => s.status === 'active').length}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Đang chờ phê duyệt</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {sellers.filter(s => s.status === 'pending').length}
                </p>
              </Card>
              
              <Card className="p-6 md:col-span-3">
                <h3 className="text-lg font-semibold mb-4">Tổng doanh số</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(sellers.reduce((total, seller) => total + seller.totalSales, 0))}
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminSellerManagementPage;
