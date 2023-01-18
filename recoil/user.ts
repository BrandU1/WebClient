import { atom, selector } from "recoil";
import { UserInterface } from "../types/privacy";

interface UserRecoilState {
  user: UserInterface;
}

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
    point: 0,
    platforms: [],
  },
});

export const userData = selector<UserRecoilState>({
  key: "userDataState",
  get: ({ get }) => {
    const info = get(userInfo);

    return {
      user: info,
    };
  },
});
