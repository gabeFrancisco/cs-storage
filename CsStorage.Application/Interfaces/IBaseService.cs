using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsStorage.Application.Interfaces
{
    public interface IBaseService<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int? id);
        Task<T> Create(T dto);
        Task<T> Update(T dto);
        Task<T> Remove(T dto);
    }
}