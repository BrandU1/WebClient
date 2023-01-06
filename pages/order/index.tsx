import OrderList from "@components/pages/order/orderlist";
import PriceBar from "@components/pages/order/pricebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { purchaseProducts, totalPrice } from "../../recoil/totalamount";
import { useEffect, useState } from "react";
import useBranduQuery from "@hooks/useBranduQuery";
import { getAddress } from "@lib/fetches";
import { selectedAddress } from "../../recoil/order";
import {
  AddressInterface,
  BranduBaseResponse,
  UserInterface,
} from "../../types/privacy";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [address, setAddress] = useRecoilState(selectedAddress);

  const { data: addresses, isLoading } = useBranduQuery<AddressInterface[]>({
    queryKey: ["address"],
    queryFn: getAddress,
  });

  /* 결제하기 버튼 처리 */
  const onClick = async () => {
    await router.push(`/order/pay`);
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
          setAddress={setAddress}
        />
      </div>
      <div className="price w-[30%]">
        <PriceBar printList={priceBarPrint}>
          <button className="w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2 disabled:opacity-50">
            <Link href="/order/pay">결제하기</Link>
          </button>
        </PriceBar>
      </div>
    </div>
  );
}

export default OrderPage;
