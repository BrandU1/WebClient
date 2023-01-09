import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Basket } from "../pages/basket";

export interface SimpleProduct {
  backdrop_image: string;
  id: number;
  is_wish: boolean;
  name: string;
  price: number;
}

export interface BasketPurchase {
  product: SimpleProduct;
  count: number;
  price: number;
}

interface OrderPrice {
  orderPrice: number;
  totalPrice: number;
}

// const { persistAtom } = recoilPersist();
// const sessionStorage =
//   typeof window !== "undefined" ? window.sessionStorage : undefined;
// const { persistAtom } = recoilPersist({
//   key: "purchase",
//   storage: sessionStorage,
// });

const { persistAtom } = recoilPersist();

export const basketPurchase = atom<Basket[]>({
  key: "basketPurchase",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const basketCheckedList = atom<number[]>({
  key: "basketCheckedList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const purchaseProducts = selector<Basket[]>({
  key: "purchaseProducts",
  get: ({ get }) => {
    const basketPurchaseList = get(basketPurchase);
    const checkedList = get(basketCheckedList);
    const purchaseProducts = basketPurchaseList.filter((item) =>
      checkedList.includes(item.custom_product.product.id)
    );
    return purchaseProducts;
  },
});

export const totalPrice = selector<OrderPrice | undefined>({
  key: "totalPrice",
  get: ({ get }) => {
    const purchaseList = get(basketPurchase);
    const checkedList = get(basketCheckedList);
    console.log(purchaseList);
    console.log(checkedList);
    const price = purchaseList
      .filter((basket) =>
        checkedList.includes(basket.custom_product.product.id)
      )
      .reduce(
        (acc, cur) => acc + cur.custom_product.product.price * cur.amount,
        0
      );
    return {
      orderPrice: price,
      totalPrice: price + 3000,
    };
  },
});
