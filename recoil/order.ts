import { recoilPersist } from "recoil-persist";
import { AddressInterface } from "../types/privacy";
import { atom, selector } from "recoil";
import { purchaseProducts } from "./totalamount";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

interface OrderRecoilState {
  name: string;
  address: number;
  products: {
    product: number;
    count: number;
  }[];
  orderPrice: number;
}

export const selectedAddress = atom<AddressInterface | null>({
  key: "selectedAddress",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const orderAddress = selector<AddressInterface | null>({
  key: "orderAddress",
  get: ({ get }) => {
    return get(selectedAddress);
  },
});

export const newOrder = selector<OrderRecoilState>({
  key: "newOrderState",
  get: ({ get }) => {
    const address = get(orderAddress);
    const products = get(purchaseProducts);
    const price = products.reduce(
      (acc, cur) => acc + cur.custom_product.product.price * cur.amount,
      0
    );

    return {
      name:
        `${products[0]?.custom_product.product.name} 외 ${
          products.length - 1
        }개` || "",
      address: address?.id || 0,
      products:
        products.map((product) => ({
          product: product.custom_product.id,
          count: product.amount,
        })) || [],
      orderPrice: price || 0,
    };
  },
});
