import { useRouter } from "next/router";
import { PriceBarPrint } from "../../../pages/order";
import { ReactNode } from "react";
import Link from "next/link";

interface PriceBarProps {
  printList: PriceBarPrint[];
  disabled: boolean | null;
}

function PriceBar({ printList, disabled }: PriceBarProps) {
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
      {router.route == "/order/pay" ? (
        <input
          type="submit"
          className={`w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2 disabled:opacity-50 ${
            disabled && "hidden"
          }`}
          value="결제하기"
        />
      ) : (
        <button
          className={`w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2 disabled:opacity-50 ${
            disabled && "hidden"
          }`}
        >
          <Link
            href={
              router.route == "/basket"
                ? "/order"
                : router.route == "/order"
                ? "/order/pay"
                : ""
            }
          >
            결제하기
          </Link>
        </button>
      )}
    </div>
  );
}

export default PriceBar;
