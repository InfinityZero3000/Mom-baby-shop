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
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Phone,
} from "lucide-react";

interface FeaturedProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: string;
  bgColor: string;
}

export const ImprovedHomePage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem, openCart, totalItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  // Featured products data
  const featuredProducts: FeaturedProduct[] = [
    {
      id: 1,
      name: "Gối chữ U cho mẹ bầu",
      category: "Đệm và gối",
      price: "560.000 đ",
      originalPrice: "700.000 đ",
      image: "/pillow-u-shape.png",
      rating: 4.8,
      reviews: 156,
      discount: "20%",
      bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
    },
    {
      id: 2,
      name: "Xe đẩy trẻ em Joie Chrome",
      category: "Xe đẩy",
      price: "7.499.000 đ",
      originalPrice: "8.499.000 đ",
      image: "/stroller-1.png",
      rating: 4.9,
      reviews: 203,
      discount: "12%",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    },
    {
      id: 3,
      name: "Nôi đưa trẻ em Joie Serina",
      category: "Nôi cũi",
      price: "6.499.000 đ",
      image: "/crib-joie.png",
      rating: 4.7,
      reviews: 89,
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
    },
    {
      id: 4,
      name: "Ghế gội đầu Holla cho bé",
      category: "Phụ kiện tắm",
      price: "450.000 đ",
      originalPrice: "550.000 đ",
      image: "/bath-chair.png",
      rating: 4.6,
      reviews: 67,
      discount: "18%",
      bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-200",
    },
  ];

  // Categories
  const categories = [
    { name: "Xe đẩy", icon: "🚗", description: "Xe đẩy đa năng", count: 45 },
    { name: "Quần áo", icon: "👕", description: "Thời trang bé yêu", count: 128 },
    { name: "Đồ chơi", icon: "🧸", description: "Đồ chơi giáo dục", count: 67 },
    { name: "Sữa bột", icon: "🍼", description: "Dinh dưỡng cho bé", count: 32 },
    { name: "Nôi cũi", icon: "🛏️", description: "Giấc ngủ cho bé", count: 28 },
    { name: "Phụ kiện", icon: "🎯", description: "Phụ kiện tiện ích", count: 89 },
  ];

  // Brands
  const brands = [
    { name: "Joie", logo: "/brand-joie.png" },
    { name: "Chicco", logo: "/brand-chicco.png" },
    { name: "Mothercare", logo: "/brand-mothercare.png" },
    { name: "Fisher-Price", logo: "/brand-fisher-price.png" },
    { name: "Aptamil", logo: "/brand-aptamil.png" },
    { name: "Babylove", logo: "/brand-babylove.png" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };
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

  const handleAddToCart = (product: FeaturedProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    showToast(`${product.name} đã được thêm vào giỏ hàng!`, "success");
  };

  const handleWishlistToggle = (product: FeaturedProduct) => {
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
      });
      showToast(`${product.name} đã được thêm vào danh sách yêu thích`, "success");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] text-white py-2 px-8 lg:px-20">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>Tải ứng dụng</span>
            <span>|</span>
            <span>Kết nối</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Hỗ trợ</span>
            <span>|</span>
            <span>Đăng nhập</span>
            <span>|</span>
            <span>Đăng ký</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full py-6 px-8 lg:px-20 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-3xl font-bold">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </div>            <div className="hidden lg:flex space-x-8">
              <Link to="/home" className="font-semibold text-[#ef62f9]">TRANG CHỦ</Link>
              <Link to="/products" className="font-semibold text-gray-800 hover:text-[#ef62f9]">SẢN PHẨM</Link>
              <Link to="/strollers" className="font-semibold text-gray-800 hover:text-[#ef62f9]">XE ĐẨY</Link>
              <Link to="/clothing" className="font-semibold text-gray-800 hover:text-[#ef62f9]">QUẦN ÁO</Link>
              <a href="mailto:info@mombabyshop.com" className="font-semibold text-gray-800 hover:text-[#ef62f9]">LIÊN HỆ</a>
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

      {/* Hero Section */}
      <div className="relative w-full h-[600px] mx-auto bg-gradient-to-r from-pink-50 via-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-baby-room.jpg')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-8 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </h1>
            
            <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm 
              <span className="text-[#ef62f9] font-semibold"> quần áo</span>, 
              <span className="text-[#0bbdf8] font-semibold"> đồ dùng</span> và 
              <span className="text-[#ef62f9] font-semibold"> sữa</span> tốt nhất.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="flex items-center">
                <Input
                  className="h-16 pl-6 pr-40 text-xl rounded-l-2xl border-none shadow-lg"
                  placeholder="Quần áo, nôi, sữa, xe đẩy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="h-16 px-8 bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] hover:from-[#df52e9] hover:to-[#0aacf7] rounded-r-2xl text-xl font-semibold shadow-lg">
                  Tìm kiếm
                </Button>
              </div>
            </div>            <Button className="bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8] hover:from-[#df52e9] hover:to-[#0aacf7] text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg" asChild>
              <Link to="/products">
                Khám phá ngay!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-8 lg:px-20 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Miễn phí vận chuyển</h3>
            <p className="text-gray-600">Miễn phí ship toàn quốc cho đơn hàng từ 500k</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bảo hành chính hãng</h3>
            <p className="text-gray-600">Cam kết 100% sản phẩm chính hãng có bảo hành</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Đổi trả 30 ngày</h3>
            <p className="text-gray-600">Hỗ trợ đổi trả trong vòng 30 ngày nếu có lỗi</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Danh mục sản phẩm</h2>
            <p className="text-xl text-gray-600">Khám phá các sản phẩm chất lượng cao cho bé yêu</p>
          </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const getCategoryLink = (name: string) => {
                switch (name) {
                  case "Xe đẩy": return "/strollers";
                  case "Quần áo": return "/clothing";
                  default: return "/products";
                }
              };
              
              return (
                <Link key={index} to={getCategoryLink(category.name)}>
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                    <span className="text-xs text-[#ef62f9] font-medium">{category.count} sản phẩm</span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 px-8 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sản phẩm nổi bật</h2>
            <p className="text-xl text-gray-600">Những sản phẩm được yêu thích nhất</p>
          </div>

          {/* Product Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className={`relative h-64 ${product.bgColor} p-4`}>
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                        -{product.discount}
                      </div>
                    )}                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-[#ef62f9] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-[#ef62f9]">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-[#ef62f9] hover:bg-[#df52e9]"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Thêm vào giỏ
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link to={`/product/${product.id}`}>
                          Xem chi tiết
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" className="px-8 py-3">
                Xem tất cả sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="py-16 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Thương hiệu uy tín</h2>
            <p className="text-xl text-gray-600">Đối tác chính thức của các thương hiệu hàng đầu</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="py-16 px-8 lg:px-20 bg-gradient-to-r from-[#ef62f9] to-[#0bbdf8]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ưu đãi đặc biệt</h2>
          <p className="text-xl mb-8 opacity-90">
            Đăng ký ngay để nhận thông tin khuyến mãi và giảm giá 10% cho đơn hàng đầu tiên
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Nhập email của bạn"
              className="flex-1 bg-white text-gray-900"
            />
            <Button className="bg-white text-[#ef62f9] hover:bg-gray-100 font-semibold px-6">
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-[#ef62f9]">MomBaby</span>
                <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
              </div>
              <p className="text-gray-400 mb-4">
                Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm chất lượng cao.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  📘
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  📷
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  🐦
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Xe đẩy</a></li>
                <li><a href="#" className="hover:text-white">Quần áo bé</a></li>
                <li><a href="#" className="hover:text-white">Đồ chơi</a></li>
                <li><a href="#" className="hover:text-white">Sữa bột</a></li>
                <li><a href="#" className="hover:text-white">Nôi cũi</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white">Chính sách đổi trả</a></li>
                <li><a href="#" className="hover:text-white">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1900 1234
                </li>
                <li>📍 123 Đường ABC, Q.1, TP.HCM</li>
                <li>✉️ info@mombabyshop.com</li>
                <li>🕒 8:00 - 22:00 (T2-CN)</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 MomBabyShop. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
