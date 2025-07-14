using CsStorage.Data.Context;
using CsStorage.Domain.Entities;
using CsStorage.Domain.Interfaces;

namespace CsStorage.Data.Repositories
{
    public class CashRegisterRepository : BaseRepository<CashRegister>, ICashRegisterRepository
    {
        public CashRegisterRepository(AppDbContext context) : base(context) { }

        public dynamic GetAllRegistersValueOfActualMonthAndDay()
        {
            var day = _context.CashRegisters.Where(x => x.CreatedAt.Day == DateTime.Now.Day).Sum(x => x.Value);
            var month = _context.CashRegisters
                .Where(x => x.CreatedAt.Month == DateTime.Now.Month)
                .Sum(x => x.Value);

            return new
            {
                Day = day,
                Month = month
            };
        }
    }
}