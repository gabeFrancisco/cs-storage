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

        public async Task<DebtDTO> Remove(int? id)
        {
            var debt = await _debtRepository.GetById(id);
            await _debtRepository.Remove(debt);

            return _mapper.Map<DebtDTO>(debt);
        }

        public async Task<DebtDTO> Update(DebtDTO dto)
        {
            var debt = _mapper.Map<Debt>(dto);
            await _debtRepository.Update(debt);

            return dto;
        }
    }
}