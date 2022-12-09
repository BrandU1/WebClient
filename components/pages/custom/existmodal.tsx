import { Scrollbars } from "react-custom-scrollbars";
import Image from "next/image";
import ModalFrame from "@common/modalframe";
import { useRef, useState } from "react";

interface existModalProps {
  handleClose: () => void;
}

function ExistModal({ handleClose }: existModalProps) {
  const secondEl = useRef<HTMLDivElement>(null);
  const handleSecondModal = (e: any) => {
    if (!secondEl.current?.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <ModalFrame
      close={handleClose}
      blur={handleSecondModal}
      pageRef={secondEl}
      width={600}
      height={500}
      title={"기존이미지 선택"}
      bgColor={"none"}
      components={
        <div className="mt-10">
          <div className="h-[258px] overflow-y-scroll scrollbar-hide w-[340px] justify-center items-center">
            <Scrollbars style={{ width: 340, height: 258 }} thumbSize={20}>
              <div className="grid grid-cols-3 gap-[14px] mr-[10px]">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((pics, idx) => {
                  return (
                    <div className="w-[100px] h-[100px] bg-gray rounded-xl" />
                  );
                })}
              </div>
            </Scrollbars>
          </div>
          <div className="w-[338px] m-auto flex flex-row justify-between mt-5">
            <button className="border border-main rounded-xl w-[100px] h-[45px] flex justify-center items-center text-main">
              <Image
                src={"/logo/removebg.svg"}
                alt={"remove background"}
                width={19}
                height={19}
              />
              <span className="font-bold text-sm ml-[7px]"></span>
            </button>
            <button className="border rounded-xl bg-main w-[218px] h-[45px] text-white font-bold tet-sm flex justify-center items-center">
              추가하기
            </button>
          </div>
        </div>
      }
    />
  );
}

export default ExistModal;
