import { BranduBaseResponse, Inquiry } from "../../../types/privacy";
import { useState } from "react";
import Addinquiry from "@components/modal/addinquiry";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { FaqInterface, MainInfoInterface } from "../../../types/service";
import Link from "next/link";

interface ServiceProps {
  inquiries: Inquiry[];
}

function Service({ inquiries }: ServiceProps) {
  const [inquiry, setInquiry] = useState<boolean>(false);
  const handleInquiryClose = () => {
    setInquiry(false);
  };

  const getMainInfo = () => {
    return client.get("services/main_infos").then((res) => res.data);
  };
  const { data: mainInfoData, isLoading: mainInfoIsLoading } = useQuery<
    BranduBaseResponse<MainInfoInterface[]>
  >(["mainInfo"], getMainInfo);

  const getFaq = () => {
    return client.get("services/faqs").then((res) => res.data);
  };
  const { data: faqData, isLoading: faqIsLoading } = useQuery<
    BranduBaseResponse<FaqInterface[]>
  >(["faq"], getFaq);

  if (mainInfoIsLoading || faqIsLoading) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <div className=" m-auto min-h-[55vh] ">
      <div>
        <h2 className="py-5 font-bold text-xl">고객센터</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="grid grid-cols-2 space-x-6 py-3 border-b-[1px] border-[#EDEDED]">
        <div className="left">
          <div className="flex justify-between items-center">
            <h3 className="text-base">서비스 주요 안내</h3>
            <Link href="/service/maininfo">
              <p className="text-xs text-notice">전체보기</p>
            </Link>
          </div>
          {mainInfoData?.results.length! <= 4 ? (
            <div className="text-sm py-3 space-y-2 text-subContent">
              {mainInfoData?.results?.map((info, index) => {
                return <p key={index}>{info.title}</p>;
              })}
            </div>
          ) : (
            <div>
              {[1, 2, 3, 4].map((preview, index) => {
                return (
                  <div className="text-sm py-3 space-y-2 text-subContent">
                    {mainInfoData?.results?.map((info, index) => {
                      return <p key={index}>{info.title}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="right">
          <div className="flex justify-between items-center">
            <h3 className="text-base">자주 묻는 질문</h3>
            <Link href="/service/faq">
              <p className="text-xs text-notice">전체보기</p>
            </Link>
          </div>
          <div className="text-sm py-3 space-y-2 text-subContent">
            {faqData?.results.length! <= 4 ? (
              <div className="text-sm py-3 space-y-2 text-subContent">
                {faqData?.results?.map((faq, index) => {
                  return <p key={index}>{faq.title}</p>;
                })}
              </div>
            ) : (
              <div>
                {[1, 2, 3, 4].map((preview, index) => {
                  return (
                    <div className="text-sm py-3 space-y-2 text-subContent">
                      {faqData?.results?.map((faq, index) => {
                        return <p key={index}>{faq.title}</p>;
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-3 border-b-[1px] border-[#EDEDED]">
        <div className="flex justify-between items-center">
          <h3 className="text-base">1:1 문의내역</h3>
          <Link href="/service/inquiry">
            <p className="text-xs text-notice cursor-pointer">전체보기</p>
          </Link>
        </div>
        {inquiries?.map((list, index) => {
          return (
            <div key={index} className="flex">
              <p className="text-sm pt-3  text-subContent flex">
                <span
                  className={`${
                    list.is_answer ? "block" : "hidden"
                  } font-bold  text-main mr-2`}
                >
                  [답변 완료]
                </span>
                <span
                  className={`${
                    list.is_answer ? "hidden" : "block"
                  } font-bold text-red mr-2`}
                >
                  [답변 미완료]
                </span>

                {list.title}
              </p>
            </div>
          );
        })}
        <p className="text-sm py-3 text-subContent "></p>
      </div>
      <div className="flex justify-center py-10">
        <button
          onClick={() => {
            setInquiry(true);
          }}
          className="text-main text-base border-[1px] border-main rounded-xl w-[259px] h-[45px] flex justify-center items-center"
        >
          1:1 문의하기
        </button>
      </div>
      {inquiry && <Addinquiry handleClose={handleInquiryClose} />}
    </div>
  );
}

export default Service;
