import Image from "next/image";
import ScrapButton from "@common/scrapbutton";

function Profile() {
  return (
    <div className="flex flex-col max-w-4xl mt-5">
      <div className="profileInfo relative">
        <div className="w-full h-52 rounded-xl bg-gray" />
        <div className="w-24 h-24 rounded-xl bg-subContent flex justify-center items-center absolute top-36 left-6">
          <Image
            src={"/logo/profile.svg"}
            alt={"profile"}
            width={40}
            height={44}
          />
        </div>
        <div className="flex flex-row justify-end mt-6 text-sm items-center">
          <p className="mr-0.5">팔로워</p>
          <p className="font-bold">295</p>
          <p className="mx-1">|</p>
          <p className="mr-0.5">팔로잉</p>
          <p className="font-bold">51</p>
          <button className="bg-main text-white w-14 h-7 rounded-xl ml-2">
            팔로우
          </button>
        </div>
        <div className="px-7">
          <h2 className="font-bold text-lg">김이삭</h2>
          <h2>@2_sac</h2>
          <h2 className="mt-2 text-subContent">
            집 꾸미기를 좋아하는 사람입니다.
          </h2>
        </div>
      </div>
      <div className="border-b border-gray w-full my-5" />
      <div className="postedList px-6">
        <h2>게시물 4개</h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {[1, 2, 3, 4].map((post, index) => {
            return (
              <div className="relative">
                <div className="w-48 h-48 bg-[#F5F5F5] rounded-xl" />
                <div className="absolute top-36 left-36">
                  <ScrapButton width={14} height={18} />
                </div>
                <h2 className="text-subContent text-sm mt-2">
                  브랜뉴로 만들어가는 우리집 리뉴얼
                </h2>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b border-gray w-full mt-5 mb-24" />
    </div>
  );
}
export default Profile;
