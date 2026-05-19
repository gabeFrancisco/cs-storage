import { BaseEntity } from "./BaseEntity";
import { PaymentType } from "./enums/PaymentType";
import { Product } from "./Product";

export interface CashRegister extends BaseEntity {
  value: number;
  quantity: number;
  product_id: number;
  product: Product;
  description: string;
  payment_type: PaymentType;
}
