import type { ReactElement } from "react";
import React, { useRef, useState } from "react";
import Badge from "@atoms/badge";
import Basket from "@common/basket";
import Canvas from "@components/ImageCustom/canvas";
import ImageSelect from "@components/pages/custom/imageselect";
import client from "@lib/api";
import { GetServerSideProps } from "next";
import { useQuery } from "@tanstack/react-query";
import CustomIcon from "@components/pages/product/customicon";
import PickButton from "@components/pick/pickbutton";
import { useRecoilState } from "recoil";
import { canvasImage } from "../../../../recoil/canvas";
import { useRouter } from "next/router";
import Head from "next/head";
import { BranduBaseResponse } from "../../../../types/privacy";

export enum CanvasState {
  DRAG = "DRAG",
  DRAW = "DRAW",
  IMAGE = "IMAGE",
}

export interface Product {
  id: number;
  tags: Tags[];
  images: any[];
  options: [];
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  backdrop_image: string;
  price: number;
  brand: number;
  category: number;
  view_count: number;
}

export interface Tags {
  id: number;
  name: string;
}

export interface CustomProps {
  basketList: Product;
}

interface ProductCustomProps {
  id: number;
}

function ProductCustom({ id }: ProductCustomProps): ReactElement {
  const router = useRouter();
  const idx = router.query.id;
  // const { data: productResponse, isLoading: productLoading } =
  //   useBranduQuery<Product>({
  //     queryKey: ["product", id],
  //     queryFn: () => getProduct(id),
  //   });

  const getProducts = async () => {
    return client.get(`products/${idx}`).then((res) => res.data);
  };
  const { data: productResponse, isLoading: productLoading } = useQuery<
    BranduBaseResponse<Product>
  >(["product", id], getProducts);

  const createCustomProduct = async () => {
    const response = await client.post("products/customs", {
      product: id,
      image: customImage === "" ? "custom image none" : customImage,
    });
    if (response.status === 201) {
      await router.push("/basket");
    }
  };

  console.log(productResponse, "test");

  const [customImage, _] = useRecoilState(canvasImage);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const [images, setImages] = useState<string[]>([]);

  const imgSelectEl = useRef<HTMLDivElement>(null);
  const handleSelectModal = (e: any) => {
    if (!imgSelectEl.current?.contains(e.target)) {
      handleSelectClose();
    }
  };
  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  if (productLoading) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>{productResponse?.results.name}</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <CustomIcon handleSelect={handleSelectOpen} />
        <div className="w-screen h-[1px] bg-gray" />
        <div className="flex flex-row m-auto mt-3 z-30 ">
          <Canvas
            canvasRef={canvasRef}
            images={images}
            backgroundImage={`${productResponse?.results.backdrop_image}`}
            width={500}
            height={500}
          />
          <div className="flex  flex-col m-5">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="productName text-base">
                  {productResponse?.results.name}
                </span>
                <div className="flex flex-row my-1 space-x-1">
                  {productResponse?.results.tags.map((tag, index) => {
                    return (
                      <span
                        className="text-subContent text-xs cursor-pointer"
                        key={index}
                      >
                        #{tag?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Badge color={"red"} />
            </div>

            <div className="price ">
              <div className="flex justify-end">
                <span className="font-bold text-lg">
                  {productResponse?.results.price.toLocaleString()}
                </span>
                <span className="text=sm ml-1">원</span>
              </div>
              <div className="text-main flex justify-end items-center">
                <span className="text-xs mr-[9px]">(시즌 특가)</span>
                <span className="font-bold text-lg">
                  {/*{data?.price.toLocaleString()}*/}
                  {(productResponse?.results.price! - 4000).toLocaleString()}
                </span>
                <span className="text=sm ml-1">원</span>
              </div>
            </div>
            {/* 색상 및 사이즈 대신 커스터마이징 관련 프로세스로 처리 */}
            <div className="border border-t-0 w-[314px] my-[22px] border-gray" />
            {/*<div className="color flex flex-col mb-[10px]">*/}
            {/*  <span className="text-xs mb-[10px]">색상</span>*/}
            {/*</div>*/}
            {/*<div className="size flex flex-col mb-[10px]">*/}
            {/*  <span className="text-xs mb-[10px]">사이즈</span>*/}
            {/*  <div className="space-x-[10px]">*/}
            {/*    <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">*/}
            {/*      XL*/}
            {/*    </button>*/}
            {/*    <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">*/}
            {/*      L*/}
            {/*    </button>*/}
            {/*    <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">*/}
            {/*      M*/}
            {/*    </button>*/}
            {/*    <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">*/}
            {/*      S*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="flex flex-row mt-5 space-x-[10px] items-center">
              <div className="w-11 h-11">
                <PickButton
                  id={productResponse?.results.id!}
                  wish={productResponse?.results.is_wish!}
                  li_width={24}
                  li_height={24}
                />
              </div>
              <Basket
                li_height={22}
                li_width={22}
                bg_height={45}
                bg_width={45}
                li_color={"white"}
              />
              <button
                onClick={createCustomProduct}
                className="w-64 h-11 bg-main rounded-xl ml-[10px] flex flex-row justify-center items-center"
              >
                <span className="text-white font-bold text-sm">구매하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectOpen && (
        <div
          onClick={handleSelectModal}
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-40"
        >
          <div className="mt-[70px] flex justify-center">
            <div ref={imgSelectEl}>
              <ImageSelect
                images={images}
                setImages={setImages}
                handleSelectClose={handleSelectClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(["product", id], () =>
  //   getProduct(Number(id))
  // );

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      id: Number(id),
    },
  };
};

export default ProductCustom;
