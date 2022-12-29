import { basketInterface } from "../../types/privacy";
import Image from "next/image";
import CloseIcon from "@icons/close";
import AmountButton from "@common/amountbutton";
import CheckBox from "@icons/checkBox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  basketCheckedList,
  basketPurchase,
  totalPrice,
} from "../../recoil/totalamount";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { useRouter } from "next/router";
import Pricebar from "@components/pages/order/pricebar";
import { PriceBarPrint } from "../../pages/order";
import Link from "next/link";

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
  const router = useRouter();
  const [basket, setBasket] = useRecoilState(basketPurchase);
  const [checkList, setCheckList] = useRecoilState(basketCheckedList);
  const price = useRecoilValue(totalPrice);
  const queryClient = useQueryClient();
  const deleteBasket = useMutation({
    mutationFn: (id: number) => client.delete(`accounts/baskets/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["basketList"]);
    },
    onError: (error) => {},
    onSettled: () => {},
  });

  const [priceBarPrint, setPriceBarPrint] = useState<PriceBarPrint[]>([]);

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

  useEffect(() => {
    if (basket.length === 0) {
      setBasketList(basketList);
    } else {
      setBasketList(basketList, false);
    }
  }, [basketList]);

  const setBasketList = (
    baskets: basketInterface[],
    isInit: boolean = true
  ) => {
    if (isInit) {
      setBasket(
        basketList.map((item) => {
          return {
            product: item.product,
            count: 1,
            price: item.product.price,
          };
        })
      );
    } else {
      setBasket(
        basket.filter((item) =>
          baskets
            .map((prevBasket) => prevBasket.product.id)
            .includes(item.product.id)
        )
      );
    }
  };

  /* 구매 개수 핸들러 */
  const handleCount = (count: number, id: number) => {
    const newBasket = basket.map((basket) => {
      if (basket.product.id === id) {
        return { ...basket, count };
      }
      return basket;
    });
    setBasket(newBasket);
  };

  /* 단일 선택 리스트 */
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      // 선택 시 배열에 추가
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((item) => item !== id));
    }
  };

  /* 전체 선택 리스트 */
  const handelAllCheck = (checked: boolean) => {
    if (checked) {
      setCheckList((prev) => basketList.map((res, index) => res.product.id));
    } else {
      setCheckList([]);
    }
  };

  return (
    <div className="max-w-4xl m-auto flex flex-row space-x-10">
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
                        src={res.product.backdrop_image}
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
                        <div
                          onClick={() => deleteBasket.mutate(res.product.id)}
                        >
                          <CloseIcon />
                        </div>
                      </div>
                      <div className="mt-8">
                        <AmountButton
                          id={res.product.id}
                          price={res.product.price}
                          handleCount={handleCount}
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
        <Pricebar printList={priceBarPrint} disabled={checkList.length === 0} />
      </div>
    </div>
  );
}

export default BasketList;
