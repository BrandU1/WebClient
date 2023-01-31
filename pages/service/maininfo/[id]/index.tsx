import { useRouter } from "next/router";
import MainInfoDetail from "@components/pages/service/maininfo/maininfodetail";
import Head from "next/head";
import MainInfoComp from "@components/pages/service/maininfo";
import { useEffect } from "react";

function Index() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);
  const id = +router.query.id!;

  return (
    <>
      <Head>
        <title>서비스 주요 안내</title>
      </Head>
      <div>
        <MainInfoDetail mainId={id} />
      </div>
    </>
  );
}

export default Index;
