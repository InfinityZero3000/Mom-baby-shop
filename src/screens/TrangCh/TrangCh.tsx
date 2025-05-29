import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CallToActionSection } from "./sections/CallToActionSection";
import { CustomerBenefitsSection } from "./sections/CustomerBenefitsSection";
import { FeaturedBrandsSection } from "./sections/FeaturedBrandsSection/FeaturedBrandsSection";
import { ProductShowcaseSection } from "./sections/ProductShowcaseSection/ProductShowcaseSection";

export const TrangCh = (): JSX.Element => {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Gối chữ U đa năng",
      color: "Trắng",
      price: "160.000 đ",
      image: "/image.png",
      bgColor: "bg-[#ffc8dd]",
    },
    {
      id: 2,
      name: "Xe đẩy trẻ em Joie Chrome",
      color: "Xám",
      price: "7.500.000 đ",
      image: "/image-1.png",
      bgColor: "bg-[#e0eff6]",
    },
    {
      id: 3,
      name: "Nôi đưa trẻ em Joie Serina",
      color: "Xám",
      price: "9.499.000 đ",
      image: "/image-2.png",
      bgColor: "bg-[#eeebff]",
    },
    {
      id: 4,
      name: "Ghế gội đầu Holla",
      color: "Hồng",
      price: "450.000 đ",
      image: "/image-3.png",
      bgColor: "bg-[#82c2ff]",
    },
  ];

  // Navigation items
  const navItems = [
    { name: "TRANG CHỦ", href: "#" },
    { name: "MẪU MỚI", href: "#" },
    { name: "BÁN CHẠY", href: "#" },
    { name: "GIẢM GIÁ", href: "#" },
  ];

  const secondaryNavItems = [
    { name: "CHÍNH SÁCH", href: "#" },
    { name: "LIÊN HỆ", href: "#" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1590px] relative">
        {/* Navigation */}
        <nav className="w-full py-8 px-[109px] flex justify-between items-center">
          <div className="flex space-x-10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="[font-family:'Outfit',Helvetica] font-bold text-[#060606] text-xl tracking-[-0.30px] leading-6"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex space-x-10">
            {secondaryNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="[font-family:'Outfit',Helvetica] font-bold text-black text-xl tracking-[-0.30px] leading-6"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-10">
            <img
              className="w-[25px] h-[25px]"
              alt="Search"
              src="/vector-3-1.svg"
            />
            <img className="w-[22px] h-7" alt="Cart" src="/vector-4-1.svg" />
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative w-full h-[725px] mx-auto bg-[url(/bedroom-baby-with-light-colored-furniture-walls.png)] bg-cover bg-center rounded-[20px]">
          <div className="absolute inset-0 rounded-[20px] [background:linear-gradient(180deg,rgba(0,0,0,0.63)_21%,rgba(54,53,53,0.66)_41%,rgba(75,74,74,0.37)_60%,rgba(255,255,255,0)_100%)]" />

          <div className="absolute top-[83px] left-1/2 transform -translate-x-1/2 [font-family:'Paytone_One',Helvetica] font-normal text-5xl text-center">
            <span className="text-[#ef62f9]">MomBaby</span>
            <span className="[font-family:'Pattaya',Helvetica] text-[#0bbdf8]">
              Shop
            </span>
          </div>

          <div className="absolute top-[189px] left-1/2 transform -translate-x-1/2 w-[896px] flex items-center">
            <div className="relative w-full flex items-center">
              <Input
                className="h-[74px] pl-6 pr-[200px] [font-family:'SVN-Helves-Regular',Helvetica] text-2xl text-[#1313138c] tracking-[-2.00px] rounded-l-[10px] rounded-r-none border-none"
                placeholder="Quần áo, nôi, sữa,..."
              />
              <Button className="absolute right-0 h-[51px] w-[173px] bg-[#5b8df8] hover:bg-[#4a7de8] rounded-[10px] [font-family:'SVN-Helves-Regular',Helvetica] font-normal text-white text-2xl tracking-[-2.00px]">
                Tìm kiếm
              </Button>
            </div>
          </div>

          <div className="absolute top-[339px] left-1/2 transform -translate-x-1/2 w-[1087px] [font-family:'SVN-Aptima-Bold',Helvetica] font-bold text-white text-5xl text-center tracking-[-2.00px] leading-[78px]">
            Đồng hành cùng mẹ chăm sóc bé yêu với những sản phẩm quần áo, đồ dùng và sữa tốt nhất.
          </div>

          <Button className="absolute bottom-[132px] left-1/2 transform -translate-x-1/2 w-[315px] h-[70px] bg-[#f9f9f9] hover:bg-[#efefef] rounded-[10px] [font-family:'SVN-Androgyne-Regular',Helvetica] font-normal text-[#2f2e2e] text-[32px] tracking-[-2.00px]">
            Khám phá ngay!
          </Button>
        </div>

        {/* Product Showcase Section */}
        <div className="mt-20">
          <ProductShowcaseSection />
        </div>

        {/* Featured Brands Section */}
        <div className="my-10">
          <FeaturedBrandsSection />
        </div>

        {/* Call To Action Section */}
        <div className="w-full rounded-[20px] mt-10">
          <div className="text-center [font-family:'SVN-Avo-Bold',Helvetica] font-bold text-[#1c282a] text-[60.6px] mb-5">
            ƯU ĐÃI KHÁCH HÀNG
          </div>
          <CallToActionSection />
        </div>

        {/* Customer Benefits Section */}
        <div className="mt-10">
          <CustomerBenefitsSection />
        </div>
      </div>
    </div>
  );
};
