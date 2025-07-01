using System.Text.Json;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Domain.Enums;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Cash
{
    public partial class CashField : ComponentBase
    {
        private readonly ICashRegisterService _cashRegisterService;
        public CashRegisterDTO? Register = new CashRegisterDTO() { CreatedAt = DateTime.Now };
        public IDictionary<string, PaymentType> PaymentTypes = new Dictionary<string, PaymentType>()
        {
            {"Dinheiro", PaymentType.Cash},
            {"Débito", PaymentType.Debt},
            {"Crédito", PaymentType.Credit},
            {"Pix", PaymentType.Pix},
            {"Depósito", PaymentType.Deposit},
        };
        
        public CashField(ICashRegisterService cashRegisterService)
        {
            _cashRegisterService = cashRegisterService;
        }

        public async void Submit()
        {
            await _cashRegisterService.Create(Register!);
        }
    }
}