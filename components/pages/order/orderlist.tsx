import { useEffect, useState } from "react";
import { AddressInterface, UserInterface } from "../../../types/privacy";
import Accordion from "@common/accordion";
import client from "@lib/api";
import useBranduQuery from "@hooks/useBranduQuery";
import ModifyAddress from "@components/modal/modifyaddress";
import { Basket } from "../../../pages/basket";
import ModalFrame from "@common/modalframe";
import CheckBtn from "@common/check-button";
import { useRouter } from "next/router";

interface OrderListProps {
  baskets: Basket[];
  addresses: AddressInterface[];
  setAddress: any;
  profileData: UserInterface;
}

function OrderList({
  baskets,
  addresses,
  setAddress,
  profileData,
}: OrderListProps) {
  const [selectedNumber, setSelectedNumber] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (addresses && selectedNumber >= 0) {
      setAddress(addresses[selectedNumber]);
    }
  }, [selectedNumber, addresses]);

  // 배송지 수정 모달
  const [addressModify, setAddressModify] = useState<boolean>(false);
  const handleModifyClose = () => {
    setAddressModify(false);
  };

  return (
    <div className="w-[554px]">
      <div className="list border-y border-t-black border-b-gray py-5 px-3">
        <Accordion title="주문 내역">
          {baskets?.map((basket, index) => {
            return (
              <div className="flex flex-row justify-between px-2 mt-[10px]">
                <p className="text-sm text-subContent">
                  {basket.custom_product.product.name}
                </p>
                <p className="text-sm">{basket.amount}개</p>
              </div>
            );
          })}
        </Accordion>
      </div>
      <div className="orderer border-y border-gray py-5">
        <div className="flex justify-between px-5 items-center">
          <p className="font-base">주문자</p>
          <button
            className="border border-main rounded-xl text-main text-sm w-[90px] h-[36px] flex justify-center items-center"
            onClick={() => {
              router.push("/mypage/profile");
            }}
          >
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
            <p>{profileData?.name}</p>
            <p>{profileData?.phone_number}</p>
            <p>{profileData?.email}</p>
          </div>
        </div>
      </div>
      <div className="address border-y border-gray py-5">
        <div className="flex flex-row px-5 justify-between items-center">
          <div className="flex flex-row">
            <p className="text-base">배송지</p>
            <div className="flex flex-row space-x-[10px] ml-[25px]">
              {/*메인 주소*/}
              {addresses?.map((mainAddress, index) => {
                return (
                  <>
                    {mainAddress.is_main && (
                      <button
                        key={index}
                        className={`border border-main w-[42px] h-[22px] flex justify-center items-center rounded-xl text-xs font-bold ${
                          selectedNumber === index
                            ? "bg-main text-white"
                            : "text-main"
                        }`}
                        onClick={() => setSelectedNumber(index)}
                      >
                        {mainAddress.name}
                      </button>
                    )}
                  </>
                );
              })}

              {/*메인 외 주소*/}
              {addresses?.map((address, index) => {
                return (
                  <>
                    {!address.is_main && (
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
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <button
            className="border border-main rounded-xl text-main text-sm w-[90px] h-[36px] flex justify-center items-center"
            onClick={() => {
              setAddressModify(true);
            }}
          >
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
            {addresses && (
              <>
                <span>{addresses[selectedNumber]?.recipient}</span>
                <span>{addresses[selectedNumber]?.phone_number}</span>
                <span>{`[${addresses[selectedNumber]?.zip_code}] ${addresses[selectedNumber]?.road_name_address}`}</span>
                <span>{addresses[selectedNumber]?.detail_address}</span>
              </>
            )}
          </div>
        </div>
      </div>
      {addressModify && (
        <ModifyAddress
          infoAddress={addresses[selectedNumber]!}
          handleClose={handleModifyClose}
        />
      )}
    </div>
  );
}

export default OrderList;
