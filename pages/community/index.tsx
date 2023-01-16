import Community from "@components/pages/community/community";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BestPost, BranduBaseResponse } from "../../types/privacy";
import Head from "next/head";

function Index() {
  const getBestPost = () => {
    return client.get("communities/posts/best").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<BestPost[]>>(
    ["bestPost"],
    getBestPost
  );

  console.log(data?.results);

  return (
    <>
      <Head>
        <title>커뮤니티</title>
      </Head>
      <Community bestCommunity={data?.results!} />
    </>
  );
}

export default Index;
