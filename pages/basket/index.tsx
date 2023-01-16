import BasketList from "@components/basket/basketlist";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../types/privacy";
import Loading from "@common/loading";
import { ProductInterface } from "../../types/product";
import Head from "next/head";

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
    <>
      <Head>
        <title>장바구니</title>
      </Head>
      <BasketList basketList={data?.results!} />
    </>
  );
}

export default Index;
