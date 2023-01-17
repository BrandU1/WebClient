import PickList from "@components/pick/pick";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, pickInterface } from "../../types/privacy";
import Head from "next/head";

function Index() {
  const getPickList = () => {
    return client.get(`accounts/wishes`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<pickInterface[]>>(
    ["pickList"],
    getPickList
  );

  if (isLoading) return <div>로딩중</div>;

  return (
    <>
      <Head>
        <title>찜한 상품</title>
      </Head>
      <div>
        <PickList picks={data?.results!} />
      </div>
    </>
  );
}
export default Index;
