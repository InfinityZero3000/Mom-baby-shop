import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";

// Data for store links
const storeLinks = [
  { title: "Sản phẩm mới", href: "#" },
  { title: "Bán chạy", href: "#" },
  { title: "Giảm giá", href: "#" },
];

// Data for about us links
const aboutLinks = [
  { title: "Câu chuyện", href: "#" },
  { title: "Đội ngũ", href: "#" },
  { title: "Tuyển dụng", href: "#" },
];

// Data for support links
const supportLinks = [
  { title: "Liên hệ", href: "#" },
  { title: "FAQ", href: "#" },
  { title: "Chính sách đổi trả", href: "#" },
];

// Data for social media icons
const socialIcons = [
  { src: "/frame-2.svg", alt: "Frame" },
  { src: "/frame-4.svg", alt: "Frame" },
  { src: "/frame-3.svg", alt: "Frame", className: "w-[24.22px] ml-[-0.22px]" },
  { src: "/frame-5.svg", alt: "Frame" },
  { src: "/frame-1.svg", alt: "Frame" },
  { src: "/frame.svg", alt: "Frame" },
];

export const CustomerBenefitsSection = (): JSX.Element => {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="w-full h-[60px] bg-[url(/bg.svg)] bg-[100%_100%]">
        <div className="flex justify-center items-center h-full">
          <h2 className="font-['DM_Sans',Helvetica] font-bold text-black text-4xl leading-9">
            THÔNG TIN LIÊN HỆ
          </h2>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full bg-[url(/bg-1.svg)] bg-[100%_100%] py-7 px-14">
        <div className="flex justify-between">
          {/* Store links column */}
          <div className="flex flex-col">
            <h3 className="font-inter-bold font-[number:var(--inter-bold-font-weight)] text-[#060606] text-[length:var(--inter-bold-font-size)] tracking-[var(--inter-bold-letter-spacing)] leading-[var(--inter-bold-line-height)] mb-6">
              Cửa hàng
            </h3>
            <div className="flex flex-col space-y-1">
              {storeLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter-regular font-[number:var(--inter-regular-font-weight)] text-[#090909] text-[length:var(--inter-regular-font-size)] tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)] [font-style:var(--inter-regular-font-style)]"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* About us column */}
          <div className="flex flex-col">
            <h3 className="font-inter-bold font-[number:var(--inter-bold-font-weight)] text-[#060606] text-[length:var(--inter-bold-font-size)] tracking-[var(--inter-bold-letter-spacing)] leading-[var(--inter-bold-line-height)] mb-6">
              Về chúng tôi
            </h3>
            <div className="flex flex-col space-y-1">
              {aboutLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter-regular font-[number:var(--inter-regular-font-weight)] text-[#090909] text-[length:var(--inter-regular-font-size)] tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)] [font-style:var(--inter-regular-font-style)]"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Support column */}
          <div className="flex flex-col">
            <h3 className="font-inter-bold font-[number:var(--inter-bold-font-weight)] text-[#060606] text-[length:var(--inter-bold-font-size)] tracking-[var(--inter-bold-letter-spacing)] leading-[var(--inter-bold-line-height)] mb-6">
              Hỗ trợ
            </h3>
            <div className="flex flex-col space-y-1">
              {supportLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter-regular font-[number:var(--inter-regular-font-weight)] text-[#090909] text-[length:var(--inter-regular-font-size)] tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)] [font-style:var(--inter-regular-font-style)]"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Email subscription */}
          <div className="w-[399px]">
            <h3 className="font-['Outfit',Helvetica] font-bold text-gray-1 text-[22px] tracking-[-1.00px] leading-8">
              EMAIL
            </h3>
            <p className="[-webkit-text-stroke:1px_#000000] font-['DM_Sans',Helvetica] font-normal text-gray-1 text-base leading-[26px] mt-2">
              Đăng nhâp email để được nhận mã giảm giá{" "}
              <span className="font-[number:var(--paragraph-paragraph-2-font-weight)] leading-[var(--paragraph-paragraph-2-line-height)] font-paragraph-paragraph-2 [font-style:var(--paragraph-paragraph-2-font-style)] tracking-[var(--paragraph-paragraph-2-letter-spacing)] text-[length:var(--paragraph-paragraph-2-font-size)]">
                30%
              </span>
            </p>
            <div className="flex mt-4 shadow-[0px_4px_4px_#00000040]">
              <Input
                className="h-[31px] rounded-[5px] placeholder:opacity-70 placeholder:[-webkit-text-stroke:1px_#000000] placeholder:text-gray-1"
                placeholder="Email"
              />
              <Button className="h-[31px] ml-[18px] bg-[#08acf2] rounded-[5px] text-black font-['Poppins',Helvetica] font-normal text-sm tracking-[-0.30px]">
                GỬI
              </Button>
            </div>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex items-center justify-end gap-4 mt-16 mr-14">
          {socialIcons.map((icon, index) => (
            <a
              key={index}
              href="#"
              className="inline-flex flex-col items-start"
            >
              <img
                className={`h-6 ${icon.className || "w-6"}`}
                alt={icon.alt}
                src={icon.src}
              />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-16">
          <Separator className="w-[1450px] border-black" />
          <div className="absolute mt-8 font-inter-regular font-[number:var(--inter-regular-font-weight)] text-[#090909] text-[length:var(--inter-regular-font-size)] text-center tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)]">
            © 2025 MomBabyShop. Bảo lưu mọi quyền.
          </div>
        </div>
      </div>
    </section>
  );
};
