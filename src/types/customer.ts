

export type CustomerData = {
 id:string;
 name:string;
 country:string;
 created_at: string;
 phone: string;
 email: string;
 password: string;
 currency: string | null;
            address :string|null
            is_company :boolean |null
            driver_name : string|null
            driver_phone : string|null
            driver_address : string|null
            opening_balance :string|null
 image:{
    id:string;
    file_name:string;
 }
}

export type CustomerForm = {
 name:string;
 country:string;
 created_at: string;
 phone: string;
 email: string;
 password: string;
 currency: string | null;
            address :string|null
            is_company :boolean |null
            driver_name : string|null
            driver_phone : string|null
            driver_address : string|null
            opening_balance :string|null
    image:string
   }