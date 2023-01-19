import ScrapButton from "@common/scrapbutton";
import { BestPost, scrapList } from "../../../types/privacy";
import ImgAtom from "@atoms/imgatom";
import InfiniteScroll from "@components/pages/community/infinityscroll";
import client from "@lib/api";
import UseBranduQuery from "@hooks/useBranduQuery";
import { useRouter } from "next/router";

interface bestCommunityProps {
  bestCommunity: BestPost[];
}

function Community({ bestCommunity }: bestCommunityProps) {
  const router = useRouter();
  const getScrapped = () => {
    return client.get("accounts/scraps").then((res) => res.data);
  };
  const { data: scrappedList, isLoading: scrapLoading } = UseBranduQuery<
    scrapList[]
  >({
    queryKey: ["scrap"],
    queryFn: getScrapped,
  });
  console.log(scrappedList?.results);

  return (
    <>
      <div className="flex flex-col mt-10">
        <div className="TOP10 flex flex-col">
          <div className="flex justify-between items-center">
            <p>이번주 브랜뉴 인기게시글</p>
          </div>
          <p className="font-bold text-lg">TOP 10</p>
          <div className="grid grid-cols-5 gap-y-5 gap-x-2 mt-5">
            {bestCommunity?.map((post, index) => {
              return (
                <div className="relative">
                  <div
                    onClick={() => {
                      router.push({
                        pathname: `/community/${post.id}`,
                        query: {
                          is_scrapped: post.is_scrap ?? false,
                          is_liked: post.is_like ?? false,
                        },
                      });
                    }}
                  >
                    <div className=" w-[156px] h-[200px]">
                      <ImgAtom
                        exist={post.backdrop_image}
                        src={post.backdrop_image}
                        width={156}
                        height={200}
                        alt={"searchResult"}
                      />
                    </div>

                    <div className="absolute rounded-xl bg-main text-white font-bold w-7 h-7 top-2 left-2 flex justify-center items-center">
                      {index + 1}
                    </div>
                    <p className="text-sm mt-2 text-subContent">{post.title}</p>
                  </div>
                  <div className="absolute top-40 left-[116px]">
                    <ScrapButton
                      id={post.id}
                      scrap={post.is_scrap ?? false}
                      li_width={28}
                      li_height={30}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <InfiniteScroll />
      </div>
    </>
  );
}

export default Community;
