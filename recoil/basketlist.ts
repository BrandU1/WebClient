import { atom } from "recoil";
import { Tags } from "../types/privacy";
import { recoilPersist } from "recoil-persist";

interface customProps {
  id: number;
  tags: Tags[];
  images: any[];
  options: [];
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  backdrop_image: string;
  price: number;
  brand: number;
  category: number;
  view_count: number;
}

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

export const customRecoil = atom<customProps>({
  key: "basketList",
  default: {
    id: 0,
    tags: [],
    images: [],
    options: [],
    is_wish: false,
    is_basket: false,
    name: "",
    backdrop_image: "",
    price: 0,
    brand: 0,
    category: 0,
    view_count: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
