import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../../types/privacy";
import { FaqInterface } from "../../../../types/service";
import { useRouter } from "next/router";

interface FaqProp {
  data: FaqInterface[];
}

function FaqComp({ data }: FaqProp) {
  const router = useRouter();
  return (
    <>
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 자주 묻는 질문</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        {data?.map((faq, index) => {
          return (
            <div
              key={index}
              className="border-b border-gray mt-5 pb-5 flex justify-between px-5"
              onClick={() => {
                router.push({
                  pathname: "/service/faq/faqdetail",
                  query: {
                    id: faq.id,
                    title: faq.title,
                    description: faq.description,
                    created: faq.created,
                  },
                });
              }}
            >
              <p>{faq.title}</p>
              <p className="text-sm text-subContent">
                {faq.created.substring(0, 10)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default FaqComp;
