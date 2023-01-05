import { useRouter } from "next/router";
import { PriceBarPrint } from "../../../pages/order";
import { ReactNode } from "react";
import Link from "next/link";

interface PriceBarProps {
  printList: PriceBarPrint[];
  children: ReactNode;
}

function PriceBar({ printList, children }: PriceBarProps) {
  const router = useRouter();
  console.log(router.route);

  return (
    <div className="border border-main rounded-xl flex flex-col w-64 h-80 sticky mt-10">
      <div className="flex flex-col space-y-2  text-sm px-5 py-3">
        {printList?.map((print, index) => {
          return (
            <div className={`flex flex-row justify-between`} key={print.id}>
              <span
                className={`text-subContent ${
                  print.isBold && "text-base text-black"
                }`}
              >
                {print.title}
              </span>
              <span className={`${print.isBold && "text-base font-bold"}`}>
                {print.price.toLocaleString()} 원
              </span>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}

export default PriceBar;
