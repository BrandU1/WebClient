import ModalFrame from "@common/modalframe";
import { useForm } from "react-hook-form";
import CheckBtn from "@icons/checkBtn";
import { useRef, useState } from "react";
import client from "@lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DaumPostcode from "react-daum-postcode";

interface closeProps {
  handleClose: () => void;
}

interface addInquiryProps {
  title: string;
  description: string;
  images: any[];
}

function AddInquiryForm({ handleClose }: closeProps) {
  const { register, handleSubmit } = useForm<addInquiryProps>();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: addInquiryProps) => {
      return client.post(`services/inquiries`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inquiry"]);
      },
    }
  );

  const onValid = (data: addInquiryProps) => {
    mutation.mutate(data);
    handleClose();
  };

  const inquiryEl = useRef<HTMLDivElement>(null);
  const handleInquiryModal = (e: any) => {
    if (!inquiryEl.current?.contains(e.target)) {
      handleClose();
    }
  };
  return (
    <>
      <ModalFrame
        close={handleClose}
        blur={handleInquiryModal}
        pageRef={inquiryEl}
        width={600}
        height={500}
        title={"1:1 문의하기"}
        bgColor={"black"}
        components={
          <form className="mt-10 flex flex-col">
            <div className="">
              <div className="title w-fit text-black text-sm my-2">
                <h2>문의 제목</h2>
              </div>
              <div className="InputBar">
                <input
                  {...register("title")}
                  className={`border-[1px] border-gray w-[318px] h-[30px] rounded-[10px] text-sm ml-[10px] p-2`}
                  placeholder="문의 제목"
                />
              </div>
            </div>
            <div className="">
              <div className="title w-fit text-black text-sm my-2">
                <h2>문의 내용</h2>
              </div>
              <div className="InputBar">
                <textarea
                  {...register("description")}
                  className={`border-[1px] border-gray w-[318px] h-[104px] rounded-[10px] text-sm ml-[10px] p-2`}
                  placeholder="문의 내용"
                />
              </div>
            </div>
            <div className="SaveButton flex justify-center mt-5 cursor-pointer">
              <button
                onClick={handleSubmit(onValid)}
                className="text-white w-[318px] h-[45px] text-sm font-bold rounded-xl bg-main"
              >
                저장하기
              </button>
            </div>
          </form>
        }
      />
    </>
  );
}

export default AddInquiryForm;
