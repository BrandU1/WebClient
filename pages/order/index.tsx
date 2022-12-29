import OrderList from "@components/pages/order/orderlist";
import PriceBar from "@components/pages/order/pricebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { purchaseProducts, totalPrice } from "../../recoil/totalamount";
import { useEffect, useState } from "react";
import useBranduQuery from "@hooks/useBranduQuery";
import { getAddresses } from "@lib/fetches";
import { selectedAddress } from "../../recoil/order";
import { AddressInterface } from "../../types/privacy";

export interface PriceBarPrint {
  id: number;
  title: string;
  price: number;
  isBold?: boolean;
}

function OrderPage() {
  const price = useRecoilValue(totalPrice);
  const [priceBarPrint, setPriceBarPrint] = useState<PriceBarPrint[]>([]);
  const baskets = useRecoilValue(purchaseProducts);
  const [address, setAddress] = useRecoilState(selectedAddress);
  console.log(address);

  const {
    data: addresses,
    isLoading,
    isError,
  } = useBranduQuery<AddressInterface[]>({
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
        price: price?.orderPrice || 0,
      },
      {
        id: 2,
        title: "배송비",
        price: 3000,
      },
      {
        id: 3,
        title: "합계 금액",
        price: price?.totalPrice || 0,
        isBold: true,
      },
    ]);
  }, [price]);

  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="max-w-4xl m-auto flex flex-row space-x-10">
      <div className="flex flex-col w-[70%]">
        <p className="font-bold text-xl my-5">주문 및 결제</p>
        <OrderList
          baskets={baskets!}
          addresses={addresses?.results!}
          address={address!}
          setAddress={setAddress}
        />
      </div>
      <div className="price w-[30%]">
        <PriceBar printList={priceBarPrint} disabled={addresses === null} />
      </div>
    </div>
  );
}

export default OrderPage;
