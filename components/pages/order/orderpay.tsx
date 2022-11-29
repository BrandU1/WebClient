import { useState } from "react";
import CheckIcon from "@icons/checkBtn";

function OrderPay() {
  const [couponOpen, setCouponOpen] = useState<boolean>(true);
  const [point, setPoint] = useState<number>(0);
  const [agree, setAgree] = useState<boolean>(true);
  const [method, setMethod] = useState<number>(0);

  return (
    <div className="w-[554px]">
      <div className="list border-y border-t-black border-b-gray py-5">
        <div
          className="flex justify-between px-5"
          onClick={() => {
            setCouponOpen(!couponOpen);
          }}
        >
          <span className="text-base text-black">쿠폰</span>
          {couponOpen ? (
            <button>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5.5L6 0.499999L0.999999 5.5"
                  stroke="#767676"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0.5L6 5.5L0.999999 0.500001"
                  stroke="#767676"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        {couponOpen && (
          <div className="flex flex-row justify-between px-5 mt-[10px]">
            <div className="flex flex-row">
              <CheckIcon color={"gray"} width={20} height={20} />
              <span className="ml-3 text-subContent ">
                7월 여름 Hot 할인쿠폰
              </span>
            </div>
            <p className="text-sm">-5%</p>
          </div>
        )}
      </div>
      <div className="border-y border-gray py-5">
        <div className="point flex flex-col mx-5">
          <span className="text-base mb-[10px]">포인트</span>
          <div className="flex mb-[10px]">
            <input
              className="border border-main mr-2 rounded-xl p-2 w-[410px]"
              autoComplete="off"
              // value={pointed.toLocaleString("ko-KR")}
              value={point}
              onChange={(e) => {
                if (!e.target.value) {
                  setPoint(0);
                }
                const usePoint = parseInt(e.target.value.replace(",", ""));
                if (0 <= point) {
                  setPoint(usePoint);
                }
              }}
            />

            <button
              onClick={() => {
                // setPoint(PointData.point);
              }}
              className="text-white text-sm bg-main px-5 py-[10px] rounded-xl"
            >
              전액사용
            </button>
          </div>
          <div>
            <span className="text-[#767676] text-sm mr-[10px]">
              사용가능한 포인트
            </span>
            <span className="text-main font-bold">
              {/*{PointData.point.toLocaleString()} 포인트*/}
              1,000 BP
            </span>
          </div>
        </div>
      </div>
      <div className="border-y border-gray py-5">
        <span className="text-base my-[10px] mx-5">포인트</span>
        <div className="payment mx-5 flex flex-row space-x-2 mt-2">
          {[0, 1, 2, 3].map((payment, index) => {
            return (
              <div
                className="flex flex-col justify-center items-center"
                onClick={() => {
                  setMethod(index);
                }}
              >
                <div
                  className={`w-16 h-16 bg-gray rounded-xl ${
                    method == index && "border border-main border-2"
                  }`}
                />
                <span
                  className={`mt-1 font-bold text-sm text-subContent ${
                    method == index && "text-main"
                  }`}
                >
                  토스
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`agreement w-full h-11 mt-5 rounded-xl bg-gray flex items-center ${
          agree && "bg-[#0CABA833]"
        }`}
        onClick={() => {
          setAgree(!agree);
        }}
      >
        <button className="flex items-center ml-5">
          <CheckIcon
            color={agree ? "#0CABA8" : "gray"}
            width={20}
            height={20}
          />
          <span className="font-bold text-sm ml-1">전체동의</span>
        </button>
      </div>
      <div className="text-xs text-subContent flex flex-col space-y-5 mx-5 mt-2">
        <span>개인정보 수집 이용 및 제 3자 제공 동의</span>
        <span>본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.</span>
        <span>
          (주)더미는 통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한
          상품정보 및 거래 등에 대해 책임을 지지 않습니다 (단, (주)더미가
          판매자로 등록 판매한 상품은 판매자로서 책임을 부담합니다).
        </span>
      </div>
    </div>
  );
}

export default OrderPay;
