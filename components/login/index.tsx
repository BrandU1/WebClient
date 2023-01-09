import BranduIcon from "@components/icons/brandu";
import GoogleLogin from "react-google-login";
import GoogleLoginIcon from "@components/icons/google";
import KakaoLoginIcon from "@components/icons/kakao";
import KakaoLogin from "react-kakao-login";
import { useForm } from "react-hook-form";
import client from "@lib/api";
import { useEffect, useState } from "react";
import ModalFrame from "@common/modalframe";
import { useMutation } from "@tanstack/react-query";

interface LoginProps {
  open: boolean;
  close: () => void;
  pageRef: React.ForwardedRef<HTMLDivElement>;
}

function LoginModal({ open, close, pageRef }: LoginProps) {
  const kakaoSuccess = async (res: any) => {
    client
      .post(`/auth/kakao/login`, {
        access_token: res.response.access_token,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        window.location.href = "/";
      });
  };

  const GoogleSuccess = async (res: any) => {
    client
      .post(`/auth/google/login`, {
        access_token: res.accessToken,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        window.location.href = "/";
      });
  };

  const TestSuccess = async (res: any) => {
    client
      .post(`/auth/test/login`, {
        username: res.id,
        password: res.password,
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          window.location.href = "/";
        } else {
          alert("로그인 정보가 올바르지 않습니다.");
        }
      });
  };

  const { register, handleSubmit } = useForm({});

  const [testLogin, setTestLogin] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const mainPage = document.getElementById("main-view");
      if (mainPage) {
        mainPage.style.overflow = "hidden";
      }
    }
  }, [open]);

  return (
    <div
      className={`absolute flex py-36 top-0 z-50 justify-center left-0 ${
        open && "w-screen h-screen justify-center bg-notice bg-opacity-60"
      }  `}
    >
      <div onBlur={close} className={open ? "openModal modal " : "modal "}>
        {open ? (
          <div className=" w-[600px] h-[500px] bg-modalBackground rounded-2xl">
            <div className="header pt-16 flex justify-center">
              <div>
                <h2 className="text-main mb-2">나를 위한 친환경 브랜딩</h2>
                <BranduIcon width={150} height={33} />
              </div>
            </div>
            <div className="login-button mt-16">
              <div className="googleLogin flex justify-center ">
                <GoogleLogin
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
                  render={(renderProps) => (
                    <button
                      className="bg-white flex items-center px-4
                    w-[320px] h-[46px] text-center rounded-xl "
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <GoogleLoginIcon />
                      <p className="pl-20 text-sm text-notice">구글로 로그인</p>
                    </button>
                  )}
                  buttonText="구글로 로그인"
                  onSuccess={GoogleSuccess}
                  // onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="kakaoLogin flex justify-center mt-5">
                <KakaoLogin
                  token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || ""}
                  onSuccess={kakaoSuccess}
                  onFail={console.error}
                  onLogout={console.info}
                  render={({ onClick }) => {
                    return (
                      <div
                        className="flex items-center text-center px-4  w-[320px] h-[46px]  rounded-xl bg-white"
                        onClick={(e) => {
                          e.preventDefault();
                          onClick();
                        }}
                      >
                        <KakaoLoginIcon />
                        <p className="pl-16 text-sm text-notice">
                          카카오톡으로 로그인
                        </p>
                      </div>
                    );
                  }}
                />
              </div>

              <div className="testLogin flex justify-center mt-5">
                <button
                  className="bg-white flex items-center px-4
                    w-[320px] h-[46px] text-center rounded-xl"
                  onClick={() => {
                    setTestLogin(true);
                  }}
                >
                  <p className="pl-20 text-sm text-notice">테스트 로그인</p>
                </button>
              </div>
              <div
                onClick={close}
                className="close text-center text-sm text-notice cursor-pointer mt-32"
              >
                로그인 건너뛰기
              </div>
            </div>
          </div>
        ) : null}
        {testLogin && (
          <ModalFrame
            close={() => {
              setTestLogin(false);
            }}
            blur={() => {}}
            pageRef={null}
            width={500}
            height={600}
            title={""}
            components={
              <div className="flex flex-col justify-center items-center space-y-5 mt-10 px-10 select-none">
                <div className="flex flex-row">
                  <span>아이디</span>
                  <input
                    id="test-id"
                    {...register("id")}
                    className="w-full flex-1 rounded-lg ml-3 pl-2 focus:outline-none"
                    type="text"
                    placeholder="아이디를 입력해주세요."
                  />
                </div>
                <div className="flex flex-row pb-10">
                  <span>비밀번호</span>
                  <input
                    id="test-password"
                    {...register("password")}
                    className="w-full flex-1 rounded-lg ml-3 pl-2 mr-5 focus:outline-none"
                    type="text"
                    placeholder="비밀번호를 입력해주세요."
                  />
                </div>
                <button
                  className="bg-main rounded-xl text-white w-48 h-10"
                  onClick={handleSubmit(TestSuccess)}
                >
                  로그인하기
                </button>
              </div>
            }
            bgColor={"black"}
          />
        )}
      </div>
    </div>
  );
}

export default LoginModal;
