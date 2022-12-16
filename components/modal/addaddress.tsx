import ModalFrame from "@common/modalframe";
import { useForm } from "react-hook-form";
import CheckBtn from "@common/check-button";
import { useRef, useState } from "react";
import client from "@lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DaumPostcode from "react-daum-postcode";

interface addressAddProps {
  handleClose: () => void;
}

interface AddressForm {
  name: string;
  recipient: string;
  phone_number: string;
  road_name_address: string;
  detail_address: string;
  main: boolean;
  memo: string;
  zip_code: string;
  address: string;
}

function AddressAdd({ handleClose }: addressAddProps) {
  const { register, handleSubmit, watch, setValue } = useForm<AddressForm>({});

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: AddressForm) => {
      return client.post(`accounts/addresses`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["address"]);
      },
    }
  );

  const onValid = (data: AddressForm) => {
    mutation.mutate(data);
    handleClose();
  };

  const [daum, setDaum] = useState(false);
  const daumEl = useRef<HTMLDivElement>(null);
  const handleDaum = (e: any) => {
    if (!daumEl.current?.contains(e.target)) {
      setDaum(false);
    }
  };

  const completeHandler = (data: any) => {
    setValue("road_name_address", data.roadAddress);
    setValue("zip_code", data.zonecode);
    setValue("address", data.jibunAddress || data.roadAddress);

    setDaum(false);
  };

  const addressEl = useRef<HTMLDivElement>(null);
  const handleAddressModal = (e: any) => {
    if (!addressEl.current?.contains(e.target)) {
      handleClose();
    }
  };
  return (
    <>
      {!daum && (
        <ModalFrame
          close={handleClose}
          blur={handleAddressModal}
          pageRef={addressEl}
          width={600}
          height={500}
          title={"배송지 정보"}
          bgColor={"black"}
          components={
            <form className="mt-10 flex flex-col">
              <div className="flex justify-around my-2">
                <div className="title w-[60px] text-subContent text-sm">
                  <h2>주소명</h2>
                </div>
                <div className="InputBar">
                  <input
                    defaultValue={"주소명"}
                    {...register("name")}
                    className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                    placeholder="주소명"
                  />
                </div>
              </div>
              <div className="flex justify-around my-2">
                <div className="title w-[60px] text-subContent text-sm">
                  <h2>받는 분</h2>
                </div>
                <div className="InputBar">
                  <input
                    defaultValue={"받는 분"}
                    {...register("recipient")}
                    className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                    placeholder="받는 분"
                  />
                </div>
              </div>
              <div className="flex justify-around my-2">
                <div className="title w-[60px] text-subContent text-sm">
                  <h2>연락처</h2>
                </div>
                <div className="InputBar">
                  <input
                    defaultValue={"연락처"}
                    {...register("phone_number")}
                    className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                    placeholder="연락처"
                  />
                </div>
              </div>
              <div className="flex justify-around my-2">
                <div className="title w-[60px] text-subContent text-sm">
                  <h2>주소</h2>
                </div>
                <div className="InputBar">
                  <input
                    onClick={() => {
                      setDaum(true);
                      setValue("road_name_address", "");
                    }}
                    defaultValue={"주소"}
                    {...register("road_name_address")}
                    className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                    placeholder="주소"
                  />
                </div>
              </div>
              <div className="flex justify-around my-2">
                <div className="title w-[60px] text-subContent text-sm">
                  <h2>상세주소</h2>
                </div>
                <div className="InputBar">
                  <input
                    defaultValue={"상세주소"}
                    {...register("detail_address")}
                    className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                    placeholder="상세주소"
                  />
                </div>
              </div>
              <div className="flex flex-row">
                <CheckBtn color={"gray"} width={20} height={20} />
                <span className="text-xs ml-2">대표 배송지로 선택</span>
              </div>

              <div className="SaveButton flex justify-center mt-5 cursor-pointer">
                <button
                  className="text-white w-[318px] h-[45px] text-sm font-bold rounded-xl bg-main"
                  onClick={handleSubmit(onValid)}
                >
                  저장하기
                </button>
              </div>
            </form>
          }
        />
      )}
      {daum && (
        <div
          className="absolute top-0 left-0 z-50 w-full h-[140vh] bg-black bg-opacity-40"
          onClick={handleDaum}
        >
          <div className="flex justify-center items-center">
            <div className="w-[600px] mt-[248px]" ref={daumEl}>
              <DaumPostcode onComplete={completeHandler} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressAdd;
