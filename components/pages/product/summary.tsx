import { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "@atoms/badge";
import Link from "next/link";
import Pick from "@common/pick";
import Basket from "@common/basket";
import client from "@lib/api";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ProductInfoInterface } from "../../../types/product";

interface ProductProps {
  productInfo: ProductInfoInterface;
}

function Summary({ productInfo }: ProductProps) {
  const [num, setNum] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    setProductId(document.location.href.substr(-1));
  });

  return (
    <div className="flex flex-row  m-auto px-3 mt-5">
      <div className="imageList flex flex-col max-h-96 overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6].map((image, idx) => {
          return (
            <div
              key={idx}
              className={`flex mb-2.5 cursor-pointer ${
                num === idx ? "border-2 rounded-xl border-main" : " "
              }`}
              onClick={() => {
                setNum(idx);
              }}
            >
              <div className="w-20 h-20 relative">
                <Image
                  className="rounded-xl"
                  src={`${productInfo?.backdrop_image} `}
                  layout="fill"
                  alt={"imagePreview"}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mainImg ml-2 relative">
        <div className={`w-[400px] h-[400px] ${toggle ? "hidden" : "block"}`}>
          <Image
            className="rounded-xl"
            src={productInfo?.backdrop_image || ""}
            alt="productInfo"
            layout="fill"
          />
        </div>
        <div
          onClick={() => {
            setToggle(!toggle);
          }}
          className="bg-main text-white w-[180px] p-1 text-center radius rounded-lg
            absolute top-5 z-10 left-3
            "
        >
          3D로 이미지 살펴보기
        </div>
        <div className={`w-[400px] h-[400px] ${toggle ? "block" : "hidden"} `}>
          {/*<ThreeJS />*/}
        </div>
      </div>

      <div className="info flex flex-col ml-5 w-fit h-fit">
        <div className="flex flex-row justify-between">
          <div className="name&tag flex flex-col">
            <p className="w-max text-base">{productInfo?.name}</p>
            <span className="text-[#767676] text-xs mt-1">
              #{productInfo?.category.name}
            </span>
          </div>
          {/*<Share link={link} />*/}
        </div>
        <div className="flex flex-row justify-between mt-[10px]">
          <div className="badge flex flex-row space-x-[10px]">
            <Badge color={"red"} />
            <Badge color={"yellow"} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-end items-center">
              <p className="text-lg font-bold">
                {productInfo?.price.toLocaleString()}
              </p>
              <p className="text-sm ml-1">원</p>
            </div>
            <div className="flex flex-row text-main justify-end items-center">
              <p className="text-xs mr-[10px]">(시즌 특가)</p>
              {productInfo?.price === 0 ? (
                <p className="text-lg font-bold">
                  {productInfo?.price.toLocaleString()}
                </p>
              ) : (
                <p className="text-lg font-bold">
                  {(productInfo?.price - 4000).toLocaleString()}
                </p>
              )}
              <p className="text-sm ml-1">원 </p>
            </div>
          </div>
        </div>
        <div className="border-b-2 my-5 border-gray" />
        <span className="text-xs">색상</span>
        <div className="flex flex-row mt-2">
          {/*{data?.options?.color?.map((color, idx) => {*/}
          {/*  return <Color key={idx} color={color} />;*/}
          {/*})}*/}
        </div>
        <div className="flex flex-col mt-5">
          <span className="text-xs">사이즈</span>
          <div className="flex flex-row space-x-[10px]">
            {[1, 2, 3, 4].map((size, id) => {
              return (
                <span className="mt-2 font-bold text-xs text-subContent border border-gray px-2 py-1 rounded-xl">
                  M
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
                setAmount(amount + 1);
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
            <Link
              href={{
                pathname: "./1/custom",
                query: { amount },
              }}
              as={"./1/custom"}
            >
              <button className="w-64 h-11 bg-main rounded-xl flex flex-row justify-center items-center">
                <span className="text-white font-bold text-sm">구매하기</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
