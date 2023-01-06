import { useRef, useState } from "react";
import AddressAdd from "@components/modal/addaddress";
import { AddressInterface, BranduBaseResponse } from "../../../types/privacy";
import client from "@lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModifyAddress from "@components/modal/modifyaddress";

interface AddressList {
  address: AddressInterface[];
}
interface modifyAddress {
  id: number;
  name: string;
  recipient: string;
  road_name_address: string;
  zip_code: string;
  detail_address: string;
  phone_number: string;
  is_main: boolean;
  memo: string;
  address: string;
}

function AddressComp({ address }: AddressList) {
  const queryClient = useQueryClient();

  const mutationDelete = useMutation(
    (id: number) => client.delete(`accounts/addresses/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["address"]);
      },
    }
  );

  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [modifyModal, setModifyModal] = useState<boolean>(false);

  const handleAddressClose = () => {
    setAddressModal(false);
  };
  const handleModifyClose = () => {
    setModifyModal(false);
  };

  const [modifyNum, setModifyNum] = useState<number>(-1);

  return (
    <div className={` flex flex-col px-5 mt-10 flex-1 `}>
      <div className="border-b pb-5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">배송지 관리</span>
          <button
            className="w-24 h-9 flex justify-center items-center text-white bg-main rounded-xl"
            onClick={() => {
              setAddressModal(true);
            }}
          >
            추가하기
          </button>
        </div>
      </div>
      {/*main 주소*/}
      {address?.map((mainAddress, index) => {
        return (
          <div>
            {mainAddress.is_main && (
              <div
                className="border-b border-gray pb-5 mt-5 flex flex-row justify-between px-2 "
                key={index}
              >
                <div className="flex flex-row">
                  <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start mt-[10px]">
                    <h2 className="text-base text-black">
                      {mainAddress?.name}
                    </h2>
                    <p>받는 분</p>
                    <p>연락처</p>
                    <p>주소</p>
                  </div>
                  <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
                    <div
                      className={`block w-9 h-5 font-bold text-xs text-white bg-main rounded-xl flex justify-center items-center`}
                    >
                      대표
                    </div>
                    <p className="pt-1">{mainAddress?.recipient}</p>
                    <p>{mainAddress?.phone_number}</p>
                    <p>
                      {mainAddress?.road_name_address}{" "}
                      {mainAddress?.detail_address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      setModifyNum(index);
                      setModifyModal(true);
                    }}
                    className="w-24 h-9 border border-main text-main rounded-xl text-sm"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => {
                      mutationDelete.mutate(mainAddress.id);
                    }}
                    className="w-24 h-9 border border-red text-red rounded-xl text-sm mt-3"
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/*main 외 주소*/}
      {address?.map((list, index) => {
        return (
          <>
            {!list.is_main && (
              <div
                className="border-b border-gray pb-5 mt-5 flex flex-row justify-between px-2 "
                key={index}
              >
                <div className="flex flex-row">
                  <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start mt-[10px]">
                    <h2 className="text-base text-black">{list?.name}</h2>
                    <p>받는 분</p>
                    <p>연락처</p>
                    <p>주소</p>
                  </div>
                  <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
                    <p className="pt-8">{list?.recipient}</p>
                    <p>{list?.phone_number}</p>
                    <p>
                      {list?.road_name_address} {list?.detail_address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      setModifyNum(index);
                      setModifyModal(true);
                    }}
                    className="w-24 h-9 border border-main text-main rounded-xl text-sm"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => {
                      mutationDelete.mutate(list.id);
                    }}
                    className="w-24 h-9 border border-red text-red rounded-xl text-sm mt-3"
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </>
        );
      })}
      {addressModal && <AddressAdd handleClose={handleAddressClose} />}
      {modifyModal && (
        <ModifyAddress
          infoAddress={address[modifyNum]!}
          handleClose={handleModifyClose}
        />
      )}
    </div>
  );
}

export default AddressComp;
