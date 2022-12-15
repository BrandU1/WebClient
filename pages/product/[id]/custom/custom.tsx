import { useRouter } from "next/router";
import type { ReactElement, RefObject } from "react";
import React, { useEffect, useRef, useState } from "react";
import Badge from "@atoms/badge";
import Pick from "@common/pick";
import Basket from "@common/basket";
import Canvas from "@components/ImageCustom/canvas";
import BackButton from "@icons/back-button";
import ForwardButton from "@icons/forward-button";
import MoveButton from "@icons/move-button";
import PencilButton from "@icons/pencil-button";
import TextButton from "@icons/text-button";
import ImageButton from "@icons/image-button";
import useImage from "@hooks/useImage";

export enum CanvasState {
  DRAG = "DRAG",
  DRAW = "DRAW",
  IMAGE = "IMAGE",
}

function Custom(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [canvases, setCanvases] = React.useState<string[]>([]);
  const [step, setStep] = useState<number>(-1);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] =
    useState<RefObject<HTMLCanvasElement>>(drawCanvasRef);
  const [canvasState, setCanvasState] = React.useState<CanvasState>(
    CanvasState.DRAW
  );
  const { size, images, imgBase64s, handleChangeFile } = useImage();

  useEffect(() => {
    canvas.current?.addEventListener("mouseup", push);
  }, [canvasState]);

  const push = () => {
    setStep((prev) => prev + 1);
    if (step < canvases.length) {
    }
    setCanvases((prev) => {
      return [...prev, canvas.current?.toDataURL() ?? ""];
    });
  };

  const undo = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      const context = canvas.current!.getContext("2d");
      const canvasPic = new Image();
      canvasPic.src = canvases[step];
      canvasPic.onload = () => {
        context!.drawImage(canvasPic, 0, 0);
      };
    }
  };

  const redo = () => {
    console.log(canvases);
    if (step < canvases.length - 1) {
      setStep((prev) => prev + 1);
      const context = canvas.current!.getContext("2d");
      let canvasPic = new Image();
      canvasPic.src = canvases[step];
      canvasPic.onload = () => {
        context!.drawImage(canvasPic, 0, 0);
      };
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="customItemList flex flex-row justify-center border-b border-gray w-full mt-4 pb-4">
          <div className="DrawTool  flex flex-row space-x-[18px]">
            <div onClick={undo}>
              <BackButton />
            </div>
            <div onClick={redo}>
              <ForwardButton />
            </div>
            <div onClick={() => setCanvasState(CanvasState.DRAG)}>
              <MoveButton />
            </div>
            <div onClick={() => setCanvasState(CanvasState.DRAW)}>
              <PencilButton />
            </div>
            <TextButton />

            <label htmlFor="removeBg">
              <ImageButton />
            </label>
            <input
              onClick={(event) => {
                setCanvasState(CanvasState.IMAGE);
                handleChangeFile(event);
              }}
              type="file"
              id="removeBg"
              className="hidden border rounded-xl bg-main w-[218px] h-[45px] text-white font-bold tet-sm flex justify-center items-center"
            />
            {/*<Image*/}
            {/*  src={"/custom/figureBtn.svg"}*/}
            {/*  alt={"figureBtn"}*/}
            {/*  width={18}*/}
            {/*  height={18}*/}
            {/*/>*/}
          </div>
          {/*<div className="sortTool flex flex-row ml-[56px] space-x-4">*/}
          {/*  <Image*/}
          {/*    src={"/custom/bottomLine.svg"}*/}
          {/*    alt={"bottomLine"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/leftLine.svg"}*/}
          {/*    alt={"leftLine"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/rightLine.svg"}*/}
          {/*    alt={"rightLine"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/topLine.svg"}*/}
          {/*    alt={"topLine"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/centerLine.svg"}*/}
          {/*    alt={"centerLine"}*/}
          {/*    width={16}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/middleLine.svg"}*/}
          {/*    alt={"middleLine"}*/}
          {/*    width={18}*/}
          {/*    height={16}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/symmetryLR.svg"}*/}
          {/*    alt={"symmetryLR"}*/}
          {/*    width={20}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/symmetryTB.svg"}*/}
          {/*    alt={"symmetryTB"}*/}
          {/*    width={18}*/}
          {/*    height={20}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/leftAlign.svg"}*/}
          {/*    alt={"leftAlign"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/centerAlign.svg"}*/}
          {/*    alt={"centerAlign"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*  <Image*/}
          {/*    src={"/custom/rightAlign.svg"}*/}
          {/*    alt={"rightAlign"}*/}
          {/*    width={18}*/}
          {/*    height={18}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <div className="flex flex-row m-auto mt-3 z-30">
          <Canvas
            canvasRef={drawCanvasRef}
            images={imgBase64s}
            backgroundImage="/dummy/hoodie.png"
            width={500}
            height={500}
            state={canvasState}
          />
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
                <button className="minusBtn text-main px-3 py-2 cursor-focus">
                  {/*<Image*/}
                  {/*  src={"/logo/minus.svg"}*/}
                  {/*  alt={"minus"}*/}
                  {/*  width={16}*/}
                  {/*  height={16}*/}
                  {/*/>*/}
                </button>
                <span></span>
                <button className="plusBtn text-main mx-3">
                  {/*<Image*/}
                  {/*  src={"/logo/plus.svg"}*/}
                  {/*  alt={"plus"}*/}
                  {/*  width={16}*/}
                  {/*  height={16}*/}
                  {/*/>*/}
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
              <button className="w-64 h-11 bg-main rounded-xl ml-[10px] flex flex-row justify-center items-center">
                <span className="text-white font-bold text-sm">구매하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Custom;
