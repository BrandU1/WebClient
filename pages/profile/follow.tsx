import FollowComp from "@components/pages/profile/followcomp";
import { useRouter } from "next/router";
import Head from "next/head";

function FollowPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>팔로워</title>
      </Head>
      <div>
        <FollowComp tab={+router.query.tab!} />
      </div>
    </>
  );
}

export default FollowPage;
