import BasketList from "@components/basket/basketlist";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../types/privacy";
import Loading from "@common/loading";
import { ProductInterface } from "../../types/product";

export interface CustomProduct {
  id: number;
  product: ProductInterface;
  profile: number;
  image: string;
}

export interface Basket {
  custom_product: CustomProduct;
  amount: number;
  is_purchase: boolean;
}

function Index() {
  const getBasketList = () => {
    return client.get(`accounts/baskets`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<Basket[]>>(
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
