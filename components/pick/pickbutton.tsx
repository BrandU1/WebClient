import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { AlertToast } from "@common/alerttoast";
import HeartIcon from "@icons/heart";
import { BranduBaseResponse, HotDeal } from "../../types/privacy";

interface pickProp {
  id: number;
}
function PickButton({ id }: pickProp) {
  const getHotDeal = () => {
    return client.get(`products/contents/hot-deal`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery<BranduBaseResponse<HotDeal[]>>(
    ["hotDeal"],
    getHotDeal
  );

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
        // @ts-ignore
        if (data[id]?.is_wish) {
          // @ts-ignore
          deletePick.mutate(data[id]?.id);
        } else {
          // @ts-ignore
          mutation.mutate(data[id].id);
          AlertToast({ text: "찜한 상품", path: "pick" });
        }
      }}
      className={`${
        // @ts-ignore
        data[id].is_wish ? "bg-main " : "bg-[#DFDFE0]"
      } pickBtn absolute bottom-[80px] right-[10px] w-8 h-8 rounded-xl bg-[#DFDFE0] flex justify-center items-center`}
    >
      <HeartIcon
        // @ts-ignore
        color={`${data[id].is_wish ? "#fff" : "#DFDFE0"}`}
        width={20}
        height={17}
        border="#fff"
      />
    </div>
  );
}

export default PickButton;
