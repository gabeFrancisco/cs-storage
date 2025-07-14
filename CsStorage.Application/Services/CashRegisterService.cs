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
    public class CashRegisterService : ICashRegisterService
    {
        private readonly ICashRegisterRepository _cashRegisterRepository;
        private readonly IMapper _mapper;
        public CashRegisterService(ICashRegisterRepository cashRegisterRepository, IMapper mapper)
        {
            _cashRegisterRepository = cashRegisterRepository;
            _mapper = mapper;
        }
        public async Task<CashRegisterDTO> Create(CashRegisterDTO dto)
        {
            var register = _mapper.Map<CashRegister>(dto);
            await _cashRegisterRepository.Create(register);

            return dto;
        }

        public async Task<IEnumerable<CashRegisterDTO>> GetAll()
        {
            var registers = await _cashRegisterRepository.GetAll();
            return _mapper.Map<IEnumerable<CashRegisterDTO>>(registers);
        }

        public dynamic GetAllRegistersValueOfActualMonthAndDay()
        {
            return _cashRegisterRepository.GetAllRegistersValueOfActualMonthAndDay();   
        }

        public async Task<CashRegisterDTO> GetById(int? id)
        {
            var register = await _cashRegisterRepository.GetById(id);
            return _mapper.Map<CashRegisterDTO>(register);
        }

        public async Task<CashRegisterDTO> Remove(int? id)
        {
            var register = await _cashRegisterRepository.GetById(id);
            await _cashRegisterRepository.Remove(register);

            return _mapper.Map<CashRegisterDTO>(register);
        }

        public async Task<CashRegisterDTO> Update(CashRegisterDTO dto)
        {
            var register = _mapper.Map<CashRegister>(dto);
            await _cashRegisterRepository.Update(register);

            return dto;
        }
    }
}