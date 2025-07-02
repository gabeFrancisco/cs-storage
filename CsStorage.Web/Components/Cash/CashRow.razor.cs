using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Web.Events;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Cash
{
    public partial class CashRow : ComponentBase
    {
        [Parameter]
        public CashRegisterDTO? Register { get; set; } = null;

        private readonly ICashRegisterService _cashRegisterService;
        private readonly FormEventService _eventService;
        public CashRow(ICashRegisterService cashRegisterService, FormEventService eventService)
        {
            _cashRegisterService = cashRegisterService;
            _eventService = eventService; 
        }

        public async Task Remove()
        {
            await _cashRegisterService.Remove(Register!);
            _eventService.FormSubmitted();
        }
    }
}