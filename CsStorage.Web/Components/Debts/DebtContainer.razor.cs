using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Debts
{
    public partial class DebtContainer : ComponentBase
    {
        private readonly IDebtService _debtService;
        private IEnumerable<DebtDTO> Debts = [];
        public DebtContainer(IDebtService debtService)
        {
            _debtService = debtService;
        }

        protected override async Task OnInitializedAsync()
        {
            Debts = await _debtService.GetAll();
        }
    }
}