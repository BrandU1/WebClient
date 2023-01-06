import TopInfo from "@components/pages/mypage/topinfo";
import SideTab from "@components/pages/mypage/sidetab";
import AddressComp from "@components/pages/mypage/addresscomp";
import { AddressInterface } from "../../types/privacy";
import useBranduQuery from "@hooks/useBranduQuery";
import { getAddress } from "@lib/fetches";

function Address() {
  const { data, isLoading } = useBranduQuery<AddressInterface[]>({
    queryKey: ["address"],
    queryFn: getAddress,
  });

  return (
    <div className="m-auto">
      <TopInfo />
      <div className="max-w-4xl m-auto">
        <div className="flex flex-row">
          <SideTab num={3} />
          <AddressComp address={data?.results!} />
        </div>
      </div>
    </div>
  );
}

export default Address;
