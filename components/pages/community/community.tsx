import TopCommunity from "@components/pages/community/topcommunity";
import ScrapButton from "@common/scrapbutton";
import BrandUser from "@components/pages/community/branduser";
import CategoryPost from "@components/pages/community/categorypost";

function Community() {
  return (
    <div className="flex flex-col mt-10">
      <div className="TOP10 flex flex-col">
        <div className="flex justify-between items-center">
          <p>이번주 브랜뉴 인기게시글</p>
          <p className="text-xs text-subContent">전체보기</p>
        </div>
        <h2 className="font-bold text-lg">TOP 10</h2>
        <TopCommunity />
      </div>
      <div className="brandUser flex flex-col mt-24">
        <p>세상 사람들이 브랜뉴를 활용하는 법</p>
        <p className="font-bold text-lg">BrandUser</p>
        <BrandUser />
      </div>
      <div className="favorite mt-24">
        <h2>내 취향은 이거야~</h2>
        <h2 className="text-lg font-bold">카테고리별 게시물</h2>
        <CategoryPost />
      </div>
    </div>
  );
}

export default Community;
