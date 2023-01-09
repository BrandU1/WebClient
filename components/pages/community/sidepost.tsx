import Image from "next/image";
import ScrapButton from "@common/scrapbutton";
import client from "@lib/api";

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
        </div>
        <div className="button flex flex-row mt-5 justify-between">
          <button className="bg-main h-11 w-36 text-white text-sm rounded-xl mr-2">
            팔로우
          </button>
          <ScrapButton width={26} height={24} />
        </div>
      </div>
    </div>
  );
}

export default SidePost;
