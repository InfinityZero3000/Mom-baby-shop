import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CallToActionSection = (): JSX.Element => {
  const benefitItems = [
    {
      id: 1,
      title: "Cung cấp",
      description: "Giúp cho các mẹ và bé\ncó những trải nghiệm tốt nhất",
      icon: (
        <div className="relative w-[64.37px] h-[64.37px] overflow-hidden">
          <div className="absolute w-16 h-10 top-6 left-0">
            <div className="absolute w-[3px] h-[3px] top-6 left-[19px] bg-[url(/group.png)] bg-[100%_100%]" />
            <div className="absolute w-[58px] h-[25px] top-[15px] left-0 bg-[url(/group-1.png)] bg-[100%_100%]" />
            <div className="absolute w-[61px] h-10 top-0 left-1 bg-[url(/group-3.png)] bg-[100%_100%]" />
          </div>
          <div className="absolute w-[3px] h-[3px] top-4 left-[43px] bg-[url(/group-2.png)] bg-[100%_100%]" />
        </div>
      ),
    },
    {
      id: 2,
      title: "Hoàn trả",
      description:
        "Nếu sản phẩm có vấn đề gì có thể\nhoàn đổi lại trong 30 ngày sau khi mua",
      icon: (
        <div className="relative w-[64.07px] h-[64.07px] bg-[url(/vector.png)] bg-[100%_100%]">
          <img
            className="absolute w-[3px] h-[3px] top-[27px] left-[62px]"
            alt="Vector"
            src="/vector-1.png"
          />
          <img
            className="absolute w-[17px] h-[15px] top-10 left-2"
            alt="Vector"
            src="/vector-2.png"
          />
          <img
            className="absolute w-[3px] h-[3px] top-[57px] left-[5px]"
            alt="Vector"
            src="/vector-3.png"
          />
        </div>
      ),
    },
    {
      id: 3,
      title: "Chăm sóc khách hàng",
      description: "Chúng tôi luôn hỗ trợ và lắng nghe",
      icon: (
        <div className="relative w-[56.42px] h-[64.2px] bg-[url(/vector-4.png)] bg-[100%_100%]" />
      ),
    },
  ];

  return (
    <Card className="w-full bg-[#fbe2fc] rounded-[20px] py-8">
      <CardContent className="flex flex-row justify-center items-center gap-12 p-8">
        {benefitItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center gap-8 max-w-[345px]"
          >
            <div className="flex items-center justify-center p-[18.93px] rounded-[22.72px]">
              {item.icon}
            </div>

            <h3 className="font-['Playfair_Display',Helvetica] font-bold text-[#07484a] text-[34.1px] text-center">
              {item.title}
            </h3>

            <p className="font-['Open_Sans',Helvetica] font-normal text-[#07484a] text-[22.7px] text-center whitespace-pre-line">
              {item.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
