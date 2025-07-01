using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Enums;

namespace CsStorage.Web.Utils
{
    public class PaymentTypeDictionary
    {
        public static IDictionary<string, PaymentType> PaymentTypes = new Dictionary<string, PaymentType>()
        {
            {"Dinheiro", PaymentType.Cash},
            {"Débito", PaymentType.Debt},
            {"Crédito", PaymentType.Credit},
            {"Pix", PaymentType.Pix},
            {"Depósito", PaymentType.Deposit},
        };

        public static string ResolvePaymentType(PaymentType type)
        {
            return PaymentTypes.Where(x => x.Value == type)
                .FirstOrDefault().Key;
        }
    }
}