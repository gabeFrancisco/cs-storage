import { Address } from "./Address";
import { BaseEntity } from "./BaseEntity";

export interface Customer extends BaseEntity{
  name: string;
  phone: string;
  cpf_cnpj?: string;
  address?: Address
}
