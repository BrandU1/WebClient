import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import Inquiry from "@components/pages/mypage/inquiry";
import Head from "next/head";

function PayDetail() {
  return (
    <>
      <Head>
        <title>상세조회</title>
      </Head>
      <div className=" m-auto">
        <TopInfo />
        <div className="max-w-4xl m-auto">
          <div className="flex flex-row">
            <SideTab num={0} />
            <Inquiry />
          </div>
        </div>
      </div>
    </>
  );
}

export default PayDetail;
