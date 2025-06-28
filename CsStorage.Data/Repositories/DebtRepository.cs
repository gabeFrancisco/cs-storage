using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Data.Context;
using CsStorage.Domain.Entities;
using CsStorage.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CsStorage.Data
{
    public class DebtRepository : IDebtRepository
    {
        private readonly AppDbContext _context;
        public DebtRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Debt> Create(Debt debt)
        {
            _context.Debts.Add(debt);
            await _context.SaveChangesAsync();
            
            return debt;
        }

        public async Task<Debt> GetById(int? id)
        {
            var debt = await _context.Debts
                .Where(x => x.Id == id)
                .Include(x => x.Customer)
                .ThenInclude(y => y.Address)
                .FirstOrDefaultAsync();

            return debt!;
        }

        public async Task<IEnumerable<Debt>> GetDebts()
        {
            return await _context.Debts
                .Include(x => x.Customer)
                .ThenInclude(y => y.Address)
                .ToListAsync();
        }

        public async Task<Debt> Remove(Debt debt)
        {
            _context.Debts.Remove(debt);
            await _context.SaveChangesAsync();

            return debt;
        }

        public async Task<Debt> Update(Debt debt)
        {
            _context.Debts.Update(debt);
            await _context.SaveChangesAsync();

            return debt;
        }
    }
}