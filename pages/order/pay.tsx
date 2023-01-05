import Accordion from "@common/accordion";
import CheckButton from "@common/check-button";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { PaymentMethodType } from "@tosspayments/payment__types/types/payment/PaymentRequest";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import StandardHeader from "@common/standard-header";
import { useForm } from "react-hook-form";
import CardPay from "@icons/card-pay";
import VirtualAccountPay from "@icons/virtual-account-pay";
import MobilePay from "@icons/mobile-pay";
import TransferPay from "@icons/transfer-pay";
import Pricebar from "@components/pages/order/pricebar";
import { PriceBarPrint } from "./index";
import { useMutation } from "@tanstack/react-query";
import client from "@lib/api";
import { newOrder } from "../../recoil/order";
import CheckBox from "@icons/checkBox";
import { userData } from "../../recoil/user";

interface PaymentForm {
  point: number;
  method: PaymentMethodType;
  isChecked: boolean;
}

const PAYMENT_METHODS = [
  {
    title: "카드",
    method: "카드",
    icon: <CardPay />,
  },
  {
    title: "가상계좌",
    method: "가상계좌",
    icon: <VirtualAccountPay />,
  },
  {
    title: "휴대폰",
    method: "휴대폰",
    icon: <MobilePay />,
  },
  {
    title: "계좌이체",
    method: "계좌이체",
    icon: <TransferPay />,
  },
  {
    title: "토스페이",
    method: "토스페이",
    icon: <CardPay />,
  },
];

export interface OrderCreate {
  name: string;
  address: number;
  products: {
    product: number;
    count: number;
  }[];
  price: number;
  coupon?: number;
  used_point?: number;
  method: PaymentMethodType;
}

