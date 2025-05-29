import React from "react";

export const ProductShowcaseSection = (): JSX.Element => {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-1/2 max-w-[707px]">
        <h2 className="[font-family:'SVN-Androgyne-Regular',Helvetica] font-normal text-[#2b2b2b] text-5xl text-center md:text-left tracking-[-2.00px] leading-[78px] mb-8">
          Lựa chọn tốt nhất&nbsp;&nbsp;dành cho&nbsp;&nbsp;bé
        </h2>

        <p className="[font-family:'SVN-Aptima-Italic',Helvetica] font-normal text-[#1c1c1c] text-4xl text-justify tracking-[1.00px] leading-[50px]">
          Tại MomBabyShop, chúng tôi đã giúp các bậc cha mẹ phát triển gia đình
          trong một thời gian dài. Với xe đẩy và xe đẩy em bé đạt giải thưởng,
          giỏ đựng đồ, quần áo trẻ em và đồ nội thất phòng trẻ em, cũng như lời
          khuyên chuyên gia về mọi thứ từ ghế ô tô đến giường cũi, chúng tôi có
          tất cả những thứ thiết yếu bạn cần để tận hưởng cuộc sống với một đứa
          trẻ nhỏ.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          className="w-full max-w-[624px] h-auto object-cover rounded-lg"
          alt="Portrait family"
          src="/portrait-family-tenderness.png"
        />
      </div>
    </section>
  );
};
