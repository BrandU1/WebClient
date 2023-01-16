import { Scrollbars } from "react-custom-scrollbars";
import Image from "next/image";
import ModalFrame from "@common/modalframe";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useBranduQuery from "@hooks/useBranduQuery";
import client from "@lib/api";

interface existModalProps {
  handleClose: () => void;
  images: string[];
  setImages: Dispatch<SetStateAction<any[]>>;
}

interface CustomImage {
  id: number;
  profile: number;
  image?: string;
}

const getCustomImage = async () => {
  const response = await client.get("accounts/customs");
  return response.data;
};

function ExistModal({ handleClose, setImages, images }: existModalProps) {
  const [cursor, setCursor] = useState<number>(0);
  const secondEl = useRef<HTMLDivElement>(null);
  const handleSecondModal = (e: any) => {
    if (!secondEl.current?.contains(e.target)) {
      handleClose();
    }
  };
  const [image, setImage] = useState<string>("");

  const { data, isLoading, isError } = useBranduQuery<CustomImage[]>({
    queryKey: ["custom-image"],
    queryFn: getCustomImage,
  });

  const handleImage = (image: string) => {
    setImages([...images, image]);
    handleClose();
  };

  return (
    <ModalFrame
      close={handleClose}
      blur={handleSecondModal}
      pageRef={secondEl}
      width={600}
      height={500}
      title={"기존이미지 선택"}
      bgColor={"none"}
      components={
        <div className="mt-10">
          <div className="h-[258px] overflow-y-scroll scrollbar-hide w-[340px] justify-center items-center">
            <Scrollbars style={{ width: 340, height: 258 }} thumbSize={20}>
              <div className="grid grid-cols-3 gap-[14px] mr-[10px]">
                {data?.results?.map((image, idx) => {
                  if (image.image) {
                    return (
                      <div
                        className={`w-[105px] h-[105px] rounded-xl ${
                          cursor === idx && "border-2 border-main "
                        }`}
                        onClick={() => {
                          setCursor(idx);
                          setImage(image.image ?? "");
                        }}
                      >
                        <Image
                          className="relative w-[100px] h-[100px] rounded-xl"
                          src={image.image}
                          alt="custom-image"
                          width={100}
                          height={100}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </Scrollbars>
          </div>
          <div className="w-[338px] m-auto flex flex-row justify-between mt-5">
            <button
              onClick={() => handleImage(image)}
              className="border rounded-xl bg-main w-full h-[45px] text-white font-bold tet-sm flex justify-center items-center"
            >
              추가하기
            </button>
          </div>
        </div>
      }
    />
  );
}

export default ExistModal;
