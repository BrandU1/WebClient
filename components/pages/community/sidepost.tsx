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
import Link from "next/link";
import FollowBtn from "@common/followbtn";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  myPostLikeList,
  myScrapList,
  PostLikedListAtom,
  PostScrapListAtom,
} from "../../../recoil/postlike";

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
        queryClient.invalidateQueries(["follows"]);
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

  //커뮤니티 작성자
  const getProfile = () => {
    return client.get(`accounts/${data.profile}`).then((res) => res.data);
  };
  const { data: profileData, isLoading } = useQuery<
    BranduBaseResponse<communityProfile>
  >(["postProfile", data?.profile], getProfile);

  const [likedList, setLikedList] =
    useRecoilState<myPostLikeList>(PostLikedListAtom);

  const handlePostLike = useMutation((id: number) => {
    //게시물 좋아요 취소
    if (likedList.postLiked.includes(id)) {
      const temp = { ...likedList };
      temp.postLiked = temp.postLiked.filter((list) => list !== id);
      setLikedList(temp);
      return client.delete(`/communities/posts/${id}/like`);
    } else {
      // 게시물 좋아요
      const temp = { ...likedList };
      temp.postLiked = [...temp.postLiked, id];
      setLikedList(temp);
      return client.post(`/communities/posts/${id}/like`, id);
    }
  });

  // // 스크랩 좋아요
  //
  // const [scrapList, setScrapList] =
  //   useRecoilState<myScrapList>(PostScrapListAtom);
  //
  // const handlePostScrap = useMutation((id: number) => {
  //   //스크랩 취소
  //   if (scrapList.postScraps.includes(id)) {
  //     const temp = { ...scrapList };
  //     temp.postScraps = temp.postScraps.filter((list) => list !== id);
  //     setScrapList(temp);
  //     return client.delete(`/accounts/scraps/${id}`);
  //   } else {
  //     // 스크랩 좋아요
  //     const temp = { ...scrapList };
  //     temp.postScraps = [...temp.postScraps, id];
  //     setScrapList(temp);
  //     return client.post(`/accounts/scraps/${id}`, id);
  //   }
  // });

  return (
    <div className="w-[214px] flex flex-col sticky top-40">
      <div className="flex flex-col border border-main rounded-xl h-[137px] p-5">
        <Link key={data?.id} href={`/profile/${data?.profile}`}>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row">
              <div className="w-9 h-9 bg-gray rounded-xl" />
              <div className="flex flex-col ml-2 text-[12px]">
                <p>{profileData?.results.nickname}</p>
                <div className="flex flex-row">
                  <p className="text-subContent">팔로워</p>
                  <p className="font-bold ml-1">
                    {profileData?.results.followings} 명
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
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
        </div>
      </div>
      <div className="flex flex-col items-center mt-14 space-y-10">
        <div
          className="border rounded-full w-14 h-14 border-gray shadow-2xl flex justify-center items-center"
          onClick={() => handlePostLike.mutate(data?.id)}
        >
          <HeartIcon
            color={`${
              likedList.postLiked.includes(data?.id) ? "#0CABA8" : "#DFDFE0"
            }`}
            width={28}
            height={32}
            border="#fff"
          />
        </div>
        <div
          // onClick={() => handlePostScrap.mutate(data?.id)}
          className="border rounded-full w-14 h-14 border-gray shadow-2xl flex justify-center items-center"
        >
          {/*<ScrapButton id={data?.id} scrap={} li_width={} li_height={}*/}
        </div>
      </div>
    </div>
  );
}

export default SidePost;
