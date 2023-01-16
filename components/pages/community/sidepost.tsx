import Image from "next/image";
import ScrapButton from "@common/scrapbutton";
import client from "@lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import HeartIcon from "@icons/heart";
import ScrapIcon from "@icons/scrap";
import {
  BranduBaseResponse,
  Community,
  communityProfile,
  RecommendComment,
  UserInterface,
} from "../../../types/privacy";

interface Side {
  data: Community;
}

function SidePost({ data }: Side) {
  const queryClient = useQueryClient();

  // 팔로우 상태
  const [follows, getFollows] = useState<boolean>(false);

  // 팔로우하기
  const mutation = useMutation(
    (id: number) => {
      return client.post(`/accounts/follows/${id}`, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["edit"]);
        getFollows(true);
      },
    }
  );

  // 팔로우 취소
  const deleteFollows = useMutation(
    (id: any) => {
      return client.delete(`/accounts/follows/${id}`, id);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["follows"]);
      },
    }
  );

  const getProfile = () => {
    return client.get(`accounts/${data.profile}`).then((res) => res.data);
  };

  const { data: profileData, isLoading } = useQuery<
    BranduBaseResponse<communityProfile>
  >(["postProfile", data?.profile], getProfile);

  return (
    <div className="w-[214px] flex flex-col sticky top-40">
      <div className="flex flex-col border border-main rounded-xl h-[137px] p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <div className="w-9 h-9 bg-gray rounded-xl" />
            <div className="flex flex-col ml-2 text-[12px]">
              <h2>{profileData?.results.nickname}</h2>
              <div className="flex flex-row">
                <p className="text-subContent">팔로워</p>
                <p className="font-bold ml-1">
                  {profileData?.results.followings} 명
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="button flex mt-5 justify-between">
          <button
            onClick={() => {
              mutation.mutate(data?.profile);
            }}
            className={`h-11 w-full text-sm rounded-xl mr-2 ${
              follows ? "bg-gray text-black" : "bg-main text-white"
            }`}
          >
            팔로우
          </button>
          {/*<button*/}
          {/*  onClick={() => {*/}
          {/*    mutation.mutate(data?.profile);*/}
          {/*  }}*/}
          {/*  className={`h-11 w-full text-sm rounded-xl mr-2 ${*/}
          {/*    follows ? "bg-gray text-black" : "bg-main text-white"*/}
          {/*  }`}*/}
          {/*>*/}
          {/*  팔로우*/}
          {/*</button>*/}
        </div>
      </div>
      <div className="flex flex-col items-center mt-14 space-y-10">
        <div className="border rounded-full w-14 h-14 border-gray shadow-2xl flex justify-center items-center">
          <HeartIcon
            color={`${true ? "#0CABA8" : "#DFDFE0"}`}
            width={28}
            height={32}
            border="#fff"
          />
        </div>
        <div className="border rounded-full w-14 h-14 border-gray shadow-2xl flex justify-center items-center">
          <ScrapIcon
            color={`${false ? "#0CABA8" : "#DFDFE0"}`}
            width={28}
            height={32}
            stroke={"none"}
          />
        </div>
      </div>
    </div>
  );
}

export default SidePost;
