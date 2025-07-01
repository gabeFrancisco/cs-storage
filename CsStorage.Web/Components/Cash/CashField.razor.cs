using System.Text.Json;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Domain.Enums;
using CsStorage.Web.Events;
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

        private readonly FormEventService _eventService;

        public CashField(ICashRegisterService cashRegisterService, FormEventService eventService)
        {
            _cashRegisterService = cashRegisterService;
            _eventService = eventService;            
        }

        public async void Submit()
        {
            await _cashRegisterService.Create(Register!);
            _eventService.FormSubmitted();
        }
    }
}