using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Pages
{
    public partial class Cash : ComponentBase
    {
        public string Message { get; set; } = "God bless you!";
        public IEnumerable<CashRegisterDTO> Registers { get; set; } = [];
        private readonly ICashRegisterService _service;

        public Cash(ICashRegisterService service)
        {
            _service = service;
        }

        protected override async Task OnInitializedAsync()
        {
            Registers = await _service.GetAll();
        }
    }
}