import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import ReviewComp from "@components/pages/mypage/reviewcomp";
import Head from "next/head";

function Review() {
  return (
    <>
      <Head>
        <title>리뷰관리</title>
      </Head>
      <div className=" m-auto">
        <TopInfo />
        <div className="max-w-4xl m-auto">
          <div className="flex flex-row">
            <SideTab num={2} />
            <ReviewComp />
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
