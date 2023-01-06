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

export enum CanvasActionType {
  MOVE_DOWN,
  MOVE_UP,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_HORIZONTAL_CENTER,
  MOVE_VERTICAL_CENTER,
  MOVE_FORWARD,
  MOVE_BACKWARD,
}

export const canvasHistoryIndex = atom<number>({
  key: "canvasHistoryIndex",
  default: 0,
});

export const canvasHistories = atom<string[]>({
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

export const canvasAction = atom<CanvasActionType | null>({
  key: "canvasAction",
  default: null,
});

export const canvasActionSelected = atom<boolean>({
  key: "canvasActionSelected",
  default: false,
});

export const canvasHistoriesLength = selector({
  key: "canvasHistoriesLength",
  get: ({ get }) => {
    const histories = get(canvasHistories);
    return histories.length;
  },
});

export const canvasText = atom<string[]>({
  key: "canvasText",
  default: [],
});

export const canvasImage = atom<string>({
  key: "canvasImage",
  default: "",
});
