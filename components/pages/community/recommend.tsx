import ScrapButton from "@common/scrapbutton";

function Recommend() {
  return (
    <div className="flex flex-col mt-24">
      <h2>이 제품에 관심이 많으시군요</h2>
      <h2 className="text-lg font-bold">추천 제품 게시글</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {[1, 2, 3, 4].map((post, index) => {
          return (
            <div className="relative">
              <div className="w-64 h-52 bg-[#F5F5F5] rounded-xl" />
              <div className="absolute top-40 left-52">
                <ScrapButton width={14} height={18} />
              </div>
              <h2 className="text-subContent text-sm mt-2">
                브랜뉴로 만들어가는 우리집 리뉴얼
              </h2>
              <div className="user flex flex-row mt-5">
                <div className="w-9 h-9 bg-gray rounded-xl" />
                <div className="flex flex-col ml-2">
                  <h2 className="text-[12px] ml-0.5">김이삭</h2>
                  <h2 className="text-[12px] text-subContent">
                    2022.12.20(화)
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recommend;
