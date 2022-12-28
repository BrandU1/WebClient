import Image from "next/image";
import ImgAtom from "@atoms/imgatom";

interface BadgeProps {
  color: string;
}

function Badge({ color }: BadgeProps) {
  return (
    <div>
      {color === "red" ? (
        <div className="h-[27px] bg-[#E44A3833] rounded-xl flex justify-center items-center">
          <span className="font-bold text-xs ml-2 text-red mr-[1px]">
            마감임박
          </span>
          <Image
            className="mr-2"
            src={"/logo/timer.svg"}
            width={22}
            height={22}
            alt={"timer"}
          />
        </div>
      ) : color == "yellow" ? (
        <div className="h-[27px] bg-[#ECAF4933] rounded-xl flex justify-center items-center">
          <span className="font-bold text-xs ml-2 text-yellow mr-[1px]">
            당일배송
          </span>
          <Image
            className="mr-2"
            src={"/logo/thunder.svg"}
            width={22}
            height={22}
            alt={"thunder"}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Badge;
