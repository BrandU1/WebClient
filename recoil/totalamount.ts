import { atom } from "recoil";

interface Product {
  id: number;
  amount: number;
  price: number;
}

interface WishList {
  count: number;
  products: Product[];
}

export const totalAmount = atom<WishList>({
  key: "totalAmount",
  default: {
    count: 0,
    products: [],
  },
});
