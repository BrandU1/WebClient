import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useObserver } from "@components/pages/community/useobserve";
import ImgAtom from "@atoms/imgatom";
import client from "@lib/api";
import {
  BranduBaseResponse,
  infinitePost,
  infiniteScroll,
} from "../../../types/privacy";
import router from "next/router";
import Image from "next/image";
import ScrapButton from "@common/scrapbutton";

const InfiniteScroll = () => {
  const OFFSET = 5;

  const postList = ({ pageParam = 0 }) =>
    client
      .get("communities/posts", {
        params: {
          limit: OFFSET,
          offset: pageParam,
        },
      })
      .then((res) => res?.data);

  const bottom = useRef(null);

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery<
    BranduBaseResponse<infinitePost>
  >(["postList"], postList, {
    getNextPageParam: (lastPage) => {
      const {
        results: { previous, next, count },
      } = lastPage;

      if (!next) return count;

      return Number(new URL(next).searchParams.get("offset"));
    },
  });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });
  return (
    <div>
      {status === "loading" && <p>불러오는 중</p>}
      <div>
        <div>
          <h2 className="mb-10 font-bold text-xl">실시간 게시물</h2>
        </div>
        {data?.pages.map((group, index) => (
          <div className="grid grid-cols-5 gap-x-2 " key={index}>
            {group.results.results?.map((item: any, index: number) => (
              <>
                <div key={index}>
                  <div
                    onClick={() => {
                      router.push(`/community/${item.id}`);
                    }}
                    className=" w-[156px] h-[200px]"
                  >
                    <ImgAtom
                      exist={item.backdrop_image}
                      src={item.backdrop_image}
                      width={156}
                      height={200}
                      alt={"searchResult"}
                    />
                  </div>

                  <div
                    onClick={() => {
                      router.push(`/community/${item.id}`);
                    }}
                    className="text-subContent text-sm h-10"
                  >
                    <p>{item.title}</p>
                  </div>
                  <div className="relative bottom-20 left-14  rounded-xl">
                    <ScrapButton
                      id={item.id}
                      scrap={item.is_scrap}
                      li_width={28}
                      li_height={30}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        ))}
      </div>
      <div ref={bottom} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
};
export default InfiniteScroll;
