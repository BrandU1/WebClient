import Image from "next/image";
import { useRef, useState } from "react";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "@common/loading";
import { BranduBaseResponse, Categories } from "../../types/privacy";
import ImgAtom from "@atoms/imgatom";

interface CategoryProps {
  // ref: React.ForwardedRef<HTMLDivElement>;
  onClose: () => void;
}

function Category({ onClose }: CategoryProps) {
  const [id, setIndex] = useState(0);

  const categoryEl = useRef<HTMLDivElement>(null);
  const handleCategory = (e: any) => {
    if (!categoryEl.current?.contains(e.target)) {
      onClose();
    }
  };

  const getCategories = () => {
    return client.get("products/categories").then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<Categories[]>>(
    ["category"],
    getCategories
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p>API 연동 중입니다. 새로고침 후에도 문제가 발생 시 문의바랍니다.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center" onClick={handleCategory}>
      <div className=" pt-5 pb-40  w-[700px] ">
        {data?.results.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`grid grid-cols-6 ${id === idx ? "block" : "hidden"}`}
            >
              {item.sub_categories.map((subItem, index) => {
                return (
                  <div key={index} className="text-center pt-4 ">
                    <div className="h-[100px] w-[100px] bg-white flex justify-center items-center rounded-lg">
                      <ImgAtom
                        exist={"/dummy/bag.png"}
                        src={"/dummy/bag.png"}
                        width={100}
                        height={100}
                        alt={"product"}
                      />
                    </div>
                    <p className="my-3 text-sm text-subContent">
                      {subItem.name}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="h-auto w-[110px] bg-white border-[1px] border-main text-center">
        {data?.results.map((item, index) => {
          return (
            <div
              key={index}
              className={`py-6 cursor-pointer ${
                id === index ? "bg-[#CEEEEE]" : "bg-white"
              }`}
            >
              <p
                onClick={() => {
                  setIndex(index);
                }}
                className="font-normal text-sm"
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
