import Link from "next/link";
import React from "react";
import AppleIcon from "@icons/apple";
import PlayStore from "@icons/playstore";
import Facebook from "@icons/facebook";
import Instargram from "@icons/instargram";
import BranduLogo from "@icons/brandu-logo";

function Footer() {
  return (
    <>
      <div className="border-y border-lightGary h-12 mt-14">
        <div className="max-w-4xl m-auto space-x-5 mt-[10px] text-notice font-normal text-sm">
          <Link href="/">
            <span className="cursor-pointer">회사 소개</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer">이용약관</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer text-main">개인정보처리방침</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer">이용약관</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer">전자금융거래이용약관</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer">입점상담</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer text-main">광고신청</span>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl m-auto mt-5">
        <div className="flex flex-row space-x-12">
          <div className="flex flex-col justify-center items-center">
            <BranduLogo />
            <div className="flex flex-col items-center mt-5 text-subContent text-xs">
              <p className="mb-[5px] font-bold">(주) 더미</p>
              <p>평일 09:00 ~ 18:00</p>
              <p>(주말 &amp; 공휴일 제외)</p>
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col text-xs space-y-1 justify-between">
              <span>대표자</span>
              <span>주소</span>
              <span>사업자등록번호</span>
              <span>통신판매업 신고번호</span>
              <span>전화</span>
            </div>
            <div className="flex flex-col text-[12px] text-subContent space-y-1 ml-3 justify-between">
              <span>민준수</span>
              <span className="text-[10px] pb-1">
                경기도 안산시 상록구 한양대학로 55 한양대학교 ERICA 제5공학관
                지하 1층 SW창업실 5호
              </span>
              <span>771-37-0100</span>
              <span>제2002경기안산-0000호</span>
              <span>010-9995-5728</span>
            </div>
          </div>
          <div className="icons flex flex-row space-x-5 mr-5 mt-3">
            <AppleIcon />
            <PlayStore />
            <Facebook />
            <Instargram />
          </div>
        </div>
        <div className="flex flex-col mt-10 font-normal text-[12px] text-notice px-5">
          <p>
            (주)더미 사이트의 상품/판매자/쇼핑정보, 컨텐츠, UI 등에 대한 무단
            복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠사업 진흥법
            등에 의하여 엄격히 금지됩니다.
          </p>
          <p className="mt-2 font-normal text-[12px] text-notice mb-10">
            COPYRIGHT (C) 2023 THEMEALWAYS CORP. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
