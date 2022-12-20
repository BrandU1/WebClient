import { useRef, useState } from "react";
import ModalFrame from "@common/modalframe";
import CheckBox from "@icons/checkBox";

interface CancelProps {
  onClose: () => void;
}

function OrderCancel({ onClose }: CancelProps) {
  const cancelEl = useRef<HTMLDivElement>(null);
  const handleCancelModal = (e: any) => {
    if (!cancelEl.current?.contains(e.target)) {
      onClose();
    }
  };
  //주문취소사유 open
  const [reason, setReason] = useState<boolean>(false);

  console.log(reason);
  //주문취소 상품 선택
  const [cancelList, setCancelList] = useState<number[]>([]);
  // 주문취소 사유 선택
  const [cancelReason, setCancelReason] = useState<number>();

  const handleCancelList = (id: number) => {
    if (cancelList.includes(id)) {
      setCancelList(cancelList.filter((list) => list !== id));
    } else {
      setCancelList((prev) => [...prev, id]);
    }
  };

  return (
    <div>
      {!reason && (
        <ModalFrame
          close={onClose}
          blur={handleCancelModal}
          pageRef={cancelEl}
          width={600}
          height={500}
          title={"주문취소"}
          bgColor={"black"}
          components={
            <div className="mt-5 flex items-center flex-col select-none">
              <p className="text-xs mb-10">
                배송이 시작되지 않은 상품만 취소할 수 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-5 h-60 overflow-y-scroll ">
                {[1, 2, 3].map((cacel, index) => {
                  return (
                    <div className="flex flex-row">
                      <div className="relative">
                        <div className="h-[100px] w-[100px] bg-[#F5F5F5] rounded-xl" />
                        <div
                          className={`${
                            cancelList.includes(index) ? "bg-main" : "bg-gray"
                          } absolute top-2 left-2 rounded-full w-5 h-5 flex justify-center items-center mr-3`}
                          onClick={() => {
                            handleCancelList(index);
                          }}
                        >
                          <CheckBox />
                        </div>
                      </div>
                      <div className="flex flex-col text-sm ml-5">
                        <p className="mb-1">상품 이름</p>
                        <div className="flex flex-row mb-5">
                          <p className="font-bold">상품 가격</p>
                          <p>원</p>
                        </div>
                        <p className="text-subContent">상품 옵션</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-row space-x-3 mt-5">
                <button
                  className="border rounded-xl text-main border-main w-48 h-11"
                  onClick={onClose}
                >
                  취소하기
                </button>
                <button
                  className="border rounded-xl bg-main text-white border-main w-48 h-11"
                  onClick={() => {
                    setReason(!reason);
                  }}
                >
                  다음
                </button>
              </div>
            </div>
          }
        />
      )}
      {reason && (
        <ModalFrame
          close={onClose}
          blur={handleCancelModal}
          pageRef={cancelEl}
          width={600}
          height={500}
          title={"주문취소 사유"}
          bgColor={"none"}
          components={
            <div className="mt-5 flex items-center flex-col">
              <p className="text-xs mb-10">
                배송이 시작되지 않은 상품만 취소할 수 있습니다.
              </p>
              <div className="flex flex-col space-y-6 h-60">
                <div className="flex flex-row justify-between">
                  <div className="font-bold text-sm">단순 변심</div>
                  <div
                    className={`${
                      cancelReason == 0 ? "bg-main" : "bg-gray"
                    } rounded-full w-5 h-5 flex justify-center items-center mr-3`}
                    onClick={() => {
                      setCancelReason(0);
                    }}
                  >
                    <CheckBox />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="font-bold text-sm mr-16">
                    상품 결함(파손/이상/구성품부족 등)
                  </div>
                  <div
                    className={`${
                      cancelReason == 1 ? "bg-main" : "bg-gray"
                    } left-2 rounded-full w-5 h-5 flex justify-center items-center mr-3`}
                    onClick={() => {
                      setCancelReason(1);
                    }}
                  >
                    <CheckBox />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="font-bold text-sm">잘못된 상품 배송</div>
                  <div
                    className={`${
                      cancelReason == 2 ? "bg-main" : "bg-gray"
                    } rounded-full w-5 h-5 flex justify-center items-center mr-3`}
                    onClick={() => {
                      setCancelReason(2);
                    }}
                  >
                    <CheckBox />
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-3 mt-5">
                <button
                  className="border rounded-xl text-main border-main w-48 h-11"
                  onClick={() => {
                    setReason(!reason);
                  }}
                >
                  취소하기
                </button>
                <button className="border rounded-xl bg-main text-white border-main w-48 h-11">
                  신청하기
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default OrderCancel;
