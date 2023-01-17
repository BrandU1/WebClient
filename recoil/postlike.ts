import { atom } from "recoil";

export interface myPostLikeList {
  postLiked: number[];
}

export interface myScrapList {
  postScraps: number[];
}

export const PostLikedListAtom = atom<myPostLikeList>({
  key: "PostLikedListAtom",
  default: {
    postLiked: [],
  },
});

export const PostScrapListAtom = atom<myScrapList>({
  key: "PostScrapListAtom",
  default: {
    postScraps: [],
  },
});
