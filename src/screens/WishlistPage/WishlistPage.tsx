import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Navigation } from '../../components/Navigation';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Trash2, 
  Home, 
  ChevronRight,
  ArrowLeft,
  Eye,
  Grid,
  List
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalItems, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
      brand: item.brand,
    });
    
    addToast({
      type: "success",
      title: "Thành công!",
      message: `${item.name} đã được thêm vào giỏ hàng!`
    });
  };

  const handleRemoveFromWishlist = (id: number, name: string) => {
    removeItem(id);
    addToast({
      type: "info",
      title: "Đã xóa",
      message: `${name} đã được xóa khỏi danh sách yêu thích`
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
    addToast({
      type: "info",
      title: "Đã xóa tất cả",
      message: "Danh sách yêu thích đã được xóa"
    });
  };

  const formatPrice = (price: string) => {
    return price.includes('đ') ? price : `${price} đ`;
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        {/* Navigation */}
        <nav className="w-full py-6 px-8 lg:px-20 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8] font-['Pattaya']">Shop</span>
            </Link>
            
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

        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">💖</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Danh sách yêu thích trống</h1>
            <p className="text-gray-600 mb-8">Thêm sản phẩm vào danh sách yêu thích để xem lại sau</p>
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
          <span className="text-[#ef62f9] font-medium">Danh sách yêu thích</span>
        </nav>
      </div>

      <div className="px-8 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách yêu thích</h1>
              <p className="text-gray-600">
                {totalItems} sản phẩm trong danh sách yêu thích của bạn
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#ef62f9] hover:bg-[#df52e9]" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#ef62f9] hover:bg-[#df52e9]" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Clear All Button */}
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }>
            {items.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                {viewMode === "grid" ? (
                  <div className="flex flex-col h-full">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                      
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {item.category}
                        </Badge>
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2">
                          {item.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex">{renderStars(item.rating)}</div>
                        <span className="text-xs text-gray-500 ml-2">({item.reviews})</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#ef62f9]">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <Button 
                          className="flex-1 bg-[#ef62f9] hover:bg-[#df52e9]"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Thêm vào giỏ
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/product/${item.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div className="flex items-center p-4 gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="secondary" className="text-xs mb-1">
                            {item.category}
                          </Badge>
                          <h3 className="font-semibold text-lg leading-tight mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            <div className="flex">{renderStars(item.rating)}</div>
                            <span className="text-sm text-gray-500 ml-2">({item.reviews} đánh giá)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-[#ef62f9]">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button 
                            onClick={() => handleAddToCart(item)}
                            className="bg-[#ef62f9] hover:bg-[#df52e9]"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Thêm vào giỏ
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link to={`/product/${item.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

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
