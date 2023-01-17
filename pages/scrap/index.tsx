import Head from "next/head";
import ScrapList from "@components/scrap/scraplist";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, searchPost } from "../../types/privacy";

function Scrap() {
  const getScrap = () => {
    return client.get(`accounts/scraps`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<searchPost[]>>(
    ["scrap"],
    getScrap
  );

  return (
    <>
      <Head>
        <title>스크랩북</title>
      </Head>
      <div>
        <ScrapList data={data?.results!} />
      </div>
    </>
  );
}

export default Scrap;
