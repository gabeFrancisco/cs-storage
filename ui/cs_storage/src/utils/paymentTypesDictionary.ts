import { payment_type } from "../models/enums/payment_type";

export const payment_typesDictionary: Record<payment_type, string> = {
  [payment_type.Cash]: 'Dinheiro',
  [payment_type.Credit]: 'Crédito',
  [payment_type.Debt]: 'Débito',
  [payment_type.Deposit]: 'Depósito',
  [payment_type.Pix]: 'Pix'
}
