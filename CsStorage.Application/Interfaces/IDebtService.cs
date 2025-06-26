using CsStorage.Application.DTOs;

namespace CsStorage.Application.Interfaces
{
    public interface IDebtService
    {
        Task<IEnumerable<DebtDTO>> GetDebts();
        Task<DebtDTO> GetById(int? id);
        Task<DebtDTO> Create(DebtDTO debt);
        Task<DebtDTO> Update(DebtDTO debt);
        Task<DebtDTO> Remove(DebtDTO debt);
    }
}