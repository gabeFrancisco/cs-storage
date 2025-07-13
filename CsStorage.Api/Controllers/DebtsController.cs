using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CsStorage.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DebtsController : ControllerBase
    {
        private readonly IDebtService _debtService;
        public DebtsController(IDebtService debtService)
        {
            _debtService = debtService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _debtService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _debtService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DebtDTO dto)
        {
            return Ok(await _debtService.Create(dto));
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DebtDTO dto)
        {
            return Ok(await _debtService.Update(dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _debtService.Remove(id));
        }
    }
}