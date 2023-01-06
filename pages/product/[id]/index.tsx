import { useRouter } from "next/dist/client/router";
import client from "@lib/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import useBranduQuery from "@hooks/useBranduQuery";
import Image from "next/image";
import Badge from "@atoms/badge";
import { useRef, useState } from "react";
import Price from "@components/product/price";
import ProductNavigationBar from "@components/pages/product/detailmenu";
import ProductDetailBox from "@components/pages/product/detail";
import LoadingProgress from "@common/loading-progress";
import useAuth from "@hooks/useAuth";
import { useRecoilState } from "recoil";
import { isLoginModalOpen } from "../../../recoil/base";
import PickButton from "@components/pick/pickbutton";
import Share from "@atoms/share";
import ThreeJS from "@components/product/three";

export const getProduct = async (id: number) => {
  const response = await client.get(`products/${id}`);
  return response.data;
};

const getProductReviews = async (id: number) => {
  const response = await client.get(`products/${id}/reviews`);
  return response.data;
};

export interface Product {
  id: number;
  tags: {
    id: number;
    name: string;
  }[];
  images: {
    kind: string;
    image: string;
  }[];
  options: {
    id: number;
    color: {
      name: string;
      hashcode: string;
    };
    size: string;
    count: number;
  }[];
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  background_image: string;
  price: number;
  brand: {
    id: number;
    name: string;
    logo: string;
  };
}

export interface Review {
  id: number;
  star: number;
  profile: number;
  order_product: number;
  product: string;
  product_name: string;
  created: string;
  comment: string;
}

interface ProductDetailProps {
  id: number;
}

function Counter(props: {
  onClick: () => void;
  value: number;
  onClick1: () => void;
}) {
  return (
    <>
      <button
        className="minusBtn text-main px-3 py-2 cursor-focus"
        onClick={props.onClick}
      >
        <Image src={"/logo/minus.svg"} alt={"minus"} width={16} height={16} />
      </button>
      <span>{String(props.value).padStart(2, "0")}</span>
      <button className="plusBtn text-main mx-3" onClick={props.onClick1}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.666016 6H11.3327"
            stroke="#0CABA8"
            strokeLinecap="round"
          />
          <path
            d="M6 0.666016L6 11.3327"
            stroke="#0CABA8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </>
  );
}

