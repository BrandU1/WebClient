import { selector } from "recoil";
import { BranduBaseResponse, Point, UserInterface } from "../types/privacy";
import client from "@lib/api";

interface UserRecoilState {
  id: number;
  name?: string;
  nickname?: string;
  email?: string;
  phone_number?: string;
  profile_image: string;
  social_link?: string;
  platforms: {
    platform: string;
  }[];
  point: number;
}

export const getUserPoint = selector<Point | null>({
  key: "getUserPoint",
  get: async ({ get }) => {
    const response = await client.get("accounts/point");
    return response.data;
  },
});

export const getUserInfo = selector<BranduBaseResponse<UserInterface> | null>({
  key: "getUserInfo",
  get: async ({ get }) => {
    const response = await client.get("accounts/me");
    return response.data;
  },
});

export const userData = selector<UserRecoilState>({
  key: "userDataState",
  get: async ({ get }) => {
    const point = await get(getUserPoint);
    const info = await get(getUserInfo);

    return {
      id: info?.results.id!,
      name: info?.results.name!,
      nickname: info?.results.nickname!,
      email: info?.results.email!,
      phone_number: info?.results.phone_number!,
      profile_image: info?.results.profile_image!,
      social_link: info?.results.social_link!,
      platforms: info?.results.platforms!,
      point: point?.point!,
    };
  },
});
