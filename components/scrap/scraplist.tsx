import { searchPost } from "../../types/privacy";
import Image from "next/image";
import Link from "next/link";
import ImgAtom from "@atoms/imgatom";
import ScrapButton from "@common/scrapbutton";

interface Scraps {
  data: searchPost[];
}

function ScrapList({ data }: Scraps) {
  // console.log(data);

  return (
    <div className="max-w-4xl m-auto min-h-[55vh]">
      <div>
        <h2 className="py-5 font-bold text-xl">스크랩북</h2>
        <div className="border-b-[1px] border-black" />
      </div>
      <div className="grid grid-cols-5 gap-y-5 gap-x-2 mt-5">
        {data?.map((post, index) => {
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

                <p className="text-sm mt-2 text-subContent">{post.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ScrapList;