function ProductDetail({ id }: ProductDetailProps) {
  const isAuthenticated = useAuth();
  const [_, setIsLogin] = useRecoilState(isLoginModalOpen);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: productResponse, isLoading: productLoading } =
    useBranduQuery<Product>({
      queryKey: ["product", id],
      queryFn: () => getProduct(id),
    });

  console.log(productResponse);

  const { data: reviewsResponse, isLoading: reviewsLoading } = useBranduQuery<
    Review[]
  >({
    queryKey: ["product", id, "reviews"],
    queryFn: () => getProductReviews(id),
  });

  const onClick = async () => {
    if (isAuthenticated) {
      return await router.push(`/product/${id}/custom`);
    } else {
      setIsLogin(true);
    }
  };

  const [shownImage, setShownImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [showMore, setShowMore] = useState<boolean>(false);

  if (productLoading || reviewsLoading) {
    return <LoadingProgress />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row  m-auto px-3 mt-5">
        <div className="imageList flex flex-col max-h-96 overflow-y-scroll">
          {/* 상품 이미지 선택 */}
          {productResponse?.results.images
            .filter((image) => image.kind === "product")
            .map((image, index) => {
              return (
                <div
                  key={index}
                  className={`flex mb-2.5 cursor-pointer  rounded-xl ${
                    shownImage === index
                      ? " border-main border-2"
                      : "border-subContent border-[1px]"
                  }`}
                  onClick={() => setShownImage(index)}
                >
                  <div className="w-20 h-20 relative">
                    <Image
                      className="rounded-xl"
                      src={productResponse?.results.images[index].image!}
                      layout="fill"
                      alt={productResponse?.results.images[index].image!}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="ml-2 relative">
          {/* 상품 이미지 */}
          <div className="w-96 h-96">
            {/*<Image*/}
            {/*  className="rounded-xl"*/}
            {/*  src={productResponse?.results.images[shownImage]?.image!}*/}
            {/*  alt={productResponse?.results.images[shownImage]?.image!}*/}
            {/*  layout="fill"*/}
            {/*/>*/}
            <ThreeJS />
          </div>
        </div>
        <div className="flex flex-col mx-5 w-fit h-fit">
          {/* 상품 이름 */}
          <div className="flex flex-row justify-between">
            <p className="w-max text-base">{productResponse?.results.name}</p>
            <Share
              image={productResponse?.results.images[shownImage]?.image!}
              name={productResponse?.results.name!}
            />
          </div>
          {/* 상품 태그 */}
          <div className="flex flex-row my-1 space-x-1">
            {productResponse?.results.tags.map((tag, index) => {
              return (
                <span className="text-subContent text-xs cursor-pointer">
                  #{tag.name}
                </span>
              );
            })}
          </div>
          <div className="flex flex-row justify-between my-3">
            {/* 뱃지 */}
            <div className="badge flex flex-row space-x-3">
              <Badge color={"red"} />
              <Badge color={"yellow"} />
            </div>
            {/* 금액 부분 */}
            <div className="flex flex-col">
              <Price price={productResponse?.results.price! - 4000} />
              <Price price={productResponse?.results.price!} isPrime />
            </div>
          </div>
          <div className="border-b-[1px] my-2 border-gray" />
          {/* 색상 */}
          <span className="text-xs">색상</span>
          <div className="flex flex-row mt-2">
            {productResponse?.results.options.map((option, index) => {
              return (
                <div
                  className={`w-6 h-6 rounded-md border-[1px] ${
                    selectedColor === index
                      ? "border-main"
                      : "border-subContent"
                  }`}
                  style={{ backgroundColor: `${option.color.hashcode}` }}
                ></div>
              );
            })}
          </div>
          <div className="flex flex-col mt-5">
            {/* 사이즈 */}
            <span className="text-xs">사이즈</span>
            <div className="flex flex-row space-x-[10px]">
              {productResponse?.results.options.map((option, index) => {
                return (
                  <span className="mt-2 font-bold text-xs text-subContent border border-gray px-2 py-1 rounded-xl">
                    {option.size}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="amount mt-[10px]">
            <span className="text-xs">수량</span>
            <div className="mt-[10px] border border-main w-fit h-fit rounded-xl flex items-center py-[5px]">
              <Counter
                onClick={() => {
                  if (amount > 1) {
                    setAmount((prev) => prev - 1);
                  }
                }}
                value={amount}
                onClick1={() => {
                  setAmount((prev) => prev + 1);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex flex-row space-x-[10px]">
              <div className="w-11 h-11">
                <PickButton
                  id={productResponse?.results.id!}
                  wish={productResponse?.results.is_wish!}
                  li_width={24}
                  li_height={24}
                />
              </div>
              <button
                className="w-64 h-11 bg-main rounded-xl flex flex-row justify-center items-center"
                onClick={onClick}
              >
                <span className="text-white font-bold text-sm">구매하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 상품 네비게이션 바 */}
      <ProductNavigationBar />
      {/* 상품 디테일 내용 */}
      <ProductDetailBox
        mainImage={
          productResponse?.results.images
            .filter((image) => image.kind === "detail")
            .map((image) => image.image) ?? []
        }
        reviews={reviewsResponse?.results ?? []}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["product", id], () =>
    getProduct(Number(id))
  );

  await queryClient.prefetchQuery(["product", id, "reviews"], () =>
    getProductReviews(Number(id))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(id),
    },
  };
};

export default ProductDetail;
