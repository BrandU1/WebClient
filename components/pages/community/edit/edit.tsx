import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import ImageResize from "quill-image-resize-module";
import WriteAccordion from "@common/writeAccordion";

const Quill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

// Quill.register("modules/ImageResize", ImageResize);

function Edit() {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "image",
  ];

  const [text, setText] = useState<string>("");
  const handleText = (value: any) => {
    setText(value);
  };

  return (
    <div className="pt-10">
      <div className="tip h-auto border-[2px] border-main  mb-10  ">
        {/*<div>*/}
        {/*  <h1 className="font-bold">*/}
        {/*    글쓰기 가이드*/}
        {/*    <span className="text-xs px-4 font-normal">*/}
        {/*      원할한 커뮤니티 작성을 위해 꼭 읽어주세요*/}
        {/*    </span>*/}
        {/*  </h1>*/}
        {/*</div>*/}
        <WriteAccordion
          title="글쓰기 가이드"
          subTitle="원할한 글쓰기를 위해 꼭 읽어주세요"
        >
          <>
            <li>사진 속 제품 정보를 본문에 최대한 적어주세요.</li>
            <li>
              (제품분류/브랜드/제품명 순서) 사진 첨부 시 용량은 장당 최대
              20MB까지 업로드할 수 있고, jpg, png, webp, heif, heic, gif 포맷을
              지원합니다.
            </li>
            <li>
              정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가
              올라갑니다.
            </li>
            <li>
              커버사진과 제목은 본사에 의해 변경될 수 있습니다. 글 작성과 이미지
              업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.
            </li>
          </>
        </WriteAccordion>
        <div></div>
      </div>
      <Quill
        placeholder="내용을 입력해주세요"
        className="h-full"
        theme="snow"
        formats={formats}
        modules={modules}
        value={text}
        onChange={handleText}
      />
    </div>
  );
}

export default Edit;
