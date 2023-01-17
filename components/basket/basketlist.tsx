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
import Pricebar from "@components/pages/order/pricebar";
import { PriceBarPrint } from "../../pages/order";
import Link from "next/link";
import { Basket } from "../../pages/basket";

interface BasketListProps {
  basketList: Basket[];
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

  useEffect(() => {
    setBasket([]);
    setCheckList([]);
  }, []);

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

  const setBasketList = (baskets: Basket[], isInit: boolean = true) => {
    if (isInit) {
      setBasket(
        basketList.map((item) => {
          return {
            custom_product: item.custom_product,
            amount: 1,
            is_purchase: item.is_purchase,
          };
        })
      );
    } else {
      setBasket(
        baskets.filter((item) =>
          baskets
            .map((prevBasket) => prevBasket?.custom_product.product.id)
            .includes(item.custom_product.product.id)
        )
      );
    }
  };

  /* 구매 개수 핸들러 */
  const handleCount = (count: number, id: number) => {
    const newBasket = basket.map((basket) => {
      if (basket.custom_product.product.id === id) {
        return { ...basket, amount: count };
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
      setCheckList((prev) =>
        basketList.map((res, index) => res.custom_product.product.id)
      );
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
                          checkList.includes(res.custom_product.product.id)
                            ? "bg-main"
                            : "bg-gray"
                        }`}
                        htmlFor={`check${idx}`}
                      >
                        <CheckBox />
                        <input
                          onChange={(e) =>
                            handleSingleCheck(
                              e.target.checked,
                              res.custom_product.product.id
                            )
                          }
                          className="hidden"
                          type="checkbox"
                          id={`check${idx}`}
                          name="checkList"
                          checked={checkList.includes(
                            res.custom_product.product.id
                          )}
                        />
                      </label>
                    </div>

                    <div className="w-[120px] h-[120px] relative  ">
                      <div
                        className="rounded-lg w-[120px] h-[120px]"
                        dangerouslySetInnerHTML={{
                          __html: `<svg style="width: 120px; height: 120px;" ${
                            res.custom_product.image.split("<svg")[1]
                          }`,
                        }}
                      ></div>
                    </div>
                    <div>
                      <div className="flex items-start space-x-80">
                        <div className="w-24">
                          <div>
                            <p className="text-subContent text-sm">
                              {res.custom_product.product.name}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold">
                              {res.custom_product.product.price.toLocaleString()}{" "}
                              원
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() =>
                            deleteBasket.mutate(res.custom_product.id)
                          }
                        >
                          <CloseIcon />
                        </div>
                      </div>
                      <div className="mt-8">
                        <AmountButton
                          id={res.custom_product.product.id}
                          price={res.custom_product.product.price}
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
        <Pricebar printList={priceBarPrint}>
          <button
            className="w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center m-auto mb-2 disabled:opacity-50 disabled:cursor-auto"
            disabled={checkList.length === 0}
          >
            <Link href="/order">결제하기</Link>
          </button>
        </Pricebar>
      </div>
    </div>
  );
}

export default BasketList;
