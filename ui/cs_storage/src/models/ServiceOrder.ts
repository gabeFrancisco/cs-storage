import { Address } from "./Address";
import { BaseEntity } from "./BaseEntity";
import { Customer } from "./Customer";

export interface ServiceOrder extends BaseEntity {
  title: string,
  description: string,
  service_date: string,
  value: number,
  customer: Customer,
  address?: Address
}
