import Image from "next/image";
import Badge from "@atoms/badge";
import { useEffect, useRef, useState } from "react";
import ImageSelect from "@components/pages/custom/imageselect";
import Pick from "@common/pick";
import Basket from "@common/basket";
import { useRouter } from "next/router";
import Pencil from "@components/icons/pencil";
import ColorPencil from "@components/ImageCustom/canvas";
import AutosizeInput from "react-input-autosize";
import Draggable from "react-draggable";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

function Custom() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(Number(router.query.amount));
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("black");
  const [open, setOpen] = useState<boolean>(false);
  const [pencil, setPencil] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);

  // 드래그 박스 ref
  const [imgBase64, setImgBase64] = useState<string>("");
  const [imgFile, setImgFile] = useState(null);
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

  useEffect(() => {}, [color]);

  const imgSelectEl = useRef<HTMLDivElement>(null);
  const handleSelectModal = (e: any) => {
    if (!imgSelectEl.current?.contains(e.target)) {
      handleSelectClose();
    }
  };
  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const onDownloadBtn = () => {
    domtoimage.toBlob(document.querySelector(".custom")!).then((blob) => {
      console.log(blob, 123);
    });
  };

  const [text, setText] = useState<string>("Text");
  const [openText, setOpenText] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="customItemList flex flex-row justify-center border-b border-gray w-full mt-4 pb-4">
        <div className="DrawTool  flex flex-row space-x-[18px]">
          <Image
            src={"/custom/backBtn.svg"}
            alt={"backBtn"}
            width={16}
            height={16}
          />
          <Image
            src={"/custom/forwardBtn.svg"}
            alt={"forwardBtn"}
            width={16}
            height={16}
          />
          <Image
            src={"/custom/moveBtn.svg"}
            alt={"moveBtn"}
            width={20}
            height={20}
          />
          <div
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Pencil color={color} stroke={color} />
            <div
              className={`${
                open ? "block" : "hidden"
              } flex space-x-4 absolute justify-between`}
            >
              <p
                onClick={() => {
                  setColor("red");
                  setPencil(true);
                  setClear(false);
                }}
              >
                red
              </p>
              <p
                onClick={() => {
                  setColor("blue");
                  setPencil(true);
                  setClear(false);
                }}
              >
                blue
              </p>
              <p
                onClick={() => {
                  setColor("yellow");
                  setPencil(true);
                  setClear(false);
                }}
              >
                yellow
              </p>
              <p
                onClick={() => {
                  setClear(true);
                }}
              >
                Erase
              </p>
            </div>
          </div>

          <Image
            src={"/custom/inkBtn.svg"}
            alt={"inkBtn"}
            width={19}
            height={19}
          />
          <Image
            onClick={() => {
              setOpenText(true);
            }}
            src={"/custom/textBtn.svg"}
            alt={"textBtn"}
            width={16}
            height={16}
          />

          <label htmlFor="removeBg">
            <Image
              src={"/custom/imageBtn.svg"}
              alt={"imageBtn"}
              width={18}
              height={18}
            />
          </label>
          <input
            onChange={handleChangeFile}
            type="file"
            id="removeBg"
            className="hidden border rounded-xl bg-main w-[218px] h-[45px] text-white font-bold tet-sm flex justify-center items-center"
          />
          <Image
            src={"/custom/figureBtn.svg"}
            alt={"figureBtn"}
            width={18}
            height={18}
          />
        </div>
        <div className="sortTool flex flex-row ml-[56px] space-x-4">
          <Image
            src={"/custom/bottomLine.svg"}
            alt={"bottomLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/leftLine.svg"}
            alt={"leftLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/rightLine.svg"}
            alt={"rightLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/topLine.svg"}
            alt={"topLine"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/centerLine.svg"}
            alt={"centerLine"}
            width={16}
            height={18}
          />
          <Image
            src={"/custom/middleLine.svg"}
            alt={"middleLine"}
            width={18}
            height={16}
          />
          <Image
            src={"/custom/symmetryLR.svg"}
            alt={"symmetryLR"}
            width={20}
            height={18}
          />
          <Image
            src={"/custom/symmetryTB.svg"}
            alt={"symmetryTB"}
            width={18}
            height={20}
          />
          <Image
            src={"/custom/leftAlign.svg"}
            alt={"leftAlign"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/centerAlign.svg"}
            alt={"centerAlign"}
            width={18}
            height={18}
          />
          <Image
            src={"/custom/rightAlign.svg"}
            alt={"rightAlign"}
            width={18}
            height={18}
          />
        </div>
      </div>
      <div className="flex flex-row m-auto mt-3  z-30   ">
        <div className=" custom bg-[url('/dummy/hoodie.png')] w-[510px] h-[400px] bg-center bg-contain bg-no-repeat">
          <Draggable defaultPosition={{ x: 0, y: 0 }}>
            <div className=" w-[100px] h-[100px]">
              <div
                className={`w-[100px] h-[100px] bg-contain bg-no-repeat ${
                  imgBase64 === "" ? "hidden" : "block"
                }`}
              >
                <Image
                  className="rounded-2xl"
                  src={imgBase64}
                  alt={"Img Uploaded"}
                  width={350}
                  height={350}
                  draggable={false}
                />
              </div>
            </div>
          </Draggable>
          <div className={`${openText ? "inline " : "hidden"}`}>
            <Draggable>
              <AutosizeInput
                inputStyle={{ backgroundColor: "transparent", outline: "none" }}
                className="inline-flex  hover:border-[1px] hover:border-main text-center bg-opacity-10 focus:outline-none text-main text-2xl cursor-grabbing "
                onChange={(e: any) => {
                  setText(e.target.value);
                }}
                value={text}
              />
            </Draggable>
          </div>

          <div className={`${pencil ? "block" : "hidden"}  `}>
            <ColorPencil
              width={510}
              height={300}
              pencilColor={color}
              clear={clear}
            />
          </div>

          {/*<Draggable scale={1} defaultPosition={{ x: 0, y: 0 }}>*/}
          {/*  <div className="fixed w-[100px] h-[100px]">*/}
          {/*    <div className="bg-[url('/dummy/cat.png')] w-[100px] h-[100px] bg-contain bg-no-repeat" />*/}
          {/*  </div>*/}
          {/*</Draggable>*/}
          {/*<Draggable scale={1} defaultPosition={{ x: 0, y: 0 }}>*/}
          {/*  <div className="fixed w-[100px] h-[100px]">*/}
          {/*    <div className="bg-[url('/dummy/cat.png')] w-[100px] h-[100px] bg-contain bg-no-repeat" />*/}
          {/*  </div>*/}
          {/*</Draggable>*/}
          {/*<div className="image w-[510px] h-[400px]">*/}
          {/*  <Image*/}
          {/*    src={"/dummy/cat.png"}*/}
          {/*    width={510}*/}
          {/*    height={400}*/}
          {/*    alt={"productImg"}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <div className="rightSide flex flex-col mt-5 ml-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="productName text-base">후드티</span>
              <span className="productHashtag text-[10px] text-subContent">
                #후드티 #브랜뉴 #데일리 #남친룩
              </span>
            </div>
            <Badge color={"red"} />
          </div>

          <div className="price ">
            <div className="flex justify-end">
              <span className="font-bold text-lg">
                {/*{data?.price.toLocaleString()}*/}
                8,000
              </span>
              <span className="text=sm ml-1">원</span>
            </div>
            <div className="text-main flex justify-end items-center">
              <span className="text-xs mr-[9px]">(시즌 특가)</span>
              <span className="font-bold text-lg">
                {/*{data?.price.toLocaleString()}*/}
                7,000
              </span>
              <span className="text=sm ml-1">원</span>
            </div>
          </div>
          <div className="border border-t-0 w-[314px] my-[22px] border-gray" />
          <div className="color flex flex-col mb-[10px]">
            <span className="text-xs mb-[10px]">색상</span>
            {/*{data?.options?.color?.map((color, idx) => {*/}
            {/*  return (*/}
            {/*    <div*/}
            {/*      className={`flex mb-2.5 cursor-pointer bg-${color.hashcode} ${*/}
            {/*        color === idx*/}
            {/*          ? "border-2 rounded-xl border-Main-deepblue"*/}
            {/*          : " "*/}
            {/*      }`}*/}
            {/*      key={idx}*/}
            {/*      onClick={() => {*/}
            {/*        setColor(idx);*/}
            {/*      }}*/}
            {/*    ></div>*/}
            {/*  );*/}
            {/*})}*/}
          </div>
          <div className="size flex flex-col mb-[10px]">
            <span className="text-xs mb-[10px]">사이즈</span>
            <div className="space-x-[10px]">
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                XL
              </button>
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                L
              </button>
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                M
              </button>
              <button className="px-[7px] py-[3px] border rounded-xl text-sm text-subContent">
                S
              </button>
            </div>
          </div>
          <div className="amount flex flex-col mt-[10px]">
            <span className="text-xs">수량</span>
            <div className="mt-[10px] border border-main w-fit h-fit rounded-xl flex items-center py-[5px]">
              <button
                className="minusBtn text-main px-3 py-2 cursor-focus"
                onClick={() => {
                  {
                    if (amount > 1) {
                      setAmount((prev) => prev - 1);
                    }
                  }
                }}
              >
                <Image
                  src={"/logo/minus.svg"}
                  alt={"minus"}
                  width={16}
                  height={16}
                />
              </button>
              <span>{String(amount).padStart(2, "0")}</span>
              <button
                className="plusBtn text-main mx-3"
                onClick={() => {
                  setAmount(amount + 1);
                }}
              >
                <Image
                  src={"/logo/plus.svg"}
                  alt={"plus"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-row mt-5 space-x-[10px] items-center">
            <Pick
              li_height={24}
              li_width={24}
              bg_height={45}
              bg_width={45}
              li_color={"white"}
            />
            <Basket
              li_height={22}
              li_width={22}
              bg_height={45}
              bg_width={45}
              li_color={"white"}
            />
            <button
              className="w-64 h-11 bg-main rounded-xl ml-[10px] flex flex-row justify-center items-center"
              onClick={onDownloadBtn}
            >
              <span className="text-white font-bold text-sm">구매하기</span>
            </button>
          </div>
        </div>
      </div>
      {selectOpen && (
        <div
          onClick={handleSelectModal}
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-40"
        >
          <div className="mt-[70px] flex justify-center">
            <div ref={imgSelectEl}>
              <ImageSelect />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Custom;
