export interface Product{
    id : number;
    barCode : string;
    name : string;
    productType : ProductType;
    buyingPrice?: number;
    sellingPrice : number;
    quantity?: number;
    description?: string;
    createdBy?: string;
    lastUpdatedBy?: string;
    keywords?: string[];

}

export interface ProductType{
    id: number;
    name?: string;
    description?: string;
    createdBy?: string;
    lastUpdatedBy?: string;
}


export interface Role {
    role: string;
}
export interface SaleState {
    id?:number;
    product_id?: number;
    quantity: number
    productName: string;
    sellingPrice: number;
    created_at?: Date;
}

export interface CreateSaleStateDTO {
    productId?: number;
    productBarCode?: string;
    productName?: string;
    quantity: number
    price: number;
}

export interface CreateSaleDTO{
    customerName?:string;
    customerPhoneNumber?:string;
    customerId?: string;
    customerCity?: string;
    description?: string;
    saleStates:CreateSaleStateDTO[];
}
export interface Sale{
    id:number;
    uuid: string;
    customerName:string;
    customerPhoneNumber :string;
    customerId: string;
    customerCity: string;
    description: string;
    saleStates:SaleState[];
    createdBy:string;
    created_at?: Date;
}
export interface SaleDashboard{
    salesThisWeek: number ;
    salesThisMonth: number;
    earningsThisWeek: number;
    totalRevenue: number ;
}