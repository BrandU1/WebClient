import { atom, selector } from "recoil";
import { Point, UserInterface } from "../types/privacy";
import { recoilPersist } from "recoil-persist";

interface UserRecoilState {
  user: UserInterface;
  point: Point;
}

export const userPoint = atom<Point>({
  key: "getUserPoint",
  default: {
    point: 0,
    point_history: [],
  },
});

export const userInfo = atom<UserInterface>({
  key: "getUserInfo",
  default: {
    id: 0,
    name: "",
    nickname: "",
    email: "",
    phone_number: "",
    profile_image: "",
    social_link: "",
    platforms: [],
  },
});

export const userData = selector<UserRecoilState>({
  key: "userDataState",
  get: ({ get }) => {
    const point = get(userPoint);
    const info = get(userInfo);

    return {
      user: info,
      point: point,
    };
  },
});
