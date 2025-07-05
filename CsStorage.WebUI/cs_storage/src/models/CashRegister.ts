import { BaseEntity } from "./BaseEntity";
import { PaymentType } from "./enums/PaymentType";

export interface CashRegister extends BaseEntity{
  value: number;
  description: string;
  paymentType: PaymentType;
}
