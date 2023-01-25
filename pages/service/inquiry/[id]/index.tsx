import { useRouter } from "next/router";
import InquiryDetailComp from "@components/pages/service/inquiry/inquirydetail";
import Head from "next/head";
import InquiryComp from "@components/pages/service/inquiry";
import { useEffect } from "react";

function InquiryDetail() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);
  const id = +router.query.id!;

  return (
    <>
      <Head>
        <title>1:1 문의내역</title>
      </Head>
      <div>
        <InquiryDetailComp id={String(id)} />
      </div>
    </>
  );
}

export default InquiryDetail;
