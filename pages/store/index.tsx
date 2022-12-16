import Store from "@components/pages/store/store";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, HotDeal } from "../../types/privacy";

function Index() {
  const getStore = () => {
    return client.get("products/contents/hot-deal").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<HotDeal[]>>(
    ["store"],
    getStore
  );

  return (
    <div>
      <Store store={data?.results!} />
    </div>
  );
}

export default Index;
