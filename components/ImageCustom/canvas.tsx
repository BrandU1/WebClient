import React, { useEffect, useState } from "react";
import { CanvasState } from "../../pages/product/[id]/custom/custom";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  canvasHistories,
  canvasHistory,
  canvasHistoryIndex,
  canvasUndoOrRedo,
  ElementProps,
} from "../../recoil/canvas";

const initialPosition = {
  y: 180,
  x: 125,
  height: 150,
  width: 250,
};

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  backgroundImage: string;
  state: CanvasState;
  images: string[];
}

const Canvas = ({
  backgroundImage,
  width,
  height,
  state,
  images,
  canvasRef,
}: CanvasProps) => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [elements, setElements] = useState<ElementProps[]>([]);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [target, setTarget] = useState<ElementProps | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [histories, setHistories] = useRecoilState(canvasHistories);
  const [step, setStep] = useRecoilState(canvasHistoryIndex);
  const [undoOrRedo, setUndoOrRedo] = useRecoilState(canvasUndoOrRedo);
  const history = useRecoilValue(canvasHistory);

  useEffect(() => {
    if (!canvasRef) return;
    const element = canvasRef.current;
    setContext(element!.getContext("2d"));
    draw();
  }, [canvasRef]);

  useEffect(() => {
    images.forEach((image, index) => {
      if (elements.every((element) => element.id !== index)) {
        const newImage = new Image();
        newImage.src = image;
        newImage.style.pointerEvents = "move";
        newImage.onload = () => {
          const { width, height } = formatImageSize(newImage);
          setElements((prev) => [
            ...prev,
            {
              id: index,
              x: 0,
              y: 0,
              width: width,
              height: height,
              isImage: true,
              image: newImage,
              isText: false,
            },
          ]);
        };
      }
    });
  }, [images]);

  useEffect(() => {
    if (history && undoOrRedo) {
      setElements(history);
      setUndoOrRedo(false);
    }
    draw();
  }, [step]);

  // previous state
  const push = () => {
    setStep((prev) => prev + 1);
    if (step < histories.length) {
    }
    setHistories((prev) => {
      return [...prev, elements];
    });
  };

  const formatImageSize = (image: HTMLImageElement) => {
    const ratio = image.naturalWidth / image.naturalHeight;
    const width = 100;
    const height = width / ratio ?? 100;
    return {
      width,
      height,
    };
  };

  const draw = () => {
    if (!context) return;
    context.clearRect(
      0,
      0,
      canvasRef!.current!.clientWidth,
      canvasRef!.current!.clientHeight
    );
    elements.forEach((element) => drawFillRect(element));
  };

  const drawFillRect = (element: ElementProps, style = {}) => {
    const { x, y, width, height, isText, isImage } = element;
    context!.beginPath();
    context!.fillStyle = "black";
    if (isText) {
      context!.fillText(element.text!, x, y);
    }
    if (isImage) {
      context!.drawImage(element.image!, x, y, width, height);
    } else {
      context!.fillRect(x, y, width, height);
    }
  };

  const hitBox = (x: number, y: number) => {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (
        x >= element.x &&
        x <= element.x + element.width &&
        y >= element.y &&
        y <= element.y + element.height
      ) {
        setTarget(element);
        return true;
      }
    }
    return false;
  };

  const handleMouseDown = (event: any) => {
    setStartX(event.nativeEvent.offsetX - canvasRef?.current!.clientLeft);
    setStartY(event.nativeEvent.offsetY - canvasRef?.current!.clientTop);
    setIsDown((prev) => hitBox(startX, startY));
  };

  const handleMouseMove = (event: any) => {
    if (!isDown) return;

    const mouseX = event.nativeEvent.offsetX - canvasRef?.current!.clientLeft;
    const mouseY = event.nativeEvent.offsetY - canvasRef?.current!.clientTop;
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    setStartX(mouseX);
    setStartY(mouseY);
    setTarget((prev: any) => ({
      ...prev!,
      x: prev!.x + dx,
      y: prev!.y + dy,
    }));
    setElements((prev) => [
      ...prev.filter((element) => element.id !== target!.id),
      target!,
    ]);
    draw();
  };
  const handleMouseUp = (event: any) => {
    setIsDown(false);
    push();
  };
  const handleMouseOut = (event: any) => {
    handleMouseUp(event);
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    const customImage = new Image();
    customImage.src = images[0];
    customImage.onload = () => {
      context?.drawImage(customImage, 0, 0, 100, 100);
    };
  }, [images]);

  return (
    <canvas
      width={500}
      height={500}
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    />
  );
};
export default Canvas;
