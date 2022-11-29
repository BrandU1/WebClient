import Input from "@common/input";
import SearchIcon from "@icons/search";
import HeartIcon from "@icons/heart";
import BasketIcon from "@icons/basket";
import ScrapIcon from "@icons/scrap";
import HamburgerIcon from "@icons/hamburger";
import ProfileIcon from "@icons//profile";
import BranduIcon from "@icons/brandu";
import CloseIcon from "@icons/close";
import { useState, useEffect, useRef } from "react";
import LoginModal from "@components/login";
import Link from "next/link";
import { useRouter } from "next/router";
import Category from "@components/category";

function Nav() {
  const [focused, setFocused] = useState<boolean>(false);
  const showSearch = () => setFocused(true);
  const closeSearch = () => setFocused(false);

  // input State

  const [input, setInput] = useState<string>("");

  // Login 관련
  const [modalOpen, setModalOpen] = useState(false);
  const el = useRef();
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
  };

  const router = useRouter();
  const path = router.pathname;

  //category 창

  const [category, setCategory] = useState<boolean>(false);
  const handleCategory = () => setCategory(!category);

  return (
    <>
      <div className={`top-0 z-50 transition bg-white `}>
        <div className=" m-auto max-w-4xl py-3 flex justify-between items-center min-w-fit relative">
          <Link href="/">
            <BranduIcon width={100} height={22} />
          </Link>
          <p>스토어</p>
          <p>브랜드</p>
          <div>
            <div
              onBlur={closeSearch}
              onClick={showSearch}
              className={`flex items-center justify-between border-[1px] border-main rounded-t-xl w-[350px] h-[40px] ${
                focused ? "border-b-0" : "rounded-b-xl"
              }`}
            >
              <Input
                onChange={(e: any) => {
                  setInput(e.target.value);
                }}
                type="text"
                color="main"
                height={350}
                width={40}
                value={input}
              />

              <div className="mx-3">
                <SearchIcon />
              </div>
            </div>
            <div
              className={`dropdown  bg-white border-[1px] border-main border-t-white rounded-b-xl py-3 absolute  w-[350px] ${
                focused ? "block" : "hidden"
              }`}
            >
              <div className="flex justify-between px-3 py-2">
                <h3 className="text-sm">최근 검색어</h3>
                <p className="text-xs">전체삭제</p>
              </div>
              <div className="recently px-5 flex items-center justify-between text-sm text-notice border-b-[1px] border-gray w-[95%] m-auto">
                <p className="py-3">크라프트 백</p>
                <CloseIcon />
              </div>
              <div className="topic">
                <h3 className="p-3 text-sm">급상승 검색어</h3>
                <div className="columns-2  m-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                    return (
                      <div key={index} className=" px-5 text-sm py-1 ">
                        <p>
                          <span className="text-main font-bold mx-4">
                            {index + 1}
                          </span>
                          박재현 짱짱
                        </p>
                        <div
                          className={`border-b-[1px] border-gray py-1 ${
                            index === 4 || index === 9 ? "hidden" : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`${token ? "block" : "hidden"} cursor-pointer`}>
              <Link href="/pick">
                {path.includes("pick") ? (
                  <HeartIcon
                    color="none"
                    width={21}
                    height={21}
                    border="#0CABA8"
                  />
                ) : (
                  <HeartIcon
                    color="none"
                    width={21}
                    height={21}
                    border="#767676"
                  />
                )}
              </Link>
            </div>
            <div className={`${token ? "block" : "hidden"} cursor-pointer`}>
              <BasketIcon
                color="none"
                width={18}
                height={18}
                stroke="#767676"
              />
            </div>
            <div className={`${token ? "block" : "hidden"} cursor-pointer`}>
              <ScrapIcon />
            </div>
            <div className="cursor-pointer">
              <HamburgerIcon
                onClick={handleCategory}
                color={`${category ? "#0CABA8" : "#767676"}`}
              />
            </div>
            <div
              onClick={openModal}
              className={`${
                token ? "bg-main" : "bg-notice"
              } w-[40px] h-[40px] rounded-full flex items-center justify-center `}
            >
              <ProfileIcon />
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-gray" />
      </div>
      <div className="flex justify-center">
        <LoginModal open={modalOpen} close={close} />
      </div>
      <div
        className={`absolute bg-modalBackground w-full ${
          category ? "block " : "hidden"
        }`}
      >
        <Category />
      </div>
    </>
  );
}

export default Nav;
