import Product from "@components/pages/home/product";
import client from "@lib/api";
import useAuth from "../hooks/useAuth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HotDeal } from "../types/privacy";
import { GetServerSideProps } from "next";
import useBranduQuery from "@hooks/useBranduQuery";
import LoadingProgress from "@common/loading-progress";
import Slider from "react-slick";
import Image from "next/image";

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

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  centerMode: false,
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
      <div className="m-auto flex py-5 justify-between space-x-10 m-auto">
        <div className="relative w-2/3">
          <Slider {...carouselSettings}>
            {carouselData?.results.map((item, index) => {
              return (
                <div key={index} className="w-full">
                  <Image
                    className="w-full border border-subContent rounded-2xl"
                    src={item.backdrop_image}
                    alt={item.title}
                    width={600}
                    height={300}
                  />

                  <div className="relative z-20 bottom-8 float-right right-3 text-2xl">
                    <p className="px-[9px] h-5 bg-[#000] text-center rounded-xl text-sm font-bold text-white opacity-50 flex items-center">
                      {index + 1} / {carouselData?.results.length}
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="w-1/3 relative  border-[1px] border-subContent rounded-2xl">
          {bannerData?.results.map((item, index) => {
            return (
              <div key={index} className="w-full">
                <Image
                  className="relative w-full rounded-2xl aspect-[300/500] h-[300px]"
                  src={item.backdrop_image}
                  width={250}
                  height={300}
                  alt={item.title}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="productList">
        <Product
          products={hotDealData?.results!}
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
