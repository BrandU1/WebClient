import Nav from "../components/header/nav";
import SubMenu from "../components/header/Submenu";
import Carousel from "../components/pages/home/carousel";
import Product from "../components/pages/home/product";

export default function Home() {
  return (
    <div className="main">
      <div className="carousel">
        <Carousel />
      </div>
      <div className="productList">
        <Product />
      </div>
    </div>
  );
}
