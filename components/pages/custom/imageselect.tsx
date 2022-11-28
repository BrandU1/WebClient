import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useState } from "react";
import NewImgModal from "@components/pages/custom/newimgmodal";
import ExistModal from "@components/pages/custom/existmodal";

interface selectModalProps {
  open: boolean;
  handleClose: () => any;
}

function ImageSelect({ open, handleClose }: selectModalProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 620,
    height: 500,
  };

  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const handleNewClose = () => {
    setNewModalOpen(false);
  };
  const [existModalOpen, setExistModalOpen] = useState<boolean>(false);
  const handleExistClose = () => {
    setExistModalOpen(false);
  };

  return (
    <div className="focus:outline-0 flex flex-row">
      <Modal
        open={open && !newModalOpen && !existModalOpen}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className="flex flex-row space-x-5 h-full focus:outline-none">
            <div
              className="flex flex-col h-full w-[300px] justify-center items-center m-auto bg-white rounded-xl"
              onClick={() => {
                setExistModalOpen(true);
              }}
            >
              <Image
                src={"/logo/existImg.svg"}
                alt={"existImg"}
                width={150}
                height={150}
              />
              <h2 className="font-bold text-xl mt-12">기존이미지 선택</h2>
            </div>
            <div
              className="flex flex-col h-full w-[300px] justify-center items-center m-auto bg-white rounded-xl"
              onClick={() => {
                setNewModalOpen(true);
              }}
            >
              <Image
                src={"/logo/newImg.svg"}
                alt={"newImg"}
                width={150}
                height={150}
              />
              <h2 className="font-bold text-xl mt-12">신규이미지 추가</h2>
            </div>
          </div>
        </Box>
      </Modal>
      {newModalOpen && (
        <NewImgModal open={newModalOpen} handleClose={handleNewClose} />
      )}
      {existModalOpen && (
        <ExistModal handleClose={handleExistClose} open={existModalOpen} />
      )}
    </div>
  );
}

export default ImageSelect;
