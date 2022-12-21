import Carousel from "@components/pages/home/carousel";
import Product from "@components/pages/home/product";
import client from "@lib/api";
import useAuth from "../hooks/useAuth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HotDeal } from "../types/privacy";
import { GetServerSideProps } from "next";
import useBranduQuery from "@hooks/useBranduQuery";
import LoadingProgress from "@common/loading-progress";

export interface EventBanner {
  id: number;
  title: string;
  backdrop_image: string;
  link: string;
}

const getCarousel = async () => {
  const response = await client.get("events/carousel");
  return response.data;
};

const getBanner = async () => {
  const response = await client.get("events/banner");
  return response.data;
};

const getHotDeal = async () => {
  const response = await client.get("products/contents/hot-deal");
  return response.data;
};

function Home() {
  const isAuthenticated = useAuth();

  const { data: carouselData, isLoading: carouselLoading } = useBranduQuery<
    EventBanner[]
  >({
    queryKey: ["carousel"],
    queryFn: getCarousel,
  });

  const { data: bannerData, isLoading: bannerLoading } = useBranduQuery<
    EventBanner[]
  >({
    queryKey: ["banner"],
    queryFn: getBanner,
  });

  const { data: hotDealData, isLoading } = useBranduQuery<HotDeal[]>({
    queryKey: ["hotDeal"],
    queryFn: getHotDeal,
  });

  if (!carouselData || !bannerData) {
    return <LoadingProgress />;
  }

  return (
    <div className="main max-w-4xl m-auto">
      <div className="carousel">
        <Carousel
          carouselData={carouselData?.results}
          bannerData={bannerData?.results}
        />
      </div>
      <div className="productList">
        {/* 프로덕트 다시 컴퍼넌트화 시키기 */}
        <Product
          products={hotDealData?.results}
          title="브랜뉴 오늘의 핫딜"
          subTitle="오늘 하루만 싸게파는 초특가 상품"
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["banner"], getBanner);
  await queryClient.prefetchQuery(["carousel"], getCarousel);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
