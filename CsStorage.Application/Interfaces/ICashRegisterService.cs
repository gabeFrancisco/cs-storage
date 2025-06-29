using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;

namespace CsStorage.Application.Interfaces
{
    public interface ICashRegisterService
    {
        Task<IEnumerable<CashRegisterDTO>> GetRegisters();
        Task<CashRegisterDTO> GetById(int? id);
        Task<CashRegisterDTO> Create(CashRegisterDTO register);
        Task<CashRegisterDTO> Update(CashRegisterDTO register);
        Task<CashRegisterDTO> Remove(CashRegisterDTO register);
    }
}