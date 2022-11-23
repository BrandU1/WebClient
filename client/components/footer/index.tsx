import Link from "next/link";
import React from "react";
import AppleIcon from "../icons/apple";
import PlayStore from "../icons/playstore";
import Facebook from "../icons/facebook";
import Instargram from "../icons/instargram";

function Footer() {
  return (
    <>
      <div className="border-y border-[#EDEDED] h-12 mt-14">
        <div className="max-w-4xl m-auto space-x-5 mt-[10px] text-[#767676] font-normal text-sm">
          <Link href="/">
            <span className="cursor-pointer">회사 소개</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer">이용약관</span>
          </Link>
          <span>|</span>
          <Link href="/">
            <span className="cursor-pointer text-[#0CABA8]">
              개인정보처리방침
            </span>
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
            <span className="cursor-pointer text-[#0CABA8]">광고신청</span>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl m-auto mt-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-sm mb-[5px] font-bold">(주) 더미</p>
            <h1 className="font-bold text-xl text-Main-deepblue">1004-0000</h1>
            <p className="text-sm font-normal">
              평일 09:00 ~ 18:00 (주말 &amp; 공휴일 제외)
            </p>
          </div>
          <div className="icons flex flex-row space-x-5 mr-5">
            <AppleIcon />
            <PlayStore />
            <Facebook />
            <Instargram />
          </div>
        </div>
        <div className="mt-5 font-normal text-xs text-[#767676]">
          <p>
            대표자:민준수 경기도 안산시 상록구 한양대학로 55 한양대학교 ERICA
            제5공학관 지하 1층 SW창업실 5호
          </p>
          <p>
            사업자등록번호 : 0000-00-00000 통신판매업 신고번호 :
            제2002경기안산-0000호
          </p>
        </div>
        <div className="mt-5 font-normal text-xs text-[#767676]">
          <p>
            (주)더미에서 판매되는 상품 중에는 개별 판매자가 판매하는 오픈마켓
            상품이 포함되어 있습니다. 오픈마켓 상품의 경우, (주)더미는
            통신판매중개자로서 거래 당사자가 아니며 , 입점 판매사가 등록한
            상품정보 및 거래 등에 대해 책임을 지지 않습니다.
          </p>
          <p>
            (주)더미 사이트의 상품/판매자/쇼핑정보, 컨텐츠, UI 등에 대한 무단
            복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠사업 진흥법
            등에 의하여 엄격히 금지됩니다.
          </p>
        </div>
        <p className="mt-5 font-normal text-xs text-[#767676] mb-10">
          Copyright 2022, themealways, Co., Ltd All rights reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
