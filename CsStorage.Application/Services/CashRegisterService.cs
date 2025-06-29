using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;

namespace CsStorage.Application.Services
{
    public class CashRegisterService : ICashRegisterService
    {
        public Task<CashRegisterDTO> Create(CashRegisterDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CashRegisterDTO>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<CashRegisterDTO> GetById(int? id)
        {
            throw new NotImplementedException();
        }

        public Task<CashRegisterDTO> Remove(CashRegisterDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task<CashRegisterDTO> Update(CashRegisterDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}