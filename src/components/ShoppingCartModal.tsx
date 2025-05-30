import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Heart,
  Home,
  ChevronLeft,
  ChevronRight,
  Settings,
} from 'lucide-react';

export const ShoppingCartModal: React.FC = () => {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    formatPrice,
  } = useCart();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showPageSizeSettings, setShowPageSizeSettings] = useState(false);

  // Pagination calculations
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // Reset to first page when items change significantly
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [items.length, currentPage, totalPages]);

  // Page size options
  const pageSizeOptions = [3, 5, 10, 15, 20];

  if (!isOpen) return null;

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-[#ef62f9]" />
              <h2 className="text-xl font-bold">Giỏ hàng</h2>
              {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-[#ef62f9] px-2 py-1 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-auto">
            {items.length === 0 ? (
              // Empty Cart
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Giỏ hàng trống
                </h3>
                <p className="mb-6 text-gray-600">
                  Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
                </p>
                <Button 
                  onClick={closeCart}
                  className="bg-[#ef62f9] hover:bg-[#df52e9]"
                  asChild
                >
                  <Link to="/products">
                    <Home className="mr-2 h-4 w-4" />
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </div>
            ) : (              // Cart Items
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {totalItems} sản phẩm trong giỏ hàng
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Page Size Settings Toggle */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPageSizeSettings(!showPageSizeSettings)}
                      className="text-gray-600"
                    >
                      <Settings className="mr-1 h-4 w-4" />
                      Cài đặt
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Xóa tất cả
                    </Button>
                  </div>
                </div>

                {/* Page Size Settings */}
                {showPageSizeSettings && (
                  <Card className="mb-4 p-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Số sản phẩm hiển thị mỗi trang:
                      </span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page
                        }}
                        className="rounded border border-gray-300 px-2 py-1 text-sm"
                      >
                        {pageSizeOptions.map((size) => (
                          <option key={size} value={size}>
                            {size} sản phẩm
                          </option>
                        ))}
                      </select>
                    </div>
                  </Card>
                )}

                {/* Pagination Info */}
                {totalPages > 1 && (
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Hiển thị {startIndex + 1}-{Math.min(endIndex, items.length)} của {items.length} sản phẩm
                    </span>
                    <span>
                      Trang {currentPage} / {totalPages}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {currentItems.map((item) => (
                    <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="truncate text-sm font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <div className="mt-1 flex flex-wrap gap-1 text-xs text-gray-600">
                            <span className="rounded bg-gray-100 px-2 py-1">
                              {item.category}
                            </span>
                            {item.brand && (
                              <span className="rounded bg-gray-100 px-2 py-1">
                                {item.brand}
                              </span>
                            )}
                          </div>
                          
                          {/* Selected Options */}
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="mt-2 flex gap-2 text-xs">
                              {item.selectedSize && (
                                <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                              {item.selectedColor && (
                                <span className="rounded bg-green-100 px-2 py-1 text-green-800">
                                  Màu: {item.selectedColor}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Price and Quantity */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#ef62f9]">
                                {item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  {item.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleQuantityChange(item.id, item.quantity, -1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleQuantityChange(item.id, item.quantity, 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0 text-gray-400 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Trước
                    </Button>

                    <div className="flex items-center gap-2">
                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          // Show first page, last page, current page, and pages around current
                          return (
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                          );
                        })
                        .map((page, index, filteredPages) => (
                          <React.Fragment key={page}>
                            {/* Add ellipsis if there's a gap */}
                            {index > 0 && filteredPages[index - 1] < page - 1 && (
                              <span className="px-2 text-gray-400">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 p-0 ${
                                currentPage === page 
                                  ? "bg-[#ef62f9] hover:bg-[#df52e9] text-white" 
                                  : ""
                              }`}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1"
                    >
                      Sau
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-semibold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="text-green-600 font-medium">Miễn phí</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-[#ef62f9]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-[#ef62f9] hover:bg-[#df52e9]"
                  onClick={closeCart}
                  asChild
                >
                  <Link to="/checkout">
                    Thanh toán
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                  asChild
                >
                  <Link to="/products">
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </div>

              {/* Additional Features */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>Yêu thích</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Chia sẻ</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
