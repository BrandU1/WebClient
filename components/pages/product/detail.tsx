import { useRef, useState } from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import ProductReview from "./productreview";
import Star from "@common/star";
import ModalFrame from "@common/modalframe";
import * as React from "react";

function Detail() {
  const [infoShow, setInfoShow] = useState<boolean>(false);
  const contentSpace = useRef(null);
  const [reviewShow, setReviewShow] = useState<boolean>(false);
  const [reviewDetailOpen, setReviewDetailOpen] = useState<boolean>(false);

  const data = [1, 2, 3, 4, 5, 6]; //리뷰 개수

  return (
    <div className="max-w-4xl m-auto flex flex-col justify-center items-center mt-7">
      <div className="info flex flex-col justify-center items-center" id="1">
        <span className="font-bold text-xl pt-7">상품정보</span>
        <div
          ref={contentSpace}
          className="relative transition-max-height mt-2 ease-in-out scrollbar-hide"
        >
          <div
            className={
              infoShow
                ? "overflow-scroll scrollbar-hide"
                : "h-[1000px] overflow-hidden shadow-inner"
            }
          >
            <Image
              src={"/dummy/mouse.png"}
              width={780}
              height={2000}
              alt={"infoImg"}
            />
          </div>

          <div
            className={`openBtn absolute inset-x-80 -bottom-4 ${
              infoShow ? "invisible" : " "
            }`}
          >
            <button
              className="w-36 h-11 bg-main appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
              onClick={() => setInfoShow(!infoShow)}
            >
              <div className="openBtn flex flex-row justify-center items-center">
                <span className="mr-1 flex">더보기</span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 1.75L6 6.25L10.5 1.75"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div
            className={`closeBtn absolute inset-x-80 -bottom-4 ${
              infoShow ? " " : "invisible"
            }`}
          >
            <Link to="1" offset={-150} spy={true}>
              <button
                className="w-36 h-11 bg-main appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
                onClick={() => setInfoShow(!infoShow)}
              >
                <div className="openBtn flex flex-row justify-center items-center">
                  <span className="mr-1 flex">닫기</span>
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 5.5L6 0.499999L0.999999 5.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-gray w-screen pt-[30px] pb-[30px]" />
      <div className="guide flex flex-col justify-center items-center" id="2">
        <span className="font-bold text-xl pt-7">제작가이드</span>
        <span className="text-sm mt-2 mb-5">
          브랜뉴의 자체 서비스로 제작된 이미지가 아닌경우, 화면과 다르게 인쇄될
          수 있으며 이에대한 모든 책임은 제작자 본인에게 있습니다.
        </span>
        <Image
          className="img w-[780px] h-[1000px] bg-gray"
          src={"/dummy/mouse.png"}
          width={780}
          height={2000}
          alt={"infoImg"}
        />
      </div>
      <div className="border-b border-gray w-screen pt-[30px] pb-[30px]" />
      <div
        className="review flex flex-col justify-center items-center relative"
        id="3"
      >
        <span className="flex font-bold text-xl pt-[30px]">리뷰</span>
        <div className="flex flex-row pt-6">
          <Star size="large" count={2} />
          <span className="text-xl ml-3">12</span>
          <span className="text-xl">(5)</span>
        </div>
        <div className="flex flex-col mt-[35px]">
          {data?.length <= 3 || reviewShow
            ? data?.map((review, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setReviewDetailOpen(true);
                      // getModalId(idx);
                    }}
                  >
                    <ProductReview />
                  </div>
                );
              })
            : [1, 2, 3].map((preview, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setReviewDetailOpen(true);
                      // getModalId(idx);
                    }}
                  >
                    {/*<ProductReview element={data?.results[preview]} />*/}
                    <ProductReview />
                  </div>
                );
              })}

          {reviewDetailOpen ? ( //리뷰 자세히 보기
            <ModalFrame
              width={600}
              height={500}
              open={reviewDetailOpen}
              onClose={() => {
                setReviewDetailOpen(false);
              }}
              title={"리뷰상세"}
              components={
                <div className="flex flex-col mt-10 w-[600px] px-11">
                  <div className="profile flex">
                    <Image
                      src={"/dummy/otter.png"} //element?.profile.profile_image
                      width={40}
                      height={40}
                      className="profileImg w-10 h-10 mr-[5px] bg-white rounded-lg"
                      alt={"profile"}
                    />
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
                  <div className="reviewImg flex flex-row overflow-x-scroll space-x-5 mt-5">
                    {[1, 2, 3, 4, 5].map((image, idx) => {
                      return (
                        <div>
                          <div className="w-[150px] h-[150px] rounded-xl bg-[#D9D9D9]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              }
            />
          ) : null}
        </div>
        {data?.length > 0 ? (
          data?.length > 3 ? (
            <div>
              <div
                className={`openBtn absolute inset-x-80 -bottom-1 ${
                  reviewShow ? "invisible" : " "
                }`}
              >
                <button
                  className="w-36 h-11 bg-main appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
                  onClick={() => setReviewShow(!reviewShow)}
                >
                  <div className="flex flex-row justify-center items-center">
                    <span className="mr-1 flex">더보기</span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 1.75L6 6.25L10.5 1.75"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div
                className={`closeBtn absolute inset-x-80 -bottom-1 ${
                  reviewShow ? " " : "invisible"
                }`}
              >
                <Link to="3" offset={-150} spy={true}>
                  <button
                    className="w-36 h-11 bg-main appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
                    onClick={() => setReviewShow(!reviewShow)}
                  >
                    <div className="openBtn flex flex-row justify-center items-center">
                      <span className="mr-1 flex">닫기</span>
                      <svg
                        width="12"
                        height="6"
                        viewBox="0 0 12 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 5.5L6 0.499999L0.999999 5.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          ) : null
        ) : (
          <div> 작성된 리뷰가 없습니다 ㅜㅜ </div>
        )}
      </div>
      <div className="border-b border-gray w-screen pt-[30px] pb-[30px]" />
      <div
        className="delivery flex flex-col justify-center items-center mt-[30px]"
        id="4"
      >
        <span className="flex justify-center font-bold text-xl">배송/환불</span>
        <div className="m-auto w-[780px] h-[1000px] bg-[#D9D9D9] mt-[10px]">
          <div className="justify-center items-center">배송환불안내</div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
