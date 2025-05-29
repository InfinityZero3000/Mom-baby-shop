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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface StrollerProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: string;
  features: string[];
  colors: string[];
}

export const StrollerListPage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { addItem, openCart, totalItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Sample stroller products data
  const strollerProducts: StrollerProduct[] = [
    {
      id: 1,
      name: "Xe đẩy trẻ em Joie Chrome DLX",
      brand: "Joie",
      price: "7.500.000 đ",
      originalPrice: "8.500.000 đ",
      image: "/stroller-1.png",
      rating: 4.8,
      reviews: 156,
      discount: "12%",
      features: ["Gấp gọn", "Phanh 2 bánh", "Khóa an toàn"],
      colors: ["Xám", "Đen", "Xanh"],
    },
    {
      id: 2,
      name: "Xe đẩy Chicco Bravo Trio",
      brand: "Chicco",
      price: "9.200.000 đ",
      image: "/stroller-2.png",
      rating: 4.9,
      reviews: 203,
      features: ["3 trong 1", "Tương thích car seat", "Bánh lớn"],
      colors: ["Đen", "Xám", "Nâu"],
    },
    {
      id: 3,
      name: "Xe đẩy Baby Jogger City Mini GT2",
      brand: "Baby Jogger",
      price: "6.800.000 đ",
      originalPrice: "7.200.000 đ",
      image: "/stroller-3.png",
      rating: 4.7,
      reviews: 89,
      discount: "6%",
      features: ["Bánh địa hình", "Gấp 1 tay", "Tựa đầu điều chỉnh"],
      colors: ["Đỏ", "Xanh", "Xám"],
    },
    {
      id: 4,
      name: "Xe đẩy Maxi-Cosi Lara2",
      brand: "Maxi-Cosi",
      price: "4.500.000 đ",
      image: "/stroller-4.png",
      rating: 4.6,
      reviews: 67,
      features: ["Siêu nhẹ", "Gấp tự động", "UV Protection"],
      colors: ["Hồng", "Xanh", "Xám"],
    },
    {
      id: 5,
      name: "Xe đẩy Bugaboo Fox 3",
      brand: "Bugaboo",
      price: "15.500.000 đ",
      originalPrice: "17.000.000 đ",
      image: "/stroller-5.png",
      rating: 5.0,
      reviews: 124,
      discount: "9%",
      features: ["Premium", "Bánh lớn", "Khung nhôm cao cấp"],
      colors: ["Đen", "Trắng", "Xanh navy"],
    },
    {
      id: 6,
      name: "Xe đẩy UPPAbaby Vista V2",
      brand: "UPPAbaby",
      price: "18.900.000 đ",
      image: "/stroller-6.png",
      rating: 4.9,
      reviews: 178,
      features: ["Mở rộng cho 2 bé", "Giỏ lớn", "Bánh đặc biệt"],
      colors: ["Xám", "Đen", "Xanh"],
    },
  ];

  const brands = ["Joie", "Chicco", "Baby Jogger", "Maxi-Cosi", "Bugaboo", "UPPAbaby"];
  const priceRanges = [
    "Dưới 5 triệu",
    "5 - 10 triệu",
    "10 - 15 triệu",
    "Trên 15 triệu",
  ];

  const productsPerPage = 6;
  const totalPages = Math.ceil(strollerProducts.length / productsPerPage);

  const filteredProducts = strollerProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesSearch && matchesBrand;
  });

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

  const handleAddToCart = (product: StrollerProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: "Xe đẩy",
      brand: product.brand,
    });
    showToast(`${product.name} đã được thêm vào giỏ hàng!`, "success");
  };

  const handleWishlistToggle = (product: StrollerProduct) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`${product.name} đã được xóa khỏi danh sách yêu thích`, "info");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: "Xe đẩy",
        brand: product.brand,
      });
      showToast(`${product.name} đã được thêm vào danh sách yêu thích`, "success");
    }
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
              <Link to="/strollers" className="font-semibold text-[#ef62f9]">XE ĐẨY</Link>
              <Link to="/clothing" className="font-semibold text-gray-800 hover:text-[#ef62f9]">QUẦN ÁO</Link>
              <Link to="/products" className="font-semibold text-gray-800 hover:text-[#ef62f9]">SẢN PHẨM</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm xe đẩy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
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

      {/* Breadcrumb */}
      <div className="px-8 lg:px-20 py-4 text-sm text-gray-600">
        <span>Trang chủ</span> <span className="mx-2">/</span> <span className="text-[#ef62f9]">Xe đẩy trẻ em</span>
      </div>

      <div className="px-8 lg:px-20 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Xe đẩy trẻ em</h1>
          <p className="text-gray-600">Khám phá bộ sưu tập xe đẩy cao cấp cho bé yêu</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Bộ lọc
              </h3>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Thương hiệu</h4>
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Khoảng giá</h4>
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
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedPriceRange("");
                  setSearchTerm("");
                }}
              >
                Xóa bộ lọc
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                Hiển thị {currentProducts.length} của {filteredProducts.length} sản phẩm
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="popular">Phổ biến</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="newest">Mới nhất</option>
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
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={`${viewMode === "list" ? "flex" : ""}`}>
                    {/* Product Image */}
                    <div className={`relative ${
                      viewMode === "list" ? "w-64 h-48" : "w-full h-64"
                    } bg-gray-50`}>
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                          -{product.discount}
                        </div>
                      )}                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10 hover:bg-white/80"
                        onClick={() => handleWishlistToggle(product)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg leading-6 line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews} đánh giá)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-bold text-[#ef62f9]">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-1">Màu sắc:</p>
                        <div className="flex gap-1">
                          {product.colors.map((color, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {color}
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
                        </Button>                        <Button variant="outline" className="flex-1" asChild>
                          <Link to={`/product/${product.id}`}>
                            Xem chi tiết
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
              <div className="flex justify-center items-center mt-8 gap-2">
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

      {/* Footer */}
      <footer className="bg-gray-50 mt-16 py-12 px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </div>
            <p className="text-gray-600 text-sm">
              Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm chất lượng cao.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/strollers" className="hover:text-[#ef62f9]">Xe đẩy</Link></li>
              <li><Link to="/clothing" className="hover:text-[#ef62f9]">Quần áo bé</Link></li>
              <li><Link to="/products" className="hover:text-[#ef62f9]">Đồ chơi</Link></li>
              <li><Link to="/products" className="hover:text-[#ef62f9]">Sữa bột</Link></li>
            </ul>
          </div>
            <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="mailto:info@mombabyshop.com" className="hover:text-[#ef62f9]">Liên hệ</a></li>
              <li><a href="/return-policy" className="hover:text-[#ef62f9]">Chính sách đổi trả</a></li>
              <li><a href="/purchase-guide" className="hover:text-[#ef62f9]">Hướng dẫn mua hàng</a></li>
              <li><a href="/faq" className="hover:text-[#ef62f9]">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kết nối</h4>
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
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-600">
          <p>&copy; 2024 MomBabyShop. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};
