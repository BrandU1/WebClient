import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import ProfileComp from "@components/pages/mypage/profilecomp";

function Profile() {
  return (
    <div className="m-auto">
      <TopInfo />
      <div className="flex flex-row">
        <SideTab num={6} />
        <ProfileComp />
      </div>
    </div>
  );
}

export default Profile;
