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
  zip_code: string;
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

export interface Ranking {
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
  posts: searchPost;
  products: searchProduct;
}
export interface searchPost {
  count: number;
  next: number;
  previous: number;
  results: searchPost[];
}
export interface searchPost {
  id: number;
  title: string;
  backdrop_image: string;
  profile: number;
  created: string;
}
export interface searchProduct {
  count: number;
  next: number;
  previous: number;
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

export interface FollowList {
  follower: FollowingProfile[];
  following: FollowingProfile[];
}

export interface FollowingProfile {
  id: number;
  nickname: string;
  social_link: string;
}

export interface Community {
  backdrop_image: string;
  content: string;
  id: number;
  profile: number;
  title: string;
}
export interface BestPost {
  backdrop_image: string;
  id: number;
  likes_count: number;
  title: string;
}
export interface RecommendComment {
  id: number;
  profile: number;
  comment: string;
  created: string;
}
export interface infiniteScroll {
  pageParams: [];
  pages: infinitePost[];
}
export interface infinitePost {
  count: number;
  next: string;
  previous: string;
  results: Community[];
}
