using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Entities;

namespace CsStorage.Domain.Interfaces
{
    public interface IDebtRepository
    {
        
        Task<IEnumerable<Debt>> GetDebts();
        Task<Debt> GetById(int? id);
        Task<Debt> Create(Debt product);
        Task<Debt> Update(Debt product);
        Task<Debt> Remove(Debt product);
    }
}