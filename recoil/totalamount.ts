import { atom, selector } from "recoil";

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

export const basketPurchase = atom<BasketPurchase[]>({
  key: "basketPurchase",
  default: [],
});

export const basketCheckedList = atom<number[]>({
  key: "basketCheckedList",
  default: [],
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
