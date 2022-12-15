import React, { useEffect, useState } from "react";
import { CanvasState } from "../../pages/product/[id]/custom/custom";
import ColorPencil from "@components/ImageCustom/_canvas";
import Image from "next/image";
import { Rnd } from "react-rnd";

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

type RndProps = {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
};

const Canvas = ({
  backgroundImage,
  width,
  height,
  state,
  images,
  canvasRef,
}: CanvasProps) => {
  const [color, setColor] = useState<string>("black");
  const [clear, setClear] = useState<boolean>(false);
  const [rndProps, setRndProps] = useState<RndProps[]>([]);

  useEffect(() => {
    setRndProps((prev) => {
      return [
        ...prev,
        {
          position: {
            x: initialPosition.x,
            y: initialPosition.y,
          },
          size: {
            width: initialPosition.width / 2,
            height: initialPosition.height / 2,
          },
        },
      ];
    });
  }, [images]);

  return (
    <div className={`relative w-[500px] h-[500px] -z-50`}>
      <div
        className={`absolute w-[500px] h-[500px] -z-50`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div
          className="absolute flex justify-center border-2 border-main m-auto"
          style={{
            top: initialPosition.y,
            left: initialPosition.x,
            height: initialPosition.height,
            width: initialPosition.width,
          }}
        />
        <div className="absolute">
          <ColorPencil
            enable={state === CanvasState.DRAW}
            canvasRef={canvasRef}
            width={width}
            height={height}
            pencilColor={color}
            clear={clear}
          />
        </div>
        <div className="absolute">
          {images.map((image, index) => {
            return (
              <Rnd
                key={index}
                size={rndProps[index].size}
                position={rndProps[index].position}
                onDragStop={(e, d) => {
                  if (
                    d.x > initialPosition.x + initialPosition.width ||
                    d.y > initialPosition.y + initialPosition.height ||
                    d.x < initialPosition.x ||
                    d.y < initialPosition.y
                  )
                    return;
                  setRndProps((prev) => {
                    const newProps = [...prev];
                    newProps[index].position = {
                      x: d.x,
                      y: d.y,
                    };
                    return newProps;
                  });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setRndProps((prev) => {
                    const newProps = [...prev];
                    newProps[index].size = {
                      width: Number(ref.style.width),
                      height: Number(ref.style.height),
                    };
                    return newProps;
                  });
                }}
              >
                <Image
                  className="relative"
                  src={image}
                  alt={`image-${index}`}
                  layout="fill"
                  draggable="false"
                />
              </Rnd>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Canvas;
