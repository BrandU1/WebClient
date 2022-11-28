import BranduIcon from "@components/icons/brandu";
import GoogleLogin from "react-google-login";
import GoogleLoginIcon from "@components/icons/google";
import KakaoLoginIcon from "@components/icons/kakao";
import KakaoLogin from "react-kakao-login";
import * as dotenv from "dotenv";

interface LoginProps {
  open: boolean;
  close: () => void;
}

function LoginModal({ open, close }: LoginProps) {
  return (
    <div
      className={`absolute flex justify-center py-36 top-0 ${
        open ? "w-[100vw] h-[100vh] bg-notice bg-opacity-60 " : null
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
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || " "}
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
                  // onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="kakaoLogin flex justify-center mt-5">
                <KakaoLogin
                  token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || ""}
                  onSuccess={console.log}
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
              <div
                onClick={close}
                className="close text-center text-sm text-notice cursor-pointer mt-32"
              >
                로그인 건너뛰기
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LoginModal;
