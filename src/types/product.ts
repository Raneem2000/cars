export type ProductData = {
  id: string | number;
  evaluation: number;
 
  product_for_admin: {
     unit: {
   id: string | number;
    product_id: string | number;
      name: string;
    is_bigger: boolean;
    note: string| null;
    price: number;
    multiple_price:number;
    price_discount: number ;
    min_multiple_count: number ;
    multiple_price_discount: number ;
    factor: number;
    bar_code: string;
    created_at: Date;
    updated_at: Date;
  }
    main_image: {
      id: string;
      file_name: string;
       unit: {
  id: string | number;
    product_id: string | number;
    name: string;
    is_bigger: boolean;
    note: string| null;
    price: number;
    multiple_price:number;
    price_discount: number ;
    min_multiple_count: number;
    multiple_price_discount: number ;
    factor: number ;
    bar_code: string;
    created_at: Date;
    updated_at: Date;
  }
    }
    name: string;
    price: number;
    id:number
  };
  main_image_id: number;
  type:string;
  name: string;
  price: number;
  min_multiple_notification: number;
  is_active: number;
  product_category_id: number;
  count:number;
  quantity:number
  product_category: {
    id: number;
    name: string;
  };
  main_image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
 
  created_at:Date
  updated_at:Date
};
export type UnitData = {
  id: string | number;
    product_id: string | number;
    name: string;
    is_bigger: boolean;
    note: string| null;
    price: number;
    multiple_price:number | null;
    price_discount: number | null;
    min_multiple_count: number | null;
    multiple_price_discount: number | null;
    factor: number | null;
    bar_code: string;
    created_at: Date;
    updated_at: Date;
}
export type ProductFormValues = {
  evaluation: number;
  main_image_id: number;
  description:string;
  cost:string;
  price_discount:string;
  multiple_price:string;
  name: string;
  price: number;
  is_active: boolean;
  product_category_id: number;
  product_category: {
    id: number;
    name: string;
  };
    id: string | number;
  main_image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
};