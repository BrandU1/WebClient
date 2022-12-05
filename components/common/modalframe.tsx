import Image from "next/image";
import * as React from "react";

interface ModalProps {
  close: () => void;
  width: number;
  height: number;
  title: string; //Modal 타이틀
  components: any; //Modal 내용
}

function ModalFrame({ close, width, height, title, components }: ModalProps) {
  return (
    <div className="absolute flex justify-center py-36 top-0 z-50 w-full h-full bg-black bg-opacity-40 ">
      <div onBlur={close} className="openModal modal">
        <div
          className={`w-[${width}px] h-[${height}px] bg-modalBackground rounded-2xl p-8`}
        >
          <div className="flex flex-col">
            <div>
              <Image
                onClick={close}
                src={"/logo/backBtn.svg"}
                alt={"backBtn"}
                width={16}
                height={16}
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              <span className="font-bold text-xl flex justify-center items-center">
                {title}
              </span>
              {components}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFrame;
