import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { AlertToast } from "@common/alerttoast";
import HeartIcon from "@icons/heart";
import { BranduBaseResponse, HotDeal } from "../../types/privacy";

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

  return (
    <div
      onClick={() => {
        if (wish == true) {
          deletePick.mutate(id);
        } else {
          mutation.mutate(id);
          return <AlertToast text={"찜한 상품"} path={"pick"} />;
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
