import * as React from "react";
import { useRouter } from "next/router";

interface AlertProps {
  text: string;
  path: string;
}

function AlertToast({ text, path }: AlertProps) {
  const router = useRouter();

  return (
    <div className="h-[80px] bg-white rounded-xl absolute top-[62px] flex justify-center items-center shadow-md">
      <div className="flex flex-row">
        <span className="text-sm flex justify-center items-center pl-[30px]">
          {text}에 상품이 추가되었어요
        </span>
        <button
          className="text-sm py-[6px] px-[11px] bg-main text-white rounded-xl ml-[27px] mr-[26px]"
          onClick={() => {
            router.push(`/${path}`);
          }}
        >
          이동하기
        </button>
      </div>
    </div>
  );
}

export { AlertToast };
