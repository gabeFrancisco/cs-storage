using AutoMapper;
using CsStorage.Application.DTOs;
using CsStorage.Domain.Entities;

namespace CsStorage.Application.Mappings
{
    public class DomainToDTOMappingProfile : Profile
    {
        public DomainToDTOMappingProfile()
        {
            CreateMap<Debt, DebtDTO>().ReverseMap();
            CreateMap<Customer, CustomerDTO>().ReverseMap();
            CreateMap<Address, AddressDTO>().ReverseMap();
            CreateMap<CashRegister, CashRegisterDTO>().ReverseMap();
        }
    }
}