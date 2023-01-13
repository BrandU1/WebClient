import TopCommunity from "@components/pages/community/topcommunity";
import ScrapButton from "@common/scrapbutton";
import BrandUser from "@components/pages/community/branduser";
import CategoryPost from "@components/pages/community/categorypost";
import { BestPost } from "../../../types/privacy";
import ImgAtom from "@atoms/imgatom";
import Link from "next/link";
import InfiniteScroll from "@components/pages/community/infinityscroll";
import Image from "next/image";

interface bestCommunityProps {
  bestCommunity: BestPost[];
}

function Community({ bestCommunity }: bestCommunityProps) {
  return (
    <>
      <div className="flex flex-col mt-10">
        <div className="TOP10 flex flex-col">
          <div className="flex justify-between items-center">
            <p>이번주 브랜뉴 인기게시글</p>
          </div>
          <h2 className="font-bold text-lg">TOP 10</h2>
          <div className="grid grid-cols-5 gap-y-5 gap-x-2 mt-5">
            {bestCommunity?.map((post, index) => {
              return (
                <Link key={index} href={`/community/${post.id}`}>
                  <div className="relative">
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
                    <div className="absolute top-40 left-[116px]">
                      <ScrapButton width={14} height={18} />
                    </div>
                    <p className="text-sm mt-2 text-subContent">{post.title}</p>
                  </div>
                </Link>
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
