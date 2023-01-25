import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { useState } from "react";
import { FollowingListAtom, myFollowingList } from "../../recoil/followlist";
import { useRecoilState } from "recoil";
import { FollowList } from "../../types/privacy";

interface FollowProps {
  following: number;
  height: number;
  weight: number | string;
}

function FollowBtn({ following, height, weight }: FollowProps) {
  const queryClient = useQueryClient();

  // 팔로우 상태
  const [follows, getFollows] =
    useRecoilState<myFollowingList>(FollowingListAtom);

  const handleFollowing = useMutation(
    (id: number) => {
      //팔로우 취소
      if (follows.followings.includes(id)) {
        // @ts-ignore
        return client.delete(`/accounts/follows/${id}`, id);
        const temp = { ...follows };
        temp.followings = temp.followings.filter((list) => list !== id);
        getFollows(temp);
      } else {
        //팔로우하기
        return client.post(`/accounts/follows/${id}`, id);
        const temp = { ...follows };
        temp.followings = [...temp.followings, id];
        getFollows(temp);
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["follows"]);
      },
    }
  );

  return (
    <div className="button">
      <button
        onClick={() => {
          handleFollowing.mutate(following);
        }}
        className={`h-${height} w-${weight} text-sm rounded-xl ${
          follows.followings.includes(following)
            ? "bg-gray text-black"
            : "bg-main text-white"
        }`}
      >
        팔로우
      </button>
    </div>
  );
}

export default FollowBtn;
