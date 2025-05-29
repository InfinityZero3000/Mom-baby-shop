import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, ShoppingCart, Heart, Star, Filter, Grid, List, ChevronDown } from "lucide-react";

export const ProductPage = (): JSX.Element => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: "Gối chữ U đa năng",
      price: "160.000 đ",
      originalPrice: "200.000 đ",
      image: "/image.png",
      rating: 4.5,
      reviews: 128,
      category: "accessories",
      isNew: true,
      discount: 20
    },
    {
      id: 2,
      name: "Xe đẩy trẻ em Joie Chrome",
      price: "7.500.000 đ",
      originalPrice: "8.000.000 đ",
      image: "/image-1.png",
      rating: 4.8,
      reviews: 56,
      category: "stroller",
      isBestseller: true,
      discount: 6
    },
    {
      id: 3,
      name: "Nôi đưa trẻ em Joie Serina",
      price: "9.499.000 đ",
      image: "/image-2.png",
      rating: 4.7,
      reviews: 89,
      category: "furniture",
      isNew: false
    },
    {
      id: 4,
      name: "Ghế gội đầu Holla",
      price: "450.000 đ",
      originalPrice: "500.000 đ",
      image: "/image-3.png",
      rating: 4.3,
      reviews: 234,
      category: "accessories",
      discount: 10
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', count: products.length },
    { id: 'stroller', name: 'Xe đẩy', count: 1 },
    { id: 'furniture', name: 'Nội thất', count: 1 },
    { id: 'accessories', name: 'Phụ kiện', count: 2 },
    { id: 'clothing', name: 'Quần áo', count: 0 }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Header */}
      <header className="w-full bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-[#ef62f9]">MomBaby</span>
                <span className="text-[#0bbdf8]">Shop</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  className="h-12 pl-4 pr-12 rounded-lg border-gray-300"
                  placeholder="Tìm kiếm sản phẩm..."
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-gray-600 hover:text-[#ef62f9] cursor-pointer transition-colors" />
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-[#ef62f9] cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-[#ef62f9] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-[#ef62f9]">Trang chủ</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-[#ef62f9] font-medium">Sản phẩm</li>
          </ol>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Bộ lọc
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Danh mục</h4>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-2 rounded transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-[#ef62f9] text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="float-right text-sm opacity-75">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Khoảng giá</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Dưới 500.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>500.000đ - 2.000.000đ</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Trên 2.000.000đ</span>
                  </label>
                </div>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Thương hiệu</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Joie</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Holla</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Graco</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with sorting and view options */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {categories.find(cat => cat.id === selectedCategory)?.name || 'Sản phẩm'}
                </h1>
                <p className="text-gray-600">Hiển thị {filteredProducts.length} sản phẩm</p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort dropdown */}
                <div className="relative">
                  <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-sm">
                    <option>Sắp xếp theo</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Mới nhất</option>
                    <option>Phổ biến nhất</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* View mode toggle */}
                <div className="flex border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#ef62f9] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#ef62f9] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map(product => (
                <div key={product.id} className={`bg-white rounded-lg border hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex items-center p-4' : 'overflow-hidden'
                }`}>
                  {/* Product Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-square'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">MỚI</span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">BÁN CHẠY</span>
                      )}
                      {product.discount && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">-{product.discount}%</span>
                      )}
                    </div>

                    {/* Heart icon */}
                    <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1 ml-4' : ''}`}>
                    <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-[#ef62f9]">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>

                    {/* Add to cart button */}
                    <Button className="w-full bg-[#ef62f9] hover:bg-[#d455e6] text-white">
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Trước</Button>
                <Button size="sm" className="bg-[#ef62f9] text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Sau</Button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
