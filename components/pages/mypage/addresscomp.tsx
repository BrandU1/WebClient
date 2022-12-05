import { AddressInterface } from "../../../types/privacy";

interface AddressList {
  address: AddressInterface[];
}

function AddressComp({ address }: AddressList) {
  return (
    <div className="flex flex-col px-5 mt-10 flex-1">
      <div className="border-b pb-5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">배송지 관리</span>
          <button className="w-24 h-9 flex justify-center items-center text-white bg-main rounded-xl">
            추가하기
          </button>
        </div>
      </div>
      {[1, 2].map((list, index) => {
        return (
          <div
            className="border-b border-gray pb-5 mt-5 flex flex-row justify-between px-2 "
            key={index}
          >
            <div className="flex flex-row">
              <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start mt-[10px]">
                <h2 className="text-base text-black">우리집</h2>
                <p>받는 분</p>
                <p>연락처</p>
                <p>주소</p>
              </div>
              <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
                <div className="w-9 h-5 font-bold text-xs text-white bg-main rounded-xl flex justify-center items-center">
                  대표
                </div>
                <p>민수</p>
                <p>010-2222-2222</p>
                <p>경기도 안산시 상록구 사동</p>
              </div>
            </div>

            <button className="w-24 h-9 border border-main text-main rounded-xl text-sm mt-5">
              수정하기
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AddressComp;
