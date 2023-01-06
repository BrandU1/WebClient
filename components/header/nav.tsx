import SearchIcon from "@icons/search";
import HeartIcon from "@icons/heart";
import BasketIcon from "@icons/basket";
import ScrapIcon from "@icons/scrap";
import HamburgerIcon from "@icons/hamburger";
import ProfileIcon from "@icons//profile";
import BranduIcon from "@icons/brandu";
import CloseIcon from "@icons/close";
import { useEffect, useRef, useState } from "react";
import LoginModal from "@components/login";
import Link from "next/link";
import { useRouter } from "next/router";
import Category from "@components/category";
import GOTOMyPage from "@components/login/gomypage";
import client from "@lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BranduBaseResponse, History, Ranking } from "../../types/privacy";
import { useRecoilState } from "recoil";
import { isLoginModalOpen } from "../../recoil/base";
import { ToastState, ToastStateAtom } from "../../recoil/toast";
import { AlertToast } from "@atoms/alerttoast";
import useUserInfo from "@hooks/defaultValue";

function Nav() {
  useUserInfo();
  const [focused, setFocused] = useState<boolean>(false);
  const closeSearch = () => setFocused(false);

  // inputBar blur
  const inputEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mouseup", handleInput);
    return () => {
      document.removeEventListener("mouseup ", handleInput);
    };
  });

  const handleInput = (e: any) => {
    if (!inputEl.current?.contains(e.target)) {
      closeSearch();
    }
  };

  // input State
  const [input, setInput] = useState<string>("");
  const [clickInput, setClickInput] = useState<string>("");

  const inputClear = () => {
    setInput("");
    setClickInput("");
  };

  // Login 관련
  const [modalOpen, setModalOpen] = useRecoilState(isLoginModalOpen);

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

  const handleLogin = (e: any) => {
    if (
      !loginEl.current?.contains(e.target) &&
      document.activeElement?.contains(e.target)
    ) {
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

  // History API 연동
  const getHistory = () => {
    return client.get("search/history").then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<History[]>>(
    ["history"],
    getHistory
  );

  // Ranking API 연동
  const getRanking = () => {
    return client.get("search/rank").then((res) => res.data);
  };
  const { data: rankingData, isLoading: rankLoading } = useQuery<
    BranduBaseResponse<Ranking[]>
  >(["rank"], getRanking);

  /*input search*/
  const onSearch = () => {
    if (input !== "" && input.replace(/ /g, "") !== "") {
      router.push(`/search?query=${input}`);
      setFocused(false);
    } else if (input === "") {
      setFocused(false);
      alert("검색어를 입력해주세요");
    } else if (input.replace(/ /g, "") === "") {
      setFocused(false);
      inputClear();
      alert("공백은 검색이 불가능합니다.");
    }
  };
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  /*click search*/
  const onClickSearch = () => {
    setInput(clickInput);
    router.push(`/search?query=${clickInput}`);
    setFocused(false);
  };
  useEffect(() => {
    if (clickInput !== "") {
      onClickSearch();
    }
  }, [clickInput]);

  const queryClient = useQueryClient();

  const deleteHistory = useMutation(
    (id: number) =>
      client.delete(`/search/history/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["history"]);
      },
    }
  );

  const deleteAllHistory = useMutation(
    () => client.delete(`/search/history/all`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["history"]);
      },
    }
  );

  //Pick, Bucket, ... 알림
  const [toast, setToast] = useRecoilState<ToastState>(ToastStateAtom);

  //alert 5초
  useEffect(() => {
    if (toast.alert == true) {
      const timer = setTimeout(() => {
        const temp = { ...toast };
        temp.alert = false;
        setToast(temp);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast.alert]);

  //이동하기 후 alert 지우기
  const timerOut = () => {
    const temp = { ...toast };
    temp.alert = false;
    setToast(temp);
  };

  return (
    <>
      <div
        className={`top-0 z-50 transition bg-white border-b-[1px] border-gray`}
      >
        <div className=" m-auto  max-w-4xl py-3 flex justify-between items-center min-w-fit relative">
          <Link
            href="/"
            onClick={() => {
              inputClear();
            }}
          >
            <BranduIcon width={100} height={22} />
          </Link>
          {path.includes("/store") ? (
            <Link href={"/store"}>
              <div className={`text-main font-bold`}>
                <p>스토어</p>
              </div>
            </Link>
          ) : (
            <Link href={"/store"}>
              <div
                onClick={() => {
                  inputClear();
                }}
              >
                <p>스토어</p>
              </div>
            </Link>
          )}
          {path.includes("/community") ? (
            <Link href={"/community"}>
              <div className={`text-main font-bold`}>
                <p>커뮤니티</p>
              </div>
            </Link>
          ) : (
            <Link href={"/community"}>
              <div
                onClick={() => {
                  inputClear();
                }}
              >
                <p>커뮤니티</p>
              </div>
            </Link>
          )}
          <div ref={inputEl}>
            <div
              onClick={() => setFocused(!focused)}
              className={`flex items-center justify-between border-[1px] border-main rounded-t-xl w-[350px] h-[40px] ${
                focused ? "border-b-0" : "rounded-b-xl"
              }`}
            >
              <input
                className={`text-main w-full h-fit rounded-xl text-sm font-bold border-main focus:outline-none px-2`}
                onChange={(e: any) => {
                  setInput(e.target.value);
                }}
                type="text"
                placeholder="검색어를 입력해주세요"
                value={input}
                onKeyPress={onKeyPress}
              />
              <div onClick={onSearch} className="mx-3">
                <SearchIcon />
              </div>
            </div>
            {focused && (
              <div className="dropdown bg-white border-[1px] border-main border-t-white rounded-b-xl py-3 absolute w-[350px]">
                <div className="flex justify-between px-3 py-2">
                  <h3 className="text-sm">최근 검색어</h3>
                  <p
                    onClick={() => {
                      deleteAllHistory.mutate();
                    }}
                    className="text-xs cursor-pointer"
                  >
                    전체삭제
                  </p>
                </div>
                <div className="recently px-5  text-sm text-notice border-b-[1px] border-gray w-[95%] m-auto">
                  {data?.results.map((item, index) => {
                    return (
                      <div className="flex items-center justify-between">
                        <div
                          className="cursor-pointer"
                          key={index}
                          onClick={() => {
                            setClickInput(item.search_word);
                          }}
                        >
                          <p className="py-2" onClick={() => {}}>
                            {item.search_word}
                          </p>
                        </div>
                        <div onClick={() => deleteHistory.mutate(item.id)}>
                          <CloseIcon />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="topic">
                  <h3 className="p-3 text-sm">급상승 검색어</h3>
                  <div className="columns-2  m-auto">
                    {rankingData?.results.map((item, index) => {
                      return (
                        <div key={index} className=" px-5 text-sm py-1 ">
                          <p
                            className="cursor-pointer"
                            onClick={() => {
                              setClickInput(item.search_word);
                            }}
                          >
                            <span className="text-main font-bold mx-4">
                              {index + 1}
                            </span>
                            {item.search_word}
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
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div
              onClick={() => {
                inputClear();
              }}
              className="flex items-center space-x-4"
            >
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
              <div
                ref={outside}
                onClick={normalClose}
                className="cursor-pointer"
              >
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
          <Category onClose={normalClose} />
        </div>
      </div>
      <div>
        {toast && (
          <AlertToast
            text={toast.type}
            path={toast.path}
            start={toast.alert}
            onClose={() => {
              timerOut();
            }}
          />
        )}
      </div>
    </>
  );
}

export default Nav;
