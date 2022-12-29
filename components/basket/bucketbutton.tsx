import React, { useState } from "react";
import client from "@lib/api";
import { CustomProps } from "../../pages/product/[id]/custom";

interface BucketProp {
  id: number;
}

function BucketButton({ id }: BucketProp) {
  const [customData, setCustomData] = useState<CustomProps>();
  const goBasket = (id: any) => {
    client.post(`accounts/baskets/${id}`).then((res) => res.data);
  };
  return (
    <button
      onClick={() => {
        goBasket(customData?.basketList.id);
      }}
      className="w-64 h-11 bg-main rounded-xl ml-[10px] flex flex-row justify-center items-center"
    >
      <span className="text-white font-bold text-sm">구매하기</span>
    </button>
  );
}

export default BucketButton;
