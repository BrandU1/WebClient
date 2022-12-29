import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, Inquiry } from "../../../../types/privacy";

interface InquiryProp {
  id: string;
}
function InquiryDetailComp({ id }: InquiryProp) {
  const getInquiryDetail = () => {
    return client.get(`/services/inquiries/${+id}`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<Inquiry>>(
    ["inquiry", id],
    getInquiryDetail
  );

  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">1:1 문의내역</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col border-b border-gray pb-5 px-5">
        <div className="mt-5 flex justify-between">
          <p>{data?.results.title}</p>
          <p className="text-sm text-subContent">
            {String(data?.results.created)?.substring(0, 10)}
          </p>
        </div>
        <p className="mt-5 text-sm">{data?.results.description}</p>
      </div>
    </div>
  );
}

export default InquiryDetailComp;
