import { atom } from "recoil";

interface BasketProps {
  amount: number;
  is_purchase: boolean;
  product: {
    backdrop_image: string;
    id: number;
    is_wish: boolean;
    name: string;
    price: number;
  };
}

export const basketRecoil = atom<BasketProps[]>({
  key: "basketList",
  default: [
    {
      amount: 0,
      is_purchase: false,
      product: {
        backdrop_image: "",
        id: 0,
        is_wish: false,
        name: "",
        price: 0,
      },
    },
  ],
});
