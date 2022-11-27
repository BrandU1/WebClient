import Input from "../common/input";
import SearchIcon from "../icons/search";
import HeartIcon from "../icons/heart";
import BasketIcon from "../icons/basket";
import ScrapIcon from "../icons/scrap";
import HamburgerIcon from "../icons/hamburger";
import ProfileIcon from "../icons/profile";
import BranduIcon from "../icons/brandu";
import CloseIcon from "../icons/close";
import { useState, useEffect, useRef } from "react";
import LoginModal from "@components/login";

function Nav() {
  const [focused, setFocused] = useState<boolean>(false);
  const showSearch = () => setFocused(true);
  const closeSearch = () => setFocused(false);

  // Login Modalframe 창
  const [modalOpen, setModalOpen] = useState(false);
  const el = useRef();

  const openModal = () => {
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
  };
  // const closeModal = ({ e }:any) => {
  //   if(modalOpen && (!el.current)) setModalOpen(false)
  // };

  // useEffect(()=>{
  //   window.addEventListener('click',closeModal);
  //   return() =>{
  //     window.removeEventListener('click',closeModal);
  //   }
  // },[])

  return (
    <>
      <div className={`top-0 z-50 transition bg-white `}>
        <div className=" m-auto max-w-4xl py-3 flex justify-between items-center min-w-fit relative">
          <BranduIcon width={100} height={22} />
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
                type="text"
                color="main"
                height={350}
                width={40}
                value="검색어를 입력해주세요"
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
            <HeartIcon color="none" />
            <BasketIcon color="none" />
            <ScrapIcon />
            <HamburgerIcon />
            <div
              onClick={openModal}
              className="bg-main w-[40px] h-[40px] rounded-full flex items-center justify-center "
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
    </>
  );
}

export default Nav;
