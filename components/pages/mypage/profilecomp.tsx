import { useState } from "react";
import Image from "next/image";

function ProfileComp() {
  //프로필 이미지
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);

  //백그라운드 이미지
  const [backBase64, setBack] = useState("");
  const [backFile, setBackFile] = useState(null);

  const handleChangeFile = (e: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };
  const backGroundChangeFile = (e: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setBack(base64.toString());
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setBackFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {/*<div>*/}
      {/*  <div className="back relative">*/}
      {/*    <div className="backImage bg-[#FBFBFB] rounded-[10px]">*/}
      {/*      <Image*/}
      {/*        src={backBase64}*/}
      {/*        width={674}*/}
      {/*        height={200}*/}
      {/*        decoding="async"*/}
      {/*        alt={"backImage"}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="border-[1px] text-center border-[#0CABA8] bg-[#fff] rounded-2xl absolute right-[65px] bottom-[20px] text-[#0CABA8] text-xs w-[35px] h-[20px] cursor-pointer">*/}
      {/*      <label className="input-file-button" htmlFor="backImage">*/}
      {/*        수정*/}
      {/*      </label>*/}
      {/*      <input*/}
      {/*        type="file"*/}
      {/*        id="backImage"*/}
      {/*        className="hidden"*/}
      {/*        onChange={backGroundChangeFile}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className={`bg-[#D9D9D9] w-[100px] h-[100px] rounded-xl flex justify-center text-center items-center absolute top-[150px] left-[290px] `}*/}
      {/*  >*/}
      {/*    <div className="profile ">*/}
      {/*      {imgBase64 === undefined ? (*/}
      {/*        <>*/}
      {/*          <svg*/}
      {/*            width="42"*/}
      {/*            height="46"*/}
      {/*            viewBox="0 0 42 46"*/}
      {/*            fill="none"*/}
      {/*            xmlns="http://www.w3.org/2000/svg"*/}
      {/*          >*/}
      {/*            <path*/}
      {/*              d="M41 45C41 41.5886 41 39.8829 40.5694 38.495C39.5999 35.37 37.0989 32.9245 33.9029 31.9766C32.4834 31.5555 30.7389 31.5555 27.25 31.5555H14.75C11.2611 31.5555 9.51664 31.5555 8.09715 31.9766C4.90114 32.9245 2.4001 35.37 1.4306 38.495C1 39.8829 1 41.5886 1 45M32.25 12C32.25 18.0751 27.2132 23 21 23C14.7868 23 9.75 18.0751 9.75 12C9.75 5.92487 14.7868 1 21 1C27.2132 1 32.25 5.92487 32.25 12Z"*/}
      {/*              stroke="white"*/}
      {/*              strokeWidth="2"*/}
      {/*              strokeLinecap="round"*/}
      {/*              strokeLinejoin="round"*/}
      {/*            />*/}
      {/*          </svg>*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <Image*/}
      {/*          className="rounded-xl"*/}
      {/*          src={imgBase64}*/}
      {/*          height={105}*/}
      {/*          width={100}*/}
      {/*          decoding="async"*/}
      {/*          alt={"profile"}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*      <div className="edit border-[1px] text-center border-[#0CABA8] bg-[#fff] rounded-2xl text-[4px] absolute left-[68px] text-[#0CABA8] justify-center items-center w-[35px] bottom-3 left-14">*/}
      {/*        <label*/}
      {/*          className="input-file-button cursor-pointer"*/}
      {/*          htmlFor="mainProfile"*/}
      {/*        >*/}
      {/*          수정*/}
      {/*        </label>*/}
      {/*        <input*/}
      {/*          type="file"*/}
      {/*          id="mainProfile"*/}
      {/*          className="hidden"*/}
      {/*          onChange={handleChangeFile}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default ProfileComp;
