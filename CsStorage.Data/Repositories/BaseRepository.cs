using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using CsStorage.Data.Context;
using CsStorage.Domain.Entities;
using CsStorage.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CsStorage.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : Entity
    {
        protected readonly AppDbContext _context;
        public BaseRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<TEntity> Create(TEntity entity)
        {
            entity.CreatedAt = DateTime.Now;
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>()
                .AsNoTracking()
                .ToListAsync();
        }

        public virtual async Task<TEntity> GetById(int? id)
        {
            return _context.Set<TEntity>().Find(id)!;
        }

        public async Task<TEntity> Remove(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            Console.WriteLine(JsonSerializer.Serialize(entity));
            entity.UpdatedAt = DateTime.Now;
            
            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }
    }
}