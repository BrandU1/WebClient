import { useState } from "react";

function OrderList() {
  const [historyOpen, setHistoryOpen] = useState<boolean>(true);
  const [btnSelected, setBtnSelected] = useState<number>(0);

  return (
    <div className="w-[554px]">
      <div className="list border-y border-t-black border-b-gray py-5">
        <div
          className="flex justify-between px-5"
          onClick={() => {
            setHistoryOpen(!historyOpen);
          }}
        >
          <span className="text-base text-black">주문내역</span>
          {historyOpen ? (
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
        {historyOpen && (
          <div className="flex flex-row justify-between px-5 mt-[10px]">
            <p className="text-sm text-subContent">건강 칫솔</p>
            <p className="text-sm">1개</p>
          </div>
        )}
      </div>
      <div className="orderer border-y border-gray py-5">
        <div className="flex justify-between px-5 items-center">
          <p className="font-base">주문자</p>
          <button className="border border-main rounded-xl text-main text-sm w-[90px] h-[36px] flex justify-center items-center">
            수정하기
          </button>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start px-5 mt-[10px]">
            <p>보내는 분</p>
            <p>연락처</p>
            <p>이메일</p>
          </div>
          <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
            <p>민수</p>
            <p>010-2222-2222</p>
            <p>222@222.com</p>
          </div>
        </div>
      </div>
      <div className="address border-y border-gray py-5">
        <div className="flex flex-row px-5 justify-between items-center">
          <div className="flex flex-row">
            <p className="text-base">배송지</p>
            <div className="flex flex-row space-x-[10px] ml-[25px]">
              <button
                className={`border border-main w-[42px] h-[22px] flex justify-center items-center rounded-xl text-xs font-bold text-main ${
                  btnSelected == 0 && "text-white bg-main"
                }`}
                onClick={() => {
                  setBtnSelected(0);
                }}
              >
                우리집
              </button>
              <button
                className={`border border-main w-[42px] h-[22px] flex justify-center items-center rounded-xl text-xs font-bold text-main ${
                  btnSelected == 1 && "text-white bg-main"
                }`}
                onClick={() => {
                  setBtnSelected(1);
                }}
              >
                학교
              </button>
              <button
                className={`border border-main w-[42px] h-[22px] flex justify-center items-center rounded-xl text-xs font-bold text-main ${
                  btnSelected == 2 && "text-white bg-main"
                }`}
                onClick={() => {
                  setBtnSelected(2);
                }}
              >
                사무실
              </button>
            </div>
          </div>
          <button className="border border-main rounded-xl text-main text-sm w-[90px] h-[36px] flex justify-center items-center">
            수정하기
          </button>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start px-5 mt-[10px]">
            <p>받는 분</p>
            <p>연락처</p>
            <p>주소</p>
          </div>
          <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
            <p>민수</p>
            <p>010-2222-2222</p>
            <p>경기도 안산시 상록구 사동</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
