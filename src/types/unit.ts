export type UnitData = {
  id: number;
  name: string;
  price: number;
  product_id: number;
  //   is_bigger: boolean;
  note: string;
  multiple_price: number;
  price_discount: number;
  min_multiple_count: number;
  multiple_price_discount: number;
  factor: number;
  bar_code: string;
  currency: number;
  work_shop_id: number;
  created_at: Date;
  updated_at: Date;
  is_bigger: number;
   image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
};
export type UnitFormValues = {
  id?: number;
  name: string;
  price?: number;
  product_id: number;
  //   is_bigger: boolean;
  note?: string;
  multiple_price?: number;
  price_discount?: number;
  min_multiple_count?: number;
  multiple_price_discount?: number;
  factor?: number;
  bar_code?: string;
  work_shop_id: number;
  currency: number;
  is_bigger: number;
  
};
