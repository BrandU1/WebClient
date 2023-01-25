import useBranduQuery from "@hooks/useBranduQuery";
import { OrderResponse } from "../../../types/privacy";
import client from "@lib/api";
import { useRecoilValue } from "recoil";
import { userData } from "../../../recoil/user";

interface inquiryProp {
  detail: any;
}

const getOrder = async (id: string) => {
  const response = await client.get(`/orders/order/${id}`);
  return response.data;
};

function Inquiry({ detail }: inquiryProp) {
  const userInfo = useRecoilValue(userData);

  const { data, isLoading, isError } = useBranduQuery<OrderResponse>({
    queryKey: ["order", detail.id],
    queryFn: () => getOrder(detail.id as string),
  });
  return (
    <div className="pl-5 flex flex-col flex-1 mt-10">
      <div className="title flex flex-row items-center border-b pb-5">
        <span className="font-bold text-lg">상세조회</span>
        <span className="text-lg ml-3">
          [주문번호 : {data?.results.order_number}]
        </span>
      </div>
      <div className="flex flex-row justify-between border-b border-gray pb-4 mt-5">
        <div className="flex flex-row">
          <div className="flex items-center flex-col">
            <span>{data?.results.created.slice(0, 10)} 주문</span>
            <div className="w-24 h-24 bg-gray rounded-xl" />
          </div>
          <div className="flex flex-col ml-7">
            <span className="text-sm font-bold mb-3">
              {data?.results.order_status}
            </span>
            <span className="text-sm mb-1">{data?.results.name}</span>
            <span className="font-bold text-sm mb-5">
              {Number(data?.results.price).toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mr-3">
          <button className="w-24 h-9 bg-white text-main text-sm border border-main rounded-xl flex justify-center items-center">
            배송조회
          </button>
          {/*<button className="w-24 h-9 bg-white text-main text-sm border border-main rounded-xl flex justify-center items-center">*/}
          {/*  주문취소*/}
          {/*</button>*/}
        </div>
      </div>
      <div className="orderer px-5 mt-5 border-b border-gray pb-4">
        <span className="text-base">주문자</span>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start mt-[10px]">
            <p>보내는 분</p>
            <p>연락처</p>
            <p>이메일</p>
          </div>
          <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
            <p>{userInfo.user.name}</p>
            <p>{userInfo.user.phone_number}</p>
            <p>{userInfo.user.email}</p>
          </div>
        </div>
      </div>
      <div className="delivery px-5 mt-5 border-b border-gray pb-4">
        <span className="text-base">배송지</span>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-[10px] text-subContent text-sm justify-start mt-[10px]">
            <p>받는 분</p>
            <p>연락처</p>
            <p>주소</p>
          </div>
          <div className="flex flex-col space-y-[10px] text-sm justify-start px-5 mt-[10px]">
            <p>{data?.results.address.recipient}</p>
            <p>{data?.results.address.phone_number}</p>
            <p>{data?.results.address.address}</p>
          </div>
        </div>
      </div>
      <div className="payment flex flex-col justify-between mt-5 mx-5">
        <span className="text-base mb-3">결제 정보</span>
        <div className="text-sm flex justify-between ">
          <div>
            <span className="text-subContent mr-[18px]">결제수단</span>
            <span>{data?.results.method}</span>
          </div>
          <div className="w-[250px]">
            <div className="flex justify-between">
              <p className="text-subContent text-sm ">총 주문금액</p>
              <p className=" text-sm ">
                {Number(data?.results.price).toLocaleString()}원
              </p>
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-subContent text-[14px] ">배송비</p>
              <p className="space-x-2 text-sm">3,000원 </p>
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-subContent text-[14px] ">쿠폰 사용</p>
              <p className="space-x-2 text-sm">0 원</p>
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-subContent text-[14px] ">포인트 사용</p>
              <p className="space-x-2 text-sm">
                {data?.results.used_point.toLocaleString()} 원
              </p>
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-subContent text-[14px]">최종 결제 금액</p>
              <p className="space-x-2 text-sm font-bold ">
                {Number(data?.results.price).toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[86px]">
          <button className="border border-main rounded-xl text-main text-sm py-2 px-3 mr-3">
            카드영수증
          </button>
          <button className="border border-main rounded-xl text-main text-sm py-2 px-3">
            거래명세서
          </button>
        </div>
        <div className="border-b border-gray pt-4" />
      </div>
    </div>
  );
}

export default Inquiry;
