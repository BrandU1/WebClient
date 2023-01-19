import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { useRecoilState } from "recoil";
import { ToastState, ToastStateAtom } from "../../recoil/toast";
import HeartIcon from "@icons/heart";
import ScrapIcon from "@icons/scrap";

interface scrapProp {
  id: number;
  scrap: boolean;
  li_width: number;
  li_height: number;
}

function ScrapButton({ id, scrap, li_width, li_height }: scrapProp) {
  const queryClient = useQueryClient();
  // scrap 추가
  const mutation = useMutation(
    (id: any) => {
      return client.post(`accounts/scraps/${id}`, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["edit", id]);
        queryClient.invalidateQueries(["bestPost"]);
        queryClient.invalidateQueries(["scrap"]);
        handleAlertOpen("스크랩북", true, "scrap");
      },
    }
  );

  // scrap 삭제
  const deletePick = useMutation(
    (id: any) => {
      return client.delete(`accounts/scraps/${id}`, id);
      // .then((res) => res.data);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["edit", id]);
        await queryClient.invalidateQueries(["bestPost"]);
        await queryClient.invalidateQueries(["scrap"]);
      },
    }
  );

  //alert
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
        if (scrap === true) {
          deletePick.mutate(id);
        } else {
          mutation.mutate(id);
        }
      }}
      className={`pickBtn w-full h-full rounded-full flex justify-center items-center`}
    >
      <ScrapIcon
        color={scrap ? "#0CABA8" : "#DFDFE0"}
        width={li_width}
        height={li_height}
        stroke={scrap ? "#0CABA8" : "#DFDFE0"}
      />
    </div>
  );
}

export default ScrapButton;
