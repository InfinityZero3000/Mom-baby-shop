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

interface ClothingProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: string;
  sizes: string[];
  colors: string[];
  material: string;
  ageRange: string;
}

export const ClothingListPage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { addItem, openCart, totalItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Sample clothing products data
  const clothingProducts: ClothingProduct[] = [
    {
      id: 1,
      name: "Bộ quần áo cotton organic cho bé gái",
      category: "Bộ đồ",
      price: "320.000 đ",
      originalPrice: "400.000 đ",
      image: "/clothing-1.png",
      rating: 4.8,
      reviews: 124,
      discount: "20%",
      sizes: ["6M", "9M", "12M", "18M", "24M"],
      colors: ["Hồng", "Trắng", "Xanh pastel"],
      material: "Cotton organic",
      ageRange: "6-24 tháng",
    },
    {
      id: 2,
      name: "Áo thun in hình động vật dễ thương",
      category: "Áo thun",
      price: "150.000 đ",
      image: "/clothing-2.png",
      rating: 4.7,
      reviews: 89,
      sizes: ["6M", "9M", "12M", "18M", "24M", "3T"],
      colors: ["Vàng", "Xanh", "Hồng", "Trắng"],
      material: "Cotton 100%",
      ageRange: "6 tháng - 3 tuổi",
    },
    {
      id: 3,
      name: "Váy công chúa tutu cho bé gái",
      category: "Váy",
      price: "450.000 đ",
      originalPrice: "550.000 đ",
      image: "/clothing-3.png",
      rating: 4.9,
      reviews: 67,
      discount: "18%",
      sizes: ["12M", "18M", "24M", "3T", "4T"],
      colors: ["Hồng", "Tím", "Trắng"],
      material: "Tulle + Cotton lining",
      ageRange: "1-4 tuổi",
    },
    {
      id: 4,
      name: "Quần jeans mềm co giãn cho bé trai",
      category: "Quần dài",
      price: "280.000 đ",
      image: "/clothing-4.png",
      rating: 4.6,
      reviews: 156,
      sizes: ["9M", "12M", "18M", "24M", "3T", "4T"],
      colors: ["Xanh đậm", "Xanh nhạt", "Đen"],
      material: "Denim co giãn",
      ageRange: "9 tháng - 4 tuổi",
    },
    {
      id: 5,
      name: "Body suit cotton cho trẻ sơ sinh",
      category: "Body suit",
      price: "180.000 đ",
      originalPrice: "220.000 đ",
      image: "/clothing-5.png",
      rating: 4.8,
      reviews: 203,
      discount: "18%",
      sizes: ["NB", "3M", "6M", "9M"],
      colors: ["Trắng", "Hồng nhạt", "Xanh nhạt", "Vàng nhạt"],
      material: "Cotton organic",
      ageRange: "0-9 tháng",
    },
    {
      id: 6,
      name: "Áo khoác hoodie mềm mại",
      category: "Áo khoác",
      price: "380.000 đ",
      image: "/clothing-6.png",
      rating: 4.7,
      reviews: 91,
      sizes: ["12M", "18M", "24M", "3T", "4T", "5T"],
      colors: ["Xám", "Xanh navy", "Hồng"],
      material: "Cotton blend",
      ageRange: "1-5 tuổi",
    },
  ];

  const categories = ["Bộ đồ", "Áo thun", "Váy", "Quần dài", "Body suit", "Áo khoác"];
  const sizes = ["NB", "3M", "6M", "9M", "12M", "18M", "24M", "3T", "4T", "5T"];
  const ageRanges = ["0-6 tháng", "6-12 tháng", "1-2 tuổi", "2-3 tuổi", "3-5 tuổi"];
  const priceRanges = [
    "Dưới 200k",
    "200k - 300k",
    "300k - 500k",
    "Trên 500k",
  ];

  const productsPerPage = 6;
  const totalPages = Math.ceil(clothingProducts.length / productsPerPage);

  const filteredProducts = clothingProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
    const matchesAgeRange = selectedAgeRanges.length === 0 || selectedAgeRanges.includes(product.ageRange);
    return matchesSearch && matchesCategory && matchesSize && matchesAgeRange;
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

  const handleAddToCart = (product: ClothingProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      brand: product.category,
    });
    showToast(`${product.name} đã được thêm vào giỏ hàng!`, "success");
  };

  const handleWishlistToggle = (product: ClothingProduct) => {
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
        category: product.category,
        brand: product.category,
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
              <Link to="/strollers" className="font-semibold text-gray-800 hover:text-[#ef62f9]">XE ĐẨY</Link>
              <Link to="/clothing" className="font-semibold text-[#ef62f9]">QUẦN ÁO</Link>
              <Link to="/products" className="font-semibold text-gray-800 hover:text-[#ef62f9]">SẢN PHẨM</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm quần áo..."
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
        <span>Trang chủ</span> <span className="mx-2">/</span> <span className="text-[#ef62f9]">Quần áo trẻ em</span>
      </div>

      <div className="px-8 lg:px-20 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quần áo trẻ em</h1>
          <p className="text-gray-600">Bộ sưu tập thời trang dễ thương và thoải mái cho bé yêu</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Bộ lọc
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Danh mục</h4>
                {categories.map((category) => (
                  <label key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category));
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Kích cỡ</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedSizes.includes(size)) {
                          setSelectedSizes(selectedSizes.filter((s) => s !== size));
                        } else {
                          setSelectedSizes([...selectedSizes, size]);
                        }
                      }}
                      className={`text-xs ${
                        selectedSizes.includes(size) 
                          ? "bg-[#ef62f9] hover:bg-[#df52e9]" 
                          : ""
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Age Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Độ tuổi</h4>
                {ageRanges.map((ageRange) => (
                  <label key={ageRange} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedAgeRanges.includes(ageRange)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAgeRanges([...selectedAgeRanges, ageRange]);
                        } else {
                          setSelectedAgeRanges(selectedAgeRanges.filter((a) => a !== ageRange));
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{ageRange}</span>
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
                  setSelectedCategories([]);
                  setSelectedSizes([]);
                  setSelectedAgeRanges([]);
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
                      
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      
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

                      {/* Material and Age Range */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded">
                            {product.material}
                          </span>
                          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">
                            {product.ageRange}
                          </span>
                        </div>
                      </div>

                      {/* Sizes */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Kích cỡ:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.slice(0, 5).map((size, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 5 && (
                            <span className="text-xs text-gray-500">+{product.sizes.length - 5}</span>
                          )}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-1">Màu sắc:</p>
                        <div className="flex gap-1">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {color}
                            </span>
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                          )}
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
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-gray-600">              <li><Link to="/strollers" className="hover:text-[#ef62f9]">Xe đẩy</Link></li>
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
