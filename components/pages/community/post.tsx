import Image from "next/image";
import { useState } from "react";

function Post() {
  const [text, setText] = useState<string>("");
  const onChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <div className="flex flex-col w-[610px]">
      <div className="title border-b border-gray pb-5">
        <Image
          src={"/dummy/cat.png"}
          alt={"titleImg"}
          width={600}
          height={300}
          className="rounded-2xl"
        />
        <div className="mt-2 flex justify-between px-2">
          <h2 className="font-bold text-lg">
            브랜뉴로 만들어가는 우리집 리뉴얼
          </h2>
          <Image src={"/logo/share.svg"} alt={"share"} width={18} height={20} />
        </div>
        <div className="flex flex-row items-center mt-5 px-2">
          <div className="w-9 h-9 bg-gray rounded-xl" />
          <div className="flex flex-col ml-2 text-xs">
            <h2>김이삭</h2>
            <h2 className="text-subContent">2022.12.21(수)</h2>
          </div>
        </div>
      </div>
      <div className="content mt-5 text-sm border-b border-gray pb-5 px-2">
        <h2>
          안녕하세요, 이번에는 브랜뉴에서 구입한 제품들로 저희 집 부엌을
          꾸며보았습니다. 사진에서 보이시는 것들 중에 어떤게 친환경 제품인지
          여러분들은 찾으셨나요? 다 꾸며놓고 보니 저도 구별이 잘 안될정도로 좋은
          제품들이 많습니다.
        </h2>
        <div className="flex flex-row space-x-2 my-5">
          <Image
            src={"/dummy/panda.png"}
            alt={"panda"}
            width={260}
            height={230}
            className="rounded-xl"
          />
          <Image
            src={"/dummy/panda.png"}
            alt={"panda"}
            width={330}
            height={230}
            className="rounded-xl"
          />
        </div>
        <h2>
          화장대 위치에는 우드 테이블을 사용해서 심플하면서 안정된 느낌을
          주었고, 부엌에는 친환경 플라스틱으로 만들어진 블랙 색상의 전구로
          포인트를 주었습니다.
        </h2>
      </div>
      <div className="reply mt-5">
        <div className="summary border-b border-gray pb-5 text-sm flex flex-row text-subContent">
          <p>좋아요</p>
          <p className="font-bold">3</p>
          <p className="ml-2">스크랩</p>
          <p className="font-bold">1</p>
          <p className="ml-2">댓글</p>
          <p className="font-bold">1</p>
          <p className="ml-2">조회</p>
          <p className="font-bold">422</p>
        </div>
        <div className="flex flex-row mt-5 border-b border-gray pb-5 px-2">
          <div className="w-9 h-9 bg-gray rounded-xl mr-2" />
          <div className="flex flex-col">
            <h2 className="text-[12px]">이수빈</h2>
            <p className="text-[12px] text-subContent">
              우드톤 분위기랑 너무 잘 어울리는 조합이네요~ 저도 한 번
              맞춰봐야겠어요
            </p>
          </div>
        </div>
        <div className="mt-5">
          <input
            className="w-[520px] h-10 rounded-xl border border-main text-sm p-2 text-subContent focus:outline-none"
            onChange={onChange}
            type="text"
            placeholder="댓글을 입력해주세요"
            value={text}
          />
          <button className="font-bold text-sm text-white bg-main rounded-xl ml-2 h-10 w-[70px]">
            댓글달기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
