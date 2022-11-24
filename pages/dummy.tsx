import LoginModal from "@components/login";
import { useState } from "react";

function Dummy() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>로그인창</button>
      <LoginModal open={modalOpen} close={closeModal} />
    </div>
  );
}

export default Dummy;
