import * as React from "react";
import Image from "next/image";
import Star from "@common/star";

function ProductReview() {
  // const { element } = props; // 리뷰 데이터
  // const [_, setDetailModalOpen] = useState<boolean>(false);

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
            <Star size={"small"} count={3} />
          </div>
        </div>
        <span className="content text-xs text-subContent mt-2">
          {/*{element?.description}*/}
          더워요
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
