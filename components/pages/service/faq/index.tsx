import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../../types/privacy";
import { FaqInterface } from "../../../../types/service";
import { useRouter } from "next/router";
import Link from "next/link";

function FaqComp() {
  const getFaq = () => {
    return client.get("services/faqs").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<FaqInterface[]>>(
    ["faq"],
    getFaq
  );

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <>
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 자주 묻는 질문</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        {data?.results.map((faq, index) => {
          return (
            <Link key={index} href={`/service/faq/${faq.id}`}>
              <div className="border-b border-gray mt-5 pb-5 flex justify-between px-5">
                <p>{faq.title}</p>
                <p className="text-sm text-subContent">
                  {faq.created.substring(0, 10)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default FaqComp;
