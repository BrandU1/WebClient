import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    centerMode: false,
  };

  return (
    <div className="m-auto flex max-w-4xl py-5 justify-between space-x-10 m-auto">
      <div className="w-2/3 h-auto ">
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            return (
              <div key={index}>
                <Image
                  className="rounded-2xl"
                  src="/dummy/cat.png"
                  width={600}
                  height={300}
                  alt="carousel"
                />
                <div className="relative z-20 bottom-8 float-right right-3 text-2xl">
                  <p className="px-[9px] h-5 bg-[#000]  text-center rounded-xl text-sm font-bold text-white opacity-50 flex items-center">
                    {index + 1} / 10
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="w-1/3">
        <Image
          className="rounded-2xl"
          src="/dummy/mouse.png"
          alt="mouse"
          width={255}
          height={300}
        />
      </div>
    </div>
  );
}

export default Carousel;
