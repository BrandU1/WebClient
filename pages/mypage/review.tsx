import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import ReviewComp from "@components/pages/mypage/reviewcomp";

function Review() {
  return (
    <div className=" m-auto">
      <TopInfo />
      <div className="flex flex-row">
        <SideTab num={2} />
        <ReviewComp />
      </div>
    </div>
  );
}

export default Review;
