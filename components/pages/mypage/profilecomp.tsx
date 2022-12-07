import { useState } from "react";
import Image from "next/image";
import client from "@lib/api";
import { useForm } from "react-hook-form";
import { UserInterface } from "../../../types/privacy";

interface ProfileForm {
  profile: UserInterface;
}

function ProfileComp({ profile }: ProfileForm) {
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

  const { register, handleSubmit, watch } = useForm<UserInterface>();

  const onValid = () => {
    const formData = new FormData();
    if (backFile) {
      formData.append("backdrop_image", backFile);
    }
    if (imgFile) {
      formData.append("profile_image", imgFile);
    }
    formData.append("nickname", watch("nickname")!);
    formData.append("name", watch("name")!);
    formData.append("phone_number", watch("phone_number")!);
    formData.append("email", watch("email")!);
    formData.append("social_link", watch("social_link")!);
    formData.append("description ", watch("description")!);

    client
      .patch("accounts/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("수정되었습니다.");
      });
  };

  if (!profile) return <div></div>;

  return (
    <div className="pl-5 flex flex-col">
      <form onSubmit={handleSubmit(onValid)} className="registerForm">
        <div className="back relative">
          <div className="backImage bg-lightGary rounded-[10px]">
            {profile.backdrop_image && (
              <Image
                className="rounded-xl"
                src={`http://192.168.0.2/${profile.backdrop_image}`}
                height={105}
                width={100}
                decoding="async"
                alt={"profile"}
              />
            )}
            {!profile.backdrop_image &&
              (!backBase64 ? (
                <>
                  <svg
                    width="42"
                    height="46"
                    viewBox="0 0 42 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41 45C41 41.5886 41 39.8829 40.5694 38.495C39.5999 35.37 37.0989 32.9245 33.9029 31.9766C32.4834 31.5555 30.7389 31.5555 27.25 31.5555H14.75C11.2611 31.5555 9.51664 31.5555 8.09715 31.9766C4.90114 32.9245 2.4001 35.37 1.4306 38.495C1 39.8829 1 41.5886 1 45M32.25 12C32.25 18.0751 27.2132 23 21 23C14.7868 23 9.75 18.0751 9.75 12C9.75 5.92487 14.7868 1 21 1C27.2132 1 32.25 5.92487 32.25 12Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <Image
                  className="rounded-xl"
                  src={backBase64}
                  height={105}
                  width={100}
                  decoding="async"
                  alt={"profile"}
                />
              ))}
            {/*{backBase64 ? (*/}
            {/*  <Image*/}
            {/*    src={`http://192.168.0.2/${backBase64}`}*/}
            {/*    width={674}*/}
            {/*    height={200}*/}
            {/*    decoding="async"*/}
            {/*    alt={"backImage"}*/}
            {/*  />*/}
            {/*) : (*/}
            {/*  <div className="w-[674px] h-[200px]"></div>*/}
            {/*)}*/}
          </div>
          <div className="border-[1px] text-center border-main bg-white rounded-2xl absolute right-5 bottom-5 text-main text-xs w-[35px] h-[20px] cursor-pointer">
            <label className="input-file-button" htmlFor="backImage">
              수정
            </label>
            <input
              type="file"
              id="backImage"
              className="hidden"
              onChange={backGroundChangeFile}
            />
          </div>

          <div
            className={`bg-gray w-[100px] h-[100px] rounded-xl flex justify-center text-center items-center absolute -bottom-12 right-72 `}
          >
            <div className="profile ">
              {profile.profile_image && (
                <Image
                  className="rounded-xl"
                  src={`http://192.168.0.2/${profile.profile_image}`}
                  height={105}
                  width={100}
                  decoding="async"
                  alt={"profile"}
                />
              )}
              {!profile.profile_image &&
                (!imgBase64 ? (
                  <>
                    <svg
                      width="42"
                      height="46"
                      viewBox="0 0 42 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M41 45C41 41.5886 41 39.8829 40.5694 38.495C39.5999 35.37 37.0989 32.9245 33.9029 31.9766C32.4834 31.5555 30.7389 31.5555 27.25 31.5555H14.75C11.2611 31.5555 9.51664 31.5555 8.09715 31.9766C4.90114 32.9245 2.4001 35.37 1.4306 38.495C1 39.8829 1 41.5886 1 45M32.25 12C32.25 18.0751 27.2132 23 21 23C14.7868 23 9.75 18.0751 9.75 12C9.75 5.92487 14.7868 1 21 1C27.2132 1 32.25 5.92487 32.25 12Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                ) : (
                  <Image
                    className="rounded-xl"
                    src={imgBase64}
                    height={105}
                    width={100}
                    decoding="async"
                    alt={"profile"}
                  />
                ))}
              <div className="edit border-[1px] text-center border-main bg-white rounded-2xl text-[4px] absolute left-[68px] text-main justify-center items-center w-[35px] bottom-3 left-14">
                <label
                  className="input-file-button cursor-pointer"
                  htmlFor="mainProfile"
                >
                  수정
                </label>
                <input
                  type="file"
                  id="mainProfile"
                  className="hidden"
                  onChange={handleChangeFile}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 border-b text-base font-bold pb-5">회원정보</div>
        <div className="flex justify-around my-2 mt-6">
          <div className="title w-[60px] text-subContent text-sm">
            <h2>닉네임</h2>
          </div>
          <div className="InputBar">
            <input
              defaultValue={profile?.nickname}
              {...register("nickname")}
              className={`border-[1px] border-gray w-[566px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
              placeholder="닉네임"
            />
          </div>
        </div>
        <div className="flex justify-around my-2">
          <div className="title w-[60px] text-subContent text-sm">
            <h2>이름</h2>
          </div>
          <div className="InputBar">
            <input
              defaultValue={profile?.name}
              {...register("name")}
              className={`border-[1px] border-gray w-[566px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
              placeholder="이름"
            />
          </div>
        </div>
        <div className="flex justify-around my-2">
          <div className="title w-[60px] text-subContent text-sm">
            <h2>연락처</h2>
          </div>
          <div className="InputBar">
            <input
              defaultValue={profile.phone_number}
              {...register("phone_number")}
              className={`border-[1px] border-gray w-[566px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
              placeholder="연락처"
            />
          </div>
        </div>
        <div className="flex justify-around my-2">
          <div className="title w-[60px] text-subContent text-sm">
            <h2>이메일</h2>
          </div>
          <div className="InputBar">
            <input
              defaultValue={profile.email}
              {...register("email")}
              className={`border-[1px] border-gray w-[566px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
              placeholder="이메일"
            />
          </div>
        </div>
        <div className="flex justify-around my-2">
          <div className="title w-[60px] text-subContent text-sm">
            <h2>SNS</h2>
          </div>
          <div className="InputBar">
            <input
              defaultValue={profile.social_link}
              {...register("social_link")}
              className={`border-[1px] border-gray w-[566px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
              placeholder="SNS"
            />
          </div>
        </div>
        <div className="flex justify-around my-2">
          <div className="title w-[60px] text-subContent text-sm">
            <h2>소개</h2>
          </div>
          <div className="InputBar">
            <input
              defaultValue={profile.description}
              {...register("description")}
              className={`border-[1px] border-gray w-[566px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
              placeholder="소개"
            />
          </div>
        </div>
        <div className="SaveButton flex justify-center mt-5 cursor-pointer">
          <button
            className="text-white w-[318px] h-[45px] text-sm font-bold rounded-xl bg-main"
            onClick={handleSubmit(onValid)}
          >
            저장하기
          </button>
        </div>
      </form>

      <div className=" flex justify-between border-b pb-5 border-black mt-5">
        <div className="flex items-center">
          <span className="font-bold text-xl px-[10px] mt-5 ">
            연동된 SNS 계정
          </span>
        </div>
      </div>
      {/*<div className="snsIcon flex flex-row justify-evenly mt-[23px]">*/}
      {/*  <div className="google">*/}
      {/*    {data?.platforms[0].platform == "GOOGLE" ? (*/}
      {/*      <div className="flex flex-col justify-center items-center text-[14px] text-[#767676]">*/}
      {/*        <GoogleLoginIcon /> //색 있는 Icon*/}
      {/*        <div>로그인연동</div>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <GoogleLoginIcon />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div className="kakao">*/}
      {/*    {data?.platforms[0].platform == "KAKAO" ? (*/}
      {/*      <div className="flex flex-col justify-center items-center text-[14px] text-[#767676]">*/}
      {/*        <KakaoLoginIcon />*/}
      {/*        <div className="mt-[10px]">*/}
      {/*          {data?.platforms[0].created.slice(0, 10)}*/}
      {/*        </div>*/}
      {/*        <div>로그인연동</div>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      //흑백 icon으로 변경*/}
      {/*      <KakaoLoginIcon />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div className="naver">*/}
      {/*    {data?.platforms[0].platform == "NAVER" ? (*/}
      {/*      <div className="flex flex-col justify-center items-center text-[14px] text-[#767676]">*/}
      {/*        //color icon으로 변경*/}
      {/*        <NaverIcon />*/}
      {/*        <div className="mt-[10px]">*/}
      {/*          {data?.platforms[0].created.slice(0, 10)}*/}
      {/*        </div>*/}
      {/*        <div>로그인연동</div>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <NaverIcon />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <div className="apple">*/}
      {/*    {data?.platforms[0].platform == "APPLE" ? (*/}
      {/*      <div className="flex flex-col justify-center items-center text-[14px] text-[#767676]">*/}
      {/*        //color icon으로 변경*/}
      {/*        <AppleIcon />*/}
      {/*        <div className="mt-[10px]">*/}
      {/*          {data?.platforms[0].created.slice(0, 10)}*/}
      {/*        </div>*/}
      {/*        <div>로그인연동</div>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <AppleIcon />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default ProfileComp;
