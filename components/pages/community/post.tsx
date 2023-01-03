import Image from "next/image";
import { useState } from "react";
import Share from "@atoms/share";
import client from "@lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BranduBaseResponse,
  Community,
  RecommendComment,
} from "../../../types/privacy";

interface Post {
  data: Community;
  recommend: RecommendComment[];
}

function Post({ data, recommend }: Post) {
  const [text, setText] = useState<string>("");
  const onChange = (e: any) => {
    setText(e.target.value);
  };
  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (newRecom: RecommendComment["comment"]) => {
  //     return client.post(`communities/posts/${data?.id}/comments`, newRecom);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["recommend", data?.id]);
  //     },
  //   }
  // );
  return (
    <div className="flex flex-col w-[610px]">
      <div className="title border-b border-gray pb-5">
        <Image
          src={"/dummy/cat.png"}
          alt={"titleImg"}
          width={600}
          height={300}
          className="rounded-2xl"
        />
        <div className="mt-2 flex justify-between px-2">
          <h2 className="font-bold text-lg">{data?.title}</h2>
          <Share image={"/dummy/cat.png"} name={data?.title} />
        </div>
        <div className="flex flex-row items-center mt-5 px-2">
          <div className="w-9 h-9 bg-gray rounded-xl" />
          <div className="flex flex-col ml-2 text-xs">
            <h2>김이삭</h2>
            <h2 className="text-subContent">2022.12.21(수)</h2>
          </div>
        </div>
      </div>
      <div className="content mt-5 text-sm border-b border-gray pb-5 px-2">
        <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
      </div>
      <div className="reply mt-5">
        <div className="summary border-b border-gray pb-5 text-sm flex flex-row text-subContent">
          <p>좋아요</p>
          <p className="font-bold">3</p>
          <p className="ml-2">스크랩</p>
          <p className="font-bold">1</p>
          <p className="ml-2">댓글</p>
          <p className="font-bold">1</p>
          <p className="ml-2">조회</p>
          <p className="font-bold">422</p>
        </div>
        <div className="flex flex-row mt-5 border-b border-gray pb-5 px-2">
          {recommend?.map((recommend, index) => {
            return (
              <>
                <div className="w-9 h-9 bg-gray rounded-xl mr-2" />
                <div className="flex flex-col">
                  <h2 className="text-[12px]">{recommend?.profile}</h2>
                  <p className="text-[12px] text-subContent">
                    {recommend.comment}
                  </p>
                </div>
              </>
            );
          })}
        </div>
        <div className="mt-5">
          <input
            className="w-[520px] h-10 rounded-xl border border-main text-sm p-2 text-subContent focus:outline-none"
            onChange={onChange}
            type="text"
            placeholder="댓글을 입력해주세요"
            value={text}
          />
          <button className="font-bold text-sm text-white bg-main rounded-xl ml-2 h-10 w-[70px]">
            댓글달기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
