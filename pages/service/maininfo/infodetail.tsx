import { useRouter } from "next/router";
import MainInfoDetail from "@components/pages/service/maininfo/maininfodetail";
import Head from "next/head";
import MainInfoComp from "@components/pages/service/maininfo";

function InfoDetail() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>서비스 주요 안내</title>
      </Head>
      <div>
        <MainInfoDetail detail={router.query} />
      </div>
    </>
  );
}

export default InfoDetail;
