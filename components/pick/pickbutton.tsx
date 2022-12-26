import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { AlertToast } from "@atoms/alerttoast";
import HeartIcon from "@icons/heart";
import { BranduBaseResponse, HotDeal } from "../../types/privacy";
import { useRecoilState } from "recoil";
import { ToastState, ToastStateAtom } from "../../recoil/toast";
import { useEffect } from "react";

interface pickProp {
  id: number;
  wish: boolean;
  li_width: number;
  li_height: number;
}
function PickButton({ id, wish, li_width, li_height }: pickProp) {
  const queryClient = useQueryClient();
  // pick 추가
  const mutation = useMutation(
    (id: number) =>
      client.post(`/accounts/wishes/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
        handleAlertOpen("찜한 상품", true, "pick");
      },
    }
  );
  // pick 삭제
  const deletePick = useMutation(
    (id: number) =>
      client.delete(`/accounts/wishes/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotDeal"]);
      },
    }
  );
  const [toast, setToast] = useRecoilState<ToastState>(ToastStateAtom);
  const handleAlertOpen = (type: string, alert: boolean, path: string) => {
    const temp = { ...toast };
    temp.type = type;
    temp.alert = alert;
    temp.path = path;
    setToast(temp);
  };

  return (
    <div
      onClick={() => {
        if (wish == true) {
          deletePick.mutate(id);
        } else {
          mutation.mutate(id);
        }
      }}
      className={`${
        wish ? "bg-main" : "bg-[#DFDFE0]"
      } pickBtn absolute bottom-[80px] right-[10px] w-8 h-8 rounded-xl flex justify-center items-center`}
    >
      <HeartIcon
        color={`${wish ? "#0CABA8" : "#DFDFE0"}`}
        width={li_width}
        height={li_height}
        border="#fff"
      />
    </div>
  );
}

export default PickButton;
