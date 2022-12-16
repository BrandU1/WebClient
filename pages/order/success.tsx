import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Bucket {
  id: number;
  product: {
    id: number;
    backdrop_image: string;
    name: string;
    price: number;
  };
  amount: number;
  is_purchase: boolean;
}

interface OrderProps {
  id: number;
  used_point: number;
  price: number;
  coupon: number;
}

function Success() {
  const router = useRouter();

  // const orderId = router.asPath.split("=")[1].split("&")[0];
  // const paymentKey = router.asPath.split("=")[2].split("&")[0];
  // const amount = router.asPath.split("=")[3].split("&")[0];

  // useEffect(() => {
  //   const orderId = router.asPath.split("=")[1].split("&")[0];
  //   const paymentKey = router.asPath.split("=")[2].split("&")[0];
  //   const amount = router.asPath.split("=")[3].split("&")[0];
  //   client.post(`orders/toss/confirm/`, {
  //     orderId,
  //     paymentKey,
  //     amount,
  //   });
  // }, [router]);

  const getPurchase = () => {
    return client.get(`accounts/purchase/`).then((res) => res.data);
  };
  const { data: PurchaseData, isLoading } = useQuery<Bucket[]>(
    ["purchase"],
    getPurchase
  );

  const getOrder = () => {
    return client.get(`accounts/orders/`).then((res) => res.data);
  };
  const { data: orderData, isLoading: orderLoading } = useQuery<OrderProps[]>(
    ["order"],
    getOrder
  );
  console.log(orderData);

  if (isLoading || orderLoading) return <div></div>;

  return (
    <div className="max-w-4xl m-auto mt-5 h-fit">
      <div className="flex justify-center flex-col items-center mt-[50px]">
        <svg
          width="91"
          height="20"
          viewBox="0 0 91 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.6719 7.96592C20.431 6.22541 21.8537 5.35742 23.9401 5.35742V8.63849C22.8128 8.56578 21.8128 8.84299 20.9446 9.47921C20.0946 10.0973 19.6673 11.1243 19.6673 12.5649V19.6315C18.0128 19.6315 16.6719 18.2772 16.6719 16.6049V5.60737H17.3355C18.6219 5.60737 19.6628 6.66167 19.6628 7.96138L19.6719 7.96592Z"
            fill="#0CABA8"
          />
          <path
            d="M36.5234 7.59815V5.60769C38.178 5.60769 39.5189 6.96193 39.5189 8.63428V19.6272H38.5189C37.4143 19.6272 36.5234 18.7229 36.5234 17.6095C35.3962 19.2001 33.778 19.9953 31.6734 19.9953C29.7689 19.9953 28.1416 19.2864 26.7962 17.864C25.4462 16.4416 24.7734 14.6965 24.7734 12.6197C24.7734 10.5429 25.4462 8.79788 26.7962 7.37547C28.1462 5.95307 29.7734 5.24414 31.6734 5.24414C33.7825 5.24414 35.3962 6.03033 36.5234 7.59815ZM29.0098 15.8417C29.8416 16.6824 30.8871 17.1051 32.1416 17.1051C33.3962 17.1051 34.4416 16.6824 35.2734 15.8417C36.1053 14.9828 36.5189 13.9058 36.5189 12.6152C36.5189 11.3246 36.1053 10.2612 35.2734 9.41592C34.4416 8.55702 33.3962 8.1253 32.1416 8.1253C30.8871 8.1253 29.8416 8.55702 29.0098 9.41592C28.178 10.2566 27.7643 11.3246 27.7643 12.6152C27.7643 13.9058 28.178 14.9601 29.0098 15.8417Z"
            fill="#0CABA8"
          />
          <path
            d="M49.9218 5.24414C51.5309 5.24414 52.8172 5.7622 53.7899 6.80288C54.7581 7.83901 55.2445 9.24778 55.2445 11.0246V19.6363C53.5899 19.6363 52.249 18.2821 52.249 16.6097V11.3382C52.249 10.293 51.9718 9.48863 51.4172 8.92512C50.8627 8.36616 50.1036 8.0844 49.1445 8.0844C48.0536 8.0844 47.1945 8.42524 46.5672 9.1069C45.9399 9.78856 45.6263 10.7929 45.6263 12.1199V19.6363C43.9718 19.6363 42.6309 18.2821 42.6309 16.6097V5.60769H43.849C44.8309 5.60769 45.6218 6.41206 45.6218 7.40274C46.5445 5.96216 47.9763 5.24414 49.9172 5.24414H49.9218Z"
            fill="#0CABA8"
          />
          <path
            d="M70.1094 7.59827V0C71.7639 0 73.1048 1.35424 73.1048 3.02659V19.6319H72.1048C71.0003 19.6319 70.1094 18.7276 70.1094 17.6142C68.9821 19.2047 67.3639 20 65.2594 20C63.3548 20 61.7276 19.2911 60.3821 17.8687C59.0321 16.4463 58.3594 14.7012 58.3594 12.6244C58.3594 10.5476 59.0321 8.80255 60.3821 7.38014C61.7321 5.95774 63.3594 5.24881 65.2594 5.24881C67.3685 5.24881 68.9821 6.03499 70.1094 7.60282V7.59827ZM62.5957 15.8419C63.4276 16.6826 64.473 17.1052 65.7276 17.1052C66.9821 17.1052 68.0276 16.6826 68.8594 15.8419C69.6912 14.983 70.1048 13.9059 70.1048 12.6153C70.1048 11.3247 69.6912 10.2613 68.8594 9.41604C68.0276 8.55715 66.9821 8.12543 65.7276 8.12543C64.473 8.12543 63.4276 8.55715 62.5957 9.41604C61.7639 10.2568 61.3503 11.3247 61.3503 12.6153C61.3503 13.9059 61.7639 14.9602 62.5957 15.8419Z"
            fill="#0CABA8"
          />
          <path
            d="M76.2188 13.1243V0C77.9778 0 79.4051 1.44513 79.4051 3.22654V12.9289C79.4051 14.1422 79.7597 15.1011 80.4733 15.8055C81.1824 16.5053 82.2142 16.8553 83.5642 16.8553C84.9142 16.8553 85.9415 16.5053 86.6551 15.8055C87.3642 15.1057 87.7233 14.1468 87.7233 12.9289V0C89.4824 0 90.9097 1.44513 90.9097 3.22654V13.1243C90.9097 15.2011 90.2278 16.8734 88.8597 18.1459C87.5097 19.382 85.746 19.9955 83.5642 19.9955C81.3824 19.9955 79.6188 19.3774 78.2688 18.1459C76.9006 16.8734 76.2188 15.2011 76.2188 13.1243Z"
            fill="#0CABA8"
          />
          <path
            d="M13.4182 11.3156C12.9364 10.5203 12.2727 9.89775 11.4227 9.4524C12.7364 8.46171 13.3909 7.12565 13.3909 5.44422C13.3909 3.91275 12.8364 2.62213 11.7273 1.57237C10.6364 0.527153 9.29545 0 7.70909 0H0C0 1.67235 1.34091 3.02658 2.99545 3.02658H7.70909C8.40909 3.02658 9.00455 3.27653 9.48182 3.77187C9.96364 4.26721 10.2045 4.88071 10.2045 5.60782C10.2045 6.33492 9.96364 6.94842 9.48182 7.44376C9 7.9391 8.40909 8.18905 7.70909 8.18905H3.18636C1.42727 8.18905 0 9.63417 0 11.4156V19.6319H8.31818C9.94545 19.6319 11.3227 19.1002 12.45 18.0323C13.5773 16.9643 14.1409 15.6283 14.1409 14.0241C14.1409 13.0152 13.9 12.1109 13.4182 11.3156ZM10.1864 15.801C9.67727 16.3327 9.05455 16.6008 8.31364 16.6008H5.9C4.4 16.6008 3.18182 15.3692 3.18182 13.8514C3.18182 12.3336 4.4 11.102 5.9 11.102H8.31364C9.05455 11.102 9.67727 11.3701 10.1864 11.9018C10.6955 12.4335 10.95 13.0834 10.95 13.8514C10.95 14.6194 10.6955 15.2693 10.1864 15.801Z"
            fill="#0CABA8"
          />
        </svg>
        <h3 className="mt-2">결제가 완료되었습니다. </h3>
      </div>
      <div className="max-w-4xl m-auto border-b border-[#EDEDED] flex justify-center mt-[50px]"></div>
      <div className="p-3">
        <p className="text-[16px] ">주문내역</p>
        {PurchaseData?.map((purchase, index) => {
          return (
            <div key={index}>
              <div className="flex items-center mt-[10px]">
                <div className="w-[50px] h-[50px] rounded-lg bg-[#F5F5F5]"></div>
                <div className="ml-2">
                  <p className="text-[#767676] text-sm">
                    {purchase.product.name}
                  </p>
                  <p className="text-[#191919] font-normal ">
                    {purchase.product.price.toLocaleString()} 원
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl m-auto border-b border-[#EDEDED] flex justify-center mt-1"></div>
      <div className="p-3">
        <div className="flex items-center justify-between ">
          <p className="text-[#767676] text-sm">주문금액</p>
          {/*<p className="text-sm">*/}
          {/*  {(orderData[orderData.length - 1].price - 3000).toLocaleString()} 원*/}
          {/*</p>*/}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[#767676] text-sm">배송비</p>
          <p className="text-sm">3,000 원</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[#767676] text-sm">쿠폰 사용</p>
          {/*<p className="text-sm">*/}
          {/*  {orderData[orderData.length - 1].coupon === null*/}
          {/*    ? "0 원"*/}
          {/*    : orderData[orderData.length - 1].coupon}*/}
          {/*</p>*/}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[#767676] text-sm">포인트 사용</p>
          {/*<p className="text-sm">*/}
          {/*  {orderData[orderData.length - 1].used_point.toLocaleString()} 원*/}
          {/*</p>*/}
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[#191919] text-[16px]">최종 결제 금액</p>
          {/*<p className="text-sm">*/}
          {/*  {(*/}
          {/*    orderData[orderData.length - 1].price -*/}
          {/*    orderData[orderData.length - 1].used_point*/}
          {/*  ).toLocaleString()}*/}
          {/*  원*/}
          {/*</p>*/}
        </div>
      </div>
      <div className="mt-[104px] text-center">
        <button className="w-[250px] h-[45px] bg-Main-deepblue rounded-lg">
          <Link href="http://localhost:3000">
            <a className="text-white">홈으로 돌아가기</a>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Success;
