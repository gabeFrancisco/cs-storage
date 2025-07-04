import { PaymentType } from "./enums/PaymentType";

export interface CashRegister{
  value: number;
  description: string;
  paymentType: PaymentType;
}
