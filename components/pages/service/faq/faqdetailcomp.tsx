import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../../types/privacy";
import { FaqInterface } from "../../../../types/service";

interface FaqProp {
  id: string;
}
function FaqDetailComp({ id }: FaqProp) {
  const getFaq = () => {
    return client.get(`services/faqs/${id}`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<FaqInterface>>(
    ["faq"],
    getFaq
  );

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }
  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 자주 묻는 질문</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        <div className="mt-5 pb-5 flex justify-between px-2">
          <p>{data?.results.title}</p>
          <p className="text-sm text-subContent">
            {String(data?.results.created)?.substring(0, 10)}
          </p>
        </div>
        <p className="border-b border-gray mt-5 text-sm px-5 pb-5">
          {data?.results.description}
        </p>
      </div>
    </div>
  );
}

export default FaqDetailComp;
