import Post from "@components/pages/community/post";
import SidePost from "@components/pages/community/sidepost";
import Recommend from "@components/pages/community/recommend";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, Community } from "../../../types/privacy";

function PostPage() {
  const getEdit = () => {
    return client.get("/communities/posts/40").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<Community>>(
    ["edit"],
    getEdit
  );

  return (
    <div className="flex flex-row mt-5">
      <div className="flex flex-col">
        <Post data={data?.results!} />
        <Recommend />
      </div>
      <SidePost />
    </div>
  );
}

export default PostPage;
