import Image from "next/image";
import { useEffect, useState } from "react";

interface AmountButtonProps {
  price: number;
  handleCount: Function;
  id: number;
}

function AmountButton({ price, handleCount, id }: AmountButtonProps) {
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    handleCount(amount, id);
  }, [amount]);

  return (
    <div className="flex items-center space-x-48 justify-between w-full">
      <div className="mt-[10px] border border-main w-fit h-fit rounded-xl flex items-center py-[5px]">
        <button
          className="minusBtn text-main px-3 py-2 cursor-focus"
          onClick={() => {
            if (amount > 1) {
              setAmount((prev) => prev - 1);
            }
          }}
        >
          <Image src={"/logo/minus.svg"} alt={"minus"} width={16} height={16} />
        </button>
        <span>{String(amount).padStart(2, "0")}</span>
        <button
          className="plusBtn text-main mx-3"
          onClick={() => {
            setAmount((prev) => prev + 1);
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.666016 6H11.3327"
              stroke="#0CABA8"
              strokeLinecap="round"
            />
            <path
              d="M6 0.666016L6 11.3327"
              stroke="#0CABA8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <p className="mt-4">{(price * amount).toLocaleString()} 원</p>
    </div>
  );
}

export default AmountButton;
