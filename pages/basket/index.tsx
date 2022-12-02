import BasketList from "@components/basket/basketlist";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { basketInterface, BranduBaseResponse } from "../../types/privacy";
import Loading from "@common/loading";

function Index() {
  const getBasketList = () => {
    return client.get(`accounts/baskets`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<basketInterface[]>>(
    ["basketList"],
    getBasketList
  );

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div>
      <BasketList basketList={data?.results!} />
    </div>
  );
}
export default Index;
