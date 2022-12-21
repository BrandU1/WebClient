import Summary from "@components/pages/product/summary";
import DetailMenu from "@components/pages/product/detailmenu";
import Detail from "@components/pages/product/detail";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse, Product } from "../../../types/privacy";
import { GetStaticPaths } from "next";

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
      <Detail productId={data?.results.id!} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  return {
    props: {
      id,
    },
  };
};

export default ProductDetail;
