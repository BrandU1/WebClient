import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import CouponComp from "@components/pages/mypage/couponcomp";
import Head from "next/head";

function MyOrder() {
  return (
    <>
      <Head>
        <title>쿠폰</title>
      </Head>
      <div className="m-auto">
        <TopInfo />
        <div className="max-w-4xl m-auto">
          <div className="flex flex-row">
            <SideTab num={4} />
            <CouponComp />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrder;
