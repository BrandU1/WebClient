import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";

interface PointProps {
  point: number;
  point_history: PointHistory[];
}
interface PointHistory {
  id: number;
  memo: string;
  point: number;
  is_use: boolean;
  created: string;
}

function PointComp() {
  const getPointHistory = () => {
    return client.get(`accounts/point`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<PointProps>(["point"], getPointHistory);

  return (
    <div className="pl-5 flex flex-col flex-1 mt-10">
      <div className="title flex flex-row items-center justify-between border-b pb-5">
        <span className="font-bold text-lg">포인트</span>
        <div className="text-base">
          <span>보유 포인트</span>
          <span className="font-bold"> {data?.point}</span>
        </div>
      </div>
      <span className="text-base mt-5 mb-3 mx-2">적립 및 사용 내역</span>
      {data?.point_history.map((list, index) => {
        return (
          <div className="flex justify-between flex-row mx-2 mb-3" key={index}>
            <div className="flex flex-row text-xs text-subContent space-x-3">
              <span>{list.created.slice(0, 10)}</span>
              <span>{list.memo}</span>
            </div>
            <span className="font-bold text-xs ">
              {list.is_use ? (
                <p className="text-main">+ {list.point}</p>
              ) : (
                <p className="text-red">- {list.point}</p>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default PointComp;
