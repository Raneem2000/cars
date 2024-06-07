
export type ServiceForm = {
  id?:number
 name: string;
 currency: string;
  description?: string;
  price: string;
}

export type ServiceData = {
 id:number
  name: string;
  servId: number;
  price: string;
 currency: string;
  description?: string;
    image: {
    id: number;
    file_name: string;
    model_id: number;
    disk: string;
    original_url: string;
    preview_url: string;
  };
}