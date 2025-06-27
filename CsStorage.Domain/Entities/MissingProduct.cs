using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsStorage.Domain.Validation;

namespace CsStorage.Domain.Entities
{
    public class MissingProduct : Entity
    {
        public string Name { get; private set; }
        public Customer? Customer { get; set; }
        public int? CustomerId { get; set; }
        public DateTime NeededDay { get; private set; }
        public Boolean IsBought { get; private set; }

        public MissingProduct(string name, DateTime neededDay)
        {
            ValidateDomain(name, neededDay);
        }

        public MissingProduct(int id, string name, DateTime neededDay)
        {
            DomainExceptionValidation.When(id < 0, "Invalid id");
            Id = id;
            ValidateDomain(name, neededDay);
        }

        private void ValidateDomain(string name, DateTime neededDay)
        {
            DomainExceptionValidation.When(string.IsNullOrEmpty(name), "Name is required!");

            Name = name;
            NeededDay = neededDay;
            IsBought = false;
        }
    }
}