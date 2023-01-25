import { useState } from "react";
import client from "@lib/api";
import useBranduQuery from "@hooks/useBranduQuery";
import {
  BranduBaseResponse,
  SummaryOrder,
  SummaryProfile,
} from "../../../types/privacy";
import { useQuery } from "@tanstack/react-query";

function CouponComp() {
  const [regist, setRegist] = useState<string>("");

  const getSummary = () => {
    return client.get("accounts/summary/profile").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<SummaryProfile>>(
    ["summary"],
    getSummary
  );

  return (
    <div className="pl-5 flex flex-col flex-1 mt-10">
      <div className="title flex flex-row items-center justify-between border-b pb-5">
        <span className="font-bold text-lg">쿠폰</span>
        <div className="text-base">
          <span>보유 쿠폰 </span>
          <span className="font-bold">{data?.results.coupon_count}개</span>
        </div>
      </div>
      <div className="searchbar mt-5 mr-[10px] ml-[10px] flex justify-between border border-main rounded-xl h-10 mb-5">
        <input
          className={`bg-transparent w-full h-[40px] rounded-xl text-sm font-bold border-main  focus:outline-0 px-2`}
          type="text"
          autoComplete="off"
          value={regist}
          placeholder="쿠폰코드를 등록해주세요"
          onChange={(e: any) => {
            setRegist(e.target.value);
          }}
        />
        <div className="m-3 w-8 cursor-pointer">
          <p className="font-bold text-sm text-main">등록</p>
        </div>
      </div>
    </div>
  );
}

export default CouponComp;
