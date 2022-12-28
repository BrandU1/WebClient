import { Review } from "../../../pages/product/[id]";

interface ReviewListProp {
  review: Review;
}

function ReviewList({ review }: ReviewListProp) {
  return (
    <div className="w-[780px] h-[140px] rounded-lg bg-[#F6F6F6] flex justify-between mb-5">
      <div className="leftSide pt-5 pl-5">
        <div className="profile flex">
          <div className="profileImg">
            {/*<Image*/}
            {/*  src={review?.profile.profile_image}*/}
            {/*  width={40}*/}
            {/*  height={40}*/}
            {/*  className="profileImg w-10 h-10 mr-[5px] bg-white rounded-lg"*/}
            {/*/>*/}
            <div className="profileImg w-10 h-10 mr-[5px] bg-gray rounded-lg" />
          </div>
          <div className="ml-[5px]">
            {/*<span className="nickname text-xs">{review?.profile.nickname}</span>*/}
            김이삭
          </div>
        </div>
        <span className="content text-xs text-[#767676]">
          {review?.comment}
        </span>
      </div>
      <div className="rightImg pt-5 pr-5 flex space-x-[10px] pl-[55px]">
        <div className="img1 w-[100px] h-[100px] rounded-lg bg-white" />
        <div className="img1 w-[100px] h-[100px] rounded-lg bg-white" />
      </div>
    </div>
  );
}

export default ReviewList;
