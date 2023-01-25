import { MainInfoInterface } from "../../../../types/service";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../../types/privacy";

interface MainInfoDetailProp {
  mainId: number;
}

function MainInfoDetail({ mainId }: MainInfoDetailProp) {
  const getMainInfoDetail = () => {
    return client.get(`services/main_infos/${mainId}`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<MainInfoInterface>>(
    ["mainInfo"],
    getMainInfoDetail
  );

  console.log(data);
  return (
    <div className="m-auto">
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 서비스 주요 안내</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        <div className="mt-5 pb-5 flex justify-between w-full px-2">
          <h2>{data?.results.title}</h2>
          <p className="text-sm text-subContent">
            {String(data?.results.created)?.substring(0, 10)}
          </p>
        </div>
        <p className="border-b border-gray px-5 mt-5 text-sm pb-5">
          {data?.results.description}
        </p>
      </div>
    </div>
  );
}
export default MainInfoDetail;
