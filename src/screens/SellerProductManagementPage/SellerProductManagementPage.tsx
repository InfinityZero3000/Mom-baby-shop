import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Navigation } from '../../components/Navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  sellerId: number;
  sku: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  stock: number;
  status: Product['status'];
  sku: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  tags: string;
}

const SellerProductManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    subcategory: '',
    brand: '',
    images: [],
    stock: 0,
    status: 'active',
    sku: '',
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    tags: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<Product['status'] | 'all'>('all');

  // Categories and subcategories
  const categories = {
    'xe-day': {
      name: 'Xe đẩy',
      subcategories: ['Xe đẩy cao cấp', 'Xe đẩy thông thường', 'Xe đẩy đôi']
    },
    'quan-ao': {
      name: 'Quần áo',
      subcategories: ['Quần áo trẻ em', 'Quần áo mẹ bầu', 'Phụ kiện thời trang']
    },
    'do-choi': {
      name: 'Đồ chơi',
      subcategories: ['Đồ chơi giáo dục', 'Đồ chơi vận động', 'Đồ chơi sáng tạo']
    },
    'cham-soc': {
      name: 'Chăm sóc',
      subcategories: ['Sữa và dinh dưỡng', 'Vệ sinh cá nhân', 'Chăm sóc da']
    }
  };

  // Mock data for products
  useEffect(() => {
    if (user?.role === 'seller') {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Xe đẩy cao cấp Premium',
          description: 'Xe đẩy cao cấp với nhiều tính năng tiện ích, phù hợp cho trẻ từ 0-3 tuổi',
          price: 2500000,
          originalPrice: 3000000,
          category: 'xe-day',
          subcategory: 'Xe đẩy cao cấp',
          brand: 'Premium Baby',
          images: ['/images/stroller-premium.png', '/images/stroller-1.png'],
          stock: 15,
          status: 'active',
          sellerId: user.id,
          sku: 'XD-001',
          weight: 8.5,
          dimensions: { length: 85, width: 60, height: 110 },
          tags: ['cao cấp', 'an toàn', 'tiện ích'],
          createdAt: '2024-01-15',
          updatedAt: '2024-12-01'
        },
        {
          id: 2,
          name: 'Quần áo cotton organic cho bé',
          description: 'Bộ quần áo cotton 100% organic, mềm mại và an toàn cho làn da nhạy cảm của bé',
          price: 350000,
          originalPrice: 400000,
          category: 'quan-ao',
          subcategory: 'Quần áo trẻ em',
          brand: 'Organic Baby',
          images: ['/images/clothing-organic.png', '/images/clothing-1.png'],
          stock: 30,
          status: 'active',
          sellerId: user.id,
          sku: 'QA-002',
          weight: 0.2,
          dimensions: { length: 25, width: 20, height: 2 },
          tags: ['organic', 'cotton', 'an toàn'],
          createdAt: '2024-02-20',
          updatedAt: '2024-11-15'
        },
        {
          id: 3,
          name: 'Đồ chơi giáo dục thông minh',
          description: 'Đồ chơi giáo dục giúp phát triển trí tuệ và khả năng tư duy cho trẻ từ 1-5 tuổi',
          price: 450000,
          category: 'do-choi',
          subcategory: 'Đồ chơi giáo dục',
          brand: 'Smart Toys',
          images: ['/images/educational-toy.png'],
          stock: 0,
          status: 'out_of_stock',
          sellerId: user.id,
          sku: 'DC-003',
          weight: 1.2,
          dimensions: { length: 30, width: 20, height: 15 },
          tags: ['giáo dục', 'thông minh', 'phát triển'],
          createdAt: '2024-03-10',
          updatedAt: '2024-12-01'
        }
      ];
      setProducts(mockProducts);
    }
  }, [user]);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAddingNew) {
      // Add new product
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
        images: formData.images.length > 0 ? formData.images : ['/images/placeholder.png'],
        sellerId: user?.id || 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
    } else if (selectedProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...selectedProduct,
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProducts(products.map(product => 
        product.id === selectedProduct.id ? updatedProduct : product
      ));
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: '',
      subcategory: '',
      brand: '',
      images: [],
      stock: 0,
      status: 'active',
      sku: '',
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      tags: ''
    });
    setSelectedProduct(null);
    setIsAddingNew(false);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      images: product.images,
      stock: product.stock,
      status: product.status,
      sku: product.sku,
      weight: product.weight || 0,
      dimensions: product.dimensions || { length: 0, width: 0, height: 0 },
      tags: product.tags.join(', ')
    });
    setIsAddingNew(false);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleImageAdd = () => {
    const imageUrl = prompt('Nhập URL hình ảnh:');
    if (imageUrl) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl]
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'out_of_stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Product['status']) => {
    switch (status) {
      case 'active': return 'Đang bán';
      case 'inactive': return 'Ngừng bán';
      case 'out_of_stock': return 'Hết hàng';
      default: return 'Không xác định';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (user?.role !== 'seller') {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Sản phẩm</h1>
            <p className="text-gray-600">Quản lý kho hàng và sản phẩm của bạn</p>
          </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Danh sách sản phẩm</TabsTrigger>
            <TabsTrigger value="add">Thêm sản phẩm</TabsTrigger>
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
                    placeholder="Tìm theo tên, mô tả hoặc SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category-filter">Danh mục</Label>
                  <select
                    id="category-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">Tất cả danh mục</option>
                    {Object.entries(categories).map(([key, category]) => (
                      <option key={key} value={key}>{category.name}</option>
                    ))}
                  </select>
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
                    <option value="active">Đang bán</option>
                    <option value="inactive">Ngừng bán</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={() => setIsAddingNew(true)}>
                    Thêm sản phẩm mới
                  </Button>
                </div>
              </div>
            </Card>

            {/* Products List */}
            <div className="grid gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="lg:w-48">
                      <img
                        src={product.images[0] || '/images/placeholder.png'}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                          <Badge className={getStatusColor(product.status)}>
                            {getStatusText(product.status)}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong>Giá bán:</strong>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(product.price)}
                          </p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-gray-500 line-through">
                              {formatCurrency(product.originalPrice)}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <strong>Tồn kho:</strong>
                          <p className={`font-semibold ${product.stock > 10 ? 'text-green-600' : 
                                         product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {product.stock} sản phẩm
                          </p>
                        </div>
                        
                        <div>
                          <strong>SKU:</strong>
                          <p>{product.sku}</p>
                        </div>
                        
                        <div>
                          <strong>Danh mục:</strong>
                          <p>{categories[product.category as keyof typeof categories]?.name}</p>
                        </div>
                        
                        <div>
                          <strong>Thương hiệu:</strong>
                          <p>{product.brand}</p>
                        </div>
                        
                        <div>
                          <strong>Cập nhật:</strong>
                          <p>{new Date(product.updatedAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      
                      {product.tags.length > 0 && (
                        <div className="mt-4">
                          <strong className="text-sm">Tags:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredProducts.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Tên sản phẩm *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="sku">SKU *</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({...formData, sku: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Mô tả sản phẩm *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Category and Brand */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Phân loại và thương hiệu</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Danh mục *</Label>
                      <select
                        id="category"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                        required
                      >
                        <option value="">Chọn danh mục</option>
                        {Object.entries(categories).map(([key, category]) => (
                          <option key={key} value={key}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="subcategory">Danh mục con *</Label>
                      <select
                        id="subcategory"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        required
                        disabled={!formData.category}
                      >
                        <option value="">Chọn danh mục con</option>
                        {formData.category && categories[formData.category as keyof typeof categories]?.subcategories.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="brand">Thương hiệu *</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing and Inventory */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Giá và tồn kho</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="price">Giá bán *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="originalPrice">Giá gốc</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="stock">Tồn kho *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="status">Trạng thái</Label>
                      <select
                        id="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as Product['status']})}
                      >
                        <option value="active">Đang bán</option>
                        <option value="inactive">Ngừng bán</option>
                        <option value="out_of_stock">Hết hàng</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Physical Properties */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thông số vật lý</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="weight">Trọng lượng (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="length">Chiều dài (cm)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={formData.dimensions.length}
                        onChange={(e) => setFormData({
                          ...formData, 
                          dimensions: {...formData.dimensions, length: Number(e.target.value)}
                        })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="width">Chiều rộng (cm)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={formData.dimensions.width}
                        onChange={(e) => setFormData({
                          ...formData, 
                          dimensions: {...formData.dimensions, width: Number(e.target.value)}
                        })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="height">Chiều cao (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={formData.dimensions.height}
                        onChange={(e) => setFormData({
                          ...formData, 
                          dimensions: {...formData.dimensions, height: Number(e.target.value)}
                        })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Images */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Hình ảnh sản phẩm</h3>
                  <div className="space-y-4">
                    <Button type="button" variant="outline" onClick={handleImageAdd}>
                      Thêm hình ảnh
                    </Button>
                    
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2 bg-white"
                              onClick={() => handleImageRemove(index)}
                            >
                              Xóa
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div>
                    <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      placeholder="ví dụ: cao cấp, an toàn, tiện ích"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">
                    {selectedProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Hủy
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng sản phẩm</h3>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Đang bán</h3>
                <p className="text-3xl font-bold text-green-600">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Hết hàng</h3>
                <p className="text-3xl font-bold text-red-600">
                  {products.filter(p => p.status === 'out_of_stock' || p.stock === 0).length}
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Tổng giá trị kho</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(products.reduce((total, product) => total + (product.price * product.stock), 0))}
                </p>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sản phẩm theo danh mục</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(categories).map(([key, category]) => {
                    const count = products.filter(p => p.category === key).length;
                    return (
                      <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold">{category.name}</p>
                        <p className="text-2xl font-bold text-blue-600">{count}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerProductManagementPage;
