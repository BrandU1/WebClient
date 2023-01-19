import Store from "@components/pages/store/store";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, HotDeal } from "../../types/privacy";
import Head from "next/head";

function Index() {
  const getStore = () => {
    return client.get("products/contents/hot-deal").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<HotDeal[]>>(
    ["hotDeal"],
    getStore
  );

  return (
    <>
      <Head>
        <title>스토어</title>
      </Head>
      <div>
        <Store store={data?.results!} />
      </div>
    </>
  );
}

export default Index;
