using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Data.Context;
using CsStorage.Domain.Entities;
using CsStorage.Domain.Interfaces;

namespace CsStorage.Data.Repositories
{
    public class CashRegisterRepository : BaseRepository<CashRegister>, ICashRegisterRepository
    {
        public CashRegisterRepository(AppDbContext context) : base(context) { }
    }
}