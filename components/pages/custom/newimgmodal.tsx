import ModalFrame from "@common/modalframe";
import { useRef, useState } from "react";
import Image from "next/image";

interface newModalProps {
  handleClose: () => void;
}

function NewImgModal({ handleClose }: newModalProps) {
  const [imgBase64, setImgBase64] = useState<string>("");
  const [imgFile, setImgFile] = useState(null);

  const removeBg = () => {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", "https://www.remove.bg/example-hd.jpg");

    // axios
    //   .post("https://api.remove.bg/v1.0/removebg", formData, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //       "X-Api-Key": "eQVuQAkiR2Tru7cu99wvYkaM",
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(fs.writeFileSync("no-bg.png", res.data));
    //   });
  };
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
      setImgFile(e.target.files[0].name);
    }
  };

  console.log(imgBase64);

  const secondEl = useRef<HTMLDivElement>(null);
  const handleSecondModal = (e: any) => {
    if (!secondEl.current?.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <ModalFrame
      width={600}
      height={500}
      close={handleClose}
      blur={handleSecondModal}
      pageRef={secondEl}
      title={"신규이미지 추가"}
      bgColor={"none"}
      components={
        <div className="mt-10">
          {imgBase64 === "" ? (
            <div className="text-sm text-subContent flex flex-col m-auto h-[258px] w-[338px] rounded-xl border-2 border-gray justify-center items-center">
              <span>+</span>
              <span>이미지 업로드</span>
            </div>
          ) : (
            <div className="w-[600px] flex justify-center">
              <Image
                className="rounded-2xl"
                src={imgBase64}
                alt={"Img Uploaded"}
                width={350}
                height={350}
              />
            </div>
          )}
          <div className="w-[338px] m-auto flex flex-row justify-between mt-5">
            <button className="border border-main rounded-xl w-[100px] h-[45px] flex justify-center items-center text-main">
              <Image
                src={"/logo/removebg.svg"}
                alt={"remove background"}
                width={19}
                height={19}
              />
              <span onClick={removeBg} className="font-bold text-sm ml-[7px]">
                배경제거
              </span>
            </button>
            <label
              htmlFor="removeBg"
              className="border rounded-xl bg-main w-[218px] h-[45px] text-white font-bold tet-sm flex justify-center items-center"
            >
              추가하기
            </label>
            <input
              onChange={handleChangeFile}
              type="file"
              id="removeBg"
              className="hidden border rounded-xl bg-main w-[218px] h-[45px] text-white font-bold tet-sm flex justify-center items-center"
            />
          </div>
        </div>
      }
    />
  );
}

export default NewImgModal;
