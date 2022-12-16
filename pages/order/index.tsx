import OrderList from "@components/pages/order/orderlist";
import PriceBar from "@components/pages/order/pricebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { basketPurchase, totalPrice } from "../../recoil/totalamount";
import { useEffect, useState } from "react";
import useBranduQuery from "@hooks/useBranduQuery";
import { getAddresses } from "@lib/fetches";

export interface PriceBarPrint {
  id: number;
  title: string;
  price: number;
  isBold?: boolean;
}

function OrderPage() {
  const price = useRecoilValue(totalPrice);
  const [priceBarPrint, setPriceBarPrint] = useState<PriceBarPrint[]>([]);
  const [baskets, _] = useRecoilState(basketPurchase);
  const [disabled, setDisabled] = useState<boolean>(true);

  const {
    data: addresses,
    isLoading,
    isError,
  } = useBranduQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(),
  });
  const onClick = () => {
    alert("결제하기");
  };

  useEffect(() => {
    setPriceBarPrint([
      {
        id: 1,
        title: "주문 금액",
        price: price.orderPrice,
      },
      {
        id: 2,
        title: "배송비",
        price: 3000,
      },
      {
        id: 3,
        title: "합계 금액",
        price: price.totalPrice,
        isBold: true,
      },
    ]);
  }, [price]);

  return (
    <div className="max-w-4xl m-auto flex flex-row space-x-10">
      <div className="flex flex-col w-[70%]">
        <p className="font-bold text-xl my-5">주문 및 결제</p>
        <OrderList
          baskets={baskets}
          addresses={addresses?.results}
          setDisabled={setDisabled}
        />
      </div>
      <div className="price w-[30%]">
        <PriceBar
          printList={priceBarPrint}
          disabled={disabled}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default OrderPage;
