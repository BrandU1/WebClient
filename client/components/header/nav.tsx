import Image from "next/image";
import Input from "../common/input";

function Nav() {
  return (
    <div className="flex justify-center">
      <div className="w-auto max-w-4xl min-w-fit flex items-center justify-between space-x-8 py-3  ">
        <Image src="/logo/main_logo.svg" alt="logo" width={100} height={22} />
        <div className="flex space-x-9">
          <p className="text-main">스토어</p>
          <p className="text-main">커뮤니티</p>
        </div>

        <div className="flex w-[350px] h-[40px] border-[1px] border-main rounded-xl justify-between font-normal  ">
          <Input
            type="text"
            color="black"
            height={40}
            width={350}
            value="검색어를 입력해주세요"
          />
          <Image
            className="mx-3"
            src={"/logo/search.svg"}
            alt="search"
            width={14}
            height={14}
          />
        </div>
        <div className="flex items-center justify-around space-x-5">
          <Image src="/logo/heart.svg" alt="heart" width={20} height={18} />
          <Image src="/logo/basket.svg" alt="basket" width={18} height={18} />
          <Image src="/logo/scrap.svg" alt="scrap" width={14} height={18} />
          <Image
            src="/logo/hamburger.svg"
            alt="hamburger"
            width={18}
            height={12}
          />
          <div className="rounded-full bg-main w-[40px] h-[40px] flex items-center justify-center">
            <Image
              src="/logo/profile.svg"
              alt="profile"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
