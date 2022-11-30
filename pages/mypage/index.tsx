import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "../../components/pages/mypage/sidetab";
import PayInfo from "@components/pages/mypage/payinfo";

function MyOrder() {
  return (
    <div className="max-w-4xl m-auto">
      <TopInfo />
      <div className="flex flex-row">
        <SideTab num={0} />
        <PayInfo />
      </div>
    </div>
  );
}

export default MyOrder;
