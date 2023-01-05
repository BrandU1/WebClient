import { HotDeal } from "../../../types/privacy";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PickButton from "@components/pick/pickbutton";

interface storeProps {
  store: HotDeal[];
}

function Store({ store }: storeProps) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token")!);
    }
  });

  return (
    <div className="py-3">
      <div className="font-bold border-[2px] border-main flex justify-center py-3">
        <h2>브랜뉴 오늘의 상품</h2>
      </div>

      <div className="list grid grid-cols-5 gap-x-4">
        {store?.map((item, index) => {
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
                  <Image
                    className="rounded-2xl"
                    src={item.backdrop_image}
                    alt="list"
                    layout="fill"
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
                } absolute bottom-[80px] right-[10px] w-8 h-8 `}
              >
                <PickButton
                  id={item.id}
                  wish={item.is_wish}
                  li_height={17}
                  li_width={20}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Store;
