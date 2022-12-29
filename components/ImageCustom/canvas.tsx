import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  canvasAction,
  canvasActionSelected,
  CanvasActionType,
  canvasHistories,
  canvasHistoryIndex,
  canvasText,
  canvasUndoOrRedo,
} from "../../recoil/canvas";
import { useRecoilState } from "recoil";

const initialPosition = {
  y: 230,
  x: 160,
  height: 200,
  width: 180,
};

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  backgroundImage: string;
  // state: CanvasState;
  images: string[];
}

const Canvas = ({ backgroundImage, width, height, images }: CanvasProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [usedImages, setUsedImages] = useState<number[]>([]);
  const fabricRef = useRef<any>(null);
  const [texts, setTexts] = useRecoilState(canvasText);
  const [usedTexts, setUsedTexts] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [histories, setHistories] = useRecoilState(canvasHistories);
  const [historyIndex, setHistoryIndex] = useRecoilState(canvasHistoryIndex);
  const [undoOrRedo, setUndoOrRedo] = useRecoilState(canvasUndoOrRedo);
  const [action, setAction] = useRecoilState(canvasAction);
  const [actionSelected, setActionSelected] =
    useRecoilState(canvasActionSelected);

  const baseLine = new fabric.Rect({
    top: initialPosition.y,
    left: initialPosition.x,
    width: initialPosition.width,
    height: initialPosition.height,
    stroke: "green",
    strokeWidth: 1,
    fill: "transparent",
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
    selectable: false,
    absolutePositioned: true,
  });

  /* Fabric 시작 */
  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas(canvasRef.current);

      fabricRef.current.on("mouse:down", (e: any) => {
        if (e.target) {
          saveHistory();
        }
      });

      // TODO: 키보드 입력시 처리 필요
      fabricRef.current.on("keyup", (e: any) => {
        if (e.target) {
          saveHistory();
        }
      });
      fabricRef.current.add(baseLine);
      return fabricRef.current;
    };

    setCanvas(initFabric());

    const disposeFabric = () => {
      fabricRef.current.dispose();
    };

    return () => {
      disposeFabric();
    };
  }, []);

  useEffect(() => {
    if (backgroundImage) {
      canvas?.setBackgroundImage(backgroundImage, () => {
        canvas?.renderAll();
      });
    }
  }, [backgroundImage]);

  /* Action 처리 */
  useEffect(() => {
    const currentTarget = canvas?.getActiveObject();
    if (!currentTarget) return;
    let isModified = true;
    if (actionSelected) {
      switch (action) {
        case CanvasActionType.MOVE_DOWN:
          currentTarget.top =
            initialPosition.y + initialPosition.height - currentTarget.height!;
          canvas!.renderAll();
          break;

        case CanvasActionType.MOVE_UP:
          currentTarget.top = initialPosition.y;
          canvas!.renderAll();
          break;
        case CanvasActionType.MOVE_LEFT:
          currentTarget.left = initialPosition.x;
          canvas!.renderAll();
          break;
        case CanvasActionType.MOVE_RIGHT:
          currentTarget.left =
            initialPosition.x + initialPosition.width - currentTarget.width!;
          canvas!.renderAll();
          break;
        case CanvasActionType.MOVE_HORIZONTAL_CENTER:
          currentTarget.left =
            initialPosition.x +
            (initialPosition.width - currentTarget.width!) / 2;
          canvas!.renderAll();
          break;
        case CanvasActionType.MOVE_VERTICAL_CENTER:
          currentTarget.top =
            initialPosition.y +
            (initialPosition.height - currentTarget.height!) / 2;
          canvas!.renderAll();
          break;
        case CanvasActionType.MOVE_FORWARD:
          canvas!.bringForward(currentTarget);
          canvas!.discardActiveObject();
          canvas!.renderAll();
          break;
        case CanvasActionType.MOVE_BACKWARD:
          canvas!.sendBackwards(currentTarget);
          canvas!.discardActiveObject();
          canvas!.renderAll();
          break;
        default:
          isModified = false;
          break;
      }
      if (isModified) {
        saveHistory();
      }
      setActionSelected(false);
    }
  }, [action]);

  /* 이미지 추가 */
  useEffect(() => {
    images.forEach((src, index) => {
      if (usedImages.includes(index)) {
        return;
      }
      fabric.Image.fromURL(backgroundImage, (image) => {
        setUsedImages((prev) => [...prev, index]);
        image.scale(1);
        canvas!.add(image);
        canvas!.renderAll();
      });
    });
  }, [images, backgroundImage]);

  /* Undo 혹은 Redo 처리 */
  useEffect(() => {
    if (undoOrRedo) {
      canvas!.loadFromJSON(histories[historyIndex], () => {
        canvas!.add(baseLine);
        canvas!.renderAll();
      });
      setUndoOrRedo(false);
    }
  }, [historyIndex]);

  /* 텍스트 추가 */
  useEffect(() => {
    texts.forEach((text, index) => {
      if (usedTexts.includes(index)) return;
      const newText = new fabric.Textbox(text, {
        top: initialPosition.y,
        left: initialPosition.x,
        height: initialPosition.height,
        fontSize: 20,
        fontFamily: "Noto Sans KR",
        fill: "red",
        textAlign: "center",
      });

      newText.on("mousemove", (event) => {
      });

      canvas!.add(newText);
    });
  }, [texts]);

  const saveHistory = () => {
    setHistoryIndex((prev) => prev + 1);
    setHistories((prev) => [...prev, fabricRef.current.toJSON()]);
  };

  return (
    <canvas
      width={500}
      height={500}
      ref={canvasRef}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    />
  );
};
export default Canvas;
