import { useRef, useState } from "react";
import AddressAdd from "@components/modal/addressadd";
import { AddressInterface } from "../../../types/privacy";
import AddAddress from "@components/modal/addaddress";
import client from "@lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddressList {
  address: AddressInterface[];
}

function AddressComp({ address }: AddressList) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

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

  const addressEl = useRef<HTMLDivElement>(null);
  const handleAddressModal = (e: any) => {
    if (!addressEl.current?.contains(e.target)) {
      handleAddressClose();
    }
  };
  const handleAddressClose = () => {
    setAddressModal(false);
  };

  return (
    <div className="flex flex-col px-5 mt-10 flex-1 relative">
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
      {address?.map((list, index) => {
        return (
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
                <div
                  className={`${
                    list.is_main ? "block" : "hidden "
                  } w-9 h-5 font-bold text-xs text-white bg-main rounded-xl flex justify-center items-center`}
                >
                  대표
                </div>
                <p>{list?.name}</p>
                <p>{list?.phone_number}</p>
                <p>
                  {list?.road_name_address} {list?.detail_address}
                </p>
              </div>
            </div>

            <div className="flex-row">
              <button
                onClick={() => {
                  setAddressModal(true);
                }}
                className="w-24 h-9 border border-main text-main rounded-xl text-sm mt-5"
              >
                수정하기
              </button>
              <button
                onClick={() => {
                  mutationDelete.mutate(list.id);
                }}
                className="w-24 h-9 border border-red text-red rounded-xl text-sm mt-5"
              >
                삭제하기
              </button>
            </div>
          </div>
        );
      })}
      {addressModal && (
        <div onClick={handleAddressModal}>
          <AddressAdd handleClose={handleAddressClose} />
        </div>
      )}
      {/*<div*/}
      {/*  className={` ${*/}
      {/*    open ? "block" : "hidden"*/}
      {/*  } bg-white bg-opacity-90 absolute w-full h-full flex justify-center `}*/}
      {/*>*/}
      {/*  <AddAddress onClose={onClose} />*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  className={` ${*/}
      {/*    open ? "block" : "hidden"*/}
      {/*  } bg-white bg-opacity-90 absolute w-full h-full flex justify-center `}*/}
      {/*>*/}
      {/*  <AddAddress onClose={onClose} />*/}
      {/*</div>*/}
    </div>
  );
}

export default AddressComp;
