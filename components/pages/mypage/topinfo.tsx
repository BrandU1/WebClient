import Image from "next/image";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  BranduBaseResponse,
  SummaryOrder,
  SummaryProfile,
} from "../../../types/privacy";
import useBranduQuery from "@hooks/useBranduQuery";
import { useRecoilValue } from "recoil";
import { userData } from "../../../recoil/user";
import ImgAtom from "@atoms/imgatom";
import { useEffect, useState } from "react";

interface summary {}

function TopInfo() {
  const userInfo = useRecoilValue(userData);

  const getSummary = () => {
    return client.get("accounts/summary/profile").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<SummaryProfile>>(
    ["summary"],
    getSummary
  );

  const getSummaryOrder = () => {
    return client.get("accounts/summary/order").then((res) => res.data);
  };
  const { data: orderData, isLoading: orderLoading } = useBranduQuery<
    SummaryOrder[]
  >({
    queryKey: ["summary-order"],
    queryFn: getSummaryOrder,
  });

  const [orderStatus, getOrderStatus] = useState<number[]>([0, 0, 0, 0, 0]);
  useEffect(() => {
    orderData?.results.map((list, index) => {
      if (list.order_status == "결제 대기") {
        orderStatus[0] += list.count;
        orderStatus[1] = list.count;
        getOrderStatus([...orderStatus]);
      } else if (list.order_status == "결제 완료") {
        orderStatus[0] += list.count;
        orderStatus[2] = list.count;
        getOrderStatus([...orderStatus]);
      } else if (list.order_status == "배송 중") {
        orderStatus[0] += list.count;
        orderStatus[3] = list.count;
        getOrderStatus([...orderStatus]);
      } else if (list.order_status == "배송 완료") {
        orderStatus[0] += list.count;
        orderStatus[4] = list.count;
        getOrderStatus([...orderStatus]);
      }
    });
  }, [orderData?.results]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col max-w-4xl m-auto mt-5">
      <div className="flex flex-row w-full h-32 justify-between">
        <div className="profile bg-modalBackground rounded-xl w-60 h-32">
          <div className="flex flex-row space-x-2 flex flex-row items-center m-5">
            <div className="w-12 h-12 bg-gray rounded-full flex justify-center items-center ">
              <ImgAtom
                exist={userInfo?.user.profile_image!}
                src={userInfo.user.profile_image!}
                width={48}
                height={48}
                alt={userInfo.user.nickname!}
              />
            </div>
            <span className="font-bold text-base">
              {userInfo.user.nickname}
            </span>
            <span className="border border-main rounded-xl text-main text-xs px-1.5 py-1">
              일반회원
            </span>
          </div>
        </div>
        <div className="point bg-modalBackground rounded-xl h-32 space-x-10 flex flex-row px-6">
          <div className="coupon space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/coupon.svg"}
                alt={"coupon"}
                width={20}
                height={26}
              />
              <span className="text-subContent text-sm">쿠폰</span>
            </div>
            <span className="font-bold text-lg">
              {data?.results.coupon_count}
            </span>
          </div>
          <div className="point space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/point.svg"}
                alt={"point"}
                width={20}
                height={20}
              />
              <span className="text-subContent text-sm">포인트</span>
            </div>
            <span className="font-bold text-lg">{data?.results.point}</span>
          </div>
        </div>
        <div className="pay bg-modalBackground rounded-xl h-32 space-x-10 flex flex-row px-6">
          <div className="all space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/payall.svg"}
                alt={"payall"}
                width={16}
                height={20}
              />
              <span className="text-subContent text-sm">전체</span>
            </div>
            <span className="font-bold text-lg">{orderStatus[0]}</span>
          </div>
          <div className="all space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/paid.svg"}
                alt={"paid"}
                width={20}
                height={19}
              />
              <span className="text-subContent text-sm">결제대기</span>
            </div>
            <span className="font-bold text-lg">{orderStatus[1]}</span>
          </div>
          <div className="all space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/paid.svg"}
                alt={"paid"}
                width={20}
                height={19}
              />
              <span className="text-subContent text-sm">결제완료</span>
            </div>
            <span className="font-bold text-lg">{orderStatus[2]}</span>
          </div>

          <div className="all space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/shipping.svg"}
                alt={"shipping"}
                width={20}
                height={16}
              />
              <span className="text-subContent text-sm">배송 중</span>
            </div>
            <span className="font-bold text-lg">{orderStatus[3]}</span>
          </div>
          <div className="all space-y-2 flex flex-col justify-center items-center">
            <div className="space-x-1 flex flex-col justify-center items-center">
              <Image
                src={"/logo/delivered.svg"}
                alt={"delivered"}
                width={18}
                height={19}
              />
              <span className="text-subContent text-sm">배송 완료</span>
            </div>
            <span className="font-bold text-lg">{orderStatus[4]}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-12 bg-gray my-5" />
    </div>
  );
}

export default TopInfo;
