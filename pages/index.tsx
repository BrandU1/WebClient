import Nav from "@components/header/nav";
import SubMenu from "@components/header/Submenu";
import Carousel from "@components/pages/home/carousel";
import Product from "@components/pages/home/product";
import Summary from "@components/pages/product/summary";
import DetailMenu from "@components/pages/product/detailmenu";
import Detail from "@components/pages/product/detail";
import client from "@lib/api";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ProductInterface } from "../types/product";

export default function Home() {
  const isAuthenticated = useAuth();

  // const getAddresses = () => {
  //   if (!isAuthenticated) return null;
  //   return client
  //     .get(`accounts/addresses`)
  //     .then((res) => console.log(res.data));
  // };
  // getAddresses();

  const getHotDeal = () => {
    return client.get(`products/hot-deal/`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<ProductInterface[]>(
    ["hotDeal"],
    getHotDeal
  );

  return (
    <div className="main max-w-4xl m-auto">
      <div className="carousel">
        <Carousel />
      </div>
      <div className="productList">
        <Product
          products={data!}
          title="브랜뉴 오늘의 핫딜"
          subTitle="오늘 하루만 싸게파는 초특가 상품"
        />
      </div>
    </div>
  );
}
