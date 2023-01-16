import Image from "next/image";
import Head from "next/head";

function Error() {
  return (
    <>
      <Head>
        <title>잘못된 페이지입니다</title>
      </Head>
      <div className="flex justify-center py-3">
        <Image src="/dummy/404.png" width={700} height={600} alt="404" />
      </div>
    </>
  );
}
export default Error;
