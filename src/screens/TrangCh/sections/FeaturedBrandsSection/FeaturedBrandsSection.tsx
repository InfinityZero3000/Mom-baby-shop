import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const FeaturedBrandsSection = (): JSX.Element => {
  // Data for featured brand cards
  const featuredCards = [
    {
      id: 1,
      backgroundImage:
        "/mood-ks103608-p25077-ks103607-p25077-5-250415014000.png",
      title: "Thời trang trẻ em",
      description:
        "Hãy mang đến cho bé những vẻ ngoài mới mẻ và thật cuốn hút.",
    },
    {
      id: 2,
      backgroundImage: "/pic4-1.png",
      title: "Mẫu xe đẩy mới nhất",
      description:
        "Những chiếc xe đẩy tiện lợi và thoải mái có thể giúp mẹ và bé có những trải nghiệm tốt hơn khi đi dạo.",
    },
    {
      id: 3,
      backgroundImage: "/pic6-1.png",
      title: "Đông êm đềm",
      description:
        "Mùa đông đến rồi, hãy sắm cho các bé những bộ quần áo ngoan xinh yêu này thôi.",
    },
  ];

  return (
    <section className="w-full py-5 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCards.map((card) => (
            <Card
              key={card.id}
              className="relative h-[450px] border-none rounded-none overflow-hidden"
              style={{
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-5">
                <div className="text-center text-white mt-32 mb-16 max-w-[413px]">
                  <h3 className="font-bold text-[32px] [font-family:'SVN-Aptima-Bold',Helvetica] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-2xl [font-family:'SVN-Aptima-Regular',Helvetica]">
                    {card.description}
                  </p>
                </div>

                <Button className="bg-white text-black hover:bg-white/90 rounded-[5px] px-12 py-[15px] w-[177px] h-auto [font-family:'SVN-Aptima-Regular',Helvetica] text-xl shadow-[0px_0px_14px_#0000001f]">
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
