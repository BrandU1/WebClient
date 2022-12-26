import * as React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AlertProps {
  text: string;
  path: string;
  start: boolean;
}

function AlertToast({ text, path, start }: AlertProps) {
  const router = useRouter();
  const [isStop, setIsStop] = useState<boolean>(true);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount(count + 1);
  //   }, 1000);
  //   clearInterval(timer);
  // }, [text]);

  useEffect(() => {
    setIsStop(start);
    const timer = setInterval(() => {
      if (isStop) {
        clearInterval(timer);
      }
    }, 5000);
  }, [start]);

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
