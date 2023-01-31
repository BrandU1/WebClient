import ModalFrame from "@common/modalframe";
import { useRef, useState } from "react";
import Image from "next/image";
import client from "@lib/api";
import CircularProgress from "@mui/material/CircularProgress";

interface newModalProps {
  handleClose: () => void;
}

function NewImgModal({ handleClose }: newModalProps) {
  const [isLoadings, setIsLoadings] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState<any>(null);

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

  const handleUpload = () => {};

  const secondEl = useRef<HTMLDivElement>(null);
  const handleSecondModal = (e: any) => {
    if (!secondEl.current?.contains(e.target)) {
      handleClose();
    }
  };

  const saveImgWithRemove = async () => {
    const formData = new FormData();
    if (imgFile) {
      setIsLoadings(true);
      formData.append("image", imgFile);
    }
    const response = await client.post("accounts/customs/remove", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      handleClose();
      setIsLoadings(false);
    } else {
    }
  };

  const saveImg = async () => {
    const formData = new FormData();
    if (imgFile) {
      formData.append("image", imgFile);
    }
    const response = await client.post("accounts/customs", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      handleClose();
    }
  };

  return (
    <ModalFrame
      width={600}
      height="auto"
      close={handleClose}
      blur={handleSecondModal}
      pageRef={secondEl}
      title={"신규이미지 추가"}
      bgColor={"none"}
      components={
        <div className="mt-10">
          {isLoadings ? (
            <div className="flex flex-col justify-center items-center h-[258px] w-[338px]">
              <CircularProgress size={50} sx={{ color: "#0CABA8" }} />
              <p className="mt-3 text-main">잠시만 기다려주세요</p>
            </div>
          ) : !imgBase64 ? (
            <label className="text-sm text-subContent flex flex-col m-auto h-[258px] w-[338px] rounded-xl border-2 border-gray justify-center items-center">
              <span>+</span>
              <span>신규 이미지 업로드</span>
              <input
                type="file"
                id="input-file-button"
                className="hidden border rounded-xl bg-main h-[45px] text-white font-bold tet-sm flex justify-center items-center"
                accept="image/*"
                onChange={handleChangeFile}
              />
            </label>
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
          <div className="w-[338px]  m-auto flex flex-row justify-between mt-5">
            <button className="border border-main rounded-xl w-[100px] h-[45px] flex justify-center items-center text-main">
              <Image
                src={"/logo/removebg.svg"}
                alt={"remove background"}
                width={19}
                height={19}
              />
              <span
                onClick={saveImgWithRemove}
                className="font-bold text-sm ml-[7px]"
              >
                배경제거
              </span>
            </button>
            <button
              className="text-white px-5 h-[45px] text-sm font-bold rounded-xl bg-main"
              onClick={saveImg}
            >
              저장하기
            </button>
          </div>
        </div>
      }
    />
  );
}

export default NewImgModal;
