import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { useObserver } from "@components/pages/community/useobserve";
import ImgAtom from "@atoms/imgatom";

const InfiniteScroll = () => {
  const OFFSET = 10;

  const getPokemonList = ({ pageParam = OFFSET }) =>
    axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: OFFSET,
          offset: pageParam,
        },
      })
      .then((res) => res?.data);

  const bottom = useRef(null);

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    ["pokemonList"],
    getPokemonList,
    {
      getNextPageParam: (lastPage) => {
        const { next } = lastPage;

        if (!next) return false;

        return Number(new URL(next).searchParams.get("offset"));
      },
    }
  );
  // console.log(data);

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });
  return (
    <div>
      {status === "loading" && <p>불러오는 중</p>}
      <div>
        {data?.pages.map((group, index) => (
          <div className="grid grid-cols-5" key={index}>
            {group.results.map((item: any, index: number) => (
              <div>
                <div className="">
                  <ImgAtom
                    exist={null}
                    src={""}
                    width={156}
                    height={200}
                    alt={"searchResult"}
                  />
                </div>
                <p>{item.name}</p>
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
