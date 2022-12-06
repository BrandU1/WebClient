import { basketInterface } from "../../types/privacy";
import Image from "next/image";
import CloseIcon from "@icons/close";
import { useState } from "react";
import AmountButton from "@common/amountbutton";
import CheckBox from "@icons/checkBox";

interface BasketListProps {
  basketList: basketInterface[];
}

interface Count {
  count: number;
  counts: ProductCount;
}

interface ProductCount {
  product: number;
  count: number;
}

function BasketList({ basketList }: BasketListProps) {
  const [counts, setCounts] = useState<number>(1);
  const [amountPrice, setAmountPrice] = useState<number>(0);

  //선택 리스트 State
  const [checkList, setCheckList] = useState<number[]>([]);

  // 단일 선택 리스트
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      // 선택 시 배열에 추가
      setCheckList((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 제외
      setCheckList(checkList.filter((item) => item !== id));
    }
  };

  // 전체 선택 리스트

  const handelAllCheck = (checked: boolean) => {
    if (checked) {
      setCheckList((prev) => basketList.map((res, index) => res.product.id));
    } else {
      setCheckList([]);
    }
  };

  return (
    <div className="max-w-4xl m-auto flex space-x-10 ">
      <div className="rightSection w-[70%]">
        <h1 className="text-xl font-bold py-5">장바구니</h1>
        <div className="border-b-[1px] border-[black]" />
        <div className="checkBox border-b-[1px] border-[#DBDBDB] p-4">
          <div className="bg-[#0CABA8] bg-opacity-20 p-3 rounded-lg flex items-center space-x-3 ">
            <label className="text-sm font-bold flex" htmlFor="AllCheck">
              <div
                className={`${
                  checkList.length === basketList.length ? "bg-main" : "bg-gray"
                } rounded-full w-5 h-5 flex justify-center items-center mr-3`}
              >
                <CheckBox />
              </div>
              <input
                onChange={(e) => handelAllCheck(e.target.checked)}
                className="hidden"
                type="checkbox"
                id="AllCheck"
                name="checkList"
                checked={checkList.length === basketList.length}
              />
              전체 선택/해제
            </label>
          </div>
        </div>
        <div className="basketList">
          {basketList?.map((res, idx) => {
            return (
              <>
                <div
                  key={idx}
                  className="border-[#DBDBDB] border-b-[1px] flex justify-between relative"
                >
                  <div className="flex space-x-4 items-center p-4">
                    {/*체크 박스 Div*/}
                    <div className="absolute top-6 left-10 z-20">
                      <label
                        className={`text-sm font-bold flex w-5 h-5 rounded-full flex justify-center items-center ${
                          checkList.includes(res.product.id)
                            ? "bg-main"
                            : "bg-gray"
                        }`}
                        htmlFor={`check${idx}`}
                      >
                        <CheckBox />
                        <input
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, res.product.id)
                          }
                          className="hidden"
                          type="checkbox"
                          id={`check${idx}`}
                          name="checkList"
                          checked={checkList.includes(res.product.id)}
                        />
                      </label>
                    </div>
                    <div className="w-[120px] h-[120px] relative  ">
                      <Image
                        className="rounded-lg "
                        src={`http://192.168.0.2${res.product.backdrop_image}`}
                        layout="fill"
                        alt="productImage"
                      />
                    </div>
                    <div>
                      <div className="flex items-start space-x-80">
                        <div className="w-24">
                          <div>
                            <p className="text-subContent text-sm">
                              {res.product.name}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold">
                              {res.product.price.toLocaleString()} 원
                            </p>
                          </div>
                        </div>
                        <div>
                          <CloseIcon />
                        </div>
                      </div>
                      <div className="mt-8">
                        <AmountButton
                          id={res.product.id}
                          price={res.product.price}
                          setCounts={setCounts}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="leftSection w-[30%] ">
        <div className="text-white py-5">cartList</div>
        <div className=" border-[1px] border-main rounded-lg h-80 relative ">
          <div className="px-2 py-5 space-y-2">
            <div className="flex items-center text-sm justify-between">
              <p className="text-subContent ">주문금액</p>
              <p>0 원</p>
            </div>
            <div className="flex justify-between text-sm items-center">
              <p className="text-subContent  ">배송비</p>
              <p>3,000 원</p>
            </div>
            <div className="flex justify-between items-center ">
              <p className="text-lg">합계 금액</p>
              <p>3,000 원</p>
            </div>
          </div>

          <div className="px-2 w-full absolute  bottom-2 ">
            <button className="w-full bg-main rounded-lg text-white p-3">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BasketList;
