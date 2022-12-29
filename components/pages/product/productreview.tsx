import * as React from "react";
import Image from "next/image";
import Star from "@common/stars";
import Stars from "@common/stars";

interface ReviewProps {
  elements: any;
}

function ProductReview({ elements }: ReviewProps) {
  return (
    <div
      className="w-[780px] h-[140px] rounded-lg bg-[#F6F6F6] flex justify-between mb-5"
      // onClick={() => {
      //   setDetailModalOpen(true);
      // }}
    >
      <div className="leftSide pt-5 pl-5">
        <div className="profile flex">
          <div className="profileImg">
            <Image
              src={"/dummy/otter.png"} //element?.profile.profile_image
              width={40}
              height={40}
              className="profileImg w-10 h-10 mr-[5px] bg-white rounded-lg"
              alt={"profile"}
            />
          </div>
          <div className="ml-[5px]">
            <span className="nickname text-xs">
              {/*{element?.profile.nickname}*/}
              닉네임
            </span>
            <Stars size={13} clickable={false} count={4} />
          </div>
        </div>
        <span className="content text-xs text-subContent mt-2">
          {elements?.comment}
        </span>
      </div>
      <div className="rightImg pt-5 pr-5 flex space-x-[10px] pl-[55px]">
        <div className="img1 w-[100px] h-[100px] rounded-lg bg-white" />
        <div className="img1 w-[100px] h-[100px] rounded-lg bg-white" />
      </div>
    </div>
  );
}

export default ProductReview;
