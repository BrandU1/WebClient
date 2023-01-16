import Image from "next/image";
import * as React from "react";
import { useRef, useState } from "react";
import NewImgModal from "@components/pages/custom/newimgmodal";
import ExistModal from "@components/pages/custom/existmodal";

interface ImageSelectProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectClose: () => void;
}

function ImageSelect({
  images,
  setImages,
  handleSelectClose,
}: ImageSelectProps) {
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [existModalOpen, setExistModalOpen] = useState<boolean>(false);

  const secondEl = useRef<HTMLDivElement>(null);
  const handleSecondModal = (e: any) => {
    if (!secondEl.current?.contains(e.target)) {
      handleSecondClose();
    }
  };
  const handleSecondClose = () => {
    setExistModalOpen(false);
    setNewModalOpen(false);
    handleSelectClose();
  };

  return (
    <div className="flex flex-row h-[500px] w-[620px]">
      <div className="flex flex-row space-x-5 h-full focus:outline-none">
        <div
          className="flex flex-col h-full w-[300px] justify-center items-center m-auto bg-white rounded-xl"
          onClick={() => {
            setExistModalOpen(true);
          }}
        >
          <Image
            src={"/logo/existImg.svg"}
            alt={"existImg"}
            width={150}
            height={150}
          />
          <h2 className="font-bold text-xl mt-12">기존이미지 선택</h2>
        </div>
        <div
          className="flex flex-col h-full w-[300px] justify-center items-center m-auto bg-white rounded-xl"
          onClick={() => {
            setNewModalOpen(true);
          }}
        >
          <Image
            src={"/logo/newImg.svg"}
            alt={"newImg"}
            width={150}
            height={150}
          />
          <h2 className="font-bold text-xl mt-12"> 추가</h2>
        </div>
      </div>
      {newModalOpen && <NewImgModal handleClose={handleSecondClose} />}
      {existModalOpen && (
        <ExistModal
          images={images}
          handleClose={handleSecondClose}
          setImages={setImages}
        />
      )}
    </div>
  );
}

export default ImageSelect;
