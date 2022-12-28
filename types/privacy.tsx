import { SimpleProduct } from "../recoil/totalamount";

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
  product: SimpleProduct;
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
  id: number;
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

export interface Product {
  id: number;
  tags: Tags[];
  images: any[];
  options: [];
  is_wish: boolean;
  is_basket: boolean;
  name: string;
  backdrop_image: string;
  price: number;
  brand: number;
  category: number;
  view_count: number;
}

export interface Tags {
  id: number;
  name: string;
}

export interface Inquiry {
  id: number;
  title: string;
  description: string;
  images: any[];
  created: string;
  is_answer: boolean;
}

export interface SearchBase {
  count: number;
  next: string;
  previous: string;
  results: SearchResult[];
}

export interface SearchResult {
  id: number;
  name: string;
  price: number;
  backdrop_image: string;
  is_wish: boolean;
}

export interface BranduBaseResponse<T> {
  success: boolean;
  results: T;
  error?: T;
}

export interface Point {
  point: number;
  point_history: PointHistory[];
}
export interface PointHistory {
  id: number;
  memo: string;
  point: number;
  is_use: boolean;
  created: string;
}
export interface Categories {
  id: number;
  name: string;
  sub_categories: SubCategories[];
}
export interface SubCategories {
  id: number;
  name: string;
  backdrop_image: string;
}
export interface Community {
  backdrop_image: string;
  content: string;
  id: number;
  profile: number;
  title: string;
}
