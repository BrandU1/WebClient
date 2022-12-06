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

export interface AddressInterface {
  id: number;
  name: string;
  recipient: string;
  road_name_address: string;
  zip_code: number;
  detail_address: string;
  phone_number: string;
  is_main: boolean;
}

export interface UserInterface {
  id: number;
  name?: string;
  backdrop_image?: string;
  nickname?: string;
  email?: string;
  description?: string;
  phone_number?: string;
  profile_image?: string;
  social_link?: string;
  platforms: Platform[];
}
export interface Platform {
  created: string;
  platform: string;
}

export interface History {
  search_word: string;
}

export interface HotDeal {
  backdrop_image: string;
  id: number;
  is_wish: boolean;
  name: string;
  price: number;
}

export interface SummaryProfile {
  point: number;
  wish_count: number;
  basket_count: number;
  scrap_count: number;
  coupon_count: number;
}

export interface BranduBaseResponse<T> {
  success: boolean;
  results: T;
}
