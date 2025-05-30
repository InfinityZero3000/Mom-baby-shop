import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui';
import { Card, CardContent } from '../../components/ui/card';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  Share2,
  Facebook,
  Instagram,
  Twitter,
  ArrowLeft,
  Home,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useToast } from '../../contexts/ToastContext';

interface ProductDetailProps {
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
  gallery?: string[];
  sizes?: string[];
  colors?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  // Sample product data - in real app, this would come from API
  const sampleProducts: ProductDetailProps[] = [
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
      description: "Xe đẩy cao cấp với thiết kế hiện đại, an toàn tuyệt đối cho bé. Được thiết kế với công nghệ tiên tiến, khung nhôm chắc chắn và hệ thống phanh an toàn. Phù hợp cho trẻ từ 0-4 tuổi.",
      features: ["Gấp gọn 1 tay", "Phanh 2 bánh", "Khóa an toàn 5 điểm", "Chống lật", "Bánh xe 360°"],
      gallery: ["/stroller-premium.png", "/stroller-premium-2.png", "/stroller-premium-3.png"],
      colors: ["Đen", "Xám", "Xanh navy"],
      specifications: {
        "Trọng lượng": "8.5kg",
        "Tải trọng tối đa": "25kg",
        "Kích thước mở": "85 x 60 x 110cm",
        "Kích thước gấp": "30 x 60 x 80cm",
        "Chất liệu khung": "Nhôm cao cấp",
        "Chất liệu vải": "Polyester chống nước"
      },
      inStock: true,
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
      description: "Bộ quần áo cotton 100% organic, mềm mại và thân thiện với da bé. Được làm từ cotton hữu cơ cao cấp, không chứa hóa chất độc hại.",
      features: ["Cotton organic", "Không chất tẩy", "Kháng khuẩn tự nhiên", "Thấm hút mồ hôi"],
      gallery: ["/clothing-organic.png", "/clothing-organic-2.png"],
      sizes: ["3M", "6M", "9M", "12M", "18M", "24M"],
      colors: ["Hồng", "Xanh", "Vàng", "Trắng"],
      specifications: {
        "Chất liệu": "100% Cotton Organic",
        "Xuất xứ": "Việt Nam",
        "Kiểu dáng": "Unisex",
        "Cách giặt": "Máy giặt 30°C"
      },
      inStock: true,
      isNew: true,
    },
    {
      id: 3,
      name: "Nôi cũi đa năng BabyLove",
      category: "Nôi cũi",
      price: "4.500.000 đ",
      originalPrice: "5.200.000 đ",
      image: "/crib-premium.png",
      rating: 4.7,
      reviews: 89,
      discount: "13%",
      brand: "BabyLove",
      description: "Nôi cũi đa năng với thiết kế an toàn và tiện dụng. Có thể điều chỉnh độ cao và chuyển đổi thành giường trẻ em khi bé lớn.",
      features: ["Điều chỉnh 7 độ cao", "Chuyển đổi thành giường", "Gỗ tự nhiên", "Sơn không độc hại"],
      gallery: ["/crib-premium.png", "/crib-premium-2.png"],
      colors: ["Gỗ tự nhiên", "Trắng"],
      specifications: {
        "Kích thước": "120 x 60 x 90cm",
        "Chất liệu": "Gỗ thông tự nhiên",
        "Tải trọng": "30kg",
        "Tiêu chuẩn an toàn": "CE, EN 716"
      },
      inStock: true,
    },
    {
      id: 4,
      name: "Ghế ăn dặm Chicco Polly",
      category: "Ghế ăn",
      price: "2.800.000 đ",
      image: "/high-chair.png",
      rating: 4.6,
      reviews: 124,
      brand: "Chicco",
      description: "Ghế ăn dặm đa năng với thiết kế tiện lợi, điều chỉnh được độ cao và góc ngồi để phù hợp với từng giai đoạn phát triển của bé.",
      features: ["7 độ cao điều chỉnh", "3 vị trí tựa", "Bánh xe di chuyển", "Khay ăn có thể tháo rời"],
      gallery: ["/high-chair.png"],
      colors: ["Xanh", "Hồng", "Xám"],
      specifications: {
        "Độ tuổi": "6 tháng - 3 tuổi",
        "Tải trọng": "15kg",
        "Kích thước": "55 x 75 x 105cm",
        "Chất liệu": "Nhựa ABS + khung thép"
      },
      inStock: true,
    },
    {
      id: 5,
      name: "Xe đẩy du lịch Joie Pact",
      category: "Xe đẩy",
      price: "4.200.000 đ",
      originalPrice: "4.800.000 đ",
      image: "/stroller-travel.png",
      rating: 4.5,
      reviews: 78,
      discount: "12%",
      brand: "Joie",
      description: "Xe đẩy du lịch siêu nhẹ, gấp gọn cực kỳ tiện lợi. Thiết kế tối ưu cho việc di chuyển và du lịch.",
      features: ["Siêu nhẹ 5.9kg", "Gấp gọn 1 giây", "Bánh xe chống rung", "Tựa đầu điều chỉnh"],
      gallery: ["/stroller-travel.png", "/stroller-travel-2.png"],
      colors: ["Đen", "Xanh dương"],
      specifications: {
        "Trọng lượng": "5.9kg",
        "Tải trọng": "15kg",
        "Độ tuổi": "6 tháng - 3 tuổi",
        "Kích thước gấp": "30 x 44 x 56cm"
      },
      inStock: true,
    }
  ];

  const product = sampleProducts.find(p => p.id === parseInt(id || '1')) || sampleProducts[0];

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      addToast({
        type: "error",
        title: "Lỗi",
        message: "Vui lòng chọn kích thước"
      });
      return;
    }

    if (product.colors && !selectedColor) {
      addToast({
        type: "error", 
        title: "Lỗi",
        message: "Vui lòng chọn màu sắc"
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        brand: product.brand,
        selectedSize,
        selectedColor,
      });
    }

    addToast({
      type: "success",
      title: "Thành công!",
      message: `Đã thêm ${quantity} ${product.name} vào giỏ hàng`
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      addToast({
        type: "info",
        title: "Đã xóa",
        message: "Đã xóa khỏi danh sách yêu thích"
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
        reviews: product.reviews,
      });
      addToast({
        type: "success",
        title: "Thành công!",
        message: "Đã thêm vào danh sách yêu thích"
      });
    }
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      addToast({
        type: "error",
        title: "Lỗi",
        message: "Vui lòng chọn kích thước"
      });
      return;
    }

    if (product.colors && !selectedColor) {
      addToast({
        type: "error",
        title: "Lỗi", 
        message: "Vui lòng chọn màu sắc"
      });
      return;
    }

    // Add to cart first
    handleAddToCart();
    
    // Navigate to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
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

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="w-full py-6 px-8 lg:px-20 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-bold">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </Link>
            
            <div className="hidden lg:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#ef62f9] font-medium">Trang chủ</Link>
              <Link to="/products" className="text-gray-700 hover:text-[#ef62f9] font-medium">Sản phẩm</Link>
              <Link to="/strollers" className="text-gray-700 hover:text-[#ef62f9] font-medium">Xe đẩy</Link>
              <Link to="/clothing" className="text-gray-700 hover:text-[#ef62f9] font-medium">Quần áo</Link>
            </div>
          </div>
          
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
      <div className="px-8 lg:px-20 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#ef62f9] flex items-center gap-1">
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-[#ef62f9]">Sản phẩm</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/products?category=${product.category}`} className="hover:text-[#ef62f9]">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#ef62f9] font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="px-8 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-2xl p-8 h-96 flex items-center justify-center">
              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  -{product.discount}
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                  MỚI
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="absolute top-12 right-4 bg-yellow-500 text-white">
                  BÁN CHẠY
                </Badge>
              )}
              
              <img
                src={product.gallery?.[selectedImage] || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-[#ef62f9]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-[#ef62f9] border-[#ef62f9]">
                  {product.brand}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className="hover:bg-red-50"
                >
                  <Heart className={`h-5 w-5 ${
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`} />
                </Button>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-[#ef62f9]">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                )}
                {product.discount && (
                  <Badge className="bg-red-500 text-white">
                    Tiết kiệm {product.discount}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Tính năng nổi bật:</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ef62f9] rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="font-semibold mb-3">Kích thước:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-[#ef62f9] hover:bg-[#df52e9]" : ""}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div>
                <h3 className="font-semibold mb-3">Màu sắc:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className={selectedColor === color ? "bg-[#ef62f9] hover:bg-[#df52e9]" : ""}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Số lượng:</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 focus-visible:ring-0"
                    min="1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.inStock ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                className="w-full bg-[#ef62f9] hover:bg-[#df52e9] text-lg py-6"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                MUA NGAY
              </Button>
              
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="w-full text-lg py-6 border-[#ef62f9] text-[#ef62f9] hover:bg-[#ef62f9] hover:text-white"
                disabled={!product.inStock}
              >
                THÊM VÀO GIỎ HÀNG
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-[#0bbdf8]" />
                <span>Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Bảo hành chính hãng</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-5 w-5 text-yellow-500" />
                <span>Đổi trả 30 ngày</span>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm font-medium">Chia sẻ:</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                  <Facebook className="h-4 w-4 text-blue-600" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                  <Instagram className="h-4 w-4 text-pink-600" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                  <Twitter className="h-4 w-4 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                  <Share2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <h4 className="font-semibold mb-3">Tính năng chi tiết:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-900">{key}:</span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Thông số kỹ thuật sẽ được cập nhật sớm.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-2xl font-bold">{product.rating}</span>
                    </div>
                    <p className="text-gray-600 mb-4">Dựa trên {product.reviews} đánh giá</p>
                    <Button variant="outline">
                      Viết đánh giá
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-8 lg:px-20 mt-16">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="text-[#ef62f9]">MomBaby</span>
            <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
          </div>
          <p className="text-gray-600 mb-6">
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
