import ScrapButton from "@common/scrapbutton";

function CategoryPost() {
  return (
    <div className="columns-4 gap-5 mt-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((post, idx) => {
        return (
          <div key={idx} className="inline-block mb-5">
            <div className="cursor-pointer justify-center flex w-48">
              <div className="relative">
                <div className="w-48 min-h-fit h-52 bg-[#F5F5F5] rounded-xl" />
                <div className="absolute bottom-2 right-2">
                  <ScrapButton width={14} height={18} />
                </div>
              </div>
            </div>
            <span className="text-sm text-[#767676] mt-[10px]">
              브랜뉴로 만들어가는 우리집 리뉴얼
            </span>
            <div className="profile flex flex-row mt-5">
              <div className="profileImg w-[35px] h-[35px] rounded-xl bg-[#D9D9D9]" />
              <div className="flex flex-col ml-[10px]">
                <span className="profileName text-xs">김이삭</span>
                <span className="postDate text-xs text-[#767676]">
                  2022.08.01(월)
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default CategoryPost;
