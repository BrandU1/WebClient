import { useEffect, useState } from "react";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, FollowList } from "../../../types/privacy";

interface FollowProp {
  tab: number;
}
function FollowComp({ tab }: FollowProp) {
  const [followTab, setFollowTab] = useState<number>(0);

  useEffect(() => {
    setFollowTab(tab);
  }, [tab]);

  const getFollow = () => {
    return client.get("accounts/follows").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<FollowList>>(
    ["follow"],
    getFollow
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">팔로워/팔로잉</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="border border-main w-full rounded-lg flex justify-evenly mt-5 overflow-hidden">
        <button
          onClick={() => setFollowTab(0)}
          className={`w-full py-[10px] font-bold ${
            followTab === 0 ? "bg-main text-white" : "text-main"
          }`}
        >
          <span>팔로워 ({data?.results.follower.length})</span>
        </button>
        <button
          onClick={() => setFollowTab(1)}
          className={`w-full py-[10px] font-bold ${
            followTab === 1 ? "bg-main text-white" : "text-main"
          }`}
        >
          <span>팔로잉 ({data?.results.following.length})</span>
        </button>
      </div>
      {/*팔로워 리스트*/}
      <div className={`${followTab === 1 ? "hidden" : null}`}>
        <div className="mt-5 grid grid-cols-3 justify-between space-5">
          {data?.results.follower.map((follower, index) => {
            return (
              <div
                className="flex flex-row justify-between mb-5 ml-5 "
                key={index}
              >
                <div className="flex flex-row">
                  <div className="w-9 h-9 bg-gray rounded-xl" />
                  <div className="flex flex-col text-[12px] ml-2">
                    <p>{follower.nickname}</p>
                    <p className="text-subContent">{follower.social_link}</p>
                  </div>
                </div>
                <button className="border border-main rounded-xl text-main w-14 h-7 text-sm">
                  팔로잉
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/*팔로잉 리스트*/}
      <div className={`${followTab === 0 ? "hidden" : null}`}>
        <div className="mt-5 grid grid-cols-3 justify-between space-5">
          {data?.results.following.map((following, index) => {
            return (
              <div
                className="flex flex-row justify-between mb-5 ml-5 "
                key={index}
              >
                <div className="flex flex-row">
                  <div className="w-9 h-9 bg-gray rounded-xl" />
                  <div className="flex flex-col text-[12px] ml-2">
                    <p>{following.nickname}</p>
                    <p className="text-subContent">{following.social_link}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FollowComp;
