import { atom } from "recoil";

export interface myPostLikeList {
  postLiked: number[];
}

export const PostLikedListAtom = atom<myPostLikeList>({
  key: "PostLikedListAtom",
  default: {
    postLiked: [],
  },
});
