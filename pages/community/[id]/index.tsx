import Post from "@components/pages/community/post";
import SidePost from "@components/pages/community/sidepost";
import Recommend from "@components/pages/community/recommend";

function PostPage() {
  return (
    <div className="flex flex-row mt-5">
      <div className="flex flex-col">
        <Post />
        <Recommend />
      </div>
      <SidePost />
    </div>
  );
}

export default PostPage;
