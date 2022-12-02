export interface pickInterface {
  id: number;
  is_basket: boolean;
  product: {
    id: number;
    backdrop_image: string;
    name: string;
    price: number;
    is_wish: boolean;
  };
}

export interface basketInterface {
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

export interface BranduBaseResponse<T> {
  success: boolean;
  results: T;
}
