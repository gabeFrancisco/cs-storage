import { PaymentType } from "../models/enums/PaymentType";

export const PaymentTypeDictionary: Record<PaymentType, string> = {
  [PaymentType.Cash]: 'Dinheiro',
  [PaymentType.Credit]: 'Crédito',
  [PaymentType.Debt]: 'Débito',
  [PaymentType.Deposit]: 'Depósito',
  [PaymentType.Pix]: 'Pix'
}
