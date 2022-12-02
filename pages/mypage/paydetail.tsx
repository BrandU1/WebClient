import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import Inquiry from "@components/pages/mypage/inquiry";

function PayDetail() {
  return (
    <div className=" m-auto">
      <TopInfo />
      <div className="flex flex-row">
        <SideTab num={0} />
        <Inquiry />
      </div>
    </div>
  );
}

export default PayDetail;
