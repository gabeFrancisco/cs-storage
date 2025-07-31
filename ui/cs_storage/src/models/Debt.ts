import { BaseEntity } from "./BaseEntity";
import { Customer } from "./Customer";

export interface Debt extends BaseEntity{
  value: number;
  forecast: string;
  paid_date: string;
  customer: Customer;
}
