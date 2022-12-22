import { atom } from "recoil";

export const isLoginModalOpen = atom<boolean>({
  key: "isLoginModalOpen",
  default: false,
});
