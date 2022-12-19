import { SearchResult } from "../../../types/privacy";
import Link from "next/link";
import Image from "next/image";
import HeartIcon from "@icons/heart";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import PickButton from "@components/pick/pickbutton";

interface SearchProps {
  searchResult: SearchResult[];
}

function Search({ searchResult }: SearchProps) {
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: number) =>
      client.post(`/accounts/wishes/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );

  const deletePick = useMutation(
    (id: number) =>
      client.delete(`/accounts/wishes/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );

  return (
    <div className="py-3">
      <div className="flex justify-between">
        <p className="text-sm">
          <span className="font-bold">{searchResult.length}</span> 개의 검색
          결과
        </p>
        <p className="text-sm">추천순 | 판매량순 | 낮은 가격순 | 높은 가격순</p>
      </div>
      <div className="list grid grid-cols-5 gap-x-4">
        {searchResult?.map((item, index) => {
          return (
            <div key={index} className="py-3 relative">
              <Link
                href={{
                  pathname: `/product/${item.id}`,
                  query: {
                    index: item?.id,
                  },
                }}
                as={`/product/${item.id}`}
              >
                <div className="h-60 relative">
                  <Image
                    className="rounded-2xl"
                    src={`http://192.168.0.2${item.backdrop_image}`}
                    alt="list"
                    layout="fill"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-notice text-sm">{item.name}</p>
                  <p className="font-bold">{item.price.toLocaleString()} 원</p>
                </div>
              </Link>

              <div className={`${token ? "block" : "hidden"} `}>
                {/*<div*/}
                {/*  onClick={() => {*/}
                {/*    if (item.is_wish) {*/}
                {/*      deletePick.mutate(item.id);*/}
                {/*    } else mutation.mutate(item.id);*/}
                {/*  }}*/}
                {/*  className={`${*/}
                {/*    item.is_wish ? "bg-main " : "bg-[#DFDFE0]"*/}
                {/*  } pickBtn absolute bottom-[80px] right-[10px] w-8 h-8 rounded-xl bg-[#DFDFE0] flex justify-center items-center`}*/}
                {/*>*/}
                {/*  <HeartIcon*/}
                {/*    color={`${item.is_wish ? "#fff" : "#DFDFE0"}`}*/}
                {/*    width={20}*/}
                {/*    height={17}*/}
                {/*    border="#fff"*/}
                {/*  />*/}
                {/*</div>*/}
                <PickButton id={item.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
