using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Domain.Interfaces;

namespace CsStorage.Application.Services
{
    public class DebtService : IDebtService
    {
        private readonly IDebtRepository _debtRepository;
        public DebtService(IDebtRepository debtRepository)
        {
            _debtRepository = debtRepository;
        }
        public Task<DebtDTO> Create(DebtDTO debt)
        {
            throw new NotImplementedException();
        }

        public Task<DebtDTO> GetById(int? id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DebtDTO>> GetDebts()
        {
            throw new NotImplementedException();
        }

        public Task<DebtDTO> Remove(DebtDTO debt)
        {
            throw new NotImplementedException();
        }

        public Task<DebtDTO> Update(DebtDTO debt)
        {
            throw new NotImplementedException();
        }
    }
}