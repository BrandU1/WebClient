import { Link } from "react-scroll";
import { useEffect, useState } from "react";

function DetailMenu() {
  const [scrollPs, setScrollPs] = useState<number>(0);
  const [tab, setTab] = useState<number>(scrollPs);

  useEffect(() => {
    const presentScroll = () => {
      const infoEle = document.getElementById("1");
      const infoRect = infoEle?.getBoundingClientRect().top;

      const guideEle = document.getElementById("2");
      const guideRect = guideEle?.getBoundingClientRect().top;

      const reviewEle = document.getElementById("3");
      const reviewRect = reviewEle?.getBoundingClientRect().top;

      const delivEle = document.getElementById("4");
      const delivRect = delivEle?.getBoundingClientRect().top;

      // @ts-ignore
      if (delivRect < 131) {
        setScrollPs(3);
      } else if (
        // @ts-ignore
        reviewRect < 101
      ) {
        setScrollPs(2);
      } else if (
        // @ts-ignore
        guideRect < 101
      ) {
        setScrollPs(1);
      } else {
        setScrollPs(0);
      }
    };

    window.addEventListener("scroll", presentScroll);
  }, [scrollPs]);

  return (
    <>
      <div className="menuTab mt-12 border-b bg-white border-gray sticky top-[98px] transition z-30">
        <div className="max-w-4xl m-auto flex flex-row justify-around">
          <Link
            to="1"
            offset={-100}
            spy={true}
            smooth={true}
            className={`flex justify-center items-center text-sm py-1 w-full cursor-pointer pb-[10px] ${
              scrollPs === 0
                ? "font-bold text-main border-main border-b-[2px]"
                : "text-gray"
            }`}
            onClick={() => {
              setTab(0);
            }}
          >
            상품정보
          </Link>
          <Link
            to="2"
            offset={-100}
            spy={true}
            smooth={true}
            className={`flex justify-center items-center text-sm py-1 w-full cursor-pointer pb-[10px] ${
              scrollPs === 1
                ? "font-bold text-main border-main border-b-[2px]"
                : "text-gray"
            }`}
            onClick={() => {
              setTab(1);
            }}
          >
            제작 가이드
          </Link>
          <Link
            to="3"
            offset={-100}
            spy={true}
            smooth={true}
            className={`flex justify-center items-center text-sm py-1 w-full cursor-pointer pb-[10px] ${
              scrollPs === 2
                ? "font-bold text-main border-main border-b-[2px]"
                : "text-gray"
            }`}
            onClick={() => {
              setTab(2);
            }}
          >
            리뷰
          </Link>
          <Link
            to="4"
            offset={-130}
            spy={true}
            smooth={true}
            className={`flex justify-center items-center text-sm py-1 w-full cursor-pointer pb-[10px] ${
              scrollPs === 3
                ? "font-bold text-main border-main border-b-[2px]"
                : "text-gray"
            }`}
            onClick={() => {
              setTab(3);
            }}
          >
            배송/환불
          </Link>
        </div>
      </div>
    </>
  );
}

export default DetailMenu;
