export interface Product{
    id : number;
    name : string;
    barCode : string;
    buyingPrice: number;
    sellingPrice : number;
    description : string;
    productType : ProductType
}

export interface ProductType{
    id: number
    name: string
    description: string 
}

export interface User {
    id ?: number;
    username: string;
    full_name: string;
    email : string;
    role: string;
    disabled : boolean;
}

export interface Role {
    role: string;
}
export interface SaleState {
    id?:number;
    product_id?: number;
    barCode?: string;
    name: string;
    price: number;
    count: number
  }
export interface Sale{
    id:number;
    customerName:string;
    phoneNumber :string;
    creator:string;
    saleStates:SaleState[];
    created_at : Date;
}
export interface SaleDashboard{
    salesThisWeek: number ;
    salesThisMonth: number;
    earningsThisWeek: number;
    totalRevenue: number ;
}