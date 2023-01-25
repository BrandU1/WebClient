import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, Inquiry } from "../../../types/privacy";
import { NoticeInterface } from "../../../types/service";
import Link from "next/link";

function Notice() {
  const getNotice = () => {
    return client.get(`/services/notices`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<Inquiry[]>>(
    ["inquiry"],
    getNotice
  );

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다</div>;
  }
  return (
    <div className=" m-auto min-h-[55vh] ">
      <div>
        <h2 className="py-5 font-bold text-xl">공지사항</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="contents">
        {data?.results.map((notice, index) => {
          return (
            <Link
              href={`/notice/${notice.id}`}
              key={index}
              className="flex flex-col px-2 py-4"
            >
              <div className="flex justify-between w-full pb-5">
                <h2 className="text-base">{notice.title}</h2>
                <p className="text-xs">{notice.created.slice(0, 10)}</p>
              </div>
              <div className="border-b-[1px] border-[#EDEDED]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Notice;
