import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useState } from "react";

interface ModalProps {
  width: number;
  height: number | string;
  onClose: any; //backBtn
  open: boolean; //Modal 열기
  title: string; //Modal 제목
  components: any; //제목 밑 Modal 내용
}

function ModalFrame({
  width,
  height,
  onClose,
  title,
  components,
  open,
}: ModalProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { width },
    height: { height },
    boxShadow: 24,
    background: "#FFFFFF",
    borderRadius: "15px",
    p: 4,
  };

  console.log("open");

  return (
    <div className="focus:outline-0">
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="flex flex-col">
            <div>
              <Image
                onClick={onClose}
                src={"/logo/backBtn.svg"}
                alt={"backBtn"}
                width={16}
                height={16}
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              <span className="font-bold text-xl flex justify-center items-center">
                {title}
              </span>
              {components}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalFrame;
