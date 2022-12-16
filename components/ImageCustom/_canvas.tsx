import React, { useCallback, useEffect, useState } from "react";

interface CanvasProps {
  enable: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  pencilColor: string;
  clear: boolean;
}

interface Coordinate {
  x: number;
  y: number;
}

function ColorPencil({
  enable,
  width,
  height,
  pencilColor,
  clear,
  canvasRef,
}: CanvasProps) {
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = pencilColor;
      context.lineJoin = "round";
      context.lineWidth = 3;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    if (!enable) return;
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (!enable) return;
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  const EraseDrawing = () => {
    const context = canvasRef.current?.getContext("2d");
    context?.clearRect(0, 0, width, height);
  };

  if (clear) {
    EraseDrawing();
  }

  useEffect(() => {
    if (!canvasRef?.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  return (
    <canvas
      id="canvas-DRAW"
      ref={canvasRef}
      height={height}
      width={width}
      className="canvas"
    />
  );
}

export default ColorPencil;
