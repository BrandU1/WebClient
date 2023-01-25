import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, Inquiry } from "../../../types/privacy";

interface NoticeProp {
  id: string;
}
function NoticeDetailComp({ id }: NoticeProp) {
  const getNotice = () => {
    return client.get(`/services/notices/${+id}`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<Inquiry>>(
    ["inquiry"],
    getNotice
  );

  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">공지사항</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col border-b border-gray pb-5 px-2">
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

export default NoticeDetailComp;
