import { atom } from "recoil";
import { Ref } from "react";

export const drawCanvas = atom<Ref<HTMLCanvasElement>>({
  key: "drawCanvas",
  default: null,
});
