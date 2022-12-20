import ModalFrame from "@common/modalframe";
import { useRef, useState } from "react";
import Image from "next/image";

interface ReviewProps {
  title: string;
  onClose: () => void;
}
function ReviewModal({ title, onClose }: ReviewProps) {
  const reviewEl = useRef<HTMLDivElement>(null);
  const handleReviewEl = (e: any) => {
    if (!reviewEl.current?.contains(e.target)) {
      onClose();
    }
  };
  const [text, setText] = useState<string>("");
  const onChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <>
      <ModalFrame
        close={onClose}
        blur={handleReviewEl}
        pageRef={reviewEl}
        width={600}
        height={533}
        title={title}
        bgColor={"black"}
        components={
          <div className="flex flex-col mt-7">
            <div className="itemInfo flex flex-row">
              <div className="w-[100px] h-[100px] bg-subContent rounded-xl" />
              <div className="flex flex-col text-sm ml-2">
                <p>상품 이름</p>
                <p className="text-subContent mt-1">상품 구매일</p>
              </div>
            </div>
            <div className="itemReview mt-5">
              <input
                className="w-96 h-32 rounded-xl border border-gray text-sm p-2 text-subContent focus:outline-none"
                onChange={onChange}
                type="text"
                placeholder="상세 리뷰를 작성해주세요"
                value={text}
              />
            </div>
            <div className="reviewImgs flex flex-row-reverse mt-2 w-fit">
              <button className="border rounded-xl w-[70px] h-[70px] border-main text-sm font-bold text-main">
                <p>사진</p>
                <p>첨부하기</p>
              </button>
              <div className="flex flex-row space-x-2 mr-2">
                {[1, 2, 3].map((image, index) => {
                  return (
                    <div className="relative">
                      <div className="w-[70px] h-[70px] bg-gray rounded-xl " />
                      <Image
                        className="mr-2 absolute top-2 right-2"
                        src={"/logo/x.svg"}
                        width={10}
                        height={10}
                        alt={"remove"}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-row space-x-2 mt-8">
              <button className="w-48 h-11 text-main border border-main rounded-xl font-bold text-sm">
                취소
              </button>
              <button className="w-48 h-11 text-white bg-main rounded-xl font-bold text-sm">
                등록하기
              </button>
            </div>
          </div>
        }
      />
    </>
  );
}

export default ReviewModal;
