import Image from "next/image";
import { router } from "next/client";
import Badge from "@atoms/badge";
import { useState } from "react";
import Pick from "@common/pick";

function Custom() {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="flex flex-col">
      <div className="customItemList flex flex-row justify-center border-b w-full mt-4 pb-4">
        <div className="DrawTool max-w-4xl flex flex-row space-x-[18px]">
          <Image
            src={"/custom/backBtn.svg"}
            alt={"backBtn"}
            width={16}
            height={16}
          />
          <Image
            src={"/custom/forwardBtn.svg"}
            alt={"forwardBtn"}
            width={16}
            height={16}
          />
          <Image
            src={"/custom/moveBtn.svg"}
            alt={"moveBtn"}
            width={20}
            height={20}
          />
          <Image
            src={"/custom/pencilBtn.svg"}
            alt={"pencilBtn"}
            width={19}
            height={19}
          />
          <Image
            src={"/custom/inkBtn.svg"}
            alt={"inkBtn"}
            width={19}
            height={19}
          />
          <Image
            src={"/custom/textBtn.svg"}
            alt={"textBtn"}
            width={16}
            height={16}
          />
          <Image
            src={"/custom/imageBtn.svg"}
            alt={"imageBtn"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/figureBtn.svg"}
            alt={"figureBtn"}
            width={18}
            height={18}
          />
        </div>
        <div className="sortTool flex flex-row ml-[56px] space-x-4">
          <Image
            src={"/custom/bottomLine.svg"}
            alt={"bottomLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/leftLine.svg"}
            alt={"leftLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/rightLine.svg"}
            alt={"rightLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/topLine.svg"}
            alt={"topLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/centerLine.svg"}
            alt={"centerLine"}
            width={16}
            height={18}
          />
          <Image
            src={"/custom/middleLine.svg"}
            alt={"middleLine"}
            width={18}
            height={16}
          />
          <Image
            src={"/custom/symmetryLR.svg"}
            alt={"symmetryLR"}
            width={20}
            height={18}
          />
          <Image
            src={"/custom/symmetryTB.svg"}
            alt={"symmetryTB"}
            width={18}
            height={20}
          />
          <Image
            src={"/custom/leftAlign.svg"}
            alt={"leftAlign"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/centerAlign.svg"}
            alt={"centerAlign"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/rightAlign.svg"}
            alt={"rightAlign"}
            width={18}
            height={18}
          />
        </div>
      </div>
      <div className="flex flex-row m-auto mt-3">
        <div className="image w-[510px] h-[400px] bg-bg-gray">
          <Image
            src={"/dummy/cat.png"}
            width={510}
            height={400}
            alt={"productImg"}
          />
        </div>
        <div className="rightSide flex flex-col mt-5 ml-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="productName text-base">고냠이</span>
              <span className="productHashtag text-[10px] text-subContent">
                #생활용품 #칫솔 #욕실 #천연
              </span>
            </div>
            <Badge color={"red"} />
          </div>

          <div className="price ">
            <div className="flex justify-end">
              <span className="font-bold text-lg">
                {/*{data?.price.toLocaleString()}*/}
                8,000
              </span>
              <span className="text=sm ml-1">원</span>
            </div>
            <div className="text-main flex justify-end items-center">
              <span className="text-xs mr-[9px]">(시즌 특가)</span>
              <span className="font-bold text-lg">
                {/*{data?.price.toLocaleString()}*/}
                7,000
              </span>
              <span className="text=sm ml-1">원</span>
            </div>
          </div>
          <div className="border border-t-0 w-[314px] my-[22px] border-gray" />
          <div className="color flex flex-col mb-[10px]">
            <span className="text-xs mb-[10px]">색상</span>
            {/*{data?.options?.color?.map((color, idx) => {*/}
            {/*  return (*/}
            {/*    <div*/}
            {/*      className={`flex mb-2.5 cursor-pointer bg-${color.hashcode} ${*/}
            {/*        color === idx*/}
            {/*          ? "border-2 rounded-xl border-Main-deepblue"*/}
            {/*          : " "*/}
            {/*      }`}*/}
            {/*      key={idx}*/}
            {/*      onClick={() => {*/}
            {/*        setColor(idx);*/}
            {/*      }}*/}
            {/*    ></div>*/}
            {/*  );*/}
            {/*})}*/}
          </div>
          <div className="size flex flex-col mb-[10px]">
            <span className="text-xs mb-[10px]">사이즈</span>
            <div className="space-x-[10px]">
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                XL
              </button>
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                L
              </button>
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                M
              </button>
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                S
              </button>
            </div>
          </div>
          <div className="amount flex flex-col mt-[10px]">
            <span className="text-xs">수량</span>
            <div className="mt-[10px] border border-main w-fit h-fit rounded-xl flex items-center py-[5px]">
              <button
                className="minusBtn text-main px-3 py-2 cursor-focus"
                onClick={() => {
                  {
                    if (amount > 1) {
                      setAmount((prev) => prev - 1);
                    }
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
                <Image
                  src={"/logo/plus.svg"}
                  alt={"plus"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-row mt-5 space-x-[10px] items-center">
            <Pick li_height={24} li_width={24} bg_height={45} bg_width={45} />
            {/*<Bucket Pick={data?.is_basket} ProductNum={data?.id} />*/}
            <button
              className="w-64 h-11 bg-main rounded-xl ml-[10px] flex flex-row justify-center items-center"
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

export default Custom;
