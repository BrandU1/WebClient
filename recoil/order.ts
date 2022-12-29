import { recoilPersist } from "recoil-persist";
import { AddressInterface } from "../types/privacy";
import { atom, selector } from "recoil";
import { purchaseProducts } from "./totalamount";

const { persistAtom } = recoilPersist();

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

export const orderAddress = selector<AddressInterface | null | undefined>({
  key: "orderAddress",
  get: ({ get }) => {
    return get(selectedAddress);
  },
});

export const newOrder = selector<OrderRecoilState | null | undefined>({
  key: "newOrderState",
  get: ({ get }) => {
    const address = get(orderAddress);
    const products = get(purchaseProducts);
    const price = products.reduce((acc, cur) => acc + cur.price, 0);

    return {
      name: `${products[0]?.product.name} 외 ${products.length - 1}개`,
      address: address?.id || 0,
      products: products.map((product) => ({
        product: product.product.id,
        count: product.count,
      })),
      orderPrice: price,
    };
  },
});
