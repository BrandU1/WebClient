import Notice from "@components/pages/notice/noticecomp";
import Head from "next/head";

function NoticePage() {
  return (
    <>
      <Head>
        <title>공지사항</title>
      </Head>
      <div className="max-w-4xl m-auto">
        <Notice />
      </div>
    </>
  );
}
export default NoticePage;
