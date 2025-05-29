import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, ShoppingCart, Heart, Menu } from "lucide-react";

export const HomePage = (): JSX.Element => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-[#ef62f9]">MomBaby</span>
                <span className="text-[#0bbdf8]">Shop</span>
              </h1>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="font-bold text-[#060606] hover:text-[#ef62f9] transition-colors">
                TRANG CHỦ
              </a>
              <a href="#" className="font-bold text-[#060606] hover:text-[#ef62f9] transition-colors">
                MẪU MỚI
              </a>
              <a href="#" className="font-bold text-[#060606] hover:text-[#ef62f9] transition-colors">
                BÁN CHẠY
              </a>
              <a href="#" className="font-bold text-[#060606] hover:text-[#ef62f9] transition-colors">
                GIẢM GIÁ
              </a>
            </nav>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-6">
              <a href="#" className="font-bold text-black hover:text-[#ef62f9] transition-colors">
                CHÍNH SÁCH
              </a>
              <a href="#" className="font-bold text-black hover:text-[#ef62f9] transition-colors">
                LIÊN HỆ
              </a>
              
              {/* Icons */}
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-gray-600 hover:text-[#ef62f9] cursor-pointer transition-colors" />
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-[#ef62f9] cursor-pointer transition-colors" />
              </div>

              {/* Mobile Menu */}
              <Menu className="md:hidden w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[725px] bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="absolute inset-0 bg-[url(/bedroom-baby-with-light-colored-furniture-walls.png)] bg-cover bg-center rounded-[20px] mx-4">
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-black/60 via-gray-600/40 to-transparent" />
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            {/* Main Title */}
            <h1 className="text-5xl font-bold mb-8">
              <span className="text-[#ef62f9]">MomBaby</span>
              <span className="text-[#0bbdf8]">Shop</span>
            </h1>

            {/* Search Bar */}
            <div className="w-full max-w-4xl mb-8">
              <div className="relative flex items-center">
                <Input
                  className="h-[74px] pl-6 pr-[200px] text-2xl text-gray-600 rounded-l-[10px] rounded-r-none border-none bg-white"
                  placeholder="Quần áo, nôi, sữa,..."
                />
                <Button className="absolute right-0 h-[51px] w-[173px] bg-[#5b8df8] hover:bg-[#4a7de8] rounded-[10px] text-white text-2xl font-normal">
                  Tìm kiếm
                </Button>
              </div>
            </div>

            {/* Hero Description */}
            <p className="text-white text-5xl font-bold text-center max-w-5xl mb-8 leading-tight">
              Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm quần áo, đồ dùng và sữa tốt nhất.
            </p>

            {/* CTA Button */}
            <Button className="w-[315px] h-[70px] bg-white hover:bg-gray-100 text-[#2f2e2e] text-[32px] rounded-[10px] font-normal">
              Khám phá ngay!
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 text-lg">
              Khám phá các sản phẩm chất lượng cao, được thiết kế đặc biệt để đáp ứng nhu cầu của mẹ và bé.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div className="bg-[#ffc8dd] rounded-2xl p-6 text-center">
              <div className="h-48 flex items-center justify-center mb-4">
                <img src="/image.png" alt="Gối chữ U đa năng" className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-medium text-lg mb-1">Gối chữ U đa năng</h3>
              <p className="text-gray-600 mb-2">Trắng</p>
              <p className="font-bold text-lg">160.000 đ</p>
            </div>

            {/* Product 2 */}
            <div className="bg-[#e0eff6] rounded-2xl p-6 text-center">
              <div className="h-48 flex items-center justify-center mb-4">
                <img src="/image-1.png" alt="Xe đẩy trẻ em Joie Chrome" className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-medium text-lg mb-1">Xe đẩy trẻ em Joie Chrome</h3>
              <p className="text-gray-600 mb-2">Xám</p>
              <p className="font-bold text-lg">7.500.000 đ</p>
            </div>

            {/* Product 3 */}
            <div className="bg-[#eeebff] rounded-2xl p-6 text-center">
              <div className="h-48 flex items-center justify-center mb-4">
                <img src="/image-2.png" alt="Nôi đưa trẻ em Joie Serina" className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-medium text-lg mb-1">Nôi đưa trẻ em Joie Serina</h3>
              <p className="text-gray-600 mb-2">Xám</p>
              <p className="font-bold text-lg">9.499.000 đ</p>
            </div>

            {/* Product 4 */}
            <div className="bg-[#82c2ff] rounded-2xl p-6 text-center">
              <div className="h-48 flex items-center justify-center mb-4">
                <img src="/image-3.png" alt="Ghế gội đầu Holla" className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-medium text-lg mb-1">Ghế gội đầu Holla</h3>
              <p className="text-gray-600 mb-2">Hồng</p>
              <p className="font-bold text-lg">450.000 đ</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#ff99b6] hover:bg-[#ffc8dd] text-white px-8 py-3 rounded-full font-medium">
              Xem tất cả sản phẩm
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Benefits Section */}
      <section className="py-16 bg-[#fbe2fc] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1c282a] mb-4">ƯU ĐÃI KHÁCH HÀNG</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icon.png" alt="Cung cấp" className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#07484a] mb-2">Cung cấp</h3>
              <p className="text-[#07484a] text-lg">Giúp cho các mẹ và bé có những trải nghiệm tốt nhất</p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icon-return.png" alt="Hoàn trả" className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#07484a] mb-2">Hoàn trả</h3>
              <p className="text-[#07484a] text-lg">Nếu sản phẩm có vấn đề gì có thể hoàn đổi lại trong 30 ngày sau khi mua</p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#ff99b6]" />
              </div>
              <h3 className="text-2xl font-bold text-[#07484a] mb-2">Chăm sóc khách hàng</h3>
              <p className="text-[#07484a] text-lg">Chúng tôi luôn hỗ trợ và lắng nghe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-[#ef62f9]">MomBaby</span>
                <span className="text-[#0bbdf8]">Shop</span>
              </h3>
              <p className="text-gray-600 mb-4">
                Chúng tôi cung cấp các sản phẩm chất lượng cao dành cho mẹ và bé.
              </p>
            </div>

            {/* Store Links */}
            <div>
              <h4 className="font-bold mb-4">Cửa hàng</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-[#ff99b6]">Sản phẩm mới</a></li>
                <li><a href="#" className="hover:text-[#ff99b6]">Bán chạy</a></li>
                <li><a href="#" className="hover:text-[#ff99b6]">Giảm giá</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="font-bold mb-4">Về chúng tôi</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-[#ff99b6]">Câu chuyện</a></li>
                <li><a href="#" className="hover:text-[#ff99b6]">Đội ngũ</a></li>
                <li><a href="#" className="hover:text-[#ff99b6]">Tuyển dụng</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-[#ff99b6]">Liên hệ</a></li>
                <li><a href="#" className="hover:text-[#ff99b6]">FAQ</a></li>
                <li><a href="#" className="hover:text-[#ff99b6]">Chính sách đổi trả</a></li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-300 mb-8" />
          <div className="text-center text-gray-600">
            <p>&copy; 2025 MomBabyShop. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
