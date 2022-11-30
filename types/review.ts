export interface WrittenReviewInterface {
  id: number;
  profile: number;
  order_product: number;
  product: string;
  product_name: string;
  created: string;
  star: number;
  comment: string;
}

export interface WritableReviewInterface {
  id: number;
  order: number;
  product: number;
  count: number;
  created: string;
}
