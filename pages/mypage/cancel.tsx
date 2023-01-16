import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "../../components/pages/mypage/sidetab";
import CancelComp from "@components/pages/mypage/cancelcomp";
import Head from "next/head";

function MyOrder() {
  return (
    <>
      <Head>
        <title>취소/교환/환불 내역</title>
      </Head>
      <div className="m-auto">
        <TopInfo />
        <div className="max-w-4xl m-auto">
          <div className="flex flex-row">
            <SideTab num={1} />
            <CancelComp />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrder;
