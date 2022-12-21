import Image from "next/image";
import ScrapButton from "@common/scrapbutton";

function SidePost() {
  return (
    <div className="w-[214px] flex flex-col sticky top-40">
      <div className="flex flex-col border border-main rounded-xl h-[137px] p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <div className="w-9 h-9 bg-gray rounded-xl" />
            <div className="flex flex-col ml-2 text-[12px]">
              <h2>김이삭</h2>
              <div className="flex flex-row">
                <p className="text-subContent">팔로워</p>
                <p className="font-bold">299</p>
              </div>
            </div>
          </div>
          <Image src={"/logo/share.svg"} alt={"share"} width={18} height={20} />
        </div>
        <div className="button flex flex-row mt-5 justify-between">
          <button className="bg-main h-11 w-36 text-white text-sm rounded-xl mr-2">
            팔로우
          </button>
          <ScrapButton width={26} height={24} />
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-[12px]">구매목록</h2>
        <div className="grid grid-cols-2 gap-2 mt-5">
          {[1, 2, 3, 4, 5, 6].map((list, index) => {
            return <div className="w-[70px] h-[70px] bg-gray rounded-xl" />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SidePost;
