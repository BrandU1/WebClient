import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import AddressComp from "@components/pages/mypage/addresscomp";

function Address() {
  return (
    <div className=" m-auto">
      <TopInfo />
      <div className="max-w-4xl m-auto">
        <div className="flex flex-row">
          <SideTab num={3} />
          <AddressComp />
        </div>
      </div>
    </div>
  );
}

export default Address;
