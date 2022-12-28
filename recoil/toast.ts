import { atom } from "recoil";

export interface ToastState {
  type: string;
  path: string;
  alert: boolean;
}

export const ToastStateAtom = atom<ToastState>({
  key: "toastState",
  default: {
    type: "",
    path: "",
    alert: false,
  },
});
