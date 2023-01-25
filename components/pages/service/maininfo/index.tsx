import { MainInfoInterface } from "../../../../types/service";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../../types/privacy";
import Link from "next/link";

function MainInfoComp() {
  const getMainInfo = () => {
    return client.get("services/main_infos").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<MainInfoInterface[]>>(
    ["mainInfo"],
    getMainInfo
  );

  console.log(data);
  return (
    <>
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 서비스 주요 안내</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        {data?.results.map((info, index) => {
          return (
            <Link key={index} href={`/service/maininfo/${info.id}`}>
              <div className="border-b border-gray mt-5 pb-5 flex justify-between px-5">
                <p>{info.title}</p>
                <p className="text-sm text-subContent">
                  {info.created.substring(0, 10)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default MainInfoComp;
