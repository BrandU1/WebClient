import { Link } from "react-scroll";
import * as React from "react";
import { useEffect, useState } from "react";

function ProductNavigationBar() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const presentScroll = () => {
      const info = document.getElementById("0")?.getBoundingClientRect().top;
      const guide = document.getElementById("1")?.getBoundingClientRect().top;
      const review = document.getElementById("2")?.getBoundingClientRect().top;
      const delivery = document
        .getElementById("3")
        ?.getBoundingClientRect().top;

      if (delivery! < 146) {
        setScrollPosition(3);
      } else if (review! < 146) {
        setScrollPosition(2);
      } else if (guide! < 146) {
        setScrollPosition(1);
      } else {
        setScrollPosition(0);
      }
    };

    window.addEventListener("scroll", presentScroll);
  }, [scrollPosition, window]);

  return (
    <div className="border-b-lightGary border-b-[1px] sticky top-16 transition z-30 bg-white">
      <div className="flex flex-row justify-between items-center mt-8 h-12 max-w-4xl">
        {["상품정보", "제작가이드", "리뷰", "배송/환불"].map((item, index) => {
          return (
            <Link
              to={String(index)}
              key={index}
              offset={-145}
              spy
              smooth
              className={`w-full scroll-smooth `}
            >
              <span
                className={`w-full scroll-smooth flex justify-center items-center cursor-pointer ${
                  scrollPosition === index
                    ? "font-bold text-main border-main border-b-[2px] py-3"
                    : "text-gray"
                }`}
              >
                {item}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductNavigationBar;
