import { selector, useRecoilValue } from "recoil";
import client from "@lib/api";

export const getUserInfo = selector({
  key: "getUserInfo",
  get: async ({ get }) => {
    const response = await client.get("accounts/point");
    return response.data.point;
  },
});
