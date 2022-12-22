import BackButton from "@icons/back-button";
import ForwardButton from "@icons/forward-button";
import MoveButton from "@icons/move-button";
import PencilButton from "@icons/pencil-button";
import TextButton from "@icons/text-button";
import ImageButton from "@icons/image-button";
import Image from "next/image";
import React, { useState } from "react";
import { CanvasState } from "../../../pages/product/[id]/custom";
import {
  canvasAction,
  canvasActionSelected,
  CanvasActionType,
  canvasHistoriesLength,
  canvasHistoryIndex,
  canvasText,
  canvasUndoOrRedo,
} from "../../../recoil/canvas";
import { useRecoilState, useRecoilValue } from "recoil";
import useImage from "@hooks/useImage";
interface CustomProp {
  handleSelect: () => void;
}

function CustomIcon({ handleSelect }: CustomProp) {
  const [step, setStep] = useRecoilState(canvasHistoryIndex);
  const [undoOrRedo, setUndoOrRedo] = useRecoilState(canvasUndoOrRedo);
  const historiesLength = useRecoilValue(canvasHistoriesLength);
  const [action, setAction] = useRecoilState(canvasAction);
  const [actionSelected, setActionSelected] =
    useRecoilState(canvasActionSelected);
  const [text, setText] = useRecoilState(canvasText);
  const createText = () => {
    setText((prev) => [...prev, "text"]);
  };
  const [canvasState, setCanvasState] = useState<CanvasState>(CanvasState.DRAW);
  const { handleChangeFile } = useImage();

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
  return (
    <div className="flex flex-row justify-center my-4">
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
          onClick={handleSelect}
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
  );
}

export default CustomIcon;
