import { useRef } from "react";
import ModalFrame from "@common/modalframe";

interface CancelProps {
  onClose: () => void;
}

function OrderCancel({ onClose }: CancelProps) {
  const cancelEl = useRef<HTMLDivElement>(null);
  const handleCancelModal = (e: any) => {
    if (!cancelEl.current?.contains(e.target)) {
      // handleClose();
    }
  };

  return (
    <ModalFrame
      close={onClose}
      blur={handleCancelModal}
      pageRef={cancelEl}
      width={600}
      height={500}
      title={"주문취소"}
      components={
        <div>
          <div>asd</div>
        </div>
      }
    />
  );
}

export default OrderCancel;
