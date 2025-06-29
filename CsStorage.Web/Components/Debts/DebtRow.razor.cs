using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Debts
{
    public partial class DebtRow : ComponentBase
    {
        [Parameter]
        public DebtDTO? Debt { get; set; } = null;
    }
}