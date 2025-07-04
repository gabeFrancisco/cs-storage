using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CsStorage.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CashRegistersController : ControllerBase
    {
        private readonly ICashRegisterService _cashRegisterService;
        public CashRegistersController(ICashRegisterService cashRegisterService)
        {
            _cashRegisterService = cashRegisterService;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _cashRegisterService.GetAll());
        }
    }
}