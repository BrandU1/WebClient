import type { ReactElement } from "react";
import React, { useRef, useState } from "react";
import Badge from "@atoms/badge";
import Pick from "@common/pick";
import Image from "next/image";
import Basket from "@common/basket";
import Canvas from "@components/ImageCustom/canvas";
import BackButton from "@icons/back-button";
import ForwardButton from "@icons/forward-button";
import MoveButton from "@icons/move-button";
import PencilButton from "@icons/pencil-button";
import TextButton from "@icons/text-button";
import ImageButton from "@icons/image-button";
import useImage from "@hooks/useImage";
import ImageSelect from "@components/pages/custom/imageselect";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  canvasAction,
  canvasActionSelected,
  CanvasActionType,
  canvasHistoriesLength,
  canvasHistoryIndex,
  canvasText,
  canvasUndoOrRedo,
} from "../../../../recoil/canvas";
import client from "@lib/api";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import useBranduQuery from "@hooks/useBranduQuery";
import { getProduct } from "../index";

export enum CanvasState {
  DRAG = "DRAG",
  DRAW = "DRAW",
  IMAGE = "IMAGE",
}

export interface Product {
  id: number;
  tags: Tags[];
  images: any[];
  options: [];
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  backdrop_image: string;
  price: number;
  brand: number;
  category: number;
  view_count: number;
}

export interface Tags {
  id: number;
  name: string;
}

export interface CustomProps {
  basketList: Product;
}

interface ProductCustomProps {
  id: number;
}

function ProductCustom({ id }: ProductCustomProps): ReactElement {
  const { data: productResponse, isLoading: productLoading } =
    useBranduQuery<Product>({
      queryKey: ["product", id],
      queryFn: () => getProduct(id),
    });

  const goBasket = (id: any) => {
    client.post(`accounts/baskets/${id}`).then((res) => res.data);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>(CanvasState.DRAW);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [step, setStep] = useRecoilState(canvasHistoryIndex);
  const [undoOrRedo, setUndoOrRedo] = useRecoilState(canvasUndoOrRedo);
  const historiesLength = useRecoilValue(canvasHistoriesLength);
  const [text, setText] = useRecoilState(canvasText);
  const { size, images, imgBase64s, handleChangeFile } = useImage();
  const [action, setAction] = useRecoilState(canvasAction);
  const [actionSelected, setActionSelected] =
    useRecoilState(canvasActionSelected);

  const imgSelectEl = useRef<HTMLDivElement>(null);
  const handleSelectModal = (e: any) => {
    if (!imgSelectEl.current?.contains(e.target)) {
      handleSelectClose();
    }
  };
  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const undo = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setUndoOrRedo(true);
    }
  };

  const redo = () => {
    if (step < historiesLength - 1) {
      setStep((prev) => prev + 1);
      setUndoOrRedo(true);
    }
  };

  const moveDown = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_DOWN);
  };

  const moveUp = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_UP);
  };

  const moveLeft = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_LEFT);
  };

  const moveRight = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_RIGHT);
  };

  const moveHorizontalCenter = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_HORIZONTAL_CENTER);
  };

  const moveVerticalCenter = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_VERTICAL_CENTER);
  };

  const moveForward = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_FORWARD);
  };

  const moveBackward = () => {
    setActionSelected(true);
    setAction(CanvasActionType.MOVE_BACKWARD);
  };

  const createText = () => {
    setText((prev) => [...prev, "text"]);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center my-4">
          {/* TODO: 아이콘 이미지들 전부 컴퍼넌트화 */}
          <div className="flex flex-row space-x-[18px]">
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
            <div onClick={createText}>
              <TextButton />
            </div>

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
            <Image
              onClick={() => {
                setSelectOpen(true);
              }}
              src={"/custom/figureBtn.svg"}
              alt={"imageBtn"}
              width={18}
              height={18}
            />
          </div>
          <div className="sortTool flex flex-row ml-[56px] space-x-4">
            <Image
              onClick={moveDown}
              src={"/custom/bottomLine.svg"}
              alt={"bottomLine"}
              width={18}
              height={18}
            />
            <Image
              onClick={moveLeft}
              src={"/custom/leftLine.svg"}
              alt={"leftLine"}
              width={18}
              height={18}
            />
            <Image
              onClick={moveRight}
              src={"/custom/rightLine.svg"}
              alt={"rightLine"}
              width={18}
              height={18}
            />
            <Image
              onClick={moveUp}
              src={"/custom/topLine.svg"}
              alt={"topLine"}
              width={18}
              height={18}
            />
            <Image
              onClick={moveHorizontalCenter}
              src={"/custom/centerLine.svg"}
              alt={"centerLine"}
              width={16}
              height={18}
            />
            <Image
              onClick={moveVerticalCenter}
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
        <div className="w-screen h-[1px] bg-gray" />
        <div className="flex flex-row m-auto mt-3 z-30">
          <Canvas
            canvasRef={canvasRef}
            images={images}
            backgroundImage={`${productResponse?.results.backdrop_image}`}
            width={500}
            height={500}
          />
          <div className="flex  flex-col m-5">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="productName text-base">
                  {productResponse?.results.name}
                </span>
                <div className="flex flex-row my-1 space-x-1">
                  {productResponse?.results.tags.map((tag, index) => {
                    return (
                      <span className="text-subContent text-xs cursor-pointer">
                        #{tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Badge color={"red"} />
            </div>

            <div className="price ">
              <div className="flex justify-end">
                <span className="font-bold text-lg">
                  {productResponse?.results.price.toLocaleString()}
                </span>
                <span className="text=sm ml-1">원</span>
              </div>
              <div className="text-main flex justify-end items-center">
                <span className="text-xs mr-[9px]">(시즌 특가)</span>
                <span className="font-bold text-lg">
                  {/*{data?.price.toLocaleString()}*/}
                  {(productResponse?.results.price! - 4000).toLocaleString()}
                </span>
                <span className="text=sm ml-1">원</span>
              </div>
            </div>
            {/* 색상 및 사이즈 대신 커스터마이징 관련 프로세스로 처리 */}
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
                onClick={() => {
                  goBasket(productResponse?.results.id);
                }}
                className="w-64 h-11 bg-main rounded-xl ml-[10px] flex flex-row justify-center items-center"
              >
                <span className="text-white font-bold text-sm">구매하기</span>
              </button>
            </div>
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(["product", id], () =>
  //   getProduct(Number(id))
  // );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(id),
    },
  };
};

export default ProductCustom;
