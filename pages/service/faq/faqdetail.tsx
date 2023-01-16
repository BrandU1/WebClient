import FaqDetailComp from "@components/pages/service/faq/faqdetailcomp";
import { useRouter } from "next/router";
import Head from "next/head";
import FaqComp from "@components/pages/service/faq";

function FaqDetail() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>자주 묻는 질문</title>
      </Head>
      <div>
        <FaqDetailComp data={router.query} />
      </div>
    </>
  );
}

export default FaqDetail;
