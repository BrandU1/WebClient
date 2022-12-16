import { useRouter } from "next/router";
import { PriceBarPrint } from "../../../pages/order";

interface PriceBarProps {
  printList?: PriceBarPrint[];
  disabled?: boolean;
  onClick?: () => void;
}

function PriceBar({ printList, disabled, onClick }: PriceBarProps) {
  const router = useRouter();

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
      <button
        className="w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2 disabled:opacity-50"
        disabled={disabled}
        onClick={onClick}
      >
        결제하기
      </button>
    </div>
  );
}

export default PriceBar;
