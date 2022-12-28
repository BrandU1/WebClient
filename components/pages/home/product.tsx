import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HotDeal } from "../../../types/privacy";
import PickButton from "@components/pick/pickbutton";
import ImgAtom from "@atoms/imgatom";

interface ProductProps {
  title: string;
  subTitle: string;
  products: HotDeal[];
}

function Product({ title, subTitle, products }: ProductProps) {
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });
  // console.log(products);

  return (
    <div className=" m-auto px-5">
      <div className="flex justify-between text-xs">
        <p className="subTitle text-base">{subTitle}</p>
        <Link href="/store">
          <p className="allBtn text-xs text-gray cursor-pointer">전체보기</p>
        </Link>
      </div>
      <h2 className="title text-xl font-bold">{title}</h2>
      <div className="list grid grid-cols-5 gap-x-4">
        {products?.map((item, index) => {
          return (
            <div key={index} className="py-3 relative">
              <Link
                href={{
                  pathname: `/product/${item.id}`,
                  query: {
                    index: item?.id,
                  },
                }}
                as={`/product/${item.id}`}
              >
                <div className="h-60 relative">
                  <ImgAtom
                    exist={item.backdrop_image}
                    src={item.backdrop_image}
                    width={156}
                    height={200}
                    alt={"list"}
                  />
                </div>
                <div className="mt-4">
                  <p className="text-notice text-sm">{item.name}</p>
                  <p className="font-bold">{item.price.toLocaleString()} 원</p>
                </div>
              </Link>

              <div
                className={`${
                  token ? "block" : "hidden"
                } absolute bottom-[80px] right-[10px] w-8 h-8`}
              >
                <PickButton
                  id={item.id}
                  wish={item.is_wish}
                  li_width={20}
                  li_height={17}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
