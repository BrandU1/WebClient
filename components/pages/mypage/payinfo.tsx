import { useState } from "react";
import Image from "next/image";
import Input from "@common/input";
import SearchIcon from "@icons/search";
import Link from "next/link";
import OrderCancel from "@components/modal/ordercancel";
import Refund from "@components/modal/refund";
import client from "@lib/api";
import UseBranduQuery from "@hooks/useBranduQuery";
import useBranduQuery from "@hooks/useBranduQuery";
import { OrderResponse } from "../../../types/privacy";
import { useRouter } from "next/router";

const getOrder = async () => {
  const response = await client.get(`/orders/order`);
  return response.data;
};

interface payProps {
  order: string;
}

function PayInfo({ order }: payProps) {
  const router = useRouter();
  const [focused, setFocused] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  //주문취소 모달
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const cancelClose = () => {
    setCancelModal(false);
  };
  //교환/환불 모달
  const [refundModal, setRefundModal] = useState<boolean>(false);
  const refundClose = () => {
    setRefundModal(false);
  };

  const { data, isLoading, isError } = useBranduQuery<OrderResponse[]>({
    queryKey: ["order"],
    queryFn: () => getOrder(),
  });

  return (
    <div className="pl-5 flex flex-col flex-1">
      <div className="title flex flex-row justify-between items-center border-b pb-5">
        <span className="font-bold text-lg">주문/배송조회</span>
        <div
          className={`border-x border-t rounded-t-xl border-main w-20 ${
            !focused && "border-b rounded-b-xl"
          }`}
        >
          <div
            className="flex flex-row justify-center items-center cursor-pointer h-9"
            onClick={() => {
              setFocused(!focused);
            }}
          >
            <span className="text-sm text-main">1개월</span>
            <div className="w-6 h-6 flex justify-center items-center">
              <Image
                src={"/logo/open.svg"}
                alt={"open"}
                width={12}
                height={6}
              />
            </div>
          </div>
          {focused && (
            <div className="flex flex-col absolute border-x border-main border-b text-sm justify-center rounded-b-xl w-20 bg-white">
              <div className="h-9 pl-2 hover:bg-[#CEEEEE] hover:text-main pl-2 flex items-center">
                1개월
              </div>
              <div className="h-9 pl-2 hover:bg-[#CEEEEE] hover:text-main pl-2 flex items-center">
                3개월
              </div>
              <div className="h-9 pl-2 hover:bg-[#CEEEEE] hover:text-main pl-2 rounded-b-xl flex items-center">
                1년
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="searchbar mt-5 mr-[10px] ml-[10px] flex justify-between border border-main rounded-xl h-10">
        <Input
          type={"text"}
          color={"main"}
          height={654}
          width={40}
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
        <div className="m-3">
          <SearchIcon />
        </div>
      </div>
      <div className={`product flex flex-col mt-5 ml-[10px]`}>
        {data?.results.map((list, idx) => {
          return (
            <div
              className={`flex flex-row justify-between border-b border-gray pb-4 mt-5 ${
                list.order_status === order || order === "전체"
                  ? "block"
                  : "hidden"
              }`}
            >
              <div className="flex flex-row">
                <div className="flex items-center flex-col">
                  <span>{list.created.slice(0, 10)} 주문</span>
                  <div className="w-24 h-24 bg-gray rounded-xl" />
                </div>
                <div className="flex flex-col ml-7">
                  <span className="text-sm font-bold mb-3">
                    {list.order_status}
                  </span>
                  <span className="text-sm mb-1">
                    {list.products[0].product.product.name}
                  </span>
                  <span className="font-bold text-sm mb-5">
                    {list.products[0].product.product.price.toLocaleString()}원
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 mr-3">
                <div
                  onClick={() => {
                    router.push({
                      pathname: "/mypage/paydetail",
                      // @ts-ignore
                      query: list,
                    });
                  }}
                >
                  <button className="w-24 h-9 bg-main text-white text-sm rounded-xl flex justify-center items-center">
                    상세조회
                  </button>
                </div>
                <div
                  className={`${
                    list.order_status == "결제 완료" ? "hidden" : "block"
                  }`}
                >
                  {/*<button className="w-24 h-9 bg-white text-main text-sm border border-main rounded-xl flex justify-center items-center">*/}
                  {/*  배송조회*/}
                  {/*</button>*/}
                  <button
                    className="w-24 h-9 bg-white text-main text-sm border border-main rounded-xl flex justify-center items-center"
                    onClick={() => setCancelModal(true)}
                  >
                    주문취소
                  </button>
                  <button
                    className="w-24 h-9 bg-white text-main text-sm border border-main rounded-xl flex justify-center items-center"
                    onClick={() => setRefundModal(true)}
                  >
                    교환/환불
                  </button>
                </div>
              </div>
              {cancelModal && <OrderCancel onClose={cancelClose} />}
              {refundModal && <Refund onClose={refundClose} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PayInfo;
