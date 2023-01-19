import FollowComp from "@components/pages/profile/followcomp";
import { useRouter } from "next/router";
import Head from "next/head";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, FollowList } from "../../types/privacy";

function FollowPage() {
  const router = useRouter();
  const id = router.query.id;

  const getFollow = () => {
    return client.get(`accounts/follows/${id}`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<FollowList>>(
    ["follow"],
    getFollow
  );

  return (
    <>
      <Head>
        <title>팔로워</title>
      </Head>
      <div>
        <FollowComp data={data?.results!} tab={+router.query.tab!} />
      </div>
    </>
  );
}

export default FollowPage;
