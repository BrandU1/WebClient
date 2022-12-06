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
import GOTOMyPage from "@components/login/gomypage";

function Nav() {
  const [focused, setFocused] = useState<boolean>(false);
  const showSearch = () => setFocused(true);
  const closeSearch = () => setFocused(false);

  // input State

  const [input, setInput] = useState<string>("");

  // Login 관련
  const [modalOpen, setModalOpen] = useState(false);

  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setToken(localStorage.getItem("access_token"));
    }
  });

  const openModal = () => {
    setModalOpen(true);
    setOpen(true);
  };

  const close = () => {
    setModalOpen(false);
  };

  const loginEl = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   document.addEventListener("mouseup", handleLogin);
  //   return () => {
  //     document.removeEventListener("mouseup ", handleLogin);
  //   };
  // });

  const handleLogin = (e: any) => {
    if (!loginEl.current?.contains(e.target)) {
      closeOutside();
    }
  };

  const closeOutside = () => setModalOpen(false);

  const router = useRouter();
  const path = router.pathname;

  //category 창

  const [category, setCategory] = useState<boolean>(false);
  const normalClose = () => {
    setCategory(!category);
  };

  const outside = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mouseup", handlerOutSideCategory);
    return () => {
      document.removeEventListener("mouseup ", handlerOutSideCategory);
    };
  });
  const handlerOutSideCategory = (e: any) => {
    if (!outside.current?.contains(e.target)) {
      handleCategory();
    }
  };

  const handleCategory = () => setCategory(false);

  // 마이페이지 바로가기
  const [open, setOpen] = useState<boolean>(false);

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup ", handleClickOutside);
    };
  });

  const handleClickOutside = (e: any) => {
    if (!el.current?.contains(e.target)) {
      handleMyPage();
    }
  };

  const handleMyPage = () => setOpen(false);

  // const Login = useRef<any>();
  return (
    <>
      <div className={`top-0 z-50 transition bg-white`}>
        <div className=" m-auto  max-w-4xl py-3 flex justify-between items-center min-w-fit relative">
          <Link href="/">
            <BranduIcon width={100} height={22} />
          </Link>
          <p>스토어</p>
          <p>브랜드</p>
          <div onBlur={closeSearch}>
            <div
              onClick={() => setFocused(!focused)}
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
              <Link href="/basket">
                {path.includes("basket") ? (
                  <BasketIcon
                    color="none"
                    width={20}
                    height={19}
                    stroke="#0CABA8"
                  />
                ) : (
                  <BasketIcon
                    color="none"
                    width={20}
                    height={19}
                    stroke="#767676"
                  />
                )}
              </Link>
            </div>
            <div className={`${token ? "block" : "hidden"} cursor-pointer`}>
              <ScrapIcon />
            </div>
            <div ref={outside} onClick={normalClose} className="cursor-pointer">
              <HamburgerIcon color={`${category ? "#0CABA8" : "#767676"}`} />
              {/*<Category ref={outside} />*/}
            </div>
            <div
              onClick={openModal}
              className={`${
                token ? "bg-main" : "bg-notice"
              } w-[40px] h-[40px] rounded-full flex items-center justify-center group `}
            >
              <ProfileIcon />
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-gray" />
      </div>
      {token ? (
        <div className={`${open ? "block" : "hidden"} `}>
          <GOTOMyPage />
        </div>
      ) : (
        <div
          onClick={handleLogin}
          className={` ${token ? "hidden" : "block"} flex justify-center `}
        >
          <LoginModal pageRef={loginEl} open={modalOpen} close={close} />
        </div>
      )}
      <div
        className={`absolute bg-modalBackground w-full ${
          category ? "block " : "hidden"
        }`}
      >
        <Category ref={outside} />
      </div>
    </>
  );
}

export default Nav;
