using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        }
    }
}