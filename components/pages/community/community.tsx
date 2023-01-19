import ScrapButton from "@common/scrapbutton";
import { BestPost, scrapList } from "../../../types/privacy";
import ImgAtom from "@atoms/imgatom";
import InfiniteScroll from "@components/pages/community/infinityscroll";
import client from "@lib/api";
import UseBranduQuery from "@hooks/useBranduQuery";
import { useRouter } from "next/router";
import Link from "next/link";

interface bestCommunityProps {
  bestCommunity: BestPost[];
}

function Community({ bestCommunity }: bestCommunityProps) {
  const router = useRouter();

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
                  <Link key={post.id} href={`/community/${post.id}`}>
                    <div className=" w-[156px] h-[200px]">
                      <ImgAtom
                        exist={post.backdrop_image}
                        src={post.backdrop_image}
                        width={156}
                        height={200}
                        alt={"searchResult"}
                      />
                    </div>
                  </Link>
                  <div className="absolute rounded-xl bg-main text-white font-bold w-7 h-7 top-2 left-2 flex justify-center items-center">
                    {index + 1}
                  </div>
                  <p className="text-sm mt-2 text-subContent">{post.title}</p>

                  <div className="absolute top-40 left-[116px] rounded-xl">
                    <ScrapButton
                      id={post.id}
                      scrap={post?.is_scrap}
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
