import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { useObserver } from "@components/pages/community/useobserve";
import ImgAtom from "@atoms/imgatom";
import client from "@lib/api";
import {
  BranduBaseResponse,
  infinitePost,
  infiniteScroll,
} from "../../../types/privacy";

const InfiniteScroll = () => {
  const OFFSET = 10;

  const postList = ({ pageParam = OFFSET }) =>
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
        results: { next },
      } = lastPage;

      if (!next) return false;

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
              <div key={index} className="mb-4">
                <div>
                  <ImgAtom
                    exist={null}
                    src={""}
                    width={156}
                    height={200}
                    alt={"searchResult"}
                  />
                </div>
                <div className="text-subContent text-sm">
                  <p>{item.title}</p>
                </div>
              </div>
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
