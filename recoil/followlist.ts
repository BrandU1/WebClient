import { atom } from "recoil";
import { FollowList } from "../types/privacy";

export interface myFollowingList {
  followings: number[];
}

export const FollowingListAtom = atom<myFollowingList>({
  key: "FollowingListAtom",
  default: {
    followings: [],
  },
});
