import * as React from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import Star from "@common/star";
import { Review } from "../../../pages/product/[id]";
import { getImageRatio } from "@lib/image";
import client from "@lib/api";
import ReviewList from "@components/pages/product/reviewlist";
import { Link } from "react-scroll";

interface DetailProps {
  mainImage: string[];
  reviews: Review[];
}

function ProductDetailBox({ mainImage, reviews }: DetailProps) {
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [reviewShow, setReviewShow] = useState<boolean>(false); //리뷰 리스트 펼치기
  const [reviewDetailOpen, setReviewDetailOpen] = useState<boolean>(false); //리뷰 자세히보기

  const reviewEl = useRef<HTMLDivElement>(null);
  const handleReviewDetail = (e: any) => {
    if (!reviewEl.current?.contains(e.target)) {
      handleDetailClose();
    }
  };
  const handleDetailClose = () => {
    setReviewDetailOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-7 space-y-10">
      {/* 상품 정보 */}
      <div className="flex flex-col justify-center items-center w-full" id="1">
        <h2 className="font-bold text-3xl pt-5">상품정보</h2>
        <div className="relative transition-max-height mt-2 ease-in-out scrollbar-hide w-full z-20">
          <div
            className={
              openImage
                ? "overflow-scroll scrollbar-hide w-full"
                : "h-[1000px] overflow-hidden shadow-inner w-full"
            }
          >
            {mainImage.map((image, index) => {
              return (
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: getImageRatio(image),
                  }}
                >
                  <Image src={image} alt={image} layout="fill" />
                </div>
              );
            })}
          </div>
          <div className="absolute -bottom-4 w-full flex justify-center">
            <button
              className="w-36 h-11 bg-main appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
              onClick={() => {
                setOpenImage((prev) => !prev);
              }}
            >
              <span className="mr-1 flex">{openImage ? "닫기" : "더보기"}</span>
              <svg
                className={`transition-transform duration-300 ease-in-out ${
                  !openImage && "rotate-180"
                }`}
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
            </button>
          </div>
        </div>
      </div>
      {/* 상품 정보 하단 선 */}
      <div id="2" className="w-screen h-[1px] bg-gray" />
      {/* 제작 가이드 */}
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="flex font-bold text-xl pt-8">제작 가이드</h2>
        <span className="text-sm mt-2 mb-5">
          브랜뉴의 자체 서비스로 제작된 이미지가 아닌경우, 화면과 다르게 인쇄될
          수 있으며 이에대한 모든 책임은 제작자 본인에게 있습니다.
        </span>
        <Image
          className=""
          src={"/dummy/design-guide.png"}
          width={1348}
          height={798}
          alt={"infoImg"}
        />
      </div>
      {/* 제작 가이드 하단선 */}
      <div id="3" className="w-screen h-[1px] bg-gray" />
      <div className="review flex flex-col justify-center items-center relative">
        <h2 className="flex font-bold text-xl pt-8">리뷰</h2>
        <div className="flex flex-row pt-6">
          <Star
            size="large"
            count={
              reviews.map((review) => review.star).reduce((a, b) => a + b, 0) /
              reviews.length
            }
          />
          <span className="text-xl ml-3">0</span>
          <span className="text-xl">(0)</span>
        </div>
        <div className="flex flex-col mt-[35px]">
          {reviews?.length <= 2 || reviewShow
            ? reviews?.map((review, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setReviewDetailOpen(true);
                    }}
                  >
                    <ReviewList review={review} />
                  </div>
                );
              })
            : [1, 2].map((preview, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setReviewDetailOpen(true);
                    }}
                  >
                    <ReviewList review={reviews[preview]} />
                  </div>
                );
              })}
        </div>
        {reviews.length >= 2 && (
          <div>
            <div
              className={`openbutton absolute inset-x-80 -bottom-1 ${
                reviewShow ? "invisible" : " "
              }`}
            >
              <button
                className="w-36 h-11 bg-Main-deepblue appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
                onClick={() => setReviewShow(!reviewShow)}
              >
                <div className="flex flex-row justify-center items-center">
                  <span className="mr-1 flex">더보기</span>
                </div>
              </button>
            </div>
            <div
              className={`closebutton absolute inset-x-80 -bottom-1 ${
                reviewShow ? " " : "invisible"
              }`}
            >
              <Link to="3" offset={-150} spy={true}>
                <button
                  className="w-36 h-11 bg-Main-deepblue appearance-none cursor-pointer flex flex-row items-center justify-center text-white rounded-lg"
                  onClick={() => setReviewShow(!reviewShow)}
                >
                  <div className="openbutton flex flex-row justify-center items-center">
                    <span className="mr-1 flex">닫기</span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        )}
        {reviews.length === 0 && (
          <span className="my-5 font-bold text-main text-lg">
            아직 작성된 리뷰가 없습니다.
          </span>
        )}
      </div>
      <div id="4" className="border-b border-gray w-screen" />
      {/* TODO: 배송 및 환불 페이지 수정 */}
      <div className="delivery flex flex-col justify-center items-center">
        <span className="flex justify-center font-bold text-xl">배송/환불</span>
        <div className="m-auto w-[780px] h-[1000px] bg-[#D9D9D9] mt-[10px]">
          {/*<div className="justify-center items-center">배송환불안내</div>*/}
          <p>
            주의사항 배경이 투명한 PNG의 경우, CMYK 색상모드로 웹용(Save for
            Web) 저장해 주세요. 배경이 꽉 찬 JPG의 경우, RGB 색상모드로 저장해
            주세요. 이미지 크기는 최소 2500~3500px / 해상도는 150dpi 이상으로
            제작해 주세요. 상품마다 이미지 크기가 다르므로, 해당 상품의 이미지
            가이드를 확인해 주세요. 작은 원본 이미지를 사이즈 규격에 맞게 임의로
            크게 확대할 경우 인쇄 시 화질이 깨질 수 있습니다. 상품 실측 사이즈를
            반드시 확인해 주세요. 인쇄를 원하시는 위치가 있을 시 [상품 제작
            요청사항]에 남겨주시거나, 1:1 상담 또는
            고객센터(ceo@themealways.com)로 메일 주세요. 모니터, 핸드폰에 따라
            실제 인쇄 색상과 다르게 보일 수 있습니다. 교환/환불 불가 사항 마플의
            모든 상품은 고객 주문에 따라 개별 제작되는 방식으로 단순 변심을
            포함, 아래의 경우에는 교환 / 환불이 불가합니다. - 디자인 시안 색상의
            차이 프린팅 방식과 원단 재질에 따른 경우의 수가 다양하므로 인쇄 후
            모니터, 혹은 종이 출력물과 색상 차이가 발생할 수 있습니다. - 인쇄
            위치 및 크기의 차이 제품 재질에 따른 특성의 차이와 대부분의 인쇄가
            수작업으로 이루어진다는 점에서 시안과 실제 상품의 인쇄 위치 및
            크기의 오차가 발생할 수 있습니다. 인쇄 위치 및 크기를 별도로 [요청]
            하지 않은 주문건에 대한 교환 또는 환불은 불가합니다. - 추가 주문 시
            기존 상품 색상과의 컬러 차이 상품 컬러 및 사이즈는 제작 시기별,
            생산시즌별로 원단 컬러와 사이즈 차이가 발생할 수 있습니다. - 화학
            제품 사용으로 인한 손상 우레탄 전사(PU Heat Transfer) 인쇄 제품에
            솔벤트와 같은 용해력이 있는 용매를 사용한 향수를 직접적으로 분사할
            경우 인쇄 부분이 손상될 수 있으니 주의해 주세요. 교환/환불 기간
            물품에 문제 되는 사항에 대해서는 수령 후 7일 이내 이메일
            ceo@themealways.com 또는 고객센터로 연락주셔야 가능합니다. ★ 주문
            완료 후 상품 및 이미지 변경을 원하실 경우 [제작준비중] 상태에서만
            변경이 가능하며 [제작중]에는 변경 및 취소가 불가합니다. 변경을
            원하시는 경우 1:1 상담 및 카톡 또는 고객센터를 통해 문의 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailBox;
