import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../types/privacy";
import { MainInfoInterface } from "../../../types/service";
import { useRouter } from "next/router";
import MainInfoComp from "@components/pages/service/maininfo";

function MainInfo() {
  const getMainInfo = () => {
    return client.get("services/main_infos").then((res) => res.data);
  };
  const { data: mainInfoData, isLoading: mainInfoIsLoading } = useQuery<
    BranduBaseResponse<MainInfoInterface[]>
  >(["mainInfo"], getMainInfo);

  return (
    <div className="m-auto">
      <MainInfoComp info={mainInfoData?.results!} />
    </div>
  );
}

export default MainInfo;
