import { atom, selector } from "recoil";

export type ElementProps = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isImage: boolean;
  image?: HTMLImageElement;
  isText: boolean;
  text?: string;
};

export const canvasHistoryIndex = atom<number>({
  key: "canvasHistoryIndex",
  default: 0,
});

export const canvasHistories = atom<ElementProps[][]>({
  key: "canvasHistories",
  default: [],
});

export const canvasUndoOrRedo = atom<boolean>({
  key: "canvasUndoOrRedo",
  default: false,
});

export const canvasHistory = selector({
  key: "canvasHistory",
  get: ({ get }) => {
    const histories = get(canvasHistories);
    const index = get(canvasHistoryIndex);
    return histories[index];
  },
});

export const canvasHistoriesLength = selector({
  key: "canvasHistoriesLength",
  get: ({ get }) => {
    const histories = get(canvasHistories);
    return histories.length;
  },
});
