import client from "@lib/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import BranduLogo from "@icons/brandu-logo";
import useBranduQuery from "@hooks/useBranduQuery";
import Image from "next/image";
import ImgAtom from "@atoms/imgatom";
import Head from "next/head";
import { OrderResponse } from "../../../types/privacy";

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

const getOrder = async (id: string) => {
  const response = await client.get(`/orders/order/${id}`);
  return response.data;
};

function Success() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useBranduQuery<OrderResponse>({
    queryKey: ["order", id],
    queryFn: () => getOrder(id as string),
  });

  // console.log(data?.results);

<<<<<<< Updated upstream
  const finalPrice = data?.results.price! - data?.results.used_point!;
=======
  const finalPrice = data?.results.price!;
>>>>>>> Stashed changes

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>주문 및 결제</title>
      </Head>
      <div className="max-w-4xl m-auto mt-5 h-fit">
        <div className="flex justify-center flex-col items-center mt-[50px]">
          <BranduLogo />
          <h3 className="mt-2">결제가 완료되었습니다. </h3>
        </div>
        <div className="max-w-4xl m-auto border-b border-lightGary flex justify-center mt-[50px]"></div>
        <div className="p-3 flex flex-col">
          <h2 className="text-[16px] ">주문내역</h2>
<<<<<<< Updated upstream
          {data?.results.products.map((product, index) => {
            return (
              <div key={index}>
                <div className="flex flex-row items-center my-2">
                  {/*<div className="w-20 h-20 relative">*/}
                  {/*  <ImgAtom*/}
                  {/*    exist={product.product.image}*/}
                  {/*    src={`https://brandu-server-bucket.s3.amazonaws.com/media/${product.product.image}`}*/}
                  {/*    width={80}*/}
                  {/*    height={80}*/}
                  {/*    alt={product.product.product.name}*/}
                  {/*  />*/}
                  {/*</div>*/}
                  <div className="ml-2 flex flex-col">
                    <p className="text-[#767676] text-sm">
                      {product.product.product.name}
                    </p>
                    <p className="text-[#191919] font-normal ">
                      {product.product.product.price.toLocaleString()} 원
                    </p>
                  </div>
                </div>
=======
          {/*{data?.results.products.map((product, index) => {*/}
          {/*  return (*/}
          <div key={data?.results.id}>
            <div className="flex flex-row items-center my-2">
              <div className="w-20 h-20 relative">
                <ImgAtom
                  exist={
                    data?.results.products[0].product.product.backdrop_image!
                  }
                  src={
                    data?.results.products[0].product.product.backdrop_image!
                  }
                  width={80}
                  height={80}
                  alt={String(data?.results.products[0].id)}
                />
>>>>>>> Stashed changes
              </div>
              <div className="ml-2 flex flex-col">
                <p className="text-[#767676] text-sm">{data?.results.name}</p>
                <p className="text-[#191919] font-normal ">
                  {data?.results.products[0].product.product.price.toLocaleString()}
                  원
                </p>
              </div>
            </div>
          </div>
          {/*  );*/}
          {/*})}*/}
        </div>
        <div className="max-w-4xl m-auto border-b border-[#EDEDED] flex justify-center mt-1"></div>
        <div className="p-3">
          <div className="flex items-center justify-between ">
            <span className="text-[#767676] text-sm">주문금액</span>
            <span className="text-sm">
              {data?.results.price.toLocaleString()} 원
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[#767676] text-sm">배송비</span>
            <span className="text-sm">3,000 원</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[#767676] text-sm">쿠폰 사용</span>
            <span className="text-sm">{data?.results.coupon ?? 0} 원</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[#767676] text-sm">포인트 사용</span>
            <span className="text-sm">
<<<<<<< Updated upstream
              {data?.results.used_point.toLocaleString()} 원
=======
              {data?.results.used_point.toLocaleString() ?? 0} 원
>>>>>>> Stashed changes
            </span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[#191919] text-[16px]">최종 결제 금액</span>
            <span className="text-sm">{finalPrice.toLocaleString()} 원</span>
          </div>
        </div>
        <div className="my-10 text-center">
          <button
            className="w-48 h-12 bg-main rounded-lg text-sm font-semibold text-white"
            onClick={async () => await router.push("/")}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}

<<<<<<< Updated upstream
export interface OrderResponse {
  address: {
    address: string;
    detail_address: string;
    id: number;
    is_main: boolean;
    memo?: string;
    name: string;
    phone_number: string;
    recipient: string;
    road_name_address: string;
    zip_code: string;
  };
  coupon?: string;
  created: string;
  id: number;
  is_confirm: boolean;
  is_payment_confirm: boolean;
  method: string;
  name: string;
  order_number: string;
  order_status: string;
  payment: {
    created: string;
    id: number;
    is_deleted: boolean;
    method: string;
    name: string;
    order: number;
    payment_key: string;
    platform: string;
    price: number;
    recipient_url: string;
    updated: string;
  };
  price: number;
  products: {
    count: number;
    discount?: number;
    id: number;
    is_review_written: boolean;
    option?: string;
    order: number;
    product: {
      id: number;
      image: string;
      product: {
        backdrop_image: string;
        id: number;
        is_wish: boolean;
        name: string;
        price: number;
      };
    };
    profile: number;
  }[];
  used_point: number;
}

=======
>>>>>>> Stashed changes
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["order", id], () => getOrder(id as string));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Success;
