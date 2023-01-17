import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import PointComp from "@components/pages/mypage/pointcomp";
import Head from "next/head";

function MyOrder() {
  return (
    <>
      <Head>
        <title>포인트</title>
      </Head>
      <div className="m-auto">
        <TopInfo />
        <div className="max-w-4xl m-auto">
          <div className="flex flex-row">
            <SideTab num={5} />
            <PointComp />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrder;
