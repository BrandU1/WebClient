import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../types/privacy";
import { FaqInterface, MainInfoInterface } from "../../../types/service";
import { useRouter } from "next/router";
import MainInfoComp from "@components/pages/service/maininfo";
import FaqComp from "@components/pages/service/faq";
import Head from "next/head";
import Service from "@components/pages/service";

function FaqPage() {
  const getFaq = () => {
    return client.get("services/faqs").then((res) => res.data);
  };
  const { data: faqData, isLoading: faqIsLoading } = useQuery<
    BranduBaseResponse<FaqInterface[]>
  >(["faq"], getFaq);

  if (faqIsLoading) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <>
      <Head>
        <title>자주 묻는 질문</title>
      </Head>
      <div>
        <FaqComp data={faqData?.results!} />
      </div>
    </>
  );
}

export default FaqPage;
