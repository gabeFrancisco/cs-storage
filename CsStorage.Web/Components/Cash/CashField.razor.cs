using CsStorage.Application.DTOs;
using CsStorage.Domain.Enums;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Cash
{
    public partial class CashField : ComponentBase
    {
        public CashRegisterDTO? Register = new CashRegisterDTO();
        public IDictionary<string, PaymentType> PaymentTypes = new Dictionary<string, PaymentType>()
        {
            {"Dinheiro", PaymentType.Cash},
            {"Débito", PaymentType.Debt},
            {"Crédito", PaymentType.Credit},
            {"Pix", PaymentType.Pix},
            {"Depósito", PaymentType.Deposit},
        };
    }
}