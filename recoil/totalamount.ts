import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

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

export const basketPurchase = atom<BasketPurchase[]>({
  key: "basketPurchase",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const basketCheckedList = atom<number[]>({
  key: "basketCheckedList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const purchaseProducts = selector({
  key: "purchaseProducts",
  get: ({ get }) => {
    const basketPurchaseList = get(basketPurchase);
    const checkedList = get(basketCheckedList);
    const purchaseProducts = basketPurchaseList.filter((item) =>
      checkedList.includes(item.product.id)
    );
    return purchaseProducts;
  },
});

export const totalPrice = selector<OrderPrice>({
  key: "totalPrice",
  get: ({ get }) => {
    const purchaseList = get(basketPurchase);
    const checkedList = get(basketCheckedList);
    const price = purchaseList
      .filter((basket) => checkedList.includes(basket.product.id))
      .reduce((acc, cur) => acc + cur.price * cur.count, 0);
    return {
      orderPrice: price,
      totalPrice: price + 3000,
    };
  },
});
