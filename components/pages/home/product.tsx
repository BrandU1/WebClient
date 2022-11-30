import Image from "next/image";
import Pick from "@common/pick";
import HeartIcon from "@icons/heart";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../types/product";
import client from "@lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ProductProps {
  title: string;
  subTitle: string;
  products: ProductInterface[];
}

function Product({ title, subTitle, products }: ProductProps) {
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: number) =>
      client
        .post(`/accounts/wishes/${id}/create_with_pk`)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );
  const onValid = (id: number) => {
    mutation.mutate(id);
  };

  const deletePick = useMutation(
    (id: number) =>
      client
        .delete(`/accounts/wishes/${id}/delete_with_pk`)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );

  return (
    <div className="max-w-4xl m-auto px-5">
      <div className="flex justify-between text-xs">
        <p className="subTitle text-base">{subTitle}</p>
        <p className="allBtn text-xs text-gray cursor-pointer">전체보기</p>
      </div>
      <h2 className="title text-xl font-bold">{title}</h2>
      <div className="list columns-5">
        {products?.map((item, index) => {
          return (
            <div key={index} className="py-3 relative">
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

              <div className={`${token ? "block" : "hidden"} `}>
                <div
                  onClick={() => {
                    if (item.is_wish) {
                      onValid(item.id);
                    }
                    deletePick.mutate(item.id);
                  }}
                  className={`${
                    item.is_wish ? "bg-[#0CABA8]" : "bg-[#DFDFE0]"
                  } pickBtn absolute bottom-[80px] right-[10px] w-8 h-8 rounded-xl bg-[#DFDFE0] flex justify-center items-center`}
                >
                  <HeartIcon
                    color={`${item.is_wish ? "#fff" : "#DFDFE0"}`}
                    width={20}
                    height={17}
                    border="#fff"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
