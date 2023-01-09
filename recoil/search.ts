import { atom } from "recoil";

export interface SearchState {
  searchWord: string;
}

export const SearchStateAtom = atom({
  key: "SearchStateAtom",
  default: {
    searchWord: "",
  },
});
