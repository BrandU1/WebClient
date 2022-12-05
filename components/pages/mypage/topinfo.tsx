import Image from "next/image";

function TopInfo() {
  return (
    <div className="flex flex-col max-w-4xl m-auto mt-5">
      <div className="flex flex-row w-full h-32 justify-between">
        <div className="profile bg-modalBackground rounded-xl w-80 h-32">
          <div className="flex flex-row space-x-2 flex flex-row items-center m-5">
            <div className="w-12 h-12 bg-gray rounded-full flex justify-center items-center ">
              <Image
                src={"/logo/profile.svg"}
                alt={"nonProfile"}
                width={22}
                height={22}
              />
            </div>
            <span className="font-bold text-base">하늘보리</span>
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
            <span className="font-bold text-lg">0</span>
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
            <span className="font-bold text-lg">1,000</span>
          </div>
        </div>
        <div className="pay bg-modalBackground rounded-xl w-96 h-32 space-x-10 flex flex-row px-6">
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
            <span className="font-bold text-lg">3</span>
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
            <span className="font-bold text-lg">3</span>
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
            <span className="font-bold text-lg">1</span>
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
            <span className="font-bold text-lg">1</span>
          </div>
        </div>
      </div>
      <div className="w-full h-12 bg-gray my-5" />
    </div>
  );
}

export default TopInfo;
