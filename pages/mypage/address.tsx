import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import AddressComp from "@components/pages/mypage/addresscomp";
import {
  AddressInterface,
  BranduBaseResponse,
  pickInterface,
} from "../../types/privacy";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";

function Address() {
  const getAddress = () => {
    return client.get(`accounts/addresses`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<AddressInterface[]>>(
    ["address"],
    getAddress
  );

  return (
    <div className=" m-auto">
      <TopInfo />
      <div className="flex flex-row">
        <SideTab num={3} />
        <AddressComp address={data?.results!} />
      </div>
    </div>
  );
}

export default Address;
