import BasketIcon from "@icons/basket";

interface BasketProps {
  li_height: number;
  li_width: number;
  bg_height: number;
  bg_width: number;
  li_color: string;
}

function Basket({
  li_height,
  li_width,
  bg_height,
  bg_width,
  li_color,
}: BasketProps) {
  return (
    <div>
      <button
        className={`w-[${bg_width}px] h-[${bg_height}px] bg-gray rounded-xl flex justify-center items-center`}
      >
        <BasketIcon
          height={li_height}
          width={li_width}
          color="none"
          stroke={li_color}
        />
      </button>
    </div>
  );
}

export default Basket;
