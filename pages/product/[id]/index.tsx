import DetailMenu from "@components/pages/product/detailmenu";
import Detail from "@components/pages/product/detail";
import { useRouter } from "next/dist/client/router";
import client from "@lib/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import useBranduQuery from "@hooks/useBranduQuery";
import Image from "next/image";
import Badge from "@atoms/badge";
import Pick from "@common/pick";
import Basket from "@common/basket";
import Link from "next/link";
import { useState } from "react";

const getProduct = async (id: number) => {
  const response = await client.get(`products/${id}`);
  return response.data;
};

export interface Product {
  id: number;
  tags: {
    id: number;
    name: string;
  }[];
  images: {
    kind: string;
    image: string;
  }[];
  options: {
    id: number;
    color: {
      name: string;
      hashcode: string;
    };
    size: string;
    count: number;
  }[];
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  background_image: string;
  price: number;
  brand: {
    id: number;
    name: string;
    logo: string;
  };
}

interface ProductDetailProps {
  id: number;
}

function ProductDetail({ id }: ProductDetailProps) {
  const router = useRouter();

  const { data, isLoading } = useBranduQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const [shownImage, setShownImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);

  console.log(data);

  if (isLoading)
    return <div className="flex justify-center items-center">로딩중</div>;

  return (
    <div>
      <div className="flex flex-row  m-auto px-3 mt-5">
        <div className="imageList flex flex-col max-h-96 overflow-y-scroll">
          {data?.results.images
            .filter((image) => image.kind === "product")
            .map((image, index) => {
              return (
                <div
                  key={index}
                  className={`flex mb-2.5 cursor-pointer  rounded-xl ${
                    shownImage === index
                      ? " border-main border-2"
                      : "border-subContent border-[1px]"
                  }`}
                  onClick={() => setShownImage(index)}
                >
                  <div className="w-20 h-20 relative">
                    <Image
                      className="rounded-xl"
                      src={data?.results.images[index].image}
                      layout="fill"
                      alt={data?.results.images[index].image}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="ml-2 relative">
          <div className="w-96 h-96">
            <Image
              className="rounded-xl"
              src={data?.results.images[shownImage].image!}
              alt={data?.results.images[shownImage].image!}
              layout="fill"
            />
          </div>
        </div>
        <div className="info flex flex-col ml-5 w-fit h-fit">
          <div className="flex flex-row justify-between">
            <div className="name&tag flex flex-col">
              <p className="w-max text-base">{data?.results.name}</p>
              <div className="flex flex-row my-1 space-x-1">
                {data?.results.tags.map((tag, index) => {
                  return (
                    <span className="text-subContent text-xs cursor-pointer">
                      #{tag.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-[10px]">
            <div className="badge flex flex-row space-x-[10px]">
              <Badge color={"red"} />
              <Badge color={"yellow"} />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-end items-center">
                <p className="text-lg font-bold">
                  {data?.results.price.toLocaleString()}
                </p>
                <p className="text-sm ml-1">원</p>
              </div>
              <div className="flex flex-row text-main justify-end items-center">
                <p className="text-xs mr-[10px]">(시즌 특가)</p>
                {data?.results?.price === 0 ? (
                  <p className="text-lg font-bold">
                    {data?.results.price.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-lg font-bold">
                    {(data?.results.price! - 4000).toLocaleString()}
                  </p>
                )}
                <p className="text-sm ml-1">원 </p>
              </div>
            </div>
          </div>
          <div className="border-b-2 my-5 border-gray" />
          <span className="text-xs">색상</span>
          <div className="flex flex-row mt-2">
            {data?.results.options.map((option, index) => {
              return (
                <div
                  className={`w-6 h-6 rounded-md border-[1px] ${
                    selectedColor === index
                      ? "border-main"
                      : "border-subContent"
                  }`}
                  style={{ backgroundColor: `${option.color.hashcode}` }}
                ></div>
              );
            })}
          </div>
          <div className="flex flex-col mt-5">
            <span className="text-xs">사이즈</span>
            <div className="flex flex-row space-x-[10px]">
              {data?.results.options.map((option, index) => {
                return (
                  <span className="mt-2 font-bold text-xs text-subContent border border-gray px-2 py-1 rounded-xl">
                    {option.size}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="amount mt-[10px]">
            <span className="text-xs">수량</span>
            <div className="mt-[10px] border border-main w-fit h-fit rounded-xl flex items-center py-[5px]">
              <button
                className="minusBtn text-main px-3 py-2 cursor-focus"
                onClick={() => {
                  if (amount > 1) {
                    setAmount((prev) => prev - 1);
                  }
                }}
              >
                <Image
                  src={"/logo/minus.svg"}
                  alt={"minus"}
                  width={16}
                  height={16}
                />
              </button>
              <span>{String(amount).padStart(2, "0")}</span>
              <button
                className="plusBtn text-main mx-3"
                onClick={() => {
                  setAmount((prev) => prev + 1);
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.666016 6H11.3327"
                    stroke="#0CABA8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 0.666016L6 11.3327"
                    stroke="#0CABA8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex flex-row space-x-[10px]">
              <Pick
                li_height={24}
                li_width={24}
                bg_height={45}
                bg_width={45}
                li_color={"white"}
              />

              <Basket
                li_height={22}
                li_width={22}
                bg_height={45}
                bg_width={45}
                li_color={"white"}
              />
              <Link href={`${id}/custom`}>
                <button className="w-64 h-11 bg-main rounded-xl flex flex-row justify-center items-center">
                  <span className="text-white font-bold text-sm">구매하기</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DetailMenu />
      <Detail />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product", id], () =>
    getProduct(Number(id))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(id),
    },
  };
};

export default ProductDetail;
