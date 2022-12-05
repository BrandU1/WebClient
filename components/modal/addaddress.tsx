import { Box, Modal } from "@mui/material";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";

interface AddressForm {
  name: string;
  recipient: string;
  road_name_address: string;
  zip_code: number;
  detail_address: string;
  phone_number: string;
  is_main: boolean;
  address: string;
}

interface AddProps {
  onClose: () => void;
}

function AddAddress({ onClose }: AddProps) {
  const [searchOpen, setSearch] = useState(false);
  const OpenSearch = () => setSearch(true);
  const CloseSearch = () => setSearch(false);

  const { register, handleSubmit, setValue } = useForm<AddressForm>({
    defaultValues: {
      name: "",
      recipient: "",
      phone_number: "",
      road_name_address: "",
      detail_address: "",
      zip_code: 0,
      is_main: false,
      address: "",
    },
  });

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
    CloseSearch();
    mutation.mutate(data);
    onClose();
  };

  const [onChecked, setOnChecked] = useState(false);

  const completeHandler = (data: any) => {
    setValue("road_name_address", data.roadAddress);
    setValue("zip_code", data.zonecode);
    setValue("address", data.jibunAddress);
  };

  return (
    <div className="select-none    ">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col justify-between"
      >
        <div className="content mt-11 flex flex-col items-center">
          <div className="AddressName flex text-[14px] mb-[10px]">
            <p className="text-[#767676] w-[120px]">주소명</p>
            <input
              {...register("name")}
              type="text"
              placeholder="주소명을 입력해주세요"
              className="focus:outline-none border w-[270px] py-[5px] pl-[10px] rounded-xl"
            />
          </div>
          <div className="sender flex text-[14px] mb-[10px] ">
            <p className="text-[#767676] w-[120px]">받는분</p>
            <input
              {...register("recipient")}
              type="text"
              placeholder="받는 분 성함을 입력해주세요"
              className="focus:outline-none border w-[270px] py-[5px] pl-[10px] rounded-xl"
            />
          </div>
          <div className="PhoneNumber flex text-[14px] mb-[10px] ">
            <p className="text-[#767676] w-[120px]">연락처</p>
            <input
              type="text"
              {...register("phone_number")}
              placeholder="연락처를 입력해주세요"
              className="focus:outline-none border w-[270px] py-[5px] pl-[10px] rounded-xl"
            />
          </div>
          <div className="address flex text-[14px] mb-[10px] ">
            <p className="text-[#767676] text-[14px] w-[120px] ">주소</p>
            <input
              type="text"
              placeholder="도로명주소를 검색해주세요"
              {...register("road_name_address")}
              className="focus:outline-none border w-[270px] py-[5px] pl-[10px] rounded-xl"
              onClick={OpenSearch}
            />
          </div>
          <div className="address flex text-[14px] mb-[10px] ">
            <p className="text-[#767676] text-[14px] w-[120px] ">상세주소</p>
            <input
              type="text"
              {...register("detail_address")}
              placeholder="상세주소를 입력해주세요"
              className="focus:outline-none border w-[270px] py-[5px] pl-[10px] rounded-xl"
            />
          </div>
          <div className="address flex text-[14px] mb-[10px]  ">
            <p className="text-[#767676] text-[14px] w-[120px] ">지번주소</p>
            <input
              type="text"
              {...register("address")}
              placeholder="지번 주소"
              className="focus:outline-none border w-[270px] py-[5px] pl-[10px] rounded-xl"
            />
          </div>
        </div>
        <div className=" flex justify-center cursor-pointer ">
          <input
            onClick={CloseSearch}
            className="w-[318px] h-[45px] text-[#fff] rounded-xl font-bold border-[#fff] bg-[#0CABA8]"
            type="submit"
            autoComplete="off"
            value="저장"
          />
        </div>
      </form>

      <div className={`${searchOpen ? "block" : "hidden"} absolute top-1 p-14`}>
        <DaumPostcode onComplete={completeHandler} />
      </div>
    </div>
  );
}

export default AddAddress;
