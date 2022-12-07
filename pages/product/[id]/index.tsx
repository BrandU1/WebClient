import Summary from "@components/pages/product/summary";
import DetailMenu from "@components/pages/product/detailmenu";
import Detail from "@components/pages/product/detail";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { ProductInfoInterface } from "../../../types/product";
import { BranduBaseResponse, Product } from "../../../types/privacy";

function ProductDetail() {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  useEffect(() => {
    setId(router.query.id as string);
  }, [router.isReady, router.query.id]);

  const getProduct = (id: number) => {
    return client.get(`products/${id}`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<Product>>(
    ["productSummary", id],
    () => getProduct(Number(id))
  );

  if (isLoading)
    return <div className="flex justify-center items-center">로딩중</div>;

  return (
    <div>
      <Summary productInfo={data?.results!} />
      <DetailMenu />
      <Detail />
    </div>
  );
}
export default ProductDetail;
