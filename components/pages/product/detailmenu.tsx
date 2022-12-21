import { Link } from "react-scroll";
import * as React from "react";
import { useEffect, useState } from "react";

function ProductNavigationBar() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const presentScroll = () => {
      const info = document.getElementById("1")?.getBoundingClientRect().top;
      const guide = document.getElementById("2")?.getBoundingClientRect().top;
      const review = document.getElementById("3")?.getBoundingClientRect().top;
      const delivery = document
        .getElementById("4")
        ?.getBoundingClientRect().top;

      console.log("!2");

      if (delivery! < 131) {
        setScrollPosition(3);
      } else if (review! < 101) {
        setScrollPosition(2);
      } else if (guide! < 101) {
        setScrollPosition(1);
      } else {
        setScrollPosition(0);
      }
    };

    window.addEventListener("scroll", presentScroll);
    return window.removeEventListener("scroll", presentScroll);
  }, [scrollPosition, window]);

  return (
    <div className="flex flex-row justify-between items-center mt-8 h-12 border-b-lightGary border-b-[1px] sticky top-24 transition z-30 bg-white">
      {["상품정보", "제작가이드", "리뷰", "배송/환불"].map((item, index) => {
        return (
          <Link
            to={String(index + 1)}
            key={index}
            offset={-138}
            spy
            smooth
            className={`w-full scroll-smooth ${
              scrollPosition === index
                ? "font-bold text-main border-main pb-[5px] border-b-[2px]"
                : "text-gray"
            }`}
          >
            <span className="flex justify-center items-center text-sm cursor-pointer">
              {item}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductNavigationBar;
