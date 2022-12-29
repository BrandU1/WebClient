import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
// import ImageResize from "quill-image-resize-module";
import WriteAccordion from "@common/writeAccordion";
import client from "@lib/api";
import ReactQuill from "react-quill";

const Quill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // @ts-ignore
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);
// Quill.register("modules/ImageResize", ImageResize);

function Edit() {
  const quillRef = useRef<ReactQuill>();

  const [text, setText] = useState<string>("");
  const [backdropUrl, setBackdropUrl] = useState<string>("");

  const handleText = (value: any) => {
    setText(value);
  };

  const [title, setTitle] = useState<string>("");
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const submit = async () => {
    // 이제 글 등록하기를 누르면 string을 서버로 보내야함.
    client
      .post("communities/posts", {
        //제목 데이터
        title: title,
        //내용 데이터
        content: text,
        // backdrop_image: backdropUrl,
      })
      .then((res) => res.data);
  };
  const imageHandler = () => {
    const input = document.createElement("input");
    const formData = new FormData();
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files;
      if (file !== null) {
        formData.append("image", file[0]);
        try {
          const result = await client
            .post("communities/posts/images", formData)
            .then((res) => res.data);
          const imgUrl = result.results.image;
          setBackdropUrl(imgUrl);
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(range.index, "image", imgUrl);
          console.log("이미지 업로드 성공");
          // const range = quillRef.current?.getEditor().getSelection()?.index;
          //  if (range !== null && range !== undefined) {
          //    let quill = quillRef.current?.getEditor();
          //    quill?.setSelection(range, 1);
          //    quill?.clipboard.dangerouslyPasteHTML(
          //      range,
          //      '<img src=${imgUrl} alt="이미지 태그 삽입"/>'
          //    );
          //  }
          //  return { ...result, sucess: true };
        } catch (e) {
          console.log(e, "ErrorMessage");
        }
      }
    });
  };

  const modules = useMemo(
    () => ({
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
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

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

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="pt-10">
      <div className="tip h-auto border-[2px] border-main  mb-10 rounded-xl text-sm ">
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
      </div>
      <div className="my-4">
        <input
          placeholder="제목을 입력해주세요"
          className="w-full h-14 p-3 border-gray border-[1px] outline-0"
          onChange={handleTitle}
          value={title}
        />
      </div>
      <Quill
        // @ts-ignore
        forwardedRef={quillRef}
        placeholder="내용을 입력해주세요"
        className="h-full"
        theme="snow"
        formats={formats}
        modules={modules}
        value={text}
        onChange={handleText}
      />
      <div onClick={submit} className="flex justify-center py-5">
        <button className="p-3 border-main border-[2px] rounded-2xl">
          글 등록하기
        </button>
      </div>
    </div>
  );
}

export default Edit;
