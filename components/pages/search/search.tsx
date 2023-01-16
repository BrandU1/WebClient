import { SearchBase, SearchResult } from "../../../types/privacy";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import PickButton from "@components/pick/pickbutton";
import ImgAtom from "@atoms/imgatom";

interface SearchProps {
  searchResult: SearchBase;
}

function Search({ searchResult }: SearchProps) {
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });

  return (
    <>
      <div className="py-3">
        <div className="pb-3">
          <h2 className=" font-bold border-[2px] border-main text-center py-3">
            상품 검색 결과
          </h2>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">
            <span className="font-bold">
              {searchResult?.products?.results?.length}
            </span>
            개의 검색 결과
          </p>
          {/*<p className="text-sm">*/}
          {/*  추천순 | 판매량순 | 낮은 가격순 | 높은 가격순*/}
          {/*</p>*/}
        </div>
        {searchResult?.products?.results?.length != 0 ? (
          <div className="list grid grid-cols-5 gap-x-4">
            {searchResult?.products?.results?.map((item, index) => {
              return (
                <div key={index} className="py-3 relative">
                  <Link
                    href={{
                      pathname: `/product/${item.id}`,
                      query: {
                        index: item.id,
                      },
                    }}
                    as={`/product/${item.id}`}
                  >
                    <div className="h-60 relative">
                      <ImgAtom
                        exist={item.backdrop_image}
                        src={item.backdrop_image}
                        width={156}
                        height={200}
                        alt={"searchResult"}
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-notice text-sm">{item.name}</p>
                      <p className="font-bold">
                        {item.price.toLocaleString()} 원
                      </p>
                    </div>
                  </Link>

                  <div
                    className={`${
                      token ? "block" : "hidden"
                    } absolute bottom-[80px] right-[10px] w-8 h-8`}
                  >
                    <PickButton
                      id={item.id}
                      wish={item.is_wish}
                      li_width={20}
                      li_height={17}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-main flex justify-center items-center min-h-[530px]">
            내역이 존재하지 않습니다
          </div>
        )}
      </div>
      <div>
        <div className="py-3">
          <div className="pb-3">
            <h2 className=" font-bold border-[3px] border-main text-center py-3">
              게시글 검색 결과
            </h2>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">
              <span className="font-bold">
                {searchResult?.posts?.results?.length}
              </span>
              개의 검색 결과
            </p>
          </div>
          {searchResult?.posts?.results?.length != 0 ? (
            <div className="list grid grid-cols-5 gap-x-4">
              {searchResult?.posts?.results?.map((item, index) => {
                return (
                  <div key={index} className="py-3 relative">
                    <Link
                      href={{
                        pathname: `/community/${item.id}`,
                        query: {
                          index: item.id,
                        },
                      }}
                      as={`/community/${item.id}`}
                    >
                      <div className="h-60 relative">
                        <Image
                          src={item.backdrop_image || ""}
                          width={156}
                          height={200}
                          alt={"searchResult"}
                        />
                        <div className="flex justify-center mt-2">
                          <p className="text-sm">{item.title}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-main flex justify-center items-center min-h-[530px]">
              내역이 존재하지 않습니다
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
