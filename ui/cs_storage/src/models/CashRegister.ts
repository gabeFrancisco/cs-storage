import { BaseEntity } from "./BaseEntity";
import { PaymentType } from "./enums/PaymentType";

export interface CashRegister extends BaseEntity{
  value: number;
  description: string;
  payment_type: PaymentType;
}
