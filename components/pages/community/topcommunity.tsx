import ScrapButton from "@common/scrapbutton";

function TopCommunity() {
  return (
    <div className="grid grid-cols-5 gap-y-5 gap-x-2 mt-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((post, index) => {
        return (
          <div className="relative">
            <div className="w-40 h-52 rounded-xl bg-[#F5F5F5]" />
            <div className="absolute rounded-xl bg-main text-white font-bold w-7 h-7 top-2 left-2 flex justify-center items-center">
              {index + 1}
            </div>
            <div className="absolute top-40 left-[116px]">
              <ScrapButton width={14} height={18} />
            </div>
            <p className="text-sm mt-2 text-subContent">
              브랜뉴로 만들어가는 우리집 리뉴얼
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TopCommunity;
