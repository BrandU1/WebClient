import { atom, selector } from "recoil";
import { Point } from "../types/privacy";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface PointRecoilState {
  point: number;
  point_history: PointHistory[];
}
interface PointHistory {
  id: number;
  memo: string;
  point: number;
  is_use: boolean;
  created: string;
}

export const getuserPoint = atom<Point | null>({
  key: "getUserPoint",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// export const userPoint = selector<PointRecoilState>({
//   key: "userPointState",
//     get: () => {};
// });
