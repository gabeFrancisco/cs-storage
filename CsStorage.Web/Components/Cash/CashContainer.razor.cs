using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Web.Events;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Cash
{
    public partial class CashContainer : ComponentBase
    {
        private readonly ICashRegisterService _cashRegisterService;
        private IEnumerable<CashRegisterDTO> Registers = [];
        private FormEventService _eventService;
        public CashContainer(ICashRegisterService cashRegisterService, FormEventService eventService)
        {
            _cashRegisterService = cashRegisterService;
            _eventService = eventService;
        }

        protected override async Task OnInitializedAsync()
        {
            _eventService.OnCashFormSubmitted += async () => await InvokeAsync(Reload);
            Registers = await _cashRegisterService.GetAll();
        }

        private async Task Reload()
        {
            Registers = await _cashRegisterService.GetAll();
            StateHasChanged();
        }


    }
}