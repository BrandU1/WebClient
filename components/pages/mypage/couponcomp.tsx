import Input from "@common/input";
import SearchIcon from "@icons/search";
import { useState } from "react";

function CouponComp() {
  const [regist, setRegist] = useState<string>("");

  return (
    <div className="pl-5 flex flex-col flex-1 mt-10">
      <div className="title flex flex-row items-center justify-between border-b pb-5">
        <span className="font-bold text-lg">쿠폰</span>
        <div className="text-base">
          <span>보유 쿠폰 </span>
          <span className="font-bold">4개</span>
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
      {[1, 2, 3].map((list, index) => {
        return (
          <div className="border-t border-gray py-5">
            <div className="flex flex-row justify-between px-2">
              <div className="flex flex-col space-y-3">
                <span className="text-base">[이벤트] 전 상품 무료배송</span>
                <span className="text-sm text-subContent">
                  2022/07/15 ~ 2022/08/15
                </span>
              </div>
              <div className="text-xs text-subContent cursor-pointer">
                적용상품 목록
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CouponComp;
