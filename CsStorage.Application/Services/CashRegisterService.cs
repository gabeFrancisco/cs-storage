using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CsStorage.Application.DTOs;
using CsStorage.Application.Interfaces;
using CsStorage.Domain.Interfaces;

namespace CsStorage.Application.Services
{
    public class CashRegisterService : ICashRegisterService
    {
        private readonly ICashRegisterRepository _cashRegisterRepository;
        private readonly IMapper _mapper;
        public CashRegisterService(ICashRegisterRepository cashRegisterRepository, IMapper mapper)
        {
            _cashRegisterRepository = cashRegisterRepository;
            _mapper = mapper;
        }
        public Task<CashRegisterDTO> Create(CashRegisterDTO dto)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CashRegisterDTO>> GetAll()
        {
            var registers = await _cashRegisterRepository.GetAll();
            return _mapper.Map<IEnumerable<CashRegisterDTO>>(registers);
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