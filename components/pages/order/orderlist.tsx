import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BasketPurchase } from "../../../recoil/totalamount";
import { AddressInterface } from "../../../types/privacy";
import Accordion from "@common/accordion";

interface OrderListProps {
  baskets: BasketPurchase[];
  addresses: AddressInterface[];
  address: AddressInterface | null;
  setAddress: Dispatch<SetStateAction<AddressInterface | null>>;
}

function OrderList({
  baskets,
  addresses,
  address,
  setAddress,
}: OrderListProps) {
  const [selectedNumber, setSelectedNumber] = useState<number>(-1);

  useEffect(() => {
    if (selectedNumber > -1) {
      setAddress(addresses[selectedNumber]);
    }
  }, [selectedNumber]);

  return (
    <div className="w-[554px]">
      <div className="list border-y border-t-black border-b-gray py-5 px-3">
        <Accordion title="주문 내역">
          {baskets?.map((basket, index) => {
            return (
              <div className="flex flex-row justify-between px-2 mt-[10px]">
                <p className="text-sm text-subContent">{basket.product.name}</p>
                <p className="text-sm">{basket.count}개</p>
              </div>
            );
          })}
        </Accordion>
      </div>
      <div className="orderer border-y border-gray py-5">
        <div className="flex justify-between px-5 items-center">
          <p className="font-base">주문자</p>
          <button className="border border-main rounded-xl text-main text-sm w-[90px] h-[36px] flex justify-center items-center">
            수정하기
          </button>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start px-5 mt-[10px]">
            <p>보내는 분</p>
            <p>연락처</p>
            <p>이메일</p>
          </div>
          <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
            <p>민수</p>
            <p>010-2222-2222</p>
            <p>222@222.com</p>
          </div>
        </div>
      </div>
      <div className="address border-y border-gray py-5">
        <div className="flex flex-row px-5 justify-between items-center">
          <div className="flex flex-row">
            <p className="text-base">배송지</p>
            <div className="flex flex-row space-x-[10px] ml-[25px]">
              {addresses?.map((address, index) => {
                return (
                  <button
                    key={index}
                    className={`border border-main w-[42px] h-[22px] flex justify-center items-center rounded-xl text-xs font-bold ${
                      selectedNumber === index
                        ? "bg-main text-white"
                        : "text-main"
                    }`}
                    onClick={() => setSelectedNumber(index)}
                  >
                    {address.name}
                  </button>
                );
              })}
            </div>
          </div>
          <button className="border border-main rounded-xl text-main text-sm w-[90px] h-[36px] flex justify-center items-center">
            수정하기
          </button>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start px-5 mt-[10px]">
            <span>받는 분</span>
            <span>연락처</span>
            <span>주소</span>
          </div>
          <div className="flex flex-col space-y-[10px] text-sm justify-start mt-[10px]">
            {address && (
              <>
                <span>{address.recipient}</span>
                <span>{address.phone_number}</span>
                <span>{`[${address.zip_code}] ${address.road_name_address}`}</span>
                <span>{address.detail_address}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
