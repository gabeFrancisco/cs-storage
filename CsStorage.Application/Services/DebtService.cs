using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Domain.Entities;
using CsStorage.Domain.Interfaces;

namespace CsStorage.Application.Services
{
    public class DebtService : IDebtService
    {
        private readonly IDebtRepository _debtRepository;
        private readonly IMapper _mapper;
        public DebtService(IDebtRepository debtRepository, IMapper mapper)
        {
            _debtRepository = debtRepository;
            _mapper = mapper;
        }
        public async Task<DebtDTO> Create(DebtDTO debtDto)
        {
            var debt = _mapper.Map<Debt>(debtDto);
            await _debtRepository.Create(debt);

            return debtDto;
        }

        public async Task<DebtDTO> GetById(int? id)
        {
            var debt = await _debtRepository.GetById(id);
            return _mapper.Map<DebtDTO>(debt);
        }

        public async Task<IEnumerable<DebtDTO>> GetAll()
        {
            var debts = await _debtRepository.GetAll();
            return _mapper.Map<IEnumerable<DebtDTO>>(debts);
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