using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsStorage.Domain.Entities
{
    public class Entity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        
    }
}