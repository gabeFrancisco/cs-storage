using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Cash
{
    public partial class CashContainer : ComponentBase
    {
        private readonly ICashRegisterService _cashRegisterService;
        private IEnumerable<CashRegisterDTO> Registers = [];
        public CashContainer(ICashRegisterService cashRegisterService)
        {
            _cashRegisterService = cashRegisterService;
        }

        protected override async Task OnInitializedAsync()
        {
            Registers = await _cashRegisterService.GetAll();
        }
    }
}