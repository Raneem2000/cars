export type BrnachesData = {
    id:string;
    admin_id:string;
    branch_balance:number;
    city:string;
    address:string;
    phone:string;
    creditor:number;
    debtor: number;
    is_work_shop:boolean,
    location :{
        name:string;
        latitude:number;
        longitude:number;
    }
    name:string;
    
}
export type BrnacheForm = {
    admin_id:string;
    branch_balance:number;
    is_main:boolean;
    is_active:boolean;
    city:string;
    address:string;
    phone:string;
    name:string;
    latitude:number;
    longitude:number;
}
export type BrnacheAdminForm = {
    name: string;
    user: object;
}
export type BrnacheAdminData = {
    name: string;
    user: object;
}