import CloseIcon from "@icons/close";
import BasketIcon from "@icons/basket";
import Image from "next/image";

function PickList() {
  return (
    <div className="max-w-4xl m-auto ">
      <div>
        <h2 className="py-5 font-bold text-xl">찜한상품</h2>
        <div className="border-[1px] border-black" />
      </div>
      <div className="pickList grid grid-cols-2 gap-x-7 m-auto">
        {[1, 2, 3, 4, 5].map((res, idx) => {
          return (
            <div key={idx} className=" py-4  flex justify-between w-full ">
              <div className="flex space-x-4">
                <Image
                  className="rounded-lg"
                  src="/dummy/yohan.png"
                  width={100}
                  height={100}
                  alt="product"
                />
                <div>
                  <p className="font-semibold text-xs text-[#ff0000] py-1">
                    [품절임박]
                  </p>
                  <h2 className="font-normal text-sm">안요한 후드티</h2>
                  <p>
                    <span className="font-[1100] text-sm">8,000</span>원
                  </p>
                </div>
              </div>

              <div className=" flex-row items-center space-y-14 align-middle ml-52">
                <div className="ml-2">
                  <CloseIcon />
                </div>

                <div className="bg-gray rounded-lg flex justify-center items-center w-7 h-7 mt-3">
                  <BasketIcon
                    color="#D9D9D9"
                    width="18"
                    height="18"
                    stroke="white"
                  />
                </div>
              </div>

              <div></div>

              {/*<div className="bg-gray w-7 h-7 rounded-lg flex justify-center items-center  ">*/}
              {/*  <BasketIcon color="white  ₩₩  " width="18" height="18" />*/}
              {/*</div>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PickList;
