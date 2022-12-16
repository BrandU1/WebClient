import { atom, selector } from "recoil";

interface Product {
  id: number;
  amount: number;
  price: number;
}

interface WishList {
  count: number;
  products: Product[];
}

interface BasketPurchase {
  product: number;
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

export const totalPrice = selector<OrderPrice>({
  key: "totalPrice",
  get: ({ get }) => {
    const purchaseList = get(basketPurchase);
    const checkedList = get(basketCheckedList);
    const price = purchaseList
      .filter((basket) => checkedList.includes(basket.product))
      .reduce((acc, cur) => acc + cur.price * cur.count, 0);
    return {
      orderPrice: price,
      totalPrice: price + 3000,
    };
  },
});
