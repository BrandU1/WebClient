import ModalFrame from "@common/modalframe";
import { useForm } from "react-hook-form";
import CheckBtn from "@icons/checkBtn";

interface addressAddProps {
  handleClose: () => void;
}
interface AddressForm {
  addressTitle: string;
  recipient: string;
  phone_number: string;
  road_name_address: string;
  detail_address: string;
  main: boolean;
}
function AddressAdd({ handleClose }: addressAddProps) {
  const { register, handleSubmit, watch } = useForm<AddressForm>();

  const onValid = () => {
    const formData = new FormData();

    formData.append("addressTitle", watch("addressTitle"));
    formData.append("recipient", watch("recipient"));
    formData.append("phone_number", watch("phone_number"));
    formData.append("road_name_address", watch("road_name_address"));
    formData.append("detail_address", watch("detail_address"));
    // formData.append("main ", watch("main"));
  };
  return (
    <ModalFrame
      close={handleClose}
      width={600}
      height={500}
      title={"배송지 정보"}
      components={
        <div className="mt-10 flex flex-col">
          <div className="flex justify-around my-2">
            <div className="title w-[60px] text-subContent text-sm">
              <h2>주소명</h2>
            </div>
            <div className="InputBar">
              <input
                defaultValue={"주소명"}
                {...register("addressTitle")}
                className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                placeholder="주소명"
              />
            </div>
          </div>
          <div className="flex justify-around my-2">
            <div className="title w-[60px] text-subContent text-sm">
              <h2>받는 분</h2>
            </div>
            <div className="InputBar">
              <input
                defaultValue={"받는 분"}
                {...register("recipient")}
                className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                placeholder="받는 분"
              />
            </div>
          </div>
          <div className="flex justify-around my-2">
            <div className="title w-[60px] text-subContent text-sm">
              <h2>연락처</h2>
            </div>
            <div className="InputBar">
              <input
                defaultValue={"연락처"}
                {...register("phone_number")}
                className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                placeholder="연락처"
              />
            </div>
          </div>
          <div className="flex justify-around my-2">
            <div className="title w-[60px] text-subContent text-sm">
              <h2>주소</h2>
            </div>
            <div className="InputBar">
              <input
                defaultValue={"주소"}
                {...register("road_name_address")}
                className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                placeholder="주소"
              />
            </div>
          </div>
          <div className="flex justify-around my-2">
            <div className="title w-[60px] text-subContent text-sm">
              <h2>상세주소</h2>
            </div>
            <div className="InputBar">
              <input
                defaultValue={"상세주소"}
                {...register("detail_address")}
                className={`border-[1px] border-gray w-[270px] h-[30px] rounded-[10px] text-sm ml-[10px] px-1`}
                placeholder="상세주소"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <CheckBtn color={"gray"} width={20} height={20} />
            <span className="text-xs ml-2">대표 배송지로 선택</span>
          </div>

          <div className="SaveButton flex justify-center mt-5 cursor-pointer">
            <button
              className="text-white w-[318px] h-[45px] text-sm font-bold rounded-xl bg-main"
              onClick={handleSubmit(onValid)}
            >
              저장하기
            </button>
          </div>
        </div>
      }
    />
  );
}

export default AddressAdd;
