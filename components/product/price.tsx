interface PriceProps {
  price: number;
  isPrime?: boolean;
}

function Price({ price, isPrime }: PriceProps) {
  return (
    <div
      className={`flex flex-row justify-end items-center ${
        isPrime && "text-main"
      }`}
    >
      {isPrime && <span className="mr-2 text-sm">(시즌특가)</span>}
      <span className="text-lg font-bold">{price.toLocaleString()}</span>
      <span className="text-sm ml-1">원</span>
    </div>
  );
}

export default Price;
