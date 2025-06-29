using CsStorage.Application.DTOs;
using Microsoft.AspNetCore.Components;

namespace CsStorage.Web.Components.Cash
{
    public partial class CashRow : ComponentBase
    {
        [Parameter]
        public CashRegisterDTO? Register { get; set; } = null;
    }
}