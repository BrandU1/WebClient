import { useRouter } from "next/router";
import { MainInfoInterface } from "../../../../types/service";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../../types/privacy";

interface MainInfoProp {
  info: MainInfoInterface[];
}

function MainInfoComp({ info }: MainInfoProp) {
  const router = useRouter();
  return (
    <>
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터 ＞ 서비스 주요 안내</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="flex flex-col">
        {info?.map((info, index) => {
          return (
            <div
              key={index}
              className="border-b border-gray mt-5 pb-5 flex justify-between px-5"
              onClick={() => {
                router.push(
                  {
                    pathname: "/service/maininfo/infodetail",
                    query: {
                      id: info.id,
                      title: info.title,
                      description: info.description,
                      created: info.created,
                    },
                  }
                  // `/service/maininfo/${info.id}`
                );
              }}
            >
              <p>{info.title}</p>
              <p className="text-sm text-subContent">
                {info.created.substring(0, 10)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default MainInfoComp;
