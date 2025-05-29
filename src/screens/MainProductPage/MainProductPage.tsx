import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useToast } from "../../contexts/ToastContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Eye,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: string;
  brand: string;
  description: string;
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const MainProductPage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  // Context hooks
  const { addItem, totalItems, openCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  // Handler functions
  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
    };
    addItem(cartItem);
    addToast({ 
      type: "success", 
      title: "Thành công!",
      message: "Đã thêm sản phẩm vào giỏ hàng!" 
    });
  };

  const handleWishlistToggle = (product: Product) => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      reviews: product.reviews,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      addToast({ 
        type: "info", 
        title: "Đã xóa",
        message: "Đã xóa khỏi danh sách yêu thích" 
      });
    } else {
      addToWishlist(wishlistItem);
      addToast({ 
        type: "success", 
        title: "Thành công!",
        message: "Đã thêm vào danh sách yêu thích" 
      });
    }
  };

  // Sample products data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Xe đẩy trẻ em Joie Chrome DLX",
      category: "Xe đẩy",
      price: "7.500.000 đ",
      originalPrice: "8.500.000 đ",
      image: "/stroller-premium.png",
      rating: 4.8,
      reviews: 156,
      discount: "12%",
      brand: "Joie",
      description: "Xe đẩy cao cấp với thiết kế hiện đại, an toàn tuyệt đối cho bé",
      features: ["Gấp gọn 1 tay", "Phanh 2 bánh", "Khóa an toàn 5 điểm"],
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Bộ quần áo cotton organic",
      category: "Quần áo",
      price: "320.000 đ",
      originalPrice: "400.000 đ",
      image: "/clothing-organic.png",
      rating: 4.9,
      reviews: 203,
      discount: "20%",
      brand: "Mothercare",
      description: "Bộ quần áo cotton 100% organic, mềm mại và thân thiện với da bé",
      features: ["Cotton organic", "Không chất tẩy", "Kháng khuẩn tự nhiên"],
      isNew: true,
    },
    {
      id: 3,
      name: "Sữa bột Aptamil Gold+",
      category: "Sữa bột",
      price: "580.000 đ",
      image: "/milk-powder.png",
      rating: 4.7,
      reviews: 89,
      brand: "Aptamil",
      description: "Sữa bột cao cấp với công thức gần gũi sữa mẹ, bổ sung DHA",
      features: ["Công thức Pronutra", "DHA & ARA", "Prebiotics"],
      isBestSeller: true,
    },
    {
      id: 4,
      name: "Đồ chơi giáo dục Fisher-Price",
      category: "Đồ chơi",
      price: "450.000 đ",
      originalPrice: "550.000 đ",
      image: "/educational-toy.png",
      rating: 4.6,
      reviews: 67,
      discount: "18%",
      brand: "Fisher-Price",
      description: "Đồ chơi giáo dục phát triển trí tuệ và kỹ năng vận động cho bé",
      features: ["Âm thanh giáo dục", "Màu sắc tươi sáng", "An toàn tuyệt đối"],
    },
    {
      id: 5,
      name: "Ghế ăn dặm Chicco Polly",
      category: "Ghế ăn",
      price: "2.800.000 đ",
      originalPrice: "3.200.000 đ",
      image: "/high-chair.png",
      rating: 4.8,
      reviews: 124,
      discount: "13%",
      brand: "Chicco",
      description: "Ghế ăn dặm đa năng, điều chỉnh được độ cao và góc ngồi",
      features: ["7 độ cao", "3 vị trí tựa", "Bánh xe di chuyển", "dễ gập gọn"],
      isNew: true,
    },
    {
      id: 6,
      name: "Nôi cũi Babylove Premium",
      category: "Nôi cũi",
      price: "4.500.000 đ",
      image: "/crib-premium.png",
      rating: 4.9,
      reviews: 78,
      brand: "Babylove",
      description: "Nôi cũi cao cấp bằng gỗ tự nhiên, thiết kế đảm bảo an toàn",
      features: ["Gỗ tự nhiên", "Sơn không độc hại", "Mattress cao cấp"],
      isBestSeller: true,
    },
  ];

  const categories = [
    { id: "all", name: "Tất cả sản phẩm", count: allProducts.length },
    { id: "Xe đẩy", name: "Xe đẩy", count: allProducts.filter(p => p.category === "Xe đẩy").length },
    { id: "Quần áo", name: "Quần áo", count: allProducts.filter(p => p.category === "Quần áo").length },
    { id: "Sữa bột", name: "Sữa bột", count: allProducts.filter(p => p.category === "Sữa bột").length },
    { id: "Đồ chơi", name: "Đồ chơi", count: allProducts.filter(p => p.category === "Đồ chơi").length },
    { id: "Ghế ăn", name: "Ghế ăn", count: allProducts.filter(p => p.category === "Ghế ăn").length },
    { id: "Nôi cũi", name: "Nôi cũi", count: allProducts.filter(p => p.category === "Nôi cũi").length },
  ];

  const priceRanges = [
    "Dưới 500k",
    "500k - 1 triệu",
    "1 - 3 triệu",
    "3 - 5 triệu",
    "Trên 5 triệu",
  ];

  const productsPerPage = 6;
  
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="w-full py-6 px-8 lg:px-20 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-3xl font-bold">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </div>            <div className="hidden lg:flex space-x-8">
              <Link to="/home" className="font-semibold text-gray-800 hover:text-[#ef62f9]">TRANG CHỦ</Link>
              <Link to="/products" className="font-semibold text-[#ef62f9]">SẢN PHẨM</Link>
              <Link to="/strollers" className="font-semibold text-gray-800 hover:text-[#ef62f9]">XE ĐẨY</Link>
              <Link to="/clothing" className="font-semibold text-gray-800 hover:text-[#ef62f9]">QUẦN ÁO</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ef62f9] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 py-16 px-8 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Khám phá <span className="text-[#ef62f9]">sản phẩm</span> tốt nhất cho bé
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Từ xe đẩy cao cấp đến quần áo organic, chúng tôi có tất cả những gì bé yêu cần
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <Truck className="h-5 w-5 text-[#0bbdf8]" />
              <span className="text-sm font-medium">Miễn phí vận chuyển</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Bảo hành chính hãng</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <RotateCcw className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Đổi trả 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-20 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Categories */}
          <div className="lg:w-1/4">
            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Danh mục sản phẩm</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center ${
                      selectedCategory === category.id
                        ? "bg-[#ef62f9] text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm ${
                      selectedCategory === category.id ? "text-white" : "text-gray-500"
                    }`}>
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Price Filter */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Khoảng giá
              </h3>
              {priceRanges.map((range) => (
                <label key={range} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === range}
                    onChange={() => setSelectedPriceRange(range)}
                    className="mr-2"
                  />
                  <span className="text-sm">{range}</span>
                </label>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setSelectedPriceRange("")}
              >
                Xóa bộ lọc
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "all" ? "Tất cả sản phẩm" : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Hiển thị {currentProducts.length} của {filteredProducts.length} sản phẩm
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="popular">Phổ biến nhất</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="newest">Mới nhất</option>
                    <option value="rating">Đánh giá cao</option>
                  </select>
                </div>
                
                <div className="flex border rounded">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {currentProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className={`${viewMode === "list" ? "flex" : ""}`}>
                    {/* Product Image */}
                    <div className={`relative ${
                      viewMode === "list" ? "w-80 h-60" : "w-full h-72"
                    } bg-gray-50 overflow-hidden`}>
                      {/* Badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {product.discount && (
                          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            -{product.discount}
                          </div>
                        )}
                        {product.isNew && (
                          <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            MỚI
                          </div>
                        )}
                        {product.isBestSeller && (
                          <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            BÁN CHẠY
                          </div>
                        )}
                      </div>                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="bg-white/80 hover:bg-white"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart className={`h-4 w-4 ${
                            isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                          }`} />
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-1">
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {product.brand}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg leading-6 line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews} đánh giá)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-[#ef62f9]">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.map((feature, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-[#ef62f9] hover:bg-[#df52e9]"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Thêm vào giỏ
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link to={`/product/${product.id}`}>
                            Chi tiết
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-[#ef62f9] hover:bg-[#df52e9]" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] py-16 px-8 lg:px-20 mt-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin khuyến mãi</h2>
          <p className="text-lg mb-8 opacity-90">
            Nhận ngay thông tin về sản phẩm mới và ưu đãi đặc biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Nhập email của bạn"
              className="flex-1 bg-white text-gray-900"
            />
            <Button className="bg-white text-[#ef62f9] hover:bg-gray-100 font-semibold">
              Đăng ký
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm chất lượng cao.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#ef62f9]">
                📘
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#ef62f9]">
                📷
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#ef62f9]">
                🐦
              </Button>
            </div>
          </div>
            <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/strollers" className="hover:text-[#ef62f9]">Xe đẩy</Link></li>
              <li><Link to="/clothing" className="hover:text-[#ef62f9]">Quần áo bé</Link></li>
              <li><Link to="/products" className="hover:text-[#ef62f9]">Đồ chơi</Link></li>
              <li><Link to="/products" className="hover:text-[#ef62f9]">Sữa bột</Link></li>
              <li><Link to="/products" className="hover:text-[#ef62f9]">Nôi cũi</Link></li>
            </ul>
          </div>
            <div>
            <h4 className="font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="mailto:info@mombabyshop.com" className="hover:text-[#ef62f9]">Liên hệ</a></li>
              <li><a href="/return-policy" className="hover:text-[#ef62f9]">Chính sách đổi trả</a></li>
              <li><a href="/purchase-guide" className="hover:text-[#ef62f9]">Hướng dẫn mua hàng</a></li>
              <li><a href="/faq" className="hover:text-[#ef62f9]">FAQ</a></li>
              <li><a href="/warranty" className="hover:text-[#ef62f9]">Bảo hành</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📍 123 Đường ABC, Q.1, TP.HCM</li>
              <li>📞 1900 1234</li>
              <li>✉️ info@mombabyshop.com</li>
              <li>🕒 8:00 - 22:00 (T2-CN)</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-600">
          <p>&copy; 2024 MomBabyShop. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};
