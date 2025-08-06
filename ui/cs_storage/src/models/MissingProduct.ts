import { BaseEntity } from "./BaseEntity";
import { Customer } from "./Customer";

export interface MissingProduct extends BaseEntity{
  name: string;
  customer?: Customer;
  needed_day: string;
  is_bought: boolean;
}
