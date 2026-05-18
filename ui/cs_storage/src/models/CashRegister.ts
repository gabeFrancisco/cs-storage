import { BaseEntity } from "./BaseEntity";
import { PaymentType } from "./enums/PaymentType";

export interface CashRegister extends BaseEntity {
  value: number;
  quantity: number;
  product_id: number;
  description: string;
  payment_type: PaymentType;
}
