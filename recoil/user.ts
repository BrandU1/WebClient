import { atom, selector } from "recoil";
import { BranduBaseResponse, Point, UserInterface } from "../types/privacy";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface UserRecoilState {
  id: number;
  name: string;
  nickname: string;
  profile_image: string;
  point: number;
}

export const userPoint = atom<Point | null>({
  key: "userPoint",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userInfo = atom<UserInterface | null>({
  key: "userInfo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const getUserPoint = selector<Point | null>({
  key: "getUserPoint",
  get: ({ get }) => {
    return get(userPoint);
  },
});

export const getUserInfo = selector<UserInterface | null>({
  key: "getUserInfo",
  get: ({ get }) => {
    return get(userInfo);
  },
});

export const newUserData = selector<UserRecoilState>({
  key: "newUserData",
  get: ({ get }) => {
    const point = get(getUserPoint);
    const user = get(getUserInfo);

    return {
      id: user?.id || -1,
      name: user?.name || "",
      nickname: user?.nickname || "",
      profile_image: user?.profile_image || "",
      point: point?.point || 0,
    };
  },
});
