import { useState } from "react";
import Image from "next/image";
import Pick from "@common/pick";
import Badge from "@atoms/badge";

function Summary() {
  const [num, setNum] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="flex flex-row max-w-4xl m-auto px-3 mt-5">
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
              <Image
                className="rounded-xl"
                src={"/dummy/mouse.png"}
                width={80}
                height={80}
                alt={"imagePreview"}
              />
            </div>
          );
        })}
      </div>

      <div className="mainImg ml-2 relative">
        <div className={`w-[400px] h-[400px] ${toggle ? "hidden" : "block"}`}>
          {/*<Image*/}
          {/*  className="rounded-xl"*/}
          {/*  src={"/dummy/mouse.png"}*/}
          {/*  width={400}*/}
          {/*  height={400}*/}
          {/*  alt={"mainImage"}*/}
          {/*/>*/}
          <div className="w-[400px] h-[400px] bg-gray rounded-xl" />
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
            <p className="w-max text-base">에코 친환경</p>
            <span className="text-[#767676] text-xs mt-1">
              #생활용품 #칫솔 #욕실 #천연
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
                {/*{data?.price.toLocaleString()}*/}
                6,000
              </p>
              <p className="text-sm ml-1">원</p>
            </div>
            <div className="flex flex-row text-main justify-end items-center">
              <p className="text-xs mr-[10px]">(시즌 특가)</p>
              <p className="text-lg font-bold">
                {/*{data?.price.toLocaleString()}*/}
                5,000
              </p>
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
              <svg
                width="12"
                height="2"
                viewBox="0 0 12 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666016 1H11.3327"
                  stroke="#0CABA8"
                  strokeLinecap="round"
                />
              </svg>
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
            <Pick li_height={24} li_width={24} bg_height={45} bg_width={45} />
            {/*<Bucket Pick={data?.is_basket} ProductNum={data?.id} />*/}
            <button
              className="w-64 h-11 bg-main rounded-xl flex flex-row justify-center items-center"
              onClick={() => {}}
            >
              <span className="text-white font-bold text-sm">구매하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
