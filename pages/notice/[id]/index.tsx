import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import InquiryDetailComp from "@components/pages/service/inquiry/inquirydetail";
import Noticecomp from "@components/pages/notice/noticecomp";
import NoticeDetailComp from "@components/pages/notice/noticedetail";

function NoticeDetail() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);
  const id = +router.query.id!;
  return (
    <>
      <Head>
        <title>공지사항</title>
      </Head>
      <div>
        <NoticeDetailComp id={String(id)} />
      </div>
    </>
  );
}

export default NoticeDetail;
