export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  backdrop_image: string;
  is_wish: false;
}

export interface ProductInfoInterface {
  id: number;
  brand: {
    id: number;
    name: string;
    logo: string;
  };
  category: {
    id: number;
    name: string;
    backdrop_image: string;
  };
  options: {
    id: number;
    color: {
      name: string;
      hashcode: string;
    };
    size: string;
    count: number;
  };
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  backdrop_image: string;
  price: number;
}
