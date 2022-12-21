import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { EventBanner } from "../../../pages";

interface CarouselProps {
  carouselData: EventBanner[];
  bannerData: EventBanner[];
}

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

function Carousel({ carouselData, bannerData }: CarouselProps) {
  return (
    <div className="m-auto flex  py-5 justify-between space-x-10 m-auto">
      <div className="w-2/3 h-auto ">
        <Slider {...carouselSettings}>
          {carouselData.map((item, index) => {
            return (
              <div key={index}>
                <Image
                  className="rounded-2xl"
                  src={item.backdrop_image}
                  alt="mouse"
                  width={600}
                  height={300}
                />

                <div className="relative z-20 bottom-8 float-right right-3 text-2xl">
                  <p className="px-[9px] h-5 bg-[#000]  text-center rounded-xl text-sm font-bold text-white opacity-50 flex items-center">
                    {index + 1} / {carouselData.length}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="w-1/3">
        {bannerData.map((item, index) => {
          return (
            <div key={index} className="w-full h-40 mb-5">
              <Image
                className="rounded-2xl"
                src={item.backdrop_image}
                alt="mouse"
                width={300}
                height={150}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
