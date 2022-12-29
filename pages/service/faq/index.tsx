import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../types/privacy";
import { FaqInterface, MainInfoInterface } from "../../../types/service";
import { useRouter } from "next/router";
import MainInfoComp from "@components/pages/service/maininfo";
import FaqComp from "@components/pages/service/faq";

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
    <div>
      <FaqComp data={faqData?.results!} />
    </div>
  );
}

export default FaqPage;
