import Image from "next/image";
import HeartIcon from "@icons/heart";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../types/product";
import Link from "next/link";
import client from "@lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HotDeal } from "../../../types/privacy";
import { AlertToast } from "@common/alerttoast";
import PickButton from "@components/pick/pickbutton";

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

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: number) =>
      client.post(`/accounts/wishes/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );

  const deletePick = useMutation(
    (id: number) =>
      client.delete(`/accounts/wishes/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );

  return (
    <div className=" m-auto px-5">
      <div className="flex justify-between text-xs">
        <p className="subTitle text-base">{subTitle}</p>
        <p className="allBtn text-xs text-gray cursor-pointer">전체보기</p>
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
                  <Image
                    className="rounded-2xl"
                    src={`${item.backdrop_image}`}
                    alt="list"
                    layout="fill"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-notice text-sm">{item.name}</p>
                  <p className="font-bold">{item.price.toLocaleString()} 원</p>
                </div>
              </Link>

              <div className={`${token ? "block" : "hidden"} `}>
                {/*<div*/}
                {/*  onClick={() => {*/}
                {/*    if (item.is_wish) {*/}
                {/*      deletePick.mutate(item.id);*/}
                {/*    } else {*/}
                {/*      mutation.mutate(item.id);*/}
                {/*      AlertToast({ text: "찜한 상품", path: "pick" });*/}
                {/*    }*/}
                {/*  }}*/}
                {/*  className={`${*/}
                {/*    item.is_wish ? "bg-main " : "bg-[#DFDFE0]"*/}
                {/*  } pickBtn absolute bottom-[80px] right-[10px] w-8 h-8 rounded-xl bg-[#DFDFE0] flex justify-center items-center`}*/}
                {/*>*/}
                {/*  <HeartIcon*/}
                {/*    color={`${item.is_wish ? "#ffffff" : "#DFDFE0"}`}*/}
                {/*    width={20}*/}
                {/*    height={17}*/}
                {/*    border="#fff"*/}
                {/*  />*/}
                {/*</div>*/}
                <PickButton id={item.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
