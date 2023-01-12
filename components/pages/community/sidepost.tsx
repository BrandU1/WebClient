import Image from "next/image";
import ScrapButton from "@common/scrapbutton";
import client from "@lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function SidePost() {
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

  return (
    <div className="w-[214px] flex flex-col sticky top-40">
      <div className="flex flex-col border border-main rounded-xl h-[137px] p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <div className="w-9 h-9 bg-gray rounded-xl" />
            <div className="flex flex-col ml-2 text-[12px]">
              <h2>김이삭</h2>
              <div className="flex flex-row">
                <p className="text-subContent">팔로워</p>
                <p className="font-bold">299</p>
              </div>
            </div>
          </div>
        </div>
        <div className="button flex flex-row mt-5 justify-between">
          <button
            className={`h-11 w-36 text-sm rounded-xl mr-2 ${
              follows ? "bg-gray text-black" : "bg-main text-white"
            }`}
          >
            팔로우
          </button>
          <ScrapButton width={26} height={24} />
        </div>
      </div>
    </div>
  );
}

export default SidePost;