function PayPage() {
  const orderData = useRecoilValue(newOrder);
  const userPoint = useRecoilValue(userData);

  const [priceBarPrint, setPriceBarPrint] = useState<PriceBarPrint[]>([]);
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<PaymentForm>({
      defaultValues: {
        point: 0,
        method: "카드",
        isChecked: false,
      },
    });

  const createOrder = useMutation({
    mutationFn: (data: OrderCreate) => client.post("orders/toss", data),
    onSuccess: async (response) => {
      await requestTossPayment(response.data.results.order_number);
    },
    onError: (error) => {},
    onSettled: () => {
      reset();
    },
  });

  /* 포인트 전액 사용 */
  const useAllPoint = () => {
    setValue("point", userPoint.point.point);
    alert(watch("point") + " Point");
  };

  useEffect(() => {
    if (orderData.name !== "") {
      setPriceBarPrint([
        {
          id: 1,
          title: "주문 금액",
          price: orderData?.orderPrice || 0,
        },
        {
          id: 2,
          title: "배송비",
          price: 3000,
        },

        {
          id: 3,
          title: "쿠폰 사용",
          price: 0,
        },

        {
          id: 4,
          title: "포인트 사용",
          price: -watch("point"),
        },
        {
          id: 5,
          title: "합계 금액",
          price: (orderData?.orderPrice || 0) + 3000 - watch("point"),
          isBold: true,
        },
      ]);
    }
  }, [orderData]);

  const onValid = async (data: PaymentForm) => {
    createOrder.mutate({
      name: orderData?.name || "",
      address: orderData?.address || 0,
      products: orderData?.products || [],
      price: (orderData?.orderPrice || 0) + 3000 - data?.point,
      used_point: data?.point,
      method: data?.method,
    });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  async function getTossPayments() {
    return await loadTossPayments("test_ck_YPBal2vxj81eD2A7q7w85RQgOAND");
  }

  const requestTossPayment = async (orderNumber: string) => {
    const tossPayments = await getTossPayments();
    await tossPayments.requestPayment(watch("method"), {
      amount: (orderData?.orderPrice || 0) + 3000 - watch("point"),
      orderId: orderNumber,
      orderName: orderData?.name || "",
      customerName: "박재현",
      useCardPoint: true,
      successUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/order/waiting`,
      failUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/order/waiting`,
    });
  };

  const [coupon, setCoupon] = useState<number>();

  return (
    <div className=" m-auto flex flex-row space-x-5">
      <form
        onSubmit={handleSubmit(onValid, onError)}
        className="flex flex-row space-x-5"
      >
        <div className="flex flex-col w-[70%]">
          <StandardHeader title="주문 및 결제" />
          {/* 쿠폰 처리 */}
          <Accordion title="쿠폰">
            {[0, 1, 2].map((basket, index) => {
              return (
                <div className="flex flex-row" key={index}>
                  <div
                    className={`${
                      coupon == index ? "bg-main" : "bg-gray"
                    } rounded-full w-5 h-5 flex justify-center items-center mr-3`}
                    onClick={() => {
                      setCoupon(index);
                    }}
                  >
                    <CheckBox />
                  </div>
                  <span className="ml-3 text-subContent ">
                    7월 여름 Hot 할인쿠폰
                  </span>
                </div>
              );
            })}
          </Accordion>
          {/* 포인트 처리 */}
          <div className="border-y border-gray py-5">
            <div className="point flex flex-col mx-5">
              <span className="text-base mb-[10px]">포인트</span>
              <div className="flex mb-[10px]">
                <input
                  className="border border-main mr-2 rounded-xl p-2 flex-1 focus:outline-none"
                  autoComplete="off"
                  {...register("point", {
                    required: true,
                    validate: (value) => value <= userPoint.point.point,
                  })}
                />
                <button
                  className="text-white text-sm bg-main px-5 py-[10px] rounded-xl"
                  onClick={useAllPoint}
                >
                  전액사용
                </button>
              </div>
              <div className="flex flex-row items-center">
                <span className="text-subContent text-sm mr-3 flex items-center">
                  사용가능한 포인트
                </span>
                <span className="text-main font-bold flex items-center">
                  {userPoint.point.point.toLocaleString() || "0"} BP
                </span>
              </div>
            </div>
          </div>
          {/* 결제 방식 처리 */}
          <div className="border-y border-gray py-5">
            <span className="text-base my-[10px] mx-5">결제 방식</span>
            <div className="payment mx-5 flex flex-row space-x-2 mt-2">
              {PAYMENT_METHODS.map((payment, index) => {
                return (
                  <label key={index}>
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <input
                        type="radio"
                        className="hidden peer"
                        id="payment"
                        value={payment.method}
                        {...register("method")}
                      />
                      <div className="w-16 h-16 flex justify-center items-center bg-gray rounded-xl peer-checked:bg-sub">
                        <div className="w-10 h-10 flex justify-center items-center">
                          {payment.icon}
                        </div>
                      </div>
                      <span className="mt-1 font-bold text-sm text-subContent">
                        {payment.title}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
          {/* 주문 동의 항목 처리 */}
          <div className="flex flex-col py-5">
            <div
              className={`w-full h-10 rounded-xl flex items-center px-5 transition-all duration-300 ${
                watch("isChecked") ? "bg-sub" : "bg-gray"
              }`}
            >
              <CheckButton
                color={"none"}
                register={register("isChecked", {
                  required: true,
                  validate: (value) => value === true,
                })}
                width={20}
                height={20}
              />
              <span className="flex justify-center items-center text-base text-black ml-2">
                전체동의
              </span>
            </div>

            <p className="text-xs text-subContent flex flex-col space-y-5 mx-5 mt-2">
              개인정보 수집 이용 및 제 3자 제공 동의 <br />
              <br /> 본인은 만 14세 이상이며, 주문 내용을 확인하였습니다. <br />
              <br />
              (주)더미는 통신판매중개자로 거래 당사자가 아니므로, 판매자가
              등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다 (단,
              (주)더미가 판매자로 등록 판매한 상품은 판매자로서 책임을
              부담합니다).
            </p>
          </div>
        </div>
        <div className="w-[30%]">
          <Pricebar printList={priceBarPrint}>
            <input
              type="submit"
              className="w-56 h-11 bg-main rounded-xl text-white font-bold text-base flex justify-center items-center cursor-pointer m-auto mb-2 disabled:opacity-50 disabled:cursor-auto"
              value="결제하기"
              disabled={watch("isChecked") != true}
            />
          </Pricebar>
        </div>
      </form>
    </div>
  );
}

export default PayPage;
