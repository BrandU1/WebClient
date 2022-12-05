import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import ProfileComp from "@components/pages/mypage/profilecomp";
import client from "@lib/api";
import { BranduBaseResponse, UserInterface } from "../../types/privacy";
import { useQuery } from "@tanstack/react-query";

function Profile() {
  const getProfile = () => {
    return client.get(`accounts/me`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<UserInterface[]>>(
    ["profile"],
    getProfile
  );

  return (
    <div className="m-auto">
      <TopInfo />
      <div className="flex flex-row">
        <SideTab num={6} />
        <ProfileComp profile={data?.results!} />
      </div>
    </div>
  );
}

export default Profile;
