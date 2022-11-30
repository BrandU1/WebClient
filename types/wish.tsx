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

export interface BranduBaseResponse<T> {
  success: boolean;
  results: T;
}
