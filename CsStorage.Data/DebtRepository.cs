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
            return await _context.Debts.FindAsync(id);
        }

        public async Task<IEnumerable<Debt>> GetDebts()
        {
            return await _context.Debts.ToListAsync();
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