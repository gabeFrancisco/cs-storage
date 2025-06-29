using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Data.Context;
using CsStorage.Data.Repositories;
using CsStorage.Domain.Entities;
using CsStorage.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CsStorage.Data
{
    public class DebtRepository : BaseRepository<Debt>, IDebtRepository
    {
        public DebtRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<Debt> GetById(int? id)
        {
            var debt = await _context.Debts
                .Where(x => x.Id == id)
                .Include(x => x.Customer)
                .ThenInclude(y => y.Address)
                .FirstOrDefaultAsync();

            return debt!;
        }

        public override async Task<IEnumerable<Debt>> GetAll()
        {
            return await _context.Debts
                .Include(x => x.Customer)
                .ThenInclude(y => y.Address)
                .ToListAsync();
        }
    }
}