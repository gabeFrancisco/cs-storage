import { BaseEntity } from "./BaseEntity";
import { Customer } from "./Customer";

export interface MissingProduct extends BaseEntity{
  name: string;
  customer?: Customer;
  needed_day: string;
  image_url: string;
  is_bought: boolean;
}
