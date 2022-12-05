import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import PointComp from "@components/pages/mypage/pointcomp";

function MyOrder() {
  return (
    <div className="m-auto">
      <TopInfo />
      <div className="max-w-4xl m-auto">
        <div className="flex flex-row">
          <SideTab num={5} />
          <PointComp />
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
