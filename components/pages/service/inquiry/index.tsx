import Link from "next/link";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, Inquiry } from "../../../../types/privacy";

function InquiryComp() {
  const getInquiry = () => {
    return client.get("services/inquiries").then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<Inquiry[]>>(
    ["inquiry"],
    getInquiry
  );

  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">1:1 문의내역</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        {data?.results.map((inquiry, index) => {
          return (
            <Link href={`/service/inquiry/${inquiry.id}`}>
              <div className="border-b border-gray mt-5 pb-5 flex justify-between px-5">
                <p>{inquiry.title}</p>
                <p className="text-sm text-subContent">
                  {inquiry.created.substring(0, 10)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default InquiryComp;
