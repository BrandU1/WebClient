import Image from "next/image";
import { useState } from "react";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";

interface Categories {
  id: number;
  name: string;
  sub_categories: SubCategories[];
}
interface SubCategories {
  id: number;
  name: string;
  backdrop_image: string;
}

function Category() {
  const [id, setIndex] = useState(1);

  const getCategories = () => {
    return client.get("/products/categories/").then((res) => res.data);
  };

  const { data, isLoading } = useQuery<Categories[]>(
    ["category"],
    getCategories
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center">
      <div className=" pt-5 pb-40  w-[700px] ">
        {data?.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`grid grid-cols-6 ${id === idx ? "block" : "hidden"}`}
            >
              {item.sub_categories.map((subItem, index) => {
                return (
                  <div key={index} className="text-center   pt-4 ">
                    <div className="h-[100px] w-[100px] bg-white flex justify-center items-center rounded-lg">
                      <Image
                        className="rounded-lg"
                        src={subItem.backdrop_image}
                        width={100}
                        height={100}
                        alt="product"
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
        {data?.map((item, index) => {
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
