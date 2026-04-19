import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";
import { ProductType } from "./enums/ProductType";

export interface Product extends BaseEntity{
    name: string;
    description: string;
    quantity: number;
    price: number;
    product_type: ProductType;
    category: Category
}