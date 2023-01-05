import Post from "@components/pages/community/post";
import SidePost from "@components/pages/community/sidepost";
import Recommend from "@components/pages/community/recommend";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  BranduBaseResponse,
  Community,
  RecommendComment,
} from "../../../types/privacy";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getEdit = (id: string) => {
  return client.get(`communities/posts/${id}`).then((res) => res.data);
};

const getRecommend = (id: string) => {
  return client.get(`communities/posts/${id}/comments`).then((res) => res.data);
};

function PostPage() {
  const router = useRouter();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setId(router.query.id as string);
  }, [router.isReady, router.query.id]);

  const { data, isLoading } = useQuery<BranduBaseResponse<Community>>(
    ["edit", id],
    () => getEdit(id)
  );

  const { data: recommend, isLoading: recommendLoading } = useQuery<
    BranduBaseResponse<RecommendComment[]>
  >(["recommend", id], () => getRecommend(id));

  return (
    <div className="flex flex-row mt-5">
      <div className="flex flex-col">
        <Post recommend={recommend?.results!} data={data?.results!} />
        {/*<Recommend />*/}
      </div>
      <SidePost />
    </div>
  );
}

export default PostPage;
