using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Entities;

namespace CsStorage.Domain.Interfaces
{
    public interface IBaseRepository<T> where T : Entity
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int? id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<T> Remove(T entity);
    }
}