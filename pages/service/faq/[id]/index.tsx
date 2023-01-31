import FaqDetailComp from "@components/pages/service/faq/faqdetailcomp";
import { useRouter } from "next/router";
import Head from "next/head";
import FaqComp from "@components/pages/service/faq";
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
        <title>자주 묻는 질문</title>
      </Head>
      <div>
        <FaqDetailComp id={String(id)} />
      </div>
    </>
  );
}

export default Index;
