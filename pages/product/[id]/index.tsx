import Summary from "@components/pages/product/summary";
import DetailMenu from "@components/pages/product/detailmenu";
import Detail from "@components/pages/product/detail";
import { useEffect, useState } from "react";
import { router } from "next/client";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { ProductInfoInterface } from "../../../types/product";

function ProductDetail() {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    setId(router.query.id as string);
  }, [router.isReady, router.query.id]);

  const getProduct = (id: string) => {
    if (!id) return null;
    return client.get(`products/${id}`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<ProductInfoInterface | null>(
    ["productSummary", id],
    () => getProduct(id)
  );

  if (isLoading)
    return <div className="flex justify-center items-center">로딩중</div>;

  return (
    <div>
      <Summary productInfo={data!} />
      <DetailMenu />
      <Detail />
    </div>
  );
}
export default ProductDetail;
