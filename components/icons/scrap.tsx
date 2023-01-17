import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";
import { useRecoilState } from "recoil";
import { myScrapList, PostScrapListAtom } from "../../recoil/postlike";

interface ScrapProps {
  color: string;
  width: number;
  height: number;
  stroke: string;
  id: number;
}

function ScrapIcon({ color, width, height, stroke, id }: ScrapProps) {
  // const queryClient = useQueryClient();
  //
  // const scrap = useMutation(
  //   (id: number) => {
  //     return client.post(`accounts/scraps/${id}`);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["scrap"]);
  //     },
  //   }
  // );

  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V19L8 15L1 19V5.8Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
export default ScrapIcon;
