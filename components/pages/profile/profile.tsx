import Image from "next/image";
import ScrapButton from "@common/scrapbutton";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  BestPost,
  BranduBaseResponse,
  communityProfile,
  FollowList,
} from "../../../types/privacy";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ImgAtom from "@atoms/imgatom";
import FollowBtn from "@common/followbtn";

function Profile() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);
  const id = +router.query.id!;

  const getProfile = () => {
    return client.get(`accounts/${id}`).then((res) => res.data);
  };

  const { data: profileData, isLoading: profileLoading } = useQuery<
    BranduBaseResponse<communityProfile>
  >(["postProfile", id], getProfile);

  const getPostData = () => {
    return client.get(`accounts/${id}/posts`).then((res) => res.data);
  };

  const { data: postData, isLoading: postLoading } = useQuery<
    BranduBaseResponse<BestPost[]>
  >(["myPost", id], getPostData);

  if (profileLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col max-w-4xl mt-5">
      <div className="profileInfo relative">
        <div className="w-full h-52 rounded-xl bg-gray" />
        <div className="w-24 h-24 rounded-xl bg-subContent flex justify-center items-center absolute top-36 left-6">
          <ImgAtom
            exist={profileData?.results.profile_image!}
            src={profileData?.results.profile_image!}
            width={160}
            height={160}
            alt={profileData?.results.nickname!}
          />
        </div>
        <div className="flex flex-row justify-end mt-6 text-sm items-center">
          <div
            className="flex flex-row"
            onClick={() => {
              router.push({
                pathname: `/profile/${profileData?.results.id}/follow`,
                query: {
                  tab: 0,
                },
              });
            }}
          >
            <p className="mr-0.5">팔로워</p>
            <p className="font-bold">{profileData?.results.followers}</p>
          </div>
          <p className="mx-1">|</p>
          <div
            className="flex flex-row"
            onClick={() => {
              router.push({
                pathname: `/profile/${profileData?.results.id}/follow`,
                query: {
                  tab: 1,
                },
              });
            }}
          >
            <p className="mr-0.5">팔로잉</p>
            <p className="font-bold">{profileData?.results.followings}</p>
          </div>

          {/*<FollowBtn following={id} height={7} weight={14} />*/}

          <button className="bg-main text-white w-14 h-7 rounded-xl ml-2">
            팔로우
          </button>
        </div>
        <div className="px-7">
          <h2 className="font-bold text-lg">{profileData?.results.nickname}</h2>
          <h2>{profileData?.results.email}</h2>
          <h2 className="mt-2 text-subContent">
            {profileData?.results.description}
          </h2>
        </div>
      </div>
      <div className="border-b border-gray w-full my-5" />
      <div className="postedList px-6">
        <h2>게시물 {postData?.results.length} 개 </h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {postData?.results.map((post, index) => {
            return (
              <div key={index} className="relative">
                <div className="w-48 h-48 bg-[#fff] rounded-xl">
                  <Image
                    src={post.backdrop_image || ""}
                    alt="backgroundImage"
                    width={160}
                    height={160}
                  />
                </div>

                <div className="absolute top-36 left-36">
                  {/*<ScrapButton width={14} height={18} />*/}
                </div>
                <h2 className="text-subContent text-sm mt-2">{post.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b border-gray w-full mt-5 mb-24" />
    </div>
  );
}
export default Profile;
