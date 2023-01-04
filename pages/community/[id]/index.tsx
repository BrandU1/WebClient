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

function PostPage() {
  const router = useRouter();
  const id = router.query.id;

  const getEdit = () => {
    return client.get(`communities/posts/${id}`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<Community>>(
    ["edit", id],
    getEdit
  );

  const getRecommend = () => {
    return client
      .get(`communities/posts/${id}/comments`)
      .then((res) => res.data);
  };
  const { data: recommend, isLoading: recommendLoading } = useQuery<
    BranduBaseResponse<RecommendComment[]>
  >(["recommend", id], getRecommend);

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
