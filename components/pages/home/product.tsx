import Image from "next/image";
import Pick from "@common/pick";
import HeartIcon from "@icons/heart";
import { useEffect, useState } from "react";

interface ProductProps {
  title: string;
  subTitle: string;
}

function Product({ title, subTitle }: ProductProps) {
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });

  return (
    <div className="max-w-4xl m-auto px-5">
      <div className="flex justify-between text-xs">
        <p className="subTitle text-base">{subTitle}</p>
        <p className="allBtn text-xs text-gray cursor-pointer">전체보기</p>
      </div>
      <h2 className="title text-xl font-bold">{title}</h2>
      <div className="list columns-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <div key={index} className="py-3 relative">
              <Image
                className="rounded-2xl"
                src="/dummy/minwoo.png"
                alt="list"
                width={156}
                height={200}
              />
              <div className="mt-4">
                <p className="text-notice text-sm">강민우 야광봉</p>
                <p className="font-bold">90,000 원</p>
              </div>

              <div
                className={`${
                  token ? "block" : "hidden"
                } pickBtn absolute bottom-[80px] right-[10px] w-8 h-8 rounded-xl bg-[#DFDFE0] flex justify-center items-center`}
              >
                <HeartIcon
                  color="#DFDFE0"
                  width={20}
                  height={17}
                  border="#fff"
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
