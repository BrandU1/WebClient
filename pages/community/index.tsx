import Community from "@components/pages/community/community";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BestPost, BranduBaseResponse } from "../../types/privacy";

function Index() {
  const getBestPost = () => {
    return client.get("communities/posts/best").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<BestPost[]>>(
    ["bestPost"],
    getBestPost
  );

  return (
    <div>
      <Community bestCommunity={data?.results!} />
    </div>
  );
}

export default Index;
