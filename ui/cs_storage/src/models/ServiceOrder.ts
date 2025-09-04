import { Address } from "./Address";
import { BaseEntity } from "./BaseEntity";
import { Customer } from "./Customer";
import { ServicePriority } from "./enums/ServicePriority";

export interface ServiceOrder extends BaseEntity {
  title: string,
  description: string,
  priority: ServicePriority,
  service_date: string,
  value: number,
  customer: Customer,
  address?: Address
}
